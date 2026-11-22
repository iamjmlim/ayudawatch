// One interface for every AI provider, so switching is a settings change.
//   AI_PROVIDER=gemini   (default) needs GEMINI_API_KEY
//   AI_PROVIDER=groq     needs GROQ_API_KEY
// AI_FALLBACK_PROVIDER is tried when the main one is rate-limited or down.
// (GitHub Models was retired on 2026-07-30, so it is no longer an option.)
// To add a provider: write a caller below and register it in CALLERS.

export type ProviderName = 'gemini' | 'groq';

export class AiError extends Error {
  readonly status: number | null;
  constructor(message: string, status: number | null = null) {
    super(message);
    this.status = status;
  }
  get isRateLimit() {
    return this.status === 429;
  }
  // Missing key (status 0), bad key, unknown model: retrying other stories won't help.
  get isConfigError() {
    return this.status !== null && [0, 400, 401, 403, 404].includes(this.status);
  }
}

export type AiRequest = { system: string; user: string };
export type AiResponse = { text: string; model: string; provider: ProviderName };

const TIMEOUT_MS = 60_000;

// Tried in order; the next model is used when one is overloaded, rate-limited or slow.
// "-latest" aliases follow Google's current models, so retirements don't break us.
function geminiModels(): string[] {
  const list = process.env.GEMINI_MODELS || 'gemini-flash-lite-latest,gemini-flash-latest';
  return list.split(',').map((m) => m.trim()).filter(Boolean);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Free-tier models are often briefly overloaded (HTTP 503). Without a backup
// provider we go through the model list twice with a short pause; with one,
// we hand over to the backup right away instead of waiting.
async function callGemini(req: AiRequest): Promise<AiResponse> {
  let lastError: AiError | null = null;
  const passes = process.env.AI_FALLBACK_PROVIDER ? 1 : 2;
  for (let pass = 1; pass <= passes; pass++) {
    if (pass === 2) await sleep(8_000);
    for (const model of geminiModels()) {
      try {
        return await callGeminiModel(model, req);
      } catch (err) {
        const e = err instanceof AiError ? err : new AiError((err as Error).message);
        // Bad key or bad request: other models won't help either.
        if (e.status !== null && [0, 400, 401, 403].includes(e.status)) throw e;
        lastError = e;
        console.warn(`   gemini ${model} unavailable: ${e.message.replace(/\s+/g, ' ').slice(0, 100)}`);
      }
    }
  }
  throw lastError ?? new AiError('No Gemini models configured', 0);
}

async function callGeminiModel(model: string, req: AiRequest): Promise<AiResponse> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new AiError('GEMINI_API_KEY is not set', 0);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: req.system }] },
        contents: [{ role: 'user', parts: [{ text: req.user }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );
  if (!res.ok) throw new AiError(`Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`, res.status);

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
  if (!text) throw new AiError(`Gemini returned no text (finishReason: ${data.candidates?.[0]?.finishReason ?? 'none'})`);
  return { text, model, provider: 'gemini' };
}

// Groq: free tier with its own limits, so it stays up when Gemini is busy.
// OpenAI-compatible API. Keys: https://console.groq.com/keys
async function callGroq(req: AiRequest): Promise<AiResponse> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new AiError('GROQ_API_KEY is not set', 0);
  // Tested 2026-11-19: gpt-oss-120b writes far better Filipino than qwen3.8-27b.
  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

  let res: Response;
  try {
    res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: req.system },
          { role: 'user', content: req.user },
        ],
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (err) {
    throw new AiError(`Groq network error: ${(err as Error).message}`);
  }
  if (!res.ok) throw new AiError(`Groq HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`, res.status);

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const text = data.choices?.[0]?.message?.content ?? '';
  if (!text) throw new AiError('Groq returned no text');
  return { text, model, provider: 'groq' };
}

const CALLERS: Record<ProviderName, (req: AiRequest) => Promise<AiResponse>> = {
  gemini: callGemini,
  groq: callGroq,
};

function parseProvider(value: string | undefined): ProviderName | null {
  return value && value in CALLERS ? (value as ProviderName) : null;
}

export function configuredProviders(): ProviderName[] {
  const main = parseProvider(process.env.AI_PROVIDER) ?? 'gemini';
  const fallback = parseProvider(process.env.AI_FALLBACK_PROVIDER);
  return fallback && fallback !== main ? [main, fallback] : [main];
}

export function callProvider(name: ProviderName, req: AiRequest): Promise<AiResponse> {
  return CALLERS[name](req);
}
