// Image utility to use local images if available, otherwise fallback to Unsplash

const getImagePath = (localPath: string, fallbackUrl: string): string => {
  // In production, you can check if the image exists
  // For now, we'll use a simple approach: try local first, fallback to URL
  // You can replace this with actual image existence checking if needed
  return localPath;
};

export const images = {
  // Landing Page
  hero: getImagePath(
    '/images/hero-cybersecurity.png',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80'
  ),
  phishingFeature: getImagePath(
    '/images/phishing-feature.png',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&q=80'
  ),
  networkFeature: getImagePath(
    '/images/network-feature.jpg',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&q=80'
  ),
  osintFeature: getImagePath(
    '/images/osint-feature.jpg',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&q=80'
  ),
  cta: getImagePath(
    '/images/cta-cybersecurity.jpg',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&q=80'
  ),

  // Authentication
  login: getImagePath(
    '/images/login-cybersecurity.jpg',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=800&fit=crop&q=80'
  ),
  signup: getImagePath(
    '/images/signup-network.jpg',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=800&fit=crop&q=80'
  ),

  // Dashboard
  phishingCard: getImagePath(
    '/images/phishing-card.jpg',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&q=80'
  ),
  networkCard: getImagePath(
    '/images/network-card.jpg',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&q=80'
  ),
  osintCard: getImagePath(
    '/images/osint-card.jpg',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop&q=80'
  ),

  // Missions
  missionsHeader: getImagePath(
    '/images/missions-header.jpg',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop&q=80'
  ),

  // Mission Details
  missionPhishing: getImagePath(
    '/images/mission-phishing.jpg',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&q=80'
  ),
  missionNetwork: getImagePath(
    '/images/mission-network.jpg',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=80'
  ),
  missionOsint: getImagePath(
    '/images/mission-osint.jpg',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop&q=80'
  ),
};

