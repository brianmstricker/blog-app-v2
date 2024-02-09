import Image from "next/image";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import moment from "moment";
import { FiShare } from "react-icons/fi";
import { LuBookmark } from "react-icons/lu";
import { FaRegHeart, FaRetweet } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import ArrowBack from "@/components/Status/ArrowBack";
import { headers } from "next/headers";
import { Metadata } from "next";
import { fetchTweetAction } from "@/actions/tweet-actions";
import { auth } from "@/auth";
import PostReply from "@/components/Status/PostReply";
import MediaWrapper from "@/components/Status/MediaWrapper";

type StatusProps = {
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

export async function generateMetadata({
 params,
}: {
 params: { username: string; tweetId: string };
}): Promise<Metadata> {
 const { username, tweetId } = params;
 const tweet = (await fetchTweetAction({
  username,
  tweetId,
 })) as StatusProps;
 if (!tweet) return { title: "Chirp not found" };
 return {
  title: `${tweet.user.username} on Chirp: "${
   tweet.text?.substring(0, 30) || tweet.media[0].url.substring(0, 30)
  }" / Chirp`,
  description: tweet.text,
 };
}

const page = async ({
 params,
}: {
 params: { username: string; tweetId: string };
}) => {
 const { username, tweetId } = params;
 const tweet = (await fetchTweetAction({
  username,
  tweetId,
 })) as StatusProps;
 if (!tweet) return <div>Chirp not found</div>;
 const userInfo = await auth();
 const user = userInfo?.user;
 const headersList = headers();
 const referer = headersList.get("referer");
 return (
  <div className="px-6 pt-4">
   <ArrowBack referer={referer} />
   <div
    tabIndex={0}
    className="flex items-center mt-6 mb-5 rounded-full transition-all duration-150"
   >
    {!tweet.user.image ? (
     <div className="w-11 h-11 rounded-full bg-blue-600" />
    ) : (
     <div className="relative w-11 h-11 rounded-full">
      <Image
       src={tweet.user.image}
       alt="user PFP"
       fill
       className="rounded-full"
       sizes="44px"
      />
     </div>
    )}
    <div className="flex flex-1 flex-col ml-4 select-none">
     <span className="font-bold text-[14px] leading-[18px]">
      {tweet.user.username}
     </span>
     <span className="text-mainGray">@{tweet.user.handle}</span>
    </div>
    <div>
     <HiMiniEllipsisHorizontal className="text-lg text-mainGray" />
    </div>
   </div>
   <div>{tweet.text}</div>
   {tweet.media && tweet.media.length > 0 && <MediaWrapper tweet={tweet} />}
   <div className="mt-3 text-mainGray text-[15px]">
    {moment(tweet.createdAt).format("LT \u00B7 ll")}
   </div>
   <div className="border-y dark:border-y-white/25 my-3 ">
    <div className="py-3">
     <div className="flex items-center justify-between text-mainGray">
      <div className="flex items-center gap-1">
       <BiMessageRounded className="text-xl" />
       <span className="text-[13px]">0</span>
      </div>
      <div className="flex items-center gap-1">
       <FaRetweet className="text-xl" />
       <span className="text-[13px]">0</span>
      </div>
      <div className="flex items-center gap-1">
       <FaRegHeart className="text-xl" />
       {tweet.likes && (
        <span className="text-[13px]">{tweet.likes.length || 0}</span>
       )}
      </div>
      <LuBookmark className="text-xl" />
      <FiShare className="text-xl" />
     </div>
    </div>
   </div>
   {!!user && (
    <div>
     <PostReply />
    </div>
   )}
  </div>
 );
};
export default page;
