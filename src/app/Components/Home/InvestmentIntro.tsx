"use client"

import { useContext } from "react";
import styles from "../../Styles/modules/Home/InvestmentPlans.module.scss"
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";

const investmentHeadingDesc = `Digital Gravity Infrastructure Partners invests in the assets and companies that provide the infrastructure of the internet, supporting digital transformation and connectivity.<br/><br/> Our digital infrastructure specialism and value-add approach are investing in and building leading neutral, scalable businesses to drive positive change. We invest in global connectivity, empowering underserved communities, and shaping a connected, sustainable future.`;

export const InvestmentIntro = () => {

  const { smoothScroller } = useContext<ContextTypes>(AppContext);

  const scrollToNextSection = () => {
    if ( smoothScroller ) smoothScroller.scrollTo("#InvestmentSliderSection")
  }

  return (
    <section className={styles.investment_intro} >
      
      <div className={styles.video_wrapper} >

        <video preload="metadata" autoPlay={true} muted={true} loop={true} playsInline={true} 
          data-wf-ignore="true" data-object-fit="cover" poster="/Video/investmentPoster.jpg" >
          <source src="/Video/InvestmentIntro.webm" type="video/webm" data-wf-ignore="true" />
          <source src="/Video/InvestmentIntro.mp4" type="video/mp4" data-wf-ignore="true" />
          Your browser does not support the video tag.
        </video>

      </div>

      <div className={styles.intro_content} >

        <h6>Investing across the entire digital infra value chain</h6>
        <p className={styles.subheading_desc} style={{ fontWeight: 500 }}>
          <span
            dangerouslySetInnerHTML={{ __html: investmentHeadingDesc }}
          ></span>
        </p>

        <div className={styles.scroll_down} onClick={scrollToNextSection} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          <p>Digital Gravity sector focus</p>
        </div>
      </div>

    </section>
  )
}
