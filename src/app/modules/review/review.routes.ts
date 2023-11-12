import express from 'express';
import { ROLE } from '../../interfaces/common';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';


const router = express.Router();

router.get('/', auth(ROLE.USER), ReviewController.getReviewByUserId);
router.get('/:productId', ReviewController.getReviewsByProductId);
router.post('/', auth(ROLE.USER), ReviewController.addReview);
router.delete('/:id', auth(ROLE.ADMIN), ReviewController.deleteReview);

export const ReviewRoutes = router;