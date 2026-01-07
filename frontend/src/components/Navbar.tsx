import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-purple-500/30 shadow-lg shadow-purple-500/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <img src="/logo.png" alt="CyberQuest Logo" className="h-8 w-8 object-contain" />
            <span className="text-2xl font-bold text-cyber-accent">CyberQuest</span>
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-cyber-accent transition-colors">
                Dashboard
              </Link>
              <Link to="/missions" className="text-gray-300 hover:text-cyber-accent transition-colors">
                Missions
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-cyber-accent transition-colors">
                Profile
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">
                  Level {user.level} • {user.xp} XP
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-cyber-accent transition-colors">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

