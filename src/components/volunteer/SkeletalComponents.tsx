import React from "react";
import { MessageSquare, Bell, User, Settings, Info } from "lucide-react";

export default function CommunityCampaigns() {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
      <Info size={48} className="mx-auto text-slate-300 mb-6" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Community Campaigns</h2>
      <p className="text-slate-500 font-medium italic">Strategic drives and local campaigns will appear here soon.</p>
    </div>
  );
}

export function VolunteerComms() {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
      <MessageSquare size={48} className="mx-auto text-slate-300 mb-6" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Communication Center</h2>
      <p className="text-slate-500 font-medium italic">Internal comms and announcements hub.</p>
    </div>
  );
}

export function VolunteerProfile() {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
      <User size={48} className="mx-auto text-slate-300 mb-6" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile & Skills</h2>
      <p className="text-slate-500 font-medium italic">Manage your verified skills and personal info.</p>
    </div>
  );
}

export function VolunteerSettings() {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
      <Settings size={48} className="mx-auto text-slate-300 mb-6" />
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Volunteer Settings</h2>
      <p className="text-slate-500 font-medium italic">Dispatch preferences and security settings.</p>
    </div>
  );
}
