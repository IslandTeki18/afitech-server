import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    image: String,
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
    position: String,
    aboutEmployee: String,
    socialMediaLinks: {
      youtube: String,
      linkedIn: String,
      twitter: String,
      github: String,
      facebook: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
