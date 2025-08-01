"use client";

import React, { useState, useRef } from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';
import Link from 'next/link';

const BirthdayLetterWebsite = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      setTimeout(() => {
        setShowCard(true);
      }, 800);

      // Play music
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log("Autoplay blocked, user must interact:", err);
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Audio element */}
      <audio ref={audioRef} src="/music/gaze.mp3" preload="auto" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-sky-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-50 animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-sky-200 rounded-full opacity-40 animate-pulse delay-1500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Envelope */}
        <div 
          className={`relative cursor-pointer transition-all duration-1000 transform ${
            isEnvelopeOpen ? 'scale-110' : 'hover:scale-105'
          }`}
          onClick={handleEnvelopeClick}
        >
          {/* Envelope body */}
          <div className="relative w-80 h-56 bg-gradient-to-br from-blue-100 to-sky-200 rounded-lg shadow-2xl">
            {/* Paper texture overlay */}
            <div 
              className="absolute inset-0 rounded-lg opacity-30 mix-blend-multiply"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 1px, transparent 1px),
                  radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 1px, transparent 1px),
                  radial-gradient(circle at 40% 20%, rgba(0,0,0,0.05) 1px, transparent 1px),
                  radial-gradient(circle at 60% 80%, rgba(0,0,0,0.03) 1px, transparent 1px),
                  repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)
                `,
                backgroundSize: '50px 50px, 60px 60px, 30px 30px, 40px 40px, 3px 3px'
              }}
            ></div>
            
            {/* Envelope flap */}
            <div 
              className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-200 to-sky-300 transform-gpu transition-all duration-1000 ease-out origin-top ${
                isEnvelopeOpen 
                  ? 'rotate-[-180deg] translate-y-[-100%]' 
                  : 'rotate-0 translate-y-0'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 70%, 0 70%)'
              }}
            >
              {/* Paper texture on flap */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 1px, transparent 1px),
                    radial-gradient(circle at 70% 70%, rgba(0,0,0,0.05) 1px, transparent 1px),
                    repeating-linear-gradient(30deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)
                  `,
                  backgroundSize: '40px 40px, 50px 50px, 4px 4px',
                  clipPath: 'polygon(0 0, 100% 0, 50% 70%, 0 70%)'
                }}
              ></div>
              
              {/* Heart seal */}
              <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
                isEnvelopeOpen ? 'opacity-0' : 'opacity-100'
              }`}>
                <Heart className="w-6 h-6 text-blue-700 fill-current" />
              </div>
            </div>

            {/* Envelope front decorative elements */}
            <div className="absolute bottom-4 left-4 flex space-x-2 opacity-60">
              <Gift className="w-4 h-4 text-blue-600" />
            </div>
            
            {/* Click instruction */}
            {!isEnvelopeOpen && (
              <div className="absolute bottom-2 right-4 text-xs text-blue-700 font-light animate-pulse">
                Klik untuk membuka
              </div>
            )}
          </div>
        </div>

        {/* Birthday card popup */}
        {showCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-500">
            <div 
              className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 transform transition-all duration-700 ease-out ${
                showCard 
                  ? 'scale-100 rotate-0 opacity-100' 
                  : 'scale-50 rotate-12 opacity-0'
              }`}
              style={{
                animation: 'paperFold 1.0s ease-out'
              }}
            >
              {/* Paper texture overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(100,149,237,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(30,144,255,0.08) 1px, transparent 1px),
                    radial-gradient(circle at 50% 10%, rgba(0,0,0,0.03) 1px, transparent 1px),
                    radial-gradient(circle at 20% 80%, rgba(0,0,0,0.02) 1px, transparent 1px),
                    repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(70,130,180,0.05) 20px, rgba(70,130,180,0.05) 21px),
                    repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)
                  `,
                  backgroundSize: '60px 60px, 80px 80px, 40px 40px, 50px 50px, 21px 21px, 4px 4px'
                }}
              ></div>

              {/* Close button */}
              <button 
                onClick={() => setShowCard(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors z-10"
              >
                <span className="text-blue-600">×</span>
              </button>

              {/* Card content */}
              <div className="text-center space-y-6 relative z-10">
                <div className="relative">
                  <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-blue-400 animate-pulse" />
                  <h1 className="text-3xl font-light text-blue-800 mb-2">
                    Selamat Hari Lahir!
                  </h1>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-blue-300 to-sky-300 mx-auto"></div>
                </div>

                <div className="space-y-4 text-blue-700 max-h-[400px] overflow-y-auto">
                  <p className="text-lg font-light leading-relaxed text-left">
                    Mungkin kedengarannya lebay ya, tapi hari ini adalah hari dimana dunianya aku, lahir ke dunia. So i am really happy with that.
                  </p>
                  <div className="flex justify-center space-x-2 text-2xl">
                    🎉 🎂 🎈
                  </div>
                  <p className="text-base text-blue-500 font-light text-left">
                    Sekali lagi, selamat hari lahir ya. Ga kerasa banyak banget obstacle yang udah kamu lewatin. Dimulai dari masa kamu stress sama masalah di rumah sampe sampe ikut ekskul buat lupain itu semua.
                  </p>
                  <p className='text-left'>Ada juga waktu di mana kamu mulai belajar UI/UX sama aku, yang ga jarang ada momen pusing sampe ga disangka ada nangisnya juga, lucu banget kalau diinget-inget lagi😁</p>
                  <p className='text-left'>Jujur, aku bangga sama kamu. Lahir sebagai anak perempuan yang tidak terlalu terpenuhi gizi kasih sayangnya dari orang tua, tapi masih bisa bertumbuh, berkembang menjadi orang yang penyayang.</p>
                  <p className='text-left'>Kalau kamu bisa jadi Sore, terus ketemu diri kamu di masa-masa sulit, kayanya mereka bakalan bangga deh liat kamu yang sekarang. Bangga karena sudah being strong enough to make it throught it.</p>
                  <p className='text-left'>Harapan aku cuman 2, i wish you happy and healthy, always. Keep that damn cute smile and dimple in ur face forever ya.</p>
                  <p className='text-left italic'>- Dari Appa, pacar sekaligus yang jagain Aya sekarang ❤️</p>

                  <Link href="/gallery">
                    Liatt galleri
                  </Link>
                </div>

                <div className="flex justify-center">
                  <Heart className="w-8 h-8 text-blue-400 fill-current animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes paperFold {
          0% { transform: translateY(-30px) rotateX(90deg) rotateY(-20deg) scale(0.8); opacity: 0; box-shadow: 0 0 0 rgba(0,0,0,0); }
          25% { transform: translateY(-20px) rotateX(45deg) rotateY(-10deg) scale(0.9); opacity: 0.3; box-shadow: 0 10px 20px rgba(70,130,180,0.1); }
          50% { transform: translateY(-10px) rotateX(15deg) rotateY(-5deg) scale(0.95); opacity: 0.6; box-shadow: 0 15px 30px rgba(70,130,180,0.15); }
          75% { transform: translateY(-5px) rotateX(5deg) rotateY(2deg) scale(0.98); opacity: 0.8; box-shadow: 0 20px 40px rgba(70,130,180,0.2); }
          100% { transform: translateY(0) rotateX(0deg) rotateY(0deg) scale(1); opacity: 1; box-shadow: 0 25px 50px rgba(70,130,180,0.25); }
        }
        .animate-in { animation-fill-mode: both; }
        .fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default BirthdayLetterWebsite;
