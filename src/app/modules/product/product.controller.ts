import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { paginationFields } from "../../../shared/paginations";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AuthUser } from "../../interfaces/common";
import { productFilterableFields } from "./product.constant";
import { IProduct } from "./product.interface";
import { ProductService } from "./product.service";

const postAProduct: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const product = req.body;
        const user = req.user;
        // console.log(req.user)
        const result = await ProductService.postAProduct(product, user as AuthUser);

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
        const { searchQuery } = req.query;
        const result = await ProductService.getAllProducts(searchQuery as string);

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
        const result = await ProductService.getHotProduct();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'all hot product',
            data: result
        })
    }
);
const getRelatedProduct: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { categoryId, pid } = req.body;
        const result = await ProductService.getRelatedProduct(categoryId, pid);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'all related product',
            data: result
        })
    }
);
const deleteASingleProduct: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await ProductService.getProductsById(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product deleted successfully',
            data: result
        })
    }
);

const getProductsById: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await ProductService.getProductsById(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product retrieved successfully',
            data: result
        })
    }
);
const getSearchProducts = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, productFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await ProductService.getSearchProduct(
      filters,
      paginationOptions
    );
  
    sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties fetched successfully !',
      meta: result.meta,
      data: result.data,
    });
  });
export const ProductController = {
    postAProduct,
    getAllProducts,
    getProductsByCategory,
    updateASingleProduct,
    getHotProducts,
    getRelatedProduct,
    deleteASingleProduct,
    getProductsById,
    getSearchProducts
}