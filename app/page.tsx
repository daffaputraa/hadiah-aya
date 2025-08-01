"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LottiePlayer from "./components/lottie-player";
import animationData from "./../public/assets/cat-loading.json";

export default function Home() {
  const router = useRouter();
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "“Tunggu sebentar...”",
    "“Bentar ya...”",
    "“Cie ga sabar...”",
    "“Siapp?”",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Ganti teks setiap 3 detik
    interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) {
          return prev + 1;
        } else {
          // Kalau sudah sampai teks terakhir, berhenti interval
          clearInterval(interval);
          // Tunggu sedikit sebelum redirect biar teks terakhir kebaca
          setTimeout(() => {
            router.push("/confetti");
          }, 2000); // kasih jeda 2 detik setelah teks terakhir
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LottiePlayer
        animationData={animationData}
        loop={true}
        autoplay={true}
      />
      <h1 className="text-2xl font-bold">{texts[textIndex]}</h1>
    </div>
  );
}
