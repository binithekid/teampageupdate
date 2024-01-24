import { gsap } from "gsap";
import { investmentTeam, operatingPartners } from "../../../data/team";
import styles from "../../Styles/modules/Team/team.module.scss";
import Image from "next/image";

export const Team = () => {
  return (
    // Component
    // Component
    <section className={`container ${styles.team_section}`}>
      <div className={styles.title_wrapper}>
        <h3>Investment Team</h3>
      </div>

      {/* Team member Grid */}
      <div className={styles.team_grid_wrapper}>
        <div className={styles.team_grid_container}>
          {investmentTeam.map((member, index) => (
            <div key={index} className={styles.team_member}>
              <div className={styles.member_img}>
                <Image src={member.img} alt={member.name} placeholder="empty" />
              </div>
              <div className={styles.info_container}>
                <div className={styles.member_info}>
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
                <button className={styles.open_popup}>
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
          ))}
        </div>
      </div>

      <div className={styles.partners_title_wrapper}>
        <h3>Operating Partners </h3>
      </div>

      <div className={styles.team_grid_wrapper}>
        <div className={styles.team_grid_container}>
          {operatingPartners.map((member, index) => (
            <div key={index} className={styles.team_member}>
              <div className={styles.member_img}>
                <Image src={member.img} alt={member.name} placeholder="empty" />
              </div>
              <div className={styles.info_container}>
                <div className={styles.member_info}>
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
                <button className={styles.open_popup}>
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
          ))}
        </div>
      </div>
    </section>
  );
};
