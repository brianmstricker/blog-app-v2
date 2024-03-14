"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
 IoHomeOutline,
 IoHomeSharp,
 IoSearchOutline,
 IoSearch,
} from "react-icons/io5";
import { IoMailOutline, IoMailSharp } from "react-icons/io5";
import {
 FaRegBookmark,
 FaBookmark,
 FaUser,
 FaRegUser,
 FaRegBell,
 FaBell,
} from "react-icons/fa6";
import Link from "next/link";
import { User } from "next-auth";

const LeftMenuNav = ({ user }: { user: User }) => {
 const path = usePathname();
 const [activeLink, setActiveLink] = useState(path);
 useEffect(() => {
  setActiveLink(path);
  if (path === "") setActiveLink("home");
 }, [path]);
 const userLinks = [
  {
   href: user ? "/home" : "/",
   label: "Home",
   icon: IoHomeOutline,
   activeIcon: IoHomeSharp,
  },
  {
   href: "/explore",
   label: "Explore",
   icon: IoSearchOutline,
   activeIcon: IoSearch,
  },
  {
   href: "/notifications",
   label: "Notifications",
   icon: FaRegBell,
   activeIcon: FaBell,
  },
  {
   href: "/messages",
   label: "Messages",
   icon: IoMailOutline,
   activeIcon: IoMailSharp,
  },
  {
   href: "/bookmarks",
   label: "Bookmarks",
   icon: FaRegBookmark,
   activeIcon: FaBookmark,
  },
  {
   href: `/user/${user.username}`,
   label: "Profile",
   icon: FaRegUser,
   activeIcon: FaUser,
  },
 ];
 return (
  <ul className="flex flex-col mt-2 gap-2 md:gap-4">
   {userLinks.map((link) => (
    <li key={link.label}>
     <Link
      href={link.href.toLowerCase()}
      scroll={false}
      title={link.label}
      className="flex items-center gap-6 py-3 rounded-full px-3 xl:px-4 hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-150"
      onClick={() => {
       window.scrollTo({ top: 0, behavior: "smooth" });
      }}
     >
      <span>
       {activeLink.toLowerCase() === link.href.toLowerCase() ? (
        <link.activeIcon className="w-[22px] h-[22px] md:w-7 md:h-7" />
       ) : (
        <link.icon className="w-[22px] h-[22px] md:w-7 md:h-7" />
       )}
      </span>
      <span className="hidden xl:block text-xl">{link.label}</span>
     </Link>
    </li>
   ))}
  </ul>
 );
};
export default LeftMenuNav;
