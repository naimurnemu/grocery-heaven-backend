import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ROLE } from '../../interfaces/common';


const router = express.Router();


router.get('/single-user', auth(ROLE.USER), UserController.getSingleUser);
router.get('/users', auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), UserController.getAllUsers);

router.patch('/', auth(ROLE.USER), UserController.updateUser);

export const UserRoutes = router;