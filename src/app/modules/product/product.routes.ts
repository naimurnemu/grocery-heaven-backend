import express from 'express';

import { Auth } from '../../middlewares/auth';
import { ProductController } from './product.controller';


const router = express.Router();

router.post('/add/',Auth.user, ProductController.postAProduct);
router.put('/update/:id',Auth.user, ProductController.updateASingleProduct);
router.get('/',ProductController.getAllProducts);
router.get("/:id", ProductController.getProductsByCategory)
router.get('/hotProduct/', ProductController.getHotProducts)
// router.put('/update/:id', CategoryController.updateCategory)
// router.get('/',CategoryController.getAllCategories)



export const ProductRoutes = router;