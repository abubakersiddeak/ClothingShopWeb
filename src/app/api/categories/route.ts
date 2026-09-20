import { NextRequest, NextResponse } from "next/server";

import Category from "@/models/Category";
import { connectDB } from "@/lib/db";

// GET /api/categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ order: 1 });

    return NextResponse.json(
      {
        success: true,
        categories,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get categories error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 },
    );
  }
}

// POST /api/categories
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const category = await Category.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create category error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category",
      },
      { status: 500 },
    );
  }
}
