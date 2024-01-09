"use client";
import { logoutAction } from "@/actions/auth-actions";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const LeftMenuUserInfo = ({ user }: { user: User }) => {
 const [showLogoutMenu, setShowLogoutMenu] = useState(false);
 const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
 const logoutMenuRef = useRef<HTMLDivElement>(null);
 // onClick={async () => {
 //       await logoutAction();
 //       window.location.reload();
 //      }}
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const modalNode = logoutMenuRef.current;
   if (modalNode && !modalNode.contains(e.target)) {
    setShowLogoutMenu(false);
   }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
   document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [logoutMenuRef]);
 return (
  <>
   <div className="relative">
    {showLogoutMenu && (
     <div
      ref={logoutMenuRef}
      className="boxShadow bg-white dark:bg-black rounded-2xl border dark:border-white/25 h-full w-full min-w-[260px] max-w-[360px] min-h-[80px] max-h-[480px] relative -top-4 overflow-hidden pt-3"
     >
      <button
       id="logout"
       onClick={() => setShowConfirmLogoutModal(true)}
       type="submit"
       className="font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-150 w-full text-start py-2"
      >
       <span className="block pl-4">Log out @{user.handle}</span>
      </button>
     </div>
    )}
    <div
     tabIndex={0}
     onClick={() => setShowLogoutMenu((prev) => !prev)}
     className={cn(
      "flex items-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 p-3 rounded-full transition-all duration-150",
      showLogoutMenu && "pointer-events-none"
     )}
    >
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
     <div className="flex flex-1 flex-col ml-4 select-none">
      <span className="font-bold text-[14px] leading-[18px]">
       {user.username}
      </span>
      <span className="text-mainGray">@{user.handle}</span>
     </div>
     <div>
      <HiMiniEllipsisHorizontal />
     </div>
    </div>
   </div>
   {/* todo: work on this */}
   {showConfirmLogoutModal && <div className="fixed">test</div>}
  </>
 );
};
export default LeftMenuUserInfo;
