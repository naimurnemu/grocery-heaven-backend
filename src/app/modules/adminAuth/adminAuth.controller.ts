import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminAuthService } from "./adminAuth.service";

const signIn: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await AdminAuthService.signIn(payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'admin signed in  successfully',
            data: result
        })
    }
);

export const AdminAuthController = {
    signIn
}
