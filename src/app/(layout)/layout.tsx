import { auth } from "@/auth";
import BottomNav from "@/components/Home/BottomNav/BottomNav";
import LeftMenu from "@/components/Home/LeftSide/LeftMenu";
import RightMenu from "@/components/Home/RightSide/RightMenu";
import NonUserBanner from "@/components/NonUserBanner";
import UsernameHandleWrapper from "@/components/UsernameHandleWrapper";
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
   <UsernameHandleWrapper user={user} />
   <div className="flex mx-auto max-w-[1300px] pl-0 min-[500px]:pl-2 px-0 min-[700px]:px-4 relative w-full min-[1050px]:w-auto justify-center">
    <div className="hidden min-[500px]:block w-[15%] min-[500px]:w-[10%] xl:w-[20%] z-[2]">
     {!!user && <LeftMenu user={user} />}
    </div>
    <main className="border-l border-r dark:border-l-white/25 dark:border-r-white/25 min-h-screen max-w-[630px] w-full">
     {children}
    </main>
    <div className="hidden min-[1050px]:block w-[35%] xl:w-[30%]">
     <RightMenu user={user} />
    </div>
   </div>
   {!!user && <BottomNav user={user} />}
   {!user && <NonUserBanner />}
  </>
 );
}
