import { auth } from "@/auth";
import LeftMenu from "@/components/Home/LeftSide/LeftMenu";
import RightMenu from "@/components/Home/RightSide/RightMenu";
import NonUserBanner from "@/components/NonUserBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
 title: "Home / Chirp",
 description: "A Twitter clone called Chirp made with Next.js 14",
};

export default async function UserLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const userInfo = await auth();
 const user = userInfo?.user;
 return (
  <>
   <div className="flex mx-auto max-w-[1300px] px-4 relative">
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
   {!user && <NonUserBanner />}
  </>
 );
}
