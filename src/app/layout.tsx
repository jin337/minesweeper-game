import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const font = Inter({
  weight: '400',
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "minesweeper-game",
  description: "A classic puzzle of logic and strategy.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`relative ${font.className}`}>{children}</body>
    </html>
  );
}
