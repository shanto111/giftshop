import { ConnectMongoDB } from "@/lib/connectMongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const db = await ConnectMongoDB();
    const product = await db.collection("product").findOne({
      _id: new ObjectId(params.id),
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
