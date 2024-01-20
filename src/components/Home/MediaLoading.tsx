"use client";

import { useState } from "react";
import DisplayTweet from "./DisplayTweet";
import { Oval } from "react-loader-spinner";

type MediaLoadingProps = {
 tweets: {
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
 }[];
};

const MediaLoading = ({ tweets }: MediaLoadingProps) => {
 const [loading, setLoading] = useState(true);
 return (
  <>
   {loading && (
    <div className="flex justify-center items-center py-2">
     <div className="w-8 h-8">
      <Oval color="#1da1f2" ariaLabel="oval-loading" secondaryColor="gray" />
     </div>
    </div>
   )}
   <div>
    {tweets.map((tweet) => (
     <DisplayTweet
      key={tweet.id}
      tweet={tweet}
      setMediaLoading={() => setLoading(false)}
     />
    ))}
   </div>
  </>
 );
};
export default MediaLoading;
