import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

export const fontSans = FontSans({
 subsets: ["latin"],
 variable: "--font-sans",
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
  <html lang="en" suppressHydrationWarning>
   <body
    className={cn(
     "min-h-screen bg-background font-sans antialiased",
     fontSans.variable
    )}
   >
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
