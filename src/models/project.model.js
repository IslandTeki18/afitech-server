import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "This field is required."],
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        shortDescription: {
            type: String,
            required: [true, "This field is required."],
        },
        longDescription: {
            type: String,
            required: [true, "This field is required."],
        },
        images: [
            {
                type: String,
            },
        ],
        projectType: {
            type: String,
            required: [true, "This field is required."],
        },
        projectStatus: {
            type: String,
            required: [true, "This field is required."],
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        projectUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
