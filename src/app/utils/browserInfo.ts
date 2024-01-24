"use client"

export const isTouchScreendevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 ;      
};

export const isBrowserSafari = (): boolean => /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const isScrollProxyNeeded = (): boolean => {
  if ( isBrowserSafari() || isTouchScreendevice() || window.innerWidth <= 768 ) return true
  return false
}

export const hasMouse = (): boolean => {
  if ( window && matchMedia('(pointer:fine)').matches ) return true
  return false
}