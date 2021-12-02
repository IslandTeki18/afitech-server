import Testimonial from "../models/testimonial.model.js";

//@desc     Get All Testimonials
//@route    GET /api/testimonials
//@access   Public
const getAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({});
        if (!testimonials)
            return res.status(404).send({ msg: "Testimonials Not Found." });
        res.json(testimonials);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Get Single Testimonial
//@route    GET /api/testimonials/:id
//@access   Public
const getSingleTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById({ _id: req.params.id });
        if (!testimonial)
            return res.status(404).send({ msg: "Testimonial Not Found." });
        res.json(testimonial);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Create Testimonial
//@route    POST /api/testimonials
//@access   Private
const createTestimonial = async (req, res, next) => {
    try {
        const testimonial = new Testimonial({
            name: req.body.name,
            image: req.body.image,
            testimonial: req.body.testimonial,
            clientCompanyPosition: req.body.clientCompanyPosition,
            companyName: req.body.companyName,
            companyWebsite: req.body.companyWebsite,
            companyLocation: req.body.companyLocation,
        });
        await testimonial.save();
        res.json(testimonial);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Update Testimonial
//@route    PUT /api/testimonials/:id
//@access   Private
const updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById({ _id: req.params.id });
        if (!testimonial)
            return res.status(404).send({ msg: "Testmonial Not Found." });
        if (testimonial) {
            testimonial.name = req.body.name || testimonial.name;
            testimonial.image = req.body.image || testimonial.image;
            testimonial.testimonial =
                req.body.testimonial || testimonial.testimonial;
            testimonial.clientCompanyPosition =
                req.body.clientCompanyPosition ||
                testimonial.clientCompanyPosition;
            testimonial.companyName =
                req.body.companyName || testimonial.companyName;
            testimonial.companyWebsite =
                req.body.companyWebsite || testimonial.companyWebsite;
            testimonial.companyLocation =
                req.body.companyLocation || testimonial.companyLocation;
            testimonial.isActive = req.body.isActive || testimonial.isActive;
        }
        await testimonial.save();
        res.json({ msg: "Testomonial Update!", testimonial });
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Remove Testimonial
//@route    DELETE /api/testimonials/:id
//@access   Private
const removeTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById({ _id: req.params.id });
        await testimonial.remove();
        res.send({ msg: "Testimonial Removed!" });
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

export {
    getAllTestimonials,
    getSingleTestimonial,
    createTestimonial,
    updateTestimonial,
    removeTestimonial
};
