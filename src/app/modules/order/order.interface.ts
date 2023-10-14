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
    billingDetails: IBillingDetails;
    totalPrice: number;
    paymentMethod: 'COD';
}

type IBillingDetails = {
    name: {
        firstName: string;
        lastName: string;
    },
    companyName?: string;
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    orderNotes?: string;
}

export type OrderModel = Model<IOrder, Record<string, unknown>>;