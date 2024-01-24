"use client"

import React, { useEffect, useState } from 'react'
import { NewLeadership } from './NewLeadership'
import { MobileLeadership } from "./Mobile/MobileLeadership"
import { isTouchScreendevice } from '../../utils/browserInfo'

export const TeamSection = () => {
  const [isDesktop,setIsDesktop] = useState(false)

  useEffect(() => {

    const isTouch = isTouchScreendevice()
    if ( isTouch && isDesktop ) setIsDesktop(false)
    else if ( !isTouch && !isDesktop ) setIsDesktop(true)

  })

  return isDesktop ? <NewLeadership /> : <MobileLeadership />
}
