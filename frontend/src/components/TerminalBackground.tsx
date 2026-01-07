import { useEffect, useRef } from 'react';

export const TerminalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const fontSize = 14;
        const columns = Math.ceil(width / fontSize);
        const drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -100); // Start at random positions above

        const chars = '01XY<>[]{}*-+~^01';

        const draw = () => {
            // Trail effect
            ctx.fillStyle = 'rgba(0, 5, 2, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px "Courier New", monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random character
                const text = chars.charAt(Math.floor(Math.random() * chars.length));

                // Color variation
                const isBright = Math.random() > 0.99;
                ctx.fillStyle = isBright ? '#FFFFFF' : '#0F0';

                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Reset or move down
                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none opacity-30"
            />
            {/* Scanline overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />
        </>
    );
};
