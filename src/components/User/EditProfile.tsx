"use client";
import { User } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HideScroll from "../HideScroll";
import FocusTrap from "focus-trap-react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { TbCameraPlus } from "react-icons/tb";
import EditProfileForm from "./EditProfileForm";

const EditProfile = ({ user }: { user: User }) => {
 const [showModal, setShowModal] = useState(false);
 const modalRef = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   if (!showModal) return;
   const modalNode = modalRef.current;
   if (modalNode && !modalNode.contains(e.target)) {
    setShowModal(false);
   }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
   document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [modalRef, showModal]);
 useEffect(() => {
  if (!showModal) return;
  const handleKeyDown = (e: any) => {
   if (e.key === "Escape") {
    setShowModal(false);
   }
  };
  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
 }, [showModal]);
 return (
  <>
   <button
    onClick={() => setShowModal(true)}
    className="font-bold px-4 py-1.5 border dark:border-white/35 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300"
   >
    Edit profile
   </button>
   {showModal &&
    createPortal(
     <HideScroll>
      <FocusTrap>
       <div className="w-screen h-screen fixed inset-0 bg-slate-600/80 dark:bg-[#5b708366] z-[100] flex justify-center items-center">
        <div
         ref={modalRef}
         className="bg-white dark:bg-black w-screen h-screen sm:w-[30em] sm:h-[35em] md:w-[40em] md:h-[40em] rounded-2xl shadow-lg overflow-y-auto"
        >
         <div className="flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-8">
           <button
            onClick={() => setShowModal(false)}
            className="p-2 rounded-full dark:hover:bg-mainGray/20 transition-all duration-300 hover:bg-black/5"
           >
            <IoClose className="text-2xl" />
           </button>
           <div className="font-bold text-xl">Edit Profile</div>
          </div>
          <button className="bg-black text-white dark:bg-white dark:text-black py-1 px-4 rounded-full font-semibold">
           Save
          </button>
         </div>
         <div className="flex justify-center items-center w-full min-h-[200px]">
          <button className="p-3 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-secondary dark:hover:brightness-125 transition-all duration-300">
           <TbCameraPlus className="text-xl" />
          </button>
         </div>
         <div className="px-5 select-none">
          {!user.image ? (
           <div className=" w-[40px] h-[40px] sm:w-32 sm:h-32 rounded-full bg-blue-600 relative -top-20 ring-white dark:ring-black ring-4" />
          ) : (
           <div className="relative w-[40px] h-[40px] sm:w-32 sm:h-32 rounded-full -top-20 ring-white dark:ring-black ring-4 flex items-center justify-center">
            <Image
             src={user.image}
             alt="user PFP"
             fill
             className="rounded-full"
             quality={100}
             sizes="(max-width: 640px) 40px, 128px"
            />
            <button className="p-3 rounded-full bg-neutral-200 hover:bg-neutral-200/70 dark:bg-secondary dark:hover:bg-opacity-70 transition-all duration-300 z-[2] bg-opacity-50 dark:bg-opacity-40">
             <TbCameraPlus className="text-xl" />
            </button>
           </div>
          )}
         </div>
         <EditProfileForm user={user} />
        </div>
       </div>
      </FocusTrap>
     </HideScroll>,
     document.body
    )}
  </>
 );
};
export default EditProfile;
