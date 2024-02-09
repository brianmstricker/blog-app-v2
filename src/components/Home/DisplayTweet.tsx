"use client";
import { VscEllipsis } from "react-icons/vsc";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { LuBookmark } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { FiShare } from "react-icons/fi";
import moment from "moment";
import DisplayTweetMedia from "./DisplayTweetMedia";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type DisplayTweetProps = {
 tweet: {
  id: string;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
  reply?: boolean;
  replyToId?: string | null;
  userId: string;
  user: {
   handle: string | null;
   username: string | null;
   image: string | null;
  };
  media:
   | {
      id: string;
      tweetId: string;
      url: string;
      width: string;
      height: string;
      aspectRatio: string;
     }[]
   | [];
  likes: {
   id: string;
   userId: string;
   tweetId: string;
   createdAt: Date;
  }[];
 };
};

const DisplayTweet = ({ tweet }: DisplayTweetProps) => {
 //todo: likes functionality
 const [renderModal, setRenderModal] = useState(false);
 const username = tweet.user.username;
 const router = useRouter();
 let isDragging = false;
 const handleMouseDown = (e: any) => {
  isDragging = false;
  if (e.button === 0) return;
  e.preventDefault();
 };
 const handleMouseUp = (e: any) => {
  if (!isDragging && !renderModal) {
   const target = e.target;
   if (e.button === 2) return;
   if (target.tagName === "IMG") {
    return;
   }
   if (e.button === 1) {
    e.preventDefault();
    window.open(`/${username}/status/${tweet.id}`);
    return;
   }
   if (e.button === 0) {
    router.push(`/${username}/status/${tweet.id}`);
   }
  }
 };
 return (
  <div
   onMouseDown={handleMouseDown}
   onMouseUp={handleMouseUp}
   onMouseMove={() => (isDragging = true)}
   className="border-b dark:border-b-white/25 hover:cursor-pointer bg-neutral-100 dark:bg-black hover:bg-neutral-200/30 dark:hover:bg-[#080808] block"
  >
   <article className="py-2 px-3 flex gap-3 leading-5" tabIndex={0}>
    <div className="shrink-0 select-none">
     {!tweet.user.image ? (
      <div className="w-11 h-11 rounded-full bg-blue-600" />
     ) : (
      <div className="relative w-11 h-11 rounded-full">
       <Image
        src={tweet.user.image}
        alt="user PFP"
        fill
        className="rounded-full"
        sizes="44px"
       />
      </div>
     )}
    </div>
    <div className="flex-1">
     <div className="flex items-center justify-between">
      <div className="flex gap-1 items-center">
       <span>{tweet.user.username}</span>
       <span className="text-mainGray">@{tweet.user.handle}</span>
       <span className="text-mainGray">&#183;</span>
       <span className="text-mainGray">
        {moment(tweet.createdAt).fromNow()}
       </span>
      </div>
      <div className="text-mainGray text-xl relative -left-2">
       <VscEllipsis />
      </div>
     </div>
     {tweet.text && (
      <div className="text-[15px] mt-[2px] font-light">{tweet.text}</div>
     )}
     {tweet.media && tweet.media.length > 0 && (
      <DisplayTweetMedia
       media={tweet.media}
       username={tweet.user.username}
       renderModal={renderModal}
       setRenderModal={setRenderModal}
      />
     )}
     <div className="mt-2 mb-1 flex items-center justify-between text-mainGray">
      <div className="flex items-center justify-between max-w-[70%] w-full">
       <div className="flex items-center gap-1">
        <BiMessageRounded className="text-lg" />
        <span className="text-[13px]">0</span>
       </div>
       <div className="flex items-center gap-1">
        <FaRetweet className="text-lg" />
        <span className="text-[13px]">0</span>
       </div>
       <div className="flex items-center gap-1">
        <FaRegHeart className="text-lg" />
        {tweet.likes && (
         <span className="text-[13px]">{tweet.likes.length || 0}</span>
        )}
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
