import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const NewToChirp = () => {
 return (
  <div className="border dark:border-white/25 rounded-2xl py-3 px-4">
   <div className="flex flex-col gap-2">
    <h2 className="font-bold">New to Chirp?</h2>
    <span className="text-xs text-gray-500/60 dark:text-white/50 font-light">
     Sign up now to get your own personalized timeline!
    </span>
    <div className="flex flex-col gap-2">
     <button className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold flex items-center justify-center gap-2 border border-black/30 dark:border-x-transparent w-[93%] hover:bg-white/90">
      <FcGoogle className="w-6 h-6" />
      <span>Sign up with Google</span>
     </button>
     <button className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold flex items-center justify-center gap-2 border border-black/30 dark:border-x-transparent w-[93%] hover:bg-white/90">
      <BsGithub className="w-6 h-6" />
      <span>Sign up with Github</span>
     </button>
     <button className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold hover:bg-white/90 transition-all duration-150 border border-white w-[93%]">
      Create account
     </button>
     <div className="text-[13px] font-light mt-1 text-gray-400/80 leading-[16px]">
      By signing up, you agree to the{" "}
      <span className="text-blue-400">Terms of Service</span> and{" "}
      <span className="text-blue-400">Privacy Policy</span>, including{" "}
      <span className="text-blue-400">Cookie Use</span>.
     </div>
    </div>
   </div>
  </div>
 );
};
export default NewToChirp;
