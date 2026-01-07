import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { images } from '../utils/images';

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const whoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate color overlay based on scroll - Purple and Black theme
  const getScrollOverlay = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / maxScroll;

    // Purple and black color dissolving effect
    const purpleOpacity = Math.min(scrollPercent * 0.3, 0.2);
    const blackOpacity = Math.min(scrollPercent * 0.2, 0.15);

    return {
      background: `linear-gradient(
        135deg,
        rgba(147, 51, 234, ${purpleOpacity}) 0%,
        rgba(124, 58, 237, ${purpleOpacity * 0.8}) 30%,
        rgba(0, 0, 0, ${blackOpacity}) 60%,
        rgba(107, 33, 168, ${purpleOpacity * 0.6}) 100%
      )`,
    };
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Color dissolving overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-40 transition-all duration-300"
        style={getScrollOverlay()}
      />

      <Navbar />

      {/* Hero Section - Full Screen */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.98) 0%,
            rgba(107, 33, 168, 0.2) 30%,
            rgba(147, 51, 234, 0.15) 60%,
            rgba(0, 0, 0, 0.98) 100%
          )`,
          minHeight: '100vh',
        }}
      >
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              style={{
                textShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
              }}
            >
              Welcome to <span className="text-cyber-accent">CyberQuest</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0">
              Learn cybersecurity by playing missions. Master phishing detection, network security, and OSINT skills in a safe, gamified environment.
            </p>
            <Link to="/signup" className="btn-primary text-lg px-10 py-4 inline-block transform hover:scale-105 transition-transform shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70">
              Start Playing
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-transparent rounded-xl blur-3xl animate-pulse"></div>
              <img
                src={images.hero}
                alt="Cybersecurity professional using laptop"
                className="relative rounded-xl shadow-2xl w-full h-auto transform transition-all duration-500 border-2 border-purple-500/50"
                style={{
                  transform: `translateY(${Math.max(0, scrollY * 0.05)}px)`,
                  boxShadow: '0 0 40px rgba(147, 51, 234, 0.4)',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"
      >
        <h2
          className="text-3xl font-bold text-center text-white mb-12 transition-all duration-700"
          style={{
            opacity: Math.min((scrollY - window.innerHeight * 0.7) / 400, 1),
            transform: `translateY(${Math.max(window.innerHeight * 0.7 - scrollY, 0) * 0.2}px)`,
          }}
        >
          What is CyberQuest?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="card text-center overflow-hidden transform transition-all duration-700 hover:scale-105 bg-gray-900 border-purple-500/30"
            style={{
              opacity: Math.min((scrollY - window.innerHeight * 0.75) / 400, 1),
              transform: `translateY(${Math.max(window.innerHeight * 0.75 - scrollY, 0) * 0.2}px) scale(${Math.min((scrollY - window.innerHeight * 0.75) / 500 + 0.9, 1)})`,
            }}
          >
            <img
              src={images.phishingFeature}
              alt="Email security and phishing detection"
              className="w-full h-48 object-cover mb-4 -mx-6 -mt-6 transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&q=80';
              }}
            />
            <h3 className="text-xl font-semibold text-cyber-accent mb-3">Phishing Missions</h3>
            <p className="text-gray-300">
              Learn to identify phishing emails by analyzing real-world patterns. Spot red flags and protect yourself from scams.
            </p>
          </div>

          <div
            className="card text-center overflow-hidden transform transition-all duration-700 hover:scale-105 bg-gray-900 border-purple-500/30"
            style={{
              opacity: Math.min((scrollY - window.innerHeight * 0.75) / 400, 1),
              transform: `translateY(${Math.max(window.innerHeight * 0.75 - scrollY, 0) * 0.2}px) scale(${Math.min((scrollY - window.innerHeight * 0.75) / 500 + 0.9, 1)})`,
            }}
          >
            <img
              src={images.networkFeature}
              alt="Network security and infrastructure"
              className="w-full h-48 object-cover mb-4 -mx-6 -mt-6 transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&q=80';
              }}
            />
            <h3 className="text-xl font-semibold text-cyber-accent mb-3">Network Puzzles</h3>
            <p className="text-gray-300">
              Test your knowledge of network security. Configure firewalls, understand ports, and secure network infrastructure.
            </p>
          </div>

          <div
            className="card text-center overflow-hidden transform transition-all duration-700 hover:scale-105 bg-gray-900 border-purple-500/30"
            style={{
              opacity: Math.min((scrollY - window.innerHeight * 0.75) / 400, 1),
              transform: `translateY(${Math.max(window.innerHeight * 0.75 - scrollY, 0) * 0.2}px) scale(${Math.min((scrollY - window.innerHeight * 0.75) / 500 + 0.9, 1)})`,
            }}
          >
            <img
              src={images.osintFeature}
              alt="Digital investigation and OSINT"
              className="w-full h-48 object-cover mb-4 -mx-6 -mt-6 transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&q=80';
              }}
            />
            <h3 className="text-xl font-semibold text-cyber-accent mb-3">OSINT Challenges</h3>
            <p className="text-gray-300">
              Understand digital footprints and privacy risks. Learn how information sharing can impact security.
            </p>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section
        ref={whoRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10"
      >
        <h2
          className="text-3xl font-bold text-center text-white mb-12 transition-all duration-700"
          style={{
            opacity: Math.min((scrollY - 800) / 200, 1),
            transform: `translateY(${Math.max(800 - scrollY, 0) * 0.3}px)`,
          }}
        >
          Who is it for?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold text-cyber-accent mb-3">Students</h3>
            <p className="text-gray-300">
              Perfect for cybersecurity students looking to practice skills in a safe, controlled environment.
            </p>
          </div>

          <div className="card bg-gray-900 border-purple-500/30">
            <h3 className="text-xl font-semibold text-cyber-accent mb-3">Colleges</h3>
            <p className="text-gray-300">
              Educational institutions can use CyberQuest to teach cybersecurity awareness and best practices.
            </p>
          </div>

          <div className="card bg-gray-900 border-purple-500/30">
            <h3 className="text-xl font-semibold text-cyber-accent mb-3">Beginners</h3>
            <p className="text-gray-300">
              No prior experience needed. Start with easy missions and progress at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
      >
        <div
          className="bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-black rounded-2xl p-12 text-center transform transition-all duration-700 border border-purple-500/30"
          style={{
            opacity: Math.min((scrollY - 1000) / 200, 1),
            transform: `translateY(${Math.max(1000 - scrollY, 0) * 0.2}px) scale(${Math.min((scrollY - 1000) / 500 + 0.95, 1)})`,
            background: `linear-gradient(
              135deg,
              rgba(147, 51, 234, ${Math.min((scrollY - 1000) / 1000, 0.2)}) 0%,
              rgba(107, 33, 168, ${Math.min((scrollY - 1000) / 1000, 0.15)}) 50%,
              rgba(0, 0, 0, ${Math.min((scrollY - 1000) / 1000, 0.3)}) 100%
            )`,
          }}
        >
          <div className="max-w-3xl mx-auto">
            <img
              src={images.cta}
              alt="Cybersecurity learning"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg shadow-purple-500/30 mb-6 transform transition-transform duration-500 hover:scale-105 border border-purple-500/30"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80';
              }}
            />
            <h2 className="text-3xl font-bold text-white mb-6">Ready to start your cybersecurity journey?</h2>
            <Link to="/signup" className="btn-primary text-lg px-8 py-4 inline-block transform hover:scale-105 transition-transform shadow-lg shadow-purple-500/50">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 py-8 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>CyberQuest - Educational Cybersecurity Awareness Platform</p>
          <p className="mt-2 text-sm">All content is simulated and safe. No real hacking or malicious activities.</p>
        </div>
      </footer>
    </div>
  );
}

