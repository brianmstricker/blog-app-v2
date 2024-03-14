import LeftMenuUserInfo from "./LeftMenuUserInfo";
import PostModal from "./PostModal/PostModal";
import LeftMenuNav from "./LeftMenuNav";
import LeftMenuLogo from "./LeftMenuLogo";
import { User } from "next-auth";

const LeftMenu = async ({ user }: { user: User | undefined }) => {
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
