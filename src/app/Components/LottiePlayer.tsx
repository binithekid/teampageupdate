'use client';

import { useRef } from "react"

// import { DotLottiePlayer } from "@johanaarstein/dotlottie-player";
import useIsomorphicLayoutEffect from "../Hooks/useIsomorphicLayoutEffect";

import '@johanaarstein/dotlottie-player';
// import { PlayMode } from "@dotlottie/player-component";

// import dynamic from "next/dynamic"
// const LottiePlayer = dynamic(()=>{return import('@dotlottie/player-component')}, {ssr: false});

interface DotLottiePlayerProps {
  refCB?: ( lottie: any ) => void;
  loop?: boolean;
  autoplay?: boolean;
  src?: string;
  // playMode?: PlayMode;
  direction?: 1 | -1;
}

export default function LottiePlayer({ refCB = () => {}, loop = true, autoplay = false, src = "", direction }: DotLottiePlayerProps){

  const lottieRef = useRef(null)

  useIsomorphicLayoutEffect(() => {

    refCB(lottieRef.current)

  },[])

  return (
    <div>

      <dotlottie-player
        src={src}
        autoplay={autoplay}
        ref={lottieRef}
        subframe={true}
        // mode={playMode}
        direction={direction}
        loop=""
      />

    </div>
  );
}