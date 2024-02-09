import { Suspense } from "react";
import { fetchTweetsAction } from "@/actions/tweet-actions";
import DisplayTweet from "@/components/Home/DisplayTweet";
import Loading from "./loading";

export default async function Home() {
 const tweets = await fetchTweetsAction();
 return (
  <>
   <Suspense fallback={<Loading />}>
    {Array.isArray(tweets) &&
     tweets.length > 0 &&
     tweets.map((tweet) => <DisplayTweet key={tweet.id} tweet={tweet} />)}
    {Array.isArray(tweets) && tweets.length === 0 && (
     <div className="border-b dark:border-b-white/25 py-5 text-center text-xl font-bold">
      No tweets yet!
     </div>
    )}
   </Suspense>
  </>
 );
}
