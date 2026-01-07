import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Missions from './pages/Missions';
import MissionDetail from './pages/MissionDetail';
import Profile from './pages/Profile';
import { MatrixCursor } from './components/MatrixCursor';

import { TerminalBackground } from './components/TerminalBackground';

function App() {
  return (
    <AuthProvider>
      <Router>
        <TerminalBackground />
        <MatrixCursor />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missions"
            element={
              <ProtectedRoute>
                <Missions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missions/:id"
            element={
              <ProtectedRoute>
                <MissionDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;




