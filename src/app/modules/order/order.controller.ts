import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";
import { AuthUser } from "../../interfaces/common";

const getOrdersByUserId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as AuthUser;
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, '')
        }
        const result = await OrderService.getOrdersByUserId(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Orders retrieved successfully',
            data: result
        })
    }
)

const addOrder: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as AuthUser;
        // const payload = req.body;
        // payload.userId = user.userId;
        // const result = await OrderService.addOrder(user, payload);
        const result = await OrderService.addOrder(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order placed successfully',
            data: result
        })
    }
)

const deleteOrder: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await OrderService.deleteOrder(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order deleted successfully',
            data: result
        })
    }
)

export const OrderController = {
    getOrdersByUserId,
    addOrder,
    deleteOrder
}