import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { NextFunction, Request, Response } from "express";

type DecodedUser = {
    userId: string;
}

const user = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            const tokenValue = token.split(" ")[1];
            const decodedToken = jwt.verify(tokenValue, String(config.token_key)) as JwtPayload;

            if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken) {
                const user: DecodedUser = decodedToken as DecodedUser;
                // req.userId = user.userId;
                (req as Request & { userId: string }).userId = user.userId;

                next();
            } else {
                throw new Error('Invalid token format.');
            }
        } else {
            res.status(401).json({ message: 'Unauthorized User' });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized User' });
    }
}

// const user = (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const token = req.headers.authorization;

//         if (token) {
//             const tokenValue = token.split(" ")[1];
//             const decodedToken = jwt.verify(tokenValue, String(config.token_key)) as JwtPayload;

//             if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken) {
//                 const user: DecodedUser = decodedToken as DecodedUser;
//                 // req.userId = user.userId;
//                 (req as Request & { userId: string }).userId = user.userId;

//                 next();
//             } else {
//                 throw new Error('Invalid token format.');
//             }
//         } else {
//             res.status(401).json({ message: 'Unauthorized User' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: 'Unauthorized User' });
//     }
// }

export const Auth = {
    user
};
