
import httpStatus from "http-status";
import moment from "moment";
import ApiError from "../../../errors/ApiError";
import { AuthUser } from "../../interfaces/common";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const postAProduct = async (product: IProduct, user: AuthUser | undefined): Promise<IProduct> => {
    // const { name } = product
    if (user?.role !== 'admin') {
        throw new ApiError(httpStatus.CONFLICT, 'Unauthorized User!')
    }
    const newProduct = new Product({ ...product, addedBy: user?.userId });
    await newProduct.save();

    const responseData: IProduct = {
        ...newProduct.toJSON()
    };

    return responseData;
}

const updateProductByID = async (product: IProduct, params: string): Promise<IProduct> => {
    const { productName, description, price, brand , discount, category} = product;
    const id = params
    await Product.updateOne({ _id: id }, { $set: { productName: productName, description: description, price: price, brand: brand , discount: discount, category: category} });

    const responseData: IProduct = {
        ...product
    };

    return responseData;
}
const getAllProducts = async (): Promise<IProduct[]> => {
    const allProducts = await Product.find({}).populate('subcategory', 'category name shortDesc -_id');

    return allProducts;
}

const getProductByCategory = async (categoryID: string): Promise<IProduct[]> => {
    const products = await Product.find({
        status: "active",
        category: { $all: [categoryID] },
    }).populate('subcategory', 'category name shortDesc -_id');

    return products

};

const getHotProduct = async (): Promise<IProduct[]> => {
   
    const hotproduct = await Product.find({
        status: "active",
        createdAt: {
            $gte: moment().subtract(6, 'days').format()
            // $lt: new Date(2012, 7, 15)
        },
        discount: {
            $gte: 5
        }
    }).populate('subcategory', 'category name shortDesc -_id');

    return hotproduct
}
const getRelatedProduct = async (categoryID: string, pid: string): Promise<IProduct[]> => {
   
    const hotproduct = await Product.find({
        status: "active",
        category: { $all: [categoryID] },
        _id: { $ne: pid }
    }).populate('subcategory', 'category name shortDesc -_id');

    return hotproduct
}
export const ProductService = {
    postAProduct,
    getAllProducts,
    getProductByCategory,
    updateProductByID,
    getHotProduct,
    getRelatedProduct
}

