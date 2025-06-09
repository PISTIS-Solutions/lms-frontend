"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authToken = searchParams.get("token");

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);

      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  }, [authToken, router]);

  return <p>Processing authentication...</p>;
};

export default AuthCallback;
