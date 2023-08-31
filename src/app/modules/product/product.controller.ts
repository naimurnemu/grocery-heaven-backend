import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthenticatedRequest } from "../../interfaces/common";
import { ProductService } from "./product.service";

const postAProduct: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
        const product = req.body;
        const user = req.user;
        // console.log(req.user)
        const result = await ProductService.postAProduct(product, user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product added successfully',
            data: result
        })
    }
);

const updateASingleProduct: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const product = req.body;
        const id = req.params.id;
        // console.log(req.user)
        const result = await ProductService.updateProductByID(product, id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product updated successfully',
            data: result
        })
    }
)
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

const getProductsByCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await ProductService.getProductByCategory(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'all product loaded',
            data: result
        })
    }
);
const getHotProducts: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        
        console.log("bismillah")
        const result = await ProductService.getHotProduct();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'all hot product',
            data: result
        })
    }
);
export const ProductController = {
    postAProduct,
    getAllProducts,
    getProductsByCategory,
    updateASingleProduct,
    getHotProducts
}