import mongoose, { Model } from "mongoose";


export type ISubCategory = {
    name: string;
    shortDesc: string,
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ]
}

export type SubCategoryModel = Model<ISubCategory, Record<string, unknown>>;