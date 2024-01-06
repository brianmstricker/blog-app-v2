"use client";
import Image from "next/image";
import Link from "next/link";
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
import LeftMenuUserInfo from "./LeftMenuUserInfo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PostModal from "./PostModal";

const LeftMenu = () => {
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
  <aside className="h-screen sticky top-0 flex flex-col mr-4">
   <nav className="flex-1">
    <Link href={"/"} className="rounded-full">
     <Image src="/logo.png" width={65} height={65} alt="Logo" />
    </Link>
    {/* show if user */}
    {/* <ul className="flex flex-col mt-2 gap-4">
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
    <PostModal /> */}
   </nav>
   {/* show if user */}
   {/* <div className="mb-4 rounded-full" tabIndex={0}>
    <LeftMenuUserInfo />
   </div> */}
  </aside>
 );
};
export default LeftMenu;
