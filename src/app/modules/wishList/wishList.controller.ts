import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { WishListService } from "./wishList.service";
import ApiError from "../../../errors/ApiError";
import { AuthUser } from "../../interfaces/common";

const getWishListByUserId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as AuthUser;
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, '')
        }
        const result = await WishListService.getWishListByUserId(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Wish List items retrieved successfully',
            data: result
        })
    }
)

const addWishListItem: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const user = req.user as AuthUser;
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User is not Authorised')
        }
        const result = await WishListService.addWishListItem(payload, user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'WishList item added successfully',
            data: result
        })
    }
)

const deleteWishListItem: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await WishListService.deleteWishListItem(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'WishList item removed successfully',
            data: result
        })
    }
)


export const WishListController = {
    getWishListByUserId,
    addWishListItem,
    deleteWishListItem
}