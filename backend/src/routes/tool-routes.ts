import { Router } from 'express';
import { ToolController } from '../controllers/tool-controller';

const router = Router();

// 工具路由
router.get('/tools', ToolController.getAll);
router.get('/tools/:id', ToolController.getById);
router.post('/tools', ToolController.create);
router.put('/tools/:id', ToolController.update);
router.delete('/tools/:id', ToolController.delete);
router.get('/tools/category/:category', ToolController.getByCategory);

export default router;
