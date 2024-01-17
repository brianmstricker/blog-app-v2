"use client";
import { FaRegImage, FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { postTweetAction } from "@/actions/tweet-actions";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const CreateTweetBox = ({ userImage }: { userImage?: string | null }) => {
 //todo: add media, gif, emoji functionality
 //todo: add who can reply functionality
 //todo: show character limit
 const [whoCanReply, setWhoCanReply] = useState(false);
 const [tweet, setTweet] = useState("");
 const [media, setMedia] = useState<File[] | null | []>([]);
 const [preview, setPreview] = useState<null | string[]>(null);
 const [imageAspect, setImageAspect] = useState<number | null>(null);
 const tweetOptions = [
  { icon: <FaRegImage />, text: "Media" },
  { icon: <MdOutlineGifBox />, text: "GIF" },
  { icon: <BiSliderAlt />, text: "Poll" },
  { icon: <FaRegSmile />, text: "Emoji" },
 ];
 function handleInput(e: any) {
  const text = e.target.innerText;
  const updatedText = text.trim();
  setTweet(updatedText);
 }
 function buttonDisabled() {
  if (!tweet && !media) return true;
  if (!tweet && media && media.length === 0) return true;
  if (tweet) {
   return (
    tweet === "" ||
    tweet === " " ||
    tweet === "<br>" ||
    tweet.trim() === "" ||
    tweet.length > 300
   );
  }
  if (!media) return true;
  return false;
 }
 async function handleSubmit() {
  let formData = new FormData();
  // if (media) formData.append("media", media);
  // console.log(formData.get("media"));
  const post = await postTweetAction({ text: tweet });
  if (post.success) {
   setTweet("");
   const tweetBox = document.getElementById("tweetBox");
   if (tweetBox) {
    tweetBox.innerHTML = "";
   }
  }
 }
 useEffect(() => {
  if (!media) return;
  const mediaArray = Array.from(media || ([] as File[]));
  console.log(mediaArray);
  const updatedMediaArray = mediaArray.slice(0, 4);
  const mediaUrlArray = updatedMediaArray.map((media) =>
   URL.createObjectURL(media)
  );
  setPreview(mediaUrlArray);
  return () => {
   mediaUrlArray.forEach((media) => URL.revokeObjectURL(media));
  };
 }, [media]);
 useEffect(() => {
  if (preview) {
   preview.forEach((prev) => {
    const img = document.createElement("img");
    img.src = prev;
    img.onload = () => {
     setImageAspect(img.width / img.height);
    };
   });
  }
  return () => {
   setImageAspect(null);
  };
 }, [preview]);
 return (
  <div className="border-b dark:border-b-white/25">
   <div className="px-4 pt-2.5 flex">
    <div className="shrink-0 select-none">
     {!userImage ? (
      <div className="w-11 h-11 rounded-full bg-blue-600" />
     ) : (
      <div className="relative w-11 h-11 rounded-full">
       <Image
        src={userImage}
        alt="user PFP"
        fill
        className="rounded-full"
        sizes="44px"
       />
      </div>
     )}
    </div>
    <div className="flex flex-col ml-3 py-2 grow max-w-[90%]">
     <div className="relative min-h-[40px] max-h-[600px] text-xl overflow-y-auto">
      <div className="select-none pointer-events-none">
       {!tweet && (
        <span className="absolute dark:text-white/50 text-gray-500/60 font-extralight">
         What is happening?!
        </span>
       )}
      </div>
      <div
       contentEditable={true}
       id="tweetBox"
       className="outline-none whitespace-pre-wrap break-words h-full select-text block font-light"
       tabIndex={0}
       onInput={handleInput}
       onFocus={() => setWhoCanReply(true)}
      />
     </div>
     {preview && preview.length !== 3 && preview.length !== 0 && (
      <div className="my-2">
       <div className="block overflow-hidden">
        <div
         className="relative"
         style={{
          paddingBottom:
           media?.length === 1 && imageAspect
            ? `${100 / imageAspect}%`
            : "56.25%",
         }}
        >
         <div className="absolute w-full h-full inset-0">
          <div
           className={cn(
            "w-full h-full",
            preview.length === 2 && "grid grid-cols-2 gap-2",
            preview.length === 4 && "grid grid-cols-2 gap-2"
           )}
          >
           {preview.map((prev, index) => (
            <div
             key={prev}
             className="relative w-full h-full transition-all ease-out duration-200"
            >
             <div
              onClick={() => {
               const updatedPreview = [...preview];
               const updatedMedia = media ? [...media] : [];
               updatedPreview.splice(index, 1);
               updatedMedia.splice(index, 1);
               setPreview(updatedPreview);
               setMedia(updatedMedia);
               setImageAspect(null);
              }}
              className="absolute top-1.5 right-1.5 z-[2] rounded-full p-1 bg-black/70 hover:bg-black/55 cursor-pointer"
             >
              <IoClose className="fill-white text-xl" />
             </div>
             <Image
              className="object-cover rounded-3xl w-full h-full"
              src={prev}
              alt="preview of media upload"
              fill
              draggable={false}
             />
            </div>
           ))}
          </div>
         </div>
        </div>
       </div>
      </div>
     )}
     {preview && preview.length === 3 && (
      <div className="my-2">
       <div className="block overflow-hidden">
        <div
         className="relative"
         style={{
          paddingBottom: "56.25%",
         }}
        >
         <div className="absolute inset-0 w-full h-full">
          <div className="grid grid-cols-2 gap-2 w-full h-full">
           <div
            key={preview[0]}
            className="relative w-full h-full transition-all ease-out duration-200"
           >
            <div
             onClick={() => {
              const updatedPreview = [...preview];
              const updatedMedia = media ? [...media] : [];
              updatedPreview.splice(0, 1);
              updatedMedia.splice(0, 1);
              setPreview(updatedPreview);
              setMedia(updatedMedia);
              setImageAspect(null);
             }}
             className="absolute top-1.5 right-1.5 z-[2] rounded-full p-1 bg-black/70 hover:bg-black/55 cursor-pointer"
            >
             <IoClose className="fill-white text-xl" />
            </div>
            <Image
             className="object-cover rounded-3xl w-full h-full"
             src={preview[0]}
             alt="preview of media upload"
             fill
             draggable={false}
            />
           </div>
           <div className="flex flex-col gap-2">
            {preview.slice(1).map((prev, index) => (
             <div
              key={prev}
              className="relative w-full h-full transition-all ease-out duration-200"
             >
              <div
               onClick={() => {
                const updatedPreview = [...preview];
                const updatedMedia = media ? [...media] : [];
                updatedPreview.splice(index, 1);
                updatedMedia.splice(index, 1);
                setPreview(updatedPreview);
                setMedia(updatedMedia);
                setImageAspect(null);
               }}
               className="absolute top-1.5 right-1.5 z-[2] rounded-full p-1 bg-black/70 hover:bg-black/55 cursor-pointer"
              >
               <IoClose className="fill-white text-xl" />
              </div>
              {media && media.length > 0 && (
               <Image
                className="object-cover rounded-3xl w-full h-full"
                src={prev}
                alt="preview of media upload"
                fill
                draggable={false}
               />
              )}
             </div>
            ))}
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     )}
     {whoCanReply && (
      <div className="border-b dark:border-b-white/25 mb-2">
       <div className="mb-6 flex items-center gap-2 ml-1 text-main text-sm font-medium relative top-3">
        <FaEarthAmericas />
        <span>Everyone can reply</span>
       </div>
      </div>
     )}
     <div className="flex items-center justify-between">
      <div>
       {tweetOptions.map((option) => (
        <div
         key={option.text}
         className="group inline-flex flex-col relative justify-center items-center"
        >
         <label
          className={cn(
           "text-main cursor-pointer rounded-full font-bold text-xl inline-flex flex-col items-center p-2 focus:outline-main focus:outline",
           option.text === "Media" && media?.length === 4 && "opacity-50"
          )}
          tabIndex={0}
         >
          {option.icon}
          {option.text === "Media" && (
           <input
            disabled={media?.length === 4}
            type="file"
            multiple={true}
            className="hidden"
            onChange={async (e) => {
             if (!e.target.files || e.target.files.length === 0) {
              return;
             }
             if (e.target.files && e.target.files.length > 0) {
              if (e.target.files.length > 4)
               return alert("You can only upload 4 images at a time");
              if (e.target.files.length <= 4) {
               const filesArray = Array.from(e.target.files);
               if (filesArray.length <= 4) {
                const mediaFiles = await Promise.all(
                 filesArray.map(async (file) => {
                  return file;
                 })
                );
                if (media) {
                 const updatedMedia = [...media, ...mediaFiles];
                 if (updatedMedia.length > 4)
                  return alert("You can only upload 4 images at a time");
                 setMedia(updatedMedia);
                }
               }
              }
             }
            }}
           />
          )}
         </label>
         <span className="text-xs opacity-0 group-hover:opacity-100 mt-2 text-white bg-gray-600 p-1 rounded-sm group-focus-within:opacity-100 w-fit absolute -bottom-6">
          {option.text}
         </span>
        </div>
       ))}
      </div>
      <button
       onClick={handleSubmit}
       className={cn(
        "bg-main py-1.5 px-4 rounded-full font-bold text-white",
        buttonDisabled() ? "opacity-50 cursor-default" : ""
       )}
       disabled={buttonDisabled()}
      >
       Post
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default CreateTweetBox;