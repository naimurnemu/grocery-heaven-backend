import express from 'express';
import { ROLE } from '../../interfaces/common';
import auth from '../../middlewares/auth';
import { ProductController } from './product.controller';


const router = express.Router();

router.post('/add/', auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), ProductController.postAProduct);
router.put('/update/:id', auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), ProductController.updateASingleProduct);
router.get('/', ProductController.getAllProducts);
router.get('/hotProduct/', ProductController.getHotProducts)
router.post('/relatedProduct/', ProductController.getRelatedProduct)
router.get('/searchProduct/', ProductController.getSearchProducts);
router.get('/latestProduct/', ProductController.getLatestProducts);
router.get('/brand', ProductController.getProductBrands);
router.delete('/:id', auth(ROLE.ADMIN, ROLE.SUPER_ADMIN), ProductController.deleteASingleProduct)
router.get("/:id", ProductController.getProductsByCategory)
router.get("/single/:id", ProductController.getProductsById)

// router.put('/update/:id', CategoryController.updateCategory)
// router.get('/',CategoryController.getAllCategories)



export const ProductRoutes = router;