import { ConnectMongoDB } from "@/lib/connectMongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET a single product by ID
export async function GET(req, { params }) {
  try {
    const db = await ConnectMongoDB();
    const product = await db.collection("product").findOne({
      _id: new ObjectId(params.id),
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH (Update) a product by ID
export async function PATCH(req, { params }) {
  try {
    const data = await req.json();

    const db = await ConnectMongoDB();
    const result = await db
      .collection("product")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: data });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a product by ID
export async function DELETE(req, { params }) {
  try {
    const db = await ConnectMongoDB();
    const result = await db.collection("product").deleteOne({
      _id: new ObjectId(params.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Product not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
