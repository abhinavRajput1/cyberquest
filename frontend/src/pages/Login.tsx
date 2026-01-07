import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { images } from '../utils/images';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
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
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <img
                src={images.login}
                alt="Cybersecurity professional"
                className="rounded-xl shadow-2xl w-full h-auto border border-purple-500/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=800&fit=crop&q=80';
                }}
              />
            </div>
            <div className="card bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
              <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
              <p className="text-gray-400 mb-8">Welcome back to CyberQuest</p>

              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field bg-gray-800 text-white border-gray-700 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field bg-gray-800 text-white border-gray-700 focus:border-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <p className="mt-6 text-center text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-cyber-accent hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

