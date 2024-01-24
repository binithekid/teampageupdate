"use client"

import { ContextTypes, ReducerActionTypes } from "../Types";

export const appReducer = (state: ContextTypes, action: ReducerActionTypes) => {

  switch (action.type) {
    case 'FINISH_LOADING':
      return {
        ...state,
        loadingScene: false
      }
    case 'SMOOTH_SCROLL_INIT':
      return {
        ...state,
        smoothScroller: action.payload
      }
    case 'CHANGE_WINDOW_SIZE':
      if ( state.deviceSize === action.payload ) return state
      return {
        ...state,
        deviceSize: action.payload
      }
    case 'CURSOR_INIT':
      return {
        ...state,
        cursor: action.payload
      }
    case "SET_PAGE_TRANSITION":
      return {
        ...state,
        pageTransitionTL: action.payload
      }
    default:
      return state;
  }
  
}