import express from 'express';
import auth from '../../middlewares/auth';
import { WishListController } from './wishList.controller';
import { ROLE } from '../../interfaces/common';


const router = express.Router();

router.get('/', auth(ROLE.USER), WishListController.getWishListByUserId);
router.post('/', auth(ROLE.USER), WishListController.addWishListItem);
router.delete('/:id', auth(ROLE.USER), WishListController.deleteWishListItem);

export const WishListRoutes = router;