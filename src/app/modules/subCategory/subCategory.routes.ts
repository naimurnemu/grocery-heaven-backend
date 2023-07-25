import express from 'express';

import { SubCategoryController } from './subCategory.controller';


const router = express.Router();

router.post('/add/', SubCategoryController.createSubCategory);



export const SubCategoryRoutes = router;