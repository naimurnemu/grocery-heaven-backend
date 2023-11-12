import { Model, Types } from "mongoose";
import { IProduct } from "../product/product.interface";

export type IReview = {
    userId: Types.ObjectId;
    productId: Types.ObjectId | IProduct;
    rating: number;
    description: string;
}


export type ReviewModel = Model<IReview, Record<string, unknown>>;