import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    gradient: { type: String, default: "from-emerald-400 to-cyan-400" },
    technologies: [{ type: String }],
    link: { type: String }, // Live project link
    srcLink: { type: String }, // GitHub link
    color: { type: String, default: "emerald" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
