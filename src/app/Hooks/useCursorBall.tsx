"use client"

import { useContext, useEffect, useRef } from 'react'
import AppContext from '../Context/AppContext';
import { ContextTypes } from '../Types';

import Cursor from '../utils/Cursor'
import { hasMouse } from './../utils/browserInfo';

export default function useCursorBall() {

  const { setCursor } = useContext<ContextTypes>(AppContext)

  const cursorBall: any = useRef(null)

  useEffect(() => {
    
    if( !cursorBall.current && hasMouse() ) {
      const initCursor = new Cursor({
        container: '.cursor_container'
      })
      cursorBall.current = initCursor
      setCursor(initCursor)
    }
  
    return () => {
      
      if( cursorBall.current && cursorBall.current.body ) {
        cursorBall.current.destroy()
        cursorBall.current = null
        setCursor({})
      }
    }
    
  }, [])
  
  return (null)
}
