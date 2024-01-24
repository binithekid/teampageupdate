"use client"

import { useContext, useRef } from "react"
import styles from "../../Styles/modules/About/OurVision.module.scss"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import { horizontalLoop } from "../../utils"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const OurVision = () => {

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const ourVisionSectionRef = useRef<HTMLElement>(null)
  const ourVisionContentContainerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    
    if ( loadingScene ) return

    let GsapContext: any;

    const TL = setTimeout( () => ourVisionScene(GsapContext), 0)

    return () => {
      if( GsapContext && GsapContext.revert ) GsapContext.revert()
      clearTimeout(TL)
    }
  }, [loadingScene])

  const topInfiniteBadgeRef    = useRef<HTMLDivElement>(null)
  const bottomInfiniteBadgeRef = useRef<HTMLDivElement>(null)

  const ourVisionScene = ( gsapCtx: any ) => {
    gsapCtx = gsap.context(() => {

      if ( !ourVisionContentContainerRef.current ) return

      // gsap.set(".page_overlay_bg", {
      //   backgroundColor: "var(--primary-color)",
      //   opacity: 1,
      // })

      const header = document.querySelector(".header-container")
      const fixedHeaderLinks = document.querySelector(".fixed_top_header")

      ScrollTrigger.create({
        trigger: ourVisionSectionRef.current,
        start: `top-=${window.innerHeight / 10}px top`,
        end: `bottom-=${window.innerHeight / 10}px top`,
        onToggle: ({ isActive }) => {

          if ( isActive && !header?.classList.contains("light") ) {

            header?.classList.add("light")
            fixedHeaderLinks?.classList.add("light")

          } else if ( !isActive && header?.classList.contains("light") ) {

            header?.classList.remove("light")
            fixedHeaderLinks?.classList.remove("light")

          }
        }
      })

      const headingElements = Array.from(ourVisionContentContainerRef.current.querySelectorAll("h1"))
      const contentElements = Array.from(ourVisionContentContainerRef.current.querySelectorAll("p"))

      const targetContentList = [...headingElements,...contentElements]

      targetContentList.forEach( (contentEl,idx) => {

        const textSpan     = contentEl.firstChild

        gsap.set(textSpan, { yPercent: 200, skewY: -2 })

        gsap.to(textSpan, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          delay: idx > 1 ? (idx * 0.1) : 0,
          duration: 0.7,
          ease: "expo.outIn",
          overwrite: true
        })

      })

      const topInfiniteItems    = topInfiniteBadgeRef.current?.querySelectorAll('span')
      const bottomInfiniteItems = bottomInfiniteBadgeRef.current?.querySelectorAll('span')

      if ( topInfiniteItems?.length && bottomInfiniteItems?.length ) {

        horizontalLoop(topInfiniteItems, {
          speed: 1
        })
        horizontalLoop(bottomInfiniteItems, {
          speed: 1
        })

      }

    })
  }

  return (
    <>

      <section className={`container ${styles.our_vision_section}`} ref={ourVisionSectionRef} >

        <div className={styles.content_wrapper} ref={ourVisionContentContainerRef} >

          <h1 className={`${styles.our_vision_title} ${styles.sec_title}`}>
            <span>
              Our Vision
            </span>
          </h1>
          <h1 className={styles.our_vision_title}>
            <span>
              A purpose-driven European
            </span>
          </h1>

          <h1 className={styles.our_vision_title}>
            <span>
              based investment advisor
            </span>
          </h1>

          <p className={styles.our_vision_sub_title} >
            <span>Delivering superior risk-adjusted returns through sector specialism</span>
          </p>
          <p className={styles.our_vision_sub_title} >
            <span>and operating experience while promoting sustainability </span>
          </p>
          <p className={styles.our_vision_sub_title} >
            <span>and digital equality</span>
          </p>
          

        </div>

      </section>

    </>
  )
}