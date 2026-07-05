import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }, // Cloudinary PDF URL
    version: { type: String, default: "1.0" },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
