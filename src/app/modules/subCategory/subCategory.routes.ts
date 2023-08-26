import express from 'express';

import { SubCategoryController } from './subCategory.controller';


const router = express.Router();

router.post('/add/', SubCategoryController.createSubCategory);
router.get('/',SubCategoryController.getAllSubCategories);
router.get('/category/:id', SubCategoryController.getCategoryBySubCategory)
router.put('/update/:id', SubCategoryController.updateSubCategory)
router.delete('/:id', SubCategoryController.deleteSubCategoryById)

export const SubCategoryRoutes = router;