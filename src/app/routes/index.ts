import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { SubCategoryRoutes } from '../modules/subCategory/subCategory.routes';
import { UserRoutes } from '../modules/user/user.routes';

import { AdminAuthRoutes } from '../modules/adminAuth/adminAuth.routes';
import { AdminUserRoutes } from '../modules/adminUser/adminUser.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { HeroMasterDataRoutes } from '../modules/heroMasterData/heroMasterData.routes';
import { CartRoutes } from '../modules/cart/cart.routes';
import { WishListRoutes } from '../modules/wishList/wishList.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/admin/',
    route: AdminUserRoutes,
  },
  {
    path: '/admin-auth/',
    route: AdminAuthRoutes,
  },
  {
    path: '/category/',
    route: CategoryRoutes
  },
  {
    path: '/subCategory/',
    route: SubCategoryRoutes
  },
  {
    path: "/product",
    route: ProductRoutes
  },
  {
    path: "/heroMasterData/",
    route: HeroMasterDataRoutes
  },
  {
    path: "/cart/",
    route: CartRoutes
  },
  {
    path: "/wishList/",
    route: WishListRoutes
  },
];

moduleRoutes.forEach(({ path, route }) => {
  routes.use(path, route);
});

export default routes;
