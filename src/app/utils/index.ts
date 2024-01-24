"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/all";

type CalcPosReturnTypes = {
  xOffset: number;
  yOffset: number;
  rotationXDeg: number;
  rotationYDeg: number;
};
export const calcPosValues = (e: any): CalcPosReturnTypes => {
  const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

  const centerPosX = left + width / 2;
  const centerPosY = top + height / 2;

  const xRelativePosition = (e.clientX - centerPosX) / (width / 2);
  const yRelativePosition = (e.clientY - centerPosY) / (width / 2);

  const xOffset = xRelativePosition * 20;
  const yOffset = yRelativePosition * 15;

  const rotationXDeg = xRelativePosition * 10;
  const rotationYDeg = yRelativePosition * 7;

  return {
    xOffset,
    yOffset,
    rotationXDeg: rotationYDeg,
    rotationYDeg: rotationXDeg,
  };
};

export function shortenText(text: string, maxLength = 200) {
  const splitted = text.split(" ");
  let shortedStr = "";

  while (shortedStr.length < maxLength && splitted.length) {
    shortedStr += splitted.shift() + " ";
  }

  return shortedStr.slice(0, -1);
}

export function ElementSeparator(parent: HTMLElement, childTag: string) {
  if (!parent) return [];

  const separetedChars = parent?.innerText.split("");

  let charsElements = "";

  separetedChars?.forEach((spanContent) => {
    let content = "";
    let styles = "";
    if (spanContent == " ") {
      content = "-";
      styles = `style="opacity: 0; pointer-events: none"`;
    } else content = spanContent;

    charsElements += `<${childTag} ${styles}>${content}</${childTag}>`;
  });

  return charsElements;
}

export function horizontalLoop(items: any, config?: any) {
  items = gsap.utils.toArray(items);
  config = {
    repeat: -1,
    paused: false,
    ...config,
  };

  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },

      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: any = [],
    widths: any = [],
    xPercents: any = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap =
      config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as any
      ));
      xPercents[i] = snap(
        (Number(gsap.getProperty(el, "x", "px")) / w) * 100 +
          Number(gsap.getProperty(el, "xPercent"))
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      Number(gsap.getProperty(items[length - 1], "scaleX")) +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  // function toIndex(index: any, vars: any) {
  // 	vars = vars || {};
  // 	(Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
  // 	let newIndex = gsap.utils.wrap(0, length, index),
  // 		time = times[newIndex];
  // 	if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
  // 		vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
  // 		time += tl.duration() * (index > curIndex ? 1 : -1);
  // 	}
  // 	curIndex = newIndex;
  // 	vars.overwrite = true;
  // 	return tl.tweenTo(time, vars);
  // }
  // tl.next = (vars: any) => toIndex(curIndex+1, vars);
  // tl.previous = (vars: any) => toIndex(curIndex-1, vars);
  // tl.current = () => curIndex;
  // tl.toIndex = (index: any, vars: any) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    if (tl.vars && tl.vars.onReverseComplete) tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

export function horizontalSlider(items: any, config: any) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let onChange = config.onChange,
    lastIndex = 0,
    tl = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        function () {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        },
      paused: config.paused,
      defaults: config.defaults || { ease: "none" },
      onReverseComplete: (): any =>
        tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX: number = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    spaceBefore: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    indexIsDirty = false,
    center = config.center,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap =
      config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    timeOffset = 0,
    container =
      center === true
        ? items[0].parentNode
        : gsap.utils.toArray(center)[0] || items[0].parentNode,
    totalWidth: number,
    getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
      (parseFloat(config.paddingRight) || 0),
    populateWidths = () => {
      let b1 = container.getBoundingClientRect(),
        b2;
      items.forEach((el: any, i: number) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) *
            100 +
            (gsap.getProperty(el, "xPercent") as number)
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i) => xPercents[i],
      });
      totalWidth = getTotalWidth();
    },
    timeWrap: any,
    populateOffsets = () => {
      timeOffset = center
        ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
        : 0;
      center &&
        times.forEach((t, i) => {
          times[i] = timeWrap(
            tl.labels["label" + i] +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset
          );
        });
    },
    getClosest = (values: [], value: number, wrap: number) => {
      let i = values.length,
        closest = 1e10,
        index = 0,
        d;
      while (i--) {
        d = Math.abs(values[i] - value);
        if (d > wrap / 2) {
          d = wrap - d;
        }
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    },
    populateTimeline = () => {
      let i, item, curX, distanceToStart, distanceToLoop;
      tl.clear();
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
        distanceToLoop =
          distanceToStart +
          widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    },
    refresh = (deep?: any) => {
      let progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      deep && populateTimeline();
      populateOffsets();
      deep && tl.draggable
        ? tl.time(times[curIndex], true)
        : tl.progress(progress, true);
    },
    proxy: any;
  gsap.set(items, { x: 0 });
  populateWidths();
  populateTimeline();
  populateOffsets();
  window.addEventListener("resize", () => refresh(true));
  function toIndex(index: number, vars: any) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex && index !== curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    if (time < 0 || time > tl.duration()) {
      vars.modifiers = { time: timeWrap };
    }
    curIndex = newIndex;
    vars.overwrite = true;
    gsap.killTweensOf(proxy);
    return vars.duration === 0
      ? tl.time(timeWrap(time))
      : tl.tweenTo(time, vars);
  }
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.closestIndex = (setCurrent: any) => {
    let index = getClosest(times as [], tl.time(), tl.duration());
    if (setCurrent) {
      curIndex = index;
      indexIsDirty = false;
    }
    return index;
  };
  tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
  tl.next = (vars: any) => toIndex(tl.current() + 1, vars);
  tl.previous = (vars: any) => toIndex(tl.current() - 1, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed && tl.vars && tl.vars.onReverseComplete) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  if (config.draggable && typeof Draggable === "function") {
    proxy = document.createElement("div");
    let wrap = gsap.utils.wrap(0, 1),
    ratio: number,
    startProgress: number,
    draggable: any,
    dragSnap,
    lastSnap: any,
    initChangeX: any,
    align = () => {
      return tl.progress(
        wrap( startProgress + (draggable.startX - draggable.x) * ratio )
      )
    },
    syncIndex = () => tl.closestIndex(false);
    draggable = Draggable.create(proxy, {
      trigger: items[0].parentNode,
      type: "x",
      onPressInit() {
        config.onDragStart()
        let x = this.x;
        gsap.killTweensOf(tl);
        startProgress = tl.progress();
        refresh();
        ratio = window.innerWidth > 768 ? 1 / (totalWidth * 1.2) : 1 / (totalWidth * 0.7) ;
        initChangeX = startProgress / -ratio - x;
        gsap.set(proxy, { x: startProgress / -ratio });
      },
      onDrag: (): any => align(),
      onThrowUpdate: (): any => align(),
      overshootTolerance: 0,
      inertia: false,
      snap(value) {
        //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
        if (Math.abs(startProgress / -ratio - this.x) < 10) {
          return lastSnap + initChangeX;
        }
        let time = -(value * ratio) * tl.duration(),
          wrappedTime = timeWrap(time),
          snapTime = times[getClosest(times as [], wrappedTime, tl.duration())],
          dif = snapTime - wrappedTime;
        Math.abs(dif) > tl.duration() / 2 &&
          (dif += dif < 0 ? tl.duration() : -tl.duration());
        lastSnap = (time + dif) / tl.duration() / -ratio;
        return lastSnap;
      },
      onRelease() {
        const closest = tl.closestIndex(true)
        config.onDragRelease( closest )
        // tl.toIndex( tl.closestIndex(true), { duration: 0.5,
        //   ease: "power2.out" } )
        // syncIndex();
        draggable.isThrowing && (indexIsDirty = true);
      },
      // onThrowComplete: syncIndex,
    })[0];
    tl.draggable = draggable;
  }
  tl.closestIndex(true);
  lastIndex = curIndex;
  onChange && onChange(items[curIndex], curIndex);
  return tl;
}
