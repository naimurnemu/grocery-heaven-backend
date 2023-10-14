import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { AuthUser } from "../../interfaces/common";
import { Cart } from "../cart/cart.model";
import { IProduct } from "../product/product.interface";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { Product } from "../product/product.model";

const getOrdersByUserId = async (user: AuthUser): Promise<IOrder[]> => {
    const result = await Order.find({ userId: user.userId })
        .populate('products.productId');
    return result;
}

const getAllOrders = async (): Promise<IOrder[]> => {
    const result = await Order.find({}).sort({ createdAt: -1 })
        .populate('products.productId');
    return result;
}

const addOrder = async (user: AuthUser, payload: Partial<IOrder>): Promise<IOrder> => {

    const userId = user.userId;

    const cartItems = await Cart.find({ userId: userId }).populate('productId');

    if (!cartItems || cartItems.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Cart is empty or no items found.");
    }


    // Calculate total price and construct the order
    let totalPrice = 0;
    const products = [];
    const listUnavailableProduct = [];

    for (const cartItem of cartItems) {

        const product = cartItem.productId as IProduct;

        if (product.countInStock < cartItem.quantity) {
            listUnavailableProduct.push(product.productName);

            // listUnavailableProduct.push({
            //     productId: cartItem.productId._id,
            //     productName: product.productName,
            //     orderQuantity: cartItem.quantity,
            //     stockQuantity: product.countInStock
            // })
        }

        const price = (cartItem.productId as IProduct).price;

        if ('_id' in cartItem.productId) {
            totalPrice += cartItem.quantity * price;
            products.push({
                productId: cartItem.productId._id,
                quantity: cartItem.quantity,
            });
        }

    }

    if (listUnavailableProduct.length > 0) {
        throw new ApiError(httpStatus.NOT_FOUND, `${listUnavailableProduct.join(', ')} out of stock`)
    }

    const roundedTotalPrice = Number(totalPrice.toFixed(2));

    const orderDetails = {
        userId: userId,
        products: products,
        totalPrice: roundedTotalPrice,
        billingDetails: payload
    };


    const result = new Order(orderDetails)
    const updatePromises = orderDetails.products.map(async item => {
        const updateStock = await Product.findByIdAndUpdate(
            item.productId,
            { $inc: { countInStock: -item.quantity } }
        );
        return updateStock;
    });

    try {
        await Promise.all(updatePromises);
    } catch (error) {
        console.error('Error updating stock:', error);
    }

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

const updateOrder = async (
    id: string,
    payload: Partial<IOrder>
): Promise<IOrder | null> => {
    const result = await Order.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
};


export const OrderService = {
    getOrdersByUserId,
    getAllOrders,
    addOrder,
    deleteOrder,
    updateOrder
}