import Service from "../models/service.model.js";

//@desc     Get all Services
//@route    GET /api/services/
//@access   Public
const getAllService = async (req, res, next) => {
    try {
        const services = await Service.find({});
        if (!services) {
            res.status(404);
            throw new Error("No services found.");
        }
        res.json(services);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Get Single Service
//@route    GET /api/services/:id
//@access   Public
const getSingleService = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) {
            res.status(404);
            throw new Error("No service found.");
        }
        res.json(service);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Create Service
//@route    GET /api/services/
//@access   Private
const createAService = async (req, res, next) => {
    try {
        const service = new Service({
            title: req.body.title,
            type: req.body.type,
            isAvailable: req.body.isAvailable,
            longDescription: req.body.longDescription,
            shortDescription: req.body.shortDescription,
            images: [req.body.images],
            serviceFeatures: [
                {
                    title: req.body.title,
                    description: req.body.description,
                },
            ],
        });
        await service.save();
        res.json(service);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Update a Service
//@route    GET /api/services/:id
//@access   Private
const updateAService = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) {
            res.status(404);
            throw new Error("No service found.");
        }
        if (service) {
            service.title = req.body.title || service.title;
            service.type = req.body.type || service.type;
            service.shortDescription =
                req.body.shortDescription || service.shortDescription;
            service.longDescription =
                req.body.longDescription || service.longDescription;
            service.isAvailable = req.body.isAvailable || service.isAvailable;
            service.images = [req.body.images] || [service.images];
            service.serviceFeatures = [req.body.serviceFeatures] || [
                service.serviceFeatures,
            ];
        }
        await service.save();
        res.json(service);
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

//@desc     Remove a Service
//@route    GET /api/services/:id
//@access   Private
const removeService = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) {
            res.status(404);
            throw new Error("Service not found.");
        }
        if (service) {
            await service.remove();
            res.json({ message: "Service Removed" });
        }
    } catch (error) {
        res.status(401);
        return next(error);
    }
};

export {
    getAllService,
    getSingleService,
    createAService,
    updateAService,
    removeService,
};
