import { z } from "zod";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createUpdateUserSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, "Name is required")
    .max(256, "Maxlength should be 256"),
  email: z.string().email(),
  phone: z.string().regex(phoneRegExp, "Phone number is not valid"),
  hobbies: z.string().min(1, "Hobbies should not be empty"),
});

export type createUpdateUserInput = z.TypeOf<typeof createUpdateUserSchema>;
