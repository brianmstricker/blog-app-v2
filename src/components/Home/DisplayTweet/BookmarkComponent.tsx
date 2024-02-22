"use client";
import { bookmarkTweetAction } from "@/actions/tweet-actions";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

type BookmarkComponentProps = {
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
 user: User | undefined;
 usersBookmarks?: string[];
 setUsersBookmarks?: React.Dispatch<React.SetStateAction<string[]>>;
 bookmarkInfo?: { id: string; numberOfBookmarks: number }[];
 setBookmarkInfo?: React.Dispatch<
  React.SetStateAction<{ id: string; numberOfBookmarks: number }[]>
 >;
};

const BookmarkComponent = ({
 tweet,
 usersBookmarks,
 bookmarkInfo,
 user,
 setUsersBookmarks,
 setBookmarkInfo,
 statusPage,
}: BookmarkComponentProps) => {
 async function bookmarkTweet() {
  if (!user) return;
  const bookmark = await bookmarkTweetAction({
   tweetId: tweet.id,
   userId: user.id,
  });
  if (bookmark.success) {
   const tweetId = tweet.id;
   setUsersBookmarks!((prev) => {
    const updatedBookmarks = bookmark.bookmark
     ? [...prev, tweetId]
     : prev.filter((id) => id !== tweetId);
    return updatedBookmarks;
   });
   setBookmarkInfo!((prev) => {
    const updatedLikesInfo = prev.map((bookmarkInfo) => {
     if (bookmarkInfo.id == tweetId) {
      return {
       ...bookmarkInfo,
       numberOfBookmarks: bookmark.bookmark
        ? bookmarkInfo.numberOfBookmarks + 1
        : bookmarkInfo.numberOfBookmarks - 1,
      };
     }
     return bookmarkInfo;
    });
    return updatedLikesInfo;
   });
  }
 }
 return (
  <>
   <div
    title={
     usersBookmarks?.includes(tweet.id) ? "Remove from Bookmarks" : "Bookmark"
    }
    onClick={bookmarkTweet}
    className={cn(
     "flex items-center gap-1 transition-all duration-150 hover:text-blue-500 group iconBtn",
     {
      "text-blue-500": usersBookmarks?.includes(tweet.id),
     }
    )}
   >
    <div
     className={cn(
      "p-2.5 rounded-full group-hover:bg-white/5 iconBtn text-lg cursor-pointer",
      !statusPage && "-mr-5"
     )}
    >
     {usersBookmarks?.includes(tweet.id) ? (
      <FaBookmark
       className={cn("iconBtn fill-blue-500", statusPage && "text-[22px]")}
      />
     ) : (
      <FaRegBookmark className={cn("iconBtn", statusPage && "text-[22px]")} />
     )}
    </div>
    {statusPage && (
     <span className="text-[13px] -ml-2.5 iconBtn w-2 cursor-pointer">
      {bookmarkInfo?.map((like) => like.numberOfBookmarks) || 0}
     </span>
    )}
   </div>
  </>
 );
};
export default BookmarkComponent;
