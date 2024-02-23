import { fetchBookmarksAction } from "@/actions/tweet-actions";
import { auth } from "@/auth";
import BookmarkTweetWrapper from "@/components/Home/Bookmark/BookmarkTweetWrapper";
import ClearBookmarksComponent from "@/components/Home/Bookmark/ClearBookmarksComponent";

const Page = async () => {
 const userInfo = await auth();
 const user = userInfo?.user;
 if (!user) return null;
 const bookmarks = await fetchBookmarksAction();
 if (!Array.isArray(bookmarks)) return null;
 return (
  <>
   <div tabIndex={0}>
    <div className="pt-1 pb-2 px-4 flex items-center justify-between sticky top-0 z-10 bg-gray-100/95 dark:bg-black/95 backdrop-blur-sm">
     <div>
      <h1 className="text-xl font-bold">Bookmarks</h1>
      <span className="text-mainGray relative -top-1 text-sm">
       @{user.handle}
      </span>
     </div>
     {bookmarks && bookmarks.length > 0 && <ClearBookmarksComponent />}
    </div>
    {bookmarks && bookmarks.length === 0 && (
     <div className="max-w-[22rem] mx-auto mt-4">
      <p className="text-4xl font-bold">Save posts for later</p>
      <p className="text-[16px] text-mainGray mt-2 tracking-tight">
       Bookmark posts to easily find them again in the future.
      </p>
     </div>
    )}
    {bookmarks && bookmarks.length > 0 && (
     <div>
      <BookmarkTweetWrapper bookmarks={bookmarks} user={user} />
     </div>
    )}
   </div>
  </>
 );
};
export default Page;
