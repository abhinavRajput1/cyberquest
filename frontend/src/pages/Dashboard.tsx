import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { images } from '../utils/images';

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

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'phishing_hunter':
        return '🎣';
      case 'network_ninja':
        return '🥷';
      case 'osint_detective':
        return '🔍';
      default:
        return '🏆';
    }
  };

  const getBadgeName = (badge: string) => {
    switch (badge) {
      case 'phishing_hunter':
        return 'Phishing Hunter';
      case 'network_ninja':
        return 'Network Ninja';
      case 'osint_detective':
        return 'OSINT Detective';
      default:
        return badge;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-cyber-accent text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Color dissolving overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(0, 255, 136, ${Math.min(scrollY / 2000, 0.1)}) 0%,
            rgba(0, 102, 255, ${Math.min(scrollY / 2000, 0.1)}) 50%,
            rgba(124, 58, 237, ${Math.min(scrollY / 2000, 0.1)}) 100%
          )`,
        }}
      />

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <h1
          className="text-4xl font-bold text-white mb-2 transition-all duration-500"
          style={{
            opacity: Math.max(1 - scrollY / 300, 0.5),
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          Welcome back, <span className="text-cyber-accent">{user?.name}</span>!
        </h1>
        <p
          className="text-gray-300 mb-8 transition-all duration-500"
          style={{
            opacity: Math.max(1 - scrollY / 300, 0.5),
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          Continue your cybersecurity journey
        </p>

        {/* Stats Cards */}
        <div
          ref={statsRef}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card">
            <div className="text-3xl font-bold text-cyber-accent mb-2">Level {progress?.level || user?.level || 1}</div>
            <div className="text-gray-400">Current Level</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-cyber-accent mb-2">{progress?.xp || user?.xp || 0}</div>
            <div className="text-gray-400">Total XP</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-cyber-accent mb-2">{progress?.completedMissions || 0}</div>
            <div className="text-gray-400">Missions Completed</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-cyber-accent mb-2">{progress?.streak || 0}</div>
            <div className="text-gray-400">Day Streak</div>
          </div>
        </div>

        {/* Badges */}
        {progress && progress.badges.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your Badges</h2>
            <div className="flex flex-wrap gap-4">
              {progress.badges.map((badge) => (
                <div key={badge} className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg border border-purple-500/20">
                  <span className="text-2xl">{getBadgeIcon(badge)}</span>
                  <span className="text-gray-200">{getBadgeName(badge)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission Categories */}
        <div
          className="grid md:grid-cols-3 gap-6"
        >
          <Link
            to="/missions?category=phishing"
            className="card hover:border-cyber-accent transition-all duration-300 cursor-pointer overflow-hidden group transform hover:scale-105"
          >
            <img
              src={images.phishingCard}
              alt="Phishing email security"
              className="w-full h-40 object-cover mb-4 -mx-6 -mt-6 group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&q=80';
              }}
            />
            <h3 className="text-xl font-semibold text-cyber-accent mb-2">Phishing Missions</h3>
            <p className="text-gray-400 mb-4">Learn to identify phishing emails</p>
            <div className="text-sm text-gray-500">
              Completed: {progress?.categoryCounts.phishing || 0}
            </div>
          </Link>

          <Link
            to="/missions?category=network"
            className="card hover:border-cyber-accent transition-all duration-300 cursor-pointer overflow-hidden group transform hover:scale-105"
          >
            <img
              src={images.networkCard}
              alt="Network security infrastructure"
              className="w-full h-40 object-cover mb-4 -mx-6 -mt-6 group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&q=80';
              }}
            />
            <h3 className="text-xl font-semibold text-cyber-accent mb-2">Network Puzzles</h3>
            <p className="text-gray-400 mb-4">Test your network security knowledge</p>
            <div className="text-sm text-gray-500">
              Completed: {progress?.categoryCounts.network || 0}
            </div>
          </Link>

          <Link
            to="/missions?category=osint"
            className="card hover:border-cyber-accent transition-all duration-300 cursor-pointer overflow-hidden group transform hover:scale-105"
          >
            <img
              src={images.osintCard}
              alt="OSINT and digital investigation"
              className="w-full h-40 object-cover mb-4 -mx-6 -mt-6 group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop&q=80';
              }}
            />
            <h3 className="text-xl font-semibold text-cyber-accent mb-2">OSINT Challenges</h3>
            <p className="text-gray-400 mb-4">Understand digital footprints</p>
            <div className="text-sm text-gray-500">
              Completed: {progress?.categoryCounts.osint || 0}
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link to="/missions" className="btn-primary text-lg px-8 py-4 inline-block">
            View All Missions
          </Link>
        </div>
      </div>
    </div>
  );
}

