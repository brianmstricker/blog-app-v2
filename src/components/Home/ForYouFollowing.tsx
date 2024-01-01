"use client";
import { useState } from "react";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { cn } from "@/lib/utils";

const ForYouFollowing = () => {
 const [activeTab, setActiveTab] = useState("For you");
 const tabs = [{ label: "For you" }, { label: "Following" }];
 return (
  <div className="flex relative items-center border-b dark:border-b-white/25">
   <div className="flex justify-around w-full max-w-[90%] mx-auto">
    {tabs.map((tab) => (
     <button
      key={tab.label}
      className={cn(
       "transition-all duration-75",
       tab.label === activeTab ? "" : "text-white/55"
      )}
      onClick={() => setActiveTab(tab.label)}
     >
      <span className="block pb-4">{tab.label}</span>
      {tab.label === activeTab && (
       <div className="w-full h-1 bg-sky-500 rounded-full" />
      )}
     </button>
    ))}
   </div>
   <div className="absolute right-4 pb-4">
    <ThemeToggleButton />
   </div>
  </div>
 );
};
export default ForYouFollowing;
