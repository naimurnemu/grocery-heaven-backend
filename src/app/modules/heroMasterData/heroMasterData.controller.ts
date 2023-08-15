import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { HeroMasterDataService } from "./heroMasterData.service";

const getHeroMasterData: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const result = await HeroMasterDataService.getHeroMasterData();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'HeroMasterData retrieved successfully',
            data: result
        })
    }
)
export const HeroMasterDataController = {
    getHeroMasterData
}