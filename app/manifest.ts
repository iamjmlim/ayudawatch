import type { MetadataRoute } from 'next';

// Lets phones "Add to Home screen" with the AyudaWatch name and icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AyudaWatch: Benefits and aid news',
    short_name: 'AyudaWatch',
    description:
      'Independent updates on Philippine government benefits, aid, IDs, school and work announcements, and holidays, in English and Filipino. Not a government website.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141c19',
    theme_color: '#141c19',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
