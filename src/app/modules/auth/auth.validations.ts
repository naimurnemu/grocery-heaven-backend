import { z } from "zod";
import { gender, role } from "./auth.constant";

const createUserZodSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required'
        }).email(),
        phoneNumber: z.string({
            required_error: 'Phone number is required',
        }),
        password: z.string({
            required_error: 'Password is required'
        }),
        role: z.enum(role as [string, ...string[]], {
            required_error: 'Role is required',
        }),
        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }),
            lastName: z.string({
                required_error: 'Last name is required',
            }),
        }),
        gender: z.enum([...gender] as [string, ...string[]], {
            required_error: 'Gender is required',
        }),
        address: z.string({
            required_error: 'Address is required',
        }),
        age: z.number({
            required_error: 'Age is required',
        }).optional()
    })
})

export const UserValidation = {
    createUserZodSchema,
}