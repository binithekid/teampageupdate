"use client"

import { useState, useEffect, useRef, useContext } from "react";
import "./header.scss";

import Link from "next/link";
import { usePathname,  } from 'next/navigation'

import BurgerButton from './BurgerButton/burgerButton'

// import Logo from "../../assets/svg/Logo.svg";
import gsap from "gsap";
import useAddCursorPull from "../../Hooks/useAddCursorPull";
import { useCallback } from "react";

import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
import { Logo } from "./Logo/Logo";
import { InfiniteHeaderLinkButton } from "./InfiniteHeaderLinkButton";
import { MenuLinks } from "../../../data/menu";
import { usePageTransition } from "../PageTransition";

// let TO

function Header() {

  const { smoothScroller }  = useContext<ContextTypes>(AppContext)

  const [showMenu, toggleShowMenu] = useState(false);
  const [showLogoText,setShowLogoText] = useState(false)

  const dgNavbarHolderRef = useRef<HTMLDivElement>(null)
  const dgNavbarRef = useRef<HTMLElement>(null)
  const burgerRef = useRef(null)
  const investorPortalButton = useRef<HTMLButtonElement>(null)

  const { onLinkClick } = usePageTransition()
  
  const HomeLinkRef = useRef(null)
  const AboutLinkRef = useRef(null)
  const TeamLinkRef = useRef(null)
  const SustainLinkRef = useRef(null)

  const navMenuLinks = MenuLinks.map( link => {
    return {
      ...link,
      ref: link.text === "About" ? AboutLinkRef : link.text === "Team" ? TeamLinkRef : link.text === "Sustainability" ? SustainLinkRef : null
    }
  })

  // Fix header on scroll hook
  // const isHeaderFixed = useHeaderFixedScroll()

  const firstLoad = useRef(true)
  const menuContainer = useRef(null)
  const menuBg = useRef(null)

  const activeRoute = usePathname()

  useEffect( () => {
    toggleShowMenu( false )
    if ( dgNavbarHolderRef.current ) dgNavbarHolderRef.current.classList.remove('light')
  },[activeRoute])

  useEffect(() => {
    
    if ( showMenu ) {
      openMenuBg()
      if ( smoothScroller ) smoothScroller.stop()
    }
    else if ( firstLoad.current ) firstLoad.current = false
    else {
      if ( smoothScroller ) smoothScroller.start()
      closeMenuBg()
    }
  
  }, [smoothScroller,showMenu])

  const openMenuBg = () => {

    const circleR = Math.sqrt( Math.pow(window.innerHeight,2) + Math.pow(window.innerWidth,2) )
    // const customEase = CustomEase.create("custom", "M0,0,C0,0.238,0.016,0.489,0.184,0.726,0.186,0.728,0.188,0.731,0.191,0.733,0.411,1.002,0.746,0.988,1,1")

    gsap.set(dgNavbarRef.current, { color: "var(--primary-color)"})
    gsap.set(menuContainer.current, { display: "flex" })
    gsap.set('.navbar-ul .nav-item', { x: 0 })
    gsap.to( menuBg.current, {
      clipPath: `circle(${circleR + 100}px at ${ '100%' } 0px)`,
      duration: 0.5,
      ease: 'Power2.out',
      overwrite: true
    })

    gsap.fromTo('.navbar-ul .nav-item',{
      skewY: 3,
      yPercent: 10,
    }, {
      skewY: 0,
      yPercent: 0,
      opacity: 1,
      duration: 0.3,
      stagger: 0.01,
      delay: 0.2,
      overwrite: true,
      ease: 'Power2.out'
    })
    gsap.to(".navbar-ul span", {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      delay: 0.1,
      overwrite: true,
      ease: 'Power2.out'
    })

    gsap.to(".menu_left_link_part", {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      delay: 0.2,
      overwrite: true,
      ease: 'Power2.out'
    })
    gsap.to(".menu_mid_info_part", {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      delay: 0.2,
      overwrite: true,
      ease: 'Power2.out'
    })
    gsap.to(".menu_right_portal_part", {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.4,
      delay: 0.2,
      overwrite: true,
      ease: 'Power2.out'
    })
  }

  const closeMenuBg = () => {
    // const customEase = CustomEase.create("custom", "M0,0,C0,0.238,0.016,0.489,0.184,0.726,0.186,0.728,0.188,0.731,0.191,0.733,0.411,1.002,0.746,0.988,1,1")

    gsap.set(dgNavbarRef.current, { color: "currentColor"})

    gsap.to( menuBg.current, {
      clipPath: `circle(0px at ${'105%' } 10px)`,
      duration: 0.4,
      ease: 'Power4.out',
      overwrite: true,
      delay: 0.2,
      onComplete: () => {
        gsap.set(menuContainer.current, { display: "none" })
      }
    })
    gsap.to('.navbar-ul .nav-item', {
      yPercent: 10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.01,
      ease: "expo.outIn"
    })
    gsap.to(".navbar-ul span", {
      opacity: 0,
      duration: 0.4,
      overwrite: true,
      ease: "expo.outIn"
    })
    gsap.to(".menu_left_link_part", {
      opacity: 0,
      duration: 0.4,
      overwrite: true,
      ease: "expo.outIn"
    })

    gsap.to(".menu_mid_info_part", {
      opacity: 0,
      duration: 0.4,
      overwrite: true,
      ease: "expo.outIn"
    })

    gsap.to(".menu_right_portal_part", {
      opacity: 0,
      duration: 0.4,
      overwrite: true,
      ease: "expo.outIn"
    })
  }

  const logoHoverIn = () => {

    setShowLogoText(true)
    
  }

  const logoHoverOut = () => {

    setShowLogoText(false)

  }

  const MenuClick = (e: any) => {
    if ( e.target === menuContainer.current ) toggleShowMenu( prev => !prev )
  }

  const investorPortalHoverIn = () => {
    if ( investorPortalButton.current )
      investorPortalButton.current.innerHTML = "Login details"
  }

  const investorPortalHoverOut = () => {
    if ( investorPortalButton.current )
      investorPortalButton.current.innerHTML = "Investor Portal"
  }
  useAddCursorPull(
    investorPortalButton,
    {
      useDefaultScroller: true,
      y: 0.1,
      x: 0.05,
    },
    []
  );

  return (
    <>
      {/* Normal Header at top */}
      <header 
        id="header"
        className={"dg-header"}
      >

        <div className="header-container nav-holder" ref={dgNavbarHolderRef} >

          <nav className="navbar" ref={dgNavbarRef}>

            <div className="nav-container">

              <div className="left-part">

                <div className="logo-holder">
                  <Link className="logo" href="/"
                    onMouseOver={logoHoverIn}
                    onMouseOut={logoHoverOut}
                    onClick={(e: any) => onLinkClick(e,"/") }
                  >

                    <Logo showLogoText={showLogoText} />

                  </Link>
                </div>

              </div>


              <div className="right-part" >

                <InfiniteHeaderLinkButton />

                <BurgerButton 
                  burgerRef={burgerRef}
                  toggle={ () => toggleShowMenu( prev => !prev ) } 
                  isOpen={showMenu}
                />

              </div>
            </div>

            {/* Menu */}
            <div className={`menu`} ref={menuContainer} onClick={MenuClick} >

              <div 
                className="menubg"
                ref={menuBg}
              >
              </div>

              {showMenu ? (
                <div
                  className="bg-full-cover absolute"
                  onClick={() => toggleShowMenu( prev => !prev )}
                ></div>
                ) : ''}

              <div className="menu_content">

                <div className="menu_left_link_part">

                  <ul className="navbar-ul" >

                    <span>Menu</span>

                    {
                      navMenuLinks.map( ({ text, ref, url }) =>
                        <li className="nav-item"
                          ref={ref}
                          key={text}
                        >
                          <Link
                            className={`nav-link ${ activeRoute === url ? "active" : ''} `}
                            href={url}
                          >
                            {text}
                          </Link>
                        </li>
                      )
                    }

                  </ul>


                </div>

                <div className="menu_mid_info_part">

                  <div className="contact_address">
                      <span>Address</span>
                      <p>Green Park House<br/>Digital Gravity Infra Partners<br/> 15 Stratton Street, Mayfair<br/>London, W1J 8LQ</p>
                  </div>

                  <div className="contact_socials">

                    <span>Please direct enquiries to:</span>

                    <div className="enquiries_row">
                      <span>General:</span>
                      <a href="mailto:hello@digitalgravity.com" target="_blank">hello@digitalgravity.com</a>
                    </div>
                    <div className="enquiries_row">
                      <span>Careers:</span>
                      <a href="mailto:careers@digitalgravity.com" target="_blank">careers@digitalgravity.com</a>
                    </div>
                    <div className="enquiries_row">
                      <span>Media:</span>
                      <a href="mailto:media@digitalgravity.com" target="_blank">media@digitalgravity.com</a>
                    </div>

                  </div>

                </div>

                <div className="menu_right_portal_part">
                  <button ref={investorPortalButton} 
                    onMouseEnter={investorPortalHoverIn}
                    onMouseLeave={investorPortalHoverOut}
                  >Investor Portal</button>
                </div>

              </div>


            </div>
            
          </nav>
        </div>

      </header>

    </>
  );
}

// const useHeaderFixedScroll = () => {

//   const [isHeaderFixed, setIsHeaderFixed] = useState(false);

//   const { smoothScroller }  = useContext<ContextTypes>(AppContext)

//   useEffect(() => {

//     if( window.innerWidth > 768 && smoothScroller ) {

//       window.removeEventListener('scroll', onScroll)
//       smoothScroller.on('scroll',onSmoothScroll)
//       onSmoothScroll()

//     } else {
//       window.addEventListener('scroll', onScroll)
//       onScroll()
//     }
    
//     return () => {
//       if( smoothScroller && smoothScroller.removeListener ) smoothScroller.removeListener(onSmoothScroll)
//       window.removeEventListener('scroll', onScroll)
//     }

//   }, [isHeaderFixed,smoothScroller]);

//   const onSmoothScroll = useCallback( () => {

//     const scrollTop = window.scrollY

//     // determinScrolledPartSmooth()

//     if ( scrollTop >= window.innerHeight - 50 && !isHeaderFixed ) {

//       setIsHeaderFixed(true)

//       gsap.to('header.dg-header', {
//         height: '2.1rem',
//         duration: 0.5,
//         ease: 'expo.out',
//         overwrite: true
//       })

//       // const LogoLink = document.querySelector('header.dg-header .nav-container .left-part a.logo')
//       const headerRightPart = document.querySelector('header.dg-header .nav-container .right-part')
//       const rightPartBg = document.querySelector('header.dg-header .nav-container .right-part .right-part-bg')
      
//       if ( !rightPartBg ) return

//       headerRightPart?.classList.add('fixed')

//       gsap.to(rightPartBg, {
//         y: 0,
//         duration: 0.5,
//         ease: 'expo.out',
//         overwrite: true
//       })

//       // gsap.set(LogoLink, { color: "var(--primary-color)" })

//     } else if ( scrollTop < window.innerHeight - 50 && isHeaderFixed ) {

//       // const LogoLink = document.querySelector('header.dg-header .nav-container .left-part a.logo')
//       const headerRightPart = document.querySelector('header.dg-header .nav-container .right-part')

//       setIsHeaderFixed(false)

//       gsap.to('header.dg-header', {
//         height: '3rem',
//         duration: 0.5,
//         ease: 'expo.out',
//         overwrite: true
//       })

//       // gsap.set(LogoLink, { color: "var(--bg-color)" })

//       const rightPartBg = document.querySelector('header.dg-header .nav-container .right-part .right-part-bg')
      
//       if ( !rightPartBg ) return

//       headerRightPart?.classList.remove('fixed')

//       gsap.to(rightPartBg, {
//         y: '-4rem',
//         duration: 0.5,
//         ease: 'expo.out',
//         overwrite: true
//       })

//     }

//   },[isHeaderFixed])
  
//   const onScroll = useCallback(() => {

//     const scrollTop = window.scrollY
//     // determinScrolledPart(scrollTop)

//     if ( scrollTop > 400 && !isHeaderFixed ) {

//       setIsHeaderFixed(true)

//       gsap.to('header.dg-header', {
//         height: '2.1rem',
//         duration: 0.5,
//         ease: 'expo.out'
//       })

//       // const LogoLink = document.querySelector('header.dg-header .nav-container .left-part a.logo')
//       const headerRightPart = document.querySelector('header.dg-header .nav-container .right-part')
//       const rightPartBg = document.querySelector('header.dg-header .nav-container .right-part .right-part-bg')
      
//       if ( !rightPartBg ) return

//       headerRightPart?.classList.add('fixed')

//       gsap.to(rightPartBg, {
//         y: 0,
//         duration: 0.5,
//         ease: 'expo.out'
//       })

//       // gsap.set(LogoLink, { color: "var(--primary-color)" })

//     } else if ( scrollTop < 400 && isHeaderFixed ) {

//       setIsHeaderFixed(false)

//       gsap.to('header.dg-header', {
//         height: '2.6rem',
//         duration: 0.5,
//         ease: 'expo.out'
//       })

//       // const LogoLink = document.querySelector('header.dg-header .nav-container .left-part a.logo')
//       const headerRightPart = document.querySelector('header.dg-header .nav-container .right-part')
//       const rightPartBg = document.querySelector('header.dg-header .nav-container .right-part .right-part-bg')
      
//       // gsap.set(LogoLink, { color: "var(--bg-color)" })

//       if ( !rightPartBg ) return

//       headerRightPart?.classList.remove('fixed')
//       gsap.to(rightPartBg, {
//         y: '-4rem',
//         duration: 0.5,
//         ease: 'expo.out'
//       })

//     } 
//   },[isHeaderFixed])

//   return isHeaderFixed
// }

// let tl;

// const usePageTransition = ( toggleShowMenu ) => {

//   const lastLocation = useRef(null);
//   const location = useLocation();

//   const wasMenuOpen = useRef(null)

//   const scroller = useSelector( state => state.features.scroller )

//   useEffect( () => {

//     if (!tl) tl = pageTransitionTL()
//     if ( lastLocation.current === null && location ) {
//       lastLocation.current = location.pathname
//       return
//     }

//     if ( !location ) return

//     if( wasMenuOpen.current ) {
//       wasMenuOpen.current = false
//       lastLocation.current = location.pathname;

//       if ( !scroller ) {
//         // if( 
//         //   location.pathname.split('/')[1] === 'shop' && 
//         //   lastLocation.current.split('/')[1] === 'shop') {
//         //     lastLocation.current = location.pathname;
//         //     return
//         // }

//         window.scrollTo(0,0);
//       } else scroller.setPosition(0,0)
      
//       return
//     }

//     if( location.pathname === '/' ) {
//       lastLocation.current = location.pathname;
//       if( scroller ) scroller.setPosition(0,0)
//       else window.scrollTo(0,0);
//       // if ( firstTime.current ) firstTime.current = false
//       return
//     }

//     // if ( !firstTime.current ) {


//     if( 
//       location.pathname.split('/')[1] === 'shop' && 
//       lastLocation.current.split('/')[1] === 'shop') {
//         lastLocation.current = location.pathname;
//         return
//       }
      
//     if( scroller ) scroller.setPosition(0,0)
//     else window.scrollTo(0,0);
    
//     if ( location.pathname !== lastLocation.current ) {
//       lastLocation.current = location.pathname;
//       tl.play(0);
//     }

//     // } else firstTime.current = false
  
//   }, [location]);

//   const toggleMenuOnMenuOpen = () => {
//     wasMenuOpen.current = true
//     setTimeout( () => toggleShowMenu(false), 300)
//   }

//   return toggleMenuOnMenuOpen;
// }

export default Header;