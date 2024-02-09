"use client";

import { useContext, useRef } from "react";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";

import styles from "../../Styles/modules/Home/Quote.module.scss";
import {
  quoteBuilding,
  quoteGeneration,
  quoteGlobal,
  quoteImprove,
  quoteProductivity,
  quoteUpgrading,
} from "../../utils/svgAsssets";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const quoteContent = [
  `"<b>Building</b><span class="quote_icon">${quoteBuilding}</span>&nbsp;and <b>&nbsp;upgrading</b> <span class="quote_icon">${quoteUpgrading}</span>`,
  `the digital infrastructure required to`,
  `<b>improve</b><span class="quote_icon">${quoteImprove}</span>&nbsp;<b>global</b>&nbsp;<span class="quote_icon">${quoteGlobal}</span> economic and`,
  `social <b>&nbsp;productivity</b><span class="quote_icon">${quoteProductivity}</span>&nbsp;will be one of the`,
  `greatest investment opportunities that`,
  `arises over the coming <b>&nbsp;generation</b><span class="quote_icon">${quoteGeneration}</span>"`,
];

export const QuoteSection = () => {
  const { loadingScene, deviceSize } = useContext<ContextTypes>(AppContext);

  const quoteSectionRef = useRef<HTMLElement>(null);
  const quoteContentWrapper = useRef<HTMLHeadingElement>(null);

  const activeQuoteIcon = useRef(0);

  useIsomorphicLayoutEffect(() => {
    if (loadingScene) return;

    let gsapCtx: any;

    const TL = setTimeout(() => quoteScene(gsapCtx), 300);

    return () => {
      if (gsapCtx && gsapCtx.kill) gsapCtx.kill();
      clearTimeout(TL);
    };
  }, [loadingScene, deviceSize]);

  const quoteScene = (CTX: any) => {
    CTX = gsap.context(() => {
      const header = document.querySelector(".header-container");
      const fixedHeaderLinks = document.querySelector(".fixed_top_header");

      ScrollTrigger.create({
        trigger: quoteSectionRef.current,
        start: `top top`,
        end: `bottom top`,
        onToggle: ({ isActive }) => {
          if (isActive && !header?.classList.contains("light")) {
            header?.classList.add("light");
            fixedHeaderLinks?.classList.add("light");
          } else if (!isActive && header?.classList.contains("light")) {
            header?.classList.remove("light");
            fixedHeaderLinks?.classList.remove("light");
          }
        },
      });

      if (deviceSize < 768) return;

      // if ( !quoteContentWrapper.current ) return

      const contentElements =
        quoteContentWrapper.current?.querySelectorAll("p");

      const quoteContainerHeight = quoteSectionRef.current?.offsetHeight || 0;

      if (!contentElements) return;

      gsap.fromTo(
        contentElements,
        {
          yPercent: 110,
          rotateX: -70,
          alpha: 0,
          skewY: -2,
        },
        {
          yPercent: 0,
          rotateX: 0,
          alpha: 1,
          skewY: 0,
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: `top center-=20%`,
            end: `+=100px`,
            scrub: 1,
            fastScrollEnd: true,
          },
          ease: "none",
          overwrite: true,
        }
      );

      // contentElements.forEach( (contentEl,idx) => {

      //   const textSpan     = contentEl.firstChild
      //   const endTrigger   = ((quoteContainerHeight * 0.6) - ( window.innerHeight * 0.9 )) / contentElements.length
      //   const startTrigger = idx * endTrigger

      //   gsap.set(textSpan, { yPercent: 110, rotateX: -90, alpha: 0, skewY: -3 })

      //   gsap.to(textSpan, {
      //     yPercent: 0,
      //     rotateX: 0,
      //     alpha: 1,
      //     skewY: 0,
      //     scrollTrigger: {
      //       trigger: quoteSectionRef.current,
      //       start: `top+=${startTrigger}px center-=20%`,
      //       end: `+=${endTrigger}px`,
      //       scrub: 1,
      //       fastScrollEnd: true,
      //     },
      //     ease: "none",
      //     overwrite: true
      //   })

      // })

      const startReveilingIcons =
        quoteContainerHeight * 0.6 - window.innerHeight * 0.9;
      const allQuoteIcons =
        quoteContentWrapper.current?.querySelectorAll("span.quote_icon");
      const allQuoteBolds = quoteContentWrapper.current?.querySelectorAll("b");

      if (!allQuoteIcons || !allQuoteBolds) return;

      const progressPart = 1 / allQuoteIcons.length;

      const reveilIcon = (idx: number) => {
        gsap.to(allQuoteIcons[idx], {
          display: "block",
          width: "auto",
          ease: "expo.out",
          duration: 0.5,
          overwrite: true,
        });
        gsap.to(allQuoteBolds[idx], {
          fontWeight: 500,
          ease: "expo.out",
          duration: 0.5,
          overwrite: true,
        });
      };
      const hideIcon = (idx: number) => {
        gsap.to(allQuoteIcons[idx], {
          width: 0,
          ease: "expo.out",
          duration: 0.5,
          overwrite: true,
        });
        gsap.to(allQuoteBolds[idx], {
          fontWeight: 400,
          ease: "expo.out",
          duration: 0.5,
          overwrite: true,
        });
      };

      ScrollTrigger.create({
        trigger: quoteSectionRef.current,
        start: `top+=${startReveilingIcons} top+=${window.innerHeight * 0.1}`,
        end: `bottom bottom+=${window.innerHeight * 0.1}`,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          setTimeout(() => {
            const currentActiveIconIdx = Math.floor(progress / progressPart);

            if (activeQuoteIcon.current !== currentActiveIconIdx) {
              if (currentActiveIconIdx > activeQuoteIcon.current)
                reveilIcon(currentActiveIconIdx - 1);
              else hideIcon(currentActiveIconIdx);

              activeQuoteIcon.current = currentActiveIconIdx;
            }
          }, 0);
        },
        onLeave: () => {
          allQuoteIcons.forEach((icon, idx) => {
            reveilIcon(idx);
          });
        },
        onLeaveBack: () => {
          allQuoteIcons.forEach((icon, idx) => {
            hideIcon(idx);
          });
        },
      });
    }, quoteSectionRef);
  };

  return (
    <section
      className={`container ${styles.quote_section}`}
      ref={quoteSectionRef}
    >
      <div className={styles.quote_container}>
        <h5 ref={quoteContentWrapper}>
          {quoteContent.map((text) => (
            <p className={`${styles.quote_text_container}`} key={text}>
              <span dangerouslySetInnerHTML={{ __html: text }}></span>
            </p>
          ))}
        </h5>

        <div className={styles.written_by_container}>
          <span>- Thor Johnsen, Managing Partner</span>
        </div>
      </div>
    </section>
  );
};
