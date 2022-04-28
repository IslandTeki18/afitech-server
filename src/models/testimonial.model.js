import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    testimonial: String,
    clientCompanyPosition: String,
    companyName: String,
    companyWebsite: String,
    companyLocation: String,
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testmonial", TestimonialSchema);
export default Testimonial;
