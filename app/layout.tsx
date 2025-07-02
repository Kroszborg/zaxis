import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZAxis - Advanced 3D Component Library | Interactive 3D Development',
  description: 'ZAxis is the most advanced 3D component library for modern web development. Create, customize, and export production-ready Three.js components with real-time visualization, live controls, and instant code generation. Built with React Three Fiber, Next.js, and TypeScript.',
  keywords: [
    'ZAxis',
    '3D components',
    'Three.js',
    'React Three Fiber',
    'component library',
    '3D visualization',
    'web development',
    'interactive 3D',
    'code generation',
    'real-time customization',
    'Next.js',
    'TypeScript',
    'GSAP animations',
    'material design',
    '3D models',
    'GLB',
    'GLTF',
    'WebGL',
    'responsive design'
  ],
  authors: [{ name: 'ZAxis Team' }],
  creator: 'ZAxis',
  publisher: 'ZAxis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zaxis.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZAxis - Advanced 3D Component Library',
    description: 'Create, customize, and export production-ready 3D components with real-time visualization and instant code generation.',
    url: 'https://zaxis.dev',
    siteName: 'ZAxis',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZAxis - Advanced 3D Component Library',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAxis - Advanced 3D Component Library',
    description: 'Create, customize, and export production-ready 3D components with real-time visualization.',
    images: ['/og-image.jpg'],
    creator: '@zaxis_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}