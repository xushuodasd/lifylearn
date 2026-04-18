import { Router } from 'express';
import { AdminController } from '../controllers/admin-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = Router();

// 管理员认证路由
router.post('/login', AdminController.login);
router.get('/init', AdminController.initDefaultAdmin);

// 需要认证的路由
router.get('/info', authMiddleware, AdminController.getAdminInfo);

export default router;
