import { ConnectMongoDB } from "@/lib/connectMongodb";

export async function POST(req) {
  const { productData } = await req.json();

  const db = await ConnectMongoDB();
  const result = await db.collection("product").insertOne(productData);

  return new Response(
    JSON.stringify({ message: "Product added successfully", result }),
    {
      status: 201,
    }
  );
}
