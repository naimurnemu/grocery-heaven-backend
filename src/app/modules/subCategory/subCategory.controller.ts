import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SubCategoryService } from "./subCategory.service";

const createSubCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const category = req.body;
        
        const result = await SubCategoryService.postSubCategory(category);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'SubCategory created successfully',
            data: result
        })
    }
);

const getAllSubCategories: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SubCategoryService.getAllSubCategory();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'SubCategory retrieved successfully',
            data: result
        })
    }
)
export const SubCategoryController = {
    createSubCategory,
    getAllSubCategories
}