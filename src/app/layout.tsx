import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RippleShaders } from "@/components/ui/shadcn-io/ripple-shaders";
import "./globals.css";

import '@styles/main.css';

import { Navbar } from "@/components/ui/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entrance",
  description: "A new-gen security checkpoint for ICv2 services",
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
        <div className="root">
          <main>
            <Navbar />
            <div className="shaders_body">
              <RippleShaders
                speed={0.1}
                intensity={1}
                colorScheme={[0.1, 0.2, 0.2]}
                rippleCount={8}
                frequency={0.4}
                className="shaders"
              />
              
            </div>
          </main>
        </div>
        {children}
      </body>
    </html>
  );
}
