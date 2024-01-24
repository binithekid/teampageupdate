"use client"

import { useRef } from 'react'
import Link from 'next/link'

export const InfiniteHeaderLinkButton = () => {

  const linkedinInfiniteTextButton = useRef<HTMLAnchorElement>(null)

  // useEffect(() => {
    
  //   const infiniteTL = gsap.context( () => {

  //     const infiniteItems = linkedinInfiniteTextButton.current?.querySelectorAll('span')

  //     if ( infiniteItems?.length )
  //       horizontalLoop(infiniteItems, {
  //         speed: 0.25
  //       })

  //   }, linkedinInfiniteTextButton)

  //   return () => {
  //     if ( infiniteTL && infiniteTL.kill ) infiniteTL.kill()
  //   }

  // },[])

  // useAddCursorPull(
  //   linkedinInfiniteTextButton,
  //   {
  //     useDefaultScroller: true,
  //   },
  //   []
  // );

  return (
    <Link href="https://www.linkedin.com/company/digital-gravity-partners" target='_blank' className="hero_linkedin" ref={linkedinInfiniteTextButton} >
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
        <path d="M8.00427 4.7009C8.00374 5.7556 7.58426 6.76689 6.8381 7.5123C6.09195 8.25771 5.08024 8.67618 4.02554 8.67566C2.97084 8.67513 1.95955 8.25565 1.21414 7.50949C0.468726 6.76333 0.0502544 5.75162 0.0507817 4.69692C0.0513091 3.64223 0.470792 2.63093 1.21695 1.88552C1.96311 1.14011 2.97482 0.721641 4.02951 0.722168C5.08421 0.722696 6.0955 1.14218 6.84091 1.88834C7.58633 2.63449 8.0048 3.6462 8.00427 4.7009ZM8.12357 11.6204H0.170084V36.5149H8.12357V11.6204ZM20.6901 11.6204H12.7764V36.5149H20.6105V23.4513C20.6105 16.1738 30.0951 15.4978 30.0951 23.4513V36.5149H37.9492V20.7471C37.9492 8.47881 23.9112 8.93613 20.6105 14.9609L20.6901 11.6204Z" fill="currentColor"/>
      </svg>
    </Link>
  )
}
