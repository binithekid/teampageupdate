"use client"

import { useContext, useRef } from "react"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import { gsap } from "gsap"

import styles from "../../Styles/modules/Team/Quote.module.scss"
import { teamQuoteAchieved, teamQuoteAimed, teamQuoteBridging, teamQuoteBuisness, teamQuoteGreat, teamQuoteWorldClass } 
  from "../../utils/svgAsssets"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const quoteContent = [
  `"<b>Great things</b><span class="team_quote_icon">${teamQuoteGreat}</span>&nbsp;in <b>&nbsp;business</b><span class="team_quote_icon">${teamQuoteBuisness}</span>&nbsp;are never`,
  `<b>achieved</b><span class="team_quote_icon">${teamQuoteAchieved}</span>&nbsp;alone. We have recruited`,
  `<b>world class</b><span class="team_quote_icon">${teamQuoteWorldClass}</span>&nbsp;talent<b>&nbsp;aimed</b><span class="team_quote_icon">${teamQuoteAimed}</span>&nbsp;at`,
  `<b>bridging</b><span class="team_quote_icon">${teamQuoteBridging}</span>&nbsp;the digital divide"`,
]

export const TeamQuoteSection = () => {

  const { loadingScene, deviceSize }  = useContext<ContextTypes>(AppContext)

  const quoteSectionRef = useRef<HTMLElement>(null)
  const quoteContentWrapper = useRef<HTMLHeadingElement>(null)

  const activeQuoteIcon = useRef(0)

  useIsomorphicLayoutEffect(() => {
    
    if ( loadingScene ) return

    let gsapCtx: any;

    setTimeout( () => quoteScene(gsapCtx), 300)

    return () => {
      if( gsapCtx && gsapCtx.revert ) gsapCtx.revert()
    }
  }, [loadingScene,deviceSize])

  const quoteScene = ( gsapCtx: any ) => {
    gsapCtx = gsap.context(() => {

      if ( !quoteContentWrapper.current ) return

      const header = document.querySelector(".header-container")
      const fixedHeaderLinks = document.querySelector(".fixed_top_header")

      ScrollTrigger.create({
        trigger: quoteSectionRef.current,
        start: `top top`,
        end: `bottom top`,
        invalidateOnRefresh: true,
        immediateRender: false,
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

      if ( deviceSize < 768 ) return

      const contentElements = quoteContentWrapper.current.querySelectorAll("p")

      const quoteContainerHeight = quoteSectionRef.current?.offsetHeight || 0

      contentElements.forEach( (contentEl,idx) => {

        const textSpan     = contentEl.firstChild
        const endTrigger   = ((quoteContainerHeight * 0.6) - ( window.innerHeight * 0.9 )) / contentElements.length
        const startTrigger = idx * endTrigger

        gsap.set(textSpan, { yPercent: 110, rotateX: -90, alpha: 0, skewY: -3 })

        gsap.to(textSpan, {
          yPercent: 0,
          rotateX: 0,
          alpha: 1,
          skewY: 0,
          scrollTrigger: {
            trigger: quoteSectionRef.current,
            start: `top+=${startTrigger}px center-=20%`,
            end: `+=${endTrigger}px`,
            scrub: 1
          },
          ease: "none",
          overwrite: true
        })

      })

      const startReveilingIcons = ((quoteContainerHeight * 0.6) - ( window.innerHeight * 0.9 ))
      const allQuoteIcons       = quoteContentWrapper.current.querySelectorAll("span.team_quote_icon")
      const allQuoteBolds       = quoteContentWrapper.current.querySelectorAll("b")

      const progressPart = 1 / allQuoteIcons.length

      const reveilIcon = (idx: number) => {

        // const svgElementWidth  = allQuoteIcons[idx].querySelector("svg")?.getBoundingClientRect().width
        
        gsap.to(allQuoteIcons[idx],{
          display: "block",
          width: "auto",
          ease: "expo.out",
          duration: 0.5,
        })
        gsap.to(allQuoteBolds[idx], {
          fontWeight: 500,
          ease: "expo.out",
          duration: 0.5,
        })
      }
      const hideIcon = (idx: number) => {

        gsap.to(allQuoteIcons[idx],{
          width: 0,
          ease: "expo.out",
          duration: 0.5,
        })
        gsap.to(allQuoteBolds[idx], {
          fontWeight: 400,
          ease: "expo.out",
          duration: 0.5,
        })
      }

      ScrollTrigger.create({
        trigger: quoteSectionRef.current,
        start: `top+=${startReveilingIcons} top+=${window.innerHeight * 0.1}`,
        end: `bottom bottom+=${window.innerHeight * 0.1}`,
        invalidateOnRefresh: true,
        immediateRender: false,
        onUpdate: ({ progress }) => {

          const currentActiveIconIdx = Math.floor( progress / progressPart )

          if ( activeQuoteIcon.current !== currentActiveIconIdx ) {

            if ( currentActiveIconIdx > activeQuoteIcon.current ) reveilIcon(currentActiveIconIdx - 1)
            else hideIcon(currentActiveIconIdx)
            
            activeQuoteIcon.current = currentActiveIconIdx

          }
        }
      })

    }, quoteSectionRef)
  }

  return (
    <section className={`container ${styles.quote_section}`} ref={quoteSectionRef} >

      <div className={styles.quote_container} >

        <h5 ref={quoteContentWrapper} >

          {
            quoteContent.map( text => 
              <p className={`${styles.quote_text_container}`} key={text} >
                <span dangerouslySetInnerHTML={{ __html: text }} ></span>
              </p>
            )
          }

        </h5>

        <div className={styles.written_by_container} >
          <span>- Thorsten Johnsen, Managing Partner</span>
        </div>

      </div>
    </section>
  )
}