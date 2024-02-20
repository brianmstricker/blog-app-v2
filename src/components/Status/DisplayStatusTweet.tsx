import Image from "next/image";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import moment from "moment";
import { FiShare } from "react-icons/fi";
import { LuBookmark } from "react-icons/lu";
import { FaRetweet } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import MediaWrapper from "@/components/Status/MediaWrapper";
import LikeComponent from "../Home/DisplayTweet/LikeComponent";
import { User } from "next-auth";

export type fetchTweetType = {
 fetchTweet: {
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
  replies: {
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
  }[];
 };
 user: User | undefined;
 usersLikedTweets?: string[];
 setUsersLikedTweets?: React.Dispatch<React.SetStateAction<string[]>>;
 likesInfo?: { id: string; numberOfLikes: number }[];
 setLikesInfo?: React.Dispatch<
  React.SetStateAction<{ id: string; numberOfLikes: number }[]>
 >;
};

const DisplayStatusTweet = ({
 fetchTweet,
 user,
 usersLikedTweets,
 setUsersLikedTweets,
 likesInfo,
 setLikesInfo,
}: fetchTweetType) => {
 //todo: like functionality, bookmark functionality
 return (
  <>
   <div
    tabIndex={0}
    className="flex items-center mt-2 mb-5 rounded-full transition-all duration-150 px-6"
   >
    {!fetchTweet.tweet.user.image ? (
     <div className="w-11 h-11 rounded-full bg-blue-600" />
    ) : (
     <div className="relative w-11 h-11 rounded-full">
      <Image
       src={fetchTweet.tweet.user.image}
       alt="user PFP"
       fill
       className="rounded-full"
       sizes="44px"
      />
     </div>
    )}
    <div className="flex flex-1 flex-col ml-4 select-none">
     <span className="font-bold text-[14px] leading-[18px]">
      {fetchTweet.tweet.user.handle}
     </span>
     <span className="text-mainGray">@{fetchTweet.tweet.user.username}</span>
    </div>
    <div>
     <HiMiniEllipsisHorizontal className="text-lg text-mainGray" />
    </div>
   </div>
   <div className="px-6">{fetchTweet.tweet.text}</div>
   {fetchTweet.tweet.media && fetchTweet.tweet.media.length > 0 && (
    <div className="px-6">
     <MediaWrapper tweet={fetchTweet.tweet} />
    </div>
   )}
   <div className="my-3 text-mainGray text-[15px] px-6">
    {moment(fetchTweet.tweet.createdAt).format("LT \u00B7 ll")}
   </div>
   <div className="border-y dark:border-y-white/25 px-6">
    <div className="py-3">
     <div className="flex items-center justify-between text-mainGray">
      <div className="flex items-center gap-1">
       <BiMessageRounded className="text-[22px]" />
       <span className="text-[13px]">{fetchTweet.replies.length}</span>
      </div>
      <div className="flex items-center gap-1">
       <FaRetweet className="text-[22px]" />
       <span className="text-[13px]">0</span>
      </div>
      <LikeComponent
       tweet={fetchTweet.tweet}
       statusPage
       user={user}
       usersLikedTweets={usersLikedTweets}
       setUsersLikedTweets={setUsersLikedTweets}
       likesInfo={likesInfo}
       setLikesInfo={setLikesInfo}
      />
      <LuBookmark className="text-[22px]" />
      <FiShare className="text-[22px]" />
     </div>
    </div>
   </div>
  </>
 );
};
export default DisplayStatusTweet;
