import connectToDatabase from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    return NextResponse.json(resume || { url: "" });
  } catch (error) {
    console.error("Error fetching resume:", error);
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newResume = await Resume.create(body);
    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("Error updating resume:", error);
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}
