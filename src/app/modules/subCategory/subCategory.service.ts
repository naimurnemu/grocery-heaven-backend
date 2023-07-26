
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

const getAllSubCategory = async (): Promise<ISubCategory[]> =>{
    const allCategory = await SubCategory.find({}).populate('category')

    return allCategory;
}
export const SubCategoryService = {
    postSubCategory,
    // updateCategoryByID,
    getAllSubCategory
}

