"use client";
import { User } from "next-auth";
import { createPortal } from "react-dom";
import UsernameHandleForm from "./UsernameHandleForm";
import { logoutAction } from "@/actions/auth-actions";
import HideScroll from "./HideScroll";

const UsernameHandleWrapper = ({ user }: { user: User | null | undefined }) => {
 if (!user) return null;
 if ((user && !user.username) || (user && !user.handle))
  return createPortal(
   <>
    <HideScroll />
    <div className="w-screen h-screen fixed inset-0 bg-[#5b708375] flex justify-center items-center z-[100] backdrop-blur-[3px]">
     <div className="bg-black w-full h-full md:w-[90%] md:h-[90%] max-w-[1000px] max-h-[600px] rounded-2xl p-4">
      <div className="">
       <h2 className="text-4xl font-bold text-center">Finish Account Setup</h2>
       <div className="w-fit mx-auto">
        <p className="text-sm text-gray-400 mt-1">
         To finish creating your account add a username and handle so people can
         discover you, or{" "}
         <button
          onClick={async () => {
           await logoutAction();
           window.location.reload();
          }}
          type="submit"
          className="text-red-500/80 inline hover:underline underline-offset-2"
         >
          logout
         </button>{" "}
         to continue browsing as a guest.
        </p>
       </div>
      </div>
      <UsernameHandleForm />
     </div>
    </div>
   </>,
   document.body
  );
};
export default UsernameHandleWrapper;
