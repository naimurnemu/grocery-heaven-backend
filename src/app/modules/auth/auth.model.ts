import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./auth.interface";

const userSchema = new Schema<IUser>(
    {
        phoneNumber: {
            type: String
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
        },
        gender: {
            type: String,
        },
        address: {
            type: String,
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

