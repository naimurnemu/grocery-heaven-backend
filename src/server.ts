import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
});

let server: Server;

async function bootstrap() {
    try {
        await mongoose.connect(config.database_url as string);
        console.info('Database is connected successfully');

        server = app.listen(config.port, () => {
            console.info(`Applicaiton app listening on port ${config.port}`);
        });
    } catch (error) {
        console.error('failed to connect db', error);
    }

    process.on('unhandledRejection', error => {
        console.log(
            'Unhandled Rejection is detected, we are closing our server..........'
        );
        if (server) {
            server.close(() => {
                console.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

bootstrap();

process.on('SIGTERM', () => {
    console.info('SIGTERM is received');
    if (server) {
        server.close();
    }
});
