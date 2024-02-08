"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HideScroll from "../HideScroll";
import FocusTrap from "focus-trap-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type DisplayTweetMediaModalProps = {
 mainMedia: null | {
  id: string;
  tweetId: string;
  url: string;
  width: string;
  height: string;
  aspectRatio: string;
 };
 closeModal: () => void;
 otherMedia?: {
  id: string;
  tweetId: string;
  url: string;
  width: string;
  height: string;
  aspectRatio: string;
 }[];
 mainMediaIndex: string;
};

type OtherMedia = {
 id: string;
 tweetId: string;
 url: string;
 width: string;
 height: string;
 aspectRatio: string;
};

//todo: create a context for the right menu being hidden/shown

const DisplayTweetMediaModal = ({
 mainMedia: media,
 closeModal,
 otherMedia,
 mainMediaIndex,
}: DisplayTweetMediaModalProps) => {
 const [scaledDimensions, setScaledDimensions] = useState({
  width: 0,
  height: 0,
 });
 const [otherScaledDimensions, setOtherScaledDimensions] = useState<
  [] | { width: number; height: number }[]
 >([]);
 const [activeMediaIndex, setActiveMediaIndex] = useState(
  Number(mainMediaIndex)
 );
 const [showRightMenu, setShowRightMenu] = useState(true);
 const imgRef = useRef<HTMLImageElement | null>(null);
 const menuRef = useRef<HTMLDivElement | null>(null);
 const hideMenuButtonRef = useRef<HTMLButtonElement | null>(null);
 const rightButtonRef = useRef<HTMLButtonElement | null>(null);
 const leftButtonRef = useRef<HTMLButtonElement | null>(null);
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const modalNode = imgRef.current;
   const hideMenuButtonNode = hideMenuButtonRef.current;
   const menuNode = menuRef.current;
   if (
    modalNode &&
    !modalNode.contains(e.target) &&
    menuNode &&
    !menuNode.contains(e.target) &&
    hideMenuButtonNode &&
    !hideMenuButtonNode.contains(e.target) &&
    rightButtonRef.current &&
    !rightButtonRef.current.contains(e.target) &&
    leftButtonRef.current &&
    !leftButtonRef.current.contains(e.target)
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
  if (!media) return;
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  const aspectRatio = Number(media.aspectRatio);
  let width: number, height: number;
  if (aspectRatio > 1) {
   width = maxWidth;
   height = maxWidth / aspectRatio;
  } else {
   height = maxHeight;
   width = maxHeight * aspectRatio;
  }
  width = Math.min(width, Number(media?.width));
  height = Math.min(height, Number(media?.height));
  if (!otherMedia) return { width, height };
  if (otherMedia) {
   let otherWidth: number[] = [];
   let otherHeight: number[] = [];
   otherMedia.forEach((otherMediaItem: OtherMedia) => {
    const otherMediaAspectRatio = Number(otherMediaItem.aspectRatio);
    let tempWidth: number, tempHeight: number;
    if (otherMediaAspectRatio > 1) {
     tempWidth = maxWidth;
     tempHeight = maxWidth / otherMediaAspectRatio;
    } else {
     tempHeight = maxHeight;
     tempWidth = maxHeight * otherMediaAspectRatio;
    }
    otherWidth.push(Math.min(Number(otherMediaItem.width), tempWidth));
    otherHeight.push(Math.min(Number(otherMediaItem.height), tempHeight));
   });
   return { width, height, otherWidth, otherHeight };
  }
 }, [media, otherMedia]);
 useEffect(() => {
  const updateDimensions = () => {
   const newDimensions = calculateScaledDimensions();
   if (!newDimensions) return;
   setScaledDimensions({
    width: newDimensions.width,
    height: newDimensions.height,
   });
   if (newDimensions.otherWidth && newDimensions.otherHeight) {
    setOtherScaledDimensions(
     newDimensions.otherWidth.map((width, i) => ({
      width,
      height: newDimensions.otherHeight[i],
     }))
    );
   }
  };
  updateDimensions();
  window.addEventListener("resize", updateDimensions);
  return () => {
   window.removeEventListener("resize", updateDimensions);
  };
 }, [media?.aspectRatio, calculateScaledDimensions]);
 const mainMediaIndexNum = parseInt(mainMediaIndex);
 const allMedia = useMemo(() => {
  if (mainMediaIndex !== null && media && otherMedia) {
   const clonedAllMedia = [...otherMedia];
   clonedAllMedia.splice(mainMediaIndexNum, 0, media);
   return clonedAllMedia;
  }
  return [media, ...(otherMedia || [])];
 }, [mainMediaIndexNum, media, otherMedia, mainMediaIndex]);
 const updatedOtherDimensions = [...otherScaledDimensions];
 updatedOtherDimensions.splice(mainMediaIndexNum, 0, scaledDimensions);
 const allDimensions = updatedOtherDimensions;
 function clickLeft() {
  if (activeMediaIndex === 0) return;
  const image = imgRef.current;
  if (image) {
   image.style.opacity = "0";
   setTimeout(() => {
    setActiveMediaIndex((prev) => Number(prev) - 1);
    image.style.opacity = "1";
   }, 125);
  }
 }
 function clickRight() {
  if (activeMediaIndex === allMedia.length - 1) {
   return;
  }
  const image = imgRef.current;
  if (image) {
   image.style.opacity = "0";
   setTimeout(() => {
    setActiveMediaIndex((prev) => Number(prev) + 1);
    image.style.opacity = "1";
   }, 125);
  }
 }
 return createPortal(
  <>
   <HideScroll>
    <FocusTrap>
     <div
      onClick={(e) => {
       e.stopPropagation();
       e.preventDefault();
      }}
      className="bg-black/20 dark:bg-white/10 w-screen h-screen fixed inset-0 z-[99]"
     >
      <div className="bg-white/85 dark:bg-black/85 w-screen h-screen fixed inset-0 z-[100]">
       <div className="flex h-full">
        <div className="w-full h-full relative flex flex-col">
         <div className="flex-1 shrink flex items-center justify-center relative overflow-hidden">
          {media && (
           <>
            <button
             onClick={closeModal}
             className="absolute top-2.5 left-2.5 p-2 bg-white/80 dark:bg-black/80 rounded-full z-10"
            >
             <IoClose className="text-2xl text-black dark:text-white" />
            </button>
            <button
             ref={hideMenuButtonRef}
             onClick={() => setShowRightMenu((prev) => !prev)}
             className="absolute top-2.5 right-2.5 p-2 bg-white/80 dark:bg-black/80 rounded-full z-10"
            >
             {showRightMenu ? (
              <AiOutlineDoubleRight className="text-2xl text-black dark:text-white" />
             ) : (
              <AiOutlineDoubleLeft className="text-2xl text-black dark:text-white" />
             )}
            </button>
            {allMedia &&
             allDimensions.length === allMedia.length &&
             allMedia.length > 0 &&
             allMedia.map((med, i) => (
              <div key={med!.id} className="w-fit h-fit">
               {i === activeMediaIndex && (
                <Image
                 ref={imgRef}
                 src={med!.url}
                 alt="tweet media"
                 width={allDimensions[i].width}
                 height={allDimensions[i].height}
                 className="max-w-full max-h-full object-contain w-fit relative transition-all imgModalMedia"
                 style={{ aspectRatio: Number(med!.aspectRatio) }}
                />
               )}
              </div>
             ))}
           </>
          )}
          <button
           ref={leftButtonRef}
           onClick={clickLeft}
           className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white dark:bg-black rounded-full hover:bg-black/5 dark:hover:bg-secondary z-10",
            activeMediaIndex !== 0
             ? "opacity-100"
             : "opacity-0 pointer-events-none cursor-default"
           )}
          >
           <FaArrowLeft className="fill-black dark:fill-white" />
          </button>
          <button
           ref={rightButtonRef}
           onClick={clickRight}
           className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 dark:bg-black/90 rounded-full hover:bg-black/5 dark:hover:bg-secondary z-10",
            activeMediaIndex !== allMedia.length - 1
             ? "opacity-100"
             : "opacity-0 pointer-events-none cursor-default"
           )}
          >
           <FaArrowRight className="fill-black dark:fill-white" />
          </button>
         </div>
         <div tabIndex={0} className="w-full shrink-0 py-3 flex justify-center">
          <div>like/favorite/etc</div>
         </div>
        </div>
        <div
         ref={menuRef}
         className={cn(
          "h-full bg-white dark:bg-black ml-auto border-l dark:border-l-white/25 shrink-0 min-w-[330px] max-w-[330px]",
          !showRightMenu && "hidden"
         )}
        >
         <div className="p-2">right menu here</div>
        </div>
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
