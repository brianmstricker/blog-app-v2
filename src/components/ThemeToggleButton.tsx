"use client";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoon } from "react-icons/lu";
import { useEffect, useState } from "react";

export function ThemeToggleButton() {
 const [mounted, setMounted] = useState(false);
 const { setTheme, theme } = useTheme();
 useEffect(() => setMounted(true), []);
 function changeTheme() {
  if (theme === "dark") {
   setTheme("light");
  } else {
   setTheme("dark");
  }
 }
 if (!mounted) return null;
 return (
  <button onClick={changeTheme} className="p-2 rounded-full">
   {theme === "dark" ? (
    <LuMoon className="w-5 h-5 hover:scale-[95%] transition-all duration-200" />
   ) : (
    <MdOutlineWbSunny className="w-5 h-5 hover:scale-[95%] transition-all duration-200" />
   )}
   <span className="sr-only">Toggle theme</span>
  </button>
 );
}
