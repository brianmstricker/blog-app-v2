"use client";
import { createPortal } from "react-dom";
import UsernameHandleForm from "./UsernameHandleForm";
import { logoutAction } from "@/actions/auth-actions";
import HideScroll from "./HideScroll";
import { useEffect, useRef } from "react";

const UsernameHandleWrapperModal = ({
 userImage,
}: {
 userImage: string | null | undefined;
}) => {
 const modalRef = useRef<HTMLDivElement | null>(null);
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
 return createPortal(
  <>
   <HideScroll />
   <div
    ref={modalRef}
    className="w-screen h-screen fixed inset-0 bg-[#5b708375] flex justify-center items-center z-[100] backdrop-blur-[3px]"
   >
    <div className="bg-white dark:bg-black w-full h-full sm:w-[90%] sm:h-auto max-w-[800px] sm:rounded-2xl p-4">
     <div>
      <h2 className="text-4xl font-bold text-center">Finish Account Setup</h2>
      <div className="w-fit mx-auto">
       <p className="text-sm text-gray-400 my-1">
        To finish creating your account add a username and handle so people can
        discover you, or{" "}
        <button
         onClick={async () => {
          await logoutAction();
          window.location.reload();
         }}
         type="submit"
         className="text-red-600 dark:text-red-500/80 inline hover:underline underline-offset-2"
        >
         logout
        </button>{" "}
        to continue browsing as a guest.
       </p>
      </div>
     </div>
     <UsernameHandleForm userImage={userImage} />
    </div>
   </div>
  </>,
  document.body
 );
};
export default UsernameHandleWrapperModal;
