// TypeScript Interface and Types

// ** Context Store Types **
export type ThemeType = 'light' | 'dark'

export interface ContextTypes {
  smoothScroller: any;
  deviceSize: number;
  loadingScene: boolean;
  cursor: any;
  pageTransitionTL: any;
  finishLoading: () => void;
  setSmoothScroller: (payload: any) => void;
  changeDeviceSize: ( payload: number ) => void;
  setCursor: (payload: any) => void;
  setPageTransitionTL: (payload: any) => void;
}

export type ReducerActionTypes = {
  type: "SMOOTH_SCROLL_INIT" | "CHANGE_WINDOW_SIZE" | "FINISH_LOADING" | "CURSOR_INIT" | "SET_PAGE_TRANSITION"
  payload?: any
}

// ** Page Data Types **
// Site General Settings Type
export type SiteSettingTypes = {
  smoothScroller?: 0 | 1;
  cursorBall: 0 | 1;
}

// SEO Tags
export type SEOInformationType = {
  Title: string;
  Desc: string;
  Img?: string;
  Url?: string;
  Author?: string;
  TwitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  TwitterUsername?: string;
}