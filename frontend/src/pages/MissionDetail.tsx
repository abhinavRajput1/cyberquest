import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { images } from '../utils/images';

interface Email {
  subject: string;
  sender: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
  redFlags: string[];
}

interface Question {
  question: string;
  type: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Scenario {
  profile: {
    name: string;
    image: string;
    bio: string;
    posts: Array<{
      content: string;
      timestamp: string;
      location: string;
    }>;
  };
  questions: Array<{
    question: string;
    correctAnswer: string;
    explanation: string;
  }>;
}

interface Mission {
  _id: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  story?: string;
  xpReward: number;
  emails?: Email[];
  questions?: Question[];
  scenario?: Scenario;
}

export default function MissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMission();
  }, [id]);

  const fetchMission = async () => {
    try {
      const response = await axios.get(`/api/missions/${id}`);
      setMission(response.data);
      // Initialize answers array
      if (response.data.category === 'phishing') {
        setAnswers(new Array(response.data.emails.length).fill(''));
      } else if (response.data.category === 'network') {
        setAnswers(new Array(response.data.questions.length).fill(''));
      } else if (response.data.category === 'osint') {
        setAnswers(new Array(response.data.scenario.questions.length).fill(''));
      }
    } catch (error) {
      console.error('Failed to fetch mission:', error);
      setError('Failed to load mission');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some(a => !a)) {
      setError('Please answer all questions');
      return;
    }

    try {
      const response = await axios.post(`/api/missions/${id}/submit`, { answers });
      setResults(response.data);
      setSubmitted(true);

      // Update user context if level changed
      if (response.data.newLevel && user) {
        updateUser({ ...user, level: response.data.newLevel, xp: user.xp + response.data.xpEarned });
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to submit answers');
    }
  };

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

  if (!mission) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="card text-center">
            <p className="text-red-600">Mission not found</p>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryImage = (category: string) => {
    switch (category) {
      case 'phishing':
        return images.missionPhishing;
      case 'network':
        return images.missionNetwork;
      case 'osint':
        return images.missionOsint;
      default:
        return images.missionOsint;
    }
  };

  const getCategoryFallback = (category: string) => {
    switch (category) {
      case 'phishing':
        return 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&q=80';
      case 'network':
        return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=80';
      case 'osint':
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&q=80';
      default:
        return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&q=80';
    }
  };

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

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-6">
            <button
              onClick={() => navigate('/missions')}
              className="text-cyber-accent hover:underline mb-4"
            >
              ← Back to Missions
            </button>
            <div className="mb-6">
              <img
                src={getCategoryImage(mission.category)}
                alt={`${mission.category} mission`}
                className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getCategoryFallback(mission.category);
                }}
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{mission.title}</h1>
            <p className="text-gray-300 mb-4">{mission.description}</p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 capitalize">
                {mission.category}
              </span>
              <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 capitalize">
                {mission.difficulty}
              </span>
              <span className="text-cyber-accent font-semibold">+{mission.xpReward} XP</span>
            </div>
          </div>

          {mission.story && (
            <div className="card mb-8 border-l-4 border-cyber-accent bg-gray-900/50">
              <h3 className="text-xl font-bold text-cyber-accent mb-2">📜 Mission Scenario</h3>
              <p className="text-gray-300 italic leading-relaxed">{mission.story}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {results && (
            <div className="card mb-6 bg-cyber-accent/10 border-cyber-accent">
              <h2 className="text-2xl font-bold text-cyber-accent mb-4">Results</h2>
              <div className="text-3xl font-bold text-white mb-2">{results.score.toFixed(1)}%</div>
              <p className="text-gray-300 mb-4">
                You earned <span className="text-cyber-accent font-semibold">{results.xpEarned} XP</span>
              </p>
              {results.newBadges && results.newBadges.length > 0 && (
                <div className="mb-4">
                  <p className="text-cyber-accent font-semibold mb-2">New Badges Unlocked!</p>
                  <div className="flex flex-wrap gap-2">
                    {results.newBadges.map((badge: string) => (
                      <span key={badge} className="px-3 py-1 bg-cyber-accent text-cyber-darker rounded-full text-sm font-semibold">
                        {badge === 'phishing_hunter' && '🎣 Phishing Hunter'}
                        {badge === 'network_ninja' && '🥷 Network Ninja'}
                        {badge === 'osint_detective' && '🔍 OSINT Detective'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Phishing Mission */}
          {mission.category === 'phishing' && mission.emails && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Email Inbox</h2>
              {mission.emails.map((email, index) => (
                <div
                  key={index}
                  className={`card bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 ${submitted && results?.results[index]
                    ? results.results[index].correct
                      ? 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                    : ''
                    }`}
                >
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">From: {email.sender}</div>
                    <div className="text-lg font-semibold text-white mb-2">{email.subject}</div>
                    <div className="text-gray-300 whitespace-pre-wrap bg-black/50 p-4 rounded-lg border border-gray-800 font-mono text-sm">
                      {email.body}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAnswerChange(index, 'safe')}
                      disabled={submitted}
                      className={`px-4 py-2 rounded-lg ${answers[index] === 'safe'
                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        } disabled:opacity-50`}
                    >
                      Safe
                    </button>
                    <button
                      onClick={() => handleAnswerChange(index, 'phishing')}
                      disabled={submitted}
                      className={`px-4 py-2 rounded-lg ${answers[index] === 'phishing'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        } disabled:opacity-50`}
                    >
                      Phishing
                    </button>
                  </div>
                  {submitted && results?.results[index] && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <div className={`font-semibold mb-2 ${results.results[index].correct ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {results.results[index].correct ? '✓ Correct' : '✗ Incorrect'}
                      </div>
                      <div className="text-gray-300 mb-2">{email.explanation}</div>
                      {email.redFlags.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-yellow-600 mb-1">Red Flags:</div>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {email.redFlags.map((flag, i) => (
                              <li key={i}>{flag}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Network Puzzle */}
          {mission.category === 'network' && mission.questions && (
            <div className="space-y-6">
              {mission.questions.map((question, index) => (
                <div key={index} className="card bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
                  <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerChange(index, option)}
                        disabled={submitted}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${answers[index] === option
                          ? 'bg-cyber-accent text-cyber-darker font-semibold border-cyber-accent shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                          : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                          } disabled:opacity-50`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {submitted && results?.results[index] && (
                    <div className="mt-4 p-4 bg-gray-800/80 border border-gray-700 rounded-lg">
                      <div className={`font-semibold mb-2 ${results.results[index].correct ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {results.results[index].correct ? '✓ Correct' : '✗ Incorrect'}
                      </div>
                      <div className="text-gray-300">{question.explanation}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* OSINT Mission */}
          {mission.category === 'osint' && mission.scenario && (
            <div className="space-y-6">
              <div className="card bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">Social Media Profile</h2>
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center text-3xl border border-gray-700">
                    👤
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">{mission.scenario.profile.name}</div>
                    <div className="text-gray-400">{mission.scenario.profile.bio}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {mission.scenario.profile.posts.map((post, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                      <div className="text-gray-500 text-sm mb-2">
                        {new Date(post.timestamp).toLocaleDateString()} • {post.location}
                      </div>
                      <div className="text-gray-300">{post.content}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                {mission.scenario.questions.map((question, index) => (
                  <div key={index} className="card bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
                    <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={answers[index] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        disabled={submitted}
                        className="input-field bg-gray-800 text-white border-gray-700 focus:border-purple-500"
                        placeholder="Your answer..."
                      />
                    </div>
                    {submitted && results?.results[index] && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <div className={`font-semibold mb-2 ${results.results[index].correct ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {results.results[index].correct ? '✓ Correct' : '✗ Incorrect'}
                        </div>
                        <div className="text-gray-300">{question.explanation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!submitted && (
            <div className="mt-8">
              <button onClick={handleSubmit} className="btn-primary w-full text-lg py-4">
                Submit Answers
              </button>
            </div>
          )}

          {submitted && (
            <div className="mt-8">
              <button
                onClick={() => navigate('/missions')}
                className="btn-secondary w-full text-lg py-4"
              >
                Back to Missions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

