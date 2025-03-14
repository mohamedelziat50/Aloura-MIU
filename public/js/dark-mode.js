class ThemeInterface {
    defaultId = undefined;
    defaultPosition = undefined;
    html = undefined; // should be one element
    style = undefined;
  }
  
  class ToggleFancyShapeTheme extends ThemeInterface {
    defaultId = "adm-toggle";
    defaultPosition = `
      position:fixed;
      bottom:8%;
      right:0;
      z-index: 999999999999999999999999999999;
    `;
  
    html = `<div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      />
      <input id="darkmode-toggle" type="checkbox">
      <label for="darkmode-toggle">Dark Mode</label>
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
    }
    #${this.defaultId} .darkmode {
      --color-bg: #222;
      --color-text: steelblue;
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
      width: 4rem;
      height: 2rem;
      background-color: var(--color-text);
      border-radius: 2rem;
      text-indent: -100em;
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
      transition: left 0.2s ease-out, transform 0.2s ease-out, width 0.2s ease-out;
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
  
    saveState(state) {
      localStorage.setItem(this.localStorageFlag, state);
    }
  
    readState() {
      return JSON.parse(localStorage.getItem(this.localStorageFlag)) || false;
    }
  
    setPreviousState(buttonDispatchChange) {
      const isPreviousStatusChecked = this.readState();
      if (isPreviousStatusChecked) buttonDispatchChange();
    }
  }
  
  class ToggleAction {
    constructor (doubleRotatedElements) {
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
  
    onChangeEvent = (e) => {
      this.rotateElementsColor();
      this.history.saveState(e.target.checked);
    };
  }
  
  class AutoDarkMode {
    constructor (themeInstance, doubleRotatedElements) {
      const buttonTheme = themeInstance || new ToggleFancyShapeTheme();
  
      const button = new ToggleButtonShape(buttonTheme);
      const history = new ToggleHistoryManager();
      const action = new ToggleAction(doubleRotatedElements || []);
  
      const { onChangeEvent } = action;
      const { dispatchChangeEvent } = button;
  
      button.render();
      button.setChangeEvent(onChangeEvent);
  
      // This line saves the last state whether it was dark/light mode! Comment it out if you don't want to save
      history.setPreviousState(dispatchChangeEvent);
    }
  }
  
  
  if (typeof exports != "undefined") module.exports = AutoDarkMode;

//   Now code to actually put the dark mode button is inside the js file itself to make html file smaller
document.addEventListener('DOMContentLoaded', () => {
    // const theme = null; // will apply the default one
    // // Double rotate elements -> To skips elements why you don't want to apply effect to! 
    // const doubleRotatedElements = ['']; 
    // new AutoDarkMode(theme, doubleRotatedElements);
    new AutoDarkMode();

    // Wait for the toggle button to be rendered
    setTimeout(() => {
        // Select the toggle button by its ID - adm-toggle is said by the documentation
        const toggleButton = document.getElementById('adm-toggle');

        // Styling of button is from here in the js, not css
        if (toggleButton)
        {
        // Select the label inside the toggle button
        const label = toggleButton.querySelector('label');

        if (label) {
            // Remove the text node (e.g., "Dark Mode") from the label
            const textNode = Array.from(label.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode) {
            label.removeChild(textNode);
            }
        }

        // Change the position of the toggle button
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '5rem'; // Adjust the position from the bottom
        toggleButton.style.right = '0rem'; // Adjust the position from the right
        toggleButton.style.zIndex = '1'; // Ensure it's on top of other elements EXCEPT Shopping cart for better viewing of it
        toggleButton.style.animation = 'moveFromBottom 1.35s ease-in-out'; // Animation when loading page like to top button
        toggleButton.style.scale = 0.9;
        toggleButton.style.marginRight = '1.95rem';
        }
    }); // Small delay to ensure the element is rendered
});