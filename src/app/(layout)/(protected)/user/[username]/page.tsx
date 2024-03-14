import { fetchUserAction } from "@/actions/user-actions";
import ArrowBack from "@/components/Status/ArrowBack";
import { headers } from "next/headers";

const page = async ({ params }: { params: { username: string } }) => {
 const { username } = params;
 const user = await fetchUserAction(username);
 const headersList = headers();
 const referer = headersList.get("referer");
 if (!user)
  return <div className="mt-8 text-center font-bold">User not found</div>;
 if ("error" in user) {
  return <div className="mt-8 text-center font-bold">Something went wrong</div>;
 }
 return (
  <div>
   <div className="pt-1 pb-2 px-4 flex items-center justify-between sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b dark:border-b-white/25">
    <div className="flex gap-10">
     <ArrowBack referer={referer} userPage />
     <div className="flex flex-col">
      <div className="text-xl font-bold">{user.handle}</div>
      <div className="text-sm">{user.tweets.length} posts</div>
     </div>
    </div>
   </div>
  </div>
 );
};
export default page;
