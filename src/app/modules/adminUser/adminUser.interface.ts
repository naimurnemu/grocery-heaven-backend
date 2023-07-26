import { Model } from "mongoose";

enum Role {
    SUPERADMIN = 'super_admin',
    ADMIN = 'admin',
    // USER = ''
}

export type IAdminUser = {
    email: string;
    phoneNumber: string;
    password: string;
    role: Role;
    name: string;
    dateOfBirth: string;
    gender: 'male' | 'female';
    address: string;
}

export type AdminUserModel = Model<IAdminUser, Record<string, unknown>>;