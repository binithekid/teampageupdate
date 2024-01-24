"use client";

import React, { useRef, useEffect } from "react";

import { gsap } from "gsap";
import useAddCursorPull from "../../../Hooks/useAddCursorPull";

interface BurgerButton {
  burgerRef: React.MutableRefObject<any>;
  toggle: () => void;
  isOpen: boolean;
}

const BurgerButton = ({ burgerRef, toggle, isOpen }: BurgerButton) => {


  const isMenuOpen   = useRef(false);

  const topLineRef    = useRef(null);
  const bottomLineRef = useRef(null);

  useEffect(() => {

    if ( isOpen && !isMenuOpen.current )  openNavBurger()
    else if ( !isOpen && isMenuOpen.current ) closeNavBurger();

  }, [isOpen]);

  const openNavBurger = () => {

    isMenuOpen.current = true
    
    gsap.to(topLineRef.current, {
      rotate: 45,
      yPercent: 140,
      duration: 0.4,
    });
    gsap.to(bottomLineRef.current, {
      rotate: -45,
      yPercent: () => -140,
      duration: 0.4,
    });

  };

  const closeNavBurger = () => {

    isMenuOpen.current = false
    gsap.to([topLineRef.current,bottomLineRef.current], {
      rotate: 0,
      yPercent: 0,
      duration: 0.4,
    });

  };

  const burgerHoverIn = () => {

    gsap.to([topLineRef.current,bottomLineRef.current], {
      scale: 0.85,
      duration: 0.5,
      ease: "expo.out"
    })

  }

  const burgerHoverOut = () => {

    gsap.to([topLineRef.current,bottomLineRef.current], {
      scale: 1,
      duration: 0.5,
      ease: "expo.out"
    })
  }

  useAddCursorPull(
    burgerRef,
    {
      useDefaultScroller: true,
      x: 0.2,
      y: 0.2
    },
    []
  );

  return (
    <button ref={burgerRef} onClick={toggle} className="navbar_toggler"
      onMouseOver={burgerHoverIn}
      onMouseOut={burgerHoverOut}
    >

      <svg
        className="menuLines l1"
        xmlns="http://www.w3.org/2000/svg"
        ref={topLineRef}
        viewBox="0 0 27 3"
      >
        <rect
          id="Rectangle_298"
          data-name="Rectangle 298"
          width="25"
          height="3"
          rx="1.5"
          fill="currentcolor"
        />
      </svg>

      <svg
        className="menuLines l2"
        xmlns="http://www.w3.org/2000/svg"
        ref={bottomLineRef}
        viewBox="0 0 27 3"
      >
        <rect
          id="Rectangle_298"
          data-name="Rectangle 298"
          width="25"
          height="3"
          rx="1.5"
          fill="currentcolor"
        />
      </svg>

    </button>
  );
};

export default BurgerButton;
