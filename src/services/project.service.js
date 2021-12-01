import Project from "../models/project.model.js";

//@desc     Get all Projects
//@route    GET /api/projects/
//@access   Public
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({});
        if (!projects) res.status(404).send({ msg: "Projects not found." });
        res.json(projects);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Get single project by ID
//@route    GET /api/projects/:id
//@access   Public
const getSingleProject = async (req, res, next) => {
    try {
        const project = await Project.findById({ _id: req.params.id });
        if (!project) res.status(404).send({ msg: "Project not found." });

        res.json(project);
    } catch (error) {
        res.status(500);
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
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Update Project Details
//@route    PUT /api/projects/:id
//@access   Private
const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById({ _id: req.params.id });
        if (!project) res.status(404).send({ msg: "Project not found." });
        if (project) {
            project.title = req.body.title || project.title;
            project.slug = req.body.slug || project.slug;
            project.shortDescription =
                req.body.shortDescription || project.shortDescription;
            project.longDescription =
                req.body.longDescription || project.longDescription;
            project.images = req.body.images || project.images;
            project.projectType = req.body.projectType || project.projectType;
            project.projectStatus =
                req.body.projectStatus || project.projectStatus;
            project.isPublished = req.body.isPublished || project.isPublished;
            project.projectUrl = req.body.projectUrl || project.projectUrl;
        }

        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Remove Project
//@route    DELETE /api/projects/:id
//@access   Private
const removeProject = async (req, res, next) => {
    try {
        const project = await Project.findById({ _id: req.params.id });
        if (!project) res.status(404).send({ msg: "Project not found." });
        if (project) {
            await project.remove();
            res.json({ message: "Project Removed." });
        }
    } catch (error) {
        res.status(500);
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
