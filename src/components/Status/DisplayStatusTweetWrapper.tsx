"use client";
import { useEffect, useState } from "react";
import DisplayStatusTweet, { fetchTweetType } from "./DisplayStatusTweet";

const DisplayStatusTweetWrapper = ({ fetchTweet, user }: fetchTweetType) => {
 const [usersLikedTweets, setUsersLikedTweets] = useState<string[]>([]);
 const [likesInfo, setLikesInfo] = useState([
  {
   id: fetchTweet.tweet.id,
   numberOfLikes: fetchTweet.tweet.likes.length,
  },
 ]);
 useEffect(() => {
  if (user) {
   const likes = fetchTweet.tweet.likes.filter(
    (like) => like.userId == user.id
   );
   const flatLikes = likes.flat().map((like) => like.tweetId);
   setUsersLikedTweets(flatLikes);
  }
 }, [user, fetchTweet.tweet.likes]);
 return (
  <DisplayStatusTweet
   user={user}
   fetchTweet={fetchTweet}
   usersLikedTweets={usersLikedTweets}
   likesInfo={likesInfo}
   setLikesInfo={setLikesInfo}
   setUsersLikedTweets={setUsersLikedTweets}
  />
 );
};
export default DisplayStatusTweetWrapper;
