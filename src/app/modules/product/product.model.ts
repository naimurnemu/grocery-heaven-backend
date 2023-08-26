import mongoose, { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";


const productSchema = new Schema<IProduct>(
    {
        productName: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        productPicture: [
            {
                type: String,
                required: true
            }
        ],
        description: {
            type: String,
            required: [true, 'Please provide description'],
            minlength: 15,
            trim: true,
            lowercase: true,
        },
        weight: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            required: true
        },
        productCode: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: false
        },
        manufacturingDate: {
            type: Date,
            required: false
        },
        expiredDate: {
            type: Date,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        productPlan: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        review: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: true
        }],
        subcategory: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subcategory",
                required: false
        },
        category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AdminUser',
            required: true
        }
    },

);

export const Product = model<IProduct, ProductModel>('Product', productSchema);

