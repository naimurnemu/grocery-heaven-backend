import { Schema, model } from "mongoose";
import { AdminUserModel, IAdminUser } from "./adminUser.interface";
import { role } from "../auth/auth.constant";

const adminUserSchema = new Schema<IAdminUser>(
    {
        phoneNumber: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: role
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        dateOfBirth: {
            type: String
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

export const AdminUser = model<IAdminUser, AdminUserModel>('AdminUser', adminUserSchema);

