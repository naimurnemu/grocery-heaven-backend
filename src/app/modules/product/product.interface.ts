import mongoose, { Model } from "mongoose";


export type IProduct = {
    productName: string;
    brand: string;
    productCode: string;
    productPicture: [{ type: string }];
    description: string;
    weight: string;
    price: number;
    countInStock: number;
    discount?: 0;
    manufacturingDate: Date;
    type: string;
    expiredDate: Date;
    status: string;
    productPlan: string;
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }];
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    };
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
    };
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser'
    }
}

export type ProductModel = Model<IProduct, Record<string, unknown>>;