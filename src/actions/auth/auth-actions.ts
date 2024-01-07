"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";

export const loginAction = async (values: any) => {
 console.log(values);
 const allUsers = await db.user.findMany();
 console.log(allUsers);
 return { success: true };
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
