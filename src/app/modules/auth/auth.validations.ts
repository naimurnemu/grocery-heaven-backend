import { z } from "zod";
import { gender } from "./auth.constant";

const createUserZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required'
        }).email(),
        password: z.string({
            required_error: 'Password is required'
        }),
        phoneNumber: z.string({
            required_error: 'Phone number is required',
        }).optional(),
        // role: z.enum(role as [string, ...string[]], {
        //     required_error: 'Role is required',
        // }),
        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }),
            lastName: z.string({
                required_error: 'Last name is required',
            }),
        }).optional(),
        gender: z.enum([...gender] as [string, ...string[]]).optional(),
        address: z.string().optional(),
        age: z.number().optional()
    })
})

export const UserValidation = {
    createUserZodSchema,
}