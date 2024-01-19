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
    const newName = file.name + uuidv4();
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
  const newTweet = await db.tweet.create({
   data: {
    text: updatedText,
    userId: user.id,
   },
  });
  if (mediaUrls.length > 0) {
   await db.media.createMany({
    data: mediaUrls.map((url) => ({
     tweetId: newTweet.id,
     url,
     userId: user.id,
    })),
   });
  }
  revalidatePath("/");
  return { success: true };
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const fetchTweetsAction = async () => {
 try {
  const tweets = await db.tweet.findMany({
   orderBy: { createdAt: "desc" },
   include: {
    user: {
     select: { username: true, handle: true, image: true },
    },
    likes: true,
    media: true,
   },
  });
  return tweets || [];
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};
