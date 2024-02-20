"use client";
import { useEffect, useState } from "react";
import DisplayTweet from "./DisplayTweet";
import { User } from "next-auth";

type DisplayTweetWrapperProps = {
 tweets: {
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
 }[];
 user: User | undefined;
};

const DisplayTweetWrapper = ({ tweets, user }: DisplayTweetWrapperProps) => {
 const [usersLikedTweets, setUsersLikedTweets] = useState<string[]>([]);
 const [likesInfo, setLikesInfo] = useState(
  tweets.map((tweet) => ({ id: tweet.id, numberOfLikes: tweet.likes.length }))
 );
 useEffect(() => {
  if (user) {
   const likes = tweets.map((tweet) => {
    return tweet.likes.filter((like) => like.userId == user.id);
   });
   const flatLikes = likes.flat().map((like) => like.tweetId);
   setUsersLikedTweets(flatLikes);
  }
 }, [user, tweets]);
 return (
  <div className="pb-48">
   {tweets.map((tweet) => (
    <DisplayTweet
     key={tweet.id}
     tweet={tweet}
     usersLikedTweets={usersLikedTweets}
     likesInfo={likesInfo}
     setLikesInfo={setLikesInfo}
     setUsersLikedTweets={setUsersLikedTweets}
     user={user}
    />
   ))}
  </div>
 );
};
export default DisplayTweetWrapper;
