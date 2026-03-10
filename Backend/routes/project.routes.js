import { Router } from 'express';
import {
    getAllProjects,
    getAllProjectsAdmin,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from '../controllers/project.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadProjectImage } from '../config/cloudinary.js';

const router = Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Admin routes (protected)
router.get('/admin/all', protect, getAllProjectsAdmin);

router.post(
    '/',
    protect,
    uploadProjectImage.single('image'),
    createProject
);

router.put(
    '/:id',
    protect,
    uploadProjectImage.single('image'),
    updateProject
);

router.delete('/:id', protect, deleteProject);

export default router;
