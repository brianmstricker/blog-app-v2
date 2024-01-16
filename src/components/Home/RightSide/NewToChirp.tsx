import { signIn } from "@/auth";
import CreateAccountButton from "@/components/CreateAccount/CreateAccountButton";
import { BsGithub } from "react-icons/bs";
import RightGoogleButton from "./RightGoogleButton";
import RightGithubButton from "./RightGithubButton";

const NewToChirp = () => {
 return (
  <div className="border dark:border-white/25 rounded-2xl py-3 px-4">
   <div className="flex flex-col gap-2">
    <h2 className="font-bold">New to Chirp?</h2>
    <span className="text-xs text-gray-500/60 dark:text-white/50 font-light">
     Sign up now to get your own personalized timeline!
    </span>
    <div className="flex flex-col gap-2">
     <form
      action={async () => {
       "use server";
       await signIn("google");
      }}
     >
      <RightGoogleButton />
     </form>
     <form
      action={async () => {
       "use server";
       await signIn("github");
      }}
     >
      <RightGithubButton />
     </form>
     <CreateAccountButton homepage />
     <div className="text-[13px] font-light mt-1 text-gray-400/80 leading-[16px]">
      By signing up, you agree to the{" "}
      <span className="text-blue-400">Terms of Service</span> and{" "}
      <span className="text-blue-400">Privacy Policy</span>, including{" "}
      <span className="text-blue-400">Cookie Use</span>. C
     </div>
    </div>
   </div>
  </div>
 );
};
export default NewToChirp;
