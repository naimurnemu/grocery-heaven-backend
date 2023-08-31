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
const getCategoryBySubCategory = async (id: string): Promise<ISubCategory[]> => {
    const allCategory = await SubCategory.find({category: {$all: [id]}}).populate('category', '_id name shortDesc').select('category')

    return allCategory;
}
const updateSubCategoryByID = async(category: ISubCategory, params: string): Promise<ISubCategory> => {
    const {name, shortDesc}= category;
    const id= params
    await SubCategory.updateOne({_id: id},{ $set: { name: name, shortDesc: shortDesc } });

    const responseData: ISubCategory = {
        ...category
    };
    return responseData;
}
const deleteSubCategoryById = async(id: string): Promise<string> => {
    const deleteCategory = await SubCategory.deleteOne({ _id: id });
    // console.log(deleteCategory)
    if(deleteCategory.acknowledged === true) return "deleted"
    else return "try again later"
}
export const SubCategoryService = {
    postSubCategory,
    // updateCategoryByID,
    getAllSubCategory,
    getCategoryBySubCategory,
    deleteSubCategoryById,
    updateSubCategoryByID
}

