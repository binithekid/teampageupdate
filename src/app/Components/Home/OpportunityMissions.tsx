"use client";

import { gsap } from "gsap";
import styles from "../../Styles/modules/Home/Opportunity.module.scss";
import { ContextTypes } from "../../Types";
import { useContext, useEffect, useRef } from "react";
import AppContext from "../../Context/AppContext";
// import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import {
  higherResources,
  opporunityConsumerDemand,
  opporunityData,
  opporunityDataCenters,
  opporunityGrowth,
  opporunityIncreasingDemand,
  opporunityInequality,
  opporunityLatency,
  opporunityLightningSpeed,
  opporunityMoney,
  opporunityNoSignal,
  uniqueStrategy,
} from "../../utils/svgAsssets";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LottiePlayer from "../LottiePlayer";
import { MobileOpportunity } from "./Mobile/MobileOpportunity";

const opportunityData = [
  {
    title: "Digital infrastructure is facing three major megatrends: ",
    content: [
      {
        icon: opporunityData,
        text: "Ongoing digital transformation and demand growth.",
      },
      {
        icon: opporunityIncreasingDemand,
        text: "Artificial intelligence and evolving network and compute needs.",
      },
      {
        icon: opporunityMoney,
        text: "Sustainable and Inclusive digital infrastructure.",
      },
    ],
    bigTitle: "$400 billion a year market growing to $1 trillion by 2030",
    bgColor: "rgba(0, 179, 215, 0.4)",
    dottiesSrc: "./Lottie/opportunity-1.lottie",
  },
  {
    title: "More users & devices consuming more data at faster speeds",
    content: [
      {
        icon: opporunityLightningSpeed,
        text: "Around 5 billion people use the Internet, with over 1 billion new users expected over next 5 years. The total number of connected devices is projected to reach 75 billion, half of which will be machine-to-machine (M2M) devices, like smart home and industrial sensors, and connected vehicles.",
      },
      {
        icon: opporunityLatency,
        text: "Demand for data increased 5x since 2017. Autonomous vehicles require 4 terabytes of data every day, and Artificial intelligence algorithms GPT-4 required 1 petabyte of data (1000 terabytes). Network bandwidth requirements are doubling every 2 years.",
      },
      {
        icon: opporunityConsumerDemand,
        text: "Latency is essential for real-time applications, dramatically affecting fields like online gaming and financial trading, where even milliseconds matter. Amazon has claimed that every 100 milliseconds of latency reduces their sales by 1%.",
      },
    ],
    bigTitle:
      "1 billion new internet users over next 5 years, doubling bandwidth every 2 years.",
    bgColor: "rgba(101, 126, 253, 0.4)",
    dottiesSrc: "./Lottie/opportunity-2.lottie",
  },
  {
    title: "Sustainable and Inclusive digital infrastructure",
    content: [
      {
        icon: opporunityInequality,
        text: "The UN has identified internet connectivity as a key driver of economic development, with a 10% increase in broadband penetration resulting in a 1.4% increase in GDP growth in developing countries.",
      },
      {
        icon: opporunityNoSignal,
        text: "Data centres use 1-3% of the world’s electricity and emit 2% of global greenhouse gas emissions. By 2030, they are projected to 4x their water usage. This strains local and national electricity grids and natural resources.",
      },
      {
        icon: opporunityGrowth,
        text: "World’s largest procurers of digital infrastructure – global tech – are demanding robust sustainable solutions for data centres in terms of emissions, efficiency and circularity, with a target of zero carbon, zero waste data centres.",
      },
    ],
    bigTitle: "10% increase in broadband penetration raises GDP by 1.4%",
    bgColor: "rgba(220, 255, 221, 0.4)",
    dottiesSrc: "./Lottie/opportunity-3.lottie",
  },
  {
    title: "In a world fighting a climate crisis",
    content: [
      {
        icon: higherResources,
        text: "Digital infrastructure is increasingly demanding higher use of finite natural resources.",
      },
      {
        icon: opporunityDataCenters,
        text: "This is particularly evident in data centres which are putting increasing strain on local and national electricity networks. Data centres also account for about 2% of total GHG emissions, the same as the aviation sector.",
      },
      {
        icon: uniqueStrategy,
        text: "The opportunity to create sustainable digital infrastructure requires a unique and focused strategy.",
      },
    ],
    bigTitle: "Data centres account for 2% of global GHG",
    bgColor: "rgba(0, 255, 249, 0.4)",
    dottiesSrc: "./Lottie/opportunity-4.lottie",
  },
];

const heightMultiplier = 0.6;

export const OppurtinityMissions = () => {
  const { loadingScene, deviceSize, smoothScroller } =
    useContext<ContextTypes>(AppContext);

  const OpportunityMissionSectionRef = useRef<HTMLElement>(null);

  const opportunityFixedTitleRef = useRef<HTMLDivElement>(null);
  const OpportunityContainerBoxRef = useRef<HTMLDivElement>(null);

  const OpportunityContentBoxWrapperRef = useRef<HTMLHeadingElement>(null);
  const hugeHeadingRef = useRef<HTMLDivElement>(null);

  const lottiesWrapper = useRef<HTMLDivElement>(null);
  const lottiesAnimationRefs = useRef<any>([]);

  const OpportunityNavigationContainerRef = useRef<HTMLHeadingElement>(null);

  const activeOpportunityIdx = useRef(0);

  useEffect(() => {
    if (!OpportunityMissionSectionRef.current) return;
    let gsapCtx: any;

    gsap.set(OpportunityMissionSectionRef.current, {
      height: `${
        window.innerHeight +
        opportunityData.length * window.innerHeight * heightMultiplier
      }px`,
    });

    if (loadingScene) return;

    const TL = setTimeout(() => oppurtonityScene(gsapCtx), 200);

    return () => {
      if (gsapCtx && gsapCtx.kill) gsapCtx.kill();
      clearTimeout(TL);
    };
  }, [loadingScene]);

  const ease = "power2.out";

  const oppurtonityScene = (gsapCtx: any) => {
    gsapCtx = gsap.context(() => {
      const progressPart = 1 / opportunityData.length;

      gsap.fromTo(
        OpportunityContainerBoxRef.current,
        {
          // yPercent: 40,
          scale: 0.8,
        },
        {
          // yPercent: 0,
          scale: 1,
          scrollTrigger: {
            trigger: OpportunityMissionSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 0.1,
          },
          ease: "none",
        }
      );
      gsap.fromTo(
        opportunityFixedTitleRef.current,
        {
          xPercent: 30,
          scale: 0.8,
          alpha: 0,
        },
        {
          xPercent: 0,
          scale: 1,
          alpha: 1,
          scrollTrigger: {
            trigger: OpportunityMissionSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 0.1,
          },
          ease: "none",
        }
      );

      gsap.fromTo(
        lottiesWrapper.current,
        {
          alpha: 0,
        },
        {
          alpha: 1,
          scrollTrigger: {
            trigger: OpportunityMissionSectionRef.current,
            start: "top top",
            end: "+=200px",
            scrub: false,
            toggleActions: "play none none reverse",
          },
          ease: ease,
        }
      );

      const bgOverlays = Array.from(
        OpportunityContainerBoxRef.current?.querySelectorAll(".bg_overlay") ||
          []
      );

      for (let i = 0; i < opportunityData.length - 1; i++) {
        const endStartTrigger = `top+=${
          window.innerHeight * heightMultiplier * (i + 1)
        }px top`;

        gsap.to(bgOverlays[i], {
          alpha: 0,
          scrollTrigger: {
            trigger: OpportunityMissionSectionRef.current,
            start: endStartTrigger,
            end: "+=150px",
            scrub: false,
            toggleActions: "play none none reverse",
          },
          ease: ease,
          overwrite: true,
          duration: 0.5,
        });
      }

      const allContentBoxes = OpportunityContentBoxWrapperRef.current?.children;
      const allContentHeading =
        OpportunityContentBoxWrapperRef.current?.querySelectorAll("h5");
      const allContentItemLists = Array.from(
        OpportunityContentBoxWrapperRef.current?.querySelectorAll("ul") || []
      ).map((listUl) => Array.from(listUl.children));
      const allHugeHeadingElements = hugeHeadingRef.current?.children;

      if (
        !allContentBoxes ||
        !allContentHeading ||
        !allContentItemLists ||
        !allHugeHeadingElements
      )
        return;

      // Set initial state of the contents
      gsap
        .timeline()
        .set(allContentHeading, {
          alpha: 0,
          yPercent: 50,
          pointerEvents: "none",
        })
        .set(allHugeHeadingElements, {
          alpha: 0,
          yPercent: 50,
          pointerEvents: "none",
        });
      allContentItemLists.forEach((listItems) => {
        gsap.set(listItems, { alpha: 0, yPercent: 10, pointerEvents: "none" });
      });

      opportunityData.forEach((_, idx) => {
        const contentHeading = allContentHeading[idx];
        const contentItems = allContentItemLists[idx];
        const hugeHeading = allHugeHeadingElements[idx];

        const StartPosition = `top+=${
          idx * window.innerHeight * heightMultiplier
        }px top`;
        const EndPosition = `+=${window.innerHeight * heightMultiplier - 75}px`;

        ScrollTrigger.create({
          trigger: OpportunityMissionSectionRef.current,
          start: StartPosition,
          end: EndPosition,
          onToggle: ({ direction, isActive }) => {
            const isLast = idx === opportunityData.length - 1;
            const enterLastCondition = isLast && direction == -1;
            const leaveLastCondition = isLast && direction == 1;

            if (isActive && !enterLastCondition) {
              gsap.fromTo(
                contentHeading,
                {
                  yPercent: 50,
                  alpha: 0,
                },
                {
                  alpha: 1,
                  yPercent: 0,
                  ease: ease,
                  duration: 0.5,
                  pointerEvents: "all",
                }
              );
              gsap.fromTo(
                contentItems,
                {
                  yPercent: 10,
                  alpha: 0,
                },
                {
                  alpha: 1,
                  yPercent: 0,
                  pointerEvents: "all",
                  ease: ease,
                  duration: 0.5,
                  stagger: 0.01,
                }
              );
              gsap.fromTo(
                hugeHeading,
                {
                  yPercent: 50,
                  alpha: 0,
                },
                {
                  alpha: 1,
                  yPercent: 0,
                  pointerEvents: "all",
                  ease: ease,
                  duration: 0.5,
                }
              );
            } else if (!isActive && !leaveLastCondition) {
              gsap.to(contentHeading, {
                alpha: 0,
                yPercent: -50,
                pointerEvents: "none",
                ease: ease,
                duration: 0.5,
              });
              gsap.to(contentItems, {
                alpha: 0,
                yPercent: -10,
                pointerEvents: "none",
                ease: ease,
                duration: 0.5,
                stagger: 0.01,
              });
              gsap.to(hugeHeading, {
                alpha: 0,
                yPercent: -10,
                pointerEvents: "none",
                ease: ease,
                duration: 0.5,
              });
            }
          },
        });
      });

      const navigationTabs =
        OpportunityNavigationContainerRef.current?.children;

      const updateNavigationTabs = (prevTabIdx: number, nextTabIdx: number) => {
        if (!navigationTabs) return;

        gsap.to(navigationTabs[prevTabIdx].firstChild, {
          background: `rgba(0, 0, 0,0)`,
          ease: ease,
          duration: 0.3,
          overwrite: true,
        });
        gsap.to(navigationTabs[nextTabIdx].firstChild, {
          background: `rgba(0, 0, 0,1)`,
          ease: ease,
          duration: 0.3,
          overwrite: true,
        });
      };

      const allLottieContainers =
        lottiesWrapper.current?.querySelectorAll(".lottie_container");

      function loadAllLottieAnimations() {
        if (!allLottieContainers) return;

        for (let idx = 0; idx < allLottieContainers.length; idx++) {
          const LottieRef = lottiesAnimationRefs.current[idx].load(
            opportunityData[idx].dottiesSrc
          );
          LottieRef.loop = true;
          LottieRef.subframe = true;
        }
      }

      if (allLottieContainers) {
        gsap
          .timeline()
          .set(allLottieContainers, { opacity: 1 })
          .set(allLottieContainers, { alpha: 0 })
          .set(allLottieContainers[0], { alpha: 1 });
        loadAllLottieAnimations();
      }

      const updateAnimationScene = (prevTabIdx: number, nextTabIdx: number) => {
        if (!allLottieContainers) return;
        updateNavigationTabs(prevTabIdx, nextTabIdx);

        gsap.to(allLottieContainers[prevTabIdx], {
          alpha: 0,
          ease: ease,
          duration: 0.3,
          overwrite: true,
        });

        gsap.to(allLottieContainers[nextTabIdx], {
          alpha: 1,
          ease: ease,
          duration: 0.3,
          overwrite: true,
        });
      };

      if (navigationTabs) {
        gsap.set(navigationTabs[0].firstChild, {
          background: `rgba(0, 0, 0, 1)`,
        });
        Array.from(navigationTabs).forEach((tab, idx) => {
          tab.addEventListener("click", () => {
            if (
              idx === activeOpportunityIdx.current ||
              !OpportunityMissionSectionRef.current ||
              !smoothScroller
            )
              return;
            const targetScroll =
              OpportunityMissionSectionRef.current.offsetTop +
              idx * window.innerHeight * heightMultiplier +
              100;

            updateAnimationScene(activeOpportunityIdx.current, idx);
            smoothScroller.scrollTo(targetScroll, {
              duration: 0.5,
            });
          });
        });
      }

      ScrollTrigger.create({
        trigger: OpportunityMissionSectionRef.current,
        start: `top top`,
        end: `bottom bottom`,
        invalidateOnRefresh: true,
        onUpdate: (e) => {
          const { progress } = e;

          const currentActiveSlide = Math.floor(progress / progressPart);

          if (
            currentActiveSlide !== activeOpportunityIdx.current &&
            currentActiveSlide !== opportunityData.length
          ) {
            if (allLottieContainers) {
              updateAnimationScene(
                activeOpportunityIdx.current,
                currentActiveSlide
              );

              lottiesAnimationRefs.current[activeOpportunityIdx.current].stop();
              lottiesAnimationRefs.current[currentActiveSlide].play();
            }

            activeOpportunityIdx.current = currentActiveSlide;
          }
        },
      });
    }, document.body);
  };

  const onOpportunityIconHoverIn = (e: any) => {
    const iconWrapper = e.currentTarget.firstChild;
    const iconsvg = e.currentTarget.firstChild.children;

    const tl = gsap.timeline();

    tl.to(iconWrapper, {
      yPercent: -15,
      ease: "expo.out",
      duration: 0.5,
      overwrite: true,
    }).to(
      iconsvg,
      {
        yPercent: -130,
        ease: "expo.out",
        duration: 0.5,
      },
      0
    );
  };

  const onOpportunityIconHoverOut = (e: any) => {
    const iconsvg = e.currentTarget.firstChild.children;

    gsap.to(e.currentTarget.firstChild, {
      yPercent: 0,
      ease: "expo.out",
      duration: 0.5,
      overwrite: true,
    });
    gsap.to(iconsvg, {
      yPercent: 0,
      ease: "expo.out",
      duration: 0.5,
    });
  };

  if (deviceSize <= 768) return <MobileOpportunity data={opportunityData} />;

  return (
    <section
      className={`container ${styles.oppurtonity_missions_section}`}
      ref={OpportunityMissionSectionRef}
    >
      <div
        className={styles.opportunity_slides_container}
        ref={OpportunityContainerBoxRef}
      >
        <div
          className={styles.fixed_title_banner}
          ref={opportunityFixedTitleRef}
        >
          <h5>THE OPPORTUNITY</h5>
          <p>The digital transformation has already begun</p>
        </div>

        <div className={styles.opportunity_slides_box}>
          {opportunityData.map(({ bgColor }, idx) => (
            <div
              className={`bg_overlay ${styles.overlay_bg}`}
              style={{ backgroundColor: bgColor, zIndex: -1 - idx }}
              key={bgColor}
            ></div>
          ))}

          <div
            className={styles.opportunity_contents_wrapper}
            ref={OpportunityContentBoxWrapperRef}
          >
            {opportunityData.map(({ title, content }) => (
              <div className={styles.content_box} key={title}>
                <h5>{title}</h5>

                <ul>
                  {content.map(({ text, icon }) => (
                    <li
                      key={text}
                      onMouseEnter={onOpportunityIconHoverIn}
                      onMouseLeave={onOpportunityIconHoverOut}
                    >
                      <span>
                        {icon}
                        {icon}
                      </span>
                      <p>{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.huge_heading} ref={hugeHeadingRef}>
            {opportunityData.map(({ title, bigTitle }) => (
              <h5 key={title}>{bigTitle}</h5>
            ))}
          </div>

          <div
            className={styles.opportunity_animation_scene}
            ref={lottiesWrapper}
          >
            {opportunityData.map(({ dottiesSrc, title }) => (
              <div
                className={`lottie_container ${styles.lottie_container}`}
                key={title}
              >
                <LottiePlayer
                  refCB={(instance: any) => {
                    lottiesAnimationRefs.current.push(instance);
                  }}
                  direction={-1}
                />
              </div>
            ))}
          </div>

          <div
            className={styles.opportunity_navigation_container}
            ref={OpportunityNavigationContainerRef}
          >
            {opportunityData.map((_, idx) => (
              <span
                className={`opporunity_nav_tab nav_tab_${idx}`}
                key={_.title}
              >
                <span></span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
