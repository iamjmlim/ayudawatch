import Link from 'next/link';

// Shown inside the site layout; bilingual because the locale isn't known here.
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-24 text-center">
      <p className="font-serif text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold">Story not found · Hindi makita ang balita</h1>
      <p className="mt-2 text-muted-foreground">
        It may have been removed or the link is wrong. · Maaaring inalis na ito o mali ang link.
      </p>
      <p className="mt-8 flex justify-center gap-4 text-sm">
        <Link href="/en" className="font-medium text-primary hover:underline">
          Top stories
        </Link>
        <Link href="/fil" className="font-medium text-primary hover:underline">
          Nangungunang balita
        </Link>
      </p>
    </div>
  );
}
