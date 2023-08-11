import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthenticatedRequest } from "../../interfaces/common";
import { ProductService } from "./product.service";

const postAProduct: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
        const category = req.body;
        const user = req.user;
        // console.log(req.user)
        const result = await ProductService.postAProduct(category, user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product added successfully',
            data: result
        })
    }
);
const getAllProducts: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        // console.log(req.user)
        const result = await ProductService.getAllProducts();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'all product loaded',
            data: result
        })
    }
);
export const ProductController = {
    postAProduct,
    getAllProducts
}