import { useState, useEffect } from 'react';

const HeartbeatScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY;
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScrollableHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalScrollableHeight) * 100));
        setScrollProgress(progress);
        setIsVisible(currentScrollY > 20);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="ecg-scroll-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        zIndex: 99999,
        pointerEvents: 'none',
        backgroundColor: 'rgba(10, 43, 78, 0.15)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      {/* Progress Track */}
      <div 
        className="ecg-scroll-bar"
        style={{
          width: `${scrollProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #0A2B4E 0%, #00C9A7 40%, #E0A96D 80%, #FFD166 100%)',
          boxShadow: '0 0 10px rgba(224, 169, 109, 0.8), 0 0 18px rgba(0, 201, 167, 0.5)',
          position: 'relative',
          transition: 'width 0.1s linear'
        }}
      >
        {/* Leading ECG Heartbeat Pulse Node */}
        {scrollProgress > 1 && (
          <div 
            className="ecg-pulse-tip"
            style={{
              position: 'absolute',
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Outer Pulse Ring */}
            <span 
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'rgba(224, 169, 109, 0.4)',
                animation: 'ecgPingRing 1.4s cubic-bezier(0, 0, 0.2, 1) infinite'
              }}
            />
            
            {/* Central Glowing Dot */}
            <span 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 8px #FFD166, 0 0 14px #E0A96D',
                zIndex: 2
              }}
            />

            {/* Micro ECG SVG Blip */}
            <svg 
              viewBox="0 0 24 12" 
              style={{
                position: 'absolute',
                top: '-18px',
                right: '-4px',
                width: '28px',
                height: '14px',
                filter: 'drop-shadow(0 0 4px #E0A96D)'
              }}
            >
              <polyline 
                points="0,6 6,6 8,1 11,11 13,3 15,9 17,6 24,6" 
                fill="none" 
                stroke="#FFD166" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ecgPingRing {
          0% {
            transform: scale(0.6);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeartbeatScrollProgress;
