"use server";

import { users } from "@/db/schema/auth-schema";
import { dbConnect } from "../../db/dbConnect";

export const loginAction = async (values: any) => {
 console.log(values);
 const allUsers = await dbConnect.select().from(users);
 console.log(allUsers);
 return { success: true };
};
