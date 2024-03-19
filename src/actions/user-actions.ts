import { db } from "@/lib/db";

export const fetchUserAction = async (username: string) => {
 try {
  const user = await db.user.findFirst({
   where: {
    username,
   },
   select: {
    id: true,
    username: true,
    handle: true,
    image: true,
    bio: true,
    banner: true,
    location: true,
    website: true,
    createdAt: true,
    updatedAt: true,
    tweets: true,
    likes: true,
    bookmarks: true,
    media: true,
    follower: true,
    following: true,
   },
  });
  if (!user) {
   return null;
  }
  return user;
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const fetchUserTweetsAction = async (username: string) => {
 try {
  let tweets = await db.tweet.findMany({
   where: {
    user: {
     username,
    },
    reply: false,
   },
   orderBy: {
    createdAt: "desc",
   },
   select: {
    id: true,
    text: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    likes: true,
    media: true,
    bookmarks: true,
    user: true,
   },
  });
  if (!tweets) {
   return null;
  }
  const replies = await db.tweet.findMany({
   where: {
    user: {
     username,
    },
    reply: true,
   },
   include: {
    user: {
     select: { username: true, handle: true, image: true },
    },
    likes: true,
    media: true,
    bookmarks: true,
   },
  });
  tweets = tweets.map((tweet) => {
   const repliesLength = replies.filter(
    (reply) => reply.replyToId === tweet.id
   ).length;
   return { ...tweet, repliesLength };
  });
  return tweets;
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};
