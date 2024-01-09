"use client";
import { User } from "next-auth";
import UsernameHandleWrapperModal from "./UsernameHandleWrapperModal";

const UsernameHandleWrapper = ({ user }: { user: User | null | undefined }) => {
 if (!user) return null;
 if ((user && !user.username) || (user && !user.handle))
  return <UsernameHandleWrapperModal userImage={user.image} />;
};
export default UsernameHandleWrapper;
