import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import LeftMenu from "@/components/ui/LeftSide/LeftMenu";
import RightMenu from "@/components/ui/RightSide/RightMenu";

export const fontSans = FontSans({
 subsets: ["latin"],
 variable: "--font-sans",
});

export const metadata: Metadata = {
 title: "Chirp",
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
     <div className="flex mx-auto w-fit">
      <LeftMenu />
      <main className="border-l border-r dark:border-l-white/15 dark:border-r-white/15 flex-1 max-w-xl min-h-screen px-4 min-w-[600px]">
       {children}
      </main>
      <RightMenu />
     </div>
    </ThemeProvider>
   </body>
  </html>
 );
}
