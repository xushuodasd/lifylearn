import { Router } from 'express';
import { TutorialController } from '../controllers/tutorial-controller';

const router = Router();

// 教程路由
router.get('/tutorials', TutorialController.getAll);
router.get('/tutorials/:id', TutorialController.getById);
router.post('/tutorials', TutorialController.create);
router.put('/tutorials/:id', TutorialController.update);
router.delete('/tutorials/:id', TutorialController.delete);
router.get('/tutorials/category/:category', TutorialController.getByCategory);
router.get(
  '/tutorials/difficulty/:difficulty',
  TutorialController.getByDifficulty
);

export default router;
