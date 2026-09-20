import { NextRequest, NextResponse } from "next/server";

import Product from "@/models/Product";
import { connectDB } from "@/lib/db";
import ProductVariant from "@/models/ProductVariant";
import { IProductVariant } from "@/types/ProductVariant";

// GET /api/products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 },
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { productVariants, ...productData } = body;
    const product = await Product.create(productData);

    // 2. Create Product Variants
    const variants = productVariants.map((variant: IProductVariant) => ({
      ...variant,
      product: product._id,
    }));

    const createdVariants = await ProductVariant.insertMany(variants);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product,
        productVariants: createdVariants,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 },
    );
  }
}
