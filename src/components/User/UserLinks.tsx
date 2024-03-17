"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
 { name: "Posts", href: "" },
 { name: "Replies", href: "with_replies" },
 { name: "Media", href: "media" },
 { name: "Likes", href: "likes" },
];
const UserLinks = ({ username }: { username: string | null }) => {
 const path = usePathname();
 const currentLink = path.split("/")[3];
 return (
  <div className="flex justify-between mt-4 border-b dark:border-b-white/25">
   {links.map((link) => {
    return (
     <Link
      href={`/user/${username}/${link.href?.toLowerCase()}`}
      key={link.name}
      className="w-full text-center pb-2.5 pt-3.5 cursor-pointer hover:bg-black/10 hover:dark:bg-white/10 transition-all duration-100 text-mainGray"
     >
      <div className="w-fit mx-auto">
       <div
        className={cn(
         currentLink === link.href?.toLowerCase() &&
          "font-bold text-black dark:text-white",
         link.href === "" &&
          !currentLink &&
          "font-bold text-black dark:text-white"
        )}
       >
        {link.name}
       </div>
       <div
        className={cn(
         "h-0 w-full bg-main relative top-2.5 rounded-full",
         currentLink === link.href?.toLowerCase() && "h-1",
         link.href === "" && !currentLink && "h-1"
        )}
       />
      </div>
     </Link>
    );
   })}
  </div>
 );
};
export default UserLinks;
