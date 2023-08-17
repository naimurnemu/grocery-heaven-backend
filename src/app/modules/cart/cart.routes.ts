import express from 'express';
import { CartController } from './cart.controller';
import { Auth } from '../../middlewares/auth';


const router = express.Router();

router.get('/', Auth.user, CartController.getCartItemsByUserId);
router.post('/', Auth.user, CartController.addCartItem);
router.delete('/:id', Auth.user, CartController.deleteCartItem);

export const CartRoutes = router;