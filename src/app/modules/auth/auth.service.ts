import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./auth.interface"
import { User } from "./auth.model"
import bcrypt from 'bcryptjs'
import { Secret } from 'jsonwebtoken'
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const createUser = async (user: IUser): Promise<IUser> => {
    const { email, password, ...userData } = user;
    const oldUser = await User.findOne({ email })

    if (oldUser) {
        throw new ApiError(httpStatus.CONFLICT, 'User already exists!')
    }

    const encryptedPassword: string = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: encryptedPassword,
        ...userData
    });
    await newUser.save();

    const token = jwtHelpers.createToken(
        { userId: newUser._id, email, role: user.role },
        config.jwt.access_secret as Secret,
        config.jwt.access_expires_in as string
    )
    //save user token

    // newUser.token = token;
    // console.log(newUser);

    const responseData: IUser = {
        ...newUser.toJSON(),
        token: token,
    };

    return responseData;
}

const signIn = async (payload: Partial<IUser>): Promise<IUser> => {
    const { email, password } = payload;

    if (!(email && password)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'All input is required');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists!');
    }

    // if (!config.token_key) {
    //     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'token key does not exists!');
    // }

    const responseData: IUser = {
        ...user.toJSON(),
        // token: token,
    };

    let token: string;

    // const key = ;
    if (user && (await bcrypt.compare(password, user.password))) {
        token = jwtHelpers.createToken(
            { userId: user._id, email, role: 'user' },
            config.jwt.access_secret as Secret,
            config.jwt.access_expires_in as string
        )

        responseData.token = token;
    } else {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password!');
    }

    return responseData;
}

export const AuthService = {
    createUser,
    signIn
}