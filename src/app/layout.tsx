import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const font = Albert_Sans({
 subsets: ["latin"],
 display: "swap",
});

export const metadata: Metadata = {
 title: "Chirp - It's what's happening / Chirp",
 description: "A Twitter clone called Chirp made with Next.js 14",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en" className={font.className} suppressHydrationWarning>
   <body className="min-h-screen bg-background antialiased">
    <ThemeProvider
     defaultTheme="dark"
     enableSystem={false}
     attribute="class"
     disableTransitionOnChange
    >
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
