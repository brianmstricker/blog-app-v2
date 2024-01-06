import Link from "next/link";

const CheckoutGithub = () => {
 return (
  <div className="dark:bg-secondary bg-secondary/5 rounded-2xl py-3 px-4 flex flex-col gap-1">
   <h3 className="text-xl font-bold">Checkout my Github</h3>
   <p className="text-sm">
    Checkout my github:{" "}
    <Link
     href="https://www.github.com/brianmstricker"
     target="_blank"
     className="underline"
    >
     brianmstricker
    </Link>{" "}
    or my portfolio:{" "}
    <Link
     href="https://brianstricker.com"
     target="_blank"
     className="underline"
    >
     brianstricker.com
    </Link>
   </p>
   <Link
    href="https://www.github.com/brianmstricker"
    target="_blank"
    className="bg-main w-fit px-4 py-1.5 rounded-full font-bold hover:bg-main/90 transition-all duration-150 tracking-tight mt-1.5 text-white"
   >
    View github
   </Link>
  </div>
 );
};
export default CheckoutGithub;
