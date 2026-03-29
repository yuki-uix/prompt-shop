import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PromptShop — AI Prompt Marketplace",
    template: "%s | PromptShop",
  },
  description:
    "Discover and purchase high-quality AI prompts for Midjourney, FLUX, and Ideogram.",
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
