"use client";
import Image from "next/image";
import Link from "next/link";

const LeftMenuLogo = ({ user }: { user: boolean }) => {
 return (
  <div>
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
  </div>
 );
};
export default LeftMenuLogo;
