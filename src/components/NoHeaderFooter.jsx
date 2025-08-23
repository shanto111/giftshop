"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function NoHeaderFooter({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const role = session?.user?.role;
  const isAdmin = role === "admin";

  return (
    <div>
      {!isAdmin && <Navbar></Navbar>}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer></Footer>}
    </div>
  );
}
