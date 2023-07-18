import { IUser } from "../auth/auth.interface";
import { User } from "../auth/auth.model";

const getAllUsers = async (): Promise<IUser[]> => {
    const allUsers = await User.find({});

    return allUsers;
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id);

    return user;
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