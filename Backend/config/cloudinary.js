import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Storage for project images ───────────────────────────────────────────────
const projectStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/projects',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [{ width: 1200, quality: 'auto', crop: 'limit' }],
    },
});

// ─── Storage for tech logos ───────────────────────────────────────────────────
const techStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/tech-logos',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
        transformation: [{ width: 200, quality: 'auto', crop: 'limit' }],
    },
});

// ─── Storage for testimonial images ──────────────────────────────────────────
const testimonialStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/testimonials',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 400, height: 400, quality: 'auto', crop: 'fill' }],
    },
});

export const uploadProjectImage = multer({
    storage: projectStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export const uploadTechLogo = multer({
    storage: techStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

export const uploadTestimonialImage = multer({
    storage: testimonialStorage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

export { cloudinary };
