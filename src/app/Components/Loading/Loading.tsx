"use client"

import AppContext from "../../Context/AppContext";
import { gsap } from "gsap";

// HOOKS
import { useContext, useEffect, useRef } from "react";
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect";

// TYPES
import { ContextTypes } from "../../Types";

// Style Import
import LoadingStyles from '../../Styles/modules/loading.module.scss'

export default function Loading() {

  const { finishLoading, smoothScroller } = useContext<ContextTypes>(AppContext)

  const LoadingSceneRef = useRef<HTMLDivElement | null>(null)

  const LogoVideoWrapper = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isVidPlaying = useRef(true)

  const finishLoadingScene = () => {

    if ( !LoadingSceneRef.current || !isVidPlaying.current ) return
    isVidPlaying.current = false
    finishLoading()

    setTimeout(() => {

      gsap.timeline()
        .set(LogoVideoWrapper.current, {
          display: "none"
        })
        .to(LoadingSceneRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .set(LoadingSceneRef.current, {
          pointerEvents: 'none'
        })
  
      document.body.classList.remove('no-scroll')
      if ( smoothScroller ) {
        smoothScroller.start()
        smoothScroller.scrollTo(0, {
          immediate: true,
        })
      }

    },0)

  }

  useEffect(() => {
    if ( videoRef.current ) videoRef.current.playbackRate = 1.5
  },[])

  // useIsomorphicLayoutEffect(() => {

  //   const TL = setTimeout( () => {
  //     if ( isVidPlaying.current )
  //       finishLoadingScene()
  //   },7000)

  //   return () => {
  //     clearTimeout(TL)
  //   }
  // },[smoothScroller])

  // const playVideo = () => {
  //   console.log("loaded")
  //   // videoRef.current?.play()
  // }

  return (
      <div className={LoadingStyles.loading_scene} ref={LoadingSceneRef} >

        <div className={LoadingStyles.video_container} ref={LogoVideoWrapper} >
          <video autoPlay={true} ref={videoRef} muted onEndedCapture={() => finishLoadingScene() } playsInline={true} 
          data-wf-ignore="true" data-object-fit="cover"  >

            <source src="/Logo/Logo.webm" type="video/webm" data-wf-ignore="true" />
            <source src="/Logo/Logo.mp4" type="video/mp4" data-wf-ignore="true" />

          </video>
        </div>

        <button className={LoadingStyles.skip_button} onClick={() => finishLoadingScene() }>
          <span>Skip</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
          </svg>
        </button>

      </div>
  )
}
