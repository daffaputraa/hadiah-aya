"use client";

import { useState } from "react";
import Image from "next/image";
import "../globals.css"; // pastikan global css diimport

export default function Home() {
  const [play, setPlay] = useState(false);

  const images = [
    "/assets/galeri-satu (3).jpg",
    "/assets/galeri-satu (3).jpg",
    "/assets/galeri-satu (2).jpg",
    "/assets/galeri-satu (4).jpg",
    "/assets/galeri-satu (5).jpg",
    "/assets/galeri-satu (7).jpg",
    "/assets/galeri-satu (8).jpg",
    "/assets/galeri-satu (6).jpg",
    // "/assets/galeri-satu (1).jpg",
  ];

  const handlePlay = () => {
    const audio = new Audio("/music/kita.mp3");
    audio.play();
    setPlay(true);
  };

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      {/* Popup muncul kalau belum play */}
      {!play && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <h2 className="text-white text-2xl mb-4">Lanjut?</h2>
          <button
            onClick={handlePlay}
            className="bg-green-500 px-6 py-3 rounded-lg text-white text-lg"
          >
            Lanjutt dong
          </button>
        </div>
      )}

      {/* Gallery muncul setelah play */}
      {play && (
        <div className="w-full overflow-hidden bg-black py-10">
          {/* Row 1 */}
          <div className="marquee">
            {images.concat(images).map((src, i) => (
              <Image
                key={`row1-${i}`}
                src={src}
                alt={`gallery-${i}`}
                width={300}
                height={200}
                className="mx-4 rounded-lg"
              />
            ))}
          </div>

          {/* Row 2 (reverse) */}
          <div className="marquee-reverse mt-6">
            {images.concat(images).map((src, i) => (
              <Image
                key={`row2-${i}`}
                src={src}
                alt={`gallery2-${i}`}
                width={300}
                height={200}
                className="mx-4 rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
