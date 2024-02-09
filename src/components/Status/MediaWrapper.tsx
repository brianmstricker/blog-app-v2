"use client";

import { useState } from "react";
import DisplayTweetMedia from "../Home/DisplayTweetMedia";

type Tweet = {
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
};

const MediaWrapper = ({ tweet }: Tweet) => {
 const [renderModal, setRenderModal] = useState(false);
 return (
  <DisplayTweetMedia
   media={tweet.media}
   username={tweet.user.username}
   renderModal={renderModal}
   setRenderModal={setRenderModal}
  />
 );
};
export default MediaWrapper;
