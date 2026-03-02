import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Link from "next/link";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FTP Booster",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>",
  },
  keywords: [
    "FTP improvement",
    "Personalized workouts",
    "Cycling training",
    "Cycling coach",
    "LLM-powered",
  ],
  description:
    "Get personalized cycling training plans powered by AI. Input your current and target FTP, schedule preferences, and receive tailored workouts to boost performance. Start your journey today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <NuqsAdapter>
          {children}
          <footer className="sticky bottom-0 top-[100vh] border-t border-slate-200/70 bg-white/70 py-2 text-center text-sm text-slate-600 backdrop-blur-sm">
            2025 © FTPBooster.com.{" "}
            <Link
              href="https://github.com/jzhangdev"
              target="_blank"
              className="font-medium text-sky-700 hover:text-sky-600"
            >
              Build by jzhangdev.
            </Link>
          </footer>
        </NuqsAdapter>
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!} />
        <Analytics />
      </body>
    </html>
  );
}
