import Image from "next/image";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import LeftMenuUserInfo from "./LeftMenuUserInfo";

const LeftMenu = () => {
 const links = [
  { href: "/", label: "Home", icon: GoHomeFill },
  { href: "/explore", label: "Explore", icon: FiSearch },
  { href: "/notifications", label: "Notifications", icon: FaRegBell },
  { href: "/messages", label: "Messages", icon: IoMailOutline },
  { href: "/bookmarks", label: "Bookmarks", icon: FaRegBookmark },
  { href: "/profile", label: "Profile", icon: FaRegUser },
 ];
 return (
  <aside className="h-screen sticky flex flex-col mr-4">
   <nav className="flex-1">
    <Link href={"/"} className="rounded-full">
     <Image src="/logo.png" width={65} height={65} alt="Logo" />
    </Link>
    <ul className="flex flex-col mt-2 gap-4">
     {links.map((link) => (
      <li key={link.label}>
       <Link
        href={link.href}
        className="flex items-center gap-6 py-3 rounded-full px-4"
       >
        {link.icon && <link.icon className="w-7 h-7" />}
        <span className="text-xl">{link.label}</span>
       </Link>
      </li>
     ))}
    </ul>
    <button className="w-full mt-8 rounded-full text-lg font-medium bg-sky-500 text-white py-3 hover:bg-sky-500/90 transition-all duration-150">
     Post
    </button>
   </nav>
   <div className="mb-4 rounded-full" tabIndex={0}>
    <LeftMenuUserInfo />
   </div>
  </aside>
 );
};
export default LeftMenu;
