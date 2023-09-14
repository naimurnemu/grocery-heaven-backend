import { Schema, model } from "mongoose";
import { OrderModel, IOrder, OrderStatus } from "./order.interface";


const orderSchema = new Schema<IOrder>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }],
        orderStatus: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Pending
        },
        isDelivered: {
            type: Boolean,
            default: false
        },
        totalPrice: {
            type: Number,
            // default: calculateTotalPrice
            required: true
        }

    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }

);

// function calculateTotalPrice() {
//     const products = this.products || [];
//     let total = 0;

//     for (const product of products) {
//       total += product.quantity * product.price;
//     }

//     return total;
//   }

export const Order = model<IOrder, OrderModel>('Order', orderSchema);

