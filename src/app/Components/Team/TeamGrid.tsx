"use client";

import { MutableRefObject, useContext, useRef, useState } from "react";
import styles from "../../Styles/modules/Team/teampage.module.scss";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { calcPosValues } from "../../utils";
import { teamMembersData } from "../../../data/team";
import gsap from "gsap";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";

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

    // if (popupContentVideo.current) popupContentVideo.current.pause();

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
  summary: any;
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
  const memberCardRef = useRef(null);
  const cardOverlayRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const memberCardHoverIn = (e: any) => {
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
    <div
      className={styles.member_card}
      ref={memberCardRef}
      onMouseEnter={memberCardHoverIn}
      onMouseLeave={memberCardHoverOut}
      onMouseMove={memberCardMouseMove}
    >
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

      <div className={styles.member_card_hover_trigger}>
        <div className={styles.member_card_hover_overlay} ref={cardOverlayRef}>
          <div
            className={styles.member_card_hover_card_container}
            ref={cardContainerRef}
          >
            <div className={styles.card_content}>
              {/* <svg
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
              </svg> */}
              <p>
                {summary?.map((content: string) => (
                  <span key={content}>{content}</span>
                ))}
              </p>
            </div>

            <a
              className={styles.member_linkedin}
              href={linkedinUrl}
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
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

export const TeamGrid = () => {
  const [personImgSrc, setPersonImgSrc] = useState(teamMembersData[0].img);
  const [personName, setPersonName] = useState(teamMembersData[0].name);
  const [biography, setBiography] = useState(teamMembersData[0].content);

  const popupContainerRef = useRef(null);
  const popupOverlayRef = useRef(null);
  const popupContentBox = useRef(null);
  const popupContentVideo = useRef<HTMLVideoElement>(null);

  const teamGridRef = useRef<any>(null);

  const { smoothScroller } = useContext<ContextTypes>(AppContext);

  const scrollToSlides = () => {
    smoothScroller.scrollTo(teamGridRef.current.offsetTop, {
      duration: 3,
    });
  };

  const openInvestmentPopup = (idx: number) => {
    setPersonImgSrc(teamMembersData[idx].img);
    setPersonName(teamMembersData[idx].name);
    setBiography([...teamMembersData[idx].content]);

    // if (smoothScroller) smoothScroller.stop();

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

  return (
    <section className={styles.team_section}>
      <div className={styles.initial_team_intro}>
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

          <button onClick={scrollToSlides} className={styles.scroll_to_slides}>
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
      <div className={styles.grid_wrapper} ref={teamGridRef}>
        <div className={styles.team_grid_container}>
          {teamMembersData.map((memeberData, idx) => (
            <div className={styles.team_member} key={memeberData.name}>
              <MemberCard
                {...memeberData}
                key={memeberData.name}
                openInvestmentPopup={openInvestmentPopup}
                idx={idx}
              />
            </div>
          ))}
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
