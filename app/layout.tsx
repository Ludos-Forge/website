import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
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
  title: "Ludos Forge | Crafting Gaming Dreams",
  description: "Ludos Forge is an indie game development studio dedicated to creating authentic, innovative, and unforgettable gaming experiences with passion and creative freedom.",
  keywords: ["indie games", "game development", "game studio", "video games", "gaming", "creative development", "indie developers"],
  authors: [{ name: "Ludos Forge Team" }],
  creator: "Ludos Forge",
  publisher: "Ludos Forge",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ludosforge.com",
    title: "Ludos Forge | Crafting Gaming Dreams",
    description: "We forge video games with passion, creative freedom, and collective spirit. Join us in creating unforgettable gaming experiences.",
    siteName: "Ludos Forge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludos Forge | Crafting Gaming Dreams",
    description: "Indie game studio crafting authentic and innovative gaming experiences",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
