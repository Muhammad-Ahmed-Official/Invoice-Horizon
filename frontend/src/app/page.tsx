'use client'

import { useAuth } from "@/redux/authProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user?.email) {
      router.replace("/home");
    } else {
      router.replace("/sign-in");
    }
  }, [user, loading, router]);

  return null;
}