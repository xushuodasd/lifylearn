import { Router } from 'express';
import { BlogController } from '../controllers/blog-controller';

const router = Router();

// 博客路由
router.get('/blogs', BlogController.getAll);
router.get('/blogs/:id', BlogController.getById);
router.post('/blogs', BlogController.create);
router.put('/blogs/:id', BlogController.update);
router.delete('/blogs/:id', BlogController.delete);
router.get('/blogs/category/:category', BlogController.getByCategory);

export default router;
