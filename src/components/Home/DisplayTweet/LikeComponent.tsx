"use client";
import { likeTweetAction } from "@/actions/tweet-actions";
import { cn } from "@/lib/utils";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import { startTransition, useOptimistic } from "react";

type LikeComponentProps = {
 statusPage?: boolean;
 tweetId: string;
 userId: string | undefined;
 likes: {
  id: string;
  userId: string;
  tweetId: string;
  createdAt: Date;
 }[];
};

const LikeComponent = ({
 tweetId,
 userId,
 statusPage,
 likes,
}: LikeComponentProps) => {
 const liked = (like: any) =>
  like.userId === userId && like.tweetId === tweetId;
 const [optimisticLikes, addOptimisticLikes] = useOptimistic(
  likes,
  (state, updateLike) =>
   // @ts-ignore
   state.some(liked)
    ? state.filter((like) => like.userId != userId)
    : [...state, updateLike]
 );
 async function handleClick() {
  if (!userId) return;
  startTransition(() => {
   addOptimisticLikes({ tweetId, userId });
  });
  await likeTweetAction({
   tweetId: tweetId,
   userId: userId,
  });
 }
 return (
  <>
   <div
    title={optimisticLikes?.some(liked) ? "Unlike" : "Like"}
    onClick={handleClick}
    className={cn(
     "flex items-center gap-1 transition-all duration-150 hover:text-red-600 group iconBtn",
     {
      "text-red-600": optimisticLikes?.some(liked),
     }
    )}
   >
    <div className="p-2.5 rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/5 iconBtn text-lg cursor-pointer">
     {optimisticLikes?.some(liked) ? (
      <PiHeartFill
       className={cn("iconBtn fill-red-500", statusPage && "text-[22px]")}
      />
     ) : (
      <PiHeart className={cn("iconBtn", statusPage && "text-[22px]")} />
     )}
    </div>
    <span className="text-[13px] -ml-2.5 iconBtn w-2 cursor-pointer">
     {optimisticLikes?.filter((like) => like.tweetId === tweetId).length || 0}
    </span>
   </div>
  </>
 );
};
export default LikeComponent;
