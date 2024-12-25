import { z } from 'zod'
import { USER_ROLE } from '../user/user.constants';


const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email must be provided and must be a string",
  }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
}
export type TUserRole = keyof typeof USER_ROLE;