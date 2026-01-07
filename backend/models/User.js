import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  completedMissions: [{
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mission'
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    score: Number,
    xpEarned: Number
  }],
  badges: [{
    type: String,
    enum: ['phishing_hunter', 'network_ninja', 'osint_detective']
  }],
  streak: {
    type: Number,
    default: 0
  },
  lastMissionDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Calculate level based on XP
userSchema.methods.calculateLevel = function() {
  this.level = Math.floor(this.xp / 100) + 1;
  return this.level;
};

// Add XP and update level
userSchema.methods.addXP = function(amount) {
  this.xp += amount;
  this.calculateLevel();
  return this;
};

// Check if user should get a badge
// Note: This method should be called after populating missionId with the Mission document
userSchema.methods.checkBadges = function() {
  const phishingCount = this.completedMissions.filter(
    m => m.missionId && m.missionId.category === 'phishing'
  ).length;
  const networkCount = this.completedMissions.filter(
    m => m.missionId && m.missionId.category === 'network'
  ).length;
  const osintCount = this.completedMissions.filter(
    m => m.missionId && m.missionId.category === 'osint'
  ).length;

  const newBadges = [];
  
  if (phishingCount >= 5 && !this.badges.includes('phishing_hunter')) {
    this.badges.push('phishing_hunter');
    newBadges.push('phishing_hunter');
  }
  
  if (networkCount >= 5 && !this.badges.includes('network_ninja')) {
    this.badges.push('network_ninja');
    newBadges.push('network_ninja');
  }
  
  if (osintCount >= 5 && !this.badges.includes('osint_detective')) {
    this.badges.push('osint_detective');
    newBadges.push('osint_detective');
  }

  return newBadges;
};

export default mongoose.model('User', userSchema);

