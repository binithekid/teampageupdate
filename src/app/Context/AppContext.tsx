"use client"

import { createContext } from 'react'
import { ContextTypes } from '../Types'


export const initialValue: ContextTypes = {
  smoothScroller: null,
  cursor: null,
  deviceSize: 0,
  loadingScene: true,
  pageTransitionTL: null,
  setCursor: () => {},
  finishLoading: () => {},
  setSmoothScroller: () => {},
  changeDeviceSize: () => {},
  setPageTransitionTL: () => {},
}

const AppContext = createContext<ContextTypes>(initialValue)

export default AppContext