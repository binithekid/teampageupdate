"use client"

import { MutableRefObject, useContext, useEffect, useRef } from 'react'
import AppContext from '../Context/AppContext'
import { ContextTypes } from '../Types'

type ElementTypes = MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>

export default function useAddStickyEffect( stickEl: ElementTypes, refs = [] ) {

  const { cursor } = useContext<ContextTypes>(AppContext)

  const isCursorStickyEnable = useRef(false)

  useEffect(() => {

    if( cursor && cursor.addStickyElement && !isCursorStickyEnable.current && stickEl.current ) {
      cursor.addStickyElement(stickEl.current)
    }

  }, [cursor, ...refs])
  
  return (null)
}
