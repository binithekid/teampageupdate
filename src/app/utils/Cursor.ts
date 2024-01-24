"use client"

import { gsap } from "gsap";

let DVBPullElements: any = [];
let stickyElements: any = [];

export default class DvbCursor {

  options: any;
  body: any;
  el: any;
  ball: any;
  text: any;
  isHidden: any;
  hideCursorBall: any;
  showCursorBall: any;
  updateOnMouseMove: any;
  pointerActive: any;
  pointerDeactive: any;
  setPointerState: any;
  removePointerState: any;
  addCustomState: any;
  removeCustomState: any;
  setCursorText: any;
  removeCursorText: any;
  enableStick: any;
  disableStick: any;
  resetMousemoveOnResize: any
  stick: any
  pos: any;
  visible: any;
  visibleInt: any;

  constructor(options : any ) {
    
    this.options = {
      container: "body",
      speed: 0.15,
      ...options,
    };

    this.body = this.options.container === "body" ? document.body : document.querySelector(this.options.container);

    if ( this.body === null ) return

    const didCursorInit = document.querySelector(".dvb-cursor");

    if (didCursorInit) {
      this.el = didCursorInit;
      this.ball = document.querySelector(".dvb-cursor-ball");
      this.text = document.querySelector(".dvb-cursor-text");
      this.isHidden = false;

      this.removeState("-active");
      this.removeState("-pointer");
      this.removeText();

      this.init();
    } else {
      document.createElement("div");

      // Cursor main div
      const cursorEl = document.createElement("div");
      cursorEl.classList.add("dvb-cursor");
      this.el = cursorEl;

      // Cursor ball
      const cursorBallEl = document.createElement("div");
      cursorBallEl.classList.add("dvb-cursor-ball");
      this.ball = cursorBallEl;

      const cursorText = document.createElement("div");
      cursorText.classList.add("dvb-cursor-text");
      this.text = cursorText;
      this.isHidden = false;

      this.init();
    }
  }

  init() {
    this.el.append(this.text);
    this.el.append(this.ball);
    this.body.append(this.el);
    this.bind();
    this.moveBall(-window.innerWidth, -window.innerHeight, 0);

  }

  addPullElement(el: any, options = null) {

    if ( !el || !el.addEventListener ) return
    
    // const Scrollbar = this.options.scroller;
    let newPullElement;

    if (!options) {
      newPullElement = new DvbPull(el);
    } else {
      newPullElement = new DvbPull(el, options);
    }

    DVBPullElements.push(newPullElement);
  }

  bind() {
    this.bindEventListeners();

    // Hide cursor ball on mouse leaving the container
    this.body.addEventListener("mouseleave", this.hideCursorBall);

    // Show cursor ball on mouse leaving the container
    this.body.addEventListener("mouseenter", this.showCursorBall);

    // update cursor ball position on mouse move
    this.body.addEventListener("mousemove", this.updateOnMouseMove);

    // Reduce cursor ball size to indicate mouse left click down
    this.body.addEventListener("mousedown", this.pointerActive);

    // Change the cursor ball size back to normal after mouse left click up
    this.body.addEventListener("mouseup", this.pointerDeactive);

    // Change the cursor ball size back to normal after drag end
    this.body.addEventListener("dragend", this.pointerDeactive);

    // Get all the elements we need for different cursor modes
    const {
      pointerStateElements,
      iframes,
      dataCursorElements,
      cursorTextElements,
    } = this.getAllPointerElements();

    // Set cursor to pointer when hovers on links, inputs, textarea and buttons
    pointerStateElements.forEach((el) => {
      el.addEventListener("mouseover", this.setPointerState);
      el.addEventListener("mouseleave", this.removePointerState);
    });

    // Hide cursor ball when an Iframe is hovered
    iframes.forEach((el) => {
      el.addEventListener("mouseenter", this.showCursorBall);
      el.addEventListener("mouseleave", this.hideCursorBall);
    });

    // Get elements with data-cursor and apply the classes or state to cursor ball
    dataCursorElements.forEach((el) => {
      el.addEventListener("mouseenter", this.addCustomState);
      el.addEventListener("mouseleave", this.removeCustomState);
    });

    // Add cursor text to elements with cursor-text
    cursorTextElements.forEach((el) => {
      el.addEventListener("mouseenter", this.setCursorText);
      el.addEventListener("mouseleave", this.removeCursorText);
    });

  }

  addStickyElement(el: any) {
    if (stickyElements.includes(el)) return;

    el.addEventListener("mouseenter", this.enableStick);
    el.addEventListener("mouseleave", this.disableStick);

    stickyElements.push(el);
  }
  bindEventListeners() {

    this.hideCursorBall = function () {
      this.hide();
    }.bind(this);

    this.showCursorBall = function () {
      this.show();
    }.bind(this);

    this.updateOnMouseMove = function (e: any) {
      const x = this.stick
        ? this.stick.x - (this.stick.x - e.clientX) * 0.15
        : e.clientX;
      const y = this.stick
        ? this.stick.y - (this.stick.y - e.clientY) * 0.15
        : e.clientY;

      if (!this.pos || !this.pos.x === undefined) {
        this.pos = {
          x,
          y,
        };
      } else {

        const oldX = this.pos.x;
        const oldY = this.pos.y;

        this.lastTimeUpdate = Date.now();

        this.pos = {
          x: this.stick
            ? this.stick.x - (this.stick.x - e.clientX) * 0.15
            : e.clientX,
          y: this.stick
            ? this.stick.y - (this.stick.y - e.clientY) * 0.15
            : e.clientY,
          oldX,
          oldY,
        }

      }

      this.update();
    }.bind(this);

    this.pointerActive = function () {
      this.setState("-active");
    }.bind(this);

    this.pointerDeactive = function () {
      this.removeState("-active");
    }.bind(this);

    this.setPointerState = function () {
      this.setState("-pointer");
    }.bind(this);

    this.removePointerState = function () {
      this.removeState("-pointer");
    }.bind(this);

    this.addCustomState = function (e: any) {
      this.setState(e.target.dataset.cursor);
    };

    this.removeCustomState = function (e: any) {
      this.removeState(e.target.dataset.cursor);
    }.bind(this);

    this.setCursorText = function (e: any) {
      this.setText(e.target.dataset.cursorText);
    }.bind(this);

    this.removeCursorText = function (e: any) {
      this.removeText(e.target.dataset.cursorText);
    }.bind(this);

    this.enableStick = function (e: any) {
      e.target.dataset.cursorStick
        ? this.setStick(e.target, e.target.dataset.cursorStick)
        : this.setStick(e.target);
    }.bind(this);

    this.disableStick = function (e: any) {
      this.removeStick(e.target, e.target.dataset.cursorStick);
    }.bind(this);

    this.resetMousemoveOnResize = function () {
      this.body.removeEventListener("mousemove", this.updateOnMouseMove);
      this.body.addEventListener("mousemove", this.updateOnMouseMove);
    }.bind(this);
  }

  removeAllEventListeners() {
    this.body.removeEventListener("mouseleave", this.hideCursorBall);
    this.body.removeEventListener("mouseenter", this.showCursorBall);
    this.body.removeEventListener("mouseover", this.showCursorBall);
    this.body.removeEventListener("mousemove", this.updateOnMouseMove);
    this.body.removeEventListener("mousedown", this.pointerActive);
    this.body.removeEventListener("mouseup", this.pointerDeactive);
    this.body.removeEventListener("dragend", this.pointerDeactive);

    // Get all the elements we need for different cursor modes
    const {
      pointerStateElements,
      iframes,
      dataCursorElements,
      cursorTextElements,
    } = this.getAllPointerElements();

    pointerStateElements.forEach((el) => {
      el.removeEventListener("mouseenter", this.setPointerState);
      el.removeEventListener("mouseleave", this.removePointerState);
    });

    iframes.forEach((el) => {
      el.removeEventListener("mouseenter", this.showCursorBall);
      el.removeEventListener("mouseleave", this.hideCursorBall);
    });

    // Get elements with data-cursor and apply the classes or state to cursor ball
    dataCursorElements.forEach((el) => {
      el.removeEventListener("mouseenter", this.addCustomState);
      el.removeEventListener("mouseleave", this.removeCustomState);
    });

    cursorTextElements.forEach((el) => {
      el.removeEventListener("mouseenter", this.setCursorText);
      el.removeEventListener("mouseleave", this.removeCursorText);
    });

    stickyElements.forEach((el: any) => {
      el.removeEventListener("mouseenter", this.enableStick);
      el.removeEventListener("mouseleave", this.disableStick);
    });
    stickyElements = [];

  }

  addNewlyRenderedSection(newSection: any, q: any) {
    // Get all the elements we need for different cursor modes
    const {
      pointerStateElements,
      iframes,
      dataCursorElements,
      cursorTextElements,
      cursorStickElements,
    } = this.getAllPointerElements(newSection);

    // Set cursor to pointer when hovers on links, inputs, textarea and buttons
    pointerStateElements.forEach((el) => {
      el.addEventListener("mouseover", this.setPointerState);
      el.addEventListener("mouseleave", this.removePointerState);
    });

    // Hide cursor ball when an Iframe is hovered
    iframes.forEach((el) => {
      el.addEventListener("mouseenter", this.showCursorBall);
      el.addEventListener("mouseleave", this.hideCursorBall);
    });

    // Get elements with data-cursor and apply the classes or state to cursor ball
    dataCursorElements.forEach((el) => {
      el.addEventListener("mouseenter", this.addCustomState);
      el.addEventListener("mouseleave", this.removeCustomState);
    });

    // Add cursor text to elements with cursor-text
    cursorTextElements.forEach((el) => {
      el.addEventListener("mouseenter", this.setCursorText);
      el.addEventListener("mouseleave", this.removeCursorText);
    });

    // Add cursor stick for elements with cursor-stick
    cursorStickElements.forEach((el) => {
      el.addEventListener("mouseenter", this.enableStick);
      el.addEventListener("mouseleave", this.disableStick);
    });
  }

  setState(state: any) {
    if (state.includes(" ")) this.el.classList.add(...state.split(" "));
    else this.el.classList.add(state);
  }

  removeState(state: any) {
    if (state.includes(" ")) this.el.classList.remove(...state.split(" "));
    else this.el.classList.remove(state);
  }

  toggleState(state: any) {
    this.el.classList.toggle(state);
  }

  setText(text: any) {
    this.text.innerHTML = text;
    this.el.classList.add("-text");
  }

  removeText() {
    this.el.classList.remove("-text");
  }

  setStick(el: any, childTarget = null) {
    if (childTarget) {
      const target = el.querySelector(childTarget);
      const targetBound = target.getBoundingClientRect();
      const bound = target.parentElement.getBoundingClientRect();
      this.stick = {
        y: bound.top + targetBound.height / 2 + (targetBound.top - bound.top),
        x: bound.left + targetBound.width / 2 + (targetBound.left - bound.left),
      };
    } else {
      const targetBound = el.getBoundingClientRect();

      this.stick = {
        y: targetBound.top + targetBound.height / 2,
        x: targetBound.left + targetBound.width / 2,
      };
    }

    this.moveBall(this.stick.x, this.stick.y, 5);
  }

  removeStick() {
    this.stick = false;
  }

  update() {
    this.moveBall();
    this.show();
  }

  moveBall(x?: any, y?: any, duration?: any) {
    if ( this.el ) gsap.to(this.el, {
      x: x || this.pos.x,
      y: y || this.pos.y,
      force3D: true,
      overwrite: true,
      ease: this.options.ease,
      duration: this.visible ? duration || this.options.speed : 0,
    });
  }

  getAllPointerElements(newSection = null) {
    const container = newSection ? newSection : document;

    const pointerStateElements = [
      ...Array.from(container.querySelectorAll("a")),
      ...Array.from(container.querySelectorAll("input")),
      ...Array.from(container.querySelectorAll("textarea")),
      ...Array.from(container.querySelectorAll("button")),
    ];
    const iframes = Array.from(container.querySelectorAll("iframe"));
    const dataCursorElements = Array.from(
      container.querySelectorAll("[data-cursor]")
    );
    const cursorTextElements = Array.from(
      container.querySelectorAll("[data-cursor-text]")
    );
    const cursorStickElements = Array.from(
      container.querySelectorAll("[data-cursor-stick]")
    );

    return {
      pointerStateElements,
      iframes,
      dataCursorElements,
      cursorTextElements,
      cursorStickElements,
    };
  }

  
  show() {
    if (this.visible || this.isHidden) return;
    clearInterval(this.visibleInt);
    this.el.classList.add("-visible");
    this.visibleInt = setTimeout(() => (this.visible = true));
  }

  hide() {
    clearInterval(this.visibleInt);
    this.el.classList.remove("-visible");
    this.visibleInt = setTimeout(
      () => (this.visible = false),
      this.options.visibleTimeout
    );
  }

  destroy() {
    this.removeAllEventListeners();
    this.isHidden = true;
    this.hide();

    if (DVBPullElements.length) {
      DVBPullElements.forEach((pull: any) => pull.destroy());
      DVBPullElements = [];
    }
  }

  reset() {
    this.destroy();
    this.init();
  }
}

class DvbPull {

  el: any;
  options: any;
  y: any;
  x: any;
  width: any;
  height: any;
  onMouseEnter: any;
  onMouseMove: any;
  onMouseLeave: any;

  constructor(el: any, options = {}) {
    this.el = el;

    this.options = {
      y: 0.2,
      x: 0.2,
      s: 0.3,
      rs: 0.6,
      ...options,
    };

    this.y = 0;
    this.x = 0;
    this.width = 0;
    this.height = 0;

    this.bind();
    this.init();
  }

  bind() {

    this.onMouseEnter = function () {
      
      const { width, height, top, left } = this.el.getBoundingClientRect()

      this.y = top;
      this.x = left;

      this.width = width;
      this.height = height;

    }.bind(this);

    this.onMouseMove = function (e: any) {
      const y = (e.clientY - this.y - this.height / 2) * this.options.y;
      const x = (e.clientX - this.x - this.width / 2) * this.options.x;

      this.move(x, y, this.options.s);
    }.bind(this);

    this.onMouseLeave = function () {
      
      this.move(0, 0, this.options.rs);

    }.bind(this);
  }

  init() {
    this.el.addEventListener("mouseenter", this.onMouseEnter);
    this.el.addEventListener("mousemove", this.onMouseMove);
    this.el.addEventListener("mouseleave", this.onMouseLeave);
  }

  move(x: any, y: any, speed: any) {
    if ( this.el ) gsap.to(this.el, {
      x,
      y,
      force3D: true,
      overwrite: "auto",
      duration: speed,
    });
  }

  destroy() {
    this.el.removeEventListener("mouseenter", this.onMouseEnter);
    this.el.removeEventListener("mousemove", this.onMouseMove);
    this.el.removeEventListener("mouseleave", this.onMouseLeave);
  }
}