import express from 'express';
import { ROLE } from '../../interfaces/common';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';


const router = express.Router();

router.get('/all', auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), OrderController.getAllOrders);
router.get('/', auth(ROLE.USER), OrderController.getOrdersByUserId);
router.post('/', auth(ROLE.USER), OrderController.addOrder);
router.delete('/:id', auth(ROLE.USER), OrderController.deleteOrder);
router.patch('/:id', auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), OrderController.updateOrder);

export const OrderRoutes = router;