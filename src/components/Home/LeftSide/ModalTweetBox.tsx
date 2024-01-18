"use client";
import { FaRegImage, FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { postTweetAction } from "@/actions/tweet-actions";

const ModalTweetBox = ({
 userImg,
 closeModal,
}: {
 userImg?: string | null;
 closeModal: () => void;
}) => {
 const [tweet, setTweet] = useState("");
 const inputRef = useRef<HTMLDivElement | null>(null);
 function handleParentClick() {
  if (inputRef.current) {
   inputRef.current.focus();
   const range = document.createRange();
   range.selectNodeContents(inputRef.current);
   range.collapse(false);
   const selection = window.getSelection();
   if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
   }
  }
 }
 const tweetOptions = [
  { icon: <FaRegImage />, text: "Media" },
  { icon: <MdOutlineGifBox />, text: "GIF" },
  { icon: <BiSliderAlt />, text: "Poll" },
  { icon: <FaRegSmile />, text: "Emoji" },
 ];
 function handleInput(e: any) {
  const text = e.target.innerText;
  const updatedText = text.trim();
  setTweet(updatedText);
 }
 const buttonDisabled =
  tweet === "" || tweet === " " || tweet === "<br>" || tweet.trim() === "";
 async function handleSubmit() {
  const post = await postTweetAction({ text: tweet });
  if (post.success) {
   setTweet("");
   const tweetBox = document.getElementById("tweetBoxModal");
   if (tweetBox) {
    tweetBox.innerHTML = "";
   }
   closeModal();
  }
 }
 return (
  <div className="flex flex-col h-full">
   <div onClick={handleParentClick} className="relative grow pt-6">
    <div className="flex flex-1">
     <div className="pointer-events-none shrink-0">
      <div className="shrink-0 select-none">
       {!userImg ? (
        <div className="w-11 h-11 rounded-full bg-blue-600" />
       ) : (
        <div className="relative w-11 h-11 rounded-full">
         <Image
          src={userImg}
          alt="user PFP"
          fill
          className="rounded-full"
          sizes="44px"
         />
        </div>
       )}
      </div>
     </div>
     <div className="h-full w-[90%] ml-3 mt-2">
      <div
       onClick={(e) => e.stopPropagation()}
       className="relative min-h-[80px] max-h-[600px] text-xl overflow-y-auto h-full"
      >
       <div className="select-none pointer-events-none">
        {!tweet && (
         <span className="absolute dark:text-white/50 text-gray-500/60 font-extralight">
          What is happening?!
         </span>
        )}
       </div>
       <div
        contentEditable={true}
        id="tweetBoxModal"
        className="outline-none whitespace-pre-wrap break-words h-full select-text block font-light"
        tabIndex={0}
        onInput={handleInput}
        ref={inputRef}
       />
      </div>
     </div>
    </div>
    <div className="absolute bottom-3 left-1 flex h-fit items-center gap-2 ml-1 text-main text-sm font-medium select-none">
     <FaEarthAmericas />
     <span>Everyone can reply</span>
    </div>
   </div>
   <div className="border-t dark:border-t-white/25 mb-2" />
   <div>
    <div className="flex items-center justify-between">
     <div>
      {tweetOptions.map((option) => (
       <div
        key={option.text}
        className="group inline-flex flex-col relative justify-center items-center"
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
      onClick={handleSubmit}
      className={cn(
       "bg-main py-1.5 px-4 rounded-full font-bold text-white transition-all duration-200",
       !tweet || buttonDisabled ? "opacity-50 cursor-default" : ""
      )}
      disabled={buttonDisabled}
     >
      Post
     </button>
    </div>
   </div>
  </div>
 );
};
export default ModalTweetBox;
