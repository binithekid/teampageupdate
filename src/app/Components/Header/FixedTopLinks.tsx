"use client"

import Link from "next/link"
import { MenuLinks } from "../../../data/menu"
import { useContext, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"
import { useRouter } from "next/navigation"
import { usePageTransition } from "../PageTransition"
// import useAddCursorPull from "../../Hooks/useAddCursorPull"

export const FixedTopLinks = () => {

  const { pageTransitionTL }  = useContext<ContextTypes>(AppContext)

  const fixedTopHeader = useRef<HTMLDivElement>(null)

  const HomeLinkRef = useRef(null)
  const AboutLinkRef = useRef(null)
  const TeamLinkRef = useRef(null)
  const FocusLinkRef = useRef(null)

  const navMenuLinks = [
    ...MenuLinks.map( link => {
    return {
      ...link,
      ref: link.text === "About" ? AboutLinkRef : link.text === "Team" ? TeamLinkRef : link.text === "Focus" ? FocusLinkRef : null
    }
    })
  ]

  const activeRoute = usePathname()

  useEffect( () => {
    if ( fixedTopHeader.current ) fixedTopHeader.current.classList.remove('light')
  },[activeRoute])

  // useAddCursorPull(
  //   AboutLinkRef,
  //   {
  //     useDefaultScroller: true,
  //   },
  //   []
  // );
  // useAddCursorPull(
  //   TeamLinkRef,
  //   {
  //     useDefaultScroller: true,
  //   },
  //   []
  // );
  // useAddCursorPull(
  //   FocusLinkRef,
  //   {
  //     useDefaultScroller: true,
  //   },
  //   []
  // );

  const { onLinkClick } = usePageTransition()

  return (
    <div className="fixed_top_header" ref={fixedTopHeader} >
      {
        navMenuLinks.map( ({ text, url, ref }) => 
          <Link href={url} className="top_link_item" key={text} ref={ref} 
            onClick={ (e) => onLinkClick(e,url)} >{text}</Link>
        )
      }
    </div>
  )
}