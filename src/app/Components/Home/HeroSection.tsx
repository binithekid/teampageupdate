"use client";

import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";

import styles from "../../Styles/modules/Home/Hero.module.scss";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "@johanaarstein/dotlottie-player";
import Link from "next/link";
import { usePageTransition } from "../PageTransition";
import Image from "next/image";

const aboutContents = `Digital Gravity Infrastructure Partners will advise on the investment in assets and companies that provide the infrastructure of data and the internet, supporting the digital transformation of society.<br/><br/>
We are specialists in digital infrastructure, focused on adding value where we aim to build leading neutral and scalable businesses to drive positive change.<br/><br/>
Our strategy seeks investments in and builds capabilities across the global connectivity value chain, empowering underserved communities, and shaping a connected, sustainable future.`;

export const HeroSection = () => {
  const { loadingScene, deviceSize } = useContext<ContextTypes>(AppContext);

  const heroSectionRef = useRef(null);

  const heroFirstSceneRef = useRef(null);
  const heading1 = useRef(null);
  const heading2 = useRef(null);
  const heading3 = useRef(null);

  const headersContainer = useRef(null);

  const aboutHeading2Ref = useRef(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const aboutLinkButtonRef = useRef(null);

  const { onLinkClick } = usePageTransition();
  const lottieSceneWrapper = useRef(null);

  useEffect(() => {
    if (loadingScene) return;

    // console.log("loadingScene:",loadingScene)
    IntroAnimation();
  }, [loadingScene]);

  useEffect(() => {
    let gsapCtx: any;

    const TL = setTimeout(() => HeroAnimationScene(gsapCtx), 0);

    return () => {
      if (gsapCtx) gsapCtx.kill();
      clearTimeout(TL);
    };
  }, []);

  const IntroAnimation = () => {
    // Initial Hero Animation Scene
    const HeroAnimationElements = [
      heading1.current,
      heading2.current,
      heading3.current,
    ];
    gsap.set(HeroAnimationElements, { alpha: 0 });
    gsap.fromTo(
      HeroAnimationElements,
      {
        alpha: 0,
        yPercent: 25,
      },
      {
        alpha: 1,
        yPercent: 0,
        duration: 1.5,
        stagger: 0.01,
        ease: "expo.out",
      }
    );
  };

  function HeroAnimationScene(gsapCtx: any) {
    gsapCtx = gsap.context(() => {
      const heroFirstSectionStart = `top+=${window.innerHeight * 0.15}px top`;
      const heroFirstSectionEnd = `+=${window.innerHeight * 0.2}px`;

      const heroSecondSectionStart = `top+=${window.innerHeight * 0.36}px top`;
      const heroSecondSectionEnd = `+=${window.innerHeight * 0.24}px`;

      gsap.to(heroFirstSceneRef.current, {
        yPercent: -3,
        alpha: 0,
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: heroFirstSectionStart,
          end: heroFirstSectionEnd,
          scrub: true,
          onLeave: () => {
            gsap.set(heroFirstSceneRef.current, { pointerEvents: "none" });
          },
          onEnterBack: () => {
            gsap.set(heroFirstSceneRef.current, { pointerEvents: "all" });
          },
        },
        ease: "none",
      });

      gsap.fromTo(
        lottieSceneWrapper.current,
        {
          top: "45svh",
        },
        {
          top: 0,
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 0.6}px`,
            scrub: true,
          },
          ease: "none",
        }
      );

      gsap.fromTo(
        aboutHeading2Ref.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: heroSecondSectionStart,
            end: heroSecondSectionEnd,
            scrub: true,
            onEnter: () => {
              gsap.to(lottieSceneWrapper.current, {
                alpha: 0.25,
                ease: "power2.outIn",
                duration: 0.5,
              });
            },
            onLeaveBack: () => {
              gsap.to(lottieSceneWrapper.current, {
                alpha: 1,
                ease: "power2.outIn",
                duration: 0.5,
              });
            },
          },
          ease: "none",
        }
      );

      // const allContentElements = contentWrapper.current?.children;
      // if (allContentElements) {

      //   gsap.set(allContentElements, { opacity: 1 });
      //   gsap.set(allContentElements, { alpha: 0 });
      //   gsap.set(allContentElements[0], { alpha: 1 });

      // }
      // const progressPart = 1 / aboutContents.length;

      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: `top+=${window.innerHeight * 0.45}px top`,
        end: `bottom bottom`,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          // if (!allContentElements) return;
          // const currentActiveSlide = Math.floor( progress / progressPart)
          // if ( currentActiveSlide !== activeParagraph.current && currentActiveSlide <= aboutContents.length - 1 ) {
          //   switchContent(currentActiveSlide,activeParagraph.current);
          //   activeParagraph.current = currentActiveSlide
          // }
        },
        onLeave: () => {
          gsap.to(lottieSceneWrapper.current, {
            alpha: 0,
            ease: "power2.out",
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(lottieSceneWrapper.current, {
            alpha: 0.25,
            ease: "power2.out",
            duration: 0.5,
          });
        },
      });

      // const switchContent = (newIdx: number, oldIdx?: number) => {
      //   if (!allContentElements) return;

      //   if (oldIdx !== undefined)
      //     gsap.to(allContentElements[oldIdx], {
      //       alpha: 0,
      //       ease: "power2.outIn",
      //       duration: 0.35,
      //       overwrite: true,
      //       pointerEvents: "none",
      //     });
      //   gsap.fromTo(
      //     allContentElements[newIdx],
      //     {
      //       y: 25,
      //     },
      //     {
      //       y: 0,
      //       alpha: 1,
      //       ease: "power2.outIn",
      //       duration: 0.5,
      //       delay: oldIdx ? 0.25 : 0,
      //       overwrite: true,
      //       pointerEvents: "all",
      //     }
      //   );
      // };
    }, heroSectionRef);
  }

  // useAddCursorPull(aboutLinkButtonRef, {
  //     useDefaultScroller: true,
  //   },
  // [])

  const MeetTeamClick = (e: any) => {
    e.preventDefault();
    onLinkClick(e, "/team");
  };

  return (
    <section className={`${styles.hero_section}`} ref={heroSectionRef}>
      <div className={styles.hero_sticky_wrapper}>
        <header ref={heroFirstSceneRef}>
          <h1 ref={heading1}>Building&nbsp;</h1>
          <h1 ref={heading2}>sustainable&nbsp;</h1>
          <h1 ref={heading3}>connectivity.</h1>
        </header>

        <div
          className={`container ${styles.about_section}`}
          ref={headersContainer}
        >
          <div
            className={styles.about_section_heading_wrapper}
            ref={aboutHeading2Ref}
          >
            <h2>
              <span>About Us</span>
              <span>
                Our mission is to invest in a more sustainable and inclusive
                digital future
              </span>
              A Pure Play Digital Infrastructure Specialist
            </h2>

            <div className={styles.content_wrapper} ref={contentWrapper}>
              <p dangerouslySetInnerHTML={{ __html: aboutContents }}></p>
            </div>

            <div className={styles.button_container}>
              <Link
                href="/team"
                ref={aboutLinkButtonRef}
                onClick={MeetTeamClick}
              >
                Meet the team
              </Link>
              <div className={styles.scroll_down}>
                <p> Or Scroll down for our Strategy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.lottie_scene_wrapper} ref={lottieSceneWrapper}>
        {deviceSize > 768 ? (
          <dotlottie-player
            className={`lottie_element ${styles.lottie_element}`}
            src="/Lottie/Hero.lottie"
            autoplay="autoplay"
            subframe={true}
            speed={0.5}
            loop=""
          />
        ) : (
          <Image
            src="/m_hero.png"
            priority
            alt="Building sustainable connectivity"
            fill
            sizes="100vw"
          />
        )}
        {/* <div className={styles.lottie_overlay} ></div> */}
      </div>
    </section>
  );
};
