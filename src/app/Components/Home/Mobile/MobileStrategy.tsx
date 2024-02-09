import Image from "next/image";
import styles from "../../../Styles/modules/Home/Strategy.module.scss";

import "@johanaarstein/dotlottie-player";

interface MobileStrategyProps {
  supTitle: string;
  title: string;
  content: string;
}

const MobileSlideImages = [
  "/strategy_m_1.jpg",
  "/strategy_m_2.jpg",
  "/strategy_m_3.jpg",
];

export const MobileStrategy = ({ data }: { data: MobileStrategyProps[] }) => {
  const slideCounter = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <section className={`${styles.m_strategy_slides_section} container`}>
      <h6>Digital Gravity’s investment strategy</h6>

      <div className={styles.m_slides_container}>
        {data.map(({ supTitle, title, content }, idx) => (
          <div className={styles.m_strategy_slide} key={title}>
            <div className={styles.m_img_container}>
              <Image
                src={MobileSlideImages[idx]}
                alt={title}
                fill
                sizes="90vw"
              />
            </div>

            <span className={styles.m_strategy_counter}>
              {slideCounter(idx + 1)} <span></span> {supTitle}
            </span>

            <div className={styles.m_slide_heading_container}>
              <h4 dangerouslySetInnerHTML={{ __html: title }}></h4>
            </div>

            <div className={styles.m_slide_content_container}>
              <p className={styles.m_strategy_content}>{content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
