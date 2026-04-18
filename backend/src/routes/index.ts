import { Router } from 'express';
import blogRoutes from './blog-routes';
import tutorialRoutes from './tutorial-routes';
import toolRoutes from './tool-routes';
import categoryRoutes from './category-routes';
import adminRoutes from './admin-routes';
import uploadRoutes from './upload-routes';

const router = Router();

// API版本前缀
router.use('/api/v1', [blogRoutes, tutorialRoutes, toolRoutes, categoryRoutes, adminRoutes, uploadRoutes]);

export default router;
