"use client";

import { useEffect } from "react";

const HideScroll = () => {
 useEffect(() => {
  document.body.classList.add("hide-scroll");
  return () => document.body.classList.remove("hide-scroll");
 }, []);
 return <div />;
};
export default HideScroll;
