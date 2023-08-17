import { Schema, model } from "mongoose";
import { CartModel, ICart } from "./cart.interface";


const cartSchema = new Schema<ICart>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    },

);

export const Cart = model<ICart, CartModel>('Cart', cartSchema);

