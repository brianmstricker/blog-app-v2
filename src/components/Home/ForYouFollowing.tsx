"use client";
import { useState } from "react";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { cn } from "@/lib/utils";
import TopNav from "./TopNav/TopNav";
import { User } from "next-auth";

const ForYouFollowing = ({ user }: { user: User | undefined }) => {
 const [activeTab, setActiveTab] = useState("For you");
 const tabs = [{ label: "For you" }, { label: "Following" }];
 //todo: small screen scroll effect
 return (
  <div className="w-full min-[500px]:sticky top-0 border-b dark:border-b-white/25 z-[2] bg-white/60 dark:bg-black/60 backdrop-blur-md">
   {!!user && <TopNav user={user} />}
   <div className="flex items-center">
    <div className="flex w-full mx-auto">
     {tabs.map((tab) => (
      <button
       key={tab.label}
       className={cn(
        "transition-all duration-75 w-full pt-4",
        tab.label === activeTab ? "" : "dark:text-white/55 text-gray-500/60"
       )}
       onClick={() => setActiveTab(tab.label)}
      >
       <div className="flex flex-col w-fit items-center mx-auto">
        <div className="mb-3">{tab.label}</div>
        {tab.label === activeTab && (
         <div className="h-1 bg-main rounded-full w-full" />
        )}
       </div>
      </button>
     ))}
    </div>
    <div className="hidden min-[500px]:block absolute right-4 pb-4 top-3">
     <ThemeToggleButton />
    </div>
   </div>
  </div>
 );
};
export default ForYouFollowing;
