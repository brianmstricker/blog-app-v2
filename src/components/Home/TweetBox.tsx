"use client";
import { FaRegImage, FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { useState } from "react";
import { cn } from "@/lib/utils";

const TweetBox = () => {
 const [whoCanReply, setWhoCanReply] = useState(false);
 const [tweet, setTweet] = useState("");
 const tweetOptions = [
  { icon: <FaRegImage />, text: "Media" },
  { icon: <MdOutlineGifBox />, text: "GIF" },
  { icon: <BiSliderAlt />, text: "Poll" },
  { icon: <FaRegSmile />, text: "Emoji" },
 ];
 function handleInput(e: any) {
  const text = e.target.innerHTML;
  setTweet(text);
  console.log(tweet);
 }
 const buttonDisabled = tweet === "" || tweet === " " || tweet === "<br>";
 return (
  <div className="border-b dark:border-b-white/25">
   <div className="px-4 pt-2.5 pb-1.5 flex">
    <div>
     <div className="w-11 h-11 rounded-full bg-blue-600 " />
    </div>
    <div className="flex flex-col ml-3 py-2 grow max-w-[92%]">
     <div className="relative min-h-[40px] max-h-[600px] text-xl overflow-y-auto">
      <div className="select-none pointer-events-none">
       {!tweet && (
        <span className="absolute dark:text-white/50 text-gray-500/50 font-extralight">
         What is happening?!
        </span>
       )}
      </div>
      <div
       contentEditable={true}
       id="tweetBox"
       className="outline-none whitespace-pre-wrap break-words h-full select-text block font-light"
       tabIndex={0}
       onInput={handleInput}
       onFocus={() => setWhoCanReply(true)}
      />
     </div>
     {whoCanReply && (
      <div className="border-b dark:border-b-white/25 my-2">
       <div className="mb-4 flex items-center gap-2 ml-1 text-main text-sm font-medium">
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
       disabled={buttonDisabled}
      >
       Post
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default TweetBox;
