"use client";
import { useState } from "react";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { cn } from "@/lib/utils";

const ForYouFollowing = () => {
 const [activeTab, setActiveTab] = useState("For you");
 const tabs = [{ label: "For you" }, { label: "Following" }];
 return (
  <div className="flex sticky top-0 items-center border-b dark:border-b-white/25 z-[2] bg-white dark:bg-black/60 backdrop-blur-md">
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
   <div className="absolute right-4 pb-4 top-3">
    <ThemeToggleButton />
   </div>
  </div>
 );
};
export default ForYouFollowing;
