import { Model } from "mongoose";

enum Role {
    SUPERADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'customer'
}

export type IUser = {
    phoneNumber: string;
    role: Role;
    password: string;
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    gender: 'male' | 'female';
    age?: number;
    email: string;
    token?: string;
}

export type UserModel = Model<IUser, Record<string, unknown>>;