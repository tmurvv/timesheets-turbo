// export type User = {
//     id: string;
//     username: string;
//     hash: string;
//     salt: string;
//     admin: boolean;
// }

import { z } from "zod";

export const userSchema = z.object({
  createdOn: z.string().datetime().min(1),
  email: z.string().email().optional(),
  first: z.string().min(1),
  id: z.string().min(1),
  last: z.string().min(1),
  password: z.string(),
  preferredContact: z.enum(["email", "phone"]),
  phone: z.string().optional(),
  role: z.enum(["user", "admin"]).default("user"),
  salt: z.string(),
  username: z.string().optional(),
});

// User.parse({ username: "Ludwig" });

// extract the inferred type
export type User = z.infer<typeof userSchema>;
// { username: string }
