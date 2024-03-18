import { fetchUserAction, fetchUserTweetsAction } from "@/actions/user-actions";
import { auth } from "@/auth";
import DisplayTweet from "@/components/Home/DisplayTweet";
import { Metadata } from "next";

export async function generateMetadata({
 params,
}: {
 params: { username: string };
}): Promise<Metadata> {
 const { username } = params;
 const fetchUser = await fetchUserAction(username);
 if (!fetchUser) return { title: "User not found" };
 if ("error" in fetchUser) return { title: "Something went wrong" };
 return {
  title: `${fetchUser.handle} (@${fetchUser.username}) / Chirp`,
  description: fetchUser.username,
 };
}

const page = async ({}: {}) => {
 const userInfo = await auth();
 if (!userInfo) return;
 const { user } = userInfo;
 if (!user) return;
 const tweets = await fetchUserTweetsAction(user.id);
 if (!tweets) return <div>No tweets found</div>;
 if ("error" in tweets) return <div>{tweets.error}</div>;
 return (
  <div>
   {tweets.map((tweet) => (
    <DisplayTweet
     key={tweet.id}
     tweet={tweet}
     user={user}
     repliesLength={(tweet as any).repliesLength}
    />
   ))}
  </div>
 );
};
export default page;
