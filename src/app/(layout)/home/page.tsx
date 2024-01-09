import ForYouFollowing from "@/components/Home/ForYouFollowing";
import CreateTweetBox from "@/components/Home/CreateTweetBox";
import DisplayTweet from "@/components/Home/DisplayTweet";
import { auth } from "@/auth";

export default async function Home() {
 const userInfo = await auth();
 const user = userInfo?.user;
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
   <DisplayTweet />
   <DisplayTweet />
   <DisplayTweet />
  </>
 );
}
