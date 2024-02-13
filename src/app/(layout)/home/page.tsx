import { Suspense } from "react";
import { fetchTweetsAction } from "@/actions/tweet-actions";
import DisplayTweet from "@/components/Home/DisplayTweet";
import Loading from "./loading";
import DisplayTweetWrapper from "@/components/Home/DisplayTweetWrapper";
import { auth } from "@/auth";

export default async function Home() {
 const userInfo = await auth();
 const user = userInfo?.user;
 const tweets = await fetchTweetsAction();
 return (
  <>
   <Suspense fallback={<Loading />}>
    {Array.isArray(tweets) && tweets.length > 0 && (
     <DisplayTweetWrapper tweets={tweets} user={user} />
    )}
    {Array.isArray(tweets) && tweets.length === 0 && (
     <div className="border-b dark:border-b-white/25 py-5 text-center text-xl font-bold">
      No tweets yet!
     </div>
    )}
   </Suspense>
  </>
 );
}
