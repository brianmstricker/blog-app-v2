"use client";
import { FiSearch } from "react-icons/fi";

const RightSearch = () => {
 return (
  <div className="mt-1.5">
   <div className="relative flex items-center group">
    <div className="absolute left-3 py-3 text-white/50 pointer-events-none group-focus:text-blue-400 group-focus-within:text-blue-400">
     <FiSearch />
    </div>
    <input
     className="font-light border-none bg-white/15 rounded-full py-3 px-4 outline-none placeholder-white/50 w-full text-[15px] focus:outline-blue-400 focus:outline-[1.5px] focus:bg-transparent pl-10"
     placeholder="Search"
    />
   </div>
  </div>
 );
};
export default RightSearch;
