"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { TweetSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const postTweetAction = async (tweet: z.infer<typeof TweetSchema>) => {
 const userInfo = await auth();
 const user = userInfo?.user;
 if (!userInfo || !user) return { error: "Not logged in" };
 try {
  const validatedFields = TweetSchema.safeParse(tweet);
  if (!validatedFields.success)
   return {
    error: "Invalid fields",
    fields: validatedFields.error.issues.map((issue) => issue.message),
   };
  const { text, media } = validatedFields.data;
  const updatedText = text?.trim().replace(/<br>/g, "");
  const newTweet = await db.tweet.create({
   data: {
    text: updatedText,
    userId: user.id,
   },
  });
  revalidatePath("/");
  return { success: true, tweet: newTweet };
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
   },
  });
  return tweets || [];
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};
