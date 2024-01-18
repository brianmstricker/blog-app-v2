"use client";
import { logoutAction } from "@/actions/auth-actions";
import HideScroll from "@/components/HideScroll";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";

const LeftMenuUserInfo = ({ user }: { user: User }) => {
 const [showLogoutMenu, setShowLogoutMenu] = useState(false);
 const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);
 const [loading, setLoading] = useState(false);
 const logoutMenuRef = useRef<HTMLDivElement>(null);
 const confirmModalRef = useRef<HTMLDivElement>(null);
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
 useEffect(() => {
  const handleKeyDown = (e: any) => {
   if (e.key === "Tab" && confirmModalRef.current) {
    const modalElements = confirmModalRef.current.querySelectorAll(
     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = modalElements[0] as HTMLElement;
    const lastElement = modalElements[modalElements.length - 1] as HTMLElement;
    if (!e.shiftKey && document.activeElement === lastElement) {
     e.preventDefault();
     firstElement.focus();
    } else if (e.shiftKey && document.activeElement === firstElement) {
     e.preventDefault();
     lastElement.focus();
    }
   }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, []);
 return (
  <>
   <div className="relative">
    {showLogoutMenu && (
     <div
      ref={logoutMenuRef}
      className="boxShadow bg-white dark:bg-black rounded-2xl border dark:border-white/25 h-full w-full min-w-[260px] max-w-[360px] min-h-[80px] max-h-[480px] relative -top-4 pt-3"
     >
      <button
       id="logout"
       onClick={() => setShowConfirmLogoutModal(true)}
       type="submit"
       className="font-bold hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-150 w-full text-start py-2"
      >
       <span className="block pl-4">Log out @{user.handle}</span>
      </button>
      <div className="flex justify-center">
       <svg
        className="triangle absolute -bottom-3 fill-white dark:fill-black"
        viewBox="0 0 24 24"
        aria-hidden="true"
       >
        <g>
         <path d="M22 17H2L12 6l10 11z"></path>
        </g>
       </svg>
      </div>
     </div>
    )}
    <div
     tabIndex={0}
     onClick={() => setShowLogoutMenu((prev) => !prev)}
     className={cn(
      "flex items-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/15 p-3 rounded-full transition-all duration-150",
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
   {showConfirmLogoutModal &&
    createPortal(
     <>
      <HideScroll>
       <div className="fixed bg-black inset-0 w-screen h-screen z-[100]">
        <div className="bg-[#5b708366] fixed inset-0 w-screen h-screen flex items-center justify-center">
         <div
          ref={confirmModalRef}
          className="bg-white dark:bg-black w-fit p-6 rounded-2xl flex flex-col gap-2 max-w-[300px]"
         >
          <div className="w-fit mx-auto relative -top-3">
           <Image
            src="/logo.png"
            alt="Chirp Logo"
            width={75}
            height={75}
            className="rounded-full"
            sizes="75px"
           />
          </div>
          <div className="text-lg font-bold -mt-4">Log out of Chirp?</div>
          <p className="text-sm text-mainGray -mt-1">
           You can always log back in at any time. If you just want to switch
           accounts, you can do that by adding an existing account.{" "}
          </p>
          <button
           onClick={async () => {
            setLoading(true);
            await logoutAction();
            window.location.reload();
            setLoading(false);
           }}
           className={cn(
            "bg-black text-white dark:bg-white dark:text-black rounded-full py-2.5 font-bold mt-3 border border-white dark:border-black",
            loading && "opacity-50 cursor-default"
           )}
           disabled={loading}
          >
           {loading && "Logging out..."}
           {!loading && "Log out"}
          </button>
          <button
           onClick={() => setShowConfirmLogoutModal(false)}
           className="border border-gray-400 rounded-full py-2.5 dark:border-white/20 font-bold"
          >
           Cancel
          </button>
         </div>
        </div>
       </div>
      </HideScroll>
     </>,
     document.body
    )}
  </>
 );
};
export default LeftMenuUserInfo;
