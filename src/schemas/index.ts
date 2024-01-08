import * as z from "zod";

export const LoginSchema = z.object({
 email: z.string().email(),
 password: z.string(),
});

export const RegisterSchema = z.object({
 name: z.string(),
 username: z.string(),
 email: z.string().email(),
 password: z.string(),
});

export const UsernameHandleSchema = z.object({
 username: z.string().max(30),
 handle: z.string().max(30),
});
