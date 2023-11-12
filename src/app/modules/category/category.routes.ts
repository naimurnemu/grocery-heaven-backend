import express from 'express';

import { CategoryController } from './category.controller';


const router = express.Router();

router.post('/add/', CategoryController.createCategory);
router.put('/update/:id', CategoryController.updateCategory)
router.get('/subCategory/:id', CategoryController.getSubCategoryByCategory)
router.get('/',CategoryController.getAllCategories)
router.delete('/:id', CategoryController.deleteCategoryById)


export const CategoryRoutes = router;