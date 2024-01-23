"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import HideScroll from "../HideScroll";
import FocusTrap from "focus-trap-react";
import Image from "next/image";

type DisplayTweetMediaModalProps = {
 media: {
  id: string;
  tweetId: string;
  url: string;
  width: string;
  height: string;
  aspectRatio: string;
 };
 closeModal: () => void;
};

const DisplayTweetMediaModal = ({
 media,
 closeModal,
}: DisplayTweetMediaModalProps) => {
 const modalRef = useRef<HTMLDivElement | null>(null);
 const menuRef = useRef<HTMLDivElement | null>(null);
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const modalNode = modalRef.current;
   const menuNode = menuRef.current;
   if (
    modalNode &&
    !modalNode.contains(e.target) &&
    menuNode &&
    !menuNode.contains(e.target)
   ) {
    closeModal();
   }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
   document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [modalRef, closeModal]);
 // useEffect(() => {
 //  if (!modalShow) return;
 //  const handleKeyDown = (e: any) => {
 //   if (e.key === "Escape") {
 //    closeModal();
 //   }
 //  };
 //  window.addEventListener("keydown", handleKeyDown);
 //  return () => {
 //   window.removeEventListener("keydown", handleKeyDown);
 //  };
 // }, [closeModal, modalShow]);
 return createPortal(
  <>
   <HideScroll>
    <FocusTrap>
     <div
      onClick={(e) => {
       e.stopPropagation();
       e.preventDefault();
      }}
      className="w-screen h-screen fixed inset-0 bg-white/95 dark:bg-black/95 z-[100]"
     >
      <div className="flex h-full">
       <div className="w-full h-full flex justify-center">
        <div ref={modalRef} className="w-[95%] h-[95%] mx-auto -top-2 relative">
         <div className="relative h-full w-full">
          <Image
           src={media.url}
           alt="tweet media"
           className="object-contain"
           fill
          />
         </div>
         <div className="text-center">
          <div className="w-fit mx-auto" tabIndex={0}>
           like/favorite/etc
          </div>
         </div>
        </div>
       </div>
       <div
        ref={menuRef}
        className="h-full bg-black ml-auto border-l dark:border-l-white/25"
       >
        <div className="p-2  w-[330px]">right menu</div>
       </div>
      </div>
     </div>
    </FocusTrap>
   </HideScroll>
  </>,
  document.body
 );
};
export default DisplayTweetMediaModal;
