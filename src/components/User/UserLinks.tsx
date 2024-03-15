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
  <div className="flex justify-between mt-8 border-b dark:border-b-white/25">
   {links.map((link) => {
    return (
     <Link
      href={`/user/${username}/${link.href?.toLowerCase()}`}
      key={link.name}
      className="w-full text-center py-2 cursor-pointer hover:bg-black/10 text-mainGray"
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
         "h-0 w-full bg-blue-400 relative top-2 rounded-full",
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
