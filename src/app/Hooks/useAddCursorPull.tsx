"use client"

import { MutableRefObject, useContext, useEffect, useRef } from 'react'
import AppContext from '../Context/AppContext';
import { ContextTypes } from '../Types';

// type ElementTypes = MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>

export default function useAddCursorPull( pullElement: any, 
  options: null | {} = null, ref = [] ) {

  const { cursor } = useContext<ContextTypes>(AppContext)

  const isPullEnabled = useRef(false)

  useEffect( () => {
    
    if( cursor && cursor.addPullElement && !isPullEnabled.current && pullElement.current ) {
      setTimeout( () => cursor.addPullElement(pullElement.current, options), 0 )
      isPullEnabled.current = true
    }
    
  }, [cursor,...ref])

  return ( null )
}
