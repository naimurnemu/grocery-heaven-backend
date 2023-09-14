import express from 'express';
import { ROLE } from '../../interfaces/common';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';


const router = express.Router();

router.get('/', auth(ROLE.USER), OrderController.getOrdersByUserId);
router.post('/', auth(ROLE.USER), OrderController.addOrder);
router.delete('/:id', auth(ROLE.USER), OrderController.deleteOrder);

export const OrderRoutes = router;