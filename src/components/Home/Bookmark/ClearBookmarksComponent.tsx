"use client";
import { clearBookmarksAction } from "@/actions/tweet-actions";
import HideScroll from "@/components/HideScroll";
import { cn } from "@/lib/utils";
import FocusTrap from "focus-trap-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { VscEllipsis } from "react-icons/vsc";

const ClearBookmarksComponent = () => {
 const [showMenu, setShowMenu] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const menuRef = useRef<HTMLDivElement>(null);
 const modalRef = useRef<HTMLDivElement>(null);
 function closeMenu() {
  const menu = document.querySelector("#clearBookmarksMenu");
  if (menu) {
   menu.classList.add("fadeOut");
   setTimeout(() => {
    menu.classList.remove("fadeOut");
    setShowMenu(false);
   }, 100);
  }
 }
 function closeModal() {
  const modal = document.querySelector("#clearBookmarksModal");
  if (modal) {
   modal.classList.add("fadeOut");
   setTimeout(() => {
    modal.classList.remove("fadeOut");
    setShowModal(false);
   }, 300);
  }
 }
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const menuNode = menuRef.current;
   if (menuNode && !menuNode.contains(e.target)) {
    closeMenu();
   }
   const modalNode = modalRef.current;
   if (modalNode && !modalNode.contains(e.target)) {
    closeModal();
   }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
   document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [menuRef, modalRef]);
 useEffect(() => {
  if (!showMenu && !showModal) return;
  const handleKeyDown = (e: any) => {
   if (e.key === "Escape") {
    closeMenu();
    closeModal();
   }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [showMenu, showModal]);
 async function clearBookmarks() {
  const clear = await clearBookmarksAction();
  if (clear.success) {
   closeModal();
  }
 }
 return (
  <div className="h-10">
   <div
    tabIndex={0}
    onClick={() => setShowMenu(true)}
    className={cn(
     "transition-all duration-150 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-lg cursor-pointer",
     showMenu && "opacity-0 absolute duration-0"
    )}
   >
    <VscEllipsis className="text-2xl" />
   </div>
   {showMenu && (
    <div
     id="clearBookmarksMenu"
     onClick={() => {
      setShowModal(true);
      setShowMenu(false);
     }}
     ref={menuRef}
     className="bg-white dark:bg-black border dark:border-white/25 rounded-xl px-4 py-2 boxShadow fadeIn cursor-pointer"
    >
     <span className="text-[16px] text-red-500 font-semibold">
      Clear all Bookmarks
     </span>
    </div>
   )}
   {showModal &&
    createPortal(
     <>
      <HideScroll>
       <FocusTrap>
        <div className="fixed dark:bg-cyan-200/10 bg-black/10 inset-0 w-screen h-screen z-[100] flex items-center justify-center fadeIn">
         <div
          ref={modalRef}
          id="clearBookmarksModal"
          className="bg-black max-w-xs rounded-xl py-7 px-9 fadeIn"
         >
          <h2 className="text-xl font-bold">Clear all Bookmarks?</h2>
          <p className="text-mainGray max-w-[95%] text-[15px] mt-2 leading-5">
           This can&apos;t be undone and you&apos;ll remove all posts
           you&apos;ve added to your Bookmarks.
          </p>
          <div className="flex flex-col gap-3 mt-5">
           <button
            onClick={clearBookmarks}
            className="py-2.5 rounded-full bg-red-500 border border-red-500 text-white font-bold transition-all duration-200 hover:bg-red-600 hover:border-red-600"
           >
            Clear
           </button>
           <button
            onClick={closeModal}
            className="py-2.5 rounded-full border dark:border-white/25 font-bold transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
           >
            Cancel
           </button>
          </div>
         </div>
        </div>
       </FocusTrap>
      </HideScroll>
     </>,
     document.body
    )}
  </div>
 );
};
export default ClearBookmarksComponent;
