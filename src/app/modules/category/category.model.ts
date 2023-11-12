import mongoose, { Schema, model } from "mongoose";
import { CategoryModel, ICategory } from "./category.interface";


const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true
        },
        shortDesc: {
            type: String,
            required: true
        },
        subcategory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subcategory",
                required: false
            }
        ],
    },
    
);

export const Category = model<ICategory, CategoryModel>('Category', categorySchema);

