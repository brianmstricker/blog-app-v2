import { fetchUserAction } from "@/actions/user-actions";
import { Metadata } from "next";

export async function generateMetadata({
 params,
}: {
 params: { username: string };
}): Promise<Metadata> {
 const { username } = params;
 const fetchUser = await fetchUserAction(username);
 if (!fetchUser) return { title: "User not found" };
 if ("error" in fetchUser) return { title: "Something went wrong" };
 return {
  title: `${fetchUser.handle} (@${fetchUser.username}) / Chirp`,
  description: fetchUser.username,
 };
}

const page = async ({}: {}) => {
 return <div></div>;
};
export default page;
