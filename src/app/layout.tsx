import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-royal",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Virasat | Heritage Luxury",
  description: "Preserving the dying arts of the Indian subcontinent through a curated digital archive of masterworks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${cinzel.variable} ${playfair.variable} ${outfit.variable}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
