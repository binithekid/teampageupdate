"use client"

import Link from "next/link"
import { MenuLinks } from "../../data/menu"
import styles from "../Styles/modules/Footer.module.scss"
import { usePageTransition } from "./PageTransition"

const footerDisclaimer = "Digital Gravity Infra Partners is the trading name of DGP Capital Management Limited. DGP Capital Management Limited is an appointed representative of G10 Capital Limited which is authorised and regulated by the Financial Conduct Authority"

export const Footer = () => {
  
  const { onLinkClick } = usePageTransition()

  return (
    <footer className={styles.footer_section} >

      <div className={styles.footer_left_section}>

        <div className={styles.logo_wrapper} >
          <svg
            width="94"
            viewBox="0 0 94 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0V87.6875H93.3639V0H0ZM86.7315 81.4583H6.63241V6.22917H86.7315V81.4583ZM39.8149 71.2042H50.7634V55.545H44.131V64.975H39.8149C34.5293 64.975 30.2234 60.9308 30.2234 55.9667C30.2234 54.2513 30.7336 52.5933 31.7029 51.1558C32.5294 49.9292 33.6722 48.8942 35.0089 48.1658C36.4578 47.38 38.121 46.9583 39.8046 46.9583H55.2735C58.0489 46.9583 60.7835 46.2875 63.2017 45.0225C65.5282 43.7958 67.5281 42.0229 68.9668 39.905C70.63 37.4612 71.4974 34.6342 71.4974 31.7208C71.4974 23.3162 64.2221 16.4833 55.2735 16.4833H44.3249V31.7208H50.9573V22.7125H55.2735C60.559 22.7125 64.8649 26.7567 64.8649 31.7208C64.8649 33.4458 64.3446 35.1133 63.365 36.5508C62.5079 37.8062 61.3345 38.8508 59.9468 39.5792C58.5284 40.3267 56.9061 40.7196 55.2633 40.7196H39.7944C36.9374 40.7196 34.1314 41.4287 31.6723 42.7608C29.4173 43.9875 27.4786 45.7317 26.0807 47.8017C24.4379 50.2358 23.5706 53.0533 23.5706 55.9475C23.5706 64.3521 30.8458 71.185 39.7944 71.185L39.8149 71.2042Z"
              fill="currentcolor"
            />
          </svg>
          <p>
            <span>Digital Gravity</span>
            <span>Infra Partners</span>
          </p>
        </div>

        <p>{footerDisclaimer}</p>

      </div>

      <div className={styles.footer_right_section}>

        <div className={styles.top_footer_links}>

          <div className={styles.page_links} >
            {
              MenuLinks.map( ({ text, url }) => 
                <Link href={url} key={text} onClick={(e: any) => onLinkClick(e,url) } >
                  {text}
                </Link>
              )
            }
          </div>

          <a className={styles.member_linkedin} href="https://www.linkedin.com/company/digital-gravity-partners" target="_blank" >
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
              <path d="M8.00427 4.7009C8.00374 5.7556 7.58426 6.76689 6.8381 7.5123C6.09195 8.25771 5.08024 8.67618 4.02554 8.67566C2.97084 8.67513 1.95955 8.25565 1.21414 7.50949C0.468726 6.76333 0.0502544 5.75162 0.0507817 4.69692C0.0513091 3.64223 0.470792 2.63093 1.21695 1.88552C1.96311 1.14011 2.97482 0.721641 4.02951 0.722168C5.08421 0.722696 6.0955 1.14218 6.84091 1.88834C7.58633 2.63449 8.0048 3.6462 8.00427 4.7009ZM8.12357 11.6204H0.170084V36.5149H8.12357V11.6204ZM20.6901 11.6204H12.7764V36.5149H20.6105V23.4513C20.6105 16.1738 30.0951 15.4978 30.0951 23.4513V36.5149H37.9492V20.7471C37.9492 8.47881 23.9112 8.93613 20.6105 14.9609L20.6901 11.6204Z" fill="var(--primary-color)"/>
            </svg>
          </a>

        </div>

        <div className={styles.bottom_footer_disclaimers} >
          <Link href="/cookie" onClick={(e: any) => onLinkClick(e,"/cookie") } >Cookie policy</Link>
          <Link href="/privacy-policy" onClick={(e: any) => onLinkClick(e,"/privacy-policy") } >Website privacy policy</Link>
          <Link href="/terms-of-service" onClick={(e: any) => onLinkClick(e,"/terms-of-service") } >Website terms and conditions</Link>
        </div>

        {/* <p>
          This website is for professional investors only.
        </p> */}
      </div>

    </footer>
  )
}
