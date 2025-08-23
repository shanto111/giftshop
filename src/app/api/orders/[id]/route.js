import { ConnectMongoDB } from "@/lib/connectMongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { status } = await req.json();

  try {
    const db = await ConnectMongoDB();

    await db
      .collection("orders")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    return NextResponse.json({ success: true, message: "Order updated" });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
