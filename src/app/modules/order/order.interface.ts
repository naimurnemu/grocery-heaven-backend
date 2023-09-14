import { Model, Types } from "mongoose";
import { IProduct } from "../product/product.interface";

export enum OrderStatus {
    Pending = 'Pending',
    Processing = 'Processing',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Canceled = 'Canceled',
}

export type IOrder = {
    userId: Types.ObjectId;
    products: [{
        productId: Types.ObjectId | IProduct;
        quantity: number;
    }];
    orderStatus: OrderStatus;
    isDelivered: boolean;
    deliveryAddress: string;
    totalPrice: number;
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;