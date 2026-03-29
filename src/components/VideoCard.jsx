import React, { useRef, useState, useEffect } from 'react';

const VideoCard = ({ icon, title, subtitle }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Play automatically when scrolled into view (useful for mobile)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Will play successfully automatically because the video starts muted!
        videoElement.play().catch(() => {});
      } else {
        videoElement.pause();
      }
    }, {
      threshold: 0.4
    });

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleAudio = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
    if (isMuted && videoRef.current) {
        videoRef.current.play().catch(() => {});
    }
  };

  const hasTextContent = !!(icon || title || subtitle);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleAudio}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '320px', 
        margin: '0 auto',  
        overflow: 'hidden',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        aspectRatio: '9 / 16', 
        backgroundColor: 'rgba(0,0,0,0.05)'
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/Video-830.mp4"
        loop
        playsInline
        muted={isMuted}
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform 300ms ease-out',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      />

      {/* Audio Toggle Button */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 30,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          borderRadius: '50%',
          width: '40px', 
          height: '40px',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: '#fff', 
          fontSize: '18px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </div>

      {hasTextContent && (
        <>
          {/* Premium Gradient Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1))',
              zIndex: 10,
              pointerEvents: 'none'
            }} 
          />

          {/* Text Content */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '32px',
              pointerEvents: 'none'
            }}
          >
            {icon && <span style={{ fontSize: '30px', marginBottom: '16px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>{icon}</span>}
            {title && (
              <h3 style={{ 
                fontSize: 'clamp(28px, 4vw, 36px)', 
                fontWeight: 500, 
                color: '#fff', 
                marginBottom: '12px',
                fontFamily: 'var(--serif)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ 
                fontSize: 'clamp(12px, 1.5vw, 14px)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em', 
                color: 'var(--gold)', 
                fontFamily: 'var(--sans)',
                fontWeight: 500
              }}>
                {subtitle}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCard;
