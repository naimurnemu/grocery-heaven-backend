import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ReviewService } from "./review.service";
import { AuthUser } from "../../interfaces/common";

const getReviewByUserId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as AuthUser;
        const result = await ReviewService.getReviewByUserId(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Review retrieved successfully',
            data: result
        })
    }
)

const getReviewsByProductId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const productId = req.params.productId;
        const result = await ReviewService.getReviewsByProductId(productId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Review retrieved successfully',
            data: result
        })
    }
)

const addReview: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const user = req.user as AuthUser;

        const result = await ReviewService.addReview(payload, user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Review added successfully',
            data: result
        })
    }
)

const deleteReview: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await ReviewService.deleteReview(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Review removed successfully',
            data: result
        })
    }
)


export const ReviewController = {
    getReviewByUserId,
    getReviewsByProductId,
    addReview,
    deleteReview
}