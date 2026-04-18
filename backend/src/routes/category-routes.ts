import { Router } from 'express';
import { CategoryController } from '../controllers/category-controller';

const router = Router();

// 分类路由
router.get('/categories', CategoryController.getAll);
router.get('/categories/:id', CategoryController.getById);
router.get('/categories/module/:module', CategoryController.getByModule);
router.post('/categories', CategoryController.create);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

export default router;
