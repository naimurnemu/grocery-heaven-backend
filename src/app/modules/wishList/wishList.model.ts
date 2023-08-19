import { Schema, model } from "mongoose";
import { CartModel, IWishList } from "./wishList.interface";


const wishListSchema = new Schema<IWishList>(
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
        }
    },

);

export const WishList = model<IWishList, CartModel>('WishList', wishListSchema);

