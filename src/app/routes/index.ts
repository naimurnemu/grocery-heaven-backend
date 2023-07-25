import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { SubCategoryRoutes } from '../modules/subCategory/subCategory.routes';
import { UserRoutes } from '../modules/user/user.routes';
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
    path: '/category/',
    route: CategoryRoutes
  },
  {
    path: '/subCategory/',
    route: SubCategoryRoutes
  }
];

moduleRoutes.forEach(({ path, route }) => {
  routes.use(path, route);
});

export default routes;
