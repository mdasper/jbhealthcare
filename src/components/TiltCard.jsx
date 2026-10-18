import React, { useRef, useState, useEffect } from 'react';

/**
 * TiltCard - Premium Interactive 3D Perspective Tilt Component
 * 
 * Features:
 * - Ultra-smooth 60/120fps direct DOM transforms with perspective
 * - Dynamic specular holographic glare following mouse position
 * - Automatic disable on touch / mobile devices for zero scroll lag
 * - Preserves all child click, focus, and styling rules
 */
const TiltCard = ({
  children,
  className = '',
  style = {},
  maxTilt = 7,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  glareColor = 'rgba(224, 169, 109, 0.18)',
  glareMaxOpacity = 0.35,
  onClick,
  ...restProps
}) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary (mobile / tablet)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

    if (glare && glareRef.current) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle 280px at ${glareX}% ${glareY}%, ${glareColor}, transparent 75%)`;
      glareRef.current.style.opacity = glareMaxOpacity;
    }
  };

  const handleMouseEnter = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease-out';
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    if (glare && glareRef.current) {
      glareRef.current.style.opacity = 0;
      glareRef.current.style.transition = 'opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...restProps}
    >
      {children}

      {/* Dynamic Specular Glare Overlay */}
      {glare && !isTouchDevice && (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 10,
            opacity: 0,
            transition: 'opacity 0.2s ease-out',
            mixBlendMode: 'screen',
            overflow: 'hidden'
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
