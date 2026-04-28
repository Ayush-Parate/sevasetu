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
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api/v1").replace(/\/$/, "");

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
  const parsed = raw ? JSON.parse(raw) : null;

  if (!response.ok) {
    throw new Error(parsed?.message || parsed?.details?.[0] || "Request failed");
  }

  return (parsed as ApiResponse<T>).data;
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

  const parsed = await response.json();
  if (!response.ok) {
    throw new Error(parsed?.message || parsed?.details?.[0] || "Request failed");
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

    const parsed = (await response.json()) as ApiResponse<{ accessToken: string }>;
    setAccessToken(parsed.data.accessToken);
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

export async function login(payload: LoginPayload) {
  const data = await request<{ accessToken: string; user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  }, false);

  setAccessToken(data.accessToken);
  return data.user;
}

export async function logout() {
  try {
    await request("/auth/logout", { method: "POST" });
  } finally {
    setAccessToken(null);
  }
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

export async function listTasks() {
  return request<any[]>("/tasks");
}

export async function listUsers() {
  return request<any[]>("/users");
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

export async function uploadEvidence(file: File, fieldName = "file") {
  const formData = new FormData();
  formData.append(fieldName, file);
  return request<{ extractedText?: string; originalName: string; mimeType: string }>("/files/upload", {
    method: "POST",
    body: formData
  });
}
