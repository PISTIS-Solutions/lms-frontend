"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AuthCallbackInner = () => {
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

const AuthCallback = () => (
  <Suspense fallback={<p>Processing authentication...</p>}>
    <AuthCallbackInner />
  </Suspense>
);

export default AuthCallback;
