import mongoose, { Model } from "mongoose";


export type IProduct = {
    title: string;
    brand: string;
    images: [{
        url: string
    }];
    description: string;
    weight: string;
    price: number;
    quantity: number;
    discount?: 'active' | 'notAvailable' | 'notInStock' | 'closed';
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
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser'
    }
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;