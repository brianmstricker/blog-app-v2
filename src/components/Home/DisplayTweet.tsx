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

type DisplayTweetProps = {
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
    }[]
  | [];
 likes: {
  id: string;
  userId: string;
  tweetId: string;
  createdAt: Date;
 }[];
};

const DisplayTweet = ({ tweet }: { tweet: DisplayTweetProps }) => {
 //todo: likes functionality
 return (
  <div className="border-b dark:border-b-white/25">
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
     {tweet.text && <div className="text-[15px] mt-[2px]">{tweet.text}</div>}
     <DisplayTweetMedia media={tweet.media} />
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
