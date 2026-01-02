import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Keystone Gym',
    short_name: 'Keystone',
    description: 'Elite Combat Training in Montreal',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
