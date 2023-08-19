import express from 'express';
import { Auth } from '../../middlewares/auth';
import { WishListController } from './wishList.controller';


const router = express.Router();

router.get('/', Auth.user, WishListController.getWishListByUserId);
router.post('/', Auth.user, WishListController.addWishListItem);
router.delete('/:id', Auth.user, WishListController.deleteWishListItem);

export const WishListRoutes = router;