"use client";
import { useTheme } from "next-themes";
import { FaRegSun } from "react-icons/fa6";
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
  <button onClick={changeTheme}>
   {theme === "dark" ? (
    <LuMoon className="w-6 h-6" />
   ) : (
    <FaRegSun className="w-6 h-6" />
   )}
   <span className="sr-only">Toggle theme</span>
  </button>
 );
}
