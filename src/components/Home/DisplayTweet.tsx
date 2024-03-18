"use client";
import { VscEllipsis } from "react-icons/vsc";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import Image from "next/image";
import { FiShare } from "react-icons/fi";
import moment from "moment";
import DisplayTweetMedia from "./DisplayTweetMedia";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "next-auth";
import LikeComponent from "./DisplayTweet/LikeComponent";
import BookmarkComponent from "./DisplayTweet/BookmarkComponent";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type DisplayTweetProps = {
 tweet: {
  id: string;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
  reply?: boolean;
  replyToId?: string | null;
  replyToUsername?: string | null;
  userId: string;
  repliesLength?: number;
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
  bookmarks: {
   id: string;
   userId: string;
   tweetId: string;
   createdAt: Date;
  }[];
 };
 user: User | undefined;
 isReply?: boolean;
 repliesLength?: number;
};

const DisplayTweet = ({
 tweet,
 user,
 isReply,
 repliesLength,
}: DisplayTweetProps) => {
 //todo: like animation
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
   if (
    target.tagName === "IMG" ||
    target.classList.contains("iconBtn") ||
    target.tagName === "path" ||
    target.tagName === "svg" ||
    target.classList.contains("username")
   ) {
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
   className={cn(
    "border-b dark:border-b-white/25 hover:cursor-pointer bg-white dark:bg-black hover:bg-neutral-100/50 dark:hover:bg-[#080808] block",
    isReply ? "pt-2" : ""
   )}
  >
   <article className="pb-2 pt-3 px-4 flex gap-3 leading-5" tabIndex={0}>
    <div className="shrink-0 select-none">
     {!tweet.user.image ? (
      <div className="w-9 h-9 min-[400px]:w-11 min-[400px]:h-11 rounded-full bg-blue-600" />
     ) : (
      <div className="relative w-9 h-9 min-[400px]:w-11 min-[400px]:h-11 rounded-full">
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
      <div className="flex flex-col min-[400px]:flex-row gap-[2px] min-[400px]:gap-1 min-[400px]:items-center">
       <Link
        href={`/user/${tweet.user.username}`}
        className="hover:underline underline-offset-1 username"
       >
        {tweet.user.handle}
       </Link>
       <Link
        href={`/user/${tweet.user.username}`}
        className="text-mainGray username hidden min-[400px]:block"
       >
        @{tweet.user.username}
       </Link>
       <span className="text-mainGray hidden min-[400px]:block">&#183;</span>
       <span className="text-mainGray hidden min-[400px]:block">
        {moment(tweet.createdAt).fromNow()}
       </span>
       <div className="flex gap-1 min-[400px]:hidden">
        <Link
         href={`/user/${tweet.user.username}`}
         className="text-mainGray username"
        >
         @{tweet.user.username}
        </Link>
        <span className="text-mainGray">&#183;</span>
        <span className="text-mainGray">
         {moment(tweet.createdAt).fromNow(true)}
        </span>
       </div>
      </div>
      <div className="text-mainGray text-xl relative -left-2">
       <VscEllipsis />
      </div>
     </div>
     {tweet.reply && tweet.replyToUsername && (
      <div className="text-[15px] text-mainGray mt-[2px] w-fit username cursor-default">
       Replying to{" "}
       <Link
        href={`/user/${tweet.replyToUsername}`}
        className="text-main hover:underline underline-offset-1 username"
       >
        @{tweet.replyToUsername}
       </Link>
      </div>
     )}
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
     <div className="flex items-center justify-between text-mainGray mt-1.5 -mb-1 -ml-2.5">
      <div className="flex items-center justify-between max-w-[70%] w-full">
       <div className="flex items-center gap-1">
        <div className="p-2.5 rounded-full">
         <BiMessageRounded className="text-lg iconBtn" />
        </div>
        <span className="text-[13px] -ml-2.5 iconBtn w-2">
         {tweet.repliesLength || repliesLength}
        </span>
       </div>
       <div className="flex items-center gap-1">
        <div className="p-2.5 rounded-full">
         <FaRetweet className="text-lg iconBtn" />
        </div>
        <span className="text-[13px] -ml-2.5 iconBtn w-[2px]">0</span>
       </div>
       <LikeComponent
        tweetId={tweet.id}
        userId={user?.id}
        likes={tweet.likes}
       />
      </div>
      <div className="flex items-center gap-3 relative ">
       <BookmarkComponent
        tweetId={tweet.id}
        userId={user?.id}
        bookmarks={tweet.bookmarks}
       />
       <div className="p-2.5 rounded-ful">
        <FiShare className="text-lg iconBtn" />
       </div>
      </div>
     </div>
    </div>
   </article>
  </div>
 );
};
export default DisplayTweet;
