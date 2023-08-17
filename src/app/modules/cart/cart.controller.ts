import { RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CartService } from "./cart.service";
import { AuthenticatedRequest } from "../../interfaces/common";
import ApiError from "../../../errors/ApiError";

const getCartItemsByUserId: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user;
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, '')
        }
        const result = await CartService.getCartItemsByUserId(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cart items retrieved successfully',
            data: result
        })
    }
)

const addCartItem: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
        const payload = req.body;
        const user = req.user;
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User is not Authorised')
        }
        const result = await CartService.addCartItem(payload, user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cart item added successfully',
            data: result
        })
    }
)

const deleteCartItem: RequestHandler = catchAsync(
    async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.params;
        const result = await CartService.deleteCartItem(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cart item removed successfully',
            data: result
        })
    }
)


export const CartController = {
    getCartItemsByUserId,
    addCartItem,
    deleteCartItem
}