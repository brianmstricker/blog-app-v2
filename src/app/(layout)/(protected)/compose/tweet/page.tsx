import ForYouFollowing from "@/components/Home/ForYouFollowing";
import CreateTweetBox from "@/components/Home/CreateTweetBox";
import DisplayTweet from "@/components/Home/DisplayTweet";
import { fetchTweetsAction } from "@/actions/tweet-actions";
import { auth } from "@/auth";

const page = async () => {
 const userInfo = await auth();
 const user = userInfo?.user;
 const tweets = await fetchTweetsAction();
 return (
  <>
   <ForYouFollowing />
   <CreateTweetBox userImage={user?.image} />
   {Array.isArray(tweets) && tweets.length > 0 && (
    <>
     {tweets.map((tweet) => (
      <DisplayTweet key={tweet.id} tweet={tweet} />
     ))}
    </>
   )}
  </>
 );
};
export default page;
