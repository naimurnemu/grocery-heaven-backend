import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import sendMail from "../../../shared/sendMail";
import { IEmail } from "../../interfaces/common";

const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.body;

        const result = await AuthService.createUser(user);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully',
            data: result
        });

        if (result.token) {
            const emailBody: IEmail = {
                to: result.email,
                subject: 'Welcome to Daily Grocery Shop - Your One-Stop Shop for Fresh Delights!',
                html: `<!DOCTYPE html>
                        <html>
                        
                        <head>
                          <title>Welcome to Daily Grocery Shop</title>
                        </head>
                        
                        <body>
                          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h1 style="color: #00a0e6;">Welcome to Daily Grocery Shop</h1>
                            <p>Dear valued customer,</p>
                            <p>Welcome to Daily Grocery Shop! We are thrilled to have you on board as one of our esteemed new users. As your go-to destination for all your grocery needs, we are committed to providing you with the freshest and highest-quality products to make your daily meals extraordinary.</p>
                        
                            <p>At Daily Grocery Shop, we understand the importance of convenience and reliability when it comes to your grocery shopping experience. As a valued member of our family, you can expect the following benefits:</p>
                            <ul>
                              <li>Wide Range of Products: Our store boasts a comprehensive selection of fresh produce, pantry essentials, dairy, bakery items, and much more. We take pride in partnering with trusted suppliers to ensure that only the finest items make their way to your shopping cart.</li>
                              <li>Easy-to-Use Online Platform: Explore our user-friendly website and mobile app, where you can effortlessly browse through our extensive product catalog and place orders with just a few clicks. Say goodbye to long queues and enjoy the convenience of shopping from the comfort of your home.</li>
                              <li>Timely Deliveries: We understand that time is precious, which is why our efficient delivery team is dedicated to bringing your orders right to your doorstep. Count on us to deliver on time, every time.</li>
                              <li>Exceptional Customer Support: Should you have any questions or concerns, our friendly and knowledgeable customer support team is always here to assist you. Feel free to reach out to us via phone, email, or live chat.</li>
                            </ul>
                        
                            <p>To sweeten the deal, we have a special offer exclusively for you! Use the code "<strong>WELCOME15</strong>" during checkout and enjoy a fantastic 15% discount on your first purchase.</p>
                        
                            <p>We can't wait to embark on this exciting grocery shopping journey with you. Your satisfaction is our top priority, and we strive to make every shopping experience with us unforgettable.</p>
                        
                            <p>Thank you for choosing Daily Grocery Shop. Together, let's make every meal a delightful experience!</p>
                        
                            <p>Happy shopping!</p>
                        
                            <p>Warm regards,</p>
                            <p>The Daily Grocery Shop Team</p>
                          </div>
                        </body>
                        
                        </html>
                        `
            }
            // console.log('this is email for :', email, ' :::', emailBody);
            await sendMail(emailBody);
        }
    }
);

const signIn: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await AuthService.signIn(payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User signed in  successfully',
            data: result
        })
    }
);

export const AuthController = {
    createUser,
    signIn
}