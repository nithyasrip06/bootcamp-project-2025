import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import Project from "@/database/projectSchema";

export async function GET() {
  try {
    await connectDB();

    // query for all projects and sort by date (newest first)
    const projects = await Project.find().sort({ date: -1 }).orFail();
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json("Projects not found.", { status: 404 });
  }
}

