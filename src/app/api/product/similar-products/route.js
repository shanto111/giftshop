import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { ConnectMongoDB } from "@/lib/connectMongodb";

export async function GET(req) {
  try {
    const db = await ConnectMongoDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Find the original product by ID
    const originalProduct = await db
      .collection("product")
      .findOne({ _id: new ObjectId(productId) });

    if (!originalProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Similar logic: find products from the same category (excluding the current product)
    const similarProducts = await db
      .collection("product")
      .find({
        category: originalProduct.category,
        _id: { $ne: new ObjectId(productId) }, // exclude the current product
      })
      .limit(4) // show max 4
      .toArray();

    return NextResponse.json(similarProducts);
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
