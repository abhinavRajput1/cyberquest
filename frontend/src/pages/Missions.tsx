import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { images } from '../utils/images';

interface Mission {
  _id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  xpReward: number;
}

export default function Missions() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const difficultyFilter = searchParams.get('difficulty');

  useEffect(() => {
    fetchMissions();
  }, [categoryFilter, difficultyFilter]);

  const fetchMissions = async () => {
    try {
      const params: any = {};
      if (categoryFilter) params.category = categoryFilter;
      if (difficultyFilter) params.difficulty = difficultyFilter;

      const response = await axios.get('/api/missions', { params });
      setMissions(response.data);
    } catch (error) {
      console.error('Failed to fetch missions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-700 bg-green-100';
      case 'medium':
        return 'text-yellow-700 bg-yellow-100';
      case 'hard':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'phishing':
        return '📧';
      case 'network':
        return '🔒';
      case 'osint':
        return '🔍';
      default:
        return '🎯';
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
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-cyber-accent/20 to-cyber-blue/20 py-12 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Missions</h1>
                <p className="text-lg text-gray-300">Choose your challenge and start learning cybersecurity skills</p>
              </div>
              <div className="hidden md:block">
                <img
                  src={images.missionsHeader}
                  alt="Banana Nano Mission Header"
                  className="rounded-lg shadow-lg w-64 h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              to="/missions"
              className={`px-4 py-2 rounded-lg ${!categoryFilter
                ? 'bg-cyber-accent text-white font-semibold'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              All Categories
            </Link>
            <Link
              to="/missions?category=phishing"
              className={`px-4 py-2 rounded-lg ${categoryFilter === 'phishing'
                ? 'bg-cyber-accent text-cyber-darker font-semibold'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              Phishing
            </Link>
            <Link
              to="/missions?category=network"
              className={`px-4 py-2 rounded-lg ${categoryFilter === 'network'
                ? 'bg-cyber-accent text-cyber-darker font-semibold'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              Network
            </Link>
            <Link
              to="/missions?category=osint"
              className={`px-4 py-2 rounded-lg ${categoryFilter === 'osint'
                ? 'bg-cyber-accent text-cyber-darker font-semibold'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              OSINT
            </Link>
          </div>

          {/* Missions Grid */}
          {missions.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-400 text-lg">No missions found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {missions.map((mission) => (
                <Link
                  key={mission._id}
                  to={`/missions/${mission._id}`}
                  className="card hover:border-cyber-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{getCategoryIcon(mission.category)}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                        mission.difficulty
                      )}`}
                    >
                      {mission.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{mission.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{mission.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-cyber-accent font-semibold">+{mission.xpReward} XP</span>
                    <span className="text-gray-500 text-sm capitalize">{mission.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

