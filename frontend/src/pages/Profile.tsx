import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Progress {
  xp: number;
  level: number;
  badges: string[];
  completedMissions: number;
  streak: number;
  categoryCounts: {
    phishing: number;
    network: number;
    osint: number;
  };
}

export default function Profile() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await axios.get('/api/user/progress');
      setProgress(response.data);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeInfo = (badge: string) => {
    switch (badge) {
      case 'phishing_hunter':
        return { icon: '🎣', name: 'Phishing Hunter', description: 'Completed 5 phishing missions' };
      case 'network_ninja':
        return { icon: '🥷', name: 'Network Ninja', description: 'Completed 5 network puzzles' };
      case 'osint_detective':
        return { icon: '🔍', name: 'OSINT Detective', description: 'Completed 5 OSINT missions' };
      default:
        return { icon: '🏆', name: badge, description: '' };
    }
  };

  const xpForNextLevel = (currentLevel: number) => {
    return currentLevel * 100;
  };

  const xpProgress = progress ? ((progress.xp % 100) / 100) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-cyber-accent text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">Profile & Progress</h1>

          {/* User Info */}
          <div className="card bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">Name</div>
                <div className="text-white text-lg">{user?.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <div className="text-white text-lg">{user?.email}</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8 mt-8">
            <div className="card text-center bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
              <div className="text-3xl font-bold text-cyber-accent mb-2">Level {progress?.level || 1}</div>
              <div className="text-gray-400">Current Level</div>
            </div>
            <div className="card text-center bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
              <div className="text-3xl font-bold text-cyber-accent mb-2">{progress?.xp || 0}</div>
              <div className="text-gray-400">Total XP</div>
            </div>
            <div className="card text-center bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
              <div className="text-3xl font-bold text-cyber-accent mb-2">{progress?.completedMissions || 0}</div>
              <div className="text-gray-400">Missions</div>
            </div>
            <div className="card text-center bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
              <div className="text-3xl font-bold text-cyber-accent mb-2">{progress?.streak || 0}</div>
              <div className="text-gray-400">Day Streak</div>
            </div>
          </div>

          {/* XP Progress */}
          <div className="card mb-8 bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Level Progress</h2>
            <div className="mb-2 flex justify-between text-sm text-gray-400">
              <span>Level {progress?.level || 1}</span>
              <span>Level {(progress?.level || 1) + 1}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 border border-gray-700">
              <div
                className="bg-cyber-accent h-4 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {progress?.xp || 0} / {xpForNextLevel(progress?.level || 1)} XP to next level
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="card mb-8 bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Mission Breakdown</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl mb-2">📧</div>
                <div className="text-xl font-semibold text-cyber-accent mb-1">
                  {progress?.categoryCounts.phishing || 0}
                </div>
                <div className="text-gray-400 text-sm">Phishing Missions</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-xl font-semibold text-cyber-accent mb-1">
                  {progress?.categoryCounts.network || 0}
                </div>
                <div className="text-gray-400 text-sm">Network Puzzles</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl mb-2">🔍</div>
                <div className="text-xl font-semibold text-cyber-accent mb-1">
                  {progress?.categoryCounts.osint || 0}
                </div>
                <div className="text-gray-400 text-sm">OSINT Challenges</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="card bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Badges</h2>
            {progress && progress.badges.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {progress.badges.map((badge) => {
                  const badgeInfo = getBadgeInfo(badge);
                  return (
                    <div key={badge} className="bg-gray-800/50 p-6 rounded-lg text-center border border-cyber-accent/50 hover:border-cyber-accent transition-colors">
                      <div className="text-4xl mb-2">{badgeInfo.icon}</div>
                      <div className="text-lg font-semibold text-white mb-1">{badgeInfo.name}</div>
                      <div className="text-sm text-gray-400">{badgeInfo.description}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🏆</div>
                <p className="text-gray-400">No badges yet. Complete missions to unlock badges!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

