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
export type IProductBrand = {
    brand: string
}
export type IProductsFilters = {
    searchTerm?: string;
    productName?: string;
    brand?: string;
    productCode?: string;
    type?: string;
    description?: string;
    category?: string;
    price?: string;
    review?: string;
    subcategory?: string;
  };
  
export type ProductModel = Model<IProduct, Record<string, unknown>>;