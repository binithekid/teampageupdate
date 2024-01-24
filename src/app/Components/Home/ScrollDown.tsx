"use client"

import { useContext, useRef } from 'react'
import useIsomorphicLayoutEffect from '../../Hooks/useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { ContextTypes } from '../../Types'
import AppContext from '../../Context/AppContext'

import styles from '../../Styles/modules/Home/Hero.module.scss'

export const ScrollDown = () => {

  const { smoothScroller }  = useContext<ContextTypes>(AppContext)

  const scrollDownArrow = useRef(null)

  useIsomorphicLayoutEffect(() => {

    gsap.fromTo(scrollDownArrow.current,{
      y: 0
    }, {
      y: 7,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "expo.outIn",
    })

  },[])

  const scrollPageDown = () => {
    smoothScroller.scrollTo("#aboutSection", {
      offset: 0,
      duration: 2
    })
  }

  return (
    <button className={styles.hero_scroll_down} onClick={scrollPageDown} >
      Scroll Down
      <svg ref={scrollDownArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  )
}
