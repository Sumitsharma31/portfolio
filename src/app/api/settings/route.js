import connectToDatabase from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    // Find the first settings document, or return default empty string if none exists
    const settings = await Settings.findOne({});
    return NextResponse.json({ whatsappNumber: settings?.whatsappNumber || "" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (body.whatsappNumber === undefined) {
      return NextResponse.json({ error: "whatsappNumber is required" }, { status: 400 });
    }

    // Upsert a single settings document
    let settings = await Settings.findOne({});
    if (settings) {
      settings.whatsappNumber = body.whatsappNumber;
      await settings.save();
    } else {
      settings = await Settings.create({ whatsappNumber: body.whatsappNumber });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
