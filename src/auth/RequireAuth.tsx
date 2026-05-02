import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { BackendRole } from "../lib/api";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ allowedRoles }: { allowedRoles?: BackendRole[] }) {
  const { status, user } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Restoring session…
      </div>
    );
  }

  if (!user || status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}

