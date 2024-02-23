import LeftMenuUserInfo from "./LeftMenuUserInfo";
import PostModal from "./PostModal/PostModal";
import LeftMenuNav from "./LeftMenuNav";
import { auth } from "@/auth";
import LeftMenuLogo from "./LeftMenuLogo";

const LeftMenu = async () => {
 const userInfo = await auth();
 const user = userInfo?.user;
 return (
  <aside className="h-screen sticky top-0 flex flex-col mr-2 sm:mr-4">
   <nav className="flex-1 flex flex-col items-end xl:block">
    <LeftMenuLogo user={!!user} />
    {!!user && <LeftMenuNav user={user} />}
    {!!user && <PostModal userImg={user?.image} />}
   </nav>
   {!!user && user.username && user.handle && (
    <div className="mb-4 flex xl:block justify-end">
     <LeftMenuUserInfo user={user} />
    </div>
   )}
  </aside>
 );
};
export default LeftMenu;
