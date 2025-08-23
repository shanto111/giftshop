"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const role = session?.user?.role;

    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "user") {
      router.replace("/dashboard/user");
    } else {
      router.replace("/login");
    }
  }, [session, status, router]);

  return <p className="text-center mt-10">Redirecting to your dashboard...</p>;
}
