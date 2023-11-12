import httpStatus from "http-status";
import { IAdminUser } from "./adminUser.interface";
import { AdminUser } from "./adminUser.model";
import bcrypt from 'bcryptjs'
import ApiError from "../../../errors/ApiError";

const createUser = async (user: IAdminUser): Promise<IAdminUser> => {
    const { email, password,role, ...userData } = user;
    const oldUser = await AdminUser.findOne({ email });

    if (oldUser) {
        throw new ApiError(httpStatus.CONFLICT, 'User already exists!')
    }

    const super_admin = await AdminUser.findOne({ role: 'super_admin' });

    if(super_admin && role === 'super_admin'){
        throw new ApiError(httpStatus.CONFLICT, 'Super admin already exists!')
    }

    let tempPassword= password;
    if(!tempPassword){
        tempPassword='123';
    };


    const encryptedPassword: string = await bcrypt.hash(tempPassword, 10);

    const newUser = new AdminUser({
        email: email.toLocaleLowerCase(),
        password: encryptedPassword,
        role,
        ...userData
    });
    await newUser.save();

    // const token = jwt.sign(
    //     { userId: newUser._id, email },
    //     'hellotesttoken',
    //     {
    //         expiresIn: "2h",
    //     }
    // )
    //save user token

    // newUser.token = token;
    // console.log(newUser);

    const responseData: IAdminUser = {
        ...newUser.toJSON(),
        // token: token,
    };

    return responseData;
}

export const AdminUserService = {
    createUser
}