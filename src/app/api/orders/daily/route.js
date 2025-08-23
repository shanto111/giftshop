import { ConnectMongoDB } from "@/lib/connectMongodb";

export async function GET() {
  try {
    const db = await ConnectMongoDB();
    const ordersCollection = db.collection("orders");

    // Aggregate orders by date and count total orders per day
    const dailyOrders = await ordersCollection
      .aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
            totalOrders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return new Response(JSON.stringify(dailyOrders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
