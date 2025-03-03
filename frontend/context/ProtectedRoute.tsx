"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./AuthContext";

const ProtectedRoute = ({ children, redirectTo = "/auth/login" }) => {
    const user = useUser();
    const router = useRouter();
    useEffect(() => {
        if(!user) {
            router.replace(redirectTo);
        }
    }, [user, router, redirectTo]);


    return user ? children : null;
}

export default ProtectedRoute;