import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from "./product.service";

const postAProduct: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const category = req.body;
        
        const result = await ProductService.postAProduct(category);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product added successfully',
            data: result
        })
    }
);

export const CategoryController = {
    postAProduct
}