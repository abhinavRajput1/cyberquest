import express from 'express';
import Mission from '../models/Mission.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get all missions (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const missions = await Mission.find(filter).select('-emails -questions -scenario');
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single mission by ID
router.get('/:id', async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    res.json(mission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit mission answers (protected)
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    const { answers } = req.body;
    let score = 0;
    let total = 0;
    const results = [];

    if (mission.category === 'phishing') {
      // Check email classifications
      total = mission.emails.length;
      mission.emails.forEach((email, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === (email.isPhishing ? 'phishing' : 'safe');
        if (isCorrect) score++;
        results.push({
          emailIndex: index,
          correct: isCorrect,
          explanation: email.explanation,
          redFlags: email.redFlags
        });
      });
    } else if (mission.category === 'network') {
      // Check network puzzle answers
      total = mission.questions.length;
      mission.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) score++;
        results.push({
          questionIndex: index,
          correct: isCorrect,
          explanation: question.explanation
        });
      });
    } else if (mission.category === 'osint') {
      // Check OSINT answers
      total = mission.scenario.questions.length;
      mission.scenario.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        if (isCorrect) score++;
        results.push({
          questionIndex: index,
          correct: isCorrect,
          explanation: question.explanation
        });
      });
    }

    const percentage = (score / total) * 100;
    const xpEarned = Math.floor(mission.xpReward * (percentage / 100));

    // Update user progress
    const User = (await import('../models/User.js')).default;
    const user = await User.findById(req.user._id);
    
    // Check if already completed
    const alreadyCompleted = user.completedMissions.some(
      m => m.missionId.toString() === mission._id.toString()
    );

    if (!alreadyCompleted) {
      user.addXP(xpEarned);
      user.completedMissions.push({
        missionId: mission._id,
        score: percentage,
        xpEarned
      });

      // Update streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastMissionDate = user.lastMissionDate ? new Date(user.lastMissionDate) : null;
      
      if (!lastMissionDate || lastMissionDate < today) {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastMissionDate && lastMissionDate.getTime() === yesterday.getTime()) {
          user.streak += 1;
        } else {
          user.streak = 1;
        }
        user.lastMissionDate = today;
      }

      // Check for new badges - populate missions first
      await user.populate('completedMissions.missionId', 'category');
      const newBadges = user.checkBadges();
      await user.save();

      res.json({
        score: percentage,
        xpEarned,
        results,
        newLevel: user.level,
        newBadges,
        message: newBadges.length > 0 ? `Congratulations! You earned ${newBadges.length} new badge(s)!` : null
      });
    } else {
      res.json({
        score: percentage,
        xpEarned: 0,
        results,
        message: 'Mission already completed. No XP awarded.'
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

