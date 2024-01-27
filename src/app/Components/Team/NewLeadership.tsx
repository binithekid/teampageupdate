"use client";

import { MutableRefObject, useContext, useRef, useState } from "react";
import { teamMembersData } from "../../../data/team";
import styles from "../../Styles/modules/Team/newleadership.module.scss";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect";
import { calcPosValues } from "../../utils";
import useAddCursorPull from "../../Hooks/useAddCursorPull";

export const NewLeadership = () => {
  const { smoothScroller } = useContext<ContextTypes>(AppContext);

  const TeamMembersSectionRef = useRef<HTMLElement>(null);
  const leadershipSceneWrapper = useRef<HTMLDivElement>(null);
  const IntroSliderRef = useRef<HTMLDivElement>(null);
  const teamIntroWrapper = useRef<HTMLDivElement>(null);
  const teamMembersWrapper = useRef<HTMLDivElement>(null);

  const progressBarContainer = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);

  const teamNavContainer = useRef<HTMLDivElement>(null);

  const nextSlideTriggerArea = useRef<HTMLDivElement>(null);
  const prevSlideTriggerArea = useRef<HTMLDivElement>(null);

  const teamAnimationCtx = useRef<any>(null);
  const currentActiveCard = useRef(0);

  useIsomorphicLayoutEffect(() => {
    if (!smoothScroller) return;

    let gsapCtx: any;
    gsap.set("a.logo", { color: "var(--bg-color)" });
    const TL = setTimeout(() => {
      LeadershipScene(gsapCtx);
    }, 200);

    return () => {
      if (gsapCtx && gsapCtx.revert) gsapCtx.revert();
      gsap.set("a.logo", { color: "currentColor" });
      clearTimeout(TL);
    };
  }, [smoothScroller]);

  const LeadershipScene = (gsapCtx: any) => {
    gsapCtx = teamAnimationCtx.current = gsap.context((ctx) => {
      if (!teamMembersWrapper.current) return;
      // gsap.set("a.logo", { color: "var(--bg-color)" })

      gsap.to(IntroSliderRef.current, {
        x: -window.innerWidth,
        scrollTrigger: {
          trigger: TeamMembersSectionRef.current,
          start: () => "top top",
          end: () => `+=${window.innerHeight - 150}`,
          scrub: true,
          invalidateOnRefresh: true,
          immediateRender: false,
          onLeave: () => {
            if (
              !progressBarContainer.current ||
              !teamNavContainer.current ||
              !nextSlideTriggerArea.current ||
              !prevSlideTriggerArea.current
            )
              return;
            gsap.to(progressBarContainer.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.to(teamNavContainer.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.set(
              [nextSlideTriggerArea.current, prevSlideTriggerArea.current],
              {
                pointerEvents: "all",
                overwrite: true,
              }
            );
            gsap.set("a.logo", { color: "currentColor" });
          },
          onEnterBack: () => {
            if (
              !progressBarContainer.current ||
              !teamNavContainer.current ||
              !nextSlideTriggerArea.current ||
              !prevSlideTriggerArea.current
            )
              return;
            gsap.to(progressBarContainer.current, {
              y: -100,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.to(teamNavContainer.current, {
              y: 100,
              opacity: 0,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
            gsap.set(
              [nextSlideTriggerArea.current, prevSlideTriggerArea.current],
              {
                pointerEvents: "none",
                overwrite: true,
              }
            );
          },
          onUpdate: ({ progress }) => {
            if (progress > 0.3) gsap.set("a.logo", { color: "currentColor" });
            else gsap.set("a.logo", { color: "var(--bg-color)" });
          },
        },
        ease: "none",
      });

      let totalSectionHeight =
        window.innerHeight * 2 +
        ((teamMembersData.length - 1) * window.innerHeight) / 2;
      let HeightOffset = window.innerHeight * 2 + 100;
      window.addEventListener("resize", () =>
        calcHeightOnResize(totalSectionHeight, HeightOffset)
      );

      gsap.set(TeamMembersSectionRef.current, {
        height: `${totalSectionHeight}px`,
      });

      const teamMemberCards = Array.from(teamMembersWrapper.current?.children);
      const { gap } = getComputedStyle(teamMembersWrapper.current);
      const gapSpace = Number(gap.replace("px", ""));
      const steps: number[] = [];
      const { width: cardWidth } = teamMemberCards[0].getBoundingClientRect();
      const startX = window.innerWidth / 2 - cardWidth / 2;

      teamMemberCards.forEach((memberCard, idx) => {
        const stepX = startX - cardWidth * idx - idx * gapSpace;
        steps.push(stepX);
      });

      // console.log("steps:",steps)
      const progressPart = 1 / (steps.length - 1);

      // Activate the first initial card
      gsap.set(teamMemberCards[0], {
        pointerEvents: "all",
      });

      const activateNewCard = (prev: number, next: number) => {
        gsap.set(teamMemberCards[prev], {
          pointerEvents: "none",
        });
        gsap.set(teamMemberCards[next], {
          pointerEvents: "all",
        });
      };

      const scrollToOptions = {
        duration: 0.8,
        // lerp: 0.18
      };

      const progressBarContainerWidth =
        progressBarContainer.current?.getBoundingClientRect().width || 0;
      const progressBarWidth =
        progressBar.current?.getBoundingClientRect().width || 0;

      const updateProgressBar = (progress: number) => {
        const newX = (progressBarContainerWidth - progressBarWidth) * progress;
        gsap.to(progressBar.current, {
          x: newX,
          ease: "power2.out",
          duration: 0.5,
        });
      };

      const goToNextCard = () => {
        if (currentActiveCard.current === steps.length - 1) return;

        goToIndex(currentActiveCard.current + 1);
        // const NextProgressY =
        //   ((currentActiveCard.current + 1) * progressPart) * (totalSectionHeight - HeightOffset)
        // smoothScroller.scrollTo(NextProgressY,scrollToOptions)
      };

      const goToPrevCard = () => {
        if (currentActiveCard.current === 0) return;

        goToIndex(currentActiveCard.current - 1);
        // const PrevProgress =
        //   ((currentActiveCard.current - 1) * progressPart) * (totalSectionHeight - HeightOffset)
        // smoothScroller.scrollTo(PrevProgress,scrollToOptions)
      };

      const goToIndex = (index: number) => {
        const newProgress =
          index * progressPart * (totalSectionHeight - HeightOffset) +
          window.innerHeight;
        scrollTo(newProgress);
      };

      const scrollTo = (y: number) => {
        if (smoothScroller) smoothScroller.scrollTo(y, scrollToOptions);
      };

      gsap.set(teamMembersWrapper.current, { x: steps[0] });
      const TL = gsap.timeline();
      TL.fromTo(
        teamMembersWrapper.current,
        {
          x: steps[0],
        },
        {
          x: steps[steps.length - 1],
          scrollTrigger: {
            trigger: TeamMembersSectionRef.current,
            start: () => `top+=${window.innerHeight}px top`,
            end: () => "bottom-=100px bottom",
            scrub: true,
            immediateRender: false,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            snap: {
              snapTo: 1 / (steps.length - 1),
              delay: 0.75,
              directional: false,
              ease: "power2.out",
              duration: 0.8,
            },
            onUpdate: ({ progress }) => {
              if (progress <= 0) updateProgressBar(0);
              else if (progress >= 1) updateProgressBar(1);
              else updateProgressBar(progress);

              const newProgressPoint = Math.min(
                Math.floor((progress * 1.1) / progressPart),
                steps.length - 1
              );
              // console.log("progress:",progress)
              // console.log("newProgressPoint:",newProgressPoint)

              if (newProgressPoint !== currentActiveCard.current) {
                activateNewCard(currentActiveCard.current, newProgressPoint);
                currentActiveCard.current = newProgressPoint;
              }
            },
          },
          ease: "none",
          overwrite: true,
        }
      );

      ctx.add("goToIndex", goToIndex);
      ctx.add("nextCard", goToNextCard);
      ctx.add("prevCard", goToPrevCard);
      ctx.add("totalHeight", () => totalSectionHeight);
    }, TeamMembersSectionRef);
  };

  const calcHeightOnResize = (
    totalSectionHeight: number,
    offsetHeight: number
  ) => {
    totalSectionHeight =
      window.innerHeight * 2 +
      ((teamMembersData.length - 1) * window.innerHeight) / 2;
    offsetHeight = window.innerHeight * 2 + 100;
  };

  const [personImgSrc, setPersonImgSrc] = useState(teamMembersData[0].img);
  const [personName, setPersonName] = useState(teamMembersData[0].name);
  const [biography, setBiography] = useState(teamMembersData[0].content);

  const popupContainerRef = useRef(null);
  const popupOverlayRef = useRef(null);
  const popupContentBox = useRef(null);

  const popupContentVideo = useRef<HTMLVideoElement>(null);

  const openInvestmentPopup = (idx: number) => {
    setPersonImgSrc(teamMembersData[idx].img);
    setPersonName(teamMembersData[idx].name);
    setBiography([...teamMembersData[idx].content]);

    if (smoothScroller) smoothScroller.stop();

    gsap.set(popupContainerRef.current, { display: "flex" });
    gsap.to(popupOverlayRef.current, {
      opacity: 1,
      ease: "expo.out",
      duration: 0.5,
      overwrite: true,
    });
    gsap.to(popupContentBox.current, {
      y: 0,
      ease: "expo.out",
      duration: 0.5,
      overwrite: true,
    });
  };

  const goToNextCard = () => {
    if (currentActiveCard.current === teamMembersData.length - 1) return;

    teamAnimationCtx.current.nextCard();
  };
  const goToPrevCard = () => {
    if (currentActiveCard.current === 0) return;

    teamAnimationCtx.current.prevCard();
  };

  const goToProgress = (e: any) => {
    if (!progressBarContainer.current) return;

    const { clientX } = e;
    const { width, left } =
      progressBarContainer.current.getBoundingClientRect();

    const leftOffset = clientX - left;
    const xPercent = leftOffset / width;

    let targetIndex = Math.round((teamMembersData.length - 1) * xPercent);

    // console.log("clientX:",clientX)
    // console.log("width:",width)
    // console.log("left:",left)
    // console.log("leftOffset:",leftOffset)
    // console.log("xPercent:",xPercent)
    // console.log("targetIndex:",targetIndex)

    teamAnimationCtx.current.goToIndex(targetIndex);
  };

  const sliderNextButtonRef = useRef<HTMLButtonElement>(null);
  const sliderPrevButtonRef = useRef<HTMLButtonElement>(null);

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

  const onNavButtonHoverIn = (e: any) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      overwrite: true,
      duration: 0.5,
      ease: "expo.out",
    });
  };

  const onNavButtonHoverOut = (e: any) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      overwrite: true,
      duration: 0.5,
      ease: "expo.out",
    });
  };

  const scrollToSlides = () => {
    smoothScroller.scrollTo(window.innerHeight - 100, {
      duration: 2,
    });
  };

  return (
    <section
      className={`container ${styles.leadership_section}`}
      ref={TeamMembersSectionRef}
    >
      <div
        className={styles.leadership_scene_wrapper}
        ref={leadershipSceneWrapper}
      >
        <div
          className={styles.team_progress_bar_container}
          ref={progressBarContainer}
          onClick={goToProgress}
        >
          <div className={styles.progress_bar} ref={progressBar}></div>
        </div>

        <div
          className={styles.next_slide_trigger_area}
          onClick={goToNextCard}
          ref={nextSlideTriggerArea}
        ></div>
        <div
          className={styles.prev_slide_trigger_area}
          onClick={goToPrevCard}
          ref={prevSlideTriggerArea}
        ></div>

        <div className={styles.bg_text}>
          {/* <Image src="/LEADERSHIP.svg" alt="LeaderShip" fill sizes="80vw" /> */}
          <svg
            width="633"
            height="75"
            viewBox="0 0 633 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.253906 73H-0.446094V73.7H0.253906V73ZM0.253906 2.00391V1.30391H-0.446094V2.00391H0.253906ZM14.707 2.00391H15.407V1.30391H14.707V2.00391ZM14.707 60.9395H14.007V61.6395H14.707V60.9395ZM50.6445 60.9395H51.3445V60.2395H50.6445V60.9395ZM50.6445 73V73.7H51.3445V73H50.6445ZM0.953906 73V2.00391H-0.446094V73H0.953906ZM0.253906 2.70391H14.707V1.30391H0.253906V2.70391ZM14.007 2.00391V60.9395H15.407V2.00391H14.007ZM14.707 61.6395H50.6445V60.2395H14.707V61.6395ZM49.9445 60.9395V73H51.3445V60.9395H49.9445ZM50.6445 72.3H0.253906V73.7H50.6445V72.3ZM60.9961 73H60.2961V73.7H60.9961V73ZM60.9961 1.41797V0.717969H60.2961V1.41797H60.9961ZM114.072 1.41797H114.772V0.717969H114.072V1.41797ZM114.072 13.5273V14.2273H114.772V13.5273H114.072ZM75.4492 13.5273V12.8273H74.7492V13.5273H75.4492ZM75.4492 29.3965H74.7492V30.0965H75.4492V29.3965ZM111.387 29.3965H112.087V28.6965H111.387V29.3965ZM111.387 41.457V42.157H112.087V41.457H111.387ZM75.4492 41.457V40.757H74.7492V41.457H75.4492ZM75.4492 60.9395H74.7492V61.6395H75.4492V60.9395ZM115.439 60.9395H116.139V60.2395H115.439V60.9395ZM115.439 73V73.7H116.139V73H115.439ZM61.6961 73V1.41797H60.2961V73H61.6961ZM60.9961 2.11797H114.072V0.717969H60.9961V2.11797ZM113.372 1.41797V13.5273H114.772V1.41797H113.372ZM114.072 12.8273H75.4492V14.2273H114.072V12.8273ZM74.7492 13.5273V29.3965H76.1492V13.5273H74.7492ZM75.4492 30.0965H111.387V28.6965H75.4492V30.0965ZM110.687 29.3965V41.457H112.087V29.3965H110.687ZM111.387 40.757H75.4492V42.157H111.387V40.757ZM74.7492 41.457V60.9395H76.1492V41.457H74.7492ZM75.4492 61.6395H115.439V60.2395H75.4492V61.6395ZM114.739 60.9395V73H116.139V60.9395H114.739ZM115.439 72.3H60.9961V73.7H115.439V72.3ZM192.246 73V73.7H193.28L192.896 72.7398L192.246 73ZM176.523 73L175.87 73.2512L176.043 73.7H176.523V73ZM170.273 56.7402L170.927 56.4891L170.754 56.0402H170.273V56.7402ZM141.66 56.7402V56.0402H141.17L141.002 56.5012L141.66 56.7402ZM135.752 73V73.7H136.242L136.41 73.2391L135.752 73ZM120.42 73L119.768 72.7459L119.396 73.7H120.42V73ZM148.301 1.41797V0.717969H147.822L147.649 1.16391L148.301 1.41797ZM163.584 1.41797L164.234 1.15777L164.058 0.717969H163.584V1.41797ZM165.635 44.6797V45.3797H166.641L166.291 44.436L165.635 44.6797ZM155.771 18.1172L156.428 17.8735L155.765 16.0886L155.114 17.8778L155.771 18.1172ZM146.104 44.6797L145.446 44.4403L145.104 45.3797H146.104V44.6797ZM192.246 72.3H176.523V73.7H192.246V72.3ZM177.177 72.7488L170.927 56.4891L169.62 56.9914L175.87 73.2512L177.177 72.7488ZM170.273 56.0402H141.66V57.4402H170.273V56.0402ZM141.002 56.5012L135.094 72.7609L136.41 73.2391L142.318 56.9793L141.002 56.5012ZM135.752 72.3H120.42V73.7H135.752V72.3ZM121.072 73.2541L148.953 1.67202L147.649 1.16391L119.768 72.7459L121.072 73.2541ZM148.301 2.11797H163.584V0.717969H148.301V2.11797ZM162.934 1.67817L191.596 73.2602L192.896 72.7398L164.234 1.15777L162.934 1.67817ZM166.291 44.436L156.428 17.8735L155.115 18.3609L164.979 44.9234L166.291 44.436ZM155.114 17.8778L145.446 44.4403L146.761 44.9191L156.429 18.3566L155.114 17.8778ZM146.104 45.3797H165.635V43.9797H146.104V45.3797ZM199.912 1.41797V0.717969H199.212V1.41797H199.912ZM239.951 2.78516L240.149 2.11368L240.147 2.11316L239.951 2.78516ZM250.742 9.37695L250.234 9.85866L250.234 9.85866L250.742 9.37695ZM257.578 20.998L256.915 21.2236L256.916 21.2251L257.578 20.998ZM257.725 53.127L258.387 53.3545L258.387 53.3544L257.725 53.127ZM250.059 65.7734L249.571 65.2711L249.57 65.272L250.059 65.7734ZM239.902 71.4863L240.113 72.1537L240.116 72.1529L239.902 71.4863ZM199.912 73H199.212V73.7H199.912V73ZM214.365 13.5273V12.8273H213.665V13.5273H214.365ZM214.365 60.9395H213.665V61.6395H214.365V60.9395ZM233.896 60.2559L233.727 59.5768L233.724 59.5775L233.896 60.2559ZM239.707 57.2773L239.24 56.7559L239.235 56.7609L239.707 57.2773ZM243.516 50.3926L244.185 50.5975L244.186 50.5956L243.516 50.3926ZM243.516 24.5137L242.851 24.7328L243.516 24.5137ZM232.725 14.2109L232.57 14.8938L232.576 14.895L232.725 14.2109ZM199.912 2.11797H226.328V0.717969H199.912V2.11797ZM226.328 2.11797C232.264 2.11797 236.726 2.5737 239.755 3.45716L240.147 2.11316C236.926 1.17369 232.306 0.717969 226.328 0.717969V2.11797ZM239.753 3.45663C243.835 4.65899 247.325 6.79113 250.234 9.85866L251.25 8.89524C248.17 5.64767 244.466 3.38529 240.149 2.11368L239.753 3.45663ZM250.234 9.85866C253.152 12.935 255.382 16.7184 256.915 21.2236L258.241 20.7725C256.649 16.0981 254.322 12.134 251.25 8.89524L250.234 9.85866ZM256.916 21.2251C258.446 25.6869 259.222 31.2362 259.222 37.8926H260.622C260.622 31.1375 259.836 25.4238 258.24 20.771L256.916 21.2251ZM259.222 37.8926C259.222 43.7295 258.496 48.7269 257.063 52.8995L258.387 53.3544C259.883 48.9983 260.622 43.8395 260.622 37.8926H259.222ZM257.063 52.8994C255.301 58.0234 252.799 62.1384 249.571 65.2711L250.546 66.2757C253.959 62.9632 256.567 58.6472 258.387 53.3545L257.063 52.8994ZM249.57 65.272C247.16 67.6197 243.878 69.4767 239.689 70.8197L240.116 72.1529C244.456 70.7616 247.944 68.81 250.547 66.2749L249.57 65.272ZM239.691 70.8189C236.598 71.7975 232.414 72.3 227.109 72.3V73.7C232.482 73.7 236.827 73.1934 240.113 72.1537L239.691 70.8189ZM227.109 72.3H199.912V73.7H227.109V72.3ZM200.612 73V1.41797H199.212V73H200.612ZM213.665 13.5273V60.9395H215.065V13.5273H213.665ZM214.365 61.6395H225.156V60.2395H214.365V61.6395ZM225.156 61.6395C229.199 61.6395 232.188 61.4131 234.069 60.9342L233.724 59.5775C232.024 60.0101 229.186 60.2395 225.156 60.2395V61.6395ZM234.066 60.935C236.504 60.3255 238.551 59.2841 240.18 57.7938L239.235 56.7609C237.804 58.07 235.976 59.0144 233.727 59.5768L234.066 60.935ZM240.174 57.7987C241.872 56.2776 243.191 53.8442 244.185 50.5975L242.846 50.1877C241.887 53.3212 240.667 55.4776 239.24 56.756L240.174 57.7987ZM244.186 50.5956C245.191 47.2785 245.68 42.8223 245.68 37.2578H244.28C244.28 42.761 243.794 47.0613 242.846 50.1896L244.186 50.5956ZM245.68 37.2578C245.68 31.6977 245.192 27.3621 244.18 24.2945L242.851 24.7328C243.793 27.5898 244.28 31.7502 244.28 37.2578H245.68ZM244.18 24.2945C243.178 21.253 241.758 18.8309 239.895 17.0712L238.933 18.089C240.586 19.6495 241.9 21.8498 242.851 24.7328L244.18 24.2945ZM239.895 17.0712C238.031 15.3115 235.681 14.1359 232.873 13.5268L232.576 14.895C235.172 15.4579 237.281 16.5284 238.933 18.089L239.895 17.0712ZM232.879 13.5281C230.773 13.0526 226.741 12.8273 220.859 12.8273V14.2273C226.762 14.2273 230.64 14.4578 232.57 14.8937L232.879 13.5281ZM220.859 12.8273H214.365V14.2273H220.859V12.8273ZM272.227 73H271.527V73.7H272.227V73ZM272.227 1.41797V0.717969H271.527V1.41797H272.227ZM325.303 1.41797H326.003V0.717969H325.303V1.41797ZM325.303 13.5273V14.2273H326.003V13.5273H325.303ZM286.68 13.5273V12.8273H285.98V13.5273H286.68ZM286.68 29.3965H285.98V30.0965H286.68V29.3965ZM322.617 29.3965H323.317V28.6965H322.617V29.3965ZM322.617 41.457V42.157H323.317V41.457H322.617ZM286.68 41.457V40.757H285.98V41.457H286.68ZM286.68 60.9395H285.98V61.6395H286.68V60.9395ZM326.67 60.9395H327.37V60.2395H326.67V60.9395ZM326.67 73V73.7H327.37V73H326.67ZM272.927 73V1.41797H271.527V73H272.927ZM272.227 2.11797H325.303V0.717969H272.227V2.11797ZM324.603 1.41797V13.5273H326.003V1.41797H324.603ZM325.303 12.8273H286.68V14.2273H325.303V12.8273ZM285.98 13.5273V29.3965H287.38V13.5273H285.98ZM286.68 30.0965H322.617V28.6965H286.68V30.0965ZM321.917 29.3965V41.457H323.317V29.3965H321.917ZM322.617 40.757H286.68V42.157H322.617V40.757ZM285.98 41.457V60.9395H287.38V41.457H285.98ZM286.68 61.6395H326.67V60.2395H286.68V61.6395ZM325.97 60.9395V73H327.37V60.9395H325.97ZM326.67 72.3H272.227V73.7H326.67V72.3ZM338.975 73H338.275V73.7H338.975V73ZM338.975 1.41797V0.717969H338.275V1.41797H338.975ZM386.045 3.37109L385.798 4.02606L385.805 4.02877L386.045 3.37109ZM394.395 10.207L393.803 10.5817L394.395 10.207ZM392.783 34.8164L393.302 35.2866L393.304 35.2841L392.783 34.8164ZM378.623 41.4082L378.523 40.7155L376.539 41.0032L378.27 42.0128L378.623 41.4082ZM386.338 47.4141L385.824 47.8895L385.828 47.8936L386.338 47.4141ZM394.59 59.0352L393.995 59.404L393.996 59.4065L394.59 59.0352ZM403.33 73V73.7H404.594L403.923 72.6286L403.33 73ZM386.045 73L385.464 73.39L385.672 73.7H386.045V73ZM375.596 57.4238L375.013 57.8121L375.014 57.8138L375.596 57.4238ZM367.979 46.9258L367.467 47.4034L367.472 47.4091L367.979 46.9258ZM363.633 43.9473L363.395 44.6056L363.407 44.6099L363.633 43.9473ZM353.428 43.1172V42.4172H352.728V43.1172H353.428ZM353.428 73V73.7H354.128V73H353.428ZM353.428 31.6914H352.728V32.3914H353.428V31.6914ZM380.674 16.6035L380.14 17.0562L380.145 17.0624L380.151 17.0686L380.674 16.6035ZM375.254 13.7715L375.369 13.081L375.36 13.0794L375.35 13.0781L375.254 13.7715ZM353.428 13.5273V12.8273H352.728V13.5273H353.428ZM339.675 73V1.41797H338.275V73H339.675ZM338.975 2.11797H369.395V0.717969H338.975V2.11797ZM369.395 2.11797C377.031 2.11797 382.473 2.77133 385.798 4.02601L386.292 2.71617C382.716 1.3667 377.058 0.717969 369.395 0.717969V2.11797ZM385.805 4.02877C389.135 5.2426 391.798 7.41752 393.803 10.5817L394.986 9.83236C392.824 6.42102 389.921 4.03865 386.285 2.71342L385.805 4.02877ZM393.803 10.5817C395.809 13.7477 396.82 17.3752 396.82 21.4863H398.22C398.22 17.1339 397.146 13.2419 394.986 9.83236L393.803 10.5817ZM396.82 21.4863C396.82 26.71 395.289 30.9791 392.262 34.3487L393.304 35.2841C396.593 31.6224 398.22 27.0048 398.22 21.4863H396.82ZM392.265 34.3463C389.249 37.6724 384.701 39.8192 378.523 40.7155L378.724 42.101C385.111 41.1743 390.002 38.9266 393.302 35.2866L392.265 34.3463ZM378.27 42.0128C381.348 43.8082 383.862 45.7689 385.824 47.8895L386.852 46.9386C384.778 44.6972 382.148 42.6541 378.976 40.8036L378.27 42.0128ZM385.828 47.8936C387.827 50.0198 390.547 53.8419 393.995 59.404L395.185 58.6663C391.732 53.0956 388.95 49.1703 386.848 46.9345L385.828 47.8936ZM393.996 59.4065L402.737 73.3714L403.923 72.6286L395.183 58.6638L393.996 59.4065ZM403.33 72.3H386.045V73.7H403.33V72.3ZM386.626 72.61L376.177 57.0339L375.014 57.8138L385.464 73.39L386.626 72.61ZM376.178 57.0355C372.476 51.4822 369.902 47.9275 368.485 46.4424L367.472 47.4091C368.789 48.7886 371.294 52.2326 375.013 57.8121L376.178 57.0355ZM368.49 46.4482C367.063 44.9189 365.521 43.8505 363.858 43.2846L363.407 44.6099C364.805 45.0857 366.16 46.003 367.467 47.4034L368.49 46.4482ZM363.871 43.289C362.22 42.692 359.692 42.4172 356.357 42.4172V43.8172C359.663 43.8172 361.985 44.0958 363.395 44.6055L363.871 43.289ZM356.357 42.4172H353.428V43.8172H356.357V42.4172ZM352.728 43.1172V73H354.128V43.1172H352.728ZM353.428 72.3H338.975V73.7H353.428V72.3ZM353.428 32.3914H364.121V30.9914H353.428V32.3914ZM364.121 32.3914C367.596 32.3914 370.429 32.3181 372.616 32.1701C374.781 32.0236 376.377 31.8007 377.334 31.4753L376.884 30.1497C376.117 30.4103 374.686 30.6268 372.521 30.7733C370.379 30.9183 367.58 30.9914 364.121 30.9914V32.3914ZM377.334 31.4753C379.196 30.8432 380.674 29.7439 381.74 28.1795L380.584 27.3908C379.697 28.691 378.474 29.6099 376.884 30.1497L377.334 31.4753ZM381.74 28.1795C382.813 26.6058 383.327 24.6693 383.327 22.4141H381.927C381.927 24.4557 381.464 26.0999 380.584 27.3908L381.74 28.1795ZM383.327 22.4141C383.327 19.8748 382.638 17.7591 381.197 16.1385L380.151 17.0686C381.314 18.3776 381.927 20.1357 381.927 22.4141H383.327ZM381.208 16.1508C379.81 14.502 377.84 13.4929 375.369 13.081L375.139 14.462C377.355 14.8313 378.999 15.7103 380.14 17.0562L381.208 16.1508ZM375.35 13.0781C374.118 12.907 370.541 12.8273 364.707 12.8273V14.2273C370.591 14.2273 374.046 14.3104 375.158 14.4648L375.35 13.0781ZM364.707 12.8273H353.428V14.2273H364.707V12.8273ZM352.728 13.5273V31.6914H354.128V13.5273H352.728ZM407.529 49.709L407.462 49.0123L406.75 49.0814L406.834 49.7909L407.529 49.709ZM421.592 48.3418L422.281 48.2183L422.167 47.5826L421.524 47.6451L421.592 48.3418ZM426.719 58.7422L426.262 59.2727L426.265 59.2755L426.719 58.7422ZM447.715 59.1328L448.163 59.6706L448.164 59.67L447.715 59.1328ZM449.766 47.9023L449.222 48.3432L449.228 48.3513L449.235 48.3591L449.766 47.9023ZM444.59 44.7773L444.824 44.1177L444.819 44.1159L444.59 44.7773ZM433.018 41.6523L433.186 40.973L433.186 40.9729L433.018 41.6523ZM416.709 34.5723L416.242 35.0935L416.242 35.0937L416.709 34.5723ZM413.193 9.96289L412.607 9.58014L412.606 9.58161L413.193 9.96289ZM422.129 2.6875L421.855 2.04327L421.853 2.0441L422.129 2.6875ZM456.504 6.10547L456.044 6.63345L456.046 6.63507L456.504 6.10547ZM463.682 21.877L463.712 22.5763L464.405 22.5458L464.381 21.8527L463.682 21.877ZM449.229 22.5117L448.538 22.6278L448.641 23.2382L449.259 23.211L449.229 22.5117ZM445.225 14.6016L444.785 15.1465L444.795 15.1541L445.225 14.6016ZM426.23 14.748L426.641 15.3152L426.642 15.3145L426.23 14.748ZM426.084 23.5371L425.633 24.0729L425.634 24.0733L426.084 23.5371ZM454.941 33.498L454.612 34.1156L454.619 34.1193L454.941 33.498ZM462.852 40.7734L462.254 41.1382L462.259 41.1456L462.852 40.7734ZM462.314 63.6738L461.724 63.298L462.314 63.6738ZM452.646 71.6816L452.914 72.3284L452.919 72.3266L452.646 71.6816ZM416.221 68.0195L415.763 68.5488L415.765 68.5505L416.221 68.0195ZM407.597 50.4057L421.66 49.0385L421.524 47.6451L407.462 49.0123L407.597 50.4057ZM420.903 48.4653C421.766 53.2795 423.527 56.9184 426.262 59.2727L427.175 58.2117C424.767 56.1389 423.11 52.8442 422.281 48.2183L420.903 48.4653ZM426.265 59.2755C429.029 61.6244 432.705 62.7625 437.217 62.7625V61.3625C432.94 61.3625 429.617 60.2871 427.172 58.2088L426.265 59.2755ZM437.217 62.7625C441.953 62.7625 445.642 61.7713 448.163 59.6706L447.267 58.5951C445.1 60.4006 441.79 61.3625 437.217 61.3625V62.7625ZM448.164 59.67C450.668 57.577 451.979 55.0804 451.979 52.1992H450.579C450.579 54.5914 449.514 56.7172 447.266 58.5957L448.164 59.67ZM451.979 52.1992C451.979 50.3559 451.425 48.7568 450.296 47.4456L449.235 48.3591C450.124 49.3916 450.579 50.6571 450.579 52.1992H451.979ZM450.309 47.4615C449.213 46.1097 447.345 45.0133 444.824 44.1177L444.356 45.437C446.783 46.2992 448.365 47.2861 449.222 48.3432L450.309 47.4615ZM444.819 44.1159C443.091 43.5176 439.2 42.4684 433.186 40.973L432.849 42.3317C438.879 43.8311 442.704 44.8652 444.361 45.4388L444.819 44.1159ZM433.186 40.9729C425.466 39.0592 420.169 36.7323 417.176 34.0509L416.242 35.0937C419.499 38.0112 425.074 40.4043 432.849 42.3318L433.186 40.9729ZM417.176 34.051C412.923 30.2387 410.817 25.6238 410.817 20.168H409.417C409.417 26.0402 411.706 31.0283 416.242 35.0935L417.176 34.051ZM410.817 20.168C410.817 16.6621 411.801 13.3921 413.78 10.3442L412.606 9.58161C410.484 12.8487 409.417 16.3822 409.417 20.168H410.817ZM413.779 10.3456C415.779 7.28325 418.644 4.94268 422.405 3.3309L421.853 2.0441C417.867 3.75263 414.774 6.26232 412.607 9.58014L413.779 10.3456ZM422.403 3.33173C426.201 1.71753 430.806 0.897266 436.24 0.897266V-0.502734C430.671 -0.502734 425.869 0.337158 421.855 2.04327L422.403 3.33173ZM436.24 0.897266C445.137 0.897266 451.697 2.84939 456.044 6.63345L456.964 5.57749C452.261 1.48394 445.312 -0.502734 436.24 -0.502734V0.897266ZM456.046 6.63507C460.442 10.4339 462.76 15.5004 462.982 21.9012L464.381 21.8527C464.147 15.1024 461.681 9.65465 456.962 5.57586L456.046 6.63507ZM463.651 21.1776L449.198 21.8124L449.259 23.211L463.712 22.5763L463.651 21.1776ZM449.919 22.3956C449.284 18.6191 447.894 15.7907 445.654 14.049L444.795 15.1541C446.657 16.6025 447.936 19.0476 448.538 22.6278L449.919 22.3956ZM445.664 14.0567C443.468 12.2856 440.237 11.4602 436.094 11.4602V12.8602C440.089 12.8602 442.945 13.6623 444.785 15.1465L445.664 14.0567ZM436.094 11.4602C431.808 11.4602 428.357 12.3394 425.819 14.1816L426.642 15.3145C428.857 13.7062 431.981 12.8602 436.094 12.8602V11.4602ZM425.82 14.1809C424.112 15.4165 423.236 17.1067 423.236 19.1914H424.636C424.636 17.5652 425.289 16.2931 426.641 15.3152L425.82 14.1809ZM423.236 19.1914C423.236 21.1142 424.062 22.7513 425.633 24.0729L426.535 23.0014C425.242 21.9141 424.636 20.654 424.636 19.1914H423.236ZM425.634 24.0733C426.644 24.921 428.304 25.7358 430.534 26.5394C432.782 27.3494 435.675 28.1702 439.204 29.0035L439.526 27.641C436.024 26.8142 433.188 26.0074 431.009 25.2223C428.812 24.4309 427.347 23.6832 426.534 23.0009L425.634 24.0733ZM439.204 29.0035C446.22 30.6599 451.34 32.3687 454.612 34.1155L455.271 32.8806C451.837 31.0466 446.573 29.305 439.526 27.641L439.204 29.0035ZM454.619 34.1193C457.897 35.8215 460.436 38.1606 462.254 41.1382L463.449 40.4087C461.491 37.2014 458.756 34.6902 455.264 32.8768L454.619 34.1193ZM462.259 41.1456C464.094 44.0689 465.032 47.7242 465.032 52.1504H466.432C466.432 47.5271 465.451 43.5977 463.444 40.4013L462.259 41.1456ZM465.032 52.1504C465.032 56.114 463.934 59.8255 461.724 63.298L462.905 64.0496C465.253 60.3607 466.432 56.3899 466.432 52.1504H465.032ZM461.724 63.298C459.527 66.7507 456.419 69.3303 452.374 71.0367L452.919 72.3266C457.207 70.5173 460.545 67.7584 462.905 64.0496L461.724 63.298ZM452.379 71.0349C448.323 72.7144 443.228 73.5695 437.07 73.5695V74.9695C443.347 74.9695 448.637 74.0994 452.914 72.3284L452.379 71.0349ZM437.07 73.5695C428.119 73.5695 421.356 71.5085 416.677 67.4886L415.765 68.5505C420.786 72.8639 427.922 74.9695 437.07 74.9695V73.5695ZM416.679 67.4903C411.992 63.4326 409.154 57.5077 408.224 49.627L406.834 49.7909C407.793 57.9259 410.749 64.208 415.763 68.5487L416.679 67.4903ZM477.939 73H477.239V73.7H477.939V73ZM477.939 1.41797V0.717969H477.239V1.41797H477.939ZM492.393 1.41797H493.093V0.717969H492.393V1.41797ZM492.393 29.5918H491.693V30.2918H492.393V29.5918ZM520.713 29.5918V30.2918H521.413V29.5918H520.713ZM520.713 1.41797V0.717969H520.013V1.41797H520.713ZM535.166 1.41797H535.866V0.717969H535.166V1.41797ZM535.166 73V73.7H535.866V73H535.166ZM520.713 73H520.013V73.7H520.713V73ZM520.713 41.7012H521.413V41.0012H520.713V41.7012ZM492.393 41.7012V41.0012H491.693V41.7012H492.393ZM492.393 73V73.7H493.093V73H492.393ZM478.639 73V1.41797H477.239V73H478.639ZM477.939 2.11797H492.393V0.717969H477.939V2.11797ZM491.693 1.41797V29.5918H493.093V1.41797H491.693ZM492.393 30.2918H520.713V28.8918H492.393V30.2918ZM521.413 29.5918V1.41797H520.013V29.5918H521.413ZM520.713 2.11797H535.166V0.717969H520.713V2.11797ZM534.466 1.41797V73H535.866V1.41797H534.466ZM535.166 72.3H520.713V73.7H535.166V72.3ZM521.413 73V41.7012H520.013V73H521.413ZM520.713 41.0012H492.393V42.4012H520.713V41.0012ZM491.693 41.7012V73H493.093V41.7012H491.693ZM492.393 72.3H477.939V73.7H492.393V72.3ZM549.717 73H549.017V73.7H549.717V73ZM549.717 1.41797V0.717969H549.017V1.41797H549.717ZM564.17 1.41797H564.87V0.717969H564.17V1.41797ZM564.17 73V73.7H564.87V73H564.17ZM550.417 73V1.41797H549.017V73H550.417ZM549.717 2.11797H564.17V0.717969H549.717V2.11797ZM563.47 1.41797V73H564.87V1.41797H563.47ZM564.17 72.3H549.717V73.7H564.17V72.3ZM577.988 73H577.288V73.7H577.988V73ZM577.988 1.41797V0.717969H577.288V1.41797H577.988ZM618.369 2.49219L618.188 3.16829L618.192 3.16935L618.369 2.49219ZM628.672 9.52344L628.116 9.94903L628.118 9.95145L628.672 9.52344ZM624.326 41.6035L624.725 42.1788L624.727 42.1777L624.326 41.6035ZM616.855 44.9727L616.992 45.6594L617.005 45.6566L616.855 44.9727ZM592.441 45.998V45.298H591.741V45.998H592.441ZM592.441 73V73.7H593.141V73H592.441ZM592.441 13.5273V12.8273H591.741V13.5273H592.441ZM592.441 33.8398H591.741V34.5398H592.441V33.8398ZM616.27 29.2012L615.694 28.8021L615.689 28.8102L616.27 29.2012ZM609.824 14.0156L609.694 14.7035L609.7 14.7045L609.824 14.0156ZM578.688 73V1.41797H577.288V73H578.688ZM577.988 2.11797H601.182V0.717969H577.988V2.11797ZM601.182 2.11797C609.991 2.11797 615.624 2.48038 618.188 3.16828L618.551 1.8161C615.776 1.07171 609.951 0.717969 601.182 0.717969V2.11797ZM618.192 3.16935C622.131 4.20114 625.436 6.44967 628.116 9.94902L629.228 9.09785C626.373 5.37065 622.81 2.93167 618.546 1.81503L618.192 3.16935ZM628.118 9.95145C630.768 13.3808 632.122 17.857 632.122 23.4395H633.522C633.522 17.6287 632.11 12.8275 629.226 9.09542L628.118 9.95145ZM632.122 23.4395C632.122 27.7521 631.339 31.3264 629.812 34.1944L631.048 34.8525C632.71 31.7309 633.522 27.9159 633.522 23.4395H632.122ZM629.812 34.1944C628.262 37.1038 626.298 39.375 623.926 41.0293L624.727 42.1777C627.302 40.3815 629.407 37.9327 631.048 34.8525L629.812 34.1944ZM623.927 41.0283C621.551 42.6762 619.144 43.7574 616.706 44.2887L617.005 45.6566C619.645 45.0811 622.219 43.9163 624.725 42.1788L623.927 41.0283ZM616.719 44.286C613.337 44.9562 608.394 45.298 601.865 45.298V46.698C608.422 46.698 613.473 46.3563 616.992 45.6593L616.719 44.286ZM601.865 45.298H592.441V46.698H601.865V45.298ZM591.741 45.998V73H593.141V45.998H591.741ZM592.441 72.3H577.988V73.7H592.441V72.3ZM591.741 13.5273V33.8398H593.141V13.5273H591.741ZM592.441 34.5398H600.352V33.1398H592.441V34.5398ZM600.352 34.5398C603.213 34.5398 605.614 34.4459 607.549 34.2557C609.472 34.0667 610.981 33.7786 612.032 33.369L611.523 32.0646C610.653 32.4037 609.297 32.6771 607.412 32.8624C605.539 33.0466 603.187 33.1398 600.352 33.1398V34.5398ZM612.032 33.369C614.075 32.5724 615.69 31.3142 616.85 29.5922L615.689 28.8102C614.7 30.2783 613.321 31.3638 611.523 32.0646L612.032 33.369ZM616.845 29.6002C618.04 27.8774 618.63 25.8798 618.63 23.6348H617.23C617.23 25.6215 616.713 27.3348 615.694 28.8021L616.845 29.6002ZM618.63 23.6348C618.63 20.8834 617.817 18.5597 616.154 16.7201L615.115 17.6588C616.513 19.2046 617.23 21.1778 617.23 23.6348H618.63ZM616.154 16.7201C614.516 14.9073 612.437 13.7761 609.949 13.3268L609.7 14.7045C611.898 15.1015 613.694 16.0862 615.115 17.6588L616.154 16.7201ZM609.954 13.3278C608.154 12.9881 604.622 12.8273 599.424 12.8273V14.2273C604.643 14.2273 608.044 14.3921 609.694 14.7035L609.954 13.3278ZM599.424 12.8273H592.441V14.2273H599.424V12.8273Z"
              fill="black"
            />
          </svg>
        </div>

        <div className={styles.team_nav} ref={teamNavContainer}>
          <button
            className={`${styles.team_prev_button}`}
            onClick={goToPrevCard}
            ref={sliderPrevButtonRef}
            onMouseEnter={onNavButtonHoverIn}
            onMouseLeave={onNavButtonHoverOut}
            // disabled={!isPrevActive}
          >
            {prevSlideSvg}
          </button>

          <button
            className={`${styles.team_next_button}`}
            onClick={goToNextCard}
            ref={sliderNextButtonRef}
            onMouseEnter={onNavButtonHoverIn}
            onMouseLeave={onNavButtonHoverOut}
            // disabled={!isNextActive}
          >
            {nextSlideSvg}
          </button>
        </div>

        <div className={styles.intro_slider} ref={IntroSliderRef}>
          <div className={styles.initial_team_intro} ref={teamIntroWrapper}>
            <div className={styles.content_col}>
              <Image
                src={"/Team_Members_bg.jpg"}
                alt="Leadership"
                fill
                sizes="100vw"
                loading="eager"
              />
              <h1 className={styles.leadership_title}>
                Deep
                <br />
                Domain
                <br />
                Expertise.
              </h1>

              <button
                className={styles.scroll_to_slides}
                onClick={scrollToSlides}
              >
                Senior leadership team
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.team_members_wrapper} ref={teamMembersWrapper}>
            {teamMembersData.map((memeberData, idx) => (
              <MemberCard
                {...memeberData}
                key={memeberData.name}
                openInvestmentPopup={openInvestmentPopup}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </div>

      <PopupModule
        biography={biography || []}
        personImgSrc={personImgSrc}
        personName={personName}
        popupContainerRef={popupContainerRef}
        popupContentBox={popupContentBox}
        popupContentVideo={popupContentVideo}
        popupOverlayRef={popupOverlayRef}
      />
    </section>
  );
};

interface PopupModuleProps {
  popupContainerRef: MutableRefObject<null>;
  popupOverlayRef: MutableRefObject<null>;
  popupContentBox: MutableRefObject<null>;
  popupContentVideo: MutableRefObject<HTMLVideoElement | null>;
  personImgSrc: StaticImageData;
  personName: string;
  biography: string[];
}

const PopupModule = ({
  biography,
  personImgSrc,
  personName,
  popupContainerRef,
  popupContentBox,
  popupContentVideo,
  popupOverlayRef,
}: PopupModuleProps) => {
  const { smoothScroller } = useContext<ContextTypes>(AppContext);

  const closeInvestmentPopup = () => {
    if (smoothScroller) smoothScroller.start();

    if (popupContentVideo.current) popupContentVideo.current.pause();

    const tl = gsap.timeline();
    tl.to(popupOverlayRef.current, {
      opacity: 0,
      ease: "expo.out",
      duration: 0.5,
      overwrite: true,
    })
      .to(
        popupContentBox.current,
        { y: "110%", ease: "expo.out", duration: 0.5, overwrite: true },
        0
      )
      .set(popupContainerRef.current, { display: "none" });
  };

  return (
    <div className={styles.investment_popup_container} ref={popupContainerRef}>
      <div
        className={styles.investment_popup_overlay}
        ref={popupOverlayRef}
        onClick={closeInvestmentPopup}
      >
        <button
          className={styles.close_popup_button}
          onClick={closeInvestmentPopup}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        className={styles.investment_popup_content_box}
        ref={popupContentBox}
      >
        <div className={styles.left_person_photo}>
          <div className={styles.image_container}>
            <Image
              src={personImgSrc}
              alt={personName}
              placeholder="empty"
              fill
              loading="eager"
              sizes="(max-width: 500px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw"
            />
          </div>
        </div>

        <div className={styles.content_container} data-lenis-prevent>
          <h3>{personName}</h3>
          <p>
            {biography?.map((content) => (
              <span key={content}>{content}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

interface MemberCardProps {
  idx: number;
  name: string;
  summary: string;
  position: string;
  img: StaticImageData;
  linkedinUrl: string;
  openInvestmentPopup: (idx: number) => void;
}

const MemberCard = ({
  idx,
  name,
  summary,
  position,
  img,
  linkedinUrl,
  openInvestmentPopup,
}: MemberCardProps) => {
  const MemberCardRef = useRef<HTMLDivElement>(null);
  const memeberCardTriggerRef = useRef<HTMLDivElement>(null);
  const cardOverlayRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let GsapContext: any;

    setTimeout(() => TeamMembersScene(GsapContext), 100);

    return () => {
      if (GsapContext && GsapContext.revert) GsapContext.revert();
    };
  }, []);

  const TeamMembersScene = (gsapCtx: any) => {
    gsapCtx = gsap.context(() => {
      gsap.set(cardOverlayRef.current, {
        scale: 0.7,
      });
      gsap.set(cardContainerRef.current, {
        rotateY: -20,
        rotateX: 20,
      });
    }, MemberCardRef);
  };

  const memberCardHoverIn = (e: any) => {
    // console.log("mouse in card")

    // Scale Card Hover Overlay and increase height to 100%
    gsap.to(cardOverlayRef.current, {
      height: "100%",
      scale: 1,
      pointerEvents: "all",
      ease: "power1.outIn",
      duration: 0.4,
      overwrite: true,
    });

    // Rotate Card Container
    gsap.to(cardContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power1.outIn",
      duration: 0.4,
      overwrite: true,
    });
  };

  const memberCardHoverOut = (e: any) => {
    // console.log("mouse out card")
    gsap.to(cardOverlayRef.current, {
      x: 0,
      y: 0,
      height: 0,
      scale: 0.7,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      pointerEvents: "none",
      ease: "power2.out",
      duration: 0.3,
      overwrite: true,
    });
    gsap.to(cardContainerRef.current, {
      rotateY: -20,
      rotateX: 20,
      ease: "power2.out",
      duration: 0.3,
      overwrite: true,
    });
  };

  const memberCardMouseMove = (e: any) => {
    const { xOffset, yOffset, rotationXDeg, rotationYDeg } = calcPosValues(e);

    gsap.to(cardOverlayRef.current, {
      x: xOffset * 0.5,
      y: yOffset * 0.5,
      rotate: -rotationYDeg / 10,
      rotateX: rotationXDeg,
      rotateY: rotationYDeg * 0.7,
      ease: "power2.out",
      duration: 0.5,
    });
  };

  return (
    <div className={styles.memeber_card} ref={MemberCardRef}>
      <h2>{name}</h2>
      <span className={styles.position}>{position}</span>

      <div className={styles.member_img}>
        <Image
          src={img}
          alt={name}
          fill
          placeholder="empty"
          sizes="(max-width: 500px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 40vw, 20vw"
        />
      </div>

      <div
        className={styles.member_card_hover_trigger}
        onMouseEnter={memberCardHoverIn}
        onMouseLeave={memberCardHoverOut}
        onMouseMove={memberCardMouseMove}
        ref={memeberCardTriggerRef}
      >
        <div className={styles.member_card_hover_overlay} ref={cardOverlayRef}>
          <div
            className={styles.member_card_hover_card_container}
            ref={cardContainerRef}
          >
            <div className={styles.card_content}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="38"
                viewBox="0 0 40 38"
                fill="none"
              >
                <path
                  d="M0 34.7L9.5 37.6L20.5 2.8L11.4 0L0 34.7ZM18.9 34.7L28.4 37.6L39.4 2.8L30.3 0L18.9 34.7Z"
                  fill="var(--primary-color)"
                />
              </svg>
              <p>{summary}</p>
            </div>

            <a
              className={styles.member_linkedin}
              href={linkedinUrl}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="38"
                height="37"
                viewBox="0 0 38 37"
                fill="none"
              >
                <path
                  d="M8.00427 4.7009C8.00374 5.7556 7.58426 6.76689 6.8381 7.5123C6.09195 8.25771 5.08024 8.67618 4.02554 8.67566C2.97084 8.67513 1.95955 8.25565 1.21414 7.50949C0.468726 6.76333 0.0502544 5.75162 0.0507817 4.69692C0.0513091 3.64223 0.470792 2.63093 1.21695 1.88552C1.96311 1.14011 2.97482 0.721641 4.02951 0.722168C5.08421 0.722696 6.0955 1.14218 6.84091 1.88834C7.58633 2.63449 8.0048 3.6462 8.00427 4.7009ZM8.12357 11.6204H0.170084V36.5149H8.12357V11.6204ZM20.6901 11.6204H12.7764V36.5149H20.6105V23.4513C20.6105 16.1738 30.0951 15.4978 30.0951 23.4513V36.5149H37.9492V20.7471C37.9492 8.47881 23.9112 8.93613 20.6105 14.9609L20.6901 11.6204Z"
                  fill="var(--primary-color)"
                />
              </svg>
            </a>

            <button
              className={styles.open_member_popup}
              onClick={() => openInvestmentPopup(idx)}
            >
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const nextSlideSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
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
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
    />
  </svg>
);
