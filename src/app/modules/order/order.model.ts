import { Schema, model } from "mongoose";
import { OrderModel, IOrder, OrderStatus } from "./order.interface";
// import { Product } from "../product/product.model";


const OrderSchema = new Schema<IOrder>(
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
            required: true
        },
        billingDetails: {
            name: {
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
            },
            companyName: {
                type: String
            },
            country: {
                type: String,
                required: true
            },
            streetAddress: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            orderNotes: {
                type: String,
                required: true
            }
        },
        paymentMethod: {
            type: String,
            enum: ['COD']
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
// OrderSchema.statics.isProductAvailable= async (productId: string, quantity:number): Promise<boolean> =>{
//     const product = await Product.findById(productId);
//     if(product){
//         return product.countInStock>quantity
//     }
// }

export const Order = model<IOrder, OrderModel>('Order', OrderSchema);

