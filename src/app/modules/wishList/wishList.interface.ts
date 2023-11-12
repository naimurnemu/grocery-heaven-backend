import { Model, Types } from "mongoose";
import { IProduct } from "../product/product.interface";

export type IWishList = {
    userId: Types.ObjectId;
    productId: Types.ObjectId | IProduct;
}


export type CartModel = Model<IWishList, Record<string, unknown>>;