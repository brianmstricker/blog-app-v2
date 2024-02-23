"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import ModalTweetBox from "../ModalTweetBox";
import { createPortal } from "react-dom";
import HideScroll from "@/components/HideScroll";
import { ThreeCircles } from "react-loader-spinner";
import FocusTrap from "focus-trap-react";
import { PiFeather } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";

const PostModal = ({ userImg }: { userImg?: string | null }) => {
 const router = useRouter();
 const modalRef = useRef<HTMLDivElement | null>(null);
 const path = usePathname();
 const [prevPath, setPrevPath] = useState("");
 const [modalShow, setModalShow] = useState(false);
 const [closingModal, setClosingModal] = useState(false);
 const closeModal = useCallback(() => {
  if (prevPath && prevPath !== "/compose/tweet") {
   window.history.pushState(null, "", prevPath);
   setModalShow(false);
  } else {
   setClosingModal(true);
   setModalShow(false);
   router.push("/", { scroll: false });
  }
  setModalShow(false);
 }, [prevPath, router]);
 function showModal() {
  setClosingModal(false);
  setPrevPath(path);
  window.history.pushState(null, "", "/compose/tweet");
  setModalShow(true);
 }
 const handlePopstate = useCallback(() => {
  if (path) {
   window.history.pushState(null, "", path);
  }
  setModalShow(false);
 }, [path]);
 useEffect(() => {
  window.addEventListener("popstate", handlePopstate);
  return () => {
   window.removeEventListener("popstate", handlePopstate);
  };
 }, [handlePopstate]);
 useEffect(() => {
  if (path === "/compose/tweet") {
   setModalShow(true);
  }
  if (window.location.pathname !== "/compose/tweet" && modalShow) {
   closeModal();
  }
 }, [path, modalShow, closeModal]);
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const modalNode = modalRef.current;
   if (modalNode && !modalNode.contains(e.target)) {
    closeModal();
   }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
   document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [modalRef, closeModal]);
 useEffect(() => {
  if (!modalShow) return;
  const handleKeyDown = (e: any) => {
   if (e.key === "Escape") {
    closeModal();
   }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => {
   window.removeEventListener("keydown", handleKeyDown);
  };
 }, [closeModal, modalShow]);
 return (
  <>
   <button
    onClick={showModal}
    className="w-fit xl:w-full mt-4 md:mt-8 rounded-full text-lg font-medium bg-main text-white py-3 xl:px-0 hover:bg-main/90 transition-all duration-150 px-3 relative"
   >
    <span className="hidden xl:block">Post</span>
    <PiFeather className="xl:hidden text-[18px] sm:text-[22px] md:text-2xl relative top-[2px]" />
    <FaPlus className="xl:hidden absolute text-[9px] sm:text-[10px] top-2" />
   </button>
   {modalShow &&
    createPortal(
     <>
      <HideScroll>
       <FocusTrap>
        <div className="w-screen h-screen fixed inset-0 bg-slate-600/80 dark:bg-[#5b708366] z-[100] flex justify-center">
         {closingModal && (
          <div className="flex items-center justify-center">
           <div tabIndex={0} className="w-0 h-0" />
           <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#1d9bf0"
            ariaLabel="three-circles-loading"
           />
          </div>
         )}
         {!closingModal && (
          <div
           ref={modalRef}
           className="bg-white dark:bg-black sm:max-w-[600px] w-[100%] h-[100%] sm:max-h-[275px] rounded-2xl p-3 sm:mt-12 relative"
          >
           <button
            className="p-[2px] rounded-full relative top-1 left-1"
            onClick={closeModal}
           >
            <IoClose className="w-5 h-5" />
           </button>
           <div className="h-[90%]">
            <ModalTweetBox userImg={userImg} closeModal={closeModal} />
           </div>
          </div>
         )}
        </div>
       </FocusTrap>
      </HideScroll>
     </>,
     document.body
    )}
  </>
 );
};
export default PostModal;
