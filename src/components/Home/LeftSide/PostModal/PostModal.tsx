"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import ModalTweetBox from "../ModalTweetBox";
import { createPortal } from "react-dom";
import HideScroll from "@/components/HideScroll";
import { ThreeCircles } from "react-loader-spinner";

const PostModal = () => {
 const router = useRouter();
 //todo: fix tab key when modal is open
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
   router.push("/");
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
  const handleKeyDown = (e: any) => {
   if (e.key === "Tab" && modalRef.current) {
    const modalElements = modalRef.current.querySelectorAll(
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
   <button
    onClick={showModal}
    className="w-full mt-8 rounded-full text-lg font-medium bg-main text-white py-3 hover:bg-main/90 transition-all duration-150"
   >
    Post
   </button>
   {modalShow &&
    createPortal(
     <>
      <HideScroll />
      <div className="w-screen h-screen fixed inset-0 bg-slate-600/80 dark:bg-[#5b708366] z-[100] flex justify-center">
       {closingModal && (
        <div className="flex items-center justify-center">
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
         className="bg-white dark:bg-black sm:max-w-[600px] w-[100%] h-[100%] sm:max-h-[275px] rounded-2xl p-4 sm:mt-12 relative"
        >
         <button
          className="p-[2px] rounded-full relative -top-1 -left-1"
          onClick={closeModal}
         >
          <IoClose className="w-5 h-5" />
         </button>
         <div className="h-[90%] pt-4">
          <ModalTweetBox />
         </div>
        </div>
       )}
      </div>
     </>,
     document.body
    )}
  </>
 );
};
export default PostModal;
