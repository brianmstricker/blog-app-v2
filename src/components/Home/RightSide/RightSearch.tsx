"use client";
import { FiSearch } from "react-icons/fi";

const RightSearch = () => {
 return (
  <div className="mt-1.5">
   <div className="relative flex items-center group">
    <div className="absolute left-4 py-3 dark:placeholder-white/50 placeholder-black/50 pointer-events-none group-focus:text-blue-400 group-focus-within:text-blue-400">
     <FiSearch />
    </div>
    <input
     className="font-light border-none dark:bg-secondary bg-secondary/10 rounded-full py-3 px-4 outline-none dark:placeholder-white/50 placeholder-black/50 w-full text-[15px] focus:outline-blue-400 focus:outline-[1.5px] focus:bg-transparent pl-14"
     placeholder="Search"
    />
   </div>
  </div>
 );
};
export default RightSearch;
