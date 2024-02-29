import { createPortal } from "react-dom";

const RemovedBanner = () => {
 return createPortal(
  <div className="fixed bottom-10 left-1/2 right-1/2 -translate-x-1/2 w-full min-[400px]:w-[275px] text-center bg-main px-4 py-2 rounded-sm text-white z-[101]">
   <span>Removed from your Bookmarks</span>
  </div>,
  document.body
 );
};
export default RemovedBanner;
