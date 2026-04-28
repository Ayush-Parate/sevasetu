import React, { useEffect, useMemo, useState } from "react";
import {
  ClipboardList,
  Plus,
  Brain,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  AlertTriangle,
  Save,
  Wand2,
  Star,
  UserCheck,
  Navigation2,
  Repeat,
  ShieldAlert,
  FileText,
  Camera,
  FileSignature,
  ChevronRight,
  Activity,
  Calendar,
  Zap,
  ListTodo,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../Toast";
import { assignTask, createTask, listTasks, listUsers, matchVolunteers, updateTaskStatus } from "../../lib/api";

type SubView = "tracker" | "create" | "assign";

export default function TaskAssignmentCenter() {
  const [activeView, setActiveView] = useState<SubView>("tracker");
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [rankedVolunteers, setRankedVolunteers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    category: "Relief Supplies",
    urgency: 60,
    location: "",
    dueDate: "",
    requiredSkills: "First Aid, Heavy Lifting",
    volunteerRequirement: 2,
    requiredLanguage: "",
    proofPhoto: true,
    proofGps: true,
    proofSignature: false,
    description: ""
  });

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) || tasks[0] || null,
    [selectedTaskId, tasks]
  );

  useEffect(() => {
    void refreshData();
  }, []);

  async function refreshData() {
    setIsLoading(true);
    try {
      const [taskData, userData] = await Promise.all([listTasks(), listUsers()]);
      setTasks(taskData);
      setVolunteers(userData.filter((user) => user.role === "Volunteer"));
      if (!selectedTaskId && taskData[0]?.id) {
        setSelectedTaskId(taskData[0].id);
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to load task center data", "error");
    } finally {
      setIsLoading(false);
    }
  }

  const handleAction = (action: string, details?: string) => {
    showToast(`${action} ${details ? `- ${details}` : ""} processed successfully.`, "success");
    if (activeView === "create" || activeView === "assign") {
      setActiveView("tracker");
    }
  };

  function parseSkills(value: string) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function handleCreateTask() {
    setIsSubmitting(true);
    try {
      await createTask({
        title: taskForm.title,
        description: taskForm.description || `${taskForm.category} deployment at ${taskForm.location}`,
        requiredSkills: parseSkills(taskForm.requiredSkills),
        requiredLanguage: taskForm.requiredLanguage || undefined,
        urgencyOverride: taskForm.urgency,
        dueDate: taskForm.dueDate || undefined,
        volunteerRequirement: taskForm.volunteerRequirement,
        proofRequired: [
          taskForm.proofPhoto ? "PHOTO" : null,
          taskForm.proofGps ? "GPS" : null,
          taskForm.proofSignature ? "SIGNATURE" : null
        ].filter(Boolean) as string[]
      });
      await refreshData();
      showToast("New task created in backend.", "success");
      setActiveView("tracker");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to create task", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRunMatching() {
    if (!selectedTask) {
      showToast("No task selected for matching.", "warning");
      return;
    }

    try {
      const response = await matchVolunteers(selectedTask.id);
      setRankedVolunteers(response.data);
      showToast(`Ranked ${response.totalRanked} volunteers for the selected task.`, "success");
      setActiveView("assign");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to rank volunteers", "error");
    }
  }

  async function handleAssignVolunteer(volunteerId: string, volunteerName: string) {
    if (!selectedTask) return;
    try {
      await assignTask(selectedTask.id, volunteerId);
      await refreshData();
      showToast(`Assigned ${volunteerName} to task ${selectedTask.title}.`, "success");
      setActiveView("tracker");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to assign volunteer", "error");
    }
  }

  async function handleStatusUpdate(taskId: string, status: string, message: string) {
    try {
      await updateTaskStatus(taskId, status);
      await refreshData();
      showToast(message, "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Unable to update task status", "error");
    }
  }

  const renderCreate = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            New Task Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Task Title
              </label>
              <input
                type="text"
                placeholder="e.g. Deliver 50 Blankets to Sector 4"
                value={taskForm.title}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Need Category
                </label>
                <select value={taskForm.category} onChange={(e) => setTaskForm((prev) => ({ ...prev, category: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none hover:bg-slate-100 cursor-pointer">
                  <option>Relief Supplies</option>
                  <option>Medical Assistance</option>
                  <option>Rescue / Evacuation</option>
                  <option>Food Distribution</option>
                  <option>Shelter Setup</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                  Urgency Level
                </label>
                <select value={taskForm.urgency} onChange={(e) => setTaskForm((prev) => ({ ...prev, urgency: Number(e.target.value) }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none hover:bg-slate-100 cursor-pointer">
                  <option value={40}>Routine (Within 48h)</option>
                  <option value={75}>High (Within 12h)</option>
                  <option value={95}>Critical (Immediate)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <MapPin size={14} /> Location
                </label>
                <input
                  type="text"
                  placeholder="Enter coordinates or address"
                  value={taskForm.location}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                  <Calendar size={14} /> Deadline
                </label>
                <input
                  type="datetime-local"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none text-slate-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">
            Requirements
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="e.g. Medical, Driving, Language..."
                value={taskForm.requiredSkills}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, requiredSkills: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {parseSkills(taskForm.requiredSkills).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                <UserCheck size={14} /> Volunteer Requirement
              </label>
              <input
                type="number"
                min="1"
                placeholder="Number of volunteers"
                value={taskForm.volunteerRequirement}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, volunteerRequirement: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Required Language
              </label>
              <input
                type="text"
                placeholder="e.g. Hindi"
                value={taskForm.requiredLanguage}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, requiredLanguage: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Task Description
              </label>
              <textarea
                value={taskForm.description}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full min-h-[120px] bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                placeholder="Operational notes, delivery details, or deployment context"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2 font-mono tracking-widest text-[#5D8D70]">
                Proof Required
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-green w-4 h-4 cursor-pointer"
                    checked={taskForm.proofPhoto}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, proofPhoto: e.target.checked }))}
                  />
                  <Camera size={16} className="text-slate-400" /> Photo
                  Verification
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-green w-4 h-4 cursor-pointer"
                    checked={taskForm.proofGps}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, proofGps: e.target.checked }))}
                  />
                  <MapPin size={16} className="text-slate-400" /> GPS Location
                  Ping
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">
                  <input
                    type="checkbox"
                    className="accent-brand-green w-4 h-4 cursor-pointer"
                    checked={taskForm.proofSignature}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, proofSignature: e.target.checked }))}
                  />
                  <FileSignature size={16} className="text-slate-400" />{" "}
                  Recipient Signature
                </label>
              </div>
            </div>
          </div>
        </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRunMatching}
              className="w-full py-3.5 bg-gradient-to-r from-brand-green to-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-brand-green/20 hover:shadow-xl hover:from-emerald-500 hover:to-brand-green transition-all flex items-center justify-center gap-2"
            >
              <Wand2 size={18} /> Auto Match Volunteers
            </button>
            <button
              onClick={handleCreateTask}
              disabled={isSubmitting || !taskForm.title.trim()}
              className="w-full py-3.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={18} /> {isSubmitting ? "Creating..." : "Create Task"}
            </button>
            <button
              onClick={() => showToast("Draft preserved locally in the form.", "info")}
              className="w-full py-3.5 bg-white text-slate-700 border border-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Draft
            </button>
          </div>
      </div>
    </div>
  );

  const renderAssign = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-4 space-y-4 max-h-[800px] overflow-y-auto custom-scrollbar shadow-sm">
        <div className="mb-4">
          <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
            <ListTodo size={18} className="text-indigo-500" /> Pending
            Assignments
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-6">
            12 Tasks awaiting deployment
          </p>
        </div>
        {(tasks.length ? tasks : []).map((task, i) => (
          <div
            key={task.id}
            onClick={() => setSelectedTaskId(task.id)}
            className={`p-4 rounded-2xl border ${selectedTask?.id === task.id ? "border-indigo-500 bg-indigo-50/50 shadow-md shadow-indigo-500/10" : "border-slate-100 bg-white hover:border-slate-300"} cursor-pointer transition-colors relative overflow-hidden group`}
          >
            {selectedTask?.id === task.id && (
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
            )}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400">
                {task.id.slice(0, 8)}
              </span>
              {(task.urgencyOverride || 0) >= 75 && (
                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded uppercase">
                  Urgent
                </span>
              )}
            </div>
            <h4
              className={`font-bold ${selectedTask?.id === task.id ? "text-indigo-900" : "text-slate-800"} text-sm mb-1 group-hover:text-indigo-600 transition-colors`}
            >
              {task.title}
            </h4>
            <div className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
              <MapPin size={10} /> {task.location || "Location pending"}
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-800 shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3"></div>
          <div className="relative z-10 w-full">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="text-brand-green" size={20} />
              <h3 className="font-bold text-slate-100 text-lg">
                Smart Assignment Engine for {selectedTask ? selectedTask.title : "No Task Selected"}
              </h3>
            </div>
            <p className="text-sm text-slate-400">
              AI has ranked available volunteers based on proximity, skills, and
              historical trust metric vectors.
            </p>
          </div>
          <button className="shrink-0 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors w-full md:w-auto relative z-10 shadow-lg shadow-black/20">
            Open Volunteer Pool
          </button>
        </div>

        <div className="space-y-4">
          {(rankedVolunteers.length ? rankedVolunteers : volunteers.slice(0, 5).map((volunteer) => ({
            volunteerId: volunteer.id,
            volunteerName: volunteer.fullName,
            score: Math.round(volunteer.trustScore || 0),
            breakdown: {
              distanceKm: null,
              trustScore: volunteer.trustScore || 0,
              languageCompatibility: volunteer.languages?.length ? 100 : 0
            },
            availabilityStatus: volunteer.availabilityStatus
          }))).map((vol, j) => (
            <div
              key={vol.volunteerId}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 group hover:border-slate-300 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg border ${j === 0 ? "bg-brand-green text-white border-brand-green shadow-lg shadow-brand-green/20" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                >
                  {vol.volunteerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">
                    {vol.volunteerName}
                  </h4>
                  <div className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mt-1.5">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Activity size={10} /> {vol.availabilityStatus || "Available"}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin size={10} /> {vol.breakdown?.distanceKm ? `${vol.breakdown.distanceKm.toFixed(1)} km away` : "Distance unavailable"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 lg:flex gap-4 lg:gap-8 w-full md:w-auto mt-4 md:mt-0 px-4 md:px-0 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Match
                  </div>
                  <div
                    className={`text-xl font-black ${vol.score > 90 ? "text-brand-green" : vol.score > 80 ? "text-indigo-600" : "text-amber-500"}`}
                  >
                    {vol.score}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Trust
                  </div>
                  <div className="text-sm font-bold text-slate-700 mt-1.5 flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />{" "}
                    {((vol.breakdown?.trustScore || 0) / 20).toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Lang
                  </div>
                  <div className="text-sm font-bold text-slate-700 mt-1.5">
                    {(vol.breakdown?.languageCompatibility || 0) >= 100 ? "Match" : "Partial"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-40 shrink-0 mt-4 md:mt-0">
                <button
                  onClick={() => handleAssignVolunteer(vol.volunteerId, vol.volunteerName)}
                  className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  One-Click Assign
                </button>
                <button
                  onClick={() => handleAssignVolunteer(vol.volunteerId, vol.volunteerName)}
                  className="w-full py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Force Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTracker = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50/80 backdrop-blur-sm text-[10px] text-slate-500 font-bold tracking-widest uppercase border-b border-slate-100 sticky top-0 z-20">
              <tr>
                <th className="px-6 py-4">Task Information</th>
                <th className="px-6 py-4">Assigned Resource</th>
                <th className="px-6 py-4 w-[45%]">Live Status Trail</th>
                <th className="px-6 py-4 text-right">
                  Mission Control actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {tasks.map((task, i) => {
                const allStatuses = [
                  { key: "ASSIGNED", label: "Assigned" },
                  { key: "ACCEPTED", label: "Accepted" },
                  { key: "ON_WAY", label: "On Way" },
                  { key: "IN_PROGRESS", label: "In Progress" },
                  { key: "COMPLETED", label: "Completed" },
                  { key: "VERIFIED", label: "Verified" },
                ];
                const currentStatus = task.status === "OPEN" ? "ASSIGNED" : task.status;
                const isBlocked = task.status === "BLOCKED";

                const currentIndex = Math.max(
                  allStatuses.findIndex((s) => s.key === currentStatus),
                  0
                );

                return (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        {task.id.slice(0, 8)}
                      </div>
                      <div className="font-bold text-slate-900 group-hover:text-brand-green transition-colors">
                        {task.title}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {(task.assignee?.fullName || "U").charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          {task.assignee?.fullName || "Unassigned"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-between relative max-w-md w-full mx-auto">
                        {/* Track Line */}
                        <div className="absolute top-[5px] left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0"></div>
                        <div
                          className={`absolute top-[5px] left-0 h-1 -translate-y-1/2 rounded-full z-0 transition-all duration-1000 ${isBlocked ? "bg-rose-500" : "bg-brand-green"}`}
                          style={{ width: `${(currentIndex / 5) * 100}%` }}
                        ></div>

                        {/* Nodes */}
                        <div className="relative z-10 w-full flex justify-between">
                          {allStatuses.map((step, idx) => {
                            const isComplete = idx <= currentIndex;
                            const isCurrent = idx === currentIndex;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col justify-center items-center group/tooltip cursor-help relative -mt-[1px]"
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 ${
                                    isComplete
                                      ? isBlocked && isCurrent
                                        ? "bg-rose-500 border-rose-500 animate-pulse ring-4 ring-rose-500/20"
                                        : "bg-brand-green border-brand-green shadow-md shadow-brand-green/40"
                                      : "bg-white border-slate-300"
                                  }`}
                                >
                                  {isComplete && !isCurrent && !isBlocked && (
                                    <div className="w-[3px] h-[3px] bg-white rounded-full mx-auto mt-[2px]"></div>
                                  )}
                                </div>
                                {/* Custom Tooltip */}
                                <div className="absolute top-5 opacity-0 group-hover/tooltip:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap z-30 pointer-events-none before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:border-l-4 before:border-r-4 before:border-b-4 before:border-l-transparent before:border-r-transparent before:border-b-slate-900">
                                  {step.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between max-w-md mx-auto items-center">
                        {isBlocked ? (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md">
                            <AlertTriangle size={10} /> Blocked at{" "}
                            {allStatuses[currentIndex].label}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            On Track
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest ${currentStatus === "VERIFIED" ? "text-brand-green" : "text-slate-600"}`}
                        >
                          {allStatuses[currentIndex].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex flex-col lg:flex-row items-center justify-end gap-2">
                        <button
                          onClick={() => handleStatusUpdate(task.id, "ON_WAY", `Live tracking ping recorded for ${task.title}.`)}
                          className="px-3 py-1.5 bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 w-full lg:w-auto"
                        >
                          <Navigation2 size={12} /> Track
                        </button>
                        {isBlocked && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedTaskId(task.id);
                                void handleRunMatching();
                              }}
                              className="px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 w-full lg:w-auto shadow-sm shadow-amber-700/10"
                            >
                              <Repeat size={12} /> Reassign
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(task.id, "BLOCKED", `Priority escalation processed for ${task.title}.`)}
                              className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-[10px] font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-1.5 w-full lg:w-auto shadow-sm shadow-rose-500/20"
                            >
                              <ShieldAlert size={12} /> Escalate
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardList className="text-indigo-600" size={20} />
            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              Operational Execution
            </h2>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            Task Assignment Center
          </h1>
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            Create exact directives, use AI to match the perfect volunteers, and
            track hyper-local execution live across the field.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 shrink-0">
        {[
          {
            id: "tracker",
            label: "Live Task Tracker",
            count: 42,
            icon: Activity,
          },
          {
            id: "assign",
            label: "Smart Assignment Engine",
            count: 12,
            icon: Brain,
          },
          { id: "create", label: "New Task Creation", count: 0, icon: Plus },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as SubView)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeView === tab.id
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:shadow-sm"
            }`}
          >
            <tab.icon
              size={16}
              className={
                activeView === tab.id ? "text-brand-green" : "text-slate-400"
              }
            />
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  activeView === tab.id
                    ? "bg-white/20"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeView === "create" && renderCreate()}
            {activeView === "assign" && renderAssign()}
            {activeView === "tracker" && renderTracker()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
