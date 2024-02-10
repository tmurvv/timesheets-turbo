// export type User = {
//     id: string;
//     username: string;
//     hash: string;
//     salt: string;
//     admin: boolean;
// }

import { z } from "zod";

export const User = z.object({
  createdOn: z.string().datetime().min(1),
  email: z.string().email().optional(),
  first: z.string().min(1),
  id: z.string().min(1),
  last: z.string().min(1),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain a number" }),

  preferredContact: z.enum(["email", "phone"]),
  phone: z.string().optional(),
  role: z.enum(["user", "admin"]).default("user"),
  salt: z.string(),
  username: z.string().optional(),
});

// User.parse({ username: "Ludwig" });

// extract the inferred type
// export type User = z.infer<typeof User>;
// { username: string }
