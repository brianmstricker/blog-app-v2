"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const client = new S3Client({
 region: process.env.AWS_REGION,
 credentials: {
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
 },
});

export const postTweetAction = async (formData: FormData) => {
 const userInfo = await auth();
 const user = userInfo?.user;
 if (!userInfo || !user) return { error: "Not logged in" };
 try {
  const text = formData.get("text");
  const media = formData.getAll("media");
  const width = formData
   .getAll("width")
   .toString()
   .replace("[", "")
   .replace("]", "")
   .split(",");
  const height = formData
   .getAll("height")
   .toString()
   .replace("[", "")
   .replace("]", "")
   .split(",");
  const aspectRatio = formData
   .getAll("aspectRatio")
   .toString()
   .replace("[", "")
   .replace("]", "")
   .replace(/\"/g, "")
   .split(",");
  if (!text && !media) return { error: "No text or media" };
  if (text && typeof text !== "string") return { error: "Invalid text" };
  if (text && typeof text === "string" && text.length > 300) {
   return { error: "Tweet too long" };
  }
  if (media && media.length > 4) {
   return { error: "Too many images" };
  }
  let updatedText = text?.trim();
  if (updatedText === "") updatedText = undefined;
  const mediaUrls: string[] = [];
  if (media) {
   for (const file of media) {
    if (!(file instanceof File)) return { error: "Invalid file" };
    if (file.size > 5 * 1024 * 1024) return { error: "File too large" };
    const fileExt = file.name.split(".").pop();
    const newName = file.name.split(".")[0] + "-" + uuidv4() + "." + fileExt;
    const fileBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
     Bucket: process.env.S3_BUCKET_NAME!,
     ACL: "public-read",
     Key: newName,
     //@ts-ignore
     Body: fileBuffer,
     ContentType: file.type,
    });
    Promise.all([client.send(command)]);
    mediaUrls.push(
     `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newName}`
    );
   }
  }
  if (!updatedText && mediaUrls.length === 0)
   return { error: "No text or media" };
  const newTweet = await db.tweet.create({
   data: {
    text: updatedText,
    userId: user.id,
   },
  });
  if (mediaUrls.length > 0) {
   const getWidth = (url: string) => {
    const index = mediaUrls.findIndex((mediaUrl) => mediaUrl === url);
    return width[index];
   };
   const getHeight = (url: string) => {
    const index = mediaUrls.findIndex((mediaUrl) => mediaUrl === url);
    return height[index];
   };
   const getAspectRatio = (url: string) => {
    const index = mediaUrls.findIndex((mediaUrl) => mediaUrl === url);
    return aspectRatio[index];
   };
   await db.media.createMany({
    data: mediaUrls.map((url) => ({
     tweetId: newTweet.id,
     url,
     userId: user.id,
     width: getWidth(url),
     height: getHeight(url),
     aspectRatio: getAspectRatio(url),
    })),
   });
  }
  revalidatePath("/");
  return { success: true };
 } catch (error: any) {
  console.log(error);
  return { error: error?.message || "Something went wrong" };
 }
};

export const fetchTweetsAction = async () => {
 try {
  let tweets = await db.tweet.findMany({
   where: { replyToId: null },
   orderBy: { createdAt: "desc" },
   include: {
    user: {
     select: { username: true, handle: true, image: true },
    },
    likes: true,
    media: true,
    bookmarks: true,
   },
  });
  const replies = await db.tweet.findMany({
   where: { replyToId: { not: null } },
   orderBy: { createdAt: "desc" },
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
  return tweets || null;
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const fetchTweetAction = async ({
 tweetId,
 username,
}: {
 tweetId: string;
 username: string;
}) => {
 try {
  const tweet = await db.tweet.findFirst({
   where: {
    id: tweetId,
    user: {
     username,
    },
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
  const replies = await db.tweet.findMany({
   where: { replyToId: tweetId },
   include: {
    user: {
     select: { username: true, handle: true, image: true },
    },
    likes: true,
    media: true,
   },
   orderBy: { createdAt: "desc" },
  });
  return { tweet, replies } || null;
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const likeTweetAction = async ({
 tweetId,
 userId,
}: {
 tweetId: string;
 userId: string;
}) => {
 try {
  const like = await db.like.findFirst({
   where: { tweetId, userId },
  });
  if (like) {
   await db.like.delete({ where: { id: like.id } });
   return { success: true, like: false };
  } else {
   await db.like.create({
    data: { tweetId, userId },
   });
   return { success: true, like: true };
  }
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 } finally {
  revalidatePath("/");
  revalidatePath(`/status/${tweetId}`);
 }
};

export const bookmarkTweetAction = async ({
 tweetId,
 userId,
}: {
 tweetId: string;
 userId: string;
}) => {
 try {
  const bookmark = await db.bookmark.findFirst({
   where: { tweetId, userId },
  });
  if (bookmark) {
   await db.bookmark.delete({ where: { id: bookmark.id } });
   revalidatePath("/");
   revalidatePath(`/status/${tweetId}`);
   revalidatePath(`/bookmarks`);
   return { success: true, like: false };
  } else {
   await db.bookmark.create({
    data: { tweetId, userId },
   });
   revalidatePath("/");
   revalidatePath(`/status/${tweetId}`);
   revalidatePath(`/bookmarks`);
   return { success: true, bookmark: true };
  }
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const postReplyAction = async (formData: FormData) => {
 const userInfo = await auth();
 const user = userInfo?.user;
 if (!userInfo || !user) return { error: "Not logged in" };
 try {
  const text = formData.get("text");
  const media = formData.getAll("media");
  const replyToId = formData.get("replyToId");
  const replyToUsername = formData.get("replyToUsername");
  if (!replyToId || !replyToUsername) return { error: "No tweet to reply to" };
  const width = formData
   .getAll("width")
   .toString()
   .replace("[", "")
   .replace("]", "")
   .split(",");
  const height = formData
   .getAll("height")
   .toString()
   .replace("[", "")
   .replace("]", "")
   .split(",");
  const aspectRatio = formData
   .getAll("aspectRatio")
   .toString()
   .replace("[", "")
   .replace("]", "")
   .replace(/\"/g, "")
   .split(",");
  if (!text && !media) return { error: "No text or media" };
  if (text && typeof text !== "string") return { error: "Invalid text" };
  if (text && typeof text === "string" && text.length > 300) {
   return { error: "Tweet too long" };
  }
  if (media && media.length > 4) {
   return { error: "Too many images" };
  }
  let updatedText = text?.trim();
  if (updatedText === "") updatedText = undefined;
  const mediaUrls: string[] = [];
  if (media) {
   for (const file of media) {
    if (!(file instanceof File)) return { error: "Invalid file" };
    if (file.size > 5 * 1024 * 1024) return { error: "File too large" };
    const fileExt = file.name.split(".").pop();
    const newName = file.name.split(".")[0] + "-" + uuidv4() + "." + fileExt;
    const fileBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
     Bucket: process.env.S3_BUCKET_NAME!,
     ACL: "public-read",
     Key: newName,
     //@ts-ignore
     Body: fileBuffer,
     ContentType: file.type,
    });
    Promise.all([client.send(command)]);
    mediaUrls.push(
     `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newName}`
    );
   }
  }
  if (!updatedText && mediaUrls.length === 0)
   return { error: "No text or media" };
  const newReply = await db.tweet.create({
   data: {
    replyToId: replyToId as string,
    text: updatedText,
    userId: user.id,
   },
  });
  if (mediaUrls.length > 0) {
   const getWidth = (url: string) => {
    const index = mediaUrls.findIndex((mediaUrl) => mediaUrl === url);
    return width[index];
   };
   const getHeight = (url: string) => {
    const index = mediaUrls.findIndex((mediaUrl) => mediaUrl === url);
    return height[index];
   };
   const getAspectRatio = (url: string) => {
    const index = mediaUrls.findIndex((mediaUrl) => mediaUrl === url);
    return aspectRatio[index];
   };
   await db.media.createMany({
    data: mediaUrls.map((url) => ({
     tweetId: newReply.id,
     url,
     userId: user.id,
     width: getWidth(url),
     height: getHeight(url),
     aspectRatio: getAspectRatio(url),
    })),
   });
  }
  revalidatePath(`/${replyToUsername}/status/${replyToId}`);
  return { success: true };
 } catch (error: any) {
  console.log(error);
  return { error: error?.message || "Something went wrong" };
 }
};

export const fetchBookmarksAction = async () => {
 try {
  const userInfo = await auth();
  const user = userInfo?.user;
  if (!userInfo || !user) return { error: "Not logged in" };
  const bookmarks = await db.bookmark.findMany({
   where: { userId: user.id },
   orderBy: { createdAt: "desc" },
   include: {
    tweet: {
     include: {
      user: {
       select: { username: true, handle: true, image: true },
      },
      likes: true,
      media: true,
      bookmarks: true,
     },
    },
   },
  });
  return bookmarks || null;
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const clearBookmarksAction = async () => {
 try {
  const userInfo = await auth();
  const user = userInfo?.user;
  if (!userInfo || !user) return { error: "Not logged in" };
  await db.bookmark.deleteMany({ where: { userId: user.id } });
  revalidatePath(`/bookmarks`);
  revalidatePath(`/home`);
  return { success: true };
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};
