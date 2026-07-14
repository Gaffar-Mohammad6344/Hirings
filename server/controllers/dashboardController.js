import Candidate from "../models/Candidate.js";

export const getDashboardStats = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    const stats = {
      total: candidates.length,
      pending: candidates.filter(
        c => c.status?.toUpperCase() === "PENDING"
      ).length,
      shortlisted: candidates.filter(
        c => c.status?.toUpperCase() === "SHORTLISTED"
      ).length,
      interview: candidates.filter(
        c => c.status?.toUpperCase() === "INTERVIEW"
      ).length,
      rejected: candidates.filter(
        c => c.status?.toUpperCase() === "REJECTED"
      ).length,
      hired: candidates.filter(
        c => c.status?.toUpperCase() === "HIRED"
      ).length,
    };

    res.json([
      {
        label: "Total Candidates",
        value: stats.total,
        type: "total",
      },
      {
        label: "Pending",
        value: stats.pending,
        type: "pending",
      },
      {
        label: "Shortlisted",
        value: stats.shortlisted,
        type: "shortlisted",
      },
      {
        label: "Interviewed",
        value: stats.interview,
        type: "interview",
      },
      {
        label: "Rejected",
        value: stats.rejected,
        type: "rejected",
      },
      {
        label: "Hired",
        value: stats.hired,
        type: "hired",
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Stats error",
    });
  }
};
export const getRecentCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching candidates" });
  }
};
// Example logic for your Backend Admin Controller
export const getAdminRank = async (req, res) => {
  try {
    const currentAdmin = await Admin.findById(req.user.id); // Assuming you have JWT middleware
    
    // Count how many admins registered before this one
    const countBefore = await Admin.countDocuments({ 
      createdAt: { $lt: currentAdmin.createdAt } 
    });

    const rank = countBefore + 1; // 0 before = Admin1, 1 before = Admin2

    res.json({
      name: currentAdmin.name,
      rank: `Admin${rank}`
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
