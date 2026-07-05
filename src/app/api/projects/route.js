import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Auto-generate image from Unsplash if not provided
    if (!body.image) {
      try {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        const query = encodeURIComponent(body.title || "technology");
        
        if (accessKey) {
          const unsplashRes = await fetch(`https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${accessKey}`);
          if (unsplashRes.ok) {
            const data = await unsplashRes.json();
            body.image = data.urls.regular;
          }
        }
        
        // Graceful Fallback if API key is missing or invalid
        if (!body.image) {
          body.image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";
        }
      } catch (err) {
        console.error("Unsplash generation failed:", err);
        body.image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop";
      }
    }

    await connectToDatabase();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
