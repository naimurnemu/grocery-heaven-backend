import mongoose, { Model } from "mongoose";


export type IProduct = {
    title: string;
    brand: string;
    images:[{
        url: string
    }];
    description: string;
    weight: string;
    price: number;
    quantity: number;
    discount?: string;
    production: Date;
    expired: Date;
    status: string;
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }];
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ];
    subcategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory"
        }
    ];
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;