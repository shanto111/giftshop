import { ConnectMongoDB } from "@/lib/connectMongodb";

export async function GET() {
  try {
    const db = await ConnectMongoDB();
    const products = await db.collection("product").find().toArray();

    return new Response(JSON.stringify({ success: true, products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch products" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
