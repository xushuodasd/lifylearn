import { Router } from 'express';
import { uploadMiddleware } from '../middleware/upload-middleware';
import { uploadImage, importWord } from '../controllers/upload-controller';

const router = Router();

// 上传图片接口
router.post('/upload', uploadMiddleware.single('image'), uploadImage);

// 导入 Word 文档接口
router.post('/import-word', uploadMiddleware.single('file'), importWord);

export default router;
