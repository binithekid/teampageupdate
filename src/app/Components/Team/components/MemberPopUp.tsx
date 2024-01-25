import React, { useRef, useEffect } from "react";
import styles from "../../../Styles/modules/Team/team.module.scss";
import gsap from "gsap";
import Image from "next/image";

interface MemberPopUpProps {
  activePopupIndex: number | null;
  closePopup: () => void;
  data: any; // Assuming OperatingPartner interface is defined
}

export const MemberPopUp = ({
  activePopupIndex,
  closePopup,
  data,
}: MemberPopUpProps) => {
  const fullscreenPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activePopupIndex !== null) {
      animatePopupIn();
    } else if (fullscreenPopupRef.current) {
      animatePopupOut();
    }
  }, [activePopupIndex]);

  useEffect(() => {
    // Disable scrolling on the page body when the popup is open
    if (activePopupIndex !== null) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }

    // Cleanup function
    return () => {
      // Enable scrolling on the page body when the component unmounts or popup is closed
      document.body.classList.remove("popup-open");
    };
  }, [activePopupIndex]);

  const animatePopupIn = () => {
    gsap.fromTo(
      fullscreenPopupRef.current,
      { y: "100vh", opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }
    );
  };

  const animatePopupOut = () => {
    if (fullscreenPopupRef.current) {
      gsap.to(fullscreenPopupRef.current, {
        y: "100vh",
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: closePopup,
      });
    }
  };

  return (
    <div ref={fullscreenPopupRef} className={styles.fullscreen_popup}>
      <div className={styles.close_container}>
        <div />
        <button className={styles.close_popup} onClick={closePopup}>
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
      {/* Content of the fullscreen popup */}
      {activePopupIndex !== null && data[activePopupIndex] && (
        <div className={styles.popup_container}>
          <div className={styles.title_container}>
            <h1>{data[activePopupIndex].name}</h1>
            <p>{data[activePopupIndex].position}</p>
          </div>
          <div className={styles.content_container}>
            <div className={styles.image_container}>
              <div className={styles.member_img}>
                {" "}
                <Image
                  src={data[activePopupIndex].img}
                  alt={data[activePopupIndex].name}
                  placeholder="empty"
                />
              </div>
            </div>
            <div className={styles.text_container}>
              {data[activePopupIndex].content.map(
                (paragraph: string, index: number) => (
                  <p
                    key={index}
                    className={`${styles.member_description} ${
                      index === 0 ? styles.first_paragraph : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
