import { Model, Types } from "mongoose";
import { IProduct } from "../product/product.interface";

export type ICart = {
    userId: Types.ObjectId;
    productId: Types.ObjectId | IProduct;
    quantity: number;
    status: string;
}


export type CartModel = Model<ICart, Record<string, unknown>>;