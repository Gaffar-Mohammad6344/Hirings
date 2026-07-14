import express from 'express';
import { getDashboardStats, getRecentCandidates} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/candidates', getRecentCandidates);
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.status(200).json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
});
export default router;