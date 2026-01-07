# Quick Start Guide

## Prerequisites Check

1. **Node.js**: Run `node --version` (should be v18+)
2. **MongoDB**: 
   - Local: Make sure MongoDB is installed and running
   - Or use MongoDB Atlas (free tier available)

## Step-by-Step Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Backend

Create `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cyberquest
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

**For MongoDB Atlas users:**
- Get your connection string from MongoDB Atlas
- Replace `MONGODB_URI` with your Atlas connection string
- Example: `mongodb+srv://username:password@cluster.mongodb.net/cyberquest`

### 3. Seed the Database

```bash
cd backend
npm run seed
```

You should see: `Seeded X missions successfully`

### 4. Start Backend Server

```bash
cd backend
npm start
```

Backend should be running on `http://localhost:5000`

### 5. Install Frontend Dependencies

Open a **new terminal window**:

```bash
cd frontend
npm install
```

### 6. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend should be running on `http://localhost:5173`

## 🎮 First Steps

1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" to create an account
3. Fill in: Name, Email, Password (min 6 characters)
4. You'll be redirected to the Dashboard
5. Click "View All Missions" or browse by category
6. Start playing!

## 🐛 Common Issues

### "MongoDB connection error"
- **Solution**: Make sure MongoDB is running
  - Windows: Check Services or run `mongod`
  - Mac/Linux: Run `mongod` or `brew services start mongodb-community`
  - Or use MongoDB Atlas (cloud)

### "Port 5000 already in use"
- **Solution**: Change `PORT` in `backend/.env` to another port (e.g., 5001)
- Update `frontend/vite.config.ts` proxy target if needed

### "Port 5173 already in use"
- **Solution**: Vite will automatically use the next available port

### "Cannot find module" errors
- **Solution**: Make sure you ran `npm install` in both `backend/` and `frontend/` directories

## 📝 Testing the App

1. **Create Account**: Sign up with any email/password
2. **Browse Missions**: Click on different mission categories
3. **Play a Mission**: 
   - Try the "Spot the Phish" mission (easy phishing)
   - Answer all questions and submit
   - Check your XP and level
4. **View Profile**: See your progress and badges
5. **Complete 5 missions** in a category to unlock a badge!

## 🎯 Next Steps

- Complete all missions to unlock all badges
- Try different difficulty levels
- Check your progress on the Profile page
- Maintain a daily streak!

---

**Need help?** Check the main README.md for more details.




