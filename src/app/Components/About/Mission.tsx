"use client"

import { gsap } from "gsap";
import useIsomorphicLayoutEffect from "../../Hooks/useIsomorphicLayoutEffect";
import { useContext, useRef } from "react";

import styles from "../../Styles/modules/About/Mission.module.scss"
import { ScrollTrigger } from "gsap/all";
import { ContextTypes } from "../../Types";
import AppContext from "../../Context/AppContext";
import Image from "next/image";

const MissionsData = [
  {
    title: "revolutionise",
    content: `the digital landscape by investing in internet infrastructure while promoting sustainability, bridging the digital divide, and delivering superior risk-adjusted returns.`
  },
  {
    title: "promote",
    content: `sustainable connectivity and play a vital role in shaping the future of digital infrastructure, ensuring its availability and accessibility for generations to come.`
  },
  {
    title: "bridge",
    content: `the gap between underserved communities and technological advancements, fostering inclusivity and empowering individuals and businesses around the world.`
  },
  {
    title: "become",
    content: `become Europe’s leading pure-play digital infrastructure specialist investing across the value chain.`
  },
  {
    title: "drive",
    content: `positive change by directing capital towards projects and businesses that enhance local and global connectivity and facilitate the digital transformation of societies.`
  },
  {
    title: "create",
    content: `lasting impact, forging a path towards a connected, sustainable, and equitable digital future.`
  },
]

export const Mission = () => {

  const { loadingScene }  = useContext<ContextTypes>(AppContext)

  const missionSectionRef = useRef<HTMLElement>(null)
  const missionsWrapperRef = useRef<HTMLDivElement>(null)

  const progressBulletRef = useRef<HTMLDivElement>(null)
  // const progressLeftLineRef = useRef<HTMLDivElement>(null)
  const progressMidLineRef = useRef<HTMLDivElement>(null)
  // const progressRightLineRef = useRef<HTMLDivElement>(null)

  const activeMissionIdx = useRef(0)

  useIsomorphicLayoutEffect(() => {
    
    if ( loadingScene ) return

    let GsapContext: any;

    const TL = setTimeout( () => MissionScene(GsapContext), 0)

    return () => {
      if( GsapContext ) GsapContext.revert()
      clearTimeout(TL)
    }
  }, [loadingScene])

  const MissionScene = (gsapCtx: any) => {
    gsapCtx = gsap.context(() => {
      if ( !missionsWrapperRef.current || !missionSectionRef.current ) return

      const allMissionItems = Array.from(missionsWrapperRef.current.children)
      
      const lastMissionHeight = allMissionItems[allMissionItems.length - 1].clientHeight
      const sectionHeight = missionsWrapperRef.current.scrollHeight + (window.innerHeight ) - lastMissionHeight
      gsap.set(missionSectionRef.current, {
         height: `${sectionHeight}px`
      })

      const progressPart = 1 / (allMissionItems.length - 1)

      // Set progress Bullet Point Position
      const { left: center } = allMissionItems[0]?.querySelector(".mid_line")?.getBoundingClientRect() as any
      const { left, right } = missionsWrapperRef.current.getBoundingClientRect() as any
      const containerPaddingLeft = Number(getComputedStyle(missionSectionRef.current).paddingRight.replace("px",""))

      gsap.set([progressBulletRef.current,progressMidLineRef.current], {
      left: `${center - containerPaddingLeft }px`,
        right: "auto"
      })
      // gsap.set(progressLeftLineRef.current, {
      // left: `${left}px`,
      //   right: "auto"
      // })
      // gsap.set(progressRightLineRef.current, {
      // left: `${right}px`,
      //   right: "auto"
      // })

      const StartTrigger = `top top+=${window.innerHeight * 0.4}px`
      const EndTrigger = `bottom top+=${(window.innerHeight * 0.4) + (lastMissionHeight) * 0.9 }px`

      ScrollTrigger.create({
        trigger: missionsWrapperRef.current,
        start: StartTrigger,
        end: EndTrigger,
        invalidateOnRefresh: true,

        // markers: true,
        onUpdate: ({ progress }) => {

          const currentProgress = progress > 0.95 ? allMissionItems.length - 1 : Math.floor(progress / progressPart)
          const activeIdx = activeMissionIdx.current

          if ( currentProgress !== activeMissionIdx.current ) {

            changeActiveMission(activeIdx,currentProgress)

            activeMissionIdx.current = currentProgress
          }
        },
        // onLeave: () => {
        //   if ( !progressMidLineRef.current ) return
        //   gsap.to(progressMidLineRef.current, {
        //     alpha: 0,
        //     ...easeDuration
        //   })
        //   // gsap.to([progressMidLineRef.current,progressLeftLineRef.current,progressRightLineRef.current], {
        //   //   alpha: 0,
        //   //   ...easeDuration
        //   // })
        // },
        // onEnterBack: () => {
        //   if ( !progressMidLineRef.current ) return
        //   gsap.to(progressMidLineRef.current, {
        //     alpha: 1,
        //     ...easeDuration
        //   })
        //   // gsap.to([progressMidLineRef.current,progressLeftLineRef.current,progressRightLineRef.current], {
        //   //   alpha: 1,
        //   //   ...easeDuration
        //   // })
        // }
      })

      const easeDuration = {
        ease: "power2.out",
        duration: 0.3
      }

      // Prepare all items for change animations
      const allTitleHeading = allMissionItems.map( (missionItem: any) => missionItem.querySelector("h4") )
      const allWeWillSpan = allMissionItems.map( (missionItem: any) => missionItem.querySelector("span.we_will") )
      
      gsap.set(allMissionItems, { alpha: 0.5 })
      gsap.set(allWeWillSpan, { xPercent: -10, alpha: 0 })
      
      // set initial mission item active
      gsap.to(allMissionItems[0], {
        alpha: 1,
        ...easeDuration
      })
      if ( allTitleHeading[0] ) gsap.to(allTitleHeading[0], {
        color: "var(--light-blue)",
        ...easeDuration
      })
      if ( allWeWillSpan[0] ) gsap.to(allWeWillSpan[0], {
        alpha: 1,
        xPercent: 0,
        ...easeDuration
      })


      const changeActiveMission = ( currentIdx: number, nextIdx: number ) => {

        const lastTitleHeading = allTitleHeading[currentIdx]
        const lastWeWillSpan   = allWeWillSpan[currentIdx]

        const nextTitleHeading = allTitleHeading[nextIdx]
        const nextWeWillSpan   = allWeWillSpan[nextIdx]

        // set previous mission to inactive
        gsap.to(allMissionItems[currentIdx], {
          alpha: 0.5,
          ...easeDuration
        })
        if ( lastTitleHeading ) gsap.set(lastTitleHeading, {
          color: "var(--dark-blue)"
        })
        if ( lastWeWillSpan ) gsap.to(lastWeWillSpan, {
          alpha: 0,
          xPercent: -10,
          ...easeDuration
        })

        // set current mission to active
        gsap.to(allMissionItems[nextIdx], {
          alpha: 1,
          ...easeDuration,
          
        })
        if ( nextTitleHeading ) gsap.set(nextTitleHeading, {
          color: "var(--light-blue)"
        })
        if ( nextWeWillSpan ) gsap.to(nextWeWillSpan, {
          alpha: 1,
          xPercent: 0,
          ...easeDuration
        })

      }

    }, missionSectionRef)
  }
  return (
    <section ref={missionSectionRef} className={styles.missions_section} >

      {/* <div className={styles.white_space} ></div> */}

      <div className={styles.missions_sticky_container} >

        <div className={styles.heading_container} >
          <h4>Our mission</h4>
          <div className={styles.fixed_image_container} >
            <Image src="/Missions.jpeg" alt="Our Mission" fill
              sizes="100vw"
            />
          </div>
        </div>

        <div className={styles.fixed_bullet_point} ref={progressBulletRef} ></div>

        {/* <div className={styles.vertical_line} ref={progressLeftLineRef} ></div> */}
        <div className={styles.vertical_line} ref={progressMidLineRef} ></div>
        {/* <div className={styles.vertical_line} ref={progressRightLineRef} ></div> */}

      </div>

      <div className={styles.missions_wrapper} ref={missionsWrapperRef} >

          {
            MissionsData.map( ({ title, content }) =>
              <div className={styles.mission_item_container} key={title} >

                <div className={`left_col ${styles.mission_left_part}`} >
                  <span className={`we_will ${styles.we_will}`} >We will</span>
                  <h4>
                    { title }
                  </h4>
                </div>

                <div className={`mid_line ${styles.mid_line}`} ></div>

                <div className={styles.mission_right_part} >
                  <p>{content}</p>
                </div>

              </div>
            )
          }

      </div>

    </section>
  )
}
