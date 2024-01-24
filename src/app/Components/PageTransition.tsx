"use client"

import { useContext, useRef } from "react"
import { ContextTypes } from "../Types"
import AppContext from "../Context/AppContext"
import { usePathname, useRouter } from "next/navigation"
import { gsap } from "gsap"
import useIsomorphicLayoutEffect from "../Hooks/useIsomorphicLayoutEffect"

const paths = {
  step1: {
    unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
    inBetween: {
      curve1: "M 0 100 V 50 Q 50 100 100 50 V 100 z",
      curve2: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
    },
    filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
  },
  step2: {
    filled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
    inBetween: {
      curve2: "M 0 0 V 50 Q 50 0 100 50 V 0 z",
      curve1: "M 0 0 V 50 Q 50 100 100 50 V 0 z",
    },
    unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
  },
};

export const usePageTransition = () => {

  const { pageTransitionTL }  = useContext<ContextTypes>(AppContext)

  const activeRoute = usePathname()
  const router = useRouter()
  const isPageTransitionActive = useRef(false)

  const onLinkClick = (e: any,url: string) => {

    if ( url === activeRoute ) return
    
    e.preventDefault()
    isPageTransitionActive.current = true
    if ( pageTransitionTL ) pageTransitionTL.play(0)

    const overlayPath = document.querySelector("#PageTransition .overlay__path");

    setTimeout( () => {
      router.push(url)
      setTimeout(() => endPageTransitionAnimation(overlayPath),1000)
    },(pageTransitionTL.duration() * 1000) * 0.5)
  }

  const endPageTransitionAnimation = (overlayPath: any) => {
    gsap.timeline()
      .set(overlayPath, {
        attr: { d: paths.step2.filled },
      })
      .to(overlayPath, {
        duration: 1,
        ease: "power4",
        attr: { d: paths.step2.unfilled },
      })
      .fromTo(".page_transition_logo svg",{
        yPercent: 0,
        alpha: 1,
      }, {
        yPercent: -10,
        alpha: 0,
        ease: "power4",
        duration: 0.3
      },0)
  }

  // const isFirstLoad = useRef(true)

  // useIsomorphicLayoutEffect( () => {

  //   if ( isFirstLoad.current ) {
  //     isFirstLoad.current = false
  //     return
  //   }
  //   if ( !isPageTransitionActive.current ) return

  //   const overlayPath = document.querySelector("#PageTransition .overlay__path");
  //   console.log("overlayPath:",overlayPath)

  //   endPageTransitionAnimation(overlayPath)
  //   isPageTransitionActive.current = false

  // },[activeRoute,pageTransitionTL])

  return {
    onLinkClick
  }
}
