import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const TopNav = ({ user }: { user: User }) => {
 //todo: add left menu when click on user image
 return (
  <div className="py-2.5 w-full min-[500px]:hidden flex justify-between items-center px-4">
   <div>
    {!!user && !user.image && (
     <div className="w-[30px] h-[30px] rounded-full bg-blue-600" />
    )}
    {!!user && user.image && (
     <Image
      src={user.image}
      alt="user PFP"
      className="rounded-full"
      width={30}
      height={30}
      sizes="30px"
     />
    )}
   </div>
   <div>
    <Link href={!!user ? "/home" : "/"}>
     <Image
      src="/logo.png"
      alt="Chirp logo"
      width={44}
      height={44}
      sizes="44px"
      className="relative -top-[1px]"
     />
    </Link>
   </div>
   <div>
    <ThemeToggleButton />
   </div>
  </div>
 );
};
export default TopNav;
