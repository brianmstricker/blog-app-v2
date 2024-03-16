import ArrowBack from "@/components/Status/ArrowBack";
import moment from "moment";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import UserLinks from "@/components/User/UserLinks";
import { fetchUserAction } from "@/actions/user-actions";
import { headers } from "next/headers";

const layout = async ({
 children,
 params,
}: {
 children: React.ReactNode;
 params: { username: string };
}) => {
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
   <div>
    <div className="pt-1 px-4 flex items-center justify-between sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
     <div className="flex gap-10 pb-1">
      <ArrowBack referer={referer} userPage />
      <div className="flex flex-col">
       <div className="text-xl font-bold">{user.handle}</div>
       <div className="text-sm text-mainGray">{user.tweets.length} posts</div>
      </div>
     </div>
    </div>
    {user.banner ? (
     <div
      className="h-[200px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${user.banner})` }}
     ></div>
    ) : (
     <div className="h-[200px] w-full bg-neutral-100 dark:bg-neutral-700/80" />
    )}
    <div className="px-4 pt-2">
     <div className="flex items-start justify-between">
      {!user.image ? (
       <div className=" w-[40px] h-[40px] sm:w-32 sm:h-32 rounded-full bg-blue-600 relative -top-20 ring-white dark:ring-black ring-4" />
      ) : (
       <div className="relative w-[40px] h-[40px] sm:w-32 sm:h-32 rounded-full -top-20 ring-white dark:ring-black ring-4">
        <Image
         src={user.image}
         alt="user PFP"
         fill
         className="rounded-full"
         quality={100}
         sizes="(max-width: 640px) 40px, 128px"
        />
       </div>
      )}
      <button className="font-bold px-4 py-1.5 border dark:border-white/35 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200">
       Edit profile
      </button>
     </div>
     <div className="-mt-12 flex flex-col">
      <div className="text-xl leading-5 font-bold">{user.handle}</div>
      <div className="text-mainGray text-[15px]">@{user.username}</div>
     </div>
     <div className="my-2.5 text-mainGray flex items-center gap-1">
      <IoCalendarOutline />{" "}
      <span className="text-[15px]">
       Joined {moment(user.createdAt).format("MMMM YYYY")}
      </span>
     </div>
     <div className="text-mainGray text-sm flex items-center gap-4">
      <div>
       <span className="text-black dark:text-white font-semibold">
        {user.following.length}
       </span>{" "}
       Following
      </div>
      <div>
       <span className="text-black dark:text-white font-semibold">
        {user.follower.length}
       </span>{" "}
       Followers
      </div>
     </div>
    </div>
    <UserLinks username={user.username} />
   </div>
   {children}
  </div>
 );
};
export default layout;
