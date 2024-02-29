"use client";
import { bookmarkTweetAction } from "@/actions/tweet-actions";
import { cn } from "@/lib/utils";
import { startTransition, useOptimistic, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import RemovedBanner from "../Bookmark/RemovedBanner";

type BookmarkComponentProps = {
 statusPage?: boolean;
 tweetId: string;
 userId: string | undefined;
 bookmarks: {
  id: string;
  userId: string;
  tweetId: string;
  createdAt: Date;
 }[];
};

const BookmarkComponent = ({
 tweetId,
 userId,
 bookmarks,
 statusPage,
}: BookmarkComponentProps) => {
 const [showRemovedBanner, setShowRemovedBanner] = useState(false);
 const [loading, setLoading] = useState(false);
 const bookmarked = (bookmark: any) =>
  bookmark.userId === userId && bookmark.tweetId === tweetId;
 const [optimisticBookmarks, addOptimisticBookmarks] = useOptimistic(
  bookmarks,
  (state, updateBookmark) =>
   // @ts-ignore
   state.some(bookmarked)
    ? state.filter((bookmark) => bookmark.userId != userId)
    : [...state, updateBookmark]
 );
 async function handleClick() {
  if (!userId) return;
  setLoading(true);
  startTransition(() => {
   addOptimisticBookmarks({ tweetId, userId });
  });
  const bookmark = await bookmarkTweetAction({
   tweetId,
   userId,
  });
  if (!bookmark.bookmark) {
   setShowRemovedBanner(true);
   setTimeout(() => {
    setShowRemovedBanner(false);
   }, 3500);
  }
  setLoading(false);
 }
 return (
  <>
   <button
    title={
     optimisticBookmarks?.some(bookmarked)
      ? "Remove from Bookmarks"
      : "Bookmark"
    }
    disabled={loading}
    onClick={handleClick}
    className={cn(
     "flex items-center gap-1 transition-all duration-150 hover:text-blue-500 group iconBtn",
     {
      "text-blue-500": optimisticBookmarks?.some(bookmarked),
     }
    )}
   >
    <div
     className={cn(
      "p-2.5 rounded-full group-hover:bg-black/5 dark:group-hover:bg-white/5 iconBtn text-lg cursor-pointer",
      !statusPage && "-mr-5"
     )}
    >
     {optimisticBookmarks?.some(bookmarked) ? (
      <FaBookmark
       className={cn("iconBtn fill-blue-500", statusPage && "text-[22px]")}
      />
     ) : (
      <FaRegBookmark className={cn("iconBtn", statusPage && "text-[22px]")} />
     )}
    </div>
    {statusPage && (
     <span className="text-[13px] -ml-2.5 iconBtn w-2 cursor-pointer">
      {optimisticBookmarks?.filter((bookmark) => bookmark.tweetId === tweetId)
       .length || 0}
     </span>
    )}
   </button>
   {showRemovedBanner && <RemovedBanner />}
  </>
 );
};
export default BookmarkComponent;
