import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rawBase = process.env.NEXT_PUBLIC_BASE_URL?.trim();
const metadataBase = new URL(
  rawBase && rawBase.length > 0 ? rawBase : "http://localhost:3000",
);

const defaultTitle = "PromptShop — Premium AI Prompts";
const defaultDescription =
  "Discover and buy high-quality prompts for Midjourney, FLUX, and Ideogram. Unlock creative AI-generated images.";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: "%s | PromptShop",
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description:
      "Discover and buy high-quality prompts for Midjourney, FLUX, and Ideogram.",
    url: "/",
    siteName: "PromptShop",
    type: "website",
    images: [
      {
        url: "/images/cinematic-portrait-1.jpg",
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-gray-900">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 md:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
