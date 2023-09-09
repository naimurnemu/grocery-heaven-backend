import express from 'express';
import { ROLE } from '../../interfaces/common';
import auth from '../../middlewares/auth';
import { CartController } from './cart.controller';


const router = express.Router();

router.get('/', auth(ROLE.USER), CartController.getCartItemsByUserId);
router.post('/', auth(ROLE.USER), CartController.addCartItem);
router.get('/product/most-selling/', CartController.getMostSellingProduct)
router.delete('/:id', auth(ROLE.USER), CartController.deleteCartItem);

export const CartRoutes = router;