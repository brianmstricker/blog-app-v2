import RightSearch from "./RightSearch";
import WhatsHappening from "./WhatsHappening";
import WhoToFollow from "./WhoToFollow";
import CheckoutGithub from "./CheckoutGithub";
import RightFooter from "./RightFooter";
import NewToChirp from "./NewToChirp";
import YouMightLike from "./YouMightLike";

const RightMenu = () => {
 return (
  <aside className="pl-4 flex flex-col gap-4 sticky top-0">
   {/* show these if user */}
   {/* <RightSearch /> */}
   {/* <CheckoutGithub /> */}
   {/* <WhatsHappening /> */}
   {/* <WhoToFollow /> */}
   <NewToChirp />
   <YouMightLike />
   <RightFooter />
  </aside>
 );
};
export default RightMenu;
