"use client"

import React, { ReactNode, useReducer } from "react";
import AppContext, { initialValue } from "./AppContext";
import { appReducer } from "./AppReducer";

interface Props {
  children: ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialValue);

  const ContextValue = {
    ...state,
    finishLoading: () => {
      dispatch({
        type: 'FINISH_LOADING',
      })
    },
    setSmoothScroller: (smoothScrollInstance: any) => {
      dispatch({
        type: 'SMOOTH_SCROLL_INIT',
        payload: smoothScrollInstance
      })
    },
    changeDeviceSize: ( newWindowSize: number ) => {
      dispatch({
        type: 'CHANGE_WINDOW_SIZE',
        payload: newWindowSize
      })
    },
    setCursor: (newCursor: any) => {
      dispatch({
        type: 'CURSOR_INIT',
        payload: newCursor
      })
    },
    setPageTransitionTL: ( TL: any ) => {
      dispatch({
        type: 'SET_PAGE_TRANSITION',
        payload: TL
      })
    }
  };
  
  return (
    <AppContext.Provider value={ContextValue}>
      {children}
    </AppContext.Provider>
  );
}