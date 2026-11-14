import { z } from "zod"
import { SignInSchema, SignUpSchema } from "@/lib/validations/auth";
import { UserBase } from "./user";

export type SignUpInput = z.infer<typeof SignUpSchema>
export type SignInInput = z.infer<typeof SignInSchema>

export type SessionPayload = {
  id: number
  access_token: string
}

export type SignInResponse = {
  access_token: string
  message: string
  success: boolean
  user: UserBase
}