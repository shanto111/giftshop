import { ConnectMongoDB } from "@/lib/connectMongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  const db = await ConnectMongoDB();
  const users = await db.collection("users").find().toArray();

  return NextResponse.json(users);
}

export async function DELETE(req) {
  const db = await ConnectMongoDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  await db.collection("users").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ message: "User deleted successfully" });
}

export async function PUT(req) {
  const db = await ConnectMongoDB();
  const { id, role } = await req.json();

  if (!id || !role) {
    return NextResponse.json(
      { message: "ID and Role are required" },
      { status: 400 }
    );
  }

  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { role } });

  return NextResponse.json({ message: "Role updated successfully" });
}
