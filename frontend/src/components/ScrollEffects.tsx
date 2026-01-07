import { useEffect, useRef } from 'react';

export const ScrollEffects = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (documentHeight - windowHeight);

      if (overlayRef.current) {
        // Create color dissolving effect based on scroll position

        const opacity = Math.min(scrollPercent * 0.3, 0.3);

        overlayRef.current.style.background = `linear-gradient(
          135deg,
          rgba(0, 255, 136, ${opacity * 0.5}) 0%,
          rgba(0, 102, 255, ${opacity * 0.5}) 50%,
          rgba(124, 58, 237, ${opacity * 0.5}) 100%
        )`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none z-50 transition-all duration-300"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
};




