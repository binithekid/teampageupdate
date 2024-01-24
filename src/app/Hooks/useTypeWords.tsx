"use client"

import { MutableRefObject, useContext, useRef } from "react"
import AppContext from "../Context/AppContext"
import { ContextTypes } from "../Types"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

type ElementTypes = 
  MutableRefObject<HTMLAnchorElement | HTMLButtonElement | HTMLParagraphElement | HTMLSpanElement | HTMLHeadingElement | null>

interface useTypeWordsProps {
  el: ElementTypes,
  words: string | string[]
}

export default function useTypeWords({ el, words }: useTypeWordsProps) {

  const { loadingScene } = useContext<ContextTypes>(AppContext)

  const TO = useRef<any>(0)

  useIsomorphicLayoutEffect(() => {

    if ( loadingScene ) return
    if ( !Array.isArray(words) ) {
      if ( el.current ) el.current.innerText = words
      return
    }

    typingEffect()

    return () => {
      clearTimeout(TO.current)
    }
  },[loadingScene])

  function typingEffect() {

    if ( !el.current ) return

    let index = 0;
    let letter = '';
  
    function type() {
      if ( !el.current ) return

      if (letter.length === words[index].length) {
        TO.current = setTimeout(remove, 1100);
        return;
      }
      el.current.innerHTML += words[index][letter.length];
      letter = words[index].substring(0, letter.length + 1);
      TO.current = setTimeout(type, 20);
    }
  
    function remove() {
      if ( !el.current ) return

      if (letter.length === 0) {
        index = (index + 1) % words.length;
        TO.current = setTimeout(type, 200);
        return;
      }
      el.current.innerHTML = words[index].substring(0, letter.length - 1);
      letter = words[index].substring(0, letter.length - 1);
      TO.current = setTimeout(remove, 20);
    }
  
    type();
  }

  return null
}