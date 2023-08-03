import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const postAProduct = async (product: IProduct): Promise<IProduct> => {
    // const { name } = product
    const isCategoryExist = await Product.findOne({ name })

    if (isCategoryExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Category already exists!')
    }
    const newCategory = new Product({ ...product });
    
    await newCategory.save();

    const responseData: IProduct = {
        ...newCategory.toJSON()
    };

    return responseData;
}

// const updateCategoryByID = async(category: ICategory, params: string): Promise<ICategory> => {
//     const {name, shortDesc}= category;
//     const id= params
//     await Category.updateOne({_id: id},{ $set: { name: name, shortDesc: shortDesc } });

//     const responseData: ICategory = {
//         ...category
//     };

//     return responseData;
// }
// const getAllCategory = async (): Promise<ICategory[]> =>{
//     const allCategory = await Category.find({}).populate('subcategory', 'category name shortDesc -_id');

//     return allCategory;
// }
export const CategoryService = {
    postAProduct
}

