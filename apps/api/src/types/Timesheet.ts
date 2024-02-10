// export type User = {
//     id: string;
//     username: string;
//     hash: string;
//     salt: string;
//     admin: boolean;
// }

import { z } from "zod";

export const timesheetSchema = z.object({
    createdOn: z.string().datetime().min(1),
    in: z.string().datetime().min(1),
    out: z.string().datetime().min(1),
    id: z.string().min(1),
    userId: z.string().min(1),
    location: z.string().min(1),
    typeOfWork: z.string().optional(),
    notes:  z.string().optional(),
});

export type Timesheet = z.infer<typeof timesheetSchema>;
