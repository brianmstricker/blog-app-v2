import * as z from "zod";

export const LoginSchema = z.object({
 email: z.string().email(),
 password: z.string(),
});

export const RegisterSchema = z.object({
 name: z
  .string()
  .min(1, "Name must be at least 1 characters long")
  .max(50, "Name must be at most 50 characters long"),
 email: z
  .string()
  .email()
  .min(1, "Email is required")
  .max(100, "Email is too long"),
 password: z
  .string()
  .min(6, "Password must be at least 8 characters long")
  .max(50, "Password must be at most 50 characters long"),
 confirmPassword: z
  .string()
  .min(6, "Password must be at least 8 characters long")
  .max(50, "Password must be at most 50 characters long"),
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
  .min(1, "Handle must be at least 1 characters long")
  .max(30, "Handle must be at most 30 characters long")
  .regex(
   /^[^<>[\]{}\\|`~]+$/,
   "Handle must not contain certain special characters"
  ),
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
  .min(1, "Handle must be at least 1 characters long")
  .max(30, "Handle must be at most 30 characters long")
  .regex(
   /^[^<>[\]{}\\|`~]+$/,
   "Handle must not contain certain special characters"
  ),
});
