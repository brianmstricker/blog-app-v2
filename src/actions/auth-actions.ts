"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginAction = async (values: any) => {
 const validatedFields = LoginSchema.safeParse(values);
 if (!validatedFields.success) return { error: "Invalid fields" };
 const { email, password } = validatedFields.data;
 try {
  await signIn("credentials", {
   email,
   password,
   redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
  // throw error;
 }
};

export const registerAction = async (
 values: z.infer<typeof RegisterSchema>
) => {
 const validatedFields = RegisterSchema.safeParse(values);
 if (!validatedFields.success) return { error: "Invalid fields" };
 const { password, name, username, email } = validatedFields.data;
 const existingUser = await db.user.findFirst({
  where: { OR: [{ email }, { username }] },
 });
 if (existingUser) return { error: "Username or Email already exists" };
 const hashedPassword = await bcrypt.hash(password, 10);
 const newUser = {
  name,
  username,
  email,
  password: hashedPassword,
 };
 await db.user.create({ data: newUser });
 console.log(newUser);
 return { success: true };
};
