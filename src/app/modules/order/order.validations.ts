import { z } from "zod";
import { paymentMethod } from "./order.constant";

const addOrderSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z.string({
                required_error: 'First name is required',
            }),
            lastName: z.string({
                required_error: 'Last name is required',
            }),
        }),
        companyName: z.string().optional(),
        country: z.string({
            required_error: "Country is required",
        }),
        streetAddress: z.string({
            required_error: "Street Address is required",
        }),
        city: z.string({
            required_error: "City is required"
        }),
        state: z.string({
            required_error: 'State is required'
        }),
        zipCode: z.string({
            required_error: 'Zip code is required'
        }),
        phone: z.string({
            required_error: 'Phone number is required',
        }),
        email: z.string({
            required_error: 'Email is required'
        }).email(),
        orderNotes: z.string().optional(),
        paymentMethod: z.enum(paymentMethod as [string, ...string[]], {
            required_error: 'Payment method is required',
        }),
    })
})

export const OrderValidation = {
    addOrderSchema
}
