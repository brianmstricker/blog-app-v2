"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
 const [scaledDimensions, setScaledDimensions] = useState({
  width: 0,
  height: 0,
 });
 const imgRef = useRef<HTMLDivElement | null>(null);
 const menuRef = useRef<HTMLDivElement | null>(null);
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const modalNode = imgRef.current;
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
 }, [closeModal]);
 useEffect(() => {
  const handleKeyDown = (e: any) => {
   if (e.key === "Escape") {
    closeModal();
   }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [closeModal]);
 const calculateScaledDimensions = useCallback(() => {
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  const aspectRatio = Number(media.aspectRatio);
  let width, height;
  if (aspectRatio > 1) {
   width = maxWidth;
   height = maxWidth / aspectRatio;
  } else {
   height = maxHeight;
   width = maxHeight * aspectRatio;
  }
  width = Math.min(width, Number(media.width));
  height = Math.min(height, Number(media.height));
  return { width, height };
 }, [media.aspectRatio, media.width, media.height]);
 useEffect(() => {
  const updateDimensions = () => {
   const newDimensions = calculateScaledDimensions();
   setScaledDimensions(newDimensions);
  };
  updateDimensions();
  window.addEventListener("resize", updateDimensions);
  return () => {
   window.removeEventListener("resize", updateDimensions);
  };
 }, [media.aspectRatio, calculateScaledDimensions]);
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
       <div className="w-full h-full relative flex flex-col overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
         <div ref={imgRef}>
          <Image
           src={media.url}
           alt="tweet media"
           className="mx-auto max-w-full max-h-full"
           style={{ aspectRatio: Number(media.aspectRatio) }}
           width={scaledDimensions.width}
           height={scaledDimensions.height}
          />
         </div>
        </div>
        <div className="w-full border">
         <div tabIndex={0}>like/favorite/etc</div>
        </div>
       </div>
       <div
        ref={menuRef}
        className="h-full bg-black ml-auto border-l dark:border-l-white/25 shrink-0 min-w-[330px] max-w-[330px]"
       >
        <div className="p-2">right menu here</div>
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
