import express from 'express';

import { CategoryController } from './product.controller';


const router = express.Router();

router.post('/add/', CategoryController.postAProduct);
// router.put('/update/:id', CategoryController.updateCategory)
// router.get('/',CategoryController.getAllCategories)



export const ProductRoutes = router;