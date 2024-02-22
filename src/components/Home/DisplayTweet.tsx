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

export type DisplayTweetProps = {
 tweet: {
  id: string;
  text: string | null;
  createdAt: Date;
  updatedAt: Date;
  reply?: boolean;
  replyToId?: string | null;
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
 };
 usersLikedTweets?: string[];
 setUsersLikedTweets?: React.Dispatch<React.SetStateAction<string[]>>;
 user: User | undefined;
 likesInfo?: { id: string; numberOfLikes: number }[];
 setLikesInfo?: React.Dispatch<
  React.SetStateAction<{ id: string; numberOfLikes: number }[]>
 >;
 isReply?: boolean;
 usersBookmarks?: string[];
 setUsersBookmarks?: React.Dispatch<React.SetStateAction<string[]>>;
 bookmarkInfo?: { id: string; numberOfBookmarks: number }[];
 setBookmarkInfo?: React.Dispatch<
  React.SetStateAction<{ id: string; numberOfBookmarks: number }[]>
 >;
};

const DisplayTweet = ({
 tweet,
 usersLikedTweets,
 setUsersLikedTweets,
 user,
 likesInfo,
 setLikesInfo,
 isReply,
 usersBookmarks,
 setUsersBookmarks,
 bookmarkInfo,
 setBookmarkInfo,
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
    target.tagName === "svg"
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
    "border-b dark:border-b-white/25 hover:cursor-pointer bg-neutral-100 dark:bg-black hover:bg-neutral-200/30 dark:hover:bg-[#080808] block",
    isReply ? "pt-2" : ""
   )}
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
       <span>{tweet.user.handle}</span>
       <span className="text-mainGray">@{tweet.user.username}</span>
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
     <div className="flex items-center justify-between text-mainGray mt-1.5 -mb-1">
      <div className="flex items-center justify-between max-w-[70%] w-full">
       <div className="flex items-center gap-1">
        <div className="p-2.5 rounded-full">
         <BiMessageRounded className="text-lg iconBtn" />
        </div>
        <span className="text-[13px] -ml-2.5 iconBtn w-2">
         {tweet.repliesLength}
        </span>
       </div>
       <div className="flex items-center gap-1">
        <div className="p-2.5 rounded-full">
         <FaRetweet className="text-lg iconBtn" />
        </div>
        <span className="text-[13px] -ml-2.5 iconBtn w-[2px]">0</span>
       </div>
       <LikeComponent
        tweet={tweet}
        user={user}
        usersLikedTweets={usersLikedTweets}
        likesInfo={likesInfo}
        setUsersLikedTweets={setUsersLikedTweets}
        setLikesInfo={setLikesInfo}
       />
      </div>
      <div className="flex items-center gap-3 relative ">
       <BookmarkComponent
        tweet={tweet}
        user={user}
        usersBookmarks={usersBookmarks}
        setUsersBookmarks={setUsersBookmarks}
        bookmarkInfo={bookmarkInfo}
        setBookmarkInfo={setBookmarkInfo}
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
