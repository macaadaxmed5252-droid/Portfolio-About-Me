import { Router } from 'express';
import {
    getAllTechs,
    createTech,
    updateTech,
    deleteTech,
} from '../controllers/tech.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadTechLogo } from '../config/cloudinary.js';

const router = Router();

// Public
router.get('/', getAllTechs);

// Admin protected
router.post('/', protect, uploadTechLogo.single('icon'), createTech);
router.put('/:id', protect, uploadTechLogo.single('icon'), updateTech);
router.delete('/:id', protect, deleteTech);

export default router;
