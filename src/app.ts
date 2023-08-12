import httpStatus from 'http-status';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { logger } from './shared/logger';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(auth)
// Application routes
logger.info(app.get('env'));

app.use('/api/v1', routes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});

// const testId = async () => {
//   const testId = await genereateFacultyId();
//   console.log(testId);
// };

// testId();

export default app;
