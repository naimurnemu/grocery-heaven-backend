import { Schema, model } from "mongoose";
import { ReviewModel, IReview } from "./review.interface";

const ReviewSchema = new Schema<IReview>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);

