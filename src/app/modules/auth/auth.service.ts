import { IUser } from "./auth.interface"
import { User } from "./auth.model"

const createUser = async (user: IUser): Promise<IUser> => {
    const newUser = new User(user);
    await newUser.save();

    return newUser;
}


export const AuthService = {
    createUser,
}