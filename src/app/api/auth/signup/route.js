import { ConnectMongoDB } from "@/lib/connectMongodb";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "All fields required" }), {
      status: 400,
    });
  }

  const db = await ConnectMongoDB();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), {
      status: 409,
    });
  }

  const hashedPassword = await hash(password, 12);

  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return new Response(JSON.stringify(result, { message: "User created" }), {
    status: 201,
  });
}
