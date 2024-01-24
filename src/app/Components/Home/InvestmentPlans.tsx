"use client";

import { useContext, useRef } from "react";
import styles from "../../Styles/modules/Home/InvestmentPlans.module.scss";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect";
import { horizontalSlider } from "../../utils";
import { gsap } from "gsap";
import { Draggable } from "gsap/all";
import useAddCursorPull from "../../Hooks/useAddCursorPull";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "@johanaarstein/dotlottie-player";
import { PlayMode } from "@johanaarstein/dotlottie-player";

const investmentPlanData = {
  slides: [
    {
      src: "/Video/Data_Centers.mp4",
      name: "Data Centres",
      desc: "Where the storage & processing of data occurs",
      content: {
        Overview:
          "Data centres are centralised facilities designed to store, manage, process, and distribute large amounts of data, providing critical infrastructure and computing resources for organisations to support their digital operations, applications, and services.",
        Demand:
          "The demand for data centres is expected to continue growing at a high rate, with megawatt demand in areas such as the Nordics expected to more than double over the next 5 years.",
        SustainableNeed:
          "Data centres consume 2% of global electricity and contribute 2% to global CO2 emissions.",
      },
    },
    {
      src: "/Video/Terrestrial_Fibre.mp4",
      name: "Terrestrial Fibre",
      desc: "Fibre networks that connect people & businesses to the internet​",
      content: {
        Overview:
          "Terrestrial fibre, also known as fibre optic cable, refers to the physical infrastructure that enables high-speed data transmission over long distances.",
        Demand:
          "The UK government is committed to accelerating fibre rollout and has allocated £5bn towards this through its Project Gigabit, aiming for 85% fibre coverage by 2025. This represents a total capital expenditure requirement of approximately £30bn.",
        SustainableNeed:
          "The internet is the primary source of information exchange for the majority of people in developed countries and a rapidly growing number in developing countries. It has become so integrated into our daily lives that the United Nations declared internet access a human right in 2016.",
      },
    },
    {
      src: "/Video/Subsea_Fibre.mp4",
      name: "Subsea Fibre",
      desc: "The cables that interconnect data between continents & data centres",
      content: {
        Overview:
          "Customers typically include content providers, cloud-based networks, IT companies and global media companies.",
        Demand:
          "High demand from smartphones, video, gaming, live streaming, etc. is putting a strain on capacity, leading to a projected 40% shortage of transatlantic subsea capacity by 2026.",
        SustainableNeed:
          "The rollout of subsea connectivity helps bridge the global digital divide by connecting people. Our strategy seeks to identify key locations for internet traffic demand globally.",
      },
    },
    {
      src: "/Video/Wireless_Networks.mp4",
      name: "Wireless Networks",
      desc: "Networks that allow people & machines to connect to physical networks​",
      content: {
        Overview:
          "Wireless networks provide convenient and flexible connectivity by enabling the transmission of data and communication signals without the need for physical cables, allowing users to access information and services through various wireless devices.",
        Demand:
          "The rapid expansion of mobile data usage and connected devices, along with the transition to 5G networks, is leading to a heightened demand for wireless networks with wider coverage and better capacity.",
        SustainableNeed:
          "The integration of 5G and IoT technologies is transforming the wireless landscape, delivering a potent blend of speed, broadened bandwidth, reduced latency, and enhanced energy efficiency.",
      },
    },
    {
      src: "/Video/Satellite.mp4",
      name: "Satellites",
      desc: "Satellites that connect people & businesses to the internet",
      content: {
        Overview:
          `Sub-sector currently under review
          
          `,
        Demand:
          `Sub-sector currently under review
          
          `,
        SustainableNeed:
          `Sub-sector currently under review
          
          `,
      },
    },
  ],
};

export const InvestmentPlans = () => {
  const { loadingScene } = useContext<ContextTypes>(AppContext);

  const investmenSectionRef = useRef<HTMLElement>(null);

  const investmentSliderWrapperRef = useRef<HTMLDivElement>(null);

  const sliderNextButtonRef = useRef<HTMLButtonElement>(null);
  const sliderPrevButtonRef = useRef<HTMLButtonElement>(null);

  const sliderTL = useRef<gsap.core.Timeline | null>(null);
  const isSlideDragging = useRef(false);
  const activeInvestmenSlide = useRef(0);

  const gsapCtx = useRef<any>(null);

  const isSlideAnimating = useRef(false);

  const sliderNameRef = useRef<HTMLSpanElement>(null);
  const sliderDescRef = useRef<HTMLSpanElement>(null);

  const overviewContentRef = useRef<HTMLDivElement>(null);
  const demandContentRef = useRef<HTMLDivElement>(null);
  const sustainContentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (loadingScene) return;

    let GsapContext: any;
    gsap.registerPlugin(Draggable);

    setTimeout(() => investmentScene(GsapContext), 300);

    return () => {
      if (GsapContext && GsapContext.kill) GsapContext.kill();
    };
  }, [loadingScene]);

  const sliderEaseDuration = {
    duration: 1,
    ease: "power2.out",
  };

  const investmentScene = (GsapContext: any) => {
    GsapContext = gsapCtx.current = gsap.context((ctx) => {
      if (!investmenSectionRef.current || !investmentSliderWrapperRef.current )
        return;

      // gsap.to(investmentCardMovingPart.current, {
      //   x: 0,
      //   scrollTrigger: {
      //     trigger: investmenSectionRef.current,
      //     start: "top bottom",
      //     end: `center bottom`,
      //     scrub: 0.75,
      //   },
      //   overwrite: true,
      //   ease: "Power4.out",
      // });

      ScrollTrigger.create({
        trigger: investmenSectionRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          playCurrentActiveVideo();
        },
        onEnterBack: () => {
          playCurrentActiveVideo();
        },
      });
      const investmentSlideItems = Array.from(
        investmentSliderWrapperRef.current.children
      );

      if (!investmentSlideItems) return;

      // Set the right initial scale for each slide
      gsap.set(investmentSlideItems, {
        scale: 0.8,
      });
      gsap.set(investmentSlideItems[activeInvestmenSlide.current], {
        scale: 1,
        pointerEvents: "all",
      });

      let isFirstChange = true;

      const changeSlideContent = (nextSlideIdx: number) => {
        if (
          !sliderNameRef.current ||
          !sliderDescRef.current ||
          !overviewContentRef.current ||
          !demandContentRef.current ||
          !sustainContentRef.current
        )
          return;

        const title = sliderNameRef.current;
        const desc = sliderDescRef.current;

        const overview = overviewContentRef.current;
        const demand = demandContentRef.current;
        const sustain = sustainContentRef.current;

        const slideNameTL = gsap.timeline({ defaults: sliderEaseDuration });
        const slideDescTL = gsap.timeline();

        slideNameTL
          .to(title, {
            alpha: 0,
            duration: 0.3,
            onComplete: () => {
              title.innerText = investmentPlanData.slides[nextSlideIdx].name;
            },
          })
          .set(title, { yPercent: 25 });
        slideNameTL.to(title, { yPercent: 0, alpha: 1, duration: 0.5 });

        slideDescTL.to(desc, {
          alpha: 0,
          duration: 0.3,
          onComplete: () => {
            desc.innerText = investmentPlanData.slides[nextSlideIdx].desc;
          },
        });
        slideDescTL.to(desc, { yPercent: 0, alpha: 1, duration: 0.5 });

        overview.innerText =
          investmentPlanData.slides[nextSlideIdx].content.Overview;
        demand.innerText =
          investmentPlanData.slides[nextSlideIdx].content.Demand;
        sustain.innerText =
          investmentPlanData.slides[nextSlideIdx].content.SustainableNeed;
      };

      const goToNextSlide = (cb: () => void = () => {}) => {
        if (!sliderTL.current) return;

        const nextSlideIdx =
          activeInvestmenSlide.current === investmentSlideItems.length - 1
            ? 0
            : activeInvestmenSlide.current + 1;

        sliderTL.current.next({ ...sliderEaseDuration });

        // Scale Next Slide Item
        gsap.to(investmentSlideItems[activeInvestmenSlide.current], {
          scale: 0.8,
          pointerEvents: "none",
          ...sliderEaseDuration,
        });
        gsap.to(investmentSlideItems[nextSlideIdx], {
          scale: 1,
          pointerEvents: "all",
          ...sliderEaseDuration,
        });

        changeSlideContent(nextSlideIdx);

        const video =
          investmentSlideItems[activeInvestmenSlide.current].querySelector(
            "video"
          );
        video?.pause();
        cb();
      };

      const goToPrevSlide = (cb: () => void = () => {}) => {
        if (!sliderTL.current) return;

        const prevSlideIdx =
          activeInvestmenSlide.current === 0
            ? investmentSlideItems.length - 1
            : activeInvestmenSlide.current - 1;

        sliderTL.current.previous({ ...sliderEaseDuration });

        // Scale Previous Slide Item
        gsap.to(investmentSlideItems[activeInvestmenSlide.current], {
          scale: 0.8,
          pointerEvents: "none",
          ...sliderEaseDuration,
        });
        gsap.to(investmentSlideItems[prevSlideIdx], {
          scale: 1,
          pointerEvents: "all",
          ...sliderEaseDuration,
        });
        changeSlideContent(prevSlideIdx);

        const video =
          investmentSlideItems[activeInvestmenSlide.current].querySelector(
            "video"
          );
        video?.pause();
        cb();
      };

      const onDragRelease = (closestIndex: number) => {
        if (!sliderTL.current) return;

        const slidesLength = investmentSlideItems.length - 1;

        if (
          (closestIndex > activeInvestmenSlide.current &&
            (closestIndex !== slidesLength ||
              activeInvestmenSlide.current !== 0)) ||
          (closestIndex === 0 && activeInvestmenSlide.current === slidesLength)
        ) {
          goToNextSlide(() => {
            activeInvestmenSlide.current =
              activeInvestmenSlide.current === slidesLength
                ? 0
                : activeInvestmenSlide.current + 1;
          });
        } else if (
          closestIndex < activeInvestmenSlide.current ||
          (closestIndex === slidesLength && activeInvestmenSlide.current === 0)
        ) {
          goToPrevSlide(() => {
            activeInvestmenSlide.current =
              activeInvestmenSlide.current === 0
                ? slidesLength
                : activeInvestmenSlide.current - 1;
          });
        } else if (closestIndex === activeInvestmenSlide.current)
          sliderTL.current.toIndex(activeInvestmenSlide.current, {
            ease: "power1.outIn",
          });

        isSlideDragging.current = false;
      };

      sliderTL.current = horizontalSlider(Array.from(investmentSlideItems), {
        paused: true,
        speed: 5,
        paddingRight: window.innerHeight * 0.1,
        draggable: false,
        center: true,
        onDragRelease: onDragRelease,
        onDragStart: () => {
          isSlideDragging.current = true;
        },
        // defaults: sliderEaseDuration,
        onChange: (element: any, index: number) => {
          if (!isFirstChange) {
            const video = element.querySelector("video");
            video.play();
          }

          if (isSlideDragging.current || isFirstChange) {
            isFirstChange = false;
            return;
          }

          activeInvestmenSlide.current = index;

          isSlideAnimating.current = false;
        },
      });

      const playCurrentActiveVideo = () => {
        const currentActiveVideo =
          investmentSlideItems[activeInvestmenSlide.current].querySelector(
            "video"
          );
        if (currentActiveVideo?.paused) currentActiveVideo?.play();
      };

      const pauseCurrentActiveVideo = () => {
        const currentActiveVideo =
          investmentSlideItems[activeInvestmenSlide.current].querySelector(
            "video"
          );
        if (!currentActiveVideo?.paused) currentActiveVideo?.pause();
      };

      ctx.add("goToNextSlide", goToNextSlide);
      ctx.add("goToPrevSlide", goToPrevSlide);

      return ctx;
    }, investmenSectionRef);
  };

  const goNextSlide = () => {
    gsapCtx.current.goToNextSlide();
  };
  const goPrevSlide = () => {
    gsapCtx.current.goToPrevSlide();
  };

  const onNavButtonHoverIn = (e: any) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      color: "var(--primary-color)",
      borderColor: "var(--primary-color)",
      overwrite: true,
      duration: 0.5,
      ease: "expo.out",
    });
  };

  const onNavButtonHoverOut = (e: any) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      color: "var(--dark-sec-color)",
      borderColor: "var(--dark-sec-color)",
      overwrite: true,
      duration: 0.5,
      ease: "expo.out",
    });
  };

  useAddCursorPull(
    sliderNextButtonRef,
    {
      useDefaultScroller: true,
    },
    []
  );
  useAddCursorPull(
    sliderPrevButtonRef,
    {
      useDefaultScroller: true,
    },
    []
  );

  const onSubsectorHoverIn = (e: any) => {
    const subSecotrIcon = e.currentTarget.querySelector("#Subsector-Icon");
    const subSecotrParagraph = e.currentTarget.querySelector("p");

    gsap.to(e.currentTarget, {
      height: (subSecotrParagraph.scrollHeight * 1.27) + e.currentTarget.clientHeight,
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });
    gsap.to(subSecotrIcon, {
      rotate: 90,
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });
  };
  const onSubsectorHoverOut = (e: any) => {
    const subSecotrIcon = e.currentTarget.querySelector("#Subsector-Icon");

    gsap.to(e.currentTarget, {
      height: "1.9rem",
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });
    gsap.to(subSecotrIcon, {
      rotate: 0,
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });
  };

  return (
    <section
      id="InvestmentSliderSection"
      className={`container ${styles.investment_plans_section}`}
      ref={investmenSectionRef}
    >

      <div className={styles.investment_slider_container}>
        <div className={styles.slide_content_wrapper}>
          <h6>
            <span ref={sliderNameRef}>
              {investmentPlanData.slides[activeInvestmenSlide.current].name}
            </span>
          </h6>

          <p>
            <span ref={sliderDescRef}>
              {investmentPlanData.slides[activeInvestmenSlide.current].desc}
            </span>
          </p>

          <div className={styles.sub_sectors_wrapper}>
            <div
              className={styles.subsector_row}
              onMouseEnter={onSubsectorHoverIn}
              onMouseLeave={onSubsectorHoverOut}
            >
              <div className={styles.subsector_tag}>
                <div className={styles.tag_name}>
                  <div className={styles.tag_lottie}>
                    <dotlottie-player
                      src="/Lottie/overview.lottie"
                      autoplay="autoplay"
                      subframe={true}
                      // speed={0.5}
                      loop=""
                    />
                  </div>
                  Overview
                </div>

                <span id="Subsector-Icon" className={styles.subsector_row_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </div>
              <p ref={overviewContentRef}
                dangerouslySetInnerHTML=
                {{ __html: investmentPlanData.slides[activeInvestmenSlide.current]
                  .content.Overview}}
              >
              </p>
            </div>

            <div
              className={styles.subsector_row}
              onMouseEnter={onSubsectorHoverIn}
              onMouseLeave={onSubsectorHoverOut}
            >
              <div className={styles.subsector_tag}>
                <div className={styles.tag_name}>
                  <div className={styles.tag_lottie}>
                    <dotlottie-player
                      src="/Lottie/demand.lottie"
                      autoplay="autoplay"
                      subframe={true}
                      loop=""
                    />
                  </div>
                  Demand
                </div>

                <span id="Subsector-Icon" className={styles.subsector_row_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </div>
              <p ref={demandContentRef} 
                dangerouslySetInnerHTML=
                  {{ __html: investmentPlanData.slides[activeInvestmenSlide.current].content.Demand}}
              >
              </p>
            </div>

            <div
              className={styles.subsector_row}
              onMouseEnter={onSubsectorHoverIn}
              onMouseLeave={onSubsectorHoverOut}
            >
              <div className={styles.subsector_tag}>
                <div className={styles.tag_name}>
                  <div className={styles.tag_lottie}>
                    <dotlottie-player
                      src="/Lottie/sustainablity.lottie"
                      autoplay="autoplay"
                      // subframe={true}
                      mode={PlayMode.Normal}
                      direction={-1}
                      // speed={0.5}
                      loop=""
                    />
                  </div>
                  Sustainability
                </div>

                <span id="Subsector-Icon" className={styles.subsector_row_icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </div>

              <p ref={sustainContentRef}
                dangerouslySetInnerHTML=
                  {{ __html: investmentPlanData.slides[activeInvestmenSlide.current]
                    .content.SustainableNeed
                  }}
              >
                {/* {
                  investmentPlanData.slides[activeInvestmenSlide.current]
                    .content.SustainableNeed
                } */}
              </p>
            </div>
        </div>

        </div>

        <div className={styles.investment_slider_wrapper}>
          <div
            className={styles.investment_slider}
            ref={investmentSliderWrapperRef}
          >
            {
              // Investment Slides
              investmentPlanData.slides.map(({ src, name }, idx) => (
                <div
                  className={`${styles.investment_slide_item} investment_slide_${idx}`}
                  key={name}
                >
                  <div className={`${ src === "/Video/Subsea_Fibre.mp4" ? styles.smaller : "" } ${styles.slide_item_video_wrapper}`}>
                    <video
                      preload="metadata"
                      loop={true}
                      muted={true}
                      autoPlay={idx === 0}
                      playsInline={true} data-wf-ignore="true" data-object-fit="cover"
                    >
                      <source src={src} type="video/mp4" data-wf-ignore="true" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))
            }
          </div>

          <div className={styles.slide_nav_container}>
            <button
              className={styles.slide_prev_button}
              onClick={goPrevSlide}
              ref={sliderPrevButtonRef}
              onMouseEnter={onNavButtonHoverIn}
              onMouseLeave={onNavButtonHoverOut}
            >
              {prevSlideSvg}
            </button>
            <button
              className={styles.slide_next_button}
              onClick={goNextSlide}
              ref={sliderNextButtonRef}
              onMouseEnter={onNavButtonHoverIn}
              onMouseLeave={onNavButtonHoverOut}
            >
              {nextSlideSvg}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const nextSlideSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
);

const prevSlideSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
    />
  </svg>
);
