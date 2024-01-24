import Image from "next/image";
import styles from "../../Styles/modules/sustainability/index.module.scss";
import FrameworkImage from "../../assets/DGP Framework.jpg";
import TableImage1 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-09.jpg";
import TableImage2 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-12.jpg";
import TableImage3 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-11.jpg";
import TableImage4 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-13.jpg";
import TableImage5 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-03.jpg";
import TableImage6 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-04.jpg";
import TableImage7 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-05.jpg";
import TableImage8 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-07.jpg";
import TableImage9 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-08.jpg";
import TableImage10 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-10.jpg";
import TableImage11 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-16.jpg";
import TableImage12 from "../../assets/SDG Icons 2019 _PRINT/E_SDG_PRINT-17.jpg";

import BannerImg from "../../assets/Header - image-asset.jpeg";
import OurVisionImage from "../../assets/Our Vision image-asset.jpeg";
import SustainableConnectivityImage from "../../assets/Sustainable Connectivity image - 2021-Lavrion-Karystia-Project-Greece-36.jpeg";
import ZeroGravityImage from "../../assets/Zero Gravity image-asset.jpeg";
import { MullishFont } from "../../fonts";

export default function Sustainability() {
  return (
    <main className={`${MullishFont.className} ${styles.sustainability_page}`}>
      <header>
        <div className={styles.banner_top_gradient}></div>
        <h1>Investing in a Sustainable & Inclusive Future</h1>

        <div className={styles.header_image_container}>
          <Image src={BannerImg} alt="Banner Image" fill />
        </div>
      </header>

      <div className={styles.sustainability_container}>
        <section>
          <div className={styles.section_title}>
            <h2>Our Vision</h2>
            <p>
              At Digital Gravity, our vision is to revolutionise the digital
              landscape by investing in digital infrastructure while promoting
              sustainability, bridging the digital divide, and delivering
              superior returns. We aim to be the world’s leading pure-play
              mid-cap digital infrastructure specialist advising across the
              entire value chain.
              <br />
              <br />
              Our strategy seeks investments in and builds capabilities across
              the global connectivity and data value chain, with a real asset
              focus, utilising the gravity of our network and deep domain
              expertise to drive convergence opportunities across the portfolio.{" "}
              <br />
              <br />
              We are committed to driving positive change by directing capital
              towards projects that enhance data connectivity and facilitate the
              digital transformation of societies. By strategically investing in
              next generation digital infrastructure, we aim for the Fund to
              bridge the gap between underserved communities and technological
              advancements, fostering inclusivity and empowering individuals and
              businesses around the world.
            </p>
          </div>
          <div className={styles.content_wrapper}>
            <div className={styles.section_title_image}>
              <Image src={OurVisionImage} alt="Our Vision" fill />
            </div>
          </div>
        </section>

        <section className={styles.reverse} >
          <div className={styles.section_title}>
            <h2>Sustainable Connectivity</h2>

            <p>
              To achieve this vision, our main objective is what we call
              “Sustainable Connectivity”. The Fund will invest in data centres,
              subsea and terrestrial fibreoptic cables, and wireless networks
              (and businesses that operate and manage these assets and services)
              that contribute to climate change mitigation by reducing emissions
              and resource waste across digital infrastructure, and that improve
              digital transformation by expanding data connectivity and bridging
              digital divides.
              <br />
              <br /> The Fund will make investments which promote at least one
              of the following characteristics:
              <br />
              <br />
              <strong>Sustainable Digital Infrastructure:</strong>
              Improving the sustainability of digital infrastructure by
              investing in digital infrastructure assets and businesses that
              maximise the use of renewable energy, optimise energy efficiency
              practices, and drive towards zero emissions and zero natural
              resource waste, or that could be improved to do so.
              <br />
              <br />
              <strong>Digital Inclusivity & Transformation:</strong>
              Increasing inclusion and access to the internet for broad sections
              of society, especially those who are underserved or marginalised,
              by investing in digital infrastructure assets that enable faster,
              more reliable and more accessible data connectivity and support
              the digital transformation of society.
            </p>
          </div>

          <h3></h3>
          <div className={styles.content_wrapper}>
            <div className={styles.section_title_image}>
              <Image
                src={SustainableConnectivityImage}
                alt="Sustainable Connectivity"
                fill
              />
            </div>
          </div>
        </section>
        <section>
          <div className={styles.section_title}>
            <h4>Zero Gravity</h4>

            <p>
              Digital Gravity’s investment policy aligns with and propels our
              vision of Sustainable Connectivity. We execute on this objective
              through a dual-focus methodology: top-down from the Firm level and
              bottom-up from the Fund’s portfolio companies.
              <br />
              <br /> At the Firm level, we filter for assets or businesses which
              meet or could be improved to meet the goals of Sustainable Digital
              Infrastructure or Digital Inclusivity & Transformation. This
              ensures that every digital infrastructure platform we build and
              strategy we implement is a stride towards our overarching
              objective of Sustainable Connectivity. We believe our objective is
              aligned with growing customer demand requirements and a resource
              supply and demand imbalance - and to design business models whose
              objective is earning a superior risk-adjusted return while
              enhancing sustainability or inclusivity to meet those demand
              requirements or the supply/demand imbalance. <br />
              <br />
              Our strategy at the portfolio company level is centred around the
              principle of “Zero Gravity”: Zero Emissions, Zero Waste and Zero
              Inequality.
              <br />
              <br />
              <ul>
                <li>
                  <strong>Zero Emissions</strong> (zero-carbon energy,
                  efficiency)
                </li>
                <li>
                  <strong>Zero Waste</strong> (natural resources, circularity)
                </li>
                <li>
                  <strong>Zero Inequality</strong> (digital inclusivity,
                  diversity, human rights)
                </li>
              </ul>
              <br />
              <br />
              To implement this, we work closely with management teams and
              portfolio Boards, instilling a culture of sustainable practices
              and responsible governance, with ambitious KPIs and targets. This
              hands-on approach enables us to transform these ideals into
              tangible actions and measurable outcomes, embedding sustainability
              into the core of each portfolio company’s operations and ethos.
            </p>
          </div>

          <div className={styles.content_wrapper}>
            <div className={styles.section_title_image}>
              <Image src={ZeroGravityImage} alt="Zero Gravity" fill />
            </div>
          </div>
        </section>

        <section className={styles.strategy_box}>
          <div className={styles.strategy_contents_wrapper}>
            <div className={styles.content_box}>
              <h5>
                <span>Strategic example:</span>
                Accelerating the transition towards carbon neutrality through
                AI-ready data centres
              </h5>

              <ul>
                <li>
                  <span>
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
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </span>
                  <p>
                    Generative AI is changing the nature of the network and
                    compute needs of digital infrastructure.
                  </p>
                </li>
                <li>
                  <span>
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
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  </span>
                  <p>
                    The uplift in demand from AI by 2030 is projected to be an
                    additional 25GW on the 55GW demand required - an increase of
                    45% - as more applications become embedded (e.g. Copilot),
                    static training data is replaced by live data streams, and
                    AI moves from informing decisions to making decisions (e.g.
                    autonomous vehicles).
                  </p>
                </li>
                <li>
                  <span>
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
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </span>
                  <p>
                    <strong>
                      Digital Gravity aims to be the Zero Accelerator for
                      digital infrastructure providers for AI and Cloud to reach
                      their Carbon Neutrality goals (when the grid is not all
                      green).
                    </strong>
                  </p>
                </li>
                <li>
                  <span>
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
                        d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                      />
                    </svg>
                  </span>
                  <p>
                    But these shifts need to be done sustainably, requiring a
                    new kind of AI-ready, zero-carbon data centre that Digital
                    Gravity is working to deliver, striving to meet targets set
                    by some of the world’s most responsible businesses, for
                    example targeting 100% energy use, 100% of the time, from
                    zero carbon sources.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.wider_section} >
          <h6 style={{ lineHeight: "1.2" }}>
            Sustainability
            <br />
            Ecosystem
          </h6>
          <div className={styles.content_wrapper}>
            <p>
              The Firm and the Fund draw on established industry frameworks and
              guidelines such as the UN Principles for Responsible Investment,
              Un Global Compact and OECD Guidelines for Multinational
              Enterprises, Climate Neutral Data Centre Pact and the
              International Sustainability Standards Board.
              <br />
              <br /> We seek to align ourselves to the UN Sustainable
              Development Goals, both directly and indirectly:
            </p>

            <div className={styles.table_content}>
              <div className={styles.table_title}>
                <p>Directly Aligned</p>
              </div>

              <div className={styles.table_items}>
                <div className={styles.table_item}>
                  <div className={styles.item_image}>
                    <Image src={TableImage1} alt="logo" fill />
                  </div>
                  <p className={styles.item_content}>
                    The Fund invests directly in resilient, sustainable digital
                    infrastructures and innovative technologies, enhancing
                    global connectivity and supporting sustainable
                    industrialisation.
                  </p>
                </div>
                <div className={styles.table_item}>
                  <div className={styles.item_image}>
                    <Image src={TableImage2} alt="logo" fill />
                  </div>
                  <p className={styles.item_content}>
                    The Fund promotes sustainable consumption by advocating for
                    energy efficiency and reduced emissions in digital
                    infrastructures.
                  </p>
                </div>
              </div>

              <div className={styles.table_items}>
                <div className={styles.table_item}>
                  <div className={styles.item_image}>
                    <Image src={TableImage3} alt="logo" fill />
                  </div>
                  <p className={styles.item_content}>
                    The Fund's focus sectors like IoT end edge connectivity and
                    compute aids in developing smart, resilient urban
                    environments.
                  </p>
                </div>
                <div className={styles.table_item}>
                  <div className={styles.item_image}>
                    <Image src={TableImage4} alt="logo" fill />
                  </div>
                  <p className={styles.item_content}>
                    The Fund actively incorporate climate action measures in our
                    investments, focusing on reducing emissions and waste in
                    digital infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.table_content}>
              <div
                className={`${styles.table_title} ${styles.long_table_title}`}
              >
                <p>Indirectly Aligned</p>
              </div>

              <div className={styles.table_images}>
                <div className={styles.item_image}>
                  <Image src={TableImage5} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage6} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage7} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage8} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage9} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage10} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage11} alt="logo" fill />
                </div>
                <div className={styles.item_image}>
                  <Image src={TableImage12} alt="logo" fill />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.dpg_framework_section}>
          <h6 style={{ width: "100%", lineHeight: "1.2" }}>
            Digital Gravity’s <br />
            Sustainability Framework
          </h6>
          <div className={styles.image_container}>
            <Image src={FrameworkImage} alt="DPG Framework" fill />
          </div>
        </section>
      </div>
    </main>
  );
}
