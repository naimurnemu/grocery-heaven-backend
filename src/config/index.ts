import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    token_key: process.env.TOKEN_KEY,
    mail_service: process.env.MAIL_SERVICE,
    mail_username: process.env.MAIL_USERNAME,
    mail_password: process.env.MAIL_PASSWORD
};
