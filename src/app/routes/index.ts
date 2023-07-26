import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { AdminUserRoutes } from '../modules/adminUser/adminUser.routes';
import { AdminAuthRoutes } from '../modules/adminAuth/adminAuth.routes';

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
];

moduleRoutes.forEach(({ path, route }) => {
  routes.use(path, route);
});

export default routes;
