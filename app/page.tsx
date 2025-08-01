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
      const interval = setInterval(() => {
        setTextIndex((prev) => {
          if (prev < texts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              router.push("/confetti");
            }, 2000);
            return prev;
          }
        });
      }, 3000);
    
      return () => clearInterval(interval);
    }, [router, texts.length]);
    


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
