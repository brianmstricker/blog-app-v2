"use client";
import { User } from "next-auth";
import { createPortal } from "react-dom";
import UsernameHandleForm from "./UsernameHandleForm";

const UsernameHandleWrapper = ({ user }: { user: User | null | undefined }) => {
 if (!user) return null;
 if ((user && !user.username) || (user && !user.handle))
  document.body.style.overflow = "hidden";
 return createPortal(
  <div className="w-screen h-screen fixed inset-0 bg-[#5b708366] flex justify-center items-center z-[100] backdrop-blur-[2px]">
   <div className="bg-black w-1/2 h-1/2 rounded-2xl p-4">
    <div className="text-center">
     <h2 className="text-4xl font-bold">Finish Account Setup</h2>
     <p className="text-sm text-mainGray mt-1">
      To finish creating your account add a username and handle so people can
      find you
     </p>
    </div>
    <UsernameHandleForm />
   </div>
  </div>,
  document.body
 );
};
export default UsernameHandleWrapper;
