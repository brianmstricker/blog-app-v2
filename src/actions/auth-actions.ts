"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { LoginSchema, RegisterSchema, UsernameHandleSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth, signIn, signOut } from "@/auth";
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
 try {
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
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const logoutAction = async () => {
 try {
  await signOut();
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};

export const updateUsernameHandleAction = async (
 values: z.infer<typeof UsernameHandleSchema>
) => {
 const validatedFields = UsernameHandleSchema.safeParse(values);
 if (!validatedFields.success) return { error: "Invalid fields" };
 const { username, handle } = validatedFields.data;
 try {
  const userInfo = await auth();
  const user = userInfo?.user;
  if (!userInfo || !user) return { error: "Not logged in" };
  const id = userInfo.user?.id;
  const existingUsername = await db.user.findFirst({
   where: { username },
  });
  if (existingUsername) return { error: "Username already exists" };
  await db.user.update({
   where: { id },
   data: { username, handle },
  });
  return { success: true };
 } catch (error: any) {
  return { error: error?.message || "Something went wrong" };
 }
};
