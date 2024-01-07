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

const LeftMenuNav = () => {
 const path = usePathname();
 const [activeLink, setActiveLink] = useState(path);
 useEffect(() => {
  const newPath = path.replace("/", "");
  setActiveLink(newPath);
  if (newPath === "") setActiveLink("home");
 }, [path]);
 const userLinks = [
  { href: "/", label: "Home", icon: IoHomeOutline, activeIcon: IoHomeSharp },
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
  { href: "/profile", label: "Profile", icon: FaRegUser, activeIcon: FaUser },
 ];
 return (
  <ul className="flex flex-col mt-2 gap-4">
   {userLinks.map((link) => (
    <li key={link.label}>
     <Link
      href={link.href}
      className="flex items-center gap-6 py-3 rounded-full px-4 hover:bg-white/10 transition-all duration-150"
     >
      <span className="text-2xl">
       {activeLink.toLowerCase() === link.label.toLowerCase() ? (
        <link.activeIcon className="w-7 h-7" />
       ) : (
        <link.icon className="w-7 h-7" />
       )}
      </span>
      <span className="text-xl">{link.label}</span>
     </Link>
    </li>
   ))}
  </ul>
 );
};
export default LeftMenuNav;
