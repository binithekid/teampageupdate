"use client"

import { useContext, useRef, useState } from "react"
import styles from "../../Styles/modules/Home/Opportunity.module.scss"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import { ElementSeparator } from "../../utils"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const OpportunityDate = {
  heading: "The Opportunity",
  content: "The digital transformation has already begun"
}

export const OpportunityHeading = () => {

  const [headingContent,setHeadingContent] = useState<any>(OpportunityDate.heading)

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const OpportunitySectionRef = useRef(null)
  const OpportunityHeadingContainerRef = useRef<HTMLHeadingElement>(null)
  const OpportunityContentRef = useRef(null)
  const TO = useRef<any>(0)


  useIsomorphicLayoutEffect(() => {
    
    if ( loadingScene ) return

    let gsapCtx: any;

    const TL = setTimeout( () => oppurtonityScene(gsapCtx), 200)

    return () => {
      if( gsapCtx && gsapCtx.revert ) gsapCtx.revert()
      clearTimeout(TL)
    }
  }, [loadingScene])

  const oppurtonityScene = (gsapCtx: any) => {
    gsapCtx = gsap.context(() => {
      if ( !OpportunityHeadingContainerRef.current ) return

      const allCharElements = ElementSeparator(OpportunityHeadingContainerRef.current, 'span')

      const scrollTriggerData = {
        trigger: OpportunitySectionRef.current,
        start: "top center",
        end: "center top+=30%",
        scrub: true,
      }

      let playedContentType = false;
      ScrollTrigger.create({
        ...scrollTriggerData,
        start: "top center",
        onEnter: () => {
          if ( playedContentType ) return
          playedContentType = true
          typeContent(OpportunityContentRef.current, OpportunityDate.content)
        }
      })
      gsap.fromTo(OpportunityHeadingContainerRef.current, {
        scale: 0.75
      }, {
        scale: 0.75,
        scrollTrigger: scrollTriggerData,
        ease: 'none'
      })

      setHeadingContent(allCharElements)

      setTimeout(() => {

        if ( !OpportunityHeadingContainerRef.current ) return

        const allSeparatedElements = OpportunityHeadingContainerRef.current.querySelectorAll('span')
  
        // Hide all span elements by increasing their y
        allSeparatedElements.forEach( (separatedElement,idx) => {
          const yPercent = Math.min( (idx * 10) + 50,150)

          if ( separatedElement.innerText !== '-')
            gsap.set(separatedElement,{
              yPercent,
              alpha: 0
            })

          const startTrigger = `top+=${(idx* 20)}px center+=25%`
          const endTrigger = `+=${10 + ( idx * 1.5 )}px`

          if ( separatedElement.innerText !== '-')
            gsap.to(separatedElement, {
              yPercent: 0,
              alpha: 1,
              scrollTrigger: {
                ...scrollTriggerData,
                start: startTrigger,
                end: endTrigger,
                scrub: 1
              },
              ease: 'none'
            })
        })

      },100)

    },OpportunitySectionRef)
  }

  function typeContent( el: any, letters: string ) {

    if ( !el ) return

    let index = 0;
    let sentence = '';

    function type() {

      if ( index === letters.length ) return

      sentence += letters[index];
      el.innerHTML += sentence[index];
      index++
      TO.current = setTimeout(type, 8);
    }
  
    type()
  }

  return (
    <section className={`container ${styles.opportunity_section}`} ref={OpportunitySectionRef} >
      <h5 className={styles.heading_container} ref={OpportunityHeadingContainerRef} dangerouslySetInnerHTML={{ __html: headingContent }} ></h5>
      <p ref={OpportunityContentRef} ></p>
    </section>
  )
}
