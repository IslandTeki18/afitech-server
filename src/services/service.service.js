import Service from "../models/service.model.js";

//@desc     Get all Services
//@route    GET /api/services/
//@access   Public
const getAllService = async (req, res, next) => {
    try {
        const services = await Service.find({});
        if (!services) res.status(404).send({ msg: "Services not found." });
        res.json(services);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Get Single Service
//@route    GET /api/services/:id
//@access   Public
const getSingleService = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) res.status(404).send({ msg: "Service not found." });
        res.json(service);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Create Service
//@route    POST /api/services
//@access   Private
const createService = async (req, res, next) => {
    try {
        const newService = new Service({
            title: req.body.title,
            type: req.body.type,
            isAvailable: req.body.isAvailable,
            longDescription: req.body.longDescription,
            shortDescription: req.body.shortDescription,
            images: [!req.body.images ? "No Images Found." : req.body.images],
            serviceFeatures: [],
        });
        await newService.save();
        res.json(newService);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Create Service Feature
//@route    POST /api/services/:id/feature
//@access   Private
const createServiceFeature = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) res.status(404).send({ msg: "Service not found." });
        const feature = {
            title: req.body.title,
            description: req.body.description,
        };
        service.serviceFeatures.push(feature);
        await service.save();
        res.status(200).json({ msg: "Service Feature Created!", service });
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Remove Service Feature
//@route    DELETE /api/services/:id/:feature_id
//@access   Private
const removeServiceFeature = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) res.status(404).send({ msg: "Service not found." });
        const newServiceFeatures = service.serviceFeatures.filter(
            (item) => item._id !== req.params.feature_id
        );
        newServiceFeatures.pop();
        service.serviceFeatures = newServiceFeatures;
        await service.save();
        res.status(200).json({ msg: "Service Feature Removed", service });
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Update Service Feature
//@route    PUT /api/services/:id/update
//@access   Private
const updateServiceFeature = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            {
                _id: req.params.id,
            },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                },
            },
            {
                new: true,
            }
        );
        if (!service) res.status(404).send({ msg: "Service not found." });
        res.status(200).json({ msg: "Service Feature Updated!", service });
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Update a Service
//@route    PUT /api/services/:id
//@access   Private
const updateAService = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) res.status(404).send({ msg: "Service not found." });
        if (service) {
            service.title = req.body.title || service.title;
            service.type = req.body.type || service.type;
            service.shortDescription =
                req.body.shortDescription || service.shortDescription;
            service.longDescription =
                req.body.longDescription || service.longDescription;
            service.isAvailable = req.body.isAvailable || service.isAvailable;
            service.images = [req.body.images] || [service.images];
        }
        await service.save();
        res.json(service);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Remove a Service
//@route    DELETE /api/services/:id
//@access   Private
const removeService = async (req, res, next) => {
    try {
        const service = await Service.findById({ _id: req.params.id });
        if (!service) res.status(404).send({ msg: "Service not found." });
        if (service) {
            await service.remove();
            res.json({ message: "Service Removed" });
        }
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

export {
    getAllService,
    getSingleService,
    createService,
    createServiceFeature,
    updateAService,
    updateServiceFeature,
    removeServiceFeature,
    removeService,
};
