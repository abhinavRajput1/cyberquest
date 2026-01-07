import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['phishing', 'network', 'osint'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  story: {
    type: String,
    required: false
  },
  xpReward: {
    type: Number,
    required: true,
    default: 10
  },
  // For phishing missions
  emails: [{
    subject: String,
    sender: String,
    body: String,
    isPhishing: Boolean,
    explanation: String,
    redFlags: [String]
  }],
  // For network puzzles
  questions: [{
    question: String,
    type: {
      type: String,
      enum: ['multiple-choice', 'drag-drop', 'matching']
    },
    options: [String],
    correctAnswer: String,
    explanation: String
  }],
  // For OSINT missions
  scenario: {
    profile: {
      name: String,
      image: String,
      posts: [{
        content: String,
        timestamp: Date,
        location: String
      }],
      bio: String
    },
    questions: [{
      question: String,
      correctAnswer: String,
      explanation: String
    }]
  }
}, {
  timestamps: true
});

export default mongoose.model('Mission', missionSchema);




