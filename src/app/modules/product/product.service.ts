
import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const postAProduct = async (product: IProduct): Promise<IProduct> => {
    // const { name } = product

    const newProduct = new Product({ ...product, seller: "dfalsdkfjasdl"});
       
    await newProduct.save();

    const responseData: IProduct = {
        ...newProduct.toJSON()
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

export const ProductService = {
    postAProduct
}

