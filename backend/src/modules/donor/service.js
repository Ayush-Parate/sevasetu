const { Task } = require("../taskManagement/models");
const { Need } = require("../needIntelligence/models");
const { User } = require("../userRole/models");
const { ROLES } = require("../../constants/roles");

async function getDonorStats(userId) {
  const [
    activeFundingProjects,
    verifiedNeeds,
    totalVolunteers,
    completedTasks
  ] = await Promise.all([
    Need.countDocuments({ status: "verified" }),
    Need.countDocuments({ status: "verified" }),
    User.countDocuments({ role: ROLES.VOLUNTEER, isActive: true }),
    Task.countDocuments({ status: "COMPLETED" })
  ]);

  // Impact capital and lives impacted are computed metrics
  // In production these would come from a Donations collection
  const totalImpactCapital = "$0"; // Placeholder – requires Donations model
  const livesImpacted = completedTasks * 10; // Approx: 10 people per completed task

  return {
    activeFundingProjects,
    verifiedNeeds,
    totalVolunteers,
    completedTasks,
    livesImpacted,
    totalImpactCapital,
    sdgTargetsHit: "18/24",       // Placeholder
    resolutionEfficiency: "92%"  // Placeholder
  };
}

async function getMarketplace() {
  const needs = await Need.find({ status: "verified" }).lean() || [];
  // For demo purposes, we will augment the DB needs with marketplace data
  return needs.map((need, i) => ({
    id: need._id.toString(),
    title: need.title,
    ngo: "SevaSetu Verified Partner",
    location: need.location || "India",
    goal: `$${Math.floor(Math.random() * 40000 + 5000)}`,
    raised: `$${Math.floor(Math.random() * 5000)}`,
    backers: Math.floor(Math.random() * 50),
    impact: `${Math.floor(Math.random() * 1000 + 50)} people`,
    urgency: need.urgencyScore > 8 ? "CRITICAL" : need.urgencyScore > 5 ? "HIGH" : "MEDIUM",
    category: need.aiLabel || "Humanitarian",
    image: `https://images.unsplash.com/photo-${1542810634 + i}?q=80&w=800&auto=format&fit=crop`
  }));
}

async function getLedger() {
  // Mock transactions for now until Donation model is implemented
  return [
    { id: "TX-4921", date: "April 24, 2026", entity: "Child Health Initiative (NGO)", amount: "-$12,500.00", status: "Transferred", type: "Operational", purpose: "Medical Kit Procurement" },
    { id: "TX-4830", date: "April 20, 2026", entity: "Direct CSR Donation", amount: "+$50,000.00", status: "Completed", type: "Funding", purpose: "Quarterly CSR Allocation" },
    { id: "TX-4712", date: "April 15, 2026", entity: "Seva Rural Trust", amount: "-$8,200.00", status: "Verified", type: "Field Expense", purpose: "Emergency Response Hub - Sunderbans" },
    { id: "TX-4699", date: "April 12, 2026", entity: "Digital Sakshar NGO", amount: "-$4,500.00", status: "In Audit", type: "Admin", purpose: "Platform Service Fees" },
    { id: "TX-4550", date: "April 05, 2026", entity: "Hope Builders", amount: "-$15,000.00", status: "Completed", type: "Project", purpose: "School Infrastructure - Phase 1" },
  ];
}

module.exports = { getDonorStats, getMarketplace, getLedger };
