import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const createCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const category = req.body;
        
        const result = await CategoryService.postCategory(category);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category created successfully',
            data: result
        })
    }
);
const updateCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const category = req.body;
        const id = req.params.id;

        const result = await CategoryService.updateCategoryByID(category, id)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category updated successfully',
            data: result
        })
    }

)
const getSubCategoryByCategory: RequestHandler = catchAsync(
    async(req: Request, res: Response) => {
        const id = req.params.id
        const result = await CategoryService.getSubCategoryByCategory(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'SubCategory based on Category',
            data: result
        })
    }
)
const getAllCategories: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const result = await CategoryService.getAllCategory();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category retrieved successfully',
            data: result
        })
    }
)
const deleteCategoryById: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await CategoryService.deleteCategoryById(id)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category deleted successfully',
            data: result
        })
    }

)
export const CategoryController = {
    createCategory,
    updateCategory,
    getAllCategories,
    deleteCategoryById,
    getSubCategoryByCategory
}