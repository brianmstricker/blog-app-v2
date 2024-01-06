import Image from "next/image";

export default function Index() {
 return (
  <main className="w-full h-screen flex items-center justify-evenly">
   <div>
    <Image src="/logo.png" width={450} height={450} alt="Logo" />
   </div>
   <div className="flex flex-col justify-between h-[60%]">
    <div className="flex flex-col gap-12">
     <h1 className="text-6xl font-black tracking-wide">Happening now</h1>
     <span className="text-3xl font-bold">Join today.</span>
    </div>
    <div className="w-[70%]">
     <button>google</button>
     <button>apple</button>
     <div>or</div>
     <div>
      <button>create account</button>
      <div className="text-xs">
       By signing up, you agree to the Terms of Service and Privacy Policy,
       including Cookie Use.
      </div>
     </div>
    </div>
    <div>
     <div>Already have an account?</div>
     <button>sign in</button>
    </div>
   </div>
  </main>
 );
}
