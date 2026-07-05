"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    link: "",
    srcLink: "",
  });
  const [resumeUrl, setResumeUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchResume();
    fetchSettings();
  }, []);

  const fetchResume = async () => {
    try {
      const res = await fetch("/api/resume");
      if (res.ok) {
        const data = await res.json();
        if (data.url) setResumeUrl(data.url);
      }
    } catch (error) {
      console.error("Failed to fetch resume");
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      }
    } catch (error) {
      console.error("Failed to fetch settings");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      technologies: formData.technologies.split(",").map(t => t.trim()),
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (res.ok) {
        toast.success("Project added successfully!");
        setFormData({ title: "", description: "", image: "", technologies: "", link: "", srcLink: "" });
        fetchProjects();
      } else {
        toast.error("Failed to add project");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: resumeUrl }),
      });
      if (res.ok) {
        toast.success("Resume updated successfully!");
      } else {
        toast.error("Failed to update resume");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleWhatsappSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber }),
      });
      if (res.ok) {
        toast.success("WhatsApp number updated successfully!");
      } else {
        toast.error("Failed to update WhatsApp number");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Form Section */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none h-24" />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Image URL</label>
            <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Technologies (comma separated)</label>
            <input type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" placeholder="React, Tailwind, Next.js" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Live Link</label>
              <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">Source Link</label>
              <input type="text" value={formData.srcLink} onChange={e => setFormData({...formData, srcLink: e.target.value})} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors">
            Save Project
          </button>
        </form>
      </div>

      {/* List Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Existing Projects</h2>
        {loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {projects.map((project) => (
              <div key={project._id} className="bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
                <h3 className="font-bold text-lg text-white">{project.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mt-1">{project.description}</p>
                <div className="flex gap-2 mt-3">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-gray-400">No projects found.</p>}
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl mt-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Update Resume</h2>
          <form onSubmit={handleResumeSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Resume PDF URL</label>
              <input type="text" required value={resumeUrl} onChange={e => setResumeUrl(e.target.value)} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-purple-500 outline-none" placeholder="https://example.com/resume.pdf" />
            </div>
            <button type="submit" className="w-full py-3 mt-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors">
              Save Resume Link
            </button>
          </form>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl mt-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Update WhatsApp Contact</h2>
          <form onSubmit={handleWhatsappSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">WhatsApp Number (with country code)</label>
              <input type="text" required value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 outline-none" placeholder="e.g. +919876543210" />
            </div>
            <button type="submit" className="w-full py-3 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors">
              Save WhatsApp Number
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
