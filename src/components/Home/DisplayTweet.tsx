"use client";
import { VscEllipsis } from "react-icons/vsc";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { LuBookmark } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { FiShare } from "react-icons/fi";

const DisplayTweet = () => {
 return (
  <div className="border-b dark:border-b-white/25">
   <article className="py-2 px-3 flex gap-3" tabIndex={0}>
    <div>
     <div className="w-11 h-11 rounded-full bg-blue-600 " />
    </div>
    <div>
     <div className="flex items-center justify-between">
      <div className="flex gap-1 items-center">
       <span>yo</span>
       <span className="text-mainGray">@johndoe</span>
       <span className="text-mainGray">&#183;</span>
       <span className="text-mainGray">Sep 26, 2022</span>
      </div>
      <div className="text-mainGray text-xl relative -left-2">
       <VscEllipsis />
      </div>
     </div>
     <div className="text-[15px] mt-[2px]">
      My girlfriend got me a maybach van and it&apos;s fire she listen 2 all my
      conversations lollll 🥹🫠 I was like damn why you do that she was like
      because I love you … I was like no you don&apos;t she was like yes I do …
      I was like no you don&apos;t she was like yes I do Jatavia Johnson a mess
     </div>
     <div className="mt-3 relative w-[400px] max-w-[70%] h-[600px] max-h-[510px]">
      <Image
       src="/testImage.jpg"
       alt="tweet"
       className="rounded-2xl object-cover"
       fill
      />
     </div>
     <div className="mt-4 mb-1 flex items-center justify-between text-mainGray">
      <div className="flex items-center justify-between max-w-[70%] w-full">
       <div className="flex items-center gap-1">
        <BiMessageRounded className="text-lg" />
        <span className="text-[13px]">938</span>
       </div>
       <div className="flex items-center gap-1">
        <FaRetweet className="text-lg" />
        <span className="text-[13px]">7.6K</span>
       </div>
       <div className="flex items-center gap-1">
        <FaRegHeart className="text-lg" />
        <span className="text-[13px]">88K</span>
       </div>
      </div>
      <div className="flex items-center gap-3 relative -left-2">
       <LuBookmark className="text-lg" />
       <FiShare className="text-lg" />
      </div>
     </div>
    </div>
   </article>
  </div>
 );
};
export default DisplayTweet;
