import mongoose, { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";


const productSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        images: [
            {
                url: {
                    type: String,
                    required: true
                }
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
        quantity: {
            type: Number,
            required: true
        },
        discount: {
            type: String,
            required: false
        },
        production: {
            type: Date,
            required: false
        },
        expired: {
            type: Date,
            required: false
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
        subcategory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subcategory",
                required: false
            }
        ],
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true
            }
        ],
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },

);

export const Product = model<IProduct, ProductModel>('Product', productSchema);

