import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ContactUsService } from "./contactUs.service";

const sendContactInformation: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await ContactUsService.sendContactInformation(payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Contact information received successfully',
            data: result
        })
    }
)
export const ContactUsController = {
    sendContactInformation
}