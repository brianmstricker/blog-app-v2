"use client";

const TweetBox = () => {
 return (
  <div>
   <div className="px-4 pt-3">
    <div className="flex">
     <div className="w-11 h-11 rounded-full bg-blue-600" />
     <div className="flex flex-col ml-3 flex-1">
      <textarea
       className="text-xl mt-2 font-light border-none bg-transparent outline-none dark:placeholder-white/50 placeholder-gray-500/50 resize-none"
       placeholder="What is happening?!"
      />
     </div>
    </div>
   </div>
  </div>
 );
};
export default TweetBox;
