import express from 'express';
import { UserController } from './user.controller';
import { Auth } from '../../middlewares/auth';

const router = express.Router();


router.get('/:id', Auth.user, UserController.getSingleUser);
router.get('/', UserController.getAllUsers);

router.patch('/:id', UserController.updateUser);

export const UserRoutes = router;