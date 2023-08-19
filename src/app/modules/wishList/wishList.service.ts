import { AuthUser } from "../../interfaces/common";
import { IWishList } from "./wishList.interface";
import { WishList } from "./wishList.model";

const getWishListByUserId = async (user: AuthUser): Promise<IWishList[]> => {
    const result = await WishList.find({ userId: user.userId })
        .populate('productId');

    return result;
}

const addWishListItem = async (wishListItem: IWishList, user: AuthUser): Promise<IWishList> => {
    const result = new WishList({ ...wishListItem, userId: user.userId })

    result.save();
    return result;
}

const deleteWishListItem = async (
    id: string
): Promise<IWishList | null> => {
    const result = await WishList.findByIdAndDelete(id);
    return result;
};


export const WishListService = {
    getWishListByUserId,
    addWishListItem,
    deleteWishListItem
}