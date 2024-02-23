"use client";
import { likeTweetAction } from "@/actions/tweet-actions";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { PiHeart, PiHeartFill } from "react-icons/pi";

type LikeComponentProps = {
 statusPage?: boolean;
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
 usersLikedTweets?: string[];
 likesInfo?: { id: string; numberOfLikes: number }[];
 user: User | undefined;
 setUsersLikedTweets?: React.Dispatch<React.SetStateAction<string[]>>;
 setLikesInfo?: React.Dispatch<
  React.SetStateAction<{ id: string; numberOfLikes: number }[]>
 >;
};

const LikeComponent = ({
 tweet,
 usersLikedTweets,
 likesInfo,
 user,
 setUsersLikedTweets,
 setLikesInfo,
 statusPage,
}: LikeComponentProps) => {
 async function likeTweet() {
  if (!user) return;
  const like = await likeTweetAction({
   tweetId: tweet.id,
   userId: user.id,
  });
  if (like.success) {
   const tweetId = tweet.id;
   setUsersLikedTweets!((prev) => {
    const updatedLikedTweets = like.like
     ? [...prev, tweetId]
     : prev.filter((id) => id !== tweetId);
    return updatedLikedTweets;
   });
   setLikesInfo!((prev) => {
    const updatedLikesInfo = prev.map((likeInfo) => {
     if (likeInfo.id == tweetId) {
      return {
       ...likeInfo,
       numberOfLikes: like.like
        ? likeInfo.numberOfLikes + 1
        : likeInfo.numberOfLikes - 1,
      };
     }
     return likeInfo;
    });
    return updatedLikesInfo;
   });
  }
 }
 return (
  <>
   <div
    title={usersLikedTweets?.includes(tweet.id) ? "Unlike" : "Like"}
    onClick={likeTweet}
    className={cn(
     "flex items-center gap-1 transition-all duration-150 hover:text-red-600 group iconBtn",
     {
      "text-red-600": usersLikedTweets?.includes(tweet.id),
     }
    )}
   >
    <div className="p-2.5 rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/5 iconBtn text-lg cursor-pointer">
     {usersLikedTweets?.includes(tweet.id) ? (
      <PiHeartFill
       className={cn("iconBtn fill-red-500", statusPage && "text-[22px]")}
      />
     ) : (
      <PiHeart className={cn("iconBtn", statusPage && "text-[22px]")} />
     )}
    </div>
    <span className="text-[13px] -ml-2.5 iconBtn w-2 cursor-pointer">
     {!statusPage
      ? likesInfo
         ?.filter((like) => like.id === tweet.id)
         .map((like) => like.numberOfLikes) || 0
      : likesInfo?.map((like) => like.numberOfLikes) || 0}
    </span>
   </div>
  </>
 );
};
export default LikeComponent;
