const RightFooter = () => {
 const categories = [
  { title: "Terms of Service" },
  { title: "Privacy Policy" },
  { title: "Cookie Policy" },
  { title: "Accessibility" },
  { title: "Ads info" },
  { title: "More..." },
  { title: "© 2024 Chirp, Inc." },
 ];
 return (
  <div className="text-xs px-4 text-gray-500/50 dark:text-white/50">
   <ul className="flex flex-wrap gap-2">
    {categories.map((c) => (
     <li key={c.title}>{c.title}</li>
    ))}
   </ul>
  </div>
 );
};
export default RightFooter;
