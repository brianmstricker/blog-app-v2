import { auth } from "@/auth";
import ForYouFollowing from "@/components/Home/ForYouFollowing";
import CreateTweetBox from "@/components/Home/HomeTweetBox/CreateTweetBox";

export default async function HomePageLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const userInfo = await auth();
 const user = userInfo?.user;
 return (
  <>
   <ForYouFollowing user={user} />
   {!!user ? (
    <CreateTweetBox userImage={user.image} />
   ) : (
    <div className="border-b dark:border-b-white/25 py-5 text-center text-xl font-bold">
     Sign in to get Chirping!
    </div>
   )}
   {children}
  </>
 );
}
