"use client";

import { ReactNode, useContext, useRef } from "react";
import Header from "./Header/Header";
import { ContextTypes } from "../Types";
import AppContext from "../Context/AppContext";
// import useSmoothScroll from '../Hooks/useSmoothScroll';
import useCursorBall from "../Hooks/useCursorBall";
import useIsomorphicLayoutEffect from "../Hooks/useIsomorphicLayoutEffect";
import { FixedTopLinks } from "./Header/FixedTopLinks";
import Loading from "./Loading/Loading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSmoothScroll from "../Hooks/useSmoothScroll";
import { Footer } from "./Footer";
import { Acceptance } from "./Acceptance";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

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

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const { changeDeviceSize, setPageTransitionTL } =
    useContext<ContextTypes>(AppContext);

  useSmoothScroll(); // Remove this line if you're not using smooth scroll and using native browser scroll

  useCursorBall(); // Remove this line if your not using cursor ball

  const activeRoute = usePathname();
  const isFirstLoad = useRef(true);

  const startPageTransitionAnimation = (overlayPath: any) => {
    return gsap
      .timeline({
        paused: true,
      })
      .set(overlayPath, {
        attr: { d: paths.step1.unfilled },
      })
      .to(
        overlayPath,
        {
          duration: 0.3,
          ease: "power4.in",
          attr: { d: paths.step1.inBetween.curve2 },
        },
        0
      )
      .to(overlayPath, {
        duration: 0.1,
        ease: "power1",
        attr: { d: paths.step1.filled },
      })
      .fromTo(
        ".page_transition_logo svg",
        {
          yPercent: 10,
          alpha: 0,
        },
        {
          yPercent: 0,
          alpha: 1,
          ease: "power4",
          duration: 0.3,
        },
        0.2
      )
      .set(overlayPath, {
        attr: { d: paths.step2.filled },
      });
    // return TL
  };

  useIsomorphicLayoutEffect(() => {
    ScrollTrigger.refresh();

    if (isFirstLoad.current) {
      isFirstLoad.current = false;

      const overlayPath = document.querySelector(
        "#PageTransition .overlay__path"
      );
      setPageTransitionTL(startPageTransitionAnimation(overlayPath));
    }
  }, [activeRoute]);

  useIsomorphicLayoutEffect(() => {
    // finishLoading()
    // const TL = setTimeout(() => {
    //   finishLoading()
    // },1000)

    changeDeviceSize(window.innerWidth);

    const onWindowResize = () => {
      // console.log('window resized');

      // Refresh gsap scrollTrigger memory and animation progress all over the page
      // ScrollTrigger.clearScrollMemory();
      // window.history.scrollRestoration = 'manual';

      // if ( window.innerWidth > 768 ) ScrollTrigger.refresh()
      ScrollTrigger.refresh();
      changeDeviceSize(window.innerWidth);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      // clearTimeout(TL)
    };
  }, []);

  return (
    <>
      <FixedTopLinks />
      <Header />
      <Acceptance />
      {/* <Loading /> */}
      <div>{children}</div>
      <Footer />
    </>
  );
};
