"use client";
import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";

const ArrowBack = ({
 referer,
 userPage,
}: {
 referer: string | null;
 userPage?: boolean;
}) => {
 const router = useRouter();
 async function goBack() {
  if (referer?.includes("home") || referer?.includes("bookmarks")) {
   router.back();
  } else {
   router.push("/home");
  }
 }
 return (
  <>
   {!userPage ? (
    <div className="sticky top-0 flex items-center gap-10 py-4 px-6 z-10 bg-white/85 dark:bg-black/85 backdrop-blur-sm">
     <button onClick={goBack} className="p-1 rounded-full">
      <IoArrowBackSharp className="w-5 h-5" />
     </button>
     <span className="font-bold text-xl">Post</span>
    </div>
   ) : (
    <button onClick={goBack} className="p-1 rounded-full">
     <IoArrowBackSharp className="w-6 h-6" />
    </button>
   )}
  </>
 );
};
export default ArrowBack;
