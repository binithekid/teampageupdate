import styles from "../../../Styles/modules/Home/Opportunity.module.scss"

interface MobileOpportunityProps {
  title: string;
  content: {
    icon: any;
    text: string;
  }[];
  bigTitle: string;
  bgColor: string;
  dottiesSrc: string;
}

import "@johanaarstein/dotlottie-player";

export const MobileOpportunity = ({ data }: { data: MobileOpportunityProps[] }) => {
  return (
    <section className={`container ${styles.m_oppurtonity_missions_section}`} >

      <h5>The Opportunity</h5>

      <div className={styles.m_opportunity_slides_wrapper}>
        {
          data.map( ({ bgColor, bigTitle, content, dottiesSrc, title}) => 
            <div key={title} style={{ backgroundColor: bgColor }} className={styles.m_opp_card} >

              <div className={styles.m_content_wrapper} >

                <h5>{title}</h5>
                <ul>
                  {
                    content.map( ({ text, icon }) =>
                      <li key={text} >
                        <span>
                          {icon}
                        </span>
                        <p>{text}</p>
                      </li>
                    )
                  }
                </ul>
              </div>

              <div className={styles.m_lottie_container} >
                <dotlottie-player
                  src={dottiesSrc}
                  autoplay="autoplay"
                  subframe={true}
                  loop=""
                />
              </div>

              <div className={styles.m_huge_heading} >
                <h5>{bigTitle}</h5>
              </div>

            </div>
          )
        }
      </div>

    </section>
  )
}
