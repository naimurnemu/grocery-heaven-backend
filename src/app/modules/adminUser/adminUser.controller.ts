import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { AdminUserService } from "./adminUser.service";

const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.body;

        const result = await AdminUserService.createUser(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully',
            data: result
        })
    }
);

export const AdminUserController = {
    createUser
}
