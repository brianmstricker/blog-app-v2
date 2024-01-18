"use client";

import { createPortal, useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { ThreeCircles } from "react-loader-spinner";
import HideScroll from "../HideScroll";

const MainGoogleButton = () => {
 const { pending } = useFormStatus();
 return (
  <>
   <button
    type="submit"
    className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold flex items-center justify-center gap-2 border border-black/30 dark:border-x-transparent w-full hover:bg-black/5 dark:hover:bg-white/90"
   >
    <FcGoogle className="w-6 h-6" />
    <span>Sign up with Google</span>
   </button>
   {pending &&
    createPortal(
     <HideScroll>
      <div className="w-screen h-screen fixed inset-0 bg-slate-600/80 dark:bg-[#5b708366] z-[100] flex justify-center items-center select-none">
       <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#1d9bf0"
        ariaLabel="three-circles-loading"
       />
      </div>
     </HideScroll>,
     document.body
    )}
  </>
 );
};
export default MainGoogleButton;
