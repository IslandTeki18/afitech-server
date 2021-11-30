import mongoose from "mongoose";

const ServiceFeatureSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
});

const ServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: false,
        },
        longDescription: {
            type: String,
        },
        shortDescription: {
            type: String,
        },
        images: [{ type: String }],
        serviceFeatures: [ServiceFeatureSchema],
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", ServiceSchema);
export default Service;
