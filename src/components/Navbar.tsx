import { ThemeToggleButton } from "./ThemeToggleButton";

const Navbar = () => {
 return (
  <div className="flex items-center justify-between px-4 h-20 border-b dark:border-b-slate-700">
   <nav>Navbar</nav>
   <ThemeToggleButton />
  </div>
 );
};
export default Navbar;
