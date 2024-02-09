"use client";

import { gsap } from "gsap";

import styles from "../../Styles/modules/Home/Strategy.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";

import "@johanaarstein/dotlottie-player";
import type { DotLottiePlayer } from "@johanaarstein/dotlottie-player";
import Image from "next/image";

const strategySlides = [
  {
    supTitle: "Returns",
    title: "Targeting higher<br/>infrastructure returns",
    content:
      "Digital Gravity is a digital infrastructure specialist investing in growth, mid-cap control opportunities by identifying sub-layers of macro tailwinds, leveraging its differentiated partner ecosystem and constructing portfolios that accelerate convergence value",
  },
  {
    supTitle: "Risk",
    title: "Enhanced risk <br/>mitigation",
    content:
      "Digital Gravity seeks to maintain traditional infrastructure risk profiles while delivering enhanced returns by leveraging its deep domain expertise and operational specialism in the rapidly growing and evolving digital infrastructure sector",
  },
  {
    supTitle: "Sustainability and digital inclusion",
    title: "Sustainable and digital <br/>inclusion mandate",
    content:
      "Digital Gravity integrates targets and policies to enhance the sustainability of digital infrastructure and to promote digital inclusivity and transformation",
  },
];

const MobileSlideImages = [
  "/strategy_m_1.jpg",
  "/strategy_m_2.jpg",
  "/strategy_m_3.jpg",
];

const firstSlideFrameEnd = 19;
const secondSlideFrameEnd = 80;
const thirdSlideFrameEnd = 133;

const heightMultiplier = 110;

export const StrategySlides = () => {
  const { loadingScene, deviceSize, smoothScroller } =
    useContext<ContextTypes>(AppContext);

  // if ( deviceSize <= 768 ) return <MobileStrategy data={strategySlides} />
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const strategySlidesSectionRef = useRef<HTMLElement>(null);
  const strategyHeadingContainer = useRef<HTMLDivElement>(null);
  const strategySliderRef = useRef<HTMLDivElement>(null);
  const strategySliderNavRef = useRef<HTMLDivElement>(null);

  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const lottieAnimationEl = useRef<DotLottiePlayer | null>(null);

  const activeSlideCounter = useRef(0);

  useEffect(() => {
    if (loadingScene) return;

    let gsapCtx: any;

    gsap.set(strategySlidesSectionRef.current, {
      height: `${100 + strategySlides.length * heightMultiplier}svh`,
    });

    const TL = setTimeout(() => strategySlidesAnimation(gsapCtx), 200);

    return () => {
      if (gsapCtx && gsapCtx.kill) gsapCtx.kill();
      clearTimeout(TL);
      // if ( lottieAnimationEl.current ) lottieAnimationEl.current.destroy()
    };
  }, [loadingScene, smoothScroller]);

  const strategySlidesAnimation = (gsapCtx: any) => {
    gsapCtx = gsap.context(() => {
      if (
        !strategySliderRef.current ||
        !strategyHeadingContainer.current ||
        !strategySliderNavRef.current
      )
        return;

      gsap.fromTo(
        strategyHeadingContainer.current.firstChild,
        {
          alpha: 0,
          yPercent: 50,
        },
        {
          alpha: 1,
          yPercent: 0,
          scrollTrigger: {
            trigger: strategySlidesSectionRef.current,
            start: "top-=15% top",
            end: "+=150px",
            scrub: true,
          },
          ease: "none",
        }
      );

      const slideItems = strategySliderRef.current.querySelectorAll(
        ".strategy_slide_item"
      );

      const firstSlideCounterSpan =
        slideItems[0].querySelector(".strategy_counter");
      const firstSlideHeadingHeading = slideItems[0].querySelector(
        ".slide_heading_container h4"
      );
      const firstSlideContentParagraph = slideItems[0].querySelector(
        ".slide_content_container p"
      );

      gsap.set(slideItems[0], {
        pointerEvents: "all",
      });
      gsap.set(firstSlideCounterSpan, {
        opacity: 1,
      });
      gsap.set([firstSlideHeadingHeading, firstSlideContentParagraph], {
        y: 0,
      });

      const goToLottieSlide = (prevSlideIdx: number, nextSlideIdx: number) => {
        if (!lottieAnimationEl.current) return;
        if (nextSlideIdx === 0)
          lottieAnimationEl.current.getLottie()?.goToAndStop(0, true);
        else if (nextSlideIdx === 1)
          lottieAnimationEl.current
            .getLottie()
            ?.goToAndStop(secondSlideFrameEnd, true);
        else if (nextSlideIdx === 2)
          lottieAnimationEl.current
            .getLottie()
            ?.goToAndStop(thirdSlideFrameEnd, true);

        // if ( nextSlideIdx > prevSlideIdx ) {
        // } else {

        //   if ( nextSlideIdx === 1 )
        //     lottieAnimationEl.current.getLottie()?.playSegments(secondSlideFrameEnd,false)
        // }

        // let targetFrame: number = 0;
        // const progressPart = ( 1 / strategySlides.length)
        // const curProgress = (progress - (activeSlideCounter.current * progressPart)) / progressPart

        // if ( activeSlideCounter.current === 0 ) {
        //   targetFrame = curProgress * firstSlideFrameEnd
        // } else if ( activeSlideCounter.current === 1 ) {
        //   targetFrame = firstSlideFrameEnd + (curProgress * ( secondSlideFrameEnd - secondSlideFrameStart ))
        // } else if ( activeSlideCounter.current === 2 ) {
        //   targetFrame = secondSlideFrameEnd + (curProgress * ( thirdSlideFrameEnd - thirdSlideFrameStart ))
        // }
      };

      const allNavItems = strategySliderNavRef.current.querySelectorAll("span");

      const updateSlideProgressNav = (newProgress: number) => {
        if (!strategySliderNavRef.current) return;

        const progressPart = 1 / slideItems.length;
        const targetNavItem = Math.floor(newProgress / progressPart);
        let navItemProgress =
          (newProgress - activeSlideCounter.current * progressPart) /
          progressPart;

        if (navItemProgress >= 0.9) navItemProgress = 1;
        else if (navItemProgress <= 0.1) navItemProgress = 0;

        if (targetNavItem !== activeSlideCounter.current) return;

        gsap.to(allNavItems[targetNavItem], {
          width: `${navItemProgress * 100}%`,
          duration: 0.5,
          ease: "expo.out",
          overwrite: true,
        });
      };

      const fillNavProgressBar = (idx: number) => {
        gsap.to(allNavItems[idx], {
          width: `100%`,
          duration: 0.5,
          ease: "expo.out",
          overwrite: true,
        });
      };
      const emptyNavProgressBar = (idx: number) => {
        gsap.to(allNavItems[idx], {
          width: `0%`,
          duration: 0.5,
          ease: "expo.out",
          overwrite: true,
        });
      };

      Array.from(strategySliderNavRef.current.children).forEach(
        (strategySlideTab, idx) => {
          strategySlideTab.addEventListener("click", () => {
            if (!strategySlidesSectionRef.current) return;

            const targetScroll =
              strategySlidesSectionRef.current.offsetTop +
              idx * window.innerHeight * 1.1 +
              80;

            smoothScroller.scrollTo(targetScroll, {
              duration: 0.5,
            });
          });
        }
      );

      const goToSlide = (prevSlide: number, nextSlide: number) => {
        goToLottieSlide(prevSlide, nextSlide);

        const prevSlideCounterSpan =
          slideItems[prevSlide].querySelector(".strategy_counter");
        const prevSlideHeadingHeading = slideItems[prevSlide].querySelector(
          ".slide_heading_container h4"
        );
        const prevSlideContentParagraph = slideItems[prevSlide].querySelector(
          ".slide_content_container p"
        );

        const nextSlideCounterSpan =
          slideItems[nextSlide].querySelector(".strategy_counter");
        const nextSlideHeadingHeading = slideItems[nextSlide].querySelector(
          ".slide_heading_container h4"
        );
        const nextSlideContentParagraph = slideItems[nextSlide].querySelector(
          ".slide_content_container p"
        );

        // Slide Counter Spans
        gsap.set(slideItems[prevSlide], {
          pointerEvents: "none",
          overwrite: true,
        });
        gsap.set(slideItems[nextSlide], {
          pointerEvents: "all",
          overwrite: true,
        });
        gsap.to(prevSlideCounterSpan, {
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: true,
        });
        gsap.to(nextSlideCounterSpan, {
          opacity: 1,
          duration: 0.5,
          delay: 0.15,
          ease: "expo.out",
          overwrite: true,
        });

        // Slide Headings & Contents in their container
        gsap.fromTo(
          [prevSlideHeadingHeading, prevSlideContentParagraph],
          {
            y: 0,
          },
          {
            y: "-150%",
            duration: 0.5,
            ease: "expo.out",
            overwrite: true,
          }
        );
        gsap.fromTo(
          [nextSlideHeadingHeading, nextSlideContentParagraph],
          {
            y: "150%",
          },
          {
            y: 0,
            duration: 0.5,
            delay: 0.15,
            ease: "expo.out",
            overwrite: true,
          }
        );
      };

      ScrollTrigger.create({
        trigger: strategySlidesSectionRef.current,
        start: "top-=2% top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (e) => {
          const { progress } = e;
          const progressPart = 1 / slideItems.length;

          // goToLottieSlide(progress)
          updateSlideProgressNav(progress);
          const currentActiveSlide = Math.floor(progress / progressPart);

          if (
            activeSlideCounter.current !== currentActiveSlide &&
            currentActiveSlide <= slideItems.length - 1
          ) {
            if (currentActiveSlide > activeSlideCounter.current)
              fillNavProgressBar(activeSlideCounter.current);
            else emptyNavProgressBar(activeSlideCounter.current);
            goToSlide(activeSlideCounter.current, currentActiveSlide);
            activeSlideCounter.current = currentActiveSlide;
            setActiveImageIdx(currentActiveSlide);
          }
        },
      });
    }, strategySlidesSectionRef);
  };

  const slideCounter = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <section
      className={`${styles.strategy_slides_section} container`}
      ref={strategySlidesSectionRef}
    >
      <div className={styles.strategy_container}>
        <div
          className={styles.heading_container}
          ref={strategyHeadingContainer}
        >
          <h6>Digital Gravity’s investment stratergy</h6>
        </div>

        <div className={styles.slides_left_part} ref={lottieContainerRef}>
          {deviceSize > 768 ? (
            <dotlottie-player
              className={styles.lottie_scene}
              ref={lottieAnimationEl}
              src="./Lottie/strategy.lottie"
              subframe={false}
            />
          ) : (
            <Image
              src={MobileSlideImages[activeImageIdx]}
              alt="strategy image"
              fill
            />
          )}
        </div>

        <div className={styles.slides_right_part}>
          <div
            className={styles.strategy_slides_container}
            ref={strategySliderRef}
          >
            {strategySlides.map(({ supTitle, title, content }, idx) => (
              <div
                className={`${styles.strategy_slide} strategy_slide_item`}
                key={title}
              >
                <span className={`${styles.strategy_counter} strategy_counter`}>
                  {slideCounter(idx + 1)} <span></span> {supTitle}
                </span>

                <div
                  className={`${styles.slide_heading_container} slide_heading_container`}
                >
                  <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
                </div>

                <div
                  className={`${styles.slide_content_container} slide_content_container`}
                >
                  <p className={styles.strategy_content}>{content}</p>
                </div>
              </div>
            ))}

            <div className={styles.slides_nav} ref={strategySliderNavRef}>
              {strategySlides.map((_, idx) => (
                <div id={`slide_nav_item slide_nav_item_${idx}`} key={_.title}>
                  <span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
