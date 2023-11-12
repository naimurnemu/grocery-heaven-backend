import mongoose, { Model } from "mongoose";


export type ICategory = {
    name: string;
    shortDesc: string,
    subcategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory"
        }
    ],
}

export type ICategoryID = {
    id: string
}
export type CategoryModel = Model<ICategory, Record<string, unknown>>;