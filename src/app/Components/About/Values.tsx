"use client"

import { useContext, useRef } from "react"
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import styles from "../../Styles/modules/About/Values.module.scss"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"
import { gsap } from "gsap"
import { AnimationItem } from "lottie-web"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LottiePlayer from "../LottiePlayer"

const valuesData = [
  {
    title: "Integrity",
    contents: [
      "Build trust",
      "Uphold ethical principles",
      "Foster long-term relationships",
      "Maintain mutual respect"
    ],
    lottieSrc: "./Lottie/values-1.lottie"
  },
  {
    title: "Stewardship",
    contents: [
      "Act prudently",
      "Manage risk",
      "Uphold fiduciary duties",
      "Prioritise investor interests",
    ],
    lottieSrc: "./Lottie/values-2.lottie"
  },
  {
    title: "Innovation",
    contents: [
      "Culture of innovation",
      "Continuous improvement",
      "‘Tinkering’ mentality",
      "Strive to be at the leading edge"
    ],
    lottieSrc: "./Lottie/values-3.lottie"
  },
  {
    title: "Sustainability",
    contents: [
      "Prioritise a sustainable mandate",
      "Authentic approach to reporting",
      "Genuine contribution to society",
      "Build connectivity for the next generation",
    ],
    lottieSrc: "./Lottie/values-4.lottie"
  },
]

export const Values = () => {

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const valuesSectionRef = useRef<HTMLElement>(null)

  const headingContainer = useRef<HTMLDivElement>(null)
  const valueCardsContainer = useRef<HTMLDivElement>(null)
  
  const lottiesAnimationRefs = useRef<any>([])

  useIsomorphicLayoutEffect(() => {
    
    if ( loadingScene ) return

    let GsapContext: any;

    setTimeout( () => valuesScene(GsapContext), 200)

    return () => {
      if( GsapContext && GsapContext.revert ) GsapContext.revert()
      // if ( lottiesAnimationRefs.current.length ) {
      //   lottiesAnimationRefs.current.forEach( (lottie:any) => {
      //     lottie.destroy()
      //   })
      // }
    }
  }, [loadingScene])

  const valuesScene = ( gsapCtx: any ) => {
    gsapCtx = gsap.context( () => {

      if ( !valuesSectionRef.current || !valueCardsContainer.current ) return

      function loadAllLottieAnimation() {

        valuesData.forEach( ({ lottieSrc },idx) => {

          const LottieRef = lottiesAnimationRefs.current[idx].load(lottieSrc)
          LottieRef.loop = true
          LottieRef.subframe = true

        })

      }
      loadAllLottieAnimation()

      // play and stop lottie animations on scroll in and out
      ScrollTrigger.create({
        trigger: valuesSectionRef.current,
        start: "top top",
        end: "bottom top",
        onToggle: ({ isActive }) => {

          if ( isActive && lottiesAnimationRefs.current.length ) 
            lottiesAnimationRefs.current.forEach( (lottie: AnimationItem) => lottie.play() )
          else
            lottiesAnimationRefs.current.forEach( (lottie: AnimationItem) => lottie.stop() )

        }
      })

      gsap.fromTo(headingContainer.current, {
        yPercent: 50,
        alpha: 0
      }, {
        yPercent: 0,
        alpha: 1,
        scrollTrigger: {
          trigger: valuesSectionRef.current,
          start: "top center+=25%",
          end: `+=${window.innerHeight * 0.2}px`,
          scrub: true,
        },
        ease: "none"
      })



      const cardItemCardWrappers = Array.from(valueCardsContainer.current.children)
      
      if ( cardItemCardWrappers ) cardItemCardWrappers.forEach( (cardWrapper,idx) => {

        const cardItems = Array.from(cardWrapper.children)

        const leftCard  = cardItems[0]
        const rightCard = cardItems[1]

        gsap.set(leftCard, {
          xPercent: 20
        })
        gsap.set(rightCard, {
          xPercent: -20
        })

        const startOffset = Math.floor( idx / 2 ) * window.innerHeight * 0.15
        const startTrigger = `top+=${startOffset}px center`

        gsap.to(leftCard, {
          xPercent: 0.1,
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: startTrigger,
            end: `+=${window.innerHeight * 0.2}px`,
            scrub: true,
          },
          ease: "none"
        })
        gsap.to(rightCard, {
          xPercent: -0.1,
          scrollTrigger: {
            trigger: valuesSectionRef.current,
            start: startTrigger,
            end: `+=${window.innerHeight * 0.3}px`,
            scrub: true,
          },
          ease: "none"
        })
      })

    },valuesSectionRef)
  }

  return (
    <section className={`container ${styles.values_section}`} ref={valuesSectionRef} >

      <div className={styles.heading_container} ref={headingContainer} >
        <h5>Values</h5>
      </div>

      <div className={styles.value_cards_container} ref={valueCardsContainer} >
        {
          valuesData.map( ({ title, contents, lottieSrc }) => 
            <div className={styles.card_wrapper} key={title} >

              <div className={styles.contents_card} >

                <h5>{title}</h5>

                <ul>
                  {
                    contents.map( (text,idx) => 
                      <li key={text} >
                        <span className={styles.content_item_index} >{idx + 1}</span>
                        <span className={styles.content_text} >{text}</span>
                      </li>
                    )
                  }
                </ul>

              </div>

              <div className={styles.animation_card} >

                <LottiePlayer
                  refCB={(instance: any) => {
                    lottiesAnimationRefs.current.push(instance);
                  }}
                  direction={-1}
                />

              </div>

            </div>
          )
        }
      </div>

    </section>
  )
}
