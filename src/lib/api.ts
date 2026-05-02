export type BackendRole =
  | "Super Admin"
  | "NGO Admin"
  | "Field Coordinator"
  | "Volunteer"
  | "Verifier"
  | "Donor";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: BackendRole;
  emailVerified?: boolean;
}

export interface SignupResult extends AuthUser {
  requiresVerification: boolean;
}

export interface ListedUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phone?: string | null;
  trustScore?: number;
  isActive?: boolean;
  emailVerified?: boolean;
  availabilityStatus?: string;
  createdAt?: string;
}

export interface BackendHealth {
  status: string;
  uptimeSeconds: number;
  timestamp: string;
}

export interface PublicRequestRecord {
  id: string;
  requestType: string;
  fullName: string;
  email: string;
  phone?: string;
  organizationName?: string;
  roleRequested?: string;
  message?: string;
  status: "NEW" | "IN_REVIEW" | "APPROVED" | "REJECTED";
  reviewNotes?: string;
  reviewedAt?: string;
  approvedUserId?: string;
  createdAt: string;
  reviewer?: { id: string; fullName: string; email: string; role: string };
  approvedUser?: { id: string; fullName: string; email: string; role: string };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  details?: string[];
}

const ACCESS_TOKEN_KEY = "needgraph.accessToken";
/**
 * - Dev (`vite`): `/api/v1` → proxied to `VITE_API_PROXY_TARGET` (see vite.config.ts).
 * - Prod build (e.g. Vercel `vercel.json` experimental backend): `/_/backend/api/v1`.
 * Override anytime with `VITE_API_BASE_URL` (e.g. absolute URL for split deployments).
 */
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "/api/v1" : "/_/backend/api/v1")
).replace(/\/$/, "");

function safeJsonParse(raw: string): unknown | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return null;
  }
}

function messageFromParsedBody(parsed: unknown): string {
  if (!parsed || typeof parsed !== "object") return "Request failed";
  const body = parsed as Record<string, unknown>;
  if (typeof body.message === "string" && body.message) return body.message;
  const details = body.details;
  if (Array.isArray(details) && typeof details[0] === "string") return details[0];
  return "Request failed";
}

function unwrapData<T>(parsed: unknown): T {
  if (!parsed || typeof parsed !== "object") return undefined as T;
  if ("data" in parsed) return (parsed as ApiResponse<T>).data;
  return undefined as T;
}

function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string | null) {
  if (!token) {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

async function request<T>(path: string, init: RequestInit = {}, allowRetry = true): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(init.headers);
  const isFormData = typeof FormData !== "undefined" && init.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include"
  });

  if (response.status === 401 && allowRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return request<T>(path, init, false);
    }
  }

  const raw = await response.text();
  const parsed = safeJsonParse(raw);

  if (!response.ok) {
    throw new Error(messageFromParsedBody(parsed));
  }

  return unwrapData<T>(parsed);
}

async function requestJson<T>(path: string, init: RequestInit = {}, allowRetry = true): Promise<T> {
  const token = getAccessToken();
  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include"
  });

  if (response.status === 401 && allowRetry) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return requestJson<T>(path, init, false);
    }
  }

  const raw = await response.text();
  const parsed = safeJsonParse(raw);

  if (!response.ok) {
    throw new Error(messageFromParsedBody(parsed));
  }

  return parsed as T;
}

async function refreshAccessToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      setAccessToken(null);
      return false;
    }

    const parsed = safeJsonParse(await response.text()) as ApiResponse<{ accessToken: string }> | null;
    const token = parsed && typeof parsed === "object" && parsed.data?.accessToken ? parsed.data.accessToken : null;
    if (!token) {
      setAccessToken(null);
      return false;
    }
    setAccessToken(token);
    return true;
  } catch {
    setAccessToken(null);
    return false;
  }
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  /** Public signup allows Volunteer or Donor only; other roles use access requests or admins. */
  role?: "Volunteer" | "Donor";
  phone?: string;
}

export async function login(payload: LoginPayload) {
  const data = await request<{ accessToken: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  }, false);

  setAccessToken(data.accessToken);
  return data.user;
}

export async function signup(payload: SignupPayload) {
  return request<SignupResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  }, false);
}

export async function forgotPassword(email: string) {
  return request<{ devResetToken?: string | null }>(
    "/auth/forgot-password",
    { method: "POST", body: JSON.stringify({ email }) },
    false
  );
}

export async function resetPassword(payload: { email: string; token: string; password: string }) {
  return request<{ ok: boolean }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload)
  }, false);
}

export async function verifyEmail(payload: { email: string; token: string }) {
  return request<{ id: string; fullName: string; email: string; role: string; alreadyVerified?: boolean }>(
    "/auth/verify-email",
    { method: "POST", body: JSON.stringify(payload) },
    false
  );
}

export async function getBackendHealth() {
  return request<BackendHealth>("/health", { method: "GET" }, false);
}

export async function logout() {
  try {
    await request("/auth/logout", { method: "POST" });
  } finally {
    setAccessToken(null);
  }
}

export async function getMe() {
  return request<AuthUser>("/auth/me", { method: "GET" });
}

export interface PublicRequestPayload {
  requestType: "DEMO_REQUEST" | "NGO_REGISTRATION" | "VOLUNTEER_INTEREST" | "DONOR_INTEREST" | "ACCOUNT_REQUEST";
  fullName: string;
  email: string;
  phone?: string;
  organizationName?: string;
  roleRequested?: string;
  message?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export async function createPublicRequest(payload: PublicRequestPayload) {
  return request("/public/requests", {
    method: "POST",
    body: JSON.stringify(payload)
  }, false);
}

export interface NeedPayload {
  title: string;
  description: string;
  location?: string;
  locationLat?: number;
  locationLng?: number;
  urgencyScore?: number;
}

export interface NeedRecord extends NeedPayload {
  id: string;
  aiLabel?: string;
  urgencyScore?: number;
  priorityScore?: number;
}

export async function createNeed(payload: NeedPayload) {
  return request<NeedRecord>("/needs", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function listNeeds() {
  return request<NeedRecord[]>("/needs", { method: "GET" });
}

export interface TaskPayload {
  needId?: string | null;
  title: string;
  description?: string;
  requiredSkills?: string[];
  requiredLanguage?: string;
  locationLat?: number;
  locationLng?: number;
  urgencyOverride?: number;
  dueDate?: string;
  volunteerRequirement?: number;
  proofRequired?: string[];
}

export async function createTask(payload: TaskPayload) {
  return request<any>("/tasks", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export interface TaskAssignee {
  id: string;
  fullName: string;
  email: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  assignee?: TaskAssignee | null;
  locationLat?: number | null;
  locationLng?: number | null;
  urgencyOverride?: number | null;
  volunteerRequirement?: number;
  completedAt?: string | null;
  createdAt?: string;
  needId?: string | null;
}

export async function listTasks() {
  return request<TaskRecord[]>("/tasks");
}

export async function listUsers() {
  return request<ListedUser[]>("/users");
}

export async function listPublicRequests(filters?: { status?: string; requestType?: string }) {
  const query = new URLSearchParams();
  if (filters?.status) query.set("status", filters.status);
  if (filters?.requestType) query.set("requestType", filters.requestType);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request<PublicRequestRecord[]>(`/public/requests${suffix}`);
}

export async function updatePublicRequestStatus(
  requestId: string,
  payload: { status: "NEW" | "IN_REVIEW" | "APPROVED" | "REJECTED"; reviewNotes?: string }
) {
  return request<PublicRequestRecord>(`/public/requests/${requestId}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export async function approvePublicRequest(
  requestId: string,
  payload: { fullName?: string; phone?: string; role: string; tempPassword: string; reviewNotes?: string }
) {
  return request<{ request: PublicRequestRecord; user: AuthUser; tempPassword: string }>(
    `/public/requests/${requestId}/approve`,
    {
      method: "POST",
      body: JSON.stringify(payload)
    }
  );
}

export async function matchVolunteers(taskId: string) {
  return requestJson<{ success: boolean; taskId: string; totalRanked: number; data: any[] }>(
    `/volunteer-matching/match-volunteers/${taskId}`
  );
}

export async function assignTask(taskId: string, volunteerId: string) {
  return request(`/tasks/${taskId}/assign`, {
    method: "PATCH",
    body: JSON.stringify({ volunteerId })
  });
}

export async function updateTaskStatus(taskId: string, status: string) {
  return request(`/tasks/${taskId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
}

export async function processTextInput(text: string) {
  return request<{ mode: string; normalizedText: string; classificationReady: boolean }>("/files/input/text", {
    method: "POST",
    body: JSON.stringify({ text })
  });
}

export async function processVoiceInput(file: File, fieldName = "file") {
  const formData = new FormData();
  formData.append(fieldName, file);
  return request<{ mode: string; transcript?: string; normalizedText?: string; classificationReady?: boolean }>(
    "/files/input/voice",
    {
      method: "POST",
      body: formData
    }
  );
}

export async function uploadEvidence(file: File, fieldName = "file") {
  const formData = new FormData();
  formData.append(fieldName, file);
  return request<{ extractedText?: string; originalName: string; mimeType: string }>("/files/upload", {
    method: "POST",
    body: formData
  });
}

export type HeatmapPointPayload = {
  location: string;
  lat: number;
  lng: number;
  needType?: string;
  severity?: number;
  notes?: string;
};

export async function getGeoHeatmap() {
  return request<any>("/geo-heatmap/heatmap", { method: "GET" });
}

export async function getGeoHotspots() {
  return request<any>("/geo-heatmap/hotspots", { method: "GET" });
}

export async function getGeoAreaSummary(location: string) {
  return request<any>(`/geo-heatmap/area-summary/${encodeURIComponent(location)}`, { method: "GET" });
}

export async function createHeatmapPoint(payload: HeatmapPointPayload) {
  return request<any>("/geo-heatmap", { method: "POST", body: JSON.stringify(payload) });
}

export interface ImpactSummary {
  totals: { tasksCompleted: number; peopleHelped: number };
  averages: { responseTimeHours: number; resolutionTimeHours: number };
  areaImprovementTrends: Array<{
    location: string;
    averageAreaImprovement: number;
    dataPoints: number;
  }>;
  volunteerPerformance: Array<{
    volunteerId: string;
    assignedCount: number;
    completedCount: number;
    successRate: number;
    avgResolutionHours: number;
  }>;
}

export async function getImpactSummary() {
  return request<ImpactSummary>("/impact-analytics/summary", { method: "GET" });
}

export async function getImpactTask(taskId: string) {
  return request<any>(`/impact-analytics/task/${encodeURIComponent(taskId)}`, { method: "GET" });
}

export async function getImpactArea(location: string) {
  return request<any>(`/impact-analytics/area/${encodeURIComponent(location)}`, { method: "GET" });
}

export interface AdminStats {
  totalUsers: number;
  activeNGOs: number;
  activeNeeds: number;
  completedTasks: number;
}

export async function getAdminStats() {
  return request<AdminStats>("/admin/stats", { method: "GET" });
}

export async function updateUserStatus(userId: string, isActive: boolean) {
  return request<{ id: string; isActive: boolean }>(`/users/${userId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ isActive })
  });
}

// ─── Fraud Detection ───────────────────────────────────────────────

export interface SuspiciousReport {
  id: string;
  title: string;
  location: string;
  count: number;
  riskLevel: "HIGH" | "MEDIUM";
  description: string;
  createdAt: string;
}

export interface FlaggedVolunteer {
  id: string;
  fullName: string;
  email: string;
  role: string;
  trustScore: number;
  recentCompletedTasks: number;
  probability: number;
  pattern: string;
  severity: "HIGH" | "MEDIUM";
}

export async function getSuspiciousReports() {
  return request<SuspiciousReport[]>("/admin/fraud/suspicious-reports", { method: "GET" });
}

export async function getFlaggedVolunteers() {
  return request<FlaggedVolunteer[]>("/admin/fraud/flagged-volunteers", { method: "GET" });
}

export async function penalizeTrustScore(userId: string, delta: number) {
  return request<{ id: string; trustScore: number }>(`/admin/fraud/volunteers/${userId}/trust`, {
    method: "PATCH",
    body: JSON.stringify({ delta })
  });
}

// ─── Platform Analytics ─────────────────────────────────────────────

export interface PlatformAnalytics {
  totalUsers: number;
  totalNeeds: number;
  totalTasks: number;
  completedTasks: number;
  openTasks: number;
  resolutionRate: number;
  roleDistribution: Record<string, number>;
  userGrowth: Array<{ label: string; count: number }>;
}

export async function getPlatformAnalytics() {
  return request<PlatformAnalytics>("/admin/analytics", { method: "GET" });
}

// ─── Emergency Stats ─────────────────────────────────────────────────

export interface EmergencyStats {
  criticalNeeds: number;
  urgentNeeds: number;
  availableVolunteers: number;
  activeNGOs: number;
}

export async function getEmergencyStats() {
  return request<EmergencyStats>("/admin/emergency-stats", { method: "GET" });
}

export async function getRoleDistribution() {
  return request<Array<{ role: string; count: number }>>("/admin/role-distribution", { method: "GET" });
}

// ─── NGO Administration ─────────────────────────────────────────────

export interface NGOStats {
  needs: {
    total: number;
    critical: number;
    highPriority: number;
    pending: number;
  };
  volunteers: {
    total: number;
    available: number;
    onTask: number;
    emergencyResponders: number;
  };
  tasks: {
    total: number;
    completed: number;
    completedToday: number;
    completedThisWeek: number;
    open: number;
    resolutionRate: number;
  };
}

export interface EnrichedVolunteer {
  id: string;
  fullName: string;
  email: string;
  role: string;
  availabilityStatus: string;
  trustScore: number;
  skills?: string[];
  locationLat?: number;
  locationLng?: number;
  createdAt?: string;
  taskCount: number;
  completedCount: number;
  successRate: number;
}

export async function getNGOStats() {
  return request<NGOStats>("/ngo/stats", { method: "GET" });
}

export async function listNGOVolunteers(status?: string) {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return request<EnrichedVolunteer[]>(`/ngo/volunteers${query}`, { method: "GET" });
}

export async function listNGOFieldCoordinators() {
  return request<any[]>("/ngo/field-coordinators", { method: "GET" });
}

export async function updateNeedStatus(id: string, status: string) {
  return request<{ success: boolean }>(`/needs/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
}

// ─── Field Coordinator Administration ─────────────────────────────────────────────

export interface FCStats {
  assignedTasks: number;
  completedTasks: number;
  resolutionRate: string;
  pendingVerifications: number;
  activeVolunteers: number;
  emergencyAlerts: number;
  responseSpeed: string;
  communityTrust: string;
}

export async function getFCStats() {
  return request<FCStats>("/fc/stats", { method: "GET" });
}

export async function listFCVolunteers() {
  return request<any[]>("/fc/volunteers", { method: "GET" });
}

// ─── Volunteer Dashboard ────────────────────────────────────────────────────────

export interface VolunteerStats {
  activeTasks: number;
  completedTasks: number;
  impactScore: number;
  trustScore: number;
  hoursLogged: number;
  rank: string;
}

export async function getVolunteerStats() {
  return request<VolunteerStats>("/volunteer/stats", { method: "GET" });
}

// ─── Verifier Dashboard ────────────────────────────────────────────────────────

export interface VerifierStats {
  pendingVerifications: number;
  emergencyClaims: number;
  completedToday: number;
  fraudAlerts: number;
  duplicateCount: number;
  trustReviews: number;
  verificationSpeed: string;
  resolutionAccuracy: string;
}

export async function getVerifierStats() {
  return request<VerifierStats>("/verifier/stats", { method: "GET" });
}

// ─── CSR / Donor Dashboard ────────────────────────────────────────────────────────

export interface DonorStats {
  activeFundingProjects: number;
  verifiedNeeds: number;
  totalVolunteers: number;
  completedTasks: number;
  livesImpacted: number;
  totalImpactCapital: string;
  sdgTargetsHit: string;
  resolutionEfficiency: string;
}

export async function getDonorStats() {
  return request<DonorStats>("/donor/stats", { method: "GET" });
}

export interface DonorMarketplaceItem {
  id: string;
  title: string;
  ngo: string;
  location: string;
  goal: string;
  raised: string;
  backers: number;
  impact: string;
  urgency: string;
  category: string;
  image: string;
}

export async function getDonorMarketplace() {
  return request<DonorMarketplaceItem[]>("/donor/marketplace", { method: "GET" });
}

export interface DonorLedgerItem {
  id: string;
  date: string;
  entity: string;
  amount: string;
  status: string;
  type: string;
  purpose: string;
}

export async function getDonorLedger() {
  return request<DonorLedgerItem[]>("/donor/ledger", { method: "GET" });
}
