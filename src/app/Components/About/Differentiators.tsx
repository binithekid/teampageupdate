"use client"

import { MutableRefObject, useContext, useRef, useState } from "react"
import styles from "../../Styles/modules/About/Differentiators.module.scss"
import { ContextTypes } from "../../Types"
import AppContext from "../../Context/AppContext"
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect"
import { gsap } from "gsap"
import useAddCursorPull from "../../Hooks/useAddCursorPull"

type MetricsObjectType = {
  desc: string;
  num: number;
  afterNum: string;
  beforeNum: string;
}

interface DiffDataType {
  title: string;
  desc: string;
  bgColor: string;
  metrics: MetricsObjectType[];
}

const diffData: DiffDataType[] = [
  {
    title: "Specialised focus",
    desc: `Our senior leadership have over a century of investing and managing assets specifically in digital infrastructure and will maintain a focus  on our four sub-sectors.`,
    bgColor: "rgb(10, 6, 43)",
    metrics: [
      {
        desc: "Digital infrastructure experience",
        num: 143,
        afterNum: "&nbsp;yrs",
        beforeNum: ""
      },
    ]
  },
  {
    title: "Proven track record",
    desc: `Repeated execution of the target investment strategy and delivered an impressive track record of successful investments and exits. The strong infrastructure credentials and breadth of industry operating experience, aim to deliver superior risk adjusted returns.`,
    bgColor: "#4CB3FD",
    metrics: [
      {
        desc: "realised gross MOIC",
        num: 2.8,
        afterNum: "x",
        beforeNum: ""
      }
    ]
  },
  {
    title: "Partnerships and networks",
    desc: `We bring a network of key relationships and operating partners within the digital infrastructure ecosystem. We have (and will continue to) collaborate with industry experts, technology providers, government bodies and regulatory authorities to understand where the asset class is heading. However, importantly, we have access through our network to exclusive deal flow and origination opportunities, insights and market intelligence.`,
    bgColor: "rgb(10, 6, 43)",
    metrics: [
      {
        desc: "strategic relationships with telcos, MNOs and global tech​",
        num: 6,
        afterNum: "",
        beforeNum: ""
      }
    ]
  },
  {
    title: "Operational focus",
    desc: `Our approach is to actively engage with portfolio companies to drive operational improvements, optimize performance, and unlock value. We can leverage our experience and network to create tangible and measurable impact.`,
    bgColor: "#4CB3FD",
    metrics: [
      {
        desc: "upper-level management and NED roles placed across the portfolio",
        num: 15,
        afterNum: "",
        beforeNum: ""
      }
    ]
  },
  {
    title: "Authentic sustainability",
    desc: `Core DGP focus is bridging the digital divide by improving local and global connectivity while driving sustainability, including decarbonising data centres and enhancing energy security`,
    bgColor: "rgb(10, 6, 43)",
    metrics: [
      {
        desc: "Mandate across our Fund’s DGP advises on​",
        num: 8,
        afterNum: "",
        beforeNum: "Article&nbsp;"
      },
    ]
  },
  {
    title: "Thought leadership",
    desc: `The team is already a trusted source of expertise in the digital infrastructure space, offering unique perspectives and actionable insights to investors and industry stakeholders.`,
    bgColor: "#4CB3FD",
    metrics: [
      {
        desc: "of digital infra speaking slots attended",
        num: 100,
        afterNum: "+ hrs",
        beforeNum: ""
      },
    ]
  },
]

export const Differentiators = () => {

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const diffSectionRef   = useRef<HTMLElement>(null)
  const diffWrapper = useRef<HTMLDivElement>(null)

  const diffCardBox = useRef<HTMLDivElement>(null)
  const diffContentsWrapper = useRef<HTMLDivElement>(null)

  const [activeCard,setActiveCard] = useState(0)

  useIsomorphicLayoutEffect(() => {
    
    if ( loadingScene ) return

    let GsapContext: any;
    setDiffsContainerHeight()

    return () => {
      if( GsapContext && GsapContext.revert ) GsapContext.revert()
    }
  }, [loadingScene])

  const allParagraphElements = useRef<HTMLParagraphElement[]>([])

  const setDiffsContainerHeight = () => {

    if ( !diffSectionRef.current ) return

    allParagraphElements.current = Array.from( diffContentsWrapper.current?.querySelectorAll("p") || [])
    gsap.set(allParagraphElements.current, {
      yPercent: -50,
    })
    gsap.set(allParagraphElements.current[0], {
      pointerEvents: "all",
      opacity: 1,
    })

  }

  const Context = useDiffScrollAnimationScene({
    diffSectionRef: diffSectionRef,
    diffWrapper: diffWrapper,
  })

  const goToNextDiff = () => {
    if ( activeCard === ( diffData.length / 3 ) - 1 ) return

    const curr = activeCard
    const next = activeCard + 1
    Context.current.slideToNextDiff(curr,next)
    // changeActiveCardDetail(curr,next)
    setActiveCard(next)
  }

  const goToPrevDiff = () => {
    if ( activeCard === 0 ) return

    const curr = activeCard
    const prev = activeCard - 1
    Context.current.slideToPrevDiff(curr,prev)
    // changeActiveCardDetail(curr,prev)
    setActiveCard(prev)
  }

  const sliderNextButtonRef = useRef<HTMLButtonElement>(null)
  const sliderPrevButtonRef = useRef<HTMLButtonElement>(null)

  useAddCursorPull(
    sliderNextButtonRef,
    {
      useDefaultScroller: true,
    },
    []
  );
  useAddCursorPull(
    sliderPrevButtonRef,
    {
      useDefaultScroller: true,
    },
    []
  );

  const onNavButtonHoverIn = (e: any) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      overwrite: true,
      duration: 0.5,
      ease: "expo.out"
    })
  }

  const onNavButtonHoverOut = (e: any) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      overwrite: true,
      duration: 0.5,
      ease: "expo.out"
    })
  }

  useIsomorphicLayoutEffect(() => {

    if( activeCard === 0 ) 
      gsap.set(sliderPrevButtonRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        overwrite: true,
      })
    else if ( activeCard === (diffData.length / 3) - 1 )
      gsap.set(sliderNextButtonRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        overwrite: true,
      })

  }, [activeCard])

  const isNextActive = activeCard !== (diffData.length / 3) - 1
  const isPrevActive = activeCard !== 0

  return (
    <section className={`container ${styles.diff_section}`} ref={diffSectionRef} >

      <div className={styles.diff_cards_container} ref={diffWrapper}>

        <div className={styles.heading_container} >
          <h1>Differentiators</h1>
        </div>

        <div className={styles.diff_cards_wrapper} >

          <div className={`diff_card_box_item ${styles.diff_card_item}`} ref={diffCardBox} >
            {
              diffData.slice(0,2).map( (diff, idx) => 
                <DiffCard key={diff.title} data={diff} idx={idx} activeCard={activeCard} />
              )
            }
          </div>
          <div className={`diff_card_box_item ${styles.diff_card_item}`} ref={diffCardBox} >
            {
              diffData.slice(2,4).map( (diff, idx) => 
                <DiffCard key={diff.title} data={diff} idx={idx + 2} activeCard={activeCard} />
              )
            }
          </div>
          <div className={`diff_card_box_item ${styles.diff_card_item}`} ref={diffCardBox} >
            {
              diffData.slice(4).map( (diff, idx) => 
                <DiffCard key={diff.title} data={diff} idx={idx + 4} activeCard={activeCard} />
              )
            }
          </div>

        </div>

        <div className={styles.diff_nav} >

          <button className={`${styles.diff_prev_button} ${ isPrevActive ? "" : styles.disabled_nav }`} 
            onClick={ isPrevActive ?  goToPrevDiff : () => {} } ref={sliderPrevButtonRef} 
            onMouseEnter={ isPrevActive ? onNavButtonHoverIn : () => {}  }
            onMouseLeave={ onNavButtonHoverOut }
            disabled={!isPrevActive}
          >
            {prevSlideSvg}
          </button>

          <button className={`${styles.diff_next_button} ${ isNextActive ? "" : styles.disabled_nav }`} 
            onClick={ isNextActive ? goToNextDiff : () => {} } ref={sliderNextButtonRef} 
            onMouseEnter={ isNextActive ?  onNavButtonHoverIn : () => {}  }
            onMouseLeave={ onNavButtonHoverOut }
            disabled={!isNextActive}
          >
            {nextSlideSvg}
          </button>

        </div>

      </div>

    </section>
  )
}

const topZ = 100

interface AwardImgProps {
  data: DiffDataType;
  idx: number;
  activeCard: number;
}

const DiffCard = ({ data, idx, activeCard }: AwardImgProps) => {

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const { metrics, title, bgColor, desc } = data

  const diffCardWrapper = useRef(null)

  const firstPreNum = useRef<HTMLSpanElement>(null)
  const firstNum = useRef<HTMLSpanElement>(null)
  const firstPostNum = useRef<HTMLSpanElement>(null)
  const firstDesc = useRef<HTMLSpanElement>(null)

  const TO = useRef<any>(0)

  const isCardDescOpen = useRef(false)

  useIsomorphicLayoutEffect(() => {

    if ( loadingScene ) return

    if ( (activeCard % 2 === 0 && idx % 2 === 0) || (activeCard % 2 !== 0 && idx % 2 !== 0) )
      changeActiveCardDetail()
    

    if ( isCardDescOpen.current ) closeDescPopup()

  }, [loadingScene,activeCard])

  useIsomorphicLayoutEffect(() => {
  
    let GsapContext: any;

    setTimeout( () => DiffCardAnimation(GsapContext), 100)

    return () => {
      if( GsapContext && GsapContext.revert ) GsapContext.revert()
    }
  }, [])

  const DiffCardAnimation = ( gsapCtx: any ) => {

    gsapCtx = gsap.context( () => {
      
      gsap.set(cardOverlayRef.current, {
        scale: 0.7,
        alpha: 0,
      })

      gsap.set(cardDescRef.current, {
        alpha: 0,
        yPercent: 10
      })

    }, diffCardWrapper)

  }

  const changeActiveCardDetail = () => {

    if ( !firstPreNum.current || !firstNum.current || !firstPostNum.current || !firstDesc.current ) return

    clearTimeout(TO.current)

    firstPreNum.current.innerHTML = diffData[idx].metrics[0].beforeNum
    firstNum.current.innerHTML = ""
    firstPostNum.current.innerHTML = diffData[idx].metrics[0].afterNum
    firstDesc.current.innerHTML = ""

    countUp(firstNum.current,diffData[idx].metrics[0].num)

    type(firstDesc, diffData[idx].metrics[0].desc )
  }

  const countUp = ( el: HTMLSpanElement, targetNumber: number ) => {

    const numbersAfterZero = targetNumber.toString().split(".").length > 1 ? targetNumber.toString().split(".")[1].length : 0

    const counter = {
      num: 0
    }

    gsap.to(counter, {
      num: targetNumber,
      ease: "expo.outIn",
      duration: 1.5,
      overwrite: true,
      invalidateOnRefresh: true,
      immediateRender: false,
      onUpdate: () => {
        el.innerText = counter.num.toFixed(numbersAfterZero)
      }
    })
  }

  function type( el: MutableRefObject<HTMLAnchorElement | HTMLSpanElement | null>, 
    word: string, cb: () => void = () => {}, index = 0 ) {

    if ( !el.current ) return
    
    el.current.innerHTML += word[index];

    if ( index >= word.length - 1 ) TO.current = setTimeout(cb,20)
    else TO.current = setTimeout(() => type(el,word,cb,index + 1), 13);
  }

  const cardOverlayRef = useRef<HTMLDivElement>(null)
  const cardDescRef = useRef<HTMLDivElement>(null)
  const openDescIcon = useRef<SVGPathElement>(null)
  const closeDescIcon = useRef<SVGPathElement>(null)

  const toggleCardDescription = () => {

    if ( !isCardDescOpen.current ) 
      openDescPopup()
    else 
      closeDescPopup()

  }

  const openDescPopup = () => {
    isCardDescOpen.current = true

    gsap.to(openDescIcon.current, {
      alpha: 0,
      ease: 'power1.outIn',
      duration: 0.3,
      overwrite: true
    })
    gsap.to(closeDescIcon.current, {
      alpha: 1,
      ease: 'power1.outIn',
      duration: 0.3,
      overwrite: true
    })

    gsap.to( cardOverlayRef.current, {
      width: "90%",
      height: "100%",
      alpha: 1,
      scale: 1,
      pointerEvents: "all",
      ease: 'power1.outIn',
      duration: 0.3,
      overwrite: true
    })

    gsap.fromTo(cardDescRef.current,{
      yPercent: 10,
      alpha: 0
    }, {
      yPercent: 0,
      alpha: 1, 
      delay: 0.3,
      ease: 'power1.outIn',
      duration: 0.4,
      overwrite: true
    })
  }

  const closeDescPopup = () => {
    
    isCardDescOpen.current = false

    gsap.to(openDescIcon.current, {
      alpha: 1,
      ease: 'power1.outIn',
      duration: 0.3,
      overwrite: true
    })
    gsap.to(closeDescIcon.current, {
      alpha: 0,
      ease: 'power1.outIn',
      duration: 0.3,
      overwrite: true
    })

    gsap.to(cardDescRef.current, {
      yPercent: 10,
      alpha: 0,
      ease: 'power1.outIn',
      duration: 0.3,
      overwrite: true
    })
    
    gsap.to( cardOverlayRef.current, {
      height: 0,
      width: 0,
      alpha: 0,
      scale: 0.7,
      pointerEvents: "none",
      ease: 'power2.out',
      duration: 0.4,
      delay: 0.1,
      overwrite: true,
    })

  }
  
  return (
    <div className={`diff_card_item ${styles.diff_container}`}
      style={{ 
        zIndex: topZ - idx,
        backgroundColor: bgColor
      }}
      ref={diffCardWrapper}
    >

      <div className={styles.diff_card_logo} >
        <svg
          width="94"
          viewBox="0 0 94 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0V87.6875H93.3639V0H0ZM86.7315 81.4583H6.63241V6.22917H86.7315V81.4583ZM39.8149 71.2042H50.7634V55.545H44.131V64.975H39.8149C34.5293 64.975 30.2234 60.9308 30.2234 55.9667C30.2234 54.2513 30.7336 52.5933 31.7029 51.1558C32.5294 49.9292 33.6722 48.8942 35.0089 48.1658C36.4578 47.38 38.121 46.9583 39.8046 46.9583H55.2735C58.0489 46.9583 60.7835 46.2875 63.2017 45.0225C65.5282 43.7958 67.5281 42.0229 68.9668 39.905C70.63 37.4612 71.4974 34.6342 71.4974 31.7208C71.4974 23.3162 64.2221 16.4833 55.2735 16.4833H44.3249V31.7208H50.9573V22.7125H55.2735C60.559 22.7125 64.8649 26.7567 64.8649 31.7208C64.8649 33.4458 64.3446 35.1133 63.365 36.5508C62.5079 37.8062 61.3345 38.8508 59.9468 39.5792C58.5284 40.3267 56.9061 40.7196 55.2633 40.7196H39.7944C36.9374 40.7196 34.1314 41.4287 31.6723 42.7608C29.4173 43.9875 27.4786 45.7317 26.0807 47.8017C24.4379 50.2358 23.5706 53.0533 23.5706 55.9475C23.5706 64.3521 30.8458 71.185 39.7944 71.185L39.8149 71.2042Z"
            fill="currentcolor"
          />
        </svg>
      </div>
      
      <h3>{ title }</h3>

      <p className={styles.diff_metrics_wrapper}>

        <span className={styles.metric_item} >

          <span className={styles.number_row} >

            <span className={styles.pre_num} ref={firstPreNum} dangerouslySetInnerHTML={{ __html: metrics[0].beforeNum }} >
            </span>

            <span className={styles.num} ref={firstNum} dangerouslySetInnerHTML={{ __html: metrics[0].num.toString() }}>
            </span>

            <span className={styles.post_num} ref={firstPostNum} dangerouslySetInnerHTML={{ __html: metrics[0].afterNum }} >
            </span>

          </span>

          <span className={styles.metric_desc} ref={firstDesc} >
            {
              metrics[0].desc
            }
          </span>
        </span>

      </p>


      <div className={styles.diff_card_hover_overlay} ref={cardOverlayRef}  >
        
        <div className={styles.diff_card_hover_card_container} >

          <div className={styles.card_content} >

            <p ref={cardDescRef}>{desc}</p>

          </div>
      
        </div>
    
      </div>


      <button className={styles.card_desc_trigger} 
        onClick={toggleCardDescription} 
      >

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" ref={openDescIcon} />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" ref={closeDescIcon} />
        </svg>

      </button>


    </div>
  )
}

interface DiffScrollAnimationSceneProps {
  diffWrapper: MutableRefObject<HTMLDivElement | null>;
  diffSectionRef: MutableRefObject<HTMLElement | null>;
}

const useDiffScrollAnimationScene = (
  {
    diffWrapper,
    diffSectionRef,
  }: DiffScrollAnimationSceneProps
) => {

  const diffCardElements     = useRef<Element[]>([])
  const cardPositionsDetails = useRef<any[]>([])

  const gsapCtx = useRef<any>(null)

  // BUILD THE SCROLLTRIGGER ON LOAD COMPLETE
  useIsomorphicLayoutEffect(() => {

    let gsapCtx: any;

    if ( !diffCardElements.current.length ) 
      diffCardElements.current = Array.from( document.querySelectorAll('.diff_card_box_item') )
    
    buildAwardsStickyAnimation(gsapCtx)
    
    return () => {
      if ( gsapCtx && gsapCtx.revert ) gsapCtx.revert()
    }

  }, [])

  const buildAwardsStickyAnimation = (ctx: any) => {

    ctx = gsapCtx.current =  gsap.context((self) => {

      if ( !diffSectionRef.current || !diffWrapper.current ) return

      // Set initial positioning and perspective for cards
      diffCardElements.current.forEach( (diffCard) => {

        Array.from(diffCard.children).forEach( (CardItem,idx) => {
  
          const limitedIdx = Math.min(idx, 10)
  
          const cardPositionProps = {
            yPercent: (limitedIdx * -10) - 5,
            scale: 1 - ( limitedIdx * 0.1 ),
            translateZ: limitedIdx * -15,
          }
  
          cardPositionsDetails.current.push(cardPositionProps)
  
          gsap.set(CardItem, {
            ...cardPositionProps,
            transformOrigin:"center center",
          })

        })

      })

      const slideToNextDiff = ( current:number, next: number ) => {

        
        diffCardElements.current.forEach( diffCard => {
          const allCards =  Array.from(diffCard.children)

          const currentCard = allCards[current]
          const nextCard    = allCards[next]

          // Hide current Card
          gsap.set(currentCard, { opacity: 0, pointerEvents: 'none' })
  
          // Reveil Next Card
          gsap.to(nextCard, {
            yPercent: -5,
            translateZ: 0,
            scale: 1,
            overwrite: true,
            ease: 'expo.out',
            duration: 1
          })
  
          // Update rest of the cards position
          // const rest = allCards.slice(next + 1)
          // updateAllCardsPosition(rest)

        })

      }

      const slideToPrevDiff = ( current:number, prev: number ) => {

        diffCardElements.current.forEach( diffCard => {
          const allCards =  Array.from(diffCard.children)

          const prevCard    = allCards[prev]
  
          // Update rest of the cards position
          const rest = allCards.slice(current)
          updateAllCardsPosition(rest)
  
          // Reveil Previous Card
          gsap.set(prevCard, { opacity: 1, overwrite: true })
          gsap.fromTo(prevCard,{
            yPercent: 10,
            scale: 0.9
          }, {
            yPercent: -5,
            scale: 1,
            pointerEvents: 'all',
            overwrite: true,
            ease: 'expo.out',
            duration: 0.7
          })
        })
        
      }

      const updateAllCardsPosition = ( cards: Element[] ) => {

        cards.forEach( (card, idx) => {

          const newPositionDetails = cardPositionsDetails.current[idx + 1]

          gsap.to(card, {
            ...newPositionDetails,
            ease: 'expo.out',
            duration: 1
          })
        })
      }

      self.add("slideToNextDiff",slideToNextDiff)
      self.add("slideToPrevDiff",slideToPrevDiff)

    }, diffSectionRef)

  }

  return gsapCtx

}

const nextSlideSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>

const prevSlideSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>