require("dotenv").config();

async function jsonFetch(url, init = {}) {
  const response = await fetch(url, init);
  const text = await response.text();
  const parsed = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const message = parsed?.message || `HTTP ${response.status}`;
    const details = parsed?.details?.length ? ` (${parsed.details.join(", ")})` : "";
    throw new Error(`${init.method || "GET"} ${url} failed: ${message}${details}`);
  }
  return parsed;
}

async function run() {
  const base = "http://localhost:5000/api/v1";

  const login = await jsonFetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "superadmin@janconnect.local", password: "Password@123" })
  });
  const token = login.data.accessToken;
  const authHeaders = { Authorization: `Bearer ${token}` };

  const created = await jsonFetch(`${base}/public/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requestType: "ACCOUNT_REQUEST",
      fullName: "Smoke Test User",
      email: `smoke.${Date.now()}@example.com`,
      roleRequested: "Volunteer",
      message: "Smoke test"
    })
  });

  const list = await jsonFetch(`${base}/public/requests`, { headers: authHeaders });
  const requestId = created.data.id;
  const exists = list.data.some((r) => r.id === requestId);
  if (!exists) throw new Error("Created request not returned in list");

  const approve = await jsonFetch(`${base}/public/requests/${requestId}/approve`, {
    method: "POST",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ role: "Volunteer", tempPassword: "TempPass@123", reviewNotes: "approved in smoke test" })
  });

  const users = await jsonFetch(`${base}/users`, { headers: authHeaders });
  const approvedEmail = approve.data.user.email;
  const userExists = users.data.some((u) => u.email === approvedEmail);
  if (!userExists) throw new Error("Approved user not found in /users list");

  const createdTask = await jsonFetch(`${base}/tasks`, {
    method: "POST",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "Smoke Test Task",
      description: "Dispatch verification",
      requiredSkills: ["first aid"],
      requiredLanguage: "hindi",
      urgencyOverride: 80,
      volunteerRequirement: 1,
      proofRequired: ["PHOTO", "GPS"]
    })
  });

  const tasks = await jsonFetch(`${base}/tasks`, { headers: authHeaders });
  const taskExists = tasks.data.some((t) => t.id === createdTask.data.id);
  if (!taskExists) throw new Error("Created task not returned in /tasks list");

  const match = await jsonFetch(`${base}/volunteer-matching/match-volunteers/${createdTask.data.id}`, {
    headers: authHeaders
  });
  if (!Array.isArray(match.data)) throw new Error("Match response missing data array");

  console.log("smoke ok", {
    requestId,
    approvedEmail,
    totalUsers: users.data.length,
    createdTaskId: createdTask.data.id,
    rankedVolunteers: match.data.length
  });
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

