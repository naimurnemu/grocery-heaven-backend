import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './auth.validations';

const router = express.Router();

router.post('/signup/',
    validateRequest(UserValidation.createUserZodSchema),
    AuthController.createUser);

router.post('/signin/', AuthController.signIn);



export const AuthRoutes = router;