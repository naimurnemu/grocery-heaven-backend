import { NextFunction, Request, Response } from "express";
import config from "../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";

const auth = (...roles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authorized')
            }

            let verifiedUser = null;
            verifiedUser = jwtHelpers.verifyToken(token, config.jwt.access_secret as Secret);
            const { _id: userId, ...otherData } = verifiedUser;

            req.user = { userId, ...otherData };

            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
            };
            next();
        } catch (error) {
            next(error);
        }
    }

export default auth;