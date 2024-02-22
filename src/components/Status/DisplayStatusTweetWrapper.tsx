"use client";
import { useEffect, useState } from "react";
import DisplayStatusTweet, { fetchTweetType } from "./DisplayStatusTweet";

const DisplayStatusTweetWrapper = ({ fetchTweet, user }: fetchTweetType) => {
 const [usersLikedTweets, setUsersLikedTweets] = useState<string[]>([]);
 const [usersBookmarks, setUsersBookmarks] = useState<string[]>([]);
 const [likesInfo, setLikesInfo] = useState([
  {
   id: fetchTweet.tweet.id,
   numberOfLikes: fetchTweet.tweet.likes.length,
  },
 ]);
 const [bookmarkInfo, setBookmarkInfo] = useState([
  {
   id: fetchTweet.tweet.id,
   numberOfBookmarks: fetchTweet.tweet.bookmarks.length,
  },
 ]);
 useEffect(() => {
  if (user) {
   const likes = fetchTweet.tweet.likes.filter(
    (like) => like.userId == user.id
   );
   const flatLikes = likes.flat().map((like) => like.tweetId);
   setUsersLikedTweets(flatLikes);
   const bookmarks = fetchTweet.tweet.bookmarks.filter(
    (bookmark) => bookmark.userId == user.id
   );
   const flatBookmarks = bookmarks.flat().map((bookmark) => bookmark.tweetId);
   setUsersBookmarks(flatBookmarks);
  }
 }, [user, fetchTweet.tweet.likes, fetchTweet.tweet.bookmarks]);
 return (
  <DisplayStatusTweet
   user={user}
   fetchTweet={fetchTweet}
   usersLikedTweets={usersLikedTweets}
   likesInfo={likesInfo}
   setLikesInfo={setLikesInfo}
   setUsersLikedTweets={setUsersLikedTweets}
   usersBookmarks={usersBookmarks}
   setUsersBookmarks={setUsersBookmarks}
   bookmarkInfo={bookmarkInfo}
   setBookmarkInfo={setBookmarkInfo}
  />
 );
};
export default DisplayStatusTweetWrapper;
