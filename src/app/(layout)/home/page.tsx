import ForYouFollowing from "@/components/Home/ForYouFollowing";
import CreateTweetBox from "@/components/Home/CreateTweetBox";
import DisplayTweet from "@/components/Home/DisplayTweet";
import { auth } from "@/auth";
import { fetchTweetsAction } from "@/actions/tweet-actions";

export default async function Home() {
 const userInfo = await auth();
 const user = userInfo?.user;
 const tweets = await fetchTweetsAction();
 return (
  <>
   <ForYouFollowing />
   {!!user ? (
    <CreateTweetBox />
   ) : (
    <div className="border-b dark:border-b-white/25 py-5 text-center text-xl font-bold">
     Sign in to get Chirping!
    </div>
   )}
   {Array.isArray(tweets) && tweets.length > 0 && (
    <>
     {tweets.map((tweet) => (
      <DisplayTweet key={tweet.id} tweet={tweet} />
     ))}
    </>
   )}
   {Array.isArray(tweets) && tweets.length === 0 && (
    <div className="border-b dark:border-b-white/25 py-5 text-center text-xl font-bold">
     No tweets yet!
    </div>
   )}
  </>
 );
}
