import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

export default {
 providers: [
  GitHub,
  Google,
  Credentials({
   async authorize(credentials) {
    const validatedFields = LoginSchema.safeParse(credentials);
    if (validatedFields.success) {
     const { email, password } = validatedFields.data;
     const foundUser = await db.user.findFirst({ where: { email } });
     if (!foundUser || !foundUser.password) return null;
     const isCorrectPassword = await bcrypt.compare(
      password,
      foundUser.password
     );
     const { password: _, ...user } = foundUser;
     if (isCorrectPassword) return user;
    }
    return null;
   },
  }),
 ],
} satisfies NextAuthConfig;
