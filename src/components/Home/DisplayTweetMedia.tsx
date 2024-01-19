"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type Media = {
 media:
  | {
     id: string;
     tweetId: string;
     url: string;
    }[]
  | [];
};

const DisplayTweetMedia = ({ media }: Media) => {
 const [imageAspect, setImageAspect] = useState<number | null>(null);
 useEffect(() => {
  if (media) {
   media.forEach((media) => {
    const img = document.createElement("img");
    img.src = media.url;
    img.onload = () => {
     setImageAspect(img.width / img.height);
    };
   });
  }
  return () => {
   setImageAspect(null);
  };
 }, [media]);
 const imgAspectPercent = imageAspect ? `${100 / imageAspect}%` : "56.25%";
 return (
  <>
   {media &&
    media.length === 1 &&
    media.map((med) => (
     <div key={med.id}>
      {med.url && (
       <div
        className={cn(
         "relative mt-3",
         Number(imgAspectPercent.replace("%", "")) > 100 &&
          "max-w-[408px] max-h-[510px]"
        )}
       >
        <div
         style={{
          paddingBottom: imgAspectPercent,
         }}
        />
        <div className="absolute inset-0 w-full h-full">
         <Image
          src={med.url}
          alt="tweet media"
          className="rounded-2xl object-cover border border-gray-200 dark:border-secondary"
          fill
          sizes="408px"
         />
        </div>
       </div>
      )}
     </div>
    ))}
   {media && media.length === 3 && (
    <div className="mt-3">
     <div className="block overflow-hidden">
      <div
       className="relative"
       style={{
        paddingBottom: "56.25%",
       }}
      >
       <div className="absolute inset-0 w-full h-full">
        <div className="grid grid-cols-2 gap-[1px] w-full h-full">
         <div key={media[0].id} className="relative w-full h-full">
          <Image
           className="object-cover rounded-tl-2xl rounded-bl-2xl w-full h-full border border-gray-200 dark:border-secondary"
           src={media[0].url}
           alt="preview of media upload"
           fill
           sizes="408px"
          />
         </div>
         <div className="flex flex-col gap-[1px] threeImg">
          {media.slice(1).map((med, i) => (
           <div key={med.id} className="relative w-full h-full">
            <Image
             className="object-cover w-full h-full border border-gray-200 dark:border-secondary"
             src={med.url}
             alt="preview of media upload"
             fill
             sizes="260px"
            />
           </div>
          ))}
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
   {media && media.length > 1 && media.length !== 3 && (
    <div className="mt-3">
     <div className="block overflow-hidden">
      <div
       className="relative"
       style={{
        paddingBottom: "56.25%",
       }}
      >
       <div className="absolute w-full h-full inset-0">
        <div className="w-full h-full grid grid-cols-2 gap-[1px] fourImg">
         {media.map((med, i) => (
          <div key={med.id} className="relative w-full h-full">
           <Image
            className="object-cover rounded-2xl w-full h-full border border-gray-200 dark:border-secondary"
            src={med.url}
            alt="preview of media upload"
            fill
            sizes="260px"
           />
          </div>
         ))}
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
};
export default DisplayTweetMedia;
