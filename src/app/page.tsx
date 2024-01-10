import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { PiArrowFatRightFill } from "react-icons/pi";
import Link from "next/link";
import { signIn } from "@/auth";
import CreateAccountButton from "@/components/CreateAccount/CreateAccountButton";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export default function Index() {
 return (
  <main className="w-full h-screen flex flex-col lg:flex-row items-center lg:justify-evenly relative">
   <div className="absolute right-4 top-4">
    <ThemeToggleButton />
   </div>
   <div className="w-[80%] min-[420px]:w-[400px] lg:w-auto">
    <div className="w-[100px] h-[100px] lg:w-[450px] lg:h-[450px] relative shrink-0 self-start lg:self-auto">
     <Image
      src="/logo.png"
      fill
      priority
      alt="Logo"
      sizes="(max-width: 1024px) 100px, 450px"
     />
    </div>
   </div>
   <div className="flex flex-col gap-y-8 lg:h-[60%] max-w-[400px] lg:max-w-none">
    <div className="mx-auto min-[420px]:mx-0 flex flex-col gap-12 w-[80%] min-[420px]:w-full">
     <span className="text-4xl min-[420px]:text-6xl font-black tracking-wider break-words min-[420px]:leading-[80px]">
      Happening now
     </span>
     <span className="text-xl min-[420px]:text-3xl font-extrabold tracking-wide">
      Join today.
     </span>
    </div>
    <div className="mx-auto min-[420px]:mx-0 w-[80%] lg:w-[60%] flex flex-col">
     <form
      action={async () => {
       "use server";
       await signIn("google");
      }}
     >
      <button
       type="submit"
       className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold flex items-center justify-center gap-2 border border-black/30 dark:border-x-transparent hover:bg-white/90 w-full"
      >
       <FcGoogle className="w-6 h-6" />
       <span>Sign up with Google</span>
      </button>
     </form>
     <form
      action={async () => {
       "use server";
       await signIn("github");
      }}
     >
      <button className="bg-white text-black my-1 rounded-full py-2 px-4 font-semibold flex items-center justify-center gap-2 border border-black/30 dark:border-x-transparent hover:bg-white/90 w-full">
       <BsGithub className="w-6 h-6" />
       <span>Sign up with Github</span>
      </button>
     </form>
     <div className="flex items-center">
      <div className="w-full bg-mainGray/40 h-[1px]" />
      <span className="px-4">or</span>
      <div className="w-full bg-mainGray/40 h-[1px]" />
     </div>
     <div>
      <CreateAccountButton />
      <div className="text-[11px] mt-1 text-gray-400/80 leading-[14px]">
       By signing up, you agree to the{" "}
       <span className="text-main">Terms of Service</span> and{" "}
       <span className="text-main">Privacy Policy</span>, including{" "}
       <span className="text-main">Cookie Use</span>. C
      </div>
     </div>
     <div className="mt-8 sm:mt-16">
      <div className="font-bold">Already have an account?</div>
      <button className="border border-black/30 dark:border-white/50 text-main my-1 rounded-full py-2 px-4 w-full font-semibold mt-4 hover:bg-main/20 dark:hover:bg-main/10 transition-all duration-150">
       Sign in
      </button>
     </div>
    </div>
   </div>
   <Link
    href="/home"
    scroll={false}
    className="absolute bottom-4 flex items-center gap-2 text-sm text-main hover:underline underline-offset-2"
   >
    <span>Or view the homepage as a guest</span>
    <PiArrowFatRightFill className="w-4 h-4" />
   </Link>
  </main>
 );
}
