"use client";

import { useEffect } from "react";

const HideScroll = ({ children }: { children: React.ReactNode }) => {
 const scrollbarWidth =
  window.innerWidth - document.documentElement.clientWidth;
 useEffect(() => {
  document.body.classList.add("hide-scroll");
  return () => document.body.classList.remove("hide-scroll");
 }, []);
 useEffect(() => {
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  return () => {
   document.body.style.paddingRight = "0";
  };
 }, [scrollbarWidth]);
 return <div>{children}</div>;
};
export default HideScroll;
