import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const postCategory = async (category: ICategory): Promise<ICategory> => {
    const { name } = category
    const isCategoryExist = await Category.findOne({ name })

    if (isCategoryExist) {
        throw new ApiError(httpStatus.CONFLICT, 'Category already exists!')
    }
    const newCategory = new Category({ ...category });
    
    await newCategory.save();

    const responseData: ICategory = {
        ...newCategory.toJSON()
    };

    return responseData;
}

const updateCategoryByID = async(category: ICategory, params: string): Promise<ICategory> => {
    const {name, shortDesc}= category;
    const id= params
    await Category.updateOne({_id: id},{ $set: { name: name, shortDesc: shortDesc } });

    const responseData: ICategory = {
        ...category
    };

    return responseData;
}
const getAllCategory = async (): Promise<ICategory[]> =>{
    const allCategory = await Category.find({}).populate('subcategory', 'category name shortDesc -_id');

    return allCategory;
}
const deleteCategoryById = async(id: string): Promise<string> => {
    const deleteCategory = await Category.deleteOne({ _id: id });
    // console.log(deleteCategory)
    if(deleteCategory.acknowledged === true) return "deleted"
    else return "try again later"
}
const getSubCategoryByCategory = async (id: string): Promise<ICategory[]> => {
    const allCategory = await Category.find({_id: id}).populate('subcategory', '_id name shortDesc').select('subCategory')

    return allCategory;
}
export const CategoryService = {
    postCategory,
    updateCategoryByID,
    getAllCategory,
    deleteCategoryById,
    getSubCategoryByCategory,
}

