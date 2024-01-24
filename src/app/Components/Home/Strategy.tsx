"use client"

import { gsap } from 'gsap';
import useIsomorphicLayoutEffect from '../../Hooks/useIsomorphicLayoutEffect';

import styles from '../../Styles/modules/Home/Strategy.module.scss'
import { useContext, useRef, useState } from 'react';
import { ElementSeparator } from '../../utils';
import { ContextTypes } from '../../Types';
import AppContext from '../../Context/AppContext';

export const StrategySection = () => {

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const [headingContent,setHeadingContent] = useState<any>("Digital Gravity’s strategy is positioned towards")
  const strategySectionRef                 = useRef(null)
  const strategyHeadingContainerRef        = useRef<HTMLHeadingElement>(null)
  const strategyHeadlineRef                = useRef<HTMLHeadingElement>(null)

  useIsomorphicLayoutEffect(() => {
    
    let gsapCtx: any;

    if ( loadingScene ) return

    setTimeout( () => strategySceneAnimation(gsapCtx), 200)
  
    return () => {
      if( gsapCtx && gsapCtx.revert ) gsapCtx.revert()
    }
  }, [loadingScene])

  const strategySceneAnimation = (gsapCtx: any) => {

    gsapCtx = gsap.context(() => {

      if ( !strategyHeadlineRef.current ) return

      const allCharElements = ElementSeparator(strategyHeadlineRef.current, 'span')

      setHeadingContent(allCharElements)

      setTimeout(() => {
        if ( !strategyHeadlineRef.current ) return

        const allSeparatedElements = strategyHeadlineRef.current.querySelectorAll('span')
  

        // Hide all span elements by increasing their y
        allSeparatedElements.forEach( (separatedElement,idx) => {
          const yPercent = Math.min( (idx * 1.2) + 20,1000)

          if ( separatedElement.innerText !== '-')
            gsap.set(separatedElement,{
              yPercent,
              alpha: 0
            })

            const startTrigger = `top+=${(idx* 115) - 500}px top`
            const endTrigger = `+=${200 + ( idx * 1.2 )}px`
            if ( separatedElement.innerText !== '-')
              gsap.to(separatedElement, {
                yPercent: 0,
                alpha: 1,
                scrollTrigger: {
                  trigger: strategySectionRef.current,
                  start: startTrigger,
                  end: endTrigger,
                  scrub: 1
                },
                ease: 'none'
              })
        })

        const scrollWidth = strategyHeadlineRef.current.offsetWidth - ( window.innerWidth * 0.75 )

        gsap.to(strategyHeadlineRef.current, {
          x: -scrollWidth,
          y: 0,
          scrollTrigger: {
            trigger: strategySectionRef.current,
            start: `top+=350px top`,
            end: 'bottom bottom',
            scrub: true,
          },
          ease: 'none'
        })

      },100)

    }, strategySectionRef)

  }

  return (
    <section className={`${styles.strategy_section} container`} ref={strategySectionRef} >
      <h4 ref={strategyHeadingContainerRef} >
        <span className={styles.heading_chars_container} ref={strategyHeadlineRef} 
          dangerouslySetInnerHTML={{ __html: headingContent }}
        >
        </span>
      </h4>
    </section>
  )
}