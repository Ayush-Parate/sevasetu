/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage, { type Role } from "./components/LoginPage";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import NGOAdminDashboard from "./components/NGOAdminDashboard";
import FieldCoordinatorDashboard from "./components/FieldCoordinatorDashboard";
import VolunteerDashboard from "./components/VolunteerDashboard";
import VerifierDashboard from "./components/VerifierDashboard";
import DonorDashboard from "./components/DonorDashboard";
import LandingPage from "./pages/LandingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import RequireAuth from "./auth/RequireAuth";
import { useAuth } from "./auth/AuthContext";

function LoginRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refreshSession } = useAuth();
  const navState = location.state as { authMode?: "login" | "signup"; from?: { pathname?: string } } | null;
  const initialAuthMode = navState?.authMode ?? "login";
  const [preferredRole, setPreferredRole] = React.useState<Role | null>(null);

  if (user) return <Navigate to="/app" replace />;

  const handleBack = () => navigate("/", { replace: true });
  const from = navState?.from?.pathname;

  return (
    <LoginPage
      onBack={handleBack}
      initialAuthMode={initialAuthMode}
      initialRole={preferredRole}
      onSignupAccount={(role) => setPreferredRole(role)}
      onLoginSuccess={async (u) => {
        if (!u) return;
        await refreshSession();
        navigate(from || "/app", { replace: true });
      }}
    />
  );
}

function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (user.role === "Super Admin") return <SuperAdminDashboard onLogout={handleLogout} />;
  if (user.role === "NGO Admin") return <NGOAdminDashboard onLogout={handleLogout} />;
  if (user.role === "Field Coordinator") return <FieldCoordinatorDashboard onLogout={handleLogout} />;
  if (user.role === "Volunteer") return <VolunteerDashboard onLogout={handleLogout} />;
  if (user.role === "Verifier") return <VerifierDashboard onLogout={handleLogout} />;
  if (user.role === "Donor") return <DonorDashboard onLogout={handleLogout} />;

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-600">
      Dashboard for {user.role} is not implemented.
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onLoginClick={() => navigate("/login")}
            onSignupClick={() => navigate("/login", { state: { authMode: "signup" } })}
          />
        }
      />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppShell />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
