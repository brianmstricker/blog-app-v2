"use client";
import { Oval } from "react-loader-spinner";

const Loading = () => {
 return (
  <div className="flex justify-center items-center py-2">
   <div className="w-10 h-10">
    <Oval color="#1da1f2" ariaLabel="oval-loading" secondaryColor="gray" />
   </div>
  </div>
 );
};
export default Loading;
