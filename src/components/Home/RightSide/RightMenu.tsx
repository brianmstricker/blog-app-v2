import RightSearch from "./RightSearch";
import WhatsHappening from "./WhatsHappening";
import WhoToFollow from "./WhoToFollow";
import CheckoutGithub from "./CheckoutGithub";
import RightFooter from "./RightFooter";

const RightMenu = () => {
 return (
  <aside className="pl-4 flex flex-col gap-4 sticky top-0">
   <RightSearch />
   <CheckoutGithub />
   <WhatsHappening />
   <WhoToFollow />
   <RightFooter />
  </aside>
 );
};
export default RightMenu;
