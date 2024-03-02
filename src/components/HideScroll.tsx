"use client";

import { useEffect, useState } from "react";

const HideScroll = ({ children }: { children: React.ReactNode }) => {
 const [scrollbarWidth, setScrollbarWidth] = useState(0);
 useEffect(() => {
  if (window.innerWidth - document.documentElement.clientWidth !== 0)
   setScrollbarWidth(window.innerWidth - document.documentElement.clientWidth);
 }, []);
 useEffect(() => {
  document.body.classList.add("hide-scroll");
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  return () => {
   document.body.style.paddingRight = "0";
   document.body.classList.remove("hide-scroll");
  };
 }, [scrollbarWidth]);
 return <div>{children}</div>;
};
export default HideScroll;
