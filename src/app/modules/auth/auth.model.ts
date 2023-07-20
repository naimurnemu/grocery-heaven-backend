import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./auth.interface";
import { role } from "./auth.constant";

const userSchema = new Schema<IUser>(
    {
        phoneNumber: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: role
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                }
            },
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
        age: {
            type: Number
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

export const User = model<IUser, UserModel>('User', userSchema);

