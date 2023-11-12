import express from 'express';
import { AdminUserController } from './adminUser.controller';

const router = express.Router();

router.post(
    '/create-admin/',
    AdminUserController.createUser
    );


export const AdminUserRoutes = router;