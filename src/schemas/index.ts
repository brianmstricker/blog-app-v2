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
 username: z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 30 characters long")
  .regex(
   /^[a-zA-Z0-9_]+$/,
   "Username must only contain alphanumeric characters and underscores"
  ),
 handle: z
  .string()
  .min(3, "Handle must be at least 3 characters long")
  .max(30, "Handle must be at most 30 characters long")
  .regex(
   /^[^<>[\]{}\\|`~]+$/,
   "Handle must not contain certain special characters"
  ),
});
