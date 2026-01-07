import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailPoint {
    id: number;
    x: number;
    y: number;
    char: string;
}

export const MatrixCursor = () => {
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const chars = "01";

    useEffect(() => {
        let counter = 0;

        // Throttling slightly to avoid too many DOM nodes
        let lastTime = 0;
        const throttleMs = 30;

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastTime < throttleMs) return;
            lastTime = now;

            // Add a new point
            const newPoint: TrailPoint = {
                id: counter++,
                x: e.clientX,
                y: e.clientY,
                char: chars.charAt(Math.floor(Math.random() * chars.length))
            };

            setTrail(prev => [...prev.slice(-20), newPoint]); // Keep last 20 points max
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <AnimatePresence>
                {trail.map(point => (
                    <motion.div
                        key={point.id}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, y: 20 }} // Fall down slightly
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-cyber-accent font-mono text-sm font-bold glow-text"
                        style={{
                            left: point.x,
                            top: point.y,
                            transform: 'translate(-50%, -50%)',
                            textShadow: '0 0 5px #00ff00'
                        }}
                    >
                        {point.char}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
