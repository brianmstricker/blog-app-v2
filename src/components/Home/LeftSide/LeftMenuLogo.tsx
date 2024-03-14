"use client";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LeftMenuLogo = ({ user }: { user: boolean }) => {
 const path = usePathname();
 const [activePath, setActivePath] = useState(path);
 useEffect(() => {
  setActivePath(path);
 }, [path]);
 return (
  <div className="flex items-center gap-2">
   <Link
    href={!user ? "/" : "/home"}
    scroll={false}
    onClick={() => {
     window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="relative -right-[2px] w-[46px] h-[46px] md:w-[52px] md:h-[52px] block"
   >
    <Image src="/logo.png" alt="Logo" width={52} height={52} />
   </Link>
   {activePath !== "/" && activePath !== "/home" && <ThemeToggleButton />}
  </div>
 );
};
export default LeftMenuLogo;
