
import { AuthUser } from "../../interfaces/common";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const postAProduct = async (product: IProduct, user: AuthUser | undefined): Promise<IProduct> => {
    // const { name } = product
    if (user?.role !== 'admin') {
        console.log("hello world")
    }
    const newProduct = new Product({ ...product, addedBy: user?.userId });

    await newProduct.save();

    const responseData: IProduct = {
        ...newProduct.toJSON()
    };

    return responseData;
}

// const updateProductByID = async(product: IProduct, params: string): Promise<IProduct> => {
//     const {title, description}= product;
//     const id= params
//     await Product.updateOne({_id: id},{ $set: { title: title, description: description } });

//     const responseData: IProduct = {
//         ...product
//     };

//     return responseData;
// }
const getAllProducts = async (): Promise<IProduct[]> => {
    const allCategory = await Product.find({}).populate('subcategory', 'category name shortDesc -_id');

    return allCategory;
}

export const ProductService = {
    postAProduct,
    getAllProducts
}

