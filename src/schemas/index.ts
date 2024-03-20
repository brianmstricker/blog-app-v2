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
  .max(20, "Username must be at most 20 characters long")
  .regex(
   /^[a-zA-Z0-9_]+$/,
   "Username must only contain alphanumeric characters and underscores"
  ),
 handle: z
  .string()
  .min(1, "Handle must be at least 1 characters long")
  .max(20, "Handle must be at most 20 characters long")
  .regex(
   /^[^<>[\]{}\\|`~]+$/,
   "Handle must not contain certain special characters"
  ),
});

export const UsernameHandleSchema = z.object({
 username: z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long")
  .regex(
   /^[a-zA-Z0-9_]+$/,
   "Username must only contain alphanumeric characters and underscores"
  ),
 handle: z
  .string()
  .min(1, "Handle must be at least 1 characters long")
  .max(20, "Handle must be at most 20 characters long")
  .regex(
   /^[^<>[\]{}\\|`~]+$/,
   "Handle must not contain certain special characters"
  ),
});

export const TweetSchema = z.object({
 text: z.union([
  z
   .string()
   .min(1, "Tweet must be at least 1 characters long")
   .max(300, "Tweet must be at most 300 characters long"),
  z.undefined(),
 ]),
 media: z.union([z.string().url(), z.undefined()]),
 reply: z.boolean().optional(),
 replyToId: z.string().optional(),
});

export const UserSectionSchema = z.object({
 handle: z
  .string()
  .min(1, "Handle must be at least 1 characters long")
  .max(20, "Handle must be at most 20 characters long")
  .regex(
   /^[^<>[\]{}\\|`~]+$/,
   "Handle must not contain certain special characters"
  ),
 bio: z.string().max(160, "Bio must be at most 160 characters long").optional(),
 location: z
  .string()
  .max(40, "Location must be at most 40 characters long")
  .optional(),
 website: z.string().url().optional(),
 banner: z.string().url().optional(),
 image: z.string().url().optional(),
});
