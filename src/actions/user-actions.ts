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

export const fetchUserTweetsAction = async (userId: string) => {
 try {
  const tweets = await db.tweet.findMany({
   where: {
    userId,
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
   },
  });
  if (!tweets) {
   return null;
  }
  return tweets;
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};
