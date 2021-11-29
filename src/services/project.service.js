import Project from "../models/project.model.js";

//@desc     Get all Projects
//@route    GET /api/projects/
//@access   Public
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({});
        if (!projects) {
            res.status(404);
            throw new Error("No projects found.");
        }
        res.json(projects);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Get single project by ID
//@route    GET /api/projects/:id
//@access   Public
const getSingleProject = async (req, res, next) => {
    try {
        const project = await Project.findById({ _id: req.body._id });
        if (!project) {
            res.status(404);
            throw new Error("Project not found.");
        }
        res.json(project);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Create Project
//@route    POST /api/projects/
//@access   Private
const createProject = async (req, res, next) => {
    try {
        const project = new Project({
            title: req.body.title,
            slug: req.body.slug,
            shortDescription: req.body.shortDescription,
            longDescription: req.body.longDescription,
            images: [req.body.images],
            projectType: req.body.projectType,
            projectStatus: req.body.projectStatus,
            isPublished: req.body.isPublished,
            projectUrl: req.body.projectUrl,
        });
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Update Project Details
//@route    PUT /api/projects/:id
//@access   Private
const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById({ _id: req.params.id });
        if (!project) {
            res.status(404);
            throw new Error("Project not found.");
        }
        if (project) {
            project.title = req.body.title;
            project.slug = req.body.slug;
            project.shortDescription = req.body.shortDescription;
            project.longDescription = req.body.longDescription;
            project.images = req.body.images;
            project.projectType = req.body.projectType;
            project.projectStatus = req.body.projectStatus;
            project.isPublished = req.body.isPublished;
            project.projectUrl = req.body.projectUrl;
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Remove Project
//@route    DELETE /api/projects/:id
//@access   Private
const removeProject = async (req, res, next) => {
    try {
        const project = await Project.findById({ _id: req.params.id });
        if (!project) {
            res.status(404);
            throw new Error("Project not found.");
        }
        if (project) {
            await project.remove();
            res.json({ message: "Project Removed." });
        }
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

export {
    getAllProjects,
    getSingleProject,
    updateProject,
    createProject,
    removeProject,
};
