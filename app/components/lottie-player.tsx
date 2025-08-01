"use client";

import { FC } from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottiePlayer: FC<LottiePlayerProps> = ({ 
  animationData, 
  loop = true, 
  autoplay = true, 
  className 
}) => {
  return (
    <div className={className}>
      <Lottie 
        animationData={animationData} 
        loop={loop} 
        autoplay={autoplay} 
      />
    </div>
  );
};

export default LottiePlayer;
