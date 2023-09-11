import { AuthUser } from "../../interfaces/common";
import { IReview } from "./review.interface";
import { Review } from "./review.model";

const getReviewByUserId = async (user: AuthUser): Promise<IReview[]> => {
    const result = await Review.find({ userId: user.userId })
        .populate('productId');

    return result;
}

const getReviewsByProductId = async (productId: string): Promise<IReview[]> => {
    const result = await Review.find({ productId: productId })
        .populate('productId');

    return result;
}

const addReview = async (review: IReview, user: AuthUser): Promise<IReview> => {
    const result = new Review({ ...review, userId: user.userId })

    result.save();
    return result;
}

const deleteReview = async (
    id: string
): Promise<IReview | null> => {
    const result = await Review.findByIdAndDelete(id);
    return result;
};


export const ReviewService = {
    getReviewByUserId,
    addReview,
    getReviewsByProductId,
    deleteReview
}