"use client";
import { useEffect, useState } from "react";
import { User } from "next-auth";
import DisplayTweet from "../DisplayTweet";
import RemovedBanner from "./RemovedBanner";

type BookmarkTweetWrapperProps = {
 user: User | undefined;
 bookmarks: {
  id: string;
  tweetId: string;
  userId: string;
  createdAt: Date;
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
   bookmarks: {
    id: string;
    userId: string;
    tweetId: string;
    createdAt: Date;
   }[];
  };
 }[];
};

const BookmarkTweetWrapper = ({
 bookmarks,
 user,
}: BookmarkTweetWrapperProps) => {
 const [showRemovedBanner, setShowRemovedBanner] = useState(false);
 const [usersLikedTweets, setUsersLikedTweets] = useState<string[]>([]);
 const [usersBookmarks, setUsersBookmarks] = useState<string[]>([]);
 const [likesInfo, setLikesInfo] = useState(
  bookmarks.map((bookmark) => ({
   id: bookmark.tweet.id,
   numberOfLikes: bookmark.tweet.likes.length,
  }))
 );
 const [bookmarkInfo, setBookmarkInfo] = useState(
  bookmarks.map((bookmark) => ({
   id: bookmark.tweet.id,
   numberOfBookmarks: bookmark.tweet.bookmarks.length,
  }))
 );
 useEffect(() => {
  if (user) {
   const likes = bookmarks.map((bookmark) => {
    return bookmark.tweet.likes.filter((like) => like.userId == user.id);
   });
   const flatLikes = likes.flat().map((like) => like.tweetId);
   setUsersLikedTweets(flatLikes);
   const bookmarksHere = bookmarks.map((bookmark) => {
    return bookmark.tweet.bookmarks.filter(
     (bookmark) => bookmark.userId == user.id
    );
   });
   const flatBookmarks = bookmarksHere
    .flat()
    .map((bookmark) => bookmark.tweetId);
   setUsersBookmarks(flatBookmarks);
  }
 }, [user, bookmarks]);
 return (
  <div className="pb-48">
   {bookmarks.map((bookmark) => (
    <DisplayTweet
     key={bookmark.id}
     tweet={bookmark.tweet}
     user={user}
     usersLikedTweets={usersLikedTweets}
     likesInfo={likesInfo}
     setLikesInfo={setLikesInfo}
     setUsersLikedTweets={setUsersLikedTweets}
     usersBookmarks={usersBookmarks}
     setUsersBookmarks={setUsersBookmarks}
     bookmarkInfo={bookmarkInfo}
     setBookmarkInfo={setBookmarkInfo}
     setBookmarkRemovedBanner={setShowRemovedBanner}
    />
   ))}
   {showRemovedBanner && <RemovedBanner />}
  </div>
 );
};
export default BookmarkTweetWrapper;
