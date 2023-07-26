import { Model } from "mongoose";


export type IUser = {
    email: string;
    password: string;
    phoneNumber?: string;
    // role: Role;
    name?: {
        firstName: string;
        lastName: string;
    };
    address?: string;
    gender?: 'male' | 'female';
    age?: number;
    token?: string;
}

// export type IUser = {
//     phoneNumber: string;
//     role: Role;
//     password: string;
//     name: {
//         firstName: string;
//         lastName: string;
//     };
//     address: string;
//     gender: 'male' | 'female';
//     age?: number;
//     email: string;
//     token?: string;
// }

export type UserModel = Model<IUser, Record<string, unknown>>;