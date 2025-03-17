class ThemeInterface {
  defaultId = undefined;
  defaultPosition = undefined;
  html = undefined; // should be one element
  style = undefined;
}

// Transition inside of here is what controls the jump to other side!
// Control bottom from here aswell
// 2nd parameter controls the fall back effect at the very beggining
// 3rd and 4th probably control speed
// Edit z-index if you notice any errors
class ToggleFancyShapeTheme extends ThemeInterface {
  defaultId = "adm-toggle";
  defaultPosition = `
    position:fixed;
    bottom:1rem;
    /*Readded a higher z-index, because the back to top button would push the dark mode button around for some reason*/
    z-index: 999; 
    transition: transform 3s cubic-bezier(0.68, -0.3, 0.27, 1.55);
  `;

  html = `<div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
    />
    <input id="darkmode-toggle" type="checkbox">
    <label for="darkmode-toggle"></label>
  </div>`;
  
  style = `
  #${this.defaultId} *,
  #${this.defaultId} *:before, 
  #${this.defaultId} *:after {
    box-sizing: border-box;
  }
  
  body {
    transition: background-color 0.5s ease-out, color 0.5s ease-out;
    background-color: var(--color-bg);
    color: var(--color-text);
  }

  #${this.defaultId} {
    --color-bg: #fff;
    --color-text: #333;
    width: 2.6rem;
    transform: translateX(calc(100vw - 4.5rem)); /* Start on right side */

    /* Lines for fade-in animation When loading*/
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.9s; /* Delay before animation starts */
  }

  /* Animation for fading in of button */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  #${this.defaultId}.darkmode {
    --color-bg: #222;
    --color-text: steelblue;
  }
  
  #${this.defaultId}.dark-mode-left {
    transform: translateX(0.25rem); /* Left side position */
  }
  
  #${this.defaultId}.dark-mode-right {
    transform: translateX(calc(100vw - 4.5rem)); /* Right side position */
  }

  @media screen and (min-width: 300px) and (max-width: 399px) {
    #${this.defaultId}.dark-mode-right {
      transform: translateX(calc(100vw - -11.7rem));
    }
  }

   @media screen and (min-width: 400px) and (max-width: 439px) {
      #${this.defaultId}.dark-mode-right {
        transform: translateX(calc(100vw - -9.1rem));
      }
    }

  @media screen and (min-width: 440px) and (max-width: 474px) {
    #${this.defaultId}.dark-mode-right {
      transform: translateX(calc(100vw - -7.1rem));
    }
  }

  @media screen and (min-width: 475px) and (max-width: 515px) {
    #${this.defaultId}.dark-mode-right {
      transform: translateX(calc(100vw - -4.5rem));
    }
  }

  @media screen and (min-width: 516px) and (max-width: 559px) {
    
    #${this.defaultId}.dark-mode-right {
      transform: translateX(calc(100vw - -2rem));
    }
  }

  @media screen and (min-width: 560px) and (max-width: 599px) {
  
    #${this.defaultId}.dark-mode-right {
      transform: translateX(calc(100vw - 0.5rem));
    }
  }

  @media screen and (min-width: 600px) and (max-width: 615px) {

    #${this.defaultId}.dark-mode-right {
      transform: translateX(calc(100vw - 3rem));
    }
  }
  
  #${this.defaultId} #darkmode-toggle {
    position: absolute;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  
  #${this.defaultId} #darkmode-toggle + label {
    position: relative;
    display: block;
    width: 2.6rem;
    height: 2rem;
    background-color: var(--color-text);
    border-radius: 2rem;
    text-indent: -100em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  }
  
  #${this.defaultId} #darkmode-toggle + label:after {
    content: "☀️";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    display: inline-block;
    font-size: 1em;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text);
    text-indent: 0;
    padding: 0rem;
    text-align: left;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--color-bg);
    border-radius: 1.5rem;
    transition: left 0.3s ease-out, transform 0.3s ease-out, width 0.2s ease-out;
    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  
  #${this.defaultId} #darkmode-toggle + label:hover:after,
  #${this.defaultId} #darkmode-toggle + label:active:after {
    width: 2rem;
  }
  
  #${this.defaultId} #darkmode-toggle:checked + label:after {
    content: "🌑";
    left: calc(100% - 0.25rem);
    transform: translateX(-100%);
    text-align: right;
  }

  @media (prefers-color-scheme: dark) {
    body { --pref:"dark"; }
  }
  @media (prefers-color-scheme: light) {
    body { --pref:"light"; }
  }
  `;
}

class ToggleButtonShape {
  toggleElm = undefined;

  constructor({ html, style, js, defaultId, defaultPosition }) {
    this.html = html;
    this.style = style;
    this.js = js;
    this.defaultId = defaultId;
    this.defaultPosition = defaultPosition;
  }

  createStyleElement() {
    const styleElm = document.createElement("style");
    styleElm.innerHTML = this.style;

    return styleElm;
  }

  createToggleElement() {
    const div = document.createElement("div");
    div.innerHTML = this.html;

    return div.firstChild;
  }

  getInputElement() {
    if (!this.toggleElm) return;

    const selector = `#${this.defaultId} input[type='checkbox']`;
    const input = this.toggleElm.querySelector(selector);

    return input;
  }

  setChangeEvent(action) {
    const input = this.getInputElement();
    input.addEventListener("change", action);
  }

  dispatchChangeEvent = () => {
    const input = this.getInputElement();
    const event = new Event("change");

    input.checked = !input.checked;
    input.dispatchEvent(event);
  };

  render() {
    const styleElm = this.createStyleElement();
    const toggleElm = this.createToggleElement();

    toggleElm.setAttribute("style", this.defaultPosition);
    toggleElm.setAttribute("id", this.defaultId);

    document.head.appendChild(styleElm);
    document.body.appendChild(toggleElm);

    this.toggleElm = toggleElm;
  }
}

class ToggleHistoryManager {
  localStorageFlag = "awesome-dark-mode-status";
  localStoragePositionFlag = "awesome-dark-mode-position";

  saveState(state) {
    localStorage.setItem(this.localStorageFlag, state);
  }

  readState() {
    return JSON.parse(localStorage.getItem(this.localStorageFlag)) || false;
  }

  savePosition(position) {
    localStorage.setItem(this.localStoragePositionFlag, position);
  }

  readPosition() {
    return localStorage.getItem(this.localStoragePositionFlag) || "right";
  }

  setPreviousState(buttonDispatchChange) {
    const isPreviousStatusChecked = this.readState();
    if (isPreviousStatusChecked) buttonDispatchChange();
  }
}

class ToggleAction {
  constructor(doubleRotatedElements) {
    this.history = new ToggleHistoryManager();

    this.rotatedElementsSelectors = [...new Set([
      "html", "img", "video",
      ...doubleRotatedElements,
    ])];
  
    this.isHue = true;
    this.cssRotateCode = `filter: invert(1)${
      this.isHue ? " hue-rotate(180deg)" : ""
    } !important`;
  }

  rotateElmColor180deg(elm) {
    const cssCode = this.cssRotateCode;
    const elmCSSRules = elm.style.cssText
      .split(";")
      .map((elm) => elm.trim())
      .filter((elm) => elm);

    // toggle css code
    elmCSSRules.includes(cssCode)
      ? elmCSSRules.splice(elmCSSRules.indexOf(cssCode), 1)
      : elmCSSRules.push(cssCode);

    elm.style.cssText = elmCSSRules.join(";");
  }

  rotateElementsColor() {
    this.rotatedElementsSelectors.forEach((selector) =>
      document
        .querySelectorAll(selector)
        .forEach((elm) => this.rotateElmColor180deg(elm))
    );
  }

  toggleButtonPosition(isChecked) {
    const toggleElm = document.getElementById('adm-toggle');
    if (!toggleElm) return;

    if (isChecked) {
      // Dark mode - button on left side
      toggleElm.classList.remove('dark-mode-right');
      toggleElm.classList.add('dark-mode-left');
      this.history.savePosition('left');
    } else {
      // Light mode - button on right side
      toggleElm.classList.remove('dark-mode-left');
      toggleElm.classList.add('dark-mode-right');
      this.history.savePosition('right');
    }
  }

  onChangeEvent = (e) => {
    this.rotateElementsColor();
    this.history.saveState(e.target.checked);
    this.toggleButtonPosition(e.target.checked);
  };
}

class AutoDarkMode {
  constructor(themeInstance, doubleRotatedElements) {
    const buttonTheme = themeInstance || new ToggleFancyShapeTheme();

    const button = new ToggleButtonShape(buttonTheme);
    const history = new ToggleHistoryManager();
    const action = new ToggleAction(doubleRotatedElements || []);

    const { onChangeEvent } = action;
    const { dispatchChangeEvent } = button;

    button.render();
    button.setChangeEvent(onChangeEvent);

    // Set initial position based on saved state
    const savedPosition = history.readPosition();
    const toggleElm = document.getElementById('adm-toggle');
    
    if (toggleElm) {
      if (savedPosition === 'left') {
        toggleElm.classList.add('dark-mode-left');
      } else {
        toggleElm.classList.add('dark-mode-right');
      }
    }

    // This line saves the last state whether it was dark/light mode
    history.setPreviousState(dispatchChangeEvent);
  }
}

if (typeof exports != "undefined") module.exports = AutoDarkMode;

// Script to initialize the dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  new AutoDarkMode();
});