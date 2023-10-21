import sendMail from "../../../shared/sendMail";
import { IEmail } from "../../interfaces/common";
import { IContactInformation } from "./contactUs.interface";

const sendContactInformation = async (payload: IContactInformation): Promise<string | null> => {
    const { name, email, subject, message } = payload;
    const emailBodyForContactInformation: IEmail = {
        to: 'ghcontact@yopmail.com',
        subject: subject + ' - ' + email,
        text: message,
        html: ''
    };

    const emailBodyForContactInfoReceived = {
        to: email,
        subject: 'Thank You for Contacting Grocery Heaven',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Thank You for Contacting Grocery Heaven</title>
        </head>
        <body>
            <p>Dear ${name},</p>

            <p>We hope this message finds you well. We wanted to inform you that we have received your recent email sent via our website's contact form. Thank you for taking the time to reach out to us. Your feedback and inquiries are important to us, and we greatly appreciate your communication.</p>

            <p>Our team at Grocery Heaven is dedicated to providing exceptional customer service, and we are committed to addressing your needs promptly. We have received the following information from your message:</p>

            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email Address:</strong> ${email}</li>
                <li><strong>Subject:</strong> ${subject}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>

            <p>Rest assured that we are currently reviewing your message, and we will respond as soon as possible. Please note that our response time may vary depending on the nature of your inquiry, but we strive to get back to you within 24 hours.</p>

            <p>In the meantime, if you have any additional details or information to share regarding your inquiry, please feel free to respond to this email or contact us at <a href="mailto:ghContact@yopmail.com">ghContact@yopmail.com</a> or call us at +123456789. Our customer support team is here to assist you with any further assistance you may require.</p>

            <p>Once again, thank you for choosing Grocery Heaven. We look forward to serving you and ensuring your grocery shopping experience is exceptional. We will be in touch with you soon.</p>

            <p>Best regards,</p>
            <p>Product Team<br>Grocery Heaven<br></p>
        </body>
        </html>
        `
    }
    await sendMail(emailBodyForContactInformation);
    await sendMail(emailBodyForContactInfoReceived);
    return "Sent";
}
export const ContactUsService = {
    sendContactInformation
}