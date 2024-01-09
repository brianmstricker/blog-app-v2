import { User } from "next-auth";
import Image from "next/image";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const LeftMenuUserInfo = ({ user }: { user: User }) => {
 console.log(user);
 return (
  <div className="flex items-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 p-3 rounded-full transition-all duration-150">
   {!user.image ? (
    <div className="w-11 h-11 rounded-full bg-blue-600" />
   ) : (
    <div className="relative w-11 h-11 rounded-full">
     <Image
      src={user.image}
      alt="user PFP"
      fill
      className="rounded-full"
      sizes="44px"
     />
    </div>
   )}
   <div className="flex flex-1 flex-col ml-4">
    <span className="font-bold text-[14px] leading-[18px]">
     {user.username}
    </span>
    <span className="text-mainGray">@{user.handle}</span>
   </div>
   <div>
    <HiMiniEllipsisHorizontal />
   </div>
  </div>
 );
};
export default LeftMenuUserInfo;
