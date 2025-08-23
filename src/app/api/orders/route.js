import { ConnectMongoDB } from "@/lib/connectMongodb";
import { NextResponse } from "next/server";

//send data mongodb
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("order data", body);
    const db = await ConnectMongoDB();
    const result = await db.collection("orders").insertOne(body);

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
// get data with or without email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const db = await ConnectMongoDB();
    let orders;

    if (email) {
      orders = await db
        .collection("orders")
        .find({ userEmail: email })
        .toArray();
    } else {
      orders = await db.collection("orders").find({}).toArray();
    }

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
