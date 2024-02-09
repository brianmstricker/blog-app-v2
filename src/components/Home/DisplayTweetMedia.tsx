"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import DisplayTweetMediaModal from "./DisplayTweetMediaModal";

type TweetMediaProps = {
 media:
  | {
     id: string;
     tweetId: string;
     url: string;
     width: string;
     height: string;
     aspectRatio: string;
    }[]
  | [];
 username: string | null;
 renderModal: boolean;
 setRenderModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectedMedia = {
 id: string;
 tweetId: string;
 url: string;
 width: string;
 height: string;
 aspectRatio: string;
};

const DisplayTweetMedia = ({
 media,
 username,
 renderModal,
 setRenderModal,
}: TweetMediaProps) => {
 const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null);
 function closeModal() {
  const modal = document.querySelector("#mediaModal");
  if (modal) {
   modal.classList.add("fadeOut");
   setTimeout(() => {
    modal.classList.remove("fadeOut");
    setRenderModal(false);
   }, 400);
  }
 }
 return (
  <>
   {media &&
    media.length === 1 &&
    media.map((med) => {
     const imgAspectPercent = `${100 / Number(med.aspectRatio)}%`;
     return (
      <div key={med.id}>
       {med.url && (
        <>
         {renderModal && (
          <DisplayTweetMediaModal
           mainMedia={selectedMedia}
           mainMediaIndex="0"
           closeModal={closeModal}
          />
         )}
         <div
          onClick={(e) => {
           e.stopPropagation();
           e.preventDefault();
           // setSelectedMedia(med);
           // setRenderModal(true);
           // window.history.pushState(
           //  null,
           //  "",
           //  `/${username}/status/${med.tweetId}/photo/${i + 1}`
           // );
          }}
          className={cn(
           "relative mt-3 block overflow-hidden",
           Number(imgAspectPercent.replace("%", "")) > 100 &&
            "max-w-[408px] max-h-[510px]",
           username && "hover:cursor-pointer"
          )}
         >
          <div
           style={{
            paddingBottom: imgAspectPercent || `56.25%`,
           }}
          />
          <div className="absolute inset-0 w-full h-full">
           <Image
            src={med.url}
            alt="tweet media"
            className="rounded-2xl object-cover border border-gray-200 dark:border-secondary cursor-pointer"
            fill
            sizes="408px"
           />
          </div>
         </div>
        </>
       )}
      </div>
     );
    })}
   {media && media.length === 3 && (
    <>
     {renderModal && (
      <DisplayTweetMediaModal
       mainMedia={selectedMedia}
       closeModal={closeModal}
       otherMedia={media.filter((med) => med.id !== selectedMedia?.id)}
       mainMediaIndex={media
        .findIndex((med) => med.id === selectedMedia?.id)
        .toString()}
      />
     )}
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
          <div
           onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSelectedMedia(media[0]);
            setRenderModal(true);
           }}
           key={media[0].id}
           className="relative w-full h-full"
          >
           <Image
            className="object-cover rounded-tl-2xl rounded-bl-2xl w-full h-full border border-gray-200 dark:border-secondary cursor-pointer"
            src={media[0].url}
            alt="preview of media upload"
            fill
            sizes="408px"
           />
          </div>
          <div className="flex flex-col gap-[1px] threeImg">
           {media.slice(1).map((med) => (
            <div key={med.id} className="h-full">
             <div
              className="relative w-full h-full"
              onClick={(e) => {
               e.stopPropagation();
               e.preventDefault();
               setSelectedMedia(med);
               setRenderModal(true);
              }}
             >
              <Image
               className="object-cover w-full h-full border border-gray-200 dark:border-secondary cursor-pointer"
               src={med.url}
               alt="preview of media upload"
               fill
               sizes="260px"
              />
             </div>
            </div>
           ))}
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </>
   )}
   {media && media.length > 1 && media.length !== 3 && (
    <>
     {renderModal && (
      <DisplayTweetMediaModal
       mainMedia={selectedMedia}
       closeModal={closeModal}
       otherMedia={media.filter((med) => med.id !== selectedMedia?.id)}
       mainMediaIndex={media
        .findIndex((med) => med.id === selectedMedia?.id)
        .toString()}
      />
     )}
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
           <div
            key={med.id}
            className="relative w-full h-full"
            onClick={(e) => {
             e.stopPropagation();
             e.preventDefault();
             setSelectedMedia(med);
             setRenderModal(true);
            }}
           >
            <Image
             className="object-cover rounded-2xl w-full h-full border border-gray-200 dark:border-secondary cursor-pointer"
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
    </>
   )}
  </>
 );
};
export default DisplayTweetMedia;
