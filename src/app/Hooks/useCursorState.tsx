"use client"

import { useContext, useRef } from 'react'

import AppContext from '../Context/AppContext';
import { ContextTypes } from '../Types';

export default function useCursorState( states: string ) {

  const { cursor } = useContext<ContextTypes>(AppContext)

  const isCursorStateEnable = useRef(false)

  const toggleCursorMode = () => {

    if( !cursor || !cursor.setState ) return

    if( !isCursorStateEnable.current ) {
      cursor.setState(states)
      isCursorStateEnable.current = true
    } else {
      cursor.removeState(states)
      isCursorStateEnable.current = false
    }

  }

  return ( toggleCursorMode )
}
