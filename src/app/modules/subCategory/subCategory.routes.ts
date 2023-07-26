import express from 'express';

import { SubCategoryController } from './subCategory.controller';


const router = express.Router();

router.post('/add/', SubCategoryController.createSubCategory);
router.get('/',SubCategoryController.getAllSubCategories)


export const SubCategoryRoutes = router;