import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { AuthUser } from "../../interfaces/common";
import { IUser } from "../auth/auth.interface";
import { User } from "../auth/auth.model";

const getAllUsers = async (): Promise<IUser[]> => {
    const allUsers = await User.find({});

    return allUsers;
}

type IUserWithoutPassword = Omit<IUser, 'password'>;

const getSingleUser = async (user: AuthUser): Promise<IUserWithoutPassword | null> => {
    const userDetails = await User.findById(user.userId);
    if (!userDetails) {
        throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exists")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userDetailsWithoutPassword } = userDetails.toObject();

    return userDetailsWithoutPassword;
}

const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
    const user = await User.findOneAndUpdate({ _id: id }, payload, { new: true });
    return user;
}


export const UserService = {
    getAllUsers,
    getSingleUser,
    updateUser
}