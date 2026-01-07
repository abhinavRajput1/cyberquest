# CyberQuest: Cybersecurity Awareness Game

A fun, gamified cybersecurity awareness platform where students play short missions to learn about phishing detection, network security, and OSINT (Open Source Intelligence) in a safe, educational environment.

## 🎯 Features

- **Phishing Email Challenges** - Learn to identify phishing emails by analyzing real-world patterns
- **Network Security Puzzles** - Test your knowledge of network security and configuration
- **OSINT Missions** - Understand digital footprints and privacy risks
- **Gamification System** - Earn XP, level up, and unlock badges
- **Progress Tracking** - Monitor your progress across different mission categories
- **Modern UI** - Dark cyber-themed interface built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "cyber game"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cyberquest
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

**Note:** Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` accordingly.

### 3. Seed the Database

```bash
npm run seed
```

This will populate the database with sample missions.

### 4. Start the Backend Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

### 6. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Use your credentials to access the dashboard
3. **Browse Missions**: View available missions filtered by category (Phishing, Network, OSINT) and difficulty
4. **Play Missions**: 
   - Click on a mission to view details
   - Complete the challenges (identify phishing emails, answer network questions, analyze OSINT scenarios)
   - Submit your answers to earn XP
5. **Track Progress**: View your profile to see your level, XP, badges, and mission statistics

## 🎮 Mission Types

### Phishing Missions
- Analyze email inboxes with a mix of legitimate and phishing emails
- Identify red flags like suspicious domains, urgent language, and spelling errors
- Learn explanations for why each email is safe or dangerous

### Network Puzzles
- Answer multiple-choice questions about network security
- Learn about ports, firewalls, and secure configurations
- Understand best practices for network hardening

### OSINT Challenges
- Analyze simulated social media profiles
- Identify privacy risks and oversharing
- Learn how information can be pieced together

## 🏆 Gamification

- **XP System**: Earn experience points by completing missions
- **Levels**: Level up based on your total XP (Level = floor(XP / 100) + 1)
- **Badges**: Unlock badges by completing missions:
  - 🎣 **Phishing Hunter** - Complete 5 phishing missions
  - 🥷 **Network Ninja** - Complete 5 network puzzles
  - 🔍 **OSINT Detective** - Complete 5 OSINT missions
- **Streaks**: Maintain daily streaks by completing missions

## 📁 Project Structure

```
cyber game/
├── backend/
│   ├── models/          # MongoDB schemas (User, Mission)
│   ├── routes/          # API routes (auth, missions, user)
│   ├── middleware/      # Authentication middleware
│   ├── scripts/         # Seed script for sample data
│   └── server.js        # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React Context (Auth)
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app component
│   │   └── main.tsx     # Entry point
│   └── package.json
└── README.md
```

## 🔒 Security & Ethics

- **No Real Hacking**: All content is simulated and safe
- **Educational Focus**: Designed for learning and awareness, not actual exploitation
- **No Real Targets**: All examples use fictional data
- **Privacy First**: No collection of sensitive user data beyond basic account information

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Missions
- `GET /api/missions` - Get all missions (with optional filters)
- `GET /api/missions/:id` - Get single mission details
- `POST /api/missions/:id/submit` - Submit mission answers

### User
- `GET /api/user/progress` - Get user progress and stats
- `GET /api/user/profile` - Get user profile

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` (or check your MongoDB service)
- Verify the connection string in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change the port in `backend/.env` or `frontend/vite.config.ts`
- Update the proxy URL in `vite.config.ts` if backend port changes

### CORS Issues
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that credentials are enabled in axios requests

## 📝 TODO / Future Enhancements

- [ ] Add more mission content
- [ ] Implement leaderboards
- [ ] Add mission difficulty progression
- [ ] Create admin panel for content management
- [ ] Add email verification
- [ ] Implement password reset functionality
- [ ] Add more badge types
- [ ] Create mission categories with subcategories

## 📄 License

MIT License - Educational use only

## ⚠️ Disclaimer

This application is for educational purposes only. All hacking activities are simulated and safe. The purpose is to teach cybersecurity awareness and best practices, not to enable real-world attacks.

---

**Built with ❤️ for cybersecurity education**




