'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/auth/login",
}) => {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
