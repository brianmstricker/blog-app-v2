const NonUserBanner = () => {
 return (
  <div className="fixed bottom-0 w-full bg-main">
   <div className="flex py-3.5">
    <div className="w-1/4 hidden lg:block" />
    <div className="flex w-full min-[1400px]:w-[60%] justify-between items-center px-4 md:px-10">
     <div className="leading-6 hidden md:block">
      <h2 className="text-[22px] font-bold">
       Don&apos;t miss what&apos;s happening
      </h2>
      <p className="text-sm">People on X are the first to know.</p>
     </div>
     <div className="flex items-center gap-4 w-full md:w-auto">
      <button className="px-4 py-1.5 text-white border border-white/40 rounded-full font-bold w-full md:w-auto">
       Log in
      </button>
      <button className="px-4 py-1.5 text-black bg-white rounded-full font-bold w-full md:w-auto">
       Sign up
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default NonUserBanner;
