"use client"

import { useContext } from 'react';
import Lenis from '@studio-freight/lenis'

import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import AppContext from '../Context/AppContext';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { ContextTypes } from '../Types';

gsap.registerPlugin(ScrollTrigger)

export default function useSmoothScroll() {

  const { setSmoothScroller } = useContext<ContextTypes>(AppContext)

  useIsomorphicLayoutEffect (() => {

    let lenis: any;
    // const isTouch = isTouchScreendevice()
    // console.log("isTouch:",isTouch)

    // if ( !isTouch ) {
    //   document.body.classList.add('smooth')
    //   lenis = initialLenis()
    // }

    document.body.classList.add('smooth')
    lenis = initialLenis()


    return () => {

      if( lenis && lenis.destroy ) {

        document.body.classList.remove('smooth')
        lenis.destroy()
        
      }

    }
    
  }, []);
 
  const initialLenis = () => {

    document.body.classList.remove('no-scroll')

    let lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,

    })  

    lenis.stop()
    setSmoothScroller(lenis)
    
    // lenis.on('scroll', ScrollTrigger.update)

    // gsap.ticker.add((time)=>{
    //   lenis.raf(time * 1000)
    // })
    // gsap.ticker.lagSmoothing(0)
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    return lenis
  }

  return (null);
}