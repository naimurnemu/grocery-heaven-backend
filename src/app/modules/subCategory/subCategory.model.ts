import mongoose, { Schema, model } from "mongoose";
import { ISubCategory, SubCategoryModel } from "./subCategory.interface";


const subCategorySchema = new Schema<ISubCategory>(
    {
        name: {
            type: String,
            required: true
        },
        shortDesc: {
            type: String,
            required: true
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: false
        }],
    },
    
);

export const SubCategory = model<ISubCategory, SubCategoryModel>('Subcategory', subCategorySchema);

