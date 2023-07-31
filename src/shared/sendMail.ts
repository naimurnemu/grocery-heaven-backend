import nodemailer from "nodemailer";
import { IEmail } from "../app/interfaces/common";
import config from "../config";


const sendMail = async ({ to, subject, text, html }: IEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: config.mail_password,
            auth: {
                user: config.mail_username,
                pass: config.mail_password
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: {
                name: 'Daily Grocery Shop',
                address: `${config.mail_username}`
            }, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error)
    }
}

export default sendMail;