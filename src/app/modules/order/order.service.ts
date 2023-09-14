import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { AuthUser } from "../../interfaces/common";
import { Cart } from "../cart/cart.model";
import { IProduct } from "../product/product.interface";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";


const getOrdersByUserId = async (user: AuthUser): Promise<IOrder[]> => {
    const result = await Order.find({ userId: user.userId })
        .populate('products.productId');
    return result;
}

const addOrder = async (user: AuthUser): Promise<IOrder> => {
    const userId = user.userId;
    const cartItems = await Cart.find({ userId: userId }).populate('productId');

    if (!cartItems || cartItems.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Cart is empty or no items found.");
    }

    // Calculate total price and construct the order
    let totalPrice = 0;
    const products = [];

    for (const cartItem of cartItems) {
        const price = (cartItem.productId as IProduct).price;

        if ('_id' in cartItem.productId) {
            totalPrice += cartItem.quantity * price;
            products.push({
                productId: cartItem.productId._id,
                quantity: cartItem.quantity,
            });
        }

    }

    const roundedTotalPrice = Number(totalPrice.toFixed(2));

    const orderDetails = {
        userId: userId,
        products: products,
        totalPrice: roundedTotalPrice,
    };

    const result = new Order(orderDetails)

    result.save();

    await Cart.deleteMany({ userId: user.userId });

    return result;
}

const deleteOrder = async (
    id: string
): Promise<IOrder | null> => {
    const result = await Order.findByIdAndDelete(id);
    return result;
};


export const OrderService = {
    getOrdersByUserId,
    addOrder,
    deleteOrder
}