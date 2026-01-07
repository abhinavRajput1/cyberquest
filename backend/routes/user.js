import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user progress
router.get('/progress', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('completedMissions.missionId', 'title category difficulty')
      .select('-password');

    const phishingCount = user.completedMissions.filter(
      m => m.missionId && m.missionId.category === 'phishing'
    ).length;
    
    const networkCount = user.completedMissions.filter(
      m => m.missionId && m.missionId.category === 'network'
    ).length;
    
    const osintCount = user.completedMissions.filter(
      m => m.missionId && m.missionId.category === 'osint'
    ).length;

    res.json({
      xp: user.xp,
      level: user.level,
      badges: user.badges,
      completedMissions: user.completedMissions.length,
      streak: user.streak,
      categoryCounts: {
        phishing: phishingCount,
        network: networkCount,
        osint: osintCount
      },
      completedMissionsList: user.completedMissions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      xp: user.xp,
      level: user.level,
      badges: user.badges,
      completedMissions: user.completedMissions.length,
      streak: user.streak,
      joinedAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;




