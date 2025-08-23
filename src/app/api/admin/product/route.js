import { ConnectMongoDB } from "@/lib/connectMongodb";
import { NextResponse } from "next/server";

// GET all products
export async function GET() {
  try {
    const db = await ConnectMongoDB();
    const products = await db.collection("product").find().toArray();
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// add new product
export async function POST(req) {
  try {
    const { productData } = await req.json();

    if (!productData) {
      return NextResponse.json(
        { success: false, message: "Product data is required" },
        { status: 400 }
      );
    }

    const db = await ConnectMongoDB();
    const result = await db.collection("product").insertOne(productData);

    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
