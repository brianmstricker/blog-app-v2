"use client";
import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";

const ArrowBack = ({ referer }: { referer: string | null }) => {
 const router = useRouter();
 async function goBack() {
  if (referer?.includes("home")) {
   router.back();
  } else {
   router.push("/home");
  }
 }
 return (
  <div className="flex items-center gap-10">
   <button onClick={goBack} className="p-1 rounded-full">
    <IoArrowBackSharp className="w-5 h-5" />
   </button>
   <span className="font-bold text-xl">Post</span>
  </div>
 );
};
export default ArrowBack;
