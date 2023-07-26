import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from "../../../config";
import { AdminUser } from "../adminUser/adminUser.model";
import { IAdminAuth } from "./adminAuth.interface";

const signIn = async (payload: Partial<IAdminAuth>): Promise<IAdminAuth> => {
    const { email, password } = payload;

    if (!(email && password)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    }

    const user = await AdminUser.findOne({ email });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
    }

    if (!config.token_key) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'token key does not exists!');
    }

    const responseData: IAdminAuth = {
        ...user.toJSON(),
        // token: token,
    };

    let token: string;

    // const key = ;
    if (user && (await bcrypt.compare(password, user.password))) {
        token = jwt.sign(
            { userId: user._id, email },
            config.token_key,
            {
                expiresIn: "2h",
            }
        )

        responseData.token = token;
    } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password!');
    }

    return responseData;
}

export const AdminAuthService = {
    signIn
}