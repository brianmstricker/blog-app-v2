import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "./auth.config";
import { dbConnect } from "@/db/dbConnect";

export const { handlers, auth } = NextAuth({
 adapter: DrizzleAdapter(dbConnect),
 session: { strategy: "jwt" },
 pages: {},
 ...authConfig,
});
