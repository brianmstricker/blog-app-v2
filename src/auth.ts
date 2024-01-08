import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "./auth.config";

export const {
 handlers: { GET, POST },
 auth,
 signIn,
 signOut,
} = NextAuth({
 callbacks: {
  async session({ session, token }) {
   if (token.sub && session.user) session.user.id = token.sub;
   if (session.user && token) session.user.username = token.username;
   if (session.user && token) session.user.handle = token.handle;
   return session;
  },
  async jwt({ token }) {
   if (!token?.sub) return token;
   const user = await db.user.findUnique({ where: { id: token.sub } });
   if (!user) return token;
   token.username = user.username;
   token.handle = user.handle;
   return token;
  },
 },
 adapter: PrismaAdapter(db),
 session: { strategy: "jwt" },
 ...authConfig,
});
