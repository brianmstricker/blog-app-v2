import ArrowBack from "@/components/Status/ArrowBack";
import { headers } from "next/headers";
import { Metadata } from "next";
import { fetchTweetAction } from "@/actions/tweet-actions";
import { auth } from "@/auth";
import PostReply from "@/components/Status/PostReply";
import DisplayTweet from "@/components/Home/DisplayTweet";
import DisplayStatusTweet from "@/components/Status/DisplayStatusTweet";

type StatusProps = {
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
 replies:
  | {
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
    }[];
};

export async function generateMetadata({
 params,
}: {
 params: { username: string; tweetId: string };
}): Promise<Metadata> {
 const { username, tweetId } = params;
 const fetchTweet = (await fetchTweetAction({
  username,
  tweetId,
 })) as StatusProps;
 if (!fetchTweet) return { title: "Chirp not found" };
 return {
  title: `${fetchTweet.tweet.user.username} on Chirp: "${
   fetchTweet.tweet.text?.substring(0, 30) ||
   fetchTweet.tweet.media[0].url.substring(0, 30)
  }" / Chirp`,
  description: fetchTweet.tweet.text,
 };
}

const page = async ({
 params,
}: {
 params: { username: string; tweetId: string };
}) => {
 const { username, tweetId } = params;
 const fetchTweet = (await fetchTweetAction({
  username,
  tweetId,
 })) as StatusProps;
 if (!fetchTweet) return <div>Chirp not found</div>;
 const userInfo = await auth();
 const user = userInfo?.user;
 const headersList = headers();
 const referer = headersList.get("referer");
 return (
  <div>
   <ArrowBack referer={referer} />
   <DisplayStatusTweet fetchTweet={fetchTweet} />
   {!!user && (
    <div>
     <PostReply
      userImage={user.image}
      replyTweetUsername={fetchTweet.tweet.user.username}
      replyTweetId={fetchTweet.tweet.id}
     />
    </div>
   )}
   {fetchTweet.replies && fetchTweet.replies.length > 0 && (
    <div className="pb-48">
     {fetchTweet.replies.map((reply) => (
      <div key={reply.id}>
       <DisplayTweet tweet={reply} user={user} isReply />
      </div>
     ))}
    </div>
   )}
  </div>
 );
};
export default page;
