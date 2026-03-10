import Project from '../models/Project.model.js';
import { cloudinary } from '../config/cloudinary.js';

// ─── GET /api/projects (public) ───────────────────────────────────────────────
export const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ isFeatured: true })
            .sort({ order: 1, createdAt: -1 })
            .lean();

        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/projects/all (admin) ────────────────────────────────────────────
export const getAllProjectsAdmin = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

// ─── GET /api/projects/:id ────────────────────────────────────────────────────
export const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// ─── POST /api/projects (admin) ───────────────────────────────────────────────
export const createProject = async (req, res, next) => {
    try {
        const { title, description, techStack, liveUrl, githubUrl, color, order } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Project image is required.' });
        }

        const project = await Project.create({
            title,
            description,
            techStack: typeof techStack === 'string' ? techStack.split(',').map(t => t.trim()) : techStack,
            imageUrl: req.file.path,
            imagePublicId: req.file.filename,
            liveUrl,
            githubUrl,
            color,
            order: order ? Number(order) : 0,
        });

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// ─── PUT /api/projects/:id (admin) ────────────────────────────────────────────
export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        const { title, description, techStack, liveUrl, githubUrl, color, order, isFeatured } = req.body;

        // If a new image was uploaded, delete the old Cloudinary asset
        if (req.file && project.imagePublicId) {
            await cloudinary.uploader.destroy(project.imagePublicId);
        }

        project.title = title ?? project.title;
        project.description = description ?? project.description;
        project.liveUrl = liveUrl ?? project.liveUrl;
        project.githubUrl = githubUrl ?? project.githubUrl;
        project.color = color ?? project.color;
        project.order = order !== undefined ? Number(order) : project.order;
        project.isFeatured = isFeatured !== undefined ? isFeatured : project.isFeatured;

        if (techStack) {
            project.techStack = typeof techStack === 'string'
                ? techStack.split(',').map(t => t.trim())
                : techStack;
        }

        if (req.file) {
            project.imageUrl = req.file.path;
            project.imagePublicId = req.file.filename;
        }

        await project.save();
        res.json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// ─── DELETE /api/projects/:id (admin) ─────────────────────────────────────────
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        // Remove image from Cloudinary
        if (project.imagePublicId) {
            await cloudinary.uploader.destroy(project.imagePublicId);
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Project deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
