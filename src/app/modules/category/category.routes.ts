import express from 'express';

import { CategoryController } from './category.controller';


const router = express.Router();

router.post('/add/', CategoryController.createCategory);
router.put('/update/:id', CategoryController.updateCategory)
router.get('/',CategoryController.getAllCategories)



export const CategoryRoutes = router;