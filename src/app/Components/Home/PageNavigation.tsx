"use client";

import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
// import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";

import styles from "../../Styles/modules/Home/Navigation.module.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = ["About", "Identity", "Opportunity", "Quote", "Strategy"];

export const PageNavigation = ({
  pageWrapper,
}: {
  pageWrapper: RefObject<HTMLElement>;
}) => {
  const { smoothScroller, deviceSize, loadingScene } =
    useContext<ContextTypes>(AppContext);

  const activeSectionIdx = useRef(0);
  const [activeSection, setActiveSection] = useState(0);

  const progressBarRef = useRef(null);

  const allSectionsElements = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (loadingScene) return;
    if (deviceSize <= 768) return;

    let gsapCtx: any;
    const TL = setTimeout(() => navigationSetup(gsapCtx), 300);

    return () => {
      clearTimeout(TL);
      if (gsapCtx && gsapCtx.revert) gsapCtx.revert();
    };
  }, [deviceSize, loadingScene]);

  const navigationSetup = (CTX: any) => {
    CTX = gsap.context(() => {
      const allSections = Array.from(document.querySelectorAll("section"));

      if (!allSections) {
        setTimeout(() => navigationSetup(CTX), 100);
        return;
      }

      allSectionsElements.current = allSections;

      ScrollTrigger.create({
        trigger: pageWrapper.current,
        start: "top top",
        end: "bottom bottom",
        immediateRender: false,
        invalidateOnRefresh: true,
        onUpdate: () => {
          if (window.scrollY === 0) return;

          const scrollY = window.scrollY;

          const currentSectionOffsetTop =
            allSectionsElements.current[activeSectionIdx.current].offsetTop;
          const nextSectionOffsetTop =
            allSectionsElements.current.length > activeSectionIdx.current + 1
              ? allSectionsElements.current[activeSectionIdx.current + 1]
                  .offsetTop
              : null;

          if (
            nextSectionOffsetTop &&
            scrollY >= nextSectionOffsetTop
          ) {
            setActiveSection((prev) => prev + 1);
            activeSectionIdx.current += 1;
          } else if (scrollY < currentSectionOffsetTop) {
            setActiveSection((prev) => prev - 1);
            activeSectionIdx.current -= 1;
          }

          const percentPast =
            activeSectionIdx.current / (allSectionsElements.current.length - 1);

          const currentLevelOffsetTop =
            allSectionsElements.current[activeSectionIdx.current].offsetTop;
          const nextLevelOffsetTop =
            allSectionsElements.current.length > activeSectionIdx.current + 1
              ? allSectionsElements.current[activeSectionIdx.current + 1]
                  .offsetTop
              : null;
          const currentLevelHeight = nextLevelOffsetTop
            ? nextLevelOffsetTop - currentLevelOffsetTop
            : currentLevelOffsetTop -
              allSectionsElements.current[activeSectionIdx.current - 1]
                .offsetTop;

          const currentLevelProgress =
            percentPast +
            (scrollY - currentLevelOffsetTop) /
              currentLevelHeight /
              (allSectionsElements.current.length - 1);

          const totalProgressPercent = Math.min(
            currentLevelProgress * 100,
            100
          );

          gsap.to(progressBarRef.current, {
            height: `${totalProgressPercent}%`,
            ease: "power2.out",
            duration: 0.4,
            overwrite: true,
          });
        },
      });
    }, pageWrapper);
  };

  const goToSection = (idx: number) => {
    if (!allSectionsElements.current.length) return;

    const scrollOptions = {
      duration: 1.5,
    };

    if (idx === 0) smoothScroller.scrollTo(0, scrollOptions);
    else {
      const y = allSectionsElements.current[idx].offsetTop + 100;
      smoothScroller.scrollTo(y, scrollOptions);
    }
  };

  return (
    <div className={styles.page_navigation_control}>
      <div className={styles.progress_track_container}>
        <div className={styles.progress_bar} ref={progressBarRef}></div>
        {sections.map((section, idx) => (
          <NavigationItem
            key={section}
            title={section}
            idx={idx}
            activeSection={activeSection}
            navigateToSection={goToSection}
          />
        ))}
      </div>
    </div>
  );
};

interface NavigationItemProps {
  activeSection: number;
  title: string;
  idx: number;
  navigateToSection: (idx: number) => void;
}

const NavigationItem = ({
  activeSection,
  title,
  idx,
  navigateToSection,
}: NavigationItemProps) => {
  const navigationDotRef = useRef(null);
  const navigationDotSpanRef = useRef(null);

  const TL = useRef<any>(null);

  useEffect(() => {
    gsap.set(navigationDotSpanRef.current, { xPercent: -20, alpha: 0 });
  }, []);

  const onDotHoverIn = () => {
    clearTimeout(TL.current);

    gsap.to(navigationDotSpanRef.current, {
      xPercent: 0,
      alpha: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };
  const onDotHoverOut = () => {
    TL.current = setTimeout(() => {
      gsap.to(navigationDotSpanRef.current, {
        xPercent: -20,
        alpha: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    }, 100);
  };
  return (
    <div
      ref={navigationDotRef}
      onMouseEnter={onDotHoverIn}
      onMouseLeave={onDotHoverOut}
      onClick={() => navigateToSection(idx)}
      className={`${activeSection >= idx ? styles.active_section : ""} ${
        activeSection === idx ? styles.current_active_section : ""
      } ${styles.section_dot}`}
    >
      <span ref={navigationDotSpanRef}>{title}</span>
    </div>
  );
};
