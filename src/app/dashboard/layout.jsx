"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      const role = session?.user?.role;

      if (pathname === "/dashboard") {
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/user");
        }
      }
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return <p>Loding...</p>;
  }

  return <>{children}</>;
}
