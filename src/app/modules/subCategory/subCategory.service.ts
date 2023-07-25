
import { Category } from "../category/category.model";
import { ISubCategory } from "./subCategory.interface";
import { SubCategory } from "./subCategory.model";


const postSubCategory = async (subCategory: ISubCategory): Promise<ISubCategory> => {
   
    
    const newCategory = new SubCategory({ ...subCategory });
    
    const subCategoryID = await newCategory.save();
    
    await Category.updateOne({_id: subCategory.category}, {$push: { subcategory: subCategoryID._id}})
    const responseData: ISubCategory = {
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
//     const allCategory = await Category.find({})

//     return allCategory;
// }
export const SubCategoryService = {
    postSubCategory,
    // updateCategoryByID,
    // getAllCategory
}

