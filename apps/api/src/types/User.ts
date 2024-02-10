// export type User = {
//     id: string;
//     username: string;
//     hash: string;
//     salt: string;
//     admin: boolean;
// }

import { z } from "zod";

const User = z.object({
  createdOn: z.string().datetime().min(1),
  email: z.string().email(),
  first: z.string(),
  id: z.string().min(1),
  last: z.string().min(1),
  password: z.string().min(1),
  preferredContact: z.enum(["email", "phone"]),
  phone: z.string(),
  role: z.enum(["user", "admin"]).default("user"),
  salt: z.string(),
  username: z.string(),
});

// User.parse({ username: "Ludwig" });

// extract the inferred type
export type User = z.infer<typeof User>;
// { username: string }
