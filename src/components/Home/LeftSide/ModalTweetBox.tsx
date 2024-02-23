"use client";
import { FaRegImage, FaEarthAmericas } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { FaRegSmile } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { postTweetAction } from "@/actions/tweet-actions";
import { TailSpin } from "react-loader-spinner";
import { IoClose } from "react-icons/io5";

const ModalTweetBox = ({
 userImg,
 closeModal,
}: {
 userImg?: string | null;
 closeModal: () => void;
}) => {
 const [tweet, setTweet] = useState("");
 const [media, setMedia] = useState<File[] | null | []>([]);
 const [preview, setPreview] = useState<null | string[]>(null);
 const [imageAspect, setImageAspect] = useState<number | null>(null);
 const [loading, setLoading] = useState(false);
 const inputRef = useRef<HTMLDivElement | null>(null);
 const tweetOptions = [
  { icon: <FaRegImage />, text: "Media" },
  { icon: <MdOutlineGifBox />, text: "GIF" },
  { icon: <BiSliderAlt />, text: "Poll" },
  { icon: <FaRegSmile />, text: "Emoji" },
 ];
 function handleInput(e: any) {
  const maxTextLength = 300;
  const readOnlyInput = document.getElementById("readOnlyModal");
  const tweetBox = document.getElementById("tweetBoxModal");
  const tweetLengthAmount = document.getElementById("tweetLengthAmountModal");
  let text = e.target.innerText;
  setTweet(text);
  if (tweetLengthAmount) {
   if (text.length > 0) {
    setTimeout(() => {
     tweetLengthAmount.classList.remove("opacity-0");
    }, 100);
    if (text.length > maxTextLength) {
     setTimeout(() => {
      tweetLengthAmount.classList.add("text-red-500");
     }, 100);
    } else {
     setTimeout(() => {
      tweetLengthAmount.classList.remove("text-red-500");
     }, 100);
    }
   } else {
    tweetLengthAmount.classList.add("opacity-0");
   }
  }
  const currentTextLength = text.length;
  if (readOnlyInput && tweetBox) {
   if (currentTextLength > maxTextLength) {
    let overText = text.substring(maxTextLength);
    overText = `<span class="bg-red-500 bg-opacity-50">${overText}</span>`;
    text = text.substring(0, maxTextLength) + overText;
    tweetBox.style.zIndex = "-1";
   }
   readOnlyInput.innerHTML = text;
  }
 }
 async function handleSubmit() {
  setLoading(true);
  let formData = new FormData();
  if (media && media.length > 0) {
   const imageDimensions = await Promise.all(
    media.map(async (file: File) => {
     const img = document.createElement("img");
     img.src = URL.createObjectURL(file);
     const onLoad = new Promise((resolve) => {
      img.onload = () => resolve({ width: img.width, height: img.height });
     });
     formData.append("media", file);
     return onLoad;
    })
   );
   const width = imageDimensions.map((dim: any) => dim.width);
   const height = imageDimensions.map((dim: any) => dim.height);
   const aspectRatio = imageDimensions.map((dim: any) =>
    (dim.width / dim.height).toFixed(2)
   );
   formData.append("width", JSON.stringify(width));
   formData.append("height", JSON.stringify(height));
   formData.append("aspectRatio", JSON.stringify(aspectRatio));
  }
  if (tweet && tweet.length > 0 && tweet.length > 300) {
   return alert("Tweet is too long");
  }
  if (tweet && tweet.length > 0) {
   formData.append("text", tweet.trim());
  }
  const post = await postTweetAction(formData);
  if (post.success) {
   closeModal();
   setTweet("");
   setMedia([]);
   const tweetBox = document.getElementById("tweetBoxModal");
   const readOnlyInput = document.getElementById("readOnlyModal");
   const tweetLengthAmount = document.getElementById("tweetLengthAmountModal");
   if (tweetBox && readOnlyInput && tweetLengthAmount) {
    tweetBox.innerText = "";
    readOnlyInput.innerHTML = "";
    tweetLengthAmount.classList.add("opacity-0");
   }
  }
  setLoading(false);
 }
 function buttonDisabled() {
  if (loading) return true;
  if (!tweet && !media) return true;
  if (!tweet && media && media.length === 0) return true;
  if (tweet && !media) {
   if (tweet.length > 300 || tweet.trim() === "") return true;
  }
  if (tweet && media && media.length === 0) {
   if (tweet.length > 300 || tweet.trim() === "") return true;
  }
  if (tweet && media && media.length > 0) {
   if (tweet.length > 300) {
    return true;
   }
  }
  if (media && media.length > 4) return true;
  return false;
 }
 useEffect(() => {
  if (!media) return;
  const mediaArray = Array.from(media || ([] as File[]));
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
 function handleParentClick() {
  if (inputRef.current) {
   inputRef.current.focus();
   const range = document.createRange();
   range.selectNodeContents(inputRef.current);
   range.collapse(false);
   const selection = window.getSelection();
   if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
   }
  }
 }
 return (
  <div className="flex flex-col">
   <div
    onClick={handleParentClick}
    className="relative max-h-[75vh] sm:max-h-[60vh] overflow-y-auto"
   >
    <div className="flex flex-1">
     <div className="pointer-events-none shrink-0">
      <div className="shrink-0 select-none">
       {!userImg ? (
        <div className="w-11 h-11 rounded-full bg-blue-600" />
       ) : (
        <div className="relative w-11 h-11 rounded-full">
         <Image
          src={userImg}
          alt="user PFP"
          fill
          className="rounded-full"
          sizes="44px"
         />
        </div>
       )}
      </div>
     </div>
     <div className="w-[90%] ml-3 mt-2">
      <div
       onClick={(e) => e.stopPropagation()}
       className="relative min-h-[80px] text-xl"
      >
       <div className="select-none pointer-events-none">
        {!tweet && (
         <span className="absolute dark:text-white/50 text-gray-500/60 font-extralight">
          What is happening?!
         </span>
        )}
       </div>
       <div
        contentEditable={true}
        id="tweetBoxModal"
        className="outline-none whitespace-pre-wrap break-words h-full select-text block font-light z-[1] leading-6"
        tabIndex={0}
        onInput={handleInput}
        ref={inputRef}
       />
       <div
        contentEditable={true}
        id="readOnlyModal"
        className="absolute inset-0 outline-none whitespace-pre-wrap break-words h-full block font-light z-[-1] select-none leading-6"
       />
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
                className="object-cover rounded-2xl w-full h-full"
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
               className="object-cover rounded-2xl w-full h-full"
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
                  className="object-cover rounded-2xl w-full h-full"
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
      </div>
     </div>
    </div>
   </div>
   <div className="mt-4 mb-3 flex items-center gap-1 ml-1 text-main text-sm font-medium select-none">
    <FaEarthAmericas />
    <span className="font-bold mt-[2px]">Everyone can reply</span>
   </div>
   <div className="border-t dark:border-t-white/25 mb-2" />
   <div>
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
                setMedia(updatedMedia as File[]);
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
     <div className="flex gap-2 items-center">
      <span
       id="tweetLengthAmountModal"
       className="text-sm font-bold transition-all duration-200 opacity-0"
      >
       {tweet.length}/300
      </span>
      <button
       onClick={handleSubmit}
       className={cn(
        "bg-main py-1.5 px-4 rounded-full font-bold text-white transition-all duration-200",
        !tweet || buttonDisabled() ? "opacity-50 cursor-default" : ""
       )}
       disabled={buttonDisabled()}
      >
       {!loading ? (
        "Post"
       ) : (
        <span className="flex items-center gap-2">
         Posting
         <TailSpin
          visible={true}
          height="16"
          width="16"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
         />
        </span>
       )}
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default ModalTweetBox;
