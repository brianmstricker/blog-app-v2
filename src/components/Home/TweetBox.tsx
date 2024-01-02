"use client";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { FaEarthAmericas } from "react-icons/fa6";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TweetBox = () => {
 const [whoCanReply, setWhoCanReply] = useState(false);
 const [tweet, setTweet] = useState("");
 const tweetOptions = [
  { icon: <CiImageOn />, text: "Media" },
  { icon: <MdOutlineGifBox />, text: "GIF" },
  { icon: <BiSliderAlt />, text: "Poll" },
  { icon: <BsEmojiSmile />, text: "Emoji" },
 ];
 return (
  <div className="border-b dark:border-b-white/25">
   <div className="px-4 pt-3 pb-1.5">
    <div className="flex">
     <div className="w-11 h-11 rounded-full bg-blue-600" />
     <div className="flex flex-col ml-3 flex-1">
      <textarea
       className="text-xl mt-2 font-light border-none bg-transparent outline-none dark:placeholder-white/50 placeholder-gray-500/50 resize-none"
       placeholder="What is happening?!"
       rows={1}
       onClick={() => setWhoCanReply(true)}
       value={tweet}
       onChange={(e) => setTweet(e.target.value)}
      />
      {whoCanReply && (
       <div className="border-b dark:border-b-white/25 mt-4 mb-2">
        <div className="mb-4 flex items-center gap-2 ml-1 text-main text-sm font-bold">
         <FaEarthAmericas />
         <span>Everyone can reply</span>
        </div>
       </div>
      )}
      <div className="flex items-center justify-between">
       <div>
        {tweetOptions.map((option) => (
         <div
          key={option.text}
          className="group inline-flex flex-col relative justify-center items-center mb-2"
         >
          <label
           className="text-main cursor-pointer rounded-full font-bold text-xl inline-flex flex-col items-center p-2 focus:outline-main focus:outline"
           tabIndex={0}
          >
           {option.icon}
           <input type="file" className="hidden" />
          </label>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 mt-2 text-white bg-gray-600 p-1 rounded-sm group-focus-within:opacity-100 w-fit absolute -bottom-6">
           {option.text}
          </span>
         </div>
        ))}
       </div>
       <button
        className={cn(
         "bg-main py-1.5 px-4 rounded-full font-bold text-white transition-all duration-200",
         !tweet ? "opacity-50 cursor-default" : ""
        )}
        disabled={!tweet}
       >
        Post
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};
export default TweetBox;
