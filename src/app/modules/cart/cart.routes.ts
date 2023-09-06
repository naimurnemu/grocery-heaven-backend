import express from 'express';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth';
import { ROLE } from '../../interfaces/common';


const router = express.Router();

router.get('/', auth(ROLE.USER), CartController.getCartItemsByUserId);
router.post('/', auth(ROLE.USER), CartController.addCartItem);
router.delete('/:id', auth(ROLE.USER), CartController.deleteCartItem);

export const CartRoutes = router;