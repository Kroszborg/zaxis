import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZAxis - Advanced 3D Component Library | Interactive 3D Development",
  description:
    "ZAxis is the most advanced 3D component library for modern web development. Create, customize, and export production-ready Three.js components with real-time visualization, live controls, and instant code generation. Built with React Three Fiber, Next.js, and TypeScript.",
  keywords: [
    "ZAxis",
    "3D components",
    "Three.js",
    "React Three Fiber",
    "component library",
    "3D visualization",
    "web development",
    "interactive 3D",
    "code generation",
    "real-time customization",
    "Next.js",
    "TypeScript",
    "GSAP animations",
    "material design",
    "3D models",
    "GLB",
    "GLTF",
    "WebGL",
    "responsive design",
  ],
  authors: [{ name: "kroszborg" }],
  creator: "kroszborg",
  publisher: "kroszborg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zaxis.kroszborg.co/"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "ZAxis - Advanced 3D Component Library",
    description:
      "Create, customize, and export production-ready 3D components with real-time visualization and instant code generation.",
    url: "https://zaxis.kroszborg.co/",
    siteName: "ZAxis",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZAxis - Advanced 3D Component Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAxis - Advanced 3D Component Library",
    description:
      "Create, customize, and export production-ready 3D components with real-time visualization.",
    images: ["/og-image.jpg"],
    creator: "@zaxis_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
