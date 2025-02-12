import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Analytics } from "@vercel/analytics/react";

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
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"
      ></link>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
