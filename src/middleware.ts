import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
 console.log(req.nextUrl.pathname);
 const isLoggedIn = !!req.auth;
 console.log("isLoggedIn", isLoggedIn);
});

export const config = {
 matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
