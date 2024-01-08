import Image from "next/image";
import Link from "next/link";
import LeftMenuUserInfo from "./LeftMenuUserInfo";
import PostModal from "./PostModal";
import LeftMenuNav from "./LeftMenuNav";
import { auth } from "@/auth";

const LeftMenu = async () => {
 const userInfo = await auth();
 const user = userInfo?.user;
 return (
  <aside className="h-screen sticky top-0 flex flex-col mr-4">
   <nav className="flex-1">
    <Link href={!user ? "/" : "/home"} className="rounded-full" scroll={false}>
     <Image src="/logo.png" width={65} height={65} alt="Logo" />
    </Link>
    {!!user && <LeftMenuNav />}
    {!!user && <PostModal />}
   </nav>
   {!!user && (
    <div className="mb-4 rounded-full" tabIndex={0}>
     <LeftMenuUserInfo user={user} />
    </div>
   )}
  </aside>
 );
};
export default LeftMenu;
