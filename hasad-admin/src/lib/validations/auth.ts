import { z } from "zod"

export const SignUpSchema = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  email: z.string().email(),
  phone: z.string().regex(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/),
  password: z.string().min(8).max(255),
  profile_picture: z.instanceof(FileList).optional(),
})

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
})