import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import LeftMenu from "@/components/Home/LeftSide/LeftMenu";
import RightMenu from "@/components/Home/RightSide/RightMenu";

export const fontSans = FontSans({
 subsets: ["latin"],
 variable: "--font-sans",
});

export const metadata: Metadata = {
 title: "Home / Chirp",
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
     <div className="flex mx-auto max-w-[1300px] px-4">
      <div className="w-[20%]">
       <LeftMenu />
      </div>
      <main className="border-l border-r dark:border-l-white/25 dark:border-r-white/25 min-h-screen max-w-[630px] w-full">
       {children}
      </main>
      <div className="w-[30%]">
       <RightMenu />
      </div>
     </div>
    </ThemeProvider>
   </body>
  </html>
 );
}
