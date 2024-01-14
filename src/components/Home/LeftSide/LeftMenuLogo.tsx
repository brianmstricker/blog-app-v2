"use client";
import Image from "next/image";
import Link from "next/link";

const LeftMenuLogo = ({ user }: { user: boolean }) => {
 return (
  <Link
   href={!user ? "/" : "/home"}
   className="rounded-full w-fit block"
   scroll={false}
   onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
   }}
  >
   <Image src="/logo.png" width={65} height={65} alt="Logo" />
  </Link>
 );
};
export default LeftMenuLogo;
