import { User } from "next-auth";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const LeftMenuUserInfo = ({ user }: { user: User }) => {
 // console.log(user);
 return (
  <div className="flex items-center cursor-pointer hover:bg-white/10 p-3 rounded-full">
   <div className="w-11 h-11 rounded-full bg-blue-600" />
   <div className="flex flex-1 flex-col ml-4">
    <span className="font-bold text-[14px] leading-[18px]">yo</span>
    <span className="text-mainGray">@johndoe</span>
   </div>
   <div>
    <HiMiniEllipsisHorizontal />
   </div>
  </div>
 );
};
export default LeftMenuUserInfo;
