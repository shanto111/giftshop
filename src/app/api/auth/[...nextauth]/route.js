import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ConnectMongoDB } from "@/lib/connectMongodb";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await ConnectMongoDB();
        const usersCollection = db.collection("users");

        // Find user by email
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) throw new Error("User not found");

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: "e5a03c4ad2f3a9b70962e97e1c79f54b7c3de41be53e59cfe1010a0131f6d7d3",
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
