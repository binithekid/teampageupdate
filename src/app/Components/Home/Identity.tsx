"use client"

import { useContext, useRef } from "react"
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import styles from "../../Styles/modules/Home/Identity.module.scss"
import { gsap } from "gsap"
import { Identities } from "../../../data/home"
import Image from "next/image"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"

export const Identity = () => {

  const { deviceSize } = useContext<ContextTypes>(AppContext);

  const IdentityContainerRef = useRef(null)
  const IdentityCardsContainerRef = useRef(null)
  const IdentityHeadingRef = useRef(null)

  useIsomorphicLayoutEffect(() => {

    if ( deviceSize <= 768 ) return
    let gsapCtx: any;

    const TL = setTimeout(() => IdentitySceneAnimation(gsapCtx), 100)
    
    return () => {
      if( gsapCtx && gsapCtx.kill ) gsapCtx.kill()
      clearTimeout(TL)
    }

  },[deviceSize])

  const IdentitySceneAnimation = ( gsapCtx: any ) => {

    gsapCtx = gsap.context(() => {

      gsap.set(IdentityContainerRef.current, {
        height: ( window.innerHeight * 1.5 ) + "px"
      })

      gsap.set(IdentityCardsContainerRef.current, { yPercent: 100 })
      gsap.set(IdentityHeadingRef.current, { scale: 0.7 })

      gsap.to(IdentityHeadingRef.current, {
        scale: 1,
        scrollTrigger: {
          trigger: IdentityContainerRef.current,
          start: () => "top center",
          end: () => "top top",
          scrub: true
        },
        ease: "none"
      })

      gsap.to(IdentityCardsContainerRef.current, {
        yPercent: 0,
        scrollTrigger: {
          trigger: IdentityContainerRef.current,
          start: "top top+=5%",
          end: `+=${window.innerHeight / 3}px`,
          scrub: 1,
        },
        ease: "none"
      })

      // for ( let i = 1; i <= Identities.length; i++ ) {

      //   const identityCardEl = document.querySelector(`.identity-${i}`)

      //   const cardStartTrigger = `top+=${ ( window.innerHeight / 3 ) + ( window.innerHeight * 0.6 ) + ( 300 *  (i + 1) ) }px bottom`

        // gsap.fromTo(identityCardEl, {
        //   rotate: 0,
        //   y: 0
        // },{
        //   rotate: -15,
        //   y: `${-window.innerHeight}px`,
        //   scrollTrigger: {
        //     trigger: IdentityContainerRef.current,
        //     start: cardStartTrigger,
        //     scrub: false,
        //     toggleActions: "play none none reverse"
        //   },
        //   ease: "power2.inOut",
        //   duration: 0.75
        // })
      // }

    }, IdentityContainerRef)

  }
  
  return (
    <section className={`container ${styles.identity_section}`} ref={IdentityContainerRef} >

      <div className={styles.content_wrapper} >

        <h3 ref={IdentityHeadingRef} >Our strategy</h3>

        <div className={styles.identity_cards_container} ref={IdentityCardsContainerRef} >

          {
            Identities.map( ({ heading, text, bg, img },idx) => 
              <div className={`${styles.identity_card} identity-${idx + 1}`} key={heading} 
                style={{ backgroundColor: bg, zIndex: Identities.length - idx }}
              >

                <div className={styles.identity_card_logo} >
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
                </div>

                <h3>{heading}</h3>
                <p>{text}</p>

                <div className={styles.identity_card_img} >
                  <Image src={img} alt={heading} fill
                    sizes="(max-width: 500px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 40vw, 30vw"/>
                </div>

              </div>
            )
          }

        </div>

      </div>

    </section>
  )
}
