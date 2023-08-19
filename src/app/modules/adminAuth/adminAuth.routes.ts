import express from 'express';
import { AdminAuthController } from './adminAuth.controller';


const router = express.Router();

// router.post('/admin-signup/',
//     validateRequest(UserValidation.createUserZodSchema),
//     AuthController.createUser);

router.post('/signin/', AdminAuthController.signIn)



export const AdminAuthRoutes = router;