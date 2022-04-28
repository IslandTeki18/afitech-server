import mongoose from "mongoose";

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
    images: [String],
    serviceFeatures: [
      {
        title: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", ServiceSchema);
export default Service;
