"use client"

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  delay: number;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
}

const ElegantBirthdayWebsite: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const birthdayMessages = [
    "HALOOO PACARRRR 🤩",
    "SELAMAT HARI LAHIRRR 🎉",
    "DOA PALING BAIK DARI AKU 💖",
    "SEMOGA BISA NGASIH MAKAN GRATIS KE BANYAK ORANG YA BENTAR LAGI 😁",
    "BUAT GANTIIN PRABOWO"
  ];

  const confettiColors = ['#ffd700', '#ff6b9d', '#c44569', '#f8b500', '#ff6348', '#00d2d3'];

  // Aggressive autoplay attempt with multiple strategies
  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          // Set audio properties for better autoplay chance
          audioRef.current.volume = 0.3;
          audioRef.current.loop = true;
          audioRef.current.muted = false;
          
          // Strategy 1: Direct play attempt
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
            setShowPlayPrompt(false);
            console.log('🎵 Music started automatically!');
          }
        } catch (error) {
          console.log('🔇 Autoplay blocked, showing play prompt');
          setShowPlayPrompt(true);
          
          // Strategy 2: Try with muted first (browsers often allow muted autoplay)
          try {
            if (audioRef.current) {
              audioRef.current.muted = true;
              await audioRef.current.play();
              setIsPlaying(true);
              setIsMuted(true);
              
              // Show unmute prompt
              setTimeout(() => {
                setShowPlayPrompt(true);
              }, 1000);
            }
          } catch (mutedError) {
            console.log('Even muted autoplay failed');
            setShowPlayPrompt(true);
          }
        }
      }
    };

    // Multiple timing attempts for better success rate
    const timers = [
      setTimeout(attemptAutoplay, 100),
      setTimeout(attemptAutoplay, 500),
      setTimeout(attemptAutoplay, 1000)
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Enhanced user interaction detection
  useEffect(() => {
    const handleFirstInteraction = async (event: Event) => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        
        try {
          // Unmute if was muted for autoplay
          if (isMuted) {
            audioRef.current.muted = false;
            setIsMuted(false);
          }
          
          // Start playing if not already
          if (!isPlaying) {
            await audioRef.current.play();
            setIsPlaying(true);
          }
          
          setShowPlayPrompt(false);
          console.log('🎵 Music started on user interaction!');
        } catch (error) {
          console.log('Could not start music on interaction:', error);
        }
      }
    };

    // Listen to multiple interaction types
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    
    events.forEach(eventType => {
      document.addEventListener(eventType, handleFirstInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(eventType => {
        document.removeEventListener(eventType, handleFirstInteraction);
      });
    };
  }, [hasInteracted, isPlaying, isMuted]);

  // Music control functions
  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowPlayPrompt(false);
        }
        setHasInteracted(true);
      } catch (err) {
        console.log('Could not toggle music:', err);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setHasInteracted(true);
    }
  };

  // Force play music function for the prominent play button
  const forcePlayMusic = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.3;
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
        setShowPlayPrompt(false);
        setHasInteracted(true);
        
        // Trigger celebration confetti
        const celebrationConfetti: Confetti[] = [];
        for (let i = 0; i < 50; i++) {
          celebrationConfetti.push({
            id: Date.now() + Math.random() + i,
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            size: Math.random() * 12 + 6,
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.5) * 10 - 3,
            rotationSpeed: (Math.random() - 0.5) * 20
          });
        }
        setConfetti(prev => [...prev, ...celebrationConfetti]);
        
      } catch (error) {
        console.log('Force play failed:', error);
      }
    }
  };

  // Initialize floating particles and confetti
  useEffect(() => {
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.6 + 0.2,
          delay: Math.random() * 4
        });
      }
      setParticles(newParticles);
    };

    const initConfetti = () => {
      const newConfetti: Confetti[] = [];
      for (let i = 0; i < 30; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: -10 - Math.random() * 100,
          rotation: Math.random() * 360,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 2,
          speedY: Math.random() * 3 + 1,
          rotationSpeed: (Math.random() - 0.5) * 10
        });
      }
      setConfetti(newConfetti);
    };

    setIsVisible(true);
    initParticles();
    
    // Delayed confetti for elegant entrance
    setTimeout(() => {
      initConfetti();
    }, 1000);
  }, []);

  // Animate confetti elegantly
  useEffect(() => {
    const animateConfetti = () => {
      setConfetti(prev => prev.map(piece => ({
        ...piece,
        x: piece.x + piece.speedX,
        y: piece.y + piece.speedY,
        rotation: piece.rotation + piece.rotationSpeed,
        speedY: piece.speedY + 0.05 // Gentle gravity
      })).filter(piece => piece.y < window.innerHeight + 50));
    };

    const interval = setInterval(animateConfetti, 50);
    return () => clearInterval(interval);
  }, []);

  // Auto confetti burst every 6 seconds
  useEffect(() => {
    const createAutoConfetti = () => {
      const newConfetti: Confetti[] = [];
      const burstCount = 15 + Math.random() * 15; // 15-30 pieces
      
      for (let i = 0; i < burstCount; i++) {
        // Random positions from top and sides
        const side = Math.random();
        let startX, startY;
        
        if (side < 0.6) {
          // From top
          startX = Math.random() * window.innerWidth;
          startY = -20 - Math.random() * 50;
        } else if (side < 0.8) {
          // From left
          startX = -20;
          startY = Math.random() * window.innerHeight * 0.3;
        } else {
          // From right
          startX = window.innerWidth + 20;
          startY = Math.random() * window.innerHeight * 0.3;
        }

        newConfetti.push({
          id: Date.now() + Math.random() + i,
          x: startX,
          y: startY,
          rotation: Math.random() * 360,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          size: Math.random() * 8 + 4,
          speedX: (Math.random() - 0.5) * 4,
          speedY: Math.random() * 3 + 1,
          rotationSpeed: (Math.random() - 0.5) * 12
        });
      }
      
      setConfetti(prev => [...prev, ...newConfetti]);
    };

    // Initial delay, then every 6 seconds
    const timeout = setTimeout(() => {
      createAutoConfetti();
      const interval = setInterval(createAutoConfetti, 6000);
      
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Change text every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % birthdayMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [birthdayMessages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Audio Element with multiple formats for better compatibility */}
      <audio 
        ref={audioRef}
        preload="auto"
        playsInline
        onLoadedData={() => console.log('🎵 Music loaded successfully')}
        onCanPlay={() => console.log('🎵 Music can play')}
        onPlay={() => console.log('🎵 Music started playing')}
        onError={(e) => console.log('❌ Audio error:', e)}
      >
        <source src="/music/0801.MP3" type="audio/mpeg" />
        <source src="/music/0801.mp3" type="audio/mpeg" />
        <source src="/music/0801.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Prominent Play Music Overlay */}
      {showPlayPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center max-w-sm mx-4">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-white text-xl mb-2 font-light">KLIK LANJUTTTTT BIAR BISA LANJUT KWKWKW</h3>
            <p className="text-white/70 text-sm mb-6"></p>
            <button 
              onClick={forcePlayMusic}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              🎶 LANJUTTTTT
            </button>
            <button 
              onClick={() => setShowPlayPrompt(false)}
              className="w-full mt-3 text-white/50 text-sm hover:text-white/70 transition-colors"
            >
              {/* Maybe later */}
            </button>
          </div>
        </div>
      )}

      {/* Music Control Panel */}
      <div className="fixed top-4 right-4 z-40 flex space-x-2">
        <button 
          onClick={toggleMusic}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white/80 hover:text-white"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <button 
          onClick={toggleMute}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-white/80 hover:text-white"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.814a1 1 0 011.617.814zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.814a1 1 0 011.617.814zM15 8a3 3 0 010 4V8zM16 6a5 5 0 010 8v-8z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Music Status Indicator */}
      {isPlaying && (
        <div className="fixed top-4 left-4 z-40 bg-green-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-green-400/30">
          <p className="text-green-200 text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            🎵 Music Playing
          </p>
        </div>
      )}

      {/* Elegant Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute opacity-80"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      ))}

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        />
      ))}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Main Content */}
      <div className={`min-h-screen flex flex-col items-center justify-center relative z-10 px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Main Typography */}
        <div className="text-center space-y-8 max-w-4xl">
          
          {/* Primary Message with Smooth Transition */}
          <div className="relative h-24 md:h-32 flex items-center justify-center">
            <h1 
              key={currentTextIndex}
              className="text-4xl md:text-6xl lg:text-5xl font-light text-white tracking-wide absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out"
              style={{
                fontFamily: 'Georgia, serif',
                animation: 'textFade 1s ease-in-out'
              }}
            >
              {birthdayMessages[currentTextIndex]}
            </h1>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center space-x-4 my-12">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 font-light tracking-wider leading-relaxed max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet. Kamu keren amet (dibaca : amat)!
              <br/>
              Karena ga bisa bikin kado yang dilipet-lipet pake kertas, jadi aku bikin ini KWKWWKWK
          </p>

          {/* Minimal Birthday Icons */}
          <div className="flex justify-center space-x-8 mt-12 text-2xl md:text-3xl">
            {['🕯️', '✨', '🌟'].map((icon, index) => (
              <span 
                key={index}
                className="animate-pulse opacity-60 hover:opacity-100 transition-opacity duration-300"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '2s'
                }}
              >
                {icon}
              </span>
            ))}
          </div>

          {/* Elegant CTA */}
          <div className="mt-16">
            <button 
              onClick={() => {
                // Try to start music if not playing
                if (!isPlaying) {
                  forcePlayMusic();
                }

                // Trigger elegant confetti burst
                const extraConfetti: Confetti[] = [];
                for (let i = 0; i < 25; i++) {
                  extraConfetti.push({
                    id: Date.now() + i,
                    x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                    y: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                    size: Math.random() * 10 + 6,
                    speedX: (Math.random() - 0.5) * 8,
                    speedY: (Math.random() - 0.5) * 8 - 2,
                    rotationSpeed: (Math.random() - 0.5) * 15
                  });
                }
                setConfetti(prev => [...prev, ...extraConfetti]);

                // Gentle particle burst
                const extraParticles: Particle[] = [];
                for (let i = 0; i < 10; i++) {
                  extraParticles.push({
                    id: Date.now() + i,
                    x: 50 + (Math.random() - 0.5) * 20,
                    y: 50 + (Math.random() - 0.5) * 20,
                    opacity: 0.8,
                    delay: i * 0.1
                  });
                }
                setParticles(prev => [...prev, ...extraParticles]);
                
                // Clean up after animation
                setTimeout(() => {
                  setParticles(prev => prev.slice(0, 20));
                }, 3000);
              }}
              className="group relative px-8 py-3 text-white/80 border border-white/20 rounded-full font-light tracking-wider hover:border-white/40 hover:text-white transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md"
            >
              <Link href="/surat">
                <span className="relative z-10">Baca Surat</span>
              </Link>
              <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-8 bg-gradient-to-t from-white/20 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes textFade {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-gentle-float {
          animation: gentleFloat 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ElegantBirthdayWebsite;