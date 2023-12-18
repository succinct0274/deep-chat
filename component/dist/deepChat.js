class gs {
  static render(e, t) {
    const i = document.createElement("div");
    i.id = "error-view", i.innerText = t, e.replaceChildren(i);
  }
}
class Dt {
  static onLoad(e) {
    e.innerHTML = '<div id="large-loading-ring"></div>';
  }
  static createElements() {
    const e = document.createElement("div");
    return e.id = "validate-property-key-view", e;
  }
  static render(e, t, i) {
    const n = Dt.createElements(), r = {
      onSuccess: t,
      onFail: gs.render.bind(this, e, "Your 'key' has failed authentication"),
      onLoad: Dt.onLoad.bind(this, n)
    };
    i.key && i.verifyKey(i.key, r), e.replaceChildren(n);
  }
}
class T {
  static unsetStyle(e, t) {
    const i = Object.keys(t).reduce((n, r) => (n[r] = "", n), {});
    Object.assign(e.style, i);
  }
  static unsetActivityCSSMouseStates(e, t) {
    t.click && T.unsetStyle(e, t.click), t.hover && T.unsetStyle(e, t.hover);
  }
  static unsetAllCSSMouseStates(e, t) {
    T.unsetActivityCSSMouseStates(e, t), t.default && T.unsetStyle(e, t.default);
  }
  static processStateful(e, t, i) {
    const n = e.default || {}, r = Object.assign(JSON.parse(JSON.stringify({ ...n, ...t })), e == null ? void 0 : e.hover), o = Object.assign(JSON.parse(JSON.stringify({ ...r, ...i })), e == null ? void 0 : e.click);
    return { default: n, hover: r, click: o };
  }
  static mergeStatefulStyles(e) {
    const t = { default: {}, hover: {}, click: {} };
    return e.forEach((i) => {
      t.default = Object.assign(t.default, i.default), t.hover = Object.assign(t.hover, i.hover), t.click = Object.assign(t.click, i.click);
    }), t;
  }
  static overwriteDefaultWithAlreadyApplied(e, t) {
    Object.keys(e.default || []).forEach((i) => {
      var r;
      const n = i;
      t.style[n] && (r = e.default) != null && r[n] && (e.default[i] = t.style[n]);
    });
  }
  static applyToStyleIfNotDefined(e, t) {
    for (const i in t) {
      const n = t[i];
      e[i] === "" && n && (e[i] = n);
    }
  }
}
const jn = class Ot {
  static apply(e, t) {
    if (t)
      try {
        Ot.applyStyleSheet(e, t);
      } catch {
        Ot.addStyleElement(e, t);
      }
  }
  static applyStyleSheet(e, t) {
    const i = new CSSStyleSheet();
    i.replaceSync(e), t.adoptedStyleSheets.push(i);
  }
  static addStyleElement(e, t) {
    const i = document.createElement("style");
    i.innerHTML = e, t.appendChild(i);
  }
  static applyDefaultStyleToComponent(e, t) {
    t && T.applyToStyleIfNotDefined(e, t), T.applyToStyleIfNotDefined(e, Ot.DEFAULT_COMPONENT_STYLE);
  }
};
jn.DEFAULT_COMPONENT_STYLE = {
  height: "350px",
  width: "320px",
  border: "1px solid #cacaca",
  fontFamily: "'Inter', sans-serif, Avenir, Helvetica, Arial",
  fontSize: "0.9rem",
  backgroundColor: "white",
  position: "relative",
  // this is used to prevent inputAreaStyle background color from going beyond the container's rounded border
  // it will cause issues if there are elements that are meant to be outside of the chat component and in
  // that instance they should overwrite this
  overflow: "hidden"
};
let Ei = jn;
var R = /* @__PURE__ */ ((s) => (s.ESCAPE = "Escape", s.ENTER = "Enter", s.TAB = "Tab", s.ARROW_UP = "ArrowUp", s.ARROW_DOWN = "ArrowDown", s.ARROW_RIGHT = "ArrowRight", s.ARROW_LEFT = "ArrowLeft", s.BACKSPACE = "Backspace", s.DELETE = "Delete", s.META = "Meta", s.CONTROL = "Control", s))(R || {});
let ge = class {
};
ge.IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
ge.IS_CHROMIUM = window.chrome;
const Bn = class nt {
  static add(e, t, i) {
    t !== void 0 && e.addEventListener("keydown", nt.onKeyDown.bind(this, t)), e.oninput = nt.onInput.bind(this, t, i);
  }
  // preventing insertion early for a nicer UX
  // prettier-ignore
  static onKeyDown(e, t) {
    const n = t.target.textContent;
    n && n.length >= e && !nt.PERMITTED_KEYS.has(t.key) && !nt.isKeyCombinationPermitted(t) && t.preventDefault();
  }
  static isKeyCombinationPermitted(e) {
    return e.key === "a" ? e.ctrlKey || e.metaKey : !1;
  }
  static onInput(e, t, i) {
    const n = i.target, r = n.textContent || "";
    e !== void 0 && r.length > e && (n.textContent = r.substring(0, e), Xt.focusEndOfInput(n)), t == null || t();
  }
};
Bn.PERMITTED_KEYS = /* @__PURE__ */ new Set([
  R.BACKSPACE,
  R.DELETE,
  R.ARROW_RIGHT,
  R.ARROW_LEFT,
  R.ARROW_DOWN,
  R.ARROW_UP,
  R.META,
  R.CONTROL,
  R.ENTER
]);
let bs = Bn;
class vs {
  static sanitizePastedTextContent(e) {
    var i, n;
    e.preventDefault();
    const t = (i = e.clipboardData) == null ? void 0 : i.getData("text/plain");
    (n = document.execCommand) == null || n.call(document, "insertHTML", !1, t);
  }
}
const Fn = class Ue {
  constructor(e, t) {
    var n;
    const i = Ue.processConfig(t, e.textInput);
    this.elementRef = Ue.createContainerElement((n = i == null ? void 0 : i.styles) == null ? void 0 : n.container), this.inputElementRef = this.createInputElement(i), this._config = i, this.elementRef.appendChild(this.inputElementRef), setTimeout(() => {
      var r;
      bs.add(this.inputElementRef, (r = e.textInput) == null ? void 0 : r.characterLimit, e._validationHandler);
    });
  }
  static processConfig(e, t) {
    var i;
    return t ?? (t = {}), t.disabled ?? (t.disabled = e.isTextInputDisabled), t.placeholder ?? (t.placeholder = {}), (i = t.placeholder).text ?? (i.text = e.textInputPlaceholderText), t;
  }
  // this is is a bug fix where if the browser is scrolled down and the user types in text that creates new line
  // the browser scrollbar will move up which leads to undesirable UX.
  // More details in this Stack Overflow question:
  // https://stackoverflow.com/questions/76285135/prevent-automatic-scroll-when-text-is-inserted-into-contenteditable-div
  // prettier-ignore
  static preventAutomaticScrollUpOnNewLine(e) {
    let t;
    e.addEventListener("keydown", () => {
      t = window.scrollY;
    }), e.addEventListener("input", () => {
      t !== window.scrollY && window.scrollTo({ top: t });
    });
  }
  // this also similarly prevents scroll up
  static clear(e) {
    const t = window.scrollY;
    e.classList.contains("text-input-disabled") || (e.textContent = ""), ge.IS_CHROMIUM && window.scrollTo({ top: t });
  }
  createInputElement(e) {
    var i, n, r;
    const t = document.createElement("div");
    return t.id = Ue.TEXT_INPUT_ID, t.classList.add("text-input-styling", "text-input-placeholder"), t.innerText = ((i = e == null ? void 0 : e.placeholder) == null ? void 0 : i.text) || "Ask me anything!", ge.IS_CHROMIUM && Ue.preventAutomaticScrollUpOnNewLine(t), typeof (e == null ? void 0 : e.disabled) == "boolean" && e.disabled === !0 ? (t.contentEditable = "false", t.classList.add("text-input-disabled")) : (t.contentEditable = "true", this.addEventListeners(t, e)), Object.assign(t.style, (n = e == null ? void 0 : e.styles) == null ? void 0 : n.text), Object.assign(t.style, (r = e == null ? void 0 : e.placeholder) == null ? void 0 : r.style), t;
  }
  removeTextIfPlaceholder() {
    var e, t, i, n;
    this.inputElementRef.classList.contains("text-input-placeholder") && !this.inputElementRef.classList.contains("text-input-disabled") && ((e = this._config.placeholder) != null && e.style && (T.unsetStyle(this.inputElementRef, (t = this._config.placeholder) == null ? void 0 : t.style), Object.assign(this.inputElementRef.style, (n = (i = this._config) == null ? void 0 : i.styles) == null ? void 0 : n.text)), Ue.clear(this.inputElementRef), this.inputElementRef.classList.remove("text-input-placeholder"));
  }
  static toggleEditability(e, t) {
    e.contentEditable = t ? "true" : "false";
  }
  addEventListeners(e, t) {
    var i, n, r;
    e.onfocus = this.onFocus.bind(this, (i = t == null ? void 0 : t.styles) == null ? void 0 : i.focus), (n = t == null ? void 0 : t.styles) != null && n.focus && (e.onblur = this.onBlur.bind(this, t.styles.focus, (r = t == null ? void 0 : t.styles) == null ? void 0 : r.container)), e.addEventListener("keydown", this.onKeydown.bind(this)), e.onpaste = vs.sanitizePastedTextContent;
  }
  onFocus(e) {
    ge.IS_SAFARI ? setTimeout(() => {
      this.removeTextIfPlaceholder();
    }) : this.removeTextIfPlaceholder(), Object.assign(this.elementRef.style, e);
  }
  onBlur(e, t) {
    T.unsetStyle(this.elementRef, e), t && Object.assign(this.elementRef.style, t);
  }
  static createContainerElement(e) {
    const t = document.createElement("div");
    return t.id = "text-input-container", Object.assign(t.style, e), t;
  }
  onKeydown(e) {
    var t;
    e.key === R.ENTER && !e.ctrlKey && !e.shiftKey && (e.preventDefault(), (t = this.submit) == null || t.call(this));
  }
};
Fn.TEXT_INPUT_ID = "text-input";
let Ui = Fn;
class Xt {
  static focusEndOfInput(e) {
    const t = document.createRange();
    t.selectNodeContents(e), t.collapse(!1);
    const i = window.getSelection();
    i == null || i.removeAllRanges(), i == null || i.addRange(t);
  }
  static focusFromParentElement(e) {
    const t = e.querySelector(`#${Ui.TEXT_INPUT_ID}`);
    t && Xt.focusEndOfInput(t);
  }
}
function sn(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function ys(s) {
  return s && JSON.stringify(s);
}
function xs(s, e, t, i) {
  const n = `
${sn(e)} message: ${JSON.stringify(s)} 
`, r = t ? `${sn(e)} message after interceptor: ${ys(i)} 
` : "";
  return `${n + r}Make sure the ${e} message is using the Response format: https://deepchat.dev/docs/connect/#Response 
You can also augment it using the responseInterceptor property: https://deepchat.dev/docs/interceptors#responseInterceptor`;
}
const rn = `Make sure the events are using {text: string} or {html: string} format.
You can also augment them using the responseInterceptor property: https://deepchat.dev/docs/interceptors#responseInterceptor`, A = {
  INVALID_KEY: "Invalid API Key",
  CONNECTION_FAILED: "Failed to connect",
  INVALID_RESPONSE: xs,
  INVALID_STREAM_EVENT: rn,
  INVALID_STREAM_EVENT_MIX: "Cannot mix {text: string} and {html: string} responses.",
  NO_VALID_STREAM_EVENTS_SENT: `No valid stream events were sent.
${rn}`
}, zn = class qn {
  static addElements(e, ...t) {
    t.forEach((i) => e.appendChild(i));
  }
  static isScrollbarAtBottomOfElement(e) {
    const t = e.scrollHeight, i = e.clientHeight, n = e.scrollTop, r = t - i;
    return n >= r - qn.CODE_SNIPPET_GENERATION_JUMP;
  }
  static cloneElement(e) {
    const t = e.cloneNode(!0);
    return e.parentNode.replaceChild(t, e), t;
  }
  static scrollToBottom(e) {
    e.scrollTop = e.scrollHeight;
  }
  static scrollToTop(e) {
    e.scrollTop = 0;
  }
};
zn.CODE_SNIPPET_GENERATION_JUMP = 0.5;
let Y = zn;
const Un = class Hn {
  static speak(e, t) {
    if (window.SpeechSynthesisUtterance) {
      const i = new SpeechSynthesisUtterance(e);
      Object.assign(i, t), speechSynthesis.speak(i);
    }
  }
  static processConfig(e, t) {
    const i = {};
    setTimeout(() => {
      if (typeof e == "object" && (e.lang && (i.lang = e.lang), e.pitch && (i.pitch = e.pitch), e.rate && (i.rate = e.rate), e.volume && (i.volume = e.volume), e.voiceName)) {
        const n = window.speechSynthesis.getVoices().find((r) => {
          var o;
          return r.name.toLocaleLowerCase() === ((o = e.voiceName) == null ? void 0 : o.toLocaleLowerCase());
        });
        n && (i.voice = n);
      }
      t(i);
    }, Hn.LOAD_VOICES_MS);
  }
};
Un.LOAD_VOICES_MS = 200;
let Nt = Un;
class ke {
  static checkForContainerStyles(e, t) {
    const i = e.containerStyle;
    i && (Object.assign(t.style, i), console.error("The containerStyle property is deprecated since version 1.3.14."), console.error("Please change to using the style property instead: https://deepchat.dev/docs/styles#style"));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static handleResponseProperty(e) {
    return console.error("The {result: ....} response object type is deprecated since version 1.3.0."), console.error("Please change to using the new response object: https://deepchat.dev/docs/connect#Response"), e.result;
  }
  static processInitialMessageFile(e) {
    const t = e.file;
    t && (console.error("The file property in MessageContent is deprecated since version 1.3.17."), console.error("Please change to using the files array property: https://deepchat.dev/docs/messages/#MessageContent"), e.files = [t]);
  }
  static processValidateInput(e) {
    const t = e.validateMessageBeforeSending;
    if (t)
      return console.error("The validateMessageBeforeSending property is deprecated since version 1.3.24."), console.error("Please change to using validateInput: https://deepchat.dev/docs/interceptors#validateInput"), t;
  }
  static processSubmitUserMessage(e) {
    return console.error("The submitUserMessage(text: string) argument string type is deprecated since version 1.4.4."), console.error("Please change to using the new argument type: https://deepchat.dev/docs/methods#submitUserMessage"), { text: e };
  }
  static flagHTMLUpdateClass(e) {
    var t;
    (t = e.children[0]) != null && t.classList.contains("deep-chat-update-message") && (console.error('The "deep-chat-update-message" html class is deprecated since version 1.4.4.'), console.error("Please change to using {..., overwrite: true} object: https://deepchat.dev/docs/connect#Response"));
  }
}
const ei = class xe {
  static getLastElementsByClass(e, t, i) {
    for (let n = e.length - 1; n >= 0; n -= 1) {
      const r = e[n];
      if (r.bubbleElement.classList.contains(t[0]) && !t.slice(1).find((a) => !r.bubbleElement.classList.contains(a)))
        if (i) {
          if (!i.find((l) => r.bubbleElement.classList.contains(l)))
            return r;
        } else
          return r;
    }
  }
  static getLastMessage(e, t, i) {
    for (let n = e.length - 1; n >= 0; n -= 1)
      if (e[n].role === t)
        if (i) {
          if (e[n][i])
            return e[n];
        } else
          return e[n];
  }
  static getLastTextToElement(e, t) {
    for (let i = e.length - 1; i >= 0; i -= 1)
      if (e[i][0] === t)
        return e[i];
  }
  // IMPORTANT: If the overwrite message does not contain a role property it will look for the last 'ai' role message
  // and if messages have custom roles, it will still look to update the last 'ai' role message
  // prettier-ignore
  static overwriteMessage(e, t, i, n, r, o) {
    const a = xe.getLastElementsByClass(
      t,
      [xe.getRoleClass(n), o],
      ["loading-message-text"]
    ), l = xe.getLastMessage(e, n, r);
    return l && (l[r] = i), a;
  }
  static getRoleClass(e) {
    return `${e}-message`;
  }
  // makes sure the bubble has dimensions when there is no text
  static fillEmptyMessageElement(e, t) {
    t.trim().length === 0 && (e.classList.add(xe.EMPTY_MESSAGE_CLASS), e.innerHTML = '<div style="color:#00000000">.</div>');
  }
  static unfillEmptyMessageElement(e, t) {
    e.classList.contains(xe.EMPTY_MESSAGE_CLASS) && t.trim().length > 0 && e.replaceChildren();
  }
  static getLastMessageBubbleElement(e) {
    var t, i, n;
    return Array.from(((n = (i = (t = xe.getLastMessageElement(e)) == null ? void 0 : t.children) == null ? void 0 : i[0]) == null ? void 0 : n.children) || []).find((r) => r.classList.contains("message-bubble"));
  }
  static getLastMessageElement(e) {
    return e.children[e.children.length - 1];
  }
};
ei.AI_ROLE = "ai";
ei.USER_ROLE = "user";
ei.EMPTY_MESSAGE_CLASS = "empty-message";
let x = ei;
class Te {
  static mouseUp(e, t) {
    T.unsetAllCSSMouseStates(e, t), Object.assign(e.style, t.default), Object.assign(e.style, t.hover);
  }
  static mouseDown(e, t) {
    Object.assign(e.style, t.click);
  }
  static mouseLeave(e, t) {
    T.unsetAllCSSMouseStates(e, t), Object.assign(e.style, t.default);
  }
  static mouseEnter(e, t) {
    Object.assign(e.style, t.hover);
  }
  static add(e, t) {
    e.addEventListener("mouseenter", Te.mouseEnter.bind(this, e, t)), e.addEventListener("mouseleave", Te.mouseLeave.bind(this, e, t)), e.addEventListener("mousedown", Te.mouseDown.bind(this, e, t)), e.addEventListener("mouseup", Te.mouseUp.bind(this, e, t));
  }
}
const Es = "deep-chat-temporary-message", Ss = "deep-chat-suggestion-button", Ri = {
  "deep-chat-button": {
    styles: {
      default: {
        backgroundColor: "white",
        padding: "5px",
        paddingLeft: "7px",
        paddingRight: "7px",
        border: "1px solid #c2c2c2",
        borderRadius: "6px",
        cursor: "pointer"
      },
      hover: {
        backgroundColor: "#fafafa"
      },
      click: {
        backgroundColor: "#f1f1f1"
      }
    }
  }
}, on = Object.keys(Ri);
class be {
  static applySuggestionEvent(e, t) {
    setTimeout(() => {
      t.addEventListener("click", () => {
        var i, n;
        (n = e.submitUserMessage) == null || n.call(e, { text: ((i = t.textContent) == null ? void 0 : i.trim()) || "" });
      });
    });
  }
  static isElementTemporary(e) {
    var t;
    return e ? (t = e.bubbleElement.children[0]) == null ? void 0 : t.classList.contains(Es) : !1;
  }
  static doesElementContainDeepChatClass(e) {
    return on.find((t) => e.classList.contains(t));
  }
  static applyEvents(e, t) {
    const i = Ri[t].events;
    Object.keys(i || []).forEach((n) => {
      e.addEventListener(n, i == null ? void 0 : i[n]);
    });
  }
  static getProcessedStyles(e, t, i) {
    const n = Array.from(t.classList).reduce((a, l) => {
      var d;
      const c = (d = e[l]) == null ? void 0 : d.styles;
      return c && e[l].styles && a.push(c), a;
    }, []), r = Ri[i].styles;
    if (r) {
      const a = JSON.parse(JSON.stringify(r));
      a.default && T.overwriteDefaultWithAlreadyApplied(a, t), n.unshift(a);
    }
    const o = T.mergeStatefulStyles(n);
    return T.processStateful(o, {}, {});
  }
  static applyDeepChatUtilities(e, t, i) {
    on.forEach((r) => {
      const o = i.getElementsByClassName(r);
      Array.from(o || []).forEach((a) => {
        const l = be.getProcessedStyles(t, a, r);
        se.applyStylesToElement(a, l), be.applyEvents(a, r);
      });
    });
    const n = i.getElementsByClassName(Ss);
    Array.from(n).forEach((r) => be.applySuggestionEvent(e, r));
  }
}
class se {
  static applyStylesToElement(e, t) {
    const i = T.processStateful(t, {}, {});
    Te.add(e, i), Object.assign(e.style, i.default);
  }
  static applyEventsToElement(e, t) {
    Object.keys(t).forEach((i) => {
      const n = t[i];
      n && e.addEventListener(i, n);
    });
  }
  static applyClassUtilitiesToElement(e, t) {
    const { events: i, styles: n } = t;
    i && se.applyEventsToElement(e, i), n && !be.doesElementContainDeepChatClass(e) && se.applyStylesToElement(e, n);
  }
  static applyCustomClassUtilities(e, t) {
    Object.keys(e).forEach((i) => {
      const n = t.getElementsByClassName(i);
      Array.from(n).forEach((r) => {
        e[i] && se.applyClassUtilitiesToElement(r, e[i]);
      });
    });
  }
  static apply(e, t) {
    be.applyDeepChatUtilities(e, e.htmlClassUtilities, t), se.applyCustomClassUtilities(e.htmlClassUtilities, t);
  }
}
class Ye {
  static addElement(e, t) {
    e.elementRef.appendChild(t), e.elementRef.scrollTop = e.elementRef.scrollHeight;
  }
  static createElements(e, t, i) {
    const n = e.createNewMessageElement("", i);
    return n.bubbleElement.classList.add("html-message"), n.bubbleElement.innerHTML = t, n;
  }
  static overwrite(e, t, i, n) {
    const { messages: r } = e, o = x.overwriteMessage(r, n, t, i, "html", "html-message");
    return o && (o.bubbleElement.innerHTML = t, se.apply(e, o.outerContainer), ke.flagHTMLUpdateClass(o.bubbleElement)), o;
  }
  // prettier-ignore
  static add(e, t, i, n, r) {
    var a;
    if (r != null && r.status) {
      const l = this.overwrite(e, t, i, n);
      if (l)
        return l;
      r.status = !1;
    }
    const o = Ye.createElements(e, t, i);
    return x.fillEmptyMessageElement(o.bubbleElement, t), se.apply(e, o.outerContainer), ke.flagHTMLUpdateClass(o.bubbleElement), e.applyCustomStyles(o, i, !1, (a = e.messageStyles) == null ? void 0 : a.html), Ye.addElement(e, o.outerContainer), o;
  }
}
var kt;
function Vn(s) {
  return kt = kt || document.createElement("textarea"), kt.innerHTML = "&" + s + ";", kt.value;
}
var _s = Object.prototype.hasOwnProperty;
function ws(s, e) {
  return s ? _s.call(s, e) : !1;
}
function Gn(s) {
  var e = [].slice.call(arguments, 1);
  return e.forEach(function(t) {
    if (t) {
      if (typeof t != "object")
        throw new TypeError(t + "must be object");
      Object.keys(t).forEach(function(i) {
        s[i] = t[i];
      });
    }
  }), s;
}
var Ms = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function ft(s) {
  return s.indexOf("\\") < 0 ? s : s.replace(Ms, "$1");
}
function Wn(s) {
  return !(s >= 55296 && s <= 57343 || s >= 64976 && s <= 65007 || (s & 65535) === 65535 || (s & 65535) === 65534 || s >= 0 && s <= 8 || s === 11 || s >= 14 && s <= 31 || s >= 127 && s <= 159 || s > 1114111);
}
function Oi(s) {
  if (s > 65535) {
    s -= 65536;
    var e = 55296 + (s >> 10), t = 56320 + (s & 1023);
    return String.fromCharCode(e, t);
  }
  return String.fromCharCode(s);
}
var Ts = /&([a-z#][a-z0-9]{1,31});/gi, Cs = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
function As(s, e) {
  var t = 0, i = Vn(e);
  return e !== i ? i : e.charCodeAt(0) === 35 && Cs.test(e) && (t = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), Wn(t)) ? Oi(t) : s;
}
function Ie(s) {
  return s.indexOf("&") < 0 ? s : s.replace(Ts, As);
}
var ks = /[&<>"]/, Is = /[&<>"]/g, Ls = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function Rs(s) {
  return Ls[s];
}
function z(s) {
  return ks.test(s) ? s.replace(Is, Rs) : s;
}
var f = {};
f.blockquote_open = function() {
  return `<blockquote>
`;
};
f.blockquote_close = function(s, e) {
  return "</blockquote>" + Re(s, e);
};
f.code = function(s, e) {
  return s[e].block ? "<pre><code>" + z(s[e].content) + "</code></pre>" + Re(s, e) : "<code>" + z(s[e].content) + "</code>";
};
f.fence = function(s, e, t, i, n) {
  var r = s[e], o = "", a = t.langPrefix, l = "", c, d, u;
  if (r.params) {
    if (c = r.params.split(/\s+/g), d = c.join(" "), ws(n.rules.fence_custom, c[0]))
      return n.rules.fence_custom[c[0]](s, e, t, i, n);
    l = z(Ie(ft(d))), o = ' class="' + a + l + '"';
  }
  return t.highlight ? u = t.highlight.apply(t.highlight, [r.content].concat(c)) || z(r.content) : u = z(r.content), "<pre><code" + o + ">" + u + "</code></pre>" + Re(s, e);
};
f.fence_custom = {};
f.heading_open = function(s, e) {
  return "<h" + s[e].hLevel + ">";
};
f.heading_close = function(s, e) {
  return "</h" + s[e].hLevel + `>
`;
};
f.hr = function(s, e, t) {
  return (t.xhtmlOut ? "<hr />" : "<hr>") + Re(s, e);
};
f.bullet_list_open = function() {
  return `<ul>
`;
};
f.bullet_list_close = function(s, e) {
  return "</ul>" + Re(s, e);
};
f.list_item_open = function() {
  return "<li>";
};
f.list_item_close = function() {
  return `</li>
`;
};
f.ordered_list_open = function(s, e) {
  var t = s[e], i = t.order > 1 ? ' start="' + t.order + '"' : "";
  return "<ol" + i + `>
`;
};
f.ordered_list_close = function(s, e) {
  return "</ol>" + Re(s, e);
};
f.paragraph_open = function(s, e) {
  return s[e].tight ? "" : "<p>";
};
f.paragraph_close = function(s, e) {
  var t = !(s[e].tight && e && s[e - 1].type === "inline" && !s[e - 1].content);
  return (s[e].tight ? "" : "</p>") + (t ? Re(s, e) : "");
};
f.link_open = function(s, e, t) {
  var i = s[e].title ? ' title="' + z(Ie(s[e].title)) + '"' : "", n = t.linkTarget ? ' target="' + t.linkTarget + '"' : "";
  return '<a href="' + z(s[e].href) + '"' + i + n + ">";
};
f.link_close = function() {
  return "</a>";
};
f.image = function(s, e, t) {
  var i = ' src="' + z(s[e].src) + '"', n = s[e].title ? ' title="' + z(Ie(s[e].title)) + '"' : "", r = ' alt="' + (s[e].alt ? z(Ie(ft(s[e].alt))) : "") + '"', o = t.xhtmlOut ? " /" : "";
  return "<img" + i + r + n + o + ">";
};
f.table_open = function() {
  return `<table>
`;
};
f.table_close = function() {
  return `</table>
`;
};
f.thead_open = function() {
  return `<thead>
`;
};
f.thead_close = function() {
  return `</thead>
`;
};
f.tbody_open = function() {
  return `<tbody>
`;
};
f.tbody_close = function() {
  return `</tbody>
`;
};
f.tr_open = function() {
  return "<tr>";
};
f.tr_close = function() {
  return `</tr>
`;
};
f.th_open = function(s, e) {
  var t = s[e];
  return "<th" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
f.th_close = function() {
  return "</th>";
};
f.td_open = function(s, e) {
  var t = s[e];
  return "<td" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
f.td_close = function() {
  return "</td>";
};
f.strong_open = function() {
  return "<strong>";
};
f.strong_close = function() {
  return "</strong>";
};
f.em_open = function() {
  return "<em>";
};
f.em_close = function() {
  return "</em>";
};
f.del_open = function() {
  return "<del>";
};
f.del_close = function() {
  return "</del>";
};
f.ins_open = function() {
  return "<ins>";
};
f.ins_close = function() {
  return "</ins>";
};
f.mark_open = function() {
  return "<mark>";
};
f.mark_close = function() {
  return "</mark>";
};
f.sub = function(s, e) {
  return "<sub>" + z(s[e].content) + "</sub>";
};
f.sup = function(s, e) {
  return "<sup>" + z(s[e].content) + "</sup>";
};
f.hardbreak = function(s, e, t) {
  return t.xhtmlOut ? `<br />
` : `<br>
`;
};
f.softbreak = function(s, e, t) {
  return t.breaks ? t.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
f.text = function(s, e) {
  return z(s[e].content);
};
f.htmlblock = function(s, e) {
  return s[e].content;
};
f.htmltag = function(s, e) {
  return s[e].content;
};
f.abbr_open = function(s, e) {
  return '<abbr title="' + z(Ie(s[e].title)) + '">';
};
f.abbr_close = function() {
  return "</abbr>";
};
f.footnote_ref = function(s, e) {
  var t = Number(s[e].id + 1).toString(), i = "fnref" + t;
  return s[e].subId > 0 && (i += ":" + s[e].subId), '<sup class="footnote-ref"><a href="#fn' + t + '" id="' + i + '">[' + t + "]</a></sup>";
};
f.footnote_block_open = function(s, e, t) {
  var i = t.xhtmlOut ? `<hr class="footnotes-sep" />
` : `<hr class="footnotes-sep">
`;
  return i + `<section class="footnotes">
<ol class="footnotes-list">
`;
};
f.footnote_block_close = function() {
  return `</ol>
</section>
`;
};
f.footnote_open = function(s, e) {
  var t = Number(s[e].id + 1).toString();
  return '<li id="fn' + t + '"  class="footnote-item">';
};
f.footnote_close = function() {
  return `</li>
`;
};
f.footnote_anchor = function(s, e) {
  var t = Number(s[e].id + 1).toString(), i = "fnref" + t;
  return s[e].subId > 0 && (i += ":" + s[e].subId), ' <a href="#' + i + '" class="footnote-backref">↩</a>';
};
f.dl_open = function() {
  return `<dl>
`;
};
f.dt_open = function() {
  return "<dt>";
};
f.dd_open = function() {
  return "<dd>";
};
f.dl_close = function() {
  return `</dl>
`;
};
f.dt_close = function() {
  return `</dt>
`;
};
f.dd_close = function() {
  return `</dd>
`;
};
function Kn(s, e) {
  return ++e >= s.length - 2 ? e : s[e].type === "paragraph_open" && s[e].tight && s[e + 1].type === "inline" && s[e + 1].content.length === 0 && s[e + 2].type === "paragraph_close" && s[e + 2].tight ? Kn(s, e + 2) : e;
}
var Re = f.getBreak = function(e, t) {
  return t = Kn(e, t), t < e.length && e[t].type === "list_item_close" ? "" : `
`;
};
function Hi() {
  this.rules = Gn({}, f), this.getBreak = f.getBreak;
}
Hi.prototype.renderInline = function(s, e, t) {
  for (var i = this.rules, n = s.length, r = 0, o = ""; n--; )
    o += i[s[r].type](s, r++, e, t, this);
  return o;
};
Hi.prototype.render = function(s, e, t) {
  for (var i = this.rules, n = s.length, r = -1, o = ""; ++r < n; )
    s[r].type === "inline" ? o += this.renderInline(s[r].children, e, t) : o += i[s[r].type](s, r, e, t, this);
  return o;
};
function H() {
  this.__rules__ = [], this.__cache__ = null;
}
H.prototype.__find__ = function(s) {
  for (var e = this.__rules__.length, t = -1; e--; )
    if (this.__rules__[++t].name === s)
      return t;
  return -1;
};
H.prototype.__compile__ = function() {
  var s = this, e = [""];
  s.__rules__.forEach(function(t) {
    t.enabled && t.alt.forEach(function(i) {
      e.indexOf(i) < 0 && e.push(i);
    });
  }), s.__cache__ = {}, e.forEach(function(t) {
    s.__cache__[t] = [], s.__rules__.forEach(function(i) {
      i.enabled && (t && i.alt.indexOf(t) < 0 || s.__cache__[t].push(i.fn));
    });
  });
};
H.prototype.at = function(s, e, t) {
  var i = this.__find__(s), n = t || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + s);
  this.__rules__[i].fn = e, this.__rules__[i].alt = n.alt || [], this.__cache__ = null;
};
H.prototype.before = function(s, e, t, i) {
  var n = this.__find__(s), r = i || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + s);
  this.__rules__.splice(n, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
H.prototype.after = function(s, e, t, i) {
  var n = this.__find__(s), r = i || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + s);
  this.__rules__.splice(n + 1, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
H.prototype.push = function(s, e, t) {
  var i = t || {};
  this.__rules__.push({
    name: s,
    enabled: !0,
    fn: e,
    alt: i.alt || []
  }), this.__cache__ = null;
};
H.prototype.enable = function(s, e) {
  s = Array.isArray(s) ? s : [s], e && this.__rules__.forEach(function(t) {
    t.enabled = !1;
  }), s.forEach(function(t) {
    var i = this.__find__(t);
    if (i < 0)
      throw new Error("Rules manager: invalid rule name " + t);
    this.__rules__[i].enabled = !0;
  }, this), this.__cache__ = null;
};
H.prototype.disable = function(s) {
  s = Array.isArray(s) ? s : [s], s.forEach(function(e) {
    var t = this.__find__(e);
    if (t < 0)
      throw new Error("Rules manager: invalid rule name " + e);
    this.__rules__[t].enabled = !1;
  }, this), this.__cache__ = null;
};
H.prototype.getRules = function(s) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[s] || [];
};
function Os(s) {
  s.inlineMode ? s.tokens.push({
    type: "inline",
    content: s.src.replace(/\n/g, " ").trim(),
    level: 0,
    lines: [0, 1],
    children: []
  }) : s.block.parse(s.src, s.options, s.env, s.tokens);
}
function Oe(s, e, t, i, n) {
  this.src = s, this.env = i, this.options = t, this.parser = e, this.tokens = n, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = [], this.isInLabel = !1, this.linkLevel = 0, this.linkContent = "", this.labelUnmatchedScopes = 0;
}
Oe.prototype.pushPending = function() {
  this.tokens.push({
    type: "text",
    content: this.pending,
    level: this.pendingLevel
  }), this.pending = "";
};
Oe.prototype.push = function(s) {
  this.pending && this.pushPending(), this.tokens.push(s), this.pendingLevel = this.level;
};
Oe.prototype.cacheSet = function(s, e) {
  for (var t = this.cache.length; t <= s; t++)
    this.cache.push(0);
  this.cache[s] = e;
};
Oe.prototype.cacheGet = function(s) {
  return s < this.cache.length ? this.cache[s] : 0;
};
function mt(s, e) {
  var t, i, n, r = -1, o = s.posMax, a = s.pos, l = s.isInLabel;
  if (s.isInLabel)
    return -1;
  if (s.labelUnmatchedScopes)
    return s.labelUnmatchedScopes--, -1;
  for (s.pos = e + 1, s.isInLabel = !0, t = 1; s.pos < o; ) {
    if (n = s.src.charCodeAt(s.pos), n === 91)
      t++;
    else if (n === 93 && (t--, t === 0)) {
      i = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return i ? (r = s.pos, s.labelUnmatchedScopes = 0) : s.labelUnmatchedScopes = t - 1, s.pos = a, s.isInLabel = l, r;
}
function Ns(s, e, t, i) {
  var n, r, o, a, l, c;
  if (s.charCodeAt(0) !== 42 || s.charCodeAt(1) !== 91 || s.indexOf("]:") === -1 || (n = new Oe(s, e, t, i, []), r = mt(n, 1), r < 0 || s.charCodeAt(r + 1) !== 58))
    return -1;
  for (a = n.posMax, o = r + 2; o < a && n.src.charCodeAt(o) !== 10; o++)
    ;
  return l = s.slice(2, r), c = s.slice(r + 2, o).trim(), c.length === 0 ? -1 : (i.abbreviations || (i.abbreviations = {}), typeof i.abbreviations[":" + l] > "u" && (i.abbreviations[":" + l] = c), o);
}
function Ps(s) {
  var e = s.tokens, t, i, n, r;
  if (!s.inlineMode) {
    for (t = 1, i = e.length - 1; t < i; t++)
      if (e[t - 1].type === "paragraph_open" && e[t].type === "inline" && e[t + 1].type === "paragraph_close") {
        for (n = e[t].content; n.length && (r = Ns(n, s.inline, s.options, s.env), !(r < 0)); )
          n = n.slice(r).trim();
        e[t].content = n, n.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
      }
  }
}
function Ni(s) {
  var e = Ie(s);
  try {
    e = decodeURI(e);
  } catch {
  }
  return encodeURI(e);
}
function Jn(s, e) {
  var t, i, n, r = e, o = s.posMax;
  if (s.src.charCodeAt(e) === 60) {
    for (e++; e < o; ) {
      if (t = s.src.charCodeAt(e), t === 10)
        return !1;
      if (t === 62)
        return n = Ni(ft(s.src.slice(r + 1, e))), s.parser.validateLink(n) ? (s.pos = e + 1, s.linkContent = n, !0) : !1;
      if (t === 92 && e + 1 < o) {
        e += 2;
        continue;
      }
      e++;
    }
    return !1;
  }
  for (i = 0; e < o && (t = s.src.charCodeAt(e), !(t === 32 || t < 32 || t === 127)); ) {
    if (t === 92 && e + 1 < o) {
      e += 2;
      continue;
    }
    if (t === 40 && (i++, i > 1) || t === 41 && (i--, i < 0))
      break;
    e++;
  }
  return r === e || (n = ft(s.src.slice(r, e)), !s.parser.validateLink(n)) ? !1 : (s.linkContent = n, s.pos = e, !0);
}
function $n(s, e) {
  var t, i = e, n = s.posMax, r = s.src.charCodeAt(e);
  if (r !== 34 && r !== 39 && r !== 40)
    return !1;
  for (e++, r === 40 && (r = 41); e < n; ) {
    if (t = s.src.charCodeAt(e), t === r)
      return s.pos = e + 1, s.linkContent = ft(s.src.slice(i + 1, e)), !0;
    if (t === 92 && e + 1 < n) {
      e += 2;
      continue;
    }
    e++;
  }
  return !1;
}
function Yn(s) {
  return s.trim().replace(/\s+/g, " ").toUpperCase();
}
function Ds(s, e, t, i) {
  var n, r, o, a, l, c, d, u, h;
  if (s.charCodeAt(0) !== 91 || s.indexOf("]:") === -1 || (n = new Oe(s, e, t, i, []), r = mt(n, 0), r < 0 || s.charCodeAt(r + 1) !== 58))
    return -1;
  for (a = n.posMax, o = r + 2; o < a && (l = n.src.charCodeAt(o), !(l !== 32 && l !== 10)); o++)
    ;
  if (!Jn(n, o))
    return -1;
  for (d = n.linkContent, o = n.pos, c = o, o = o + 1; o < a && (l = n.src.charCodeAt(o), !(l !== 32 && l !== 10)); o++)
    ;
  for (o < a && c !== o && $n(n, o) ? (u = n.linkContent, o = n.pos) : (u = "", o = c); o < a && n.src.charCodeAt(o) === 32; )
    o++;
  return o < a && n.src.charCodeAt(o) !== 10 ? -1 : (h = Yn(s.slice(1, r)), typeof i.references[h] > "u" && (i.references[h] = { title: u, href: d }), o);
}
function js(s) {
  var e = s.tokens, t, i, n, r;
  if (s.env.references = s.env.references || {}, !s.inlineMode) {
    for (t = 1, i = e.length - 1; t < i; t++)
      if (e[t].type === "inline" && e[t - 1].type === "paragraph_open" && e[t + 1].type === "paragraph_close") {
        for (n = e[t].content; n.length && (r = Ds(n, s.inline, s.options, s.env), !(r < 0)); )
          n = n.slice(r).trim();
        e[t].content = n, n.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
      }
  }
}
function Bs(s) {
  var e = s.tokens, t, i, n;
  for (i = 0, n = e.length; i < n; i++)
    t = e[i], t.type === "inline" && s.inline.parse(t.content, s.options, s.env, t.children);
}
function Fs(s) {
  var e, t, i, n, r, o, a, l, c, d = 0, u = !1, h = {};
  if (s.env.footnotes && (s.tokens = s.tokens.filter(function(p) {
    return p.type === "footnote_reference_open" ? (u = !0, l = [], c = p.label, !1) : p.type === "footnote_reference_close" ? (u = !1, h[":" + c] = l, !1) : (u && l.push(p), !u);
  }), !!s.env.footnotes.list)) {
    for (o = s.env.footnotes.list, s.tokens.push({
      type: "footnote_block_open",
      level: d++
    }), e = 0, t = o.length; e < t; e++) {
      for (s.tokens.push({
        type: "footnote_open",
        id: e,
        level: d++
      }), o[e].tokens ? (a = [], a.push({
        type: "paragraph_open",
        tight: !1,
        level: d++
      }), a.push({
        type: "inline",
        content: "",
        level: d,
        children: o[e].tokens
      }), a.push({
        type: "paragraph_close",
        tight: !1,
        level: --d
      })) : o[e].label && (a = h[":" + o[e].label]), s.tokens = s.tokens.concat(a), s.tokens[s.tokens.length - 1].type === "paragraph_close" ? r = s.tokens.pop() : r = null, n = o[e].count > 0 ? o[e].count : 1, i = 0; i < n; i++)
        s.tokens.push({
          type: "footnote_anchor",
          id: e,
          subId: i,
          level: d
        });
      r && s.tokens.push(r), s.tokens.push({
        type: "footnote_close",
        level: --d
      });
    }
    s.tokens.push({
      type: "footnote_block_close",
      level: --d
    });
  }
}
var an = ` 
()[]'".,!?-`;
function Si(s) {
  return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1");
}
function zs(s) {
  var e, t, i, n, r, o, a, l, c, d, u, h, p = s.tokens;
  if (s.env.abbreviations) {
    for (s.env.abbrRegExp || (h = "(^|[" + an.split("").map(Si).join("") + "])(" + Object.keys(s.env.abbreviations).map(function(g) {
      return g.substr(1);
    }).sort(function(g, m) {
      return m.length - g.length;
    }).map(Si).join("|") + ")($|[" + an.split("").map(Si).join("") + "])", s.env.abbrRegExp = new RegExp(h, "g")), d = s.env.abbrRegExp, t = 0, i = p.length; t < i; t++)
      if (p[t].type === "inline") {
        for (n = p[t].children, e = n.length - 1; e >= 0; e--)
          if (r = n[e], r.type === "text") {
            for (l = 0, o = r.content, d.lastIndex = 0, c = r.level, a = []; u = d.exec(o); )
              d.lastIndex > l && a.push({
                type: "text",
                content: o.slice(l, u.index + u[1].length),
                level: c
              }), a.push({
                type: "abbr_open",
                title: s.env.abbreviations[":" + u[2]],
                level: c++
              }), a.push({
                type: "text",
                content: u[2],
                level: c
              }), a.push({
                type: "abbr_close",
                level: --c
              }), l = d.lastIndex - u[3].length;
            a.length && (l < o.length && a.push({
              type: "text",
              content: o.slice(l),
              level: c
            }), p[t].children = n = [].concat(n.slice(0, e), a, n.slice(e + 1)));
          }
      }
  }
}
var qs = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, Us = /\((c|tm|r|p)\)/ig, Hs = {
  c: "©",
  r: "®",
  p: "§",
  tm: "™"
};
function Vs(s) {
  return s.indexOf("(") < 0 ? s : s.replace(Us, function(e, t) {
    return Hs[t.toLowerCase()];
  });
}
function Gs(s) {
  var e, t, i, n, r;
  if (s.options.typographer) {
    for (r = s.tokens.length - 1; r >= 0; r--)
      if (s.tokens[r].type === "inline")
        for (n = s.tokens[r].children, e = n.length - 1; e >= 0; e--)
          t = n[e], t.type === "text" && (i = t.content, i = Vs(i), qs.test(i) && (i = i.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1—$2").replace(/(^|\s)--(\s|$)/mg, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1–$2")), t.content = i);
  }
}
var Ws = /['"]/, ln = /['"]/g, Ks = /[-\s()\[\]]/, cn = "’";
function dn(s, e) {
  return e < 0 || e >= s.length ? !1 : !Ks.test(s[e]);
}
function ze(s, e, t) {
  return s.substr(0, e) + t + s.substr(e + 1);
}
function Js(s) {
  var e, t, i, n, r, o, a, l, c, d, u, h, p, g, m, E, S;
  if (s.options.typographer) {
    for (S = [], m = s.tokens.length - 1; m >= 0; m--)
      if (s.tokens[m].type === "inline") {
        for (E = s.tokens[m].children, S.length = 0, e = 0; e < E.length; e++)
          if (t = E[e], !(t.type !== "text" || Ws.test(t.text))) {
            for (a = E[e].level, p = S.length - 1; p >= 0 && !(S[p].level <= a); p--)
              ;
            S.length = p + 1, i = t.content, r = 0, o = i.length;
            e:
              for (; r < o && (ln.lastIndex = r, n = ln.exec(i), !!n); ) {
                if (l = !dn(i, n.index - 1), r = n.index + 1, g = n[0] === "'", c = !dn(i, r), !c && !l) {
                  g && (t.content = ze(t.content, n.index, cn));
                  continue;
                }
                if (u = !c, h = !l, h) {
                  for (p = S.length - 1; p >= 0 && (d = S[p], !(S[p].level < a)); p--)
                    if (d.single === g && S[p].level === a) {
                      d = S[p], g ? (E[d.token].content = ze(E[d.token].content, d.pos, s.options.quotes[2]), t.content = ze(t.content, n.index, s.options.quotes[3])) : (E[d.token].content = ze(E[d.token].content, d.pos, s.options.quotes[0]), t.content = ze(t.content, n.index, s.options.quotes[1])), S.length = p;
                      continue e;
                    }
                }
                u ? S.push({
                  token: e,
                  pos: n.index,
                  single: g,
                  level: a
                }) : h && g && (t.content = ze(t.content, n.index, cn));
              }
          }
      }
  }
}
var _i = [
  ["block", Os],
  ["abbr", Ps],
  ["references", js],
  ["inline", Bs],
  ["footnote_tail", Fs],
  ["abbr2", zs],
  ["replacements", Gs],
  ["smartquotes", Js]
];
function Zn() {
  this.options = {}, this.ruler = new H();
  for (var s = 0; s < _i.length; s++)
    this.ruler.push(_i[s][0], _i[s][1]);
}
Zn.prototype.process = function(s) {
  var e, t, i;
  for (i = this.ruler.getRules(""), e = 0, t = i.length; e < t; e++)
    i[e](s);
};
function Ne(s, e, t, i, n) {
  var r, o, a, l, c, d, u;
  for (this.src = s, this.parser = e, this.options = t, this.env = i, this.tokens = n, this.bMarks = [], this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", o = this.src, d = 0, u = !1, a = l = d = 0, c = o.length; l < c; l++) {
    if (r = o.charCodeAt(l), !u)
      if (r === 32) {
        d++;
        continue;
      } else
        u = !0;
    (r === 10 || l === c - 1) && (r !== 10 && l++, this.bMarks.push(a), this.eMarks.push(l), this.tShift.push(d), u = !1, d = 0, a = l + 1);
  }
  this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.lineMax = this.bMarks.length - 1;
}
Ne.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
Ne.prototype.skipEmptyLines = function(e) {
  for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
Ne.prototype.skipSpaces = function(e) {
  for (var t = this.src.length; e < t && this.src.charCodeAt(e) === 32; e++)
    ;
  return e;
};
Ne.prototype.skipChars = function(e, t) {
  for (var i = this.src.length; e < i && this.src.charCodeAt(e) === t; e++)
    ;
  return e;
};
Ne.prototype.skipCharsBack = function(e, t, i) {
  if (e <= i)
    return e;
  for (; e > i; )
    if (t !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
Ne.prototype.getLines = function(e, t, i, n) {
  var r, o, a, l, c, d = e;
  if (e >= t)
    return "";
  if (d + 1 === t)
    return o = this.bMarks[d] + Math.min(this.tShift[d], i), a = n ? this.eMarks[d] + 1 : this.eMarks[d], this.src.slice(o, a);
  for (l = new Array(t - e), r = 0; d < t; d++, r++)
    c = this.tShift[d], c > i && (c = i), c < 0 && (c = 0), o = this.bMarks[d] + c, d + 1 < t || n ? a = this.eMarks[d] + 1 : a = this.eMarks[d], l[r] = this.src.slice(o, a);
  return l.join("");
};
function $s(s, e, t) {
  var i, n;
  if (s.tShift[e] - s.blkIndent < 4)
    return !1;
  for (n = i = e + 1; i < t; ) {
    if (s.isEmpty(i)) {
      i++;
      continue;
    }
    if (s.tShift[i] - s.blkIndent >= 4) {
      i++, n = i;
      continue;
    }
    break;
  }
  return s.line = i, s.tokens.push({
    type: "code",
    content: s.getLines(e, n, 4 + s.blkIndent, !0),
    block: !0,
    lines: [e, s.line],
    level: s.level
  }), !0;
}
function Ys(s, e, t, i) {
  var n, r, o, a, l, c = !1, d = s.bMarks[e] + s.tShift[e], u = s.eMarks[e];
  if (d + 3 > u || (n = s.src.charCodeAt(d), n !== 126 && n !== 96) || (l = d, d = s.skipChars(d, n), r = d - l, r < 3) || (o = s.src.slice(d, u).trim(), o.indexOf("`") >= 0))
    return !1;
  if (i)
    return !0;
  for (a = e; a++, !(a >= t || (d = l = s.bMarks[a] + s.tShift[a], u = s.eMarks[a], d < u && s.tShift[a] < s.blkIndent)); )
    if (s.src.charCodeAt(d) === n && !(s.tShift[a] - s.blkIndent >= 4) && (d = s.skipChars(d, n), !(d - l < r) && (d = s.skipSpaces(d), !(d < u)))) {
      c = !0;
      break;
    }
  return r = s.tShift[e], s.line = a + (c ? 1 : 0), s.tokens.push({
    type: "fence",
    params: o,
    content: s.getLines(e + 1, a, r, !0),
    lines: [e, s.line],
    level: s.level
  }), !0;
}
function Zs(s, e, t, i) {
  var n, r, o, a, l, c, d, u, h, p, g, m = s.bMarks[e] + s.tShift[e], E = s.eMarks[e];
  if (m > E || s.src.charCodeAt(m++) !== 62 || s.level >= s.options.maxNesting)
    return !1;
  if (i)
    return !0;
  for (s.src.charCodeAt(m) === 32 && m++, l = s.blkIndent, s.blkIndent = 0, a = [s.bMarks[e]], s.bMarks[e] = m, m = m < E ? s.skipSpaces(m) : m, r = m >= E, o = [s.tShift[e]], s.tShift[e] = m - s.bMarks[e], u = s.parser.ruler.getRules("blockquote"), n = e + 1; n < t && (m = s.bMarks[n] + s.tShift[n], E = s.eMarks[n], !(m >= E)); n++) {
    if (s.src.charCodeAt(m++) === 62) {
      s.src.charCodeAt(m) === 32 && m++, a.push(s.bMarks[n]), s.bMarks[n] = m, m = m < E ? s.skipSpaces(m) : m, r = m >= E, o.push(s.tShift[n]), s.tShift[n] = m - s.bMarks[n];
      continue;
    }
    if (r)
      break;
    for (g = !1, h = 0, p = u.length; h < p; h++)
      if (u[h](s, n, t, !0)) {
        g = !0;
        break;
      }
    if (g)
      break;
    a.push(s.bMarks[n]), o.push(s.tShift[n]), s.tShift[n] = -1337;
  }
  for (c = s.parentType, s.parentType = "blockquote", s.tokens.push({
    type: "blockquote_open",
    lines: d = [e, 0],
    level: s.level++
  }), s.parser.tokenize(s, e, n), s.tokens.push({
    type: "blockquote_close",
    level: --s.level
  }), s.parentType = c, d[1] = s.line, h = 0; h < o.length; h++)
    s.bMarks[h + e] = a[h], s.tShift[h + e] = o[h];
  return s.blkIndent = l, !0;
}
function Qs(s, e, t, i) {
  var n, r, o, a = s.bMarks[e], l = s.eMarks[e];
  if (a += s.tShift[e], a > l || (n = s.src.charCodeAt(a++), n !== 42 && n !== 45 && n !== 95))
    return !1;
  for (r = 1; a < l; ) {
    if (o = s.src.charCodeAt(a++), o !== n && o !== 32)
      return !1;
    o === n && r++;
  }
  return r < 3 ? !1 : (i || (s.line = e + 1, s.tokens.push({
    type: "hr",
    lines: [e, s.line],
    level: s.level
  })), !0);
}
function un(s, e) {
  var t, i, n;
  return i = s.bMarks[e] + s.tShift[e], n = s.eMarks[e], i >= n || (t = s.src.charCodeAt(i++), t !== 42 && t !== 45 && t !== 43) || i < n && s.src.charCodeAt(i) !== 32 ? -1 : i;
}
function hn(s, e) {
  var t, i = s.bMarks[e] + s.tShift[e], n = s.eMarks[e];
  if (i + 1 >= n || (t = s.src.charCodeAt(i++), t < 48 || t > 57))
    return -1;
  for (; ; ) {
    if (i >= n)
      return -1;
    if (t = s.src.charCodeAt(i++), !(t >= 48 && t <= 57)) {
      if (t === 41 || t === 46)
        break;
      return -1;
    }
  }
  return i < n && s.src.charCodeAt(i) !== 32 ? -1 : i;
}
function Xs(s, e) {
  var t, i, n = s.level + 2;
  for (t = e + 2, i = s.tokens.length - 2; t < i; t++)
    s.tokens[t].level === n && s.tokens[t].type === "paragraph_open" && (s.tokens[t + 2].tight = !0, s.tokens[t].tight = !0, t += 2);
}
function er(s, e, t, i) {
  var n, r, o, a, l, c, d, u, h, p, g, m, E, S, V, k, G, Q, oe = !0, X, N, Fe, xi;
  if ((u = hn(s, e)) >= 0)
    E = !0;
  else if ((u = un(s, e)) >= 0)
    E = !1;
  else
    return !1;
  if (s.level >= s.options.maxNesting)
    return !1;
  if (m = s.src.charCodeAt(u - 1), i)
    return !0;
  for (V = s.tokens.length, E ? (d = s.bMarks[e] + s.tShift[e], g = Number(s.src.substr(d, u - d - 1)), s.tokens.push({
    type: "ordered_list_open",
    order: g,
    lines: G = [e, 0],
    level: s.level++
  })) : s.tokens.push({
    type: "bullet_list_open",
    lines: G = [e, 0],
    level: s.level++
  }), n = e, k = !1, X = s.parser.ruler.getRules("list"); n < t && (S = s.skipSpaces(u), h = s.eMarks[n], S >= h ? p = 1 : p = S - u, p > 4 && (p = 1), p < 1 && (p = 1), r = u - s.bMarks[n] + p, s.tokens.push({
    type: "list_item_open",
    lines: Q = [e, 0],
    level: s.level++
  }), a = s.blkIndent, l = s.tight, o = s.tShift[e], c = s.parentType, s.tShift[e] = S - s.bMarks[e], s.blkIndent = r, s.tight = !0, s.parentType = "list", s.parser.tokenize(s, e, t, !0), (!s.tight || k) && (oe = !1), k = s.line - e > 1 && s.isEmpty(s.line - 1), s.blkIndent = a, s.tShift[e] = o, s.tight = l, s.parentType = c, s.tokens.push({
    type: "list_item_close",
    level: --s.level
  }), n = e = s.line, Q[1] = n, S = s.bMarks[e], !(n >= t || s.isEmpty(n) || s.tShift[n] < s.blkIndent)); ) {
    for (xi = !1, N = 0, Fe = X.length; N < Fe; N++)
      if (X[N](s, n, t, !0)) {
        xi = !0;
        break;
      }
    if (xi)
      break;
    if (E) {
      if (u = hn(s, n), u < 0)
        break;
    } else if (u = un(s, n), u < 0)
      break;
    if (m !== s.src.charCodeAt(u - 1))
      break;
  }
  return s.tokens.push({
    type: E ? "ordered_list_close" : "bullet_list_close",
    level: --s.level
  }), G[1] = n, s.line = n, oe && Xs(s, V), !0;
}
function tr(s, e, t, i) {
  var n, r, o, a, l, c = s.bMarks[e] + s.tShift[e], d = s.eMarks[e];
  if (c + 4 > d || s.src.charCodeAt(c) !== 91 || s.src.charCodeAt(c + 1) !== 94 || s.level >= s.options.maxNesting)
    return !1;
  for (a = c + 2; a < d; a++) {
    if (s.src.charCodeAt(a) === 32)
      return !1;
    if (s.src.charCodeAt(a) === 93)
      break;
  }
  return a === c + 2 || a + 1 >= d || s.src.charCodeAt(++a) !== 58 ? !1 : (i || (a++, s.env.footnotes || (s.env.footnotes = {}), s.env.footnotes.refs || (s.env.footnotes.refs = {}), l = s.src.slice(c + 2, a - 2), s.env.footnotes.refs[":" + l] = -1, s.tokens.push({
    type: "footnote_reference_open",
    label: l,
    level: s.level++
  }), n = s.bMarks[e], r = s.tShift[e], o = s.parentType, s.tShift[e] = s.skipSpaces(a) - a, s.bMarks[e] = a, s.blkIndent += 4, s.parentType = "footnote", s.tShift[e] < s.blkIndent && (s.tShift[e] += s.blkIndent, s.bMarks[e] -= s.blkIndent), s.parser.tokenize(s, e, t, !0), s.parentType = o, s.blkIndent -= 4, s.tShift[e] = r, s.bMarks[e] = n, s.tokens.push({
    type: "footnote_reference_close",
    level: --s.level
  })), !0);
}
function ir(s, e, t, i) {
  var n, r, o, a = s.bMarks[e] + s.tShift[e], l = s.eMarks[e];
  if (a >= l || (n = s.src.charCodeAt(a), n !== 35 || a >= l))
    return !1;
  for (r = 1, n = s.src.charCodeAt(++a); n === 35 && a < l && r <= 6; )
    r++, n = s.src.charCodeAt(++a);
  return r > 6 || a < l && n !== 32 ? !1 : (i || (l = s.skipCharsBack(l, 32, a), o = s.skipCharsBack(l, 35, a), o > a && s.src.charCodeAt(o - 1) === 32 && (l = o), s.line = e + 1, s.tokens.push({
    type: "heading_open",
    hLevel: r,
    lines: [e, s.line],
    level: s.level
  }), a < l && s.tokens.push({
    type: "inline",
    content: s.src.slice(a, l).trim(),
    level: s.level + 1,
    lines: [e, s.line],
    children: []
  }), s.tokens.push({ type: "heading_close", hLevel: r, level: s.level })), !0);
}
function nr(s, e, t) {
  var i, n, r, o = e + 1;
  return o >= t || s.tShift[o] < s.blkIndent || s.tShift[o] - s.blkIndent > 3 || (n = s.bMarks[o] + s.tShift[o], r = s.eMarks[o], n >= r) || (i = s.src.charCodeAt(n), i !== 45 && i !== 61) || (n = s.skipChars(n, i), n = s.skipSpaces(n), n < r) ? !1 : (n = s.bMarks[e] + s.tShift[e], s.line = o + 1, s.tokens.push({
    type: "heading_open",
    hLevel: i === 61 ? 1 : 2,
    lines: [e, s.line],
    level: s.level
  }), s.tokens.push({
    type: "inline",
    content: s.src.slice(n, s.eMarks[e]).trim(),
    level: s.level + 1,
    lines: [e, s.line - 1],
    children: []
  }), s.tokens.push({
    type: "heading_close",
    hLevel: i === 61 ? 1 : 2,
    level: s.level
  }), !0);
}
var Qn = {};
[
  "article",
  "aside",
  "button",
  "blockquote",
  "body",
  "canvas",
  "caption",
  "col",
  "colgroup",
  "dd",
  "div",
  "dl",
  "dt",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "hr",
  "iframe",
  "li",
  "map",
  "object",
  "ol",
  "output",
  "p",
  "pre",
  "progress",
  "script",
  "section",
  "style",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "tr",
  "thead",
  "ul",
  "video"
].forEach(function(s) {
  Qn[s] = !0;
});
var sr = /^<([a-zA-Z]{1,15})[\s\/>]/, rr = /^<\/([a-zA-Z]{1,15})[\s>]/;
function or(s) {
  var e = s | 32;
  return e >= 97 && e <= 122;
}
function ar(s, e, t, i) {
  var n, r, o, a = s.bMarks[e], l = s.eMarks[e], c = s.tShift[e];
  if (a += c, !s.options.html || c > 3 || a + 2 >= l || s.src.charCodeAt(a) !== 60)
    return !1;
  if (n = s.src.charCodeAt(a + 1), n === 33 || n === 63) {
    if (i)
      return !0;
  } else if (n === 47 || or(n)) {
    if (n === 47) {
      if (r = s.src.slice(a, l).match(rr), !r)
        return !1;
    } else if (r = s.src.slice(a, l).match(sr), !r)
      return !1;
    if (Qn[r[1].toLowerCase()] !== !0)
      return !1;
    if (i)
      return !0;
  } else
    return !1;
  for (o = e + 1; o < s.lineMax && !s.isEmpty(o); )
    o++;
  return s.line = o, s.tokens.push({
    type: "htmlblock",
    level: s.level,
    lines: [e, s.line],
    content: s.getLines(e, o, 0, !0)
  }), !0;
}
function wi(s, e) {
  var t = s.bMarks[e] + s.blkIndent, i = s.eMarks[e];
  return s.src.substr(t, i - t);
}
function lr(s, e, t, i) {
  var n, r, o, a, l, c, d, u, h, p, g;
  if (e + 2 > t || (l = e + 1, s.tShift[l] < s.blkIndent) || (o = s.bMarks[l] + s.tShift[l], o >= s.eMarks[l]) || (n = s.src.charCodeAt(o), n !== 124 && n !== 45 && n !== 58) || (r = wi(s, e + 1), !/^[-:| ]+$/.test(r)) || (c = r.split("|"), c <= 2))
    return !1;
  for (u = [], a = 0; a < c.length; a++) {
    if (h = c[a].trim(), !h) {
      if (a === 0 || a === c.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(h))
      return !1;
    h.charCodeAt(h.length - 1) === 58 ? u.push(h.charCodeAt(0) === 58 ? "center" : "right") : h.charCodeAt(0) === 58 ? u.push("left") : u.push("");
  }
  if (r = wi(s, e).trim(), r.indexOf("|") === -1 || (c = r.replace(/^\||\|$/g, "").split("|"), u.length !== c.length))
    return !1;
  if (i)
    return !0;
  for (s.tokens.push({
    type: "table_open",
    lines: p = [e, 0],
    level: s.level++
  }), s.tokens.push({
    type: "thead_open",
    lines: [e, e + 1],
    level: s.level++
  }), s.tokens.push({
    type: "tr_open",
    lines: [e, e + 1],
    level: s.level++
  }), a = 0; a < c.length; a++)
    s.tokens.push({
      type: "th_open",
      align: u[a],
      lines: [e, e + 1],
      level: s.level++
    }), s.tokens.push({
      type: "inline",
      content: c[a].trim(),
      lines: [e, e + 1],
      level: s.level,
      children: []
    }), s.tokens.push({ type: "th_close", level: --s.level });
  for (s.tokens.push({ type: "tr_close", level: --s.level }), s.tokens.push({ type: "thead_close", level: --s.level }), s.tokens.push({
    type: "tbody_open",
    lines: g = [e + 2, 0],
    level: s.level++
  }), l = e + 2; l < t && !(s.tShift[l] < s.blkIndent || (r = wi(s, l).trim(), r.indexOf("|") === -1)); l++) {
    for (c = r.replace(/^\||\|$/g, "").split("|"), s.tokens.push({ type: "tr_open", level: s.level++ }), a = 0; a < c.length; a++)
      s.tokens.push({ type: "td_open", align: u[a], level: s.level++ }), d = c[a].substring(
        c[a].charCodeAt(0) === 124 ? 1 : 0,
        c[a].charCodeAt(c[a].length - 1) === 124 ? c[a].length - 1 : c[a].length
      ).trim(), s.tokens.push({
        type: "inline",
        content: d,
        level: s.level,
        children: []
      }), s.tokens.push({ type: "td_close", level: --s.level });
    s.tokens.push({ type: "tr_close", level: --s.level });
  }
  return s.tokens.push({ type: "tbody_close", level: --s.level }), s.tokens.push({ type: "table_close", level: --s.level }), p[1] = g[1] = l, s.line = l, !0;
}
function It(s, e) {
  var t, i, n = s.bMarks[e] + s.tShift[e], r = s.eMarks[e];
  return n >= r || (i = s.src.charCodeAt(n++), i !== 126 && i !== 58) || (t = s.skipSpaces(n), n === t) || t >= r ? -1 : t;
}
function cr(s, e) {
  var t, i, n = s.level + 2;
  for (t = e + 2, i = s.tokens.length - 2; t < i; t++)
    s.tokens[t].level === n && s.tokens[t].type === "paragraph_open" && (s.tokens[t + 2].tight = !0, s.tokens[t].tight = !0, t += 2);
}
function dr(s, e, t, i) {
  var n, r, o, a, l, c, d, u, h, p, g, m, E, S;
  if (i)
    return s.ddIndent < 0 ? !1 : It(s, e) >= 0;
  if (d = e + 1, s.isEmpty(d) && ++d > t || s.tShift[d] < s.blkIndent || (n = It(s, d), n < 0) || s.level >= s.options.maxNesting)
    return !1;
  c = s.tokens.length, s.tokens.push({
    type: "dl_open",
    lines: l = [e, 0],
    level: s.level++
  }), o = e, r = d;
  e:
    for (; ; ) {
      for (S = !0, E = !1, s.tokens.push({
        type: "dt_open",
        lines: [o, o],
        level: s.level++
      }), s.tokens.push({
        type: "inline",
        content: s.getLines(o, o + 1, s.blkIndent, !1).trim(),
        level: s.level + 1,
        lines: [o, o],
        children: []
      }), s.tokens.push({
        type: "dt_close",
        level: --s.level
      }); ; ) {
        if (s.tokens.push({
          type: "dd_open",
          lines: a = [d, 0],
          level: s.level++
        }), m = s.tight, h = s.ddIndent, u = s.blkIndent, g = s.tShift[r], p = s.parentType, s.blkIndent = s.ddIndent = s.tShift[r] + 2, s.tShift[r] = n - s.bMarks[r], s.tight = !0, s.parentType = "deflist", s.parser.tokenize(s, r, t, !0), (!s.tight || E) && (S = !1), E = s.line - r > 1 && s.isEmpty(s.line - 1), s.tShift[r] = g, s.tight = m, s.parentType = p, s.blkIndent = u, s.ddIndent = h, s.tokens.push({
          type: "dd_close",
          level: --s.level
        }), a[1] = d = s.line, d >= t || s.tShift[d] < s.blkIndent)
          break e;
        if (n = It(s, d), n < 0)
          break;
        r = d;
      }
      if (d >= t || (o = d, s.isEmpty(o)) || s.tShift[o] < s.blkIndent || (r = o + 1, r >= t) || (s.isEmpty(r) && r++, r >= t) || s.tShift[r] < s.blkIndent || (n = It(s, r), n < 0))
        break;
    }
  return s.tokens.push({
    type: "dl_close",
    level: --s.level
  }), l[1] = d, s.line = d, S && cr(s, c), !0;
}
function ur(s, e) {
  var t, i, n, r, o, a = e + 1, l;
  if (t = s.lineMax, a < t && !s.isEmpty(a)) {
    for (l = s.parser.ruler.getRules("paragraph"); a < t && !s.isEmpty(a); a++)
      if (!(s.tShift[a] - s.blkIndent > 3)) {
        for (n = !1, r = 0, o = l.length; r < o; r++)
          if (l[r](s, a, t, !0)) {
            n = !0;
            break;
          }
        if (n)
          break;
      }
  }
  return i = s.getLines(e, a, s.blkIndent, !1).trim(), s.line = a, i.length && (s.tokens.push({
    type: "paragraph_open",
    tight: !1,
    lines: [e, s.line],
    level: s.level
  }), s.tokens.push({
    type: "inline",
    content: i,
    level: s.level + 1,
    lines: [e, s.line],
    children: []
  }), s.tokens.push({
    type: "paragraph_close",
    tight: !1,
    level: s.level
  })), !0;
}
var Lt = [
  ["code", $s],
  ["fences", Ys, ["paragraph", "blockquote", "list"]],
  ["blockquote", Zs, ["paragraph", "blockquote", "list"]],
  ["hr", Qs, ["paragraph", "blockquote", "list"]],
  ["list", er, ["paragraph", "blockquote"]],
  ["footnote", tr, ["paragraph"]],
  ["heading", ir, ["paragraph", "blockquote"]],
  ["lheading", nr],
  ["htmlblock", ar, ["paragraph", "blockquote"]],
  ["table", lr, ["paragraph"]],
  ["deflist", dr, ["paragraph"]],
  ["paragraph", ur]
];
function Vi() {
  this.ruler = new H();
  for (var s = 0; s < Lt.length; s++)
    this.ruler.push(Lt[s][0], Lt[s][1], {
      alt: (Lt[s][2] || []).slice()
    });
}
Vi.prototype.tokenize = function(s, e, t) {
  for (var i = this.ruler.getRules(""), n = i.length, r = e, o = !1, a, l; r < t && (s.line = r = s.skipEmptyLines(r), !(r >= t || s.tShift[r] < s.blkIndent)); ) {
    for (l = 0; l < n && (a = i[l](s, r, t, !1), !a); l++)
      ;
    if (s.tight = !o, s.isEmpty(s.line - 1) && (o = !0), r = s.line, r < t && s.isEmpty(r)) {
      if (o = !0, r++, r < t && s.parentType === "list" && s.isEmpty(r))
        break;
      s.line = r;
    }
  }
};
var hr = /[\n\t]/g, pr = /\r[\n\u0085]|[\u2424\u2028\u0085]/g, fr = /\u00a0/g;
Vi.prototype.parse = function(s, e, t, i) {
  var n, r = 0, o = 0;
  if (!s)
    return [];
  s = s.replace(fr, " "), s = s.replace(pr, `
`), s.indexOf("	") >= 0 && (s = s.replace(hr, function(a, l) {
    var c;
    return s.charCodeAt(l) === 10 ? (r = l + 1, o = 0, a) : (c = "    ".slice((l - r - o) % 4), o = l - r + 1, c);
  })), n = new Ne(s, this, e, t, i), this.tokenize(n, n.line, n.lineMax);
};
function mr(s) {
  switch (s) {
    case 10:
    case 92:
    case 96:
    case 42:
    case 95:
    case 94:
    case 91:
    case 93:
    case 33:
    case 38:
    case 60:
    case 62:
    case 123:
    case 125:
    case 36:
    case 37:
    case 64:
    case 126:
    case 43:
    case 61:
    case 58:
      return !0;
    default:
      return !1;
  }
}
function gr(s, e) {
  for (var t = s.pos; t < s.posMax && !mr(s.src.charCodeAt(t)); )
    t++;
  return t === s.pos ? !1 : (e || (s.pending += s.src.slice(s.pos, t)), s.pos = t, !0);
}
function br(s, e) {
  var t, i, n = s.pos;
  if (s.src.charCodeAt(n) !== 10)
    return !1;
  if (t = s.pending.length - 1, i = s.posMax, !e)
    if (t >= 0 && s.pending.charCodeAt(t) === 32)
      if (t >= 1 && s.pending.charCodeAt(t - 1) === 32) {
        for (var r = t - 2; r >= 0; r--)
          if (s.pending.charCodeAt(r) !== 32) {
            s.pending = s.pending.substring(0, r + 1);
            break;
          }
        s.push({
          type: "hardbreak",
          level: s.level
        });
      } else
        s.pending = s.pending.slice(0, -1), s.push({
          type: "softbreak",
          level: s.level
        });
    else
      s.push({
        type: "softbreak",
        level: s.level
      });
  for (n++; n < i && s.src.charCodeAt(n) === 32; )
    n++;
  return s.pos = n, !0;
}
var Gi = [];
for (var pn = 0; pn < 256; pn++)
  Gi.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(s) {
  Gi[s.charCodeAt(0)] = 1;
});
function vr(s, e) {
  var t, i = s.pos, n = s.posMax;
  if (s.src.charCodeAt(i) !== 92)
    return !1;
  if (i++, i < n) {
    if (t = s.src.charCodeAt(i), t < 256 && Gi[t] !== 0)
      return e || (s.pending += s.src[i]), s.pos += 2, !0;
    if (t === 10) {
      for (e || s.push({
        type: "hardbreak",
        level: s.level
      }), i++; i < n && s.src.charCodeAt(i) === 32; )
        i++;
      return s.pos = i, !0;
    }
  }
  return e || (s.pending += "\\"), s.pos++, !0;
}
function yr(s, e) {
  var t, i, n, r, o, a = s.pos, l = s.src.charCodeAt(a);
  if (l !== 96)
    return !1;
  for (t = a, a++, i = s.posMax; a < i && s.src.charCodeAt(a) === 96; )
    a++;
  for (n = s.src.slice(t, a), r = o = a; (r = s.src.indexOf("`", o)) !== -1; ) {
    for (o = r + 1; o < i && s.src.charCodeAt(o) === 96; )
      o++;
    if (o - r === n.length)
      return e || s.push({
        type: "code",
        content: s.src.slice(a, r).replace(/[ \n]+/g, " ").trim(),
        block: !1,
        level: s.level
      }), s.pos = o, !0;
  }
  return e || (s.pending += n), s.pos += n.length, !0;
}
function xr(s, e) {
  var t, i, n, r = s.posMax, o = s.pos, a, l;
  if (s.src.charCodeAt(o) !== 126 || e || o + 4 >= r || s.src.charCodeAt(o + 1) !== 126 || s.level >= s.options.maxNesting || (a = o > 0 ? s.src.charCodeAt(o - 1) : -1, l = s.src.charCodeAt(o + 2), a === 126) || l === 126 || l === 32 || l === 10)
    return !1;
  for (i = o + 2; i < r && s.src.charCodeAt(i) === 126; )
    i++;
  if (i > o + 3)
    return s.pos += i - o, e || (s.pending += s.src.slice(o, i)), !0;
  for (s.pos = o + 2, n = 1; s.pos + 1 < r; ) {
    if (s.src.charCodeAt(s.pos) === 126 && s.src.charCodeAt(s.pos + 1) === 126 && (a = s.src.charCodeAt(s.pos - 1), l = s.pos + 2 < r ? s.src.charCodeAt(s.pos + 2) : -1, l !== 126 && a !== 126 && (a !== 32 && a !== 10 ? n-- : l !== 32 && l !== 10 && n++, n <= 0))) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return t ? (s.posMax = s.pos, s.pos = o + 2, e || (s.push({ type: "del_open", level: s.level++ }), s.parser.tokenize(s), s.push({ type: "del_close", level: --s.level })), s.pos = s.posMax + 2, s.posMax = r, !0) : (s.pos = o, !1);
}
function Er(s, e) {
  var t, i, n, r = s.posMax, o = s.pos, a, l;
  if (s.src.charCodeAt(o) !== 43 || e || o + 4 >= r || s.src.charCodeAt(o + 1) !== 43 || s.level >= s.options.maxNesting || (a = o > 0 ? s.src.charCodeAt(o - 1) : -1, l = s.src.charCodeAt(o + 2), a === 43) || l === 43 || l === 32 || l === 10)
    return !1;
  for (i = o + 2; i < r && s.src.charCodeAt(i) === 43; )
    i++;
  if (i !== o + 2)
    return s.pos += i - o, e || (s.pending += s.src.slice(o, i)), !0;
  for (s.pos = o + 2, n = 1; s.pos + 1 < r; ) {
    if (s.src.charCodeAt(s.pos) === 43 && s.src.charCodeAt(s.pos + 1) === 43 && (a = s.src.charCodeAt(s.pos - 1), l = s.pos + 2 < r ? s.src.charCodeAt(s.pos + 2) : -1, l !== 43 && a !== 43 && (a !== 32 && a !== 10 ? n-- : l !== 32 && l !== 10 && n++, n <= 0))) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return t ? (s.posMax = s.pos, s.pos = o + 2, e || (s.push({ type: "ins_open", level: s.level++ }), s.parser.tokenize(s), s.push({ type: "ins_close", level: --s.level })), s.pos = s.posMax + 2, s.posMax = r, !0) : (s.pos = o, !1);
}
function Sr(s, e) {
  var t, i, n, r = s.posMax, o = s.pos, a, l;
  if (s.src.charCodeAt(o) !== 61 || e || o + 4 >= r || s.src.charCodeAt(o + 1) !== 61 || s.level >= s.options.maxNesting || (a = o > 0 ? s.src.charCodeAt(o - 1) : -1, l = s.src.charCodeAt(o + 2), a === 61) || l === 61 || l === 32 || l === 10)
    return !1;
  for (i = o + 2; i < r && s.src.charCodeAt(i) === 61; )
    i++;
  if (i !== o + 2)
    return s.pos += i - o, e || (s.pending += s.src.slice(o, i)), !0;
  for (s.pos = o + 2, n = 1; s.pos + 1 < r; ) {
    if (s.src.charCodeAt(s.pos) === 61 && s.src.charCodeAt(s.pos + 1) === 61 && (a = s.src.charCodeAt(s.pos - 1), l = s.pos + 2 < r ? s.src.charCodeAt(s.pos + 2) : -1, l !== 61 && a !== 61 && (a !== 32 && a !== 10 ? n-- : l !== 32 && l !== 10 && n++, n <= 0))) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return t ? (s.posMax = s.pos, s.pos = o + 2, e || (s.push({ type: "mark_open", level: s.level++ }), s.parser.tokenize(s), s.push({ type: "mark_close", level: --s.level })), s.pos = s.posMax + 2, s.posMax = r, !0) : (s.pos = o, !1);
}
function fn(s) {
  return s >= 48 && s <= 57 || s >= 65 && s <= 90 || s >= 97 && s <= 122;
}
function mn(s, e) {
  var t = e, i, n, r, o = !0, a = !0, l = s.posMax, c = s.src.charCodeAt(e);
  for (i = e > 0 ? s.src.charCodeAt(e - 1) : -1; t < l && s.src.charCodeAt(t) === c; )
    t++;
  return t >= l && (o = !1), r = t - e, r >= 4 ? o = a = !1 : (n = t < l ? s.src.charCodeAt(t) : -1, (n === 32 || n === 10) && (o = !1), (i === 32 || i === 10) && (a = !1), c === 95 && (fn(i) && (o = !1), fn(n) && (a = !1))), {
    can_open: o,
    can_close: a,
    delims: r
  };
}
function _r(s, e) {
  var t, i, n, r, o, a, l, c = s.posMax, d = s.pos, u = s.src.charCodeAt(d);
  if (u !== 95 && u !== 42 || e)
    return !1;
  if (l = mn(s, d), t = l.delims, !l.can_open)
    return s.pos += t, e || (s.pending += s.src.slice(d, s.pos)), !0;
  if (s.level >= s.options.maxNesting)
    return !1;
  for (s.pos = d + t, a = [t]; s.pos < c; ) {
    if (s.src.charCodeAt(s.pos) === u) {
      if (l = mn(s, s.pos), i = l.delims, l.can_close) {
        for (r = a.pop(), o = i; r !== o; ) {
          if (o < r) {
            a.push(r - o);
            break;
          }
          if (o -= r, a.length === 0)
            break;
          s.pos += r, r = a.pop();
        }
        if (a.length === 0) {
          t = r, n = !0;
          break;
        }
        s.pos += i;
        continue;
      }
      l.can_open && a.push(i), s.pos += i;
      continue;
    }
    s.parser.skipToken(s);
  }
  return n ? (s.posMax = s.pos, s.pos = d + t, e || ((t === 2 || t === 3) && s.push({ type: "strong_open", level: s.level++ }), (t === 1 || t === 3) && s.push({ type: "em_open", level: s.level++ }), s.parser.tokenize(s), (t === 1 || t === 3) && s.push({ type: "em_close", level: --s.level }), (t === 2 || t === 3) && s.push({ type: "strong_close", level: --s.level })), s.pos = s.posMax + t, s.posMax = c, !0) : (s.pos = d, !1);
}
var wr = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Mr(s, e) {
  var t, i, n = s.posMax, r = s.pos;
  if (s.src.charCodeAt(r) !== 126 || e || r + 2 >= n || s.level >= s.options.maxNesting)
    return !1;
  for (s.pos = r + 1; s.pos < n; ) {
    if (s.src.charCodeAt(s.pos) === 126) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return !t || r + 1 === s.pos || (i = s.src.slice(r + 1, s.pos), i.match(/(^|[^\\])(\\\\)*\s/)) ? (s.pos = r, !1) : (s.posMax = s.pos, s.pos = r + 1, e || s.push({
    type: "sub",
    level: s.level,
    content: i.replace(wr, "$1")
  }), s.pos = s.posMax + 1, s.posMax = n, !0);
}
var Tr = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Cr(s, e) {
  var t, i, n = s.posMax, r = s.pos;
  if (s.src.charCodeAt(r) !== 94 || e || r + 2 >= n || s.level >= s.options.maxNesting)
    return !1;
  for (s.pos = r + 1; s.pos < n; ) {
    if (s.src.charCodeAt(s.pos) === 94) {
      t = !0;
      break;
    }
    s.parser.skipToken(s);
  }
  return !t || r + 1 === s.pos || (i = s.src.slice(r + 1, s.pos), i.match(/(^|[^\\])(\\\\)*\s/)) ? (s.pos = r, !1) : (s.posMax = s.pos, s.pos = r + 1, e || s.push({
    type: "sup",
    level: s.level,
    content: i.replace(Tr, "$1")
  }), s.pos = s.posMax + 1, s.posMax = n, !0);
}
function Ar(s, e) {
  var t, i, n, r, o, a, l, c, d = !1, u = s.pos, h = s.posMax, p = s.pos, g = s.src.charCodeAt(p);
  if (g === 33 && (d = !0, g = s.src.charCodeAt(++p)), g !== 91 || s.level >= s.options.maxNesting || (t = p + 1, i = mt(s, p), i < 0))
    return !1;
  if (a = i + 1, a < h && s.src.charCodeAt(a) === 40) {
    for (a++; a < h && (c = s.src.charCodeAt(a), !(c !== 32 && c !== 10)); a++)
      ;
    if (a >= h)
      return !1;
    for (p = a, Jn(s, a) ? (r = s.linkContent, a = s.pos) : r = "", p = a; a < h && (c = s.src.charCodeAt(a), !(c !== 32 && c !== 10)); a++)
      ;
    if (a < h && p !== a && $n(s, a))
      for (o = s.linkContent, a = s.pos; a < h && (c = s.src.charCodeAt(a), !(c !== 32 && c !== 10)); a++)
        ;
    else
      o = "";
    if (a >= h || s.src.charCodeAt(a) !== 41)
      return s.pos = u, !1;
    a++;
  } else {
    if (s.linkLevel > 0)
      return !1;
    for (; a < h && (c = s.src.charCodeAt(a), !(c !== 32 && c !== 10)); a++)
      ;
    if (a < h && s.src.charCodeAt(a) === 91 && (p = a + 1, a = mt(s, a), a >= 0 ? n = s.src.slice(p, a++) : a = p - 1), n || (typeof n > "u" && (a = i + 1), n = s.src.slice(t, i)), l = s.env.references[Yn(n)], !l)
      return s.pos = u, !1;
    r = l.href, o = l.title;
  }
  return e || (s.pos = t, s.posMax = i, d ? s.push({
    type: "image",
    src: r,
    title: o,
    alt: s.src.substr(t, i - t),
    level: s.level
  }) : (s.push({
    type: "link_open",
    href: r,
    title: o,
    level: s.level++
  }), s.linkLevel++, s.parser.tokenize(s), s.linkLevel--, s.push({ type: "link_close", level: --s.level }))), s.pos = a, s.posMax = h, !0;
}
function kr(s, e) {
  var t, i, n, r, o = s.posMax, a = s.pos;
  return a + 2 >= o || s.src.charCodeAt(a) !== 94 || s.src.charCodeAt(a + 1) !== 91 || s.level >= s.options.maxNesting || (t = a + 2, i = mt(s, a + 1), i < 0) ? !1 : (e || (s.env.footnotes || (s.env.footnotes = {}), s.env.footnotes.list || (s.env.footnotes.list = []), n = s.env.footnotes.list.length, s.pos = t, s.posMax = i, s.push({
    type: "footnote_ref",
    id: n,
    level: s.level
  }), s.linkLevel++, r = s.tokens.length, s.parser.tokenize(s), s.env.footnotes.list[n] = { tokens: s.tokens.splice(r) }, s.linkLevel--), s.pos = i + 1, s.posMax = o, !0);
}
function Ir(s, e) {
  var t, i, n, r, o = s.posMax, a = s.pos;
  if (a + 3 > o || !s.env.footnotes || !s.env.footnotes.refs || s.src.charCodeAt(a) !== 91 || s.src.charCodeAt(a + 1) !== 94 || s.level >= s.options.maxNesting)
    return !1;
  for (i = a + 2; i < o; i++) {
    if (s.src.charCodeAt(i) === 32 || s.src.charCodeAt(i) === 10)
      return !1;
    if (s.src.charCodeAt(i) === 93)
      break;
  }
  return i === a + 2 || i >= o || (i++, t = s.src.slice(a + 2, i - 1), typeof s.env.footnotes.refs[":" + t] > "u") ? !1 : (e || (s.env.footnotes.list || (s.env.footnotes.list = []), s.env.footnotes.refs[":" + t] < 0 ? (n = s.env.footnotes.list.length, s.env.footnotes.list[n] = { label: t, count: 0 }, s.env.footnotes.refs[":" + t] = n) : n = s.env.footnotes.refs[":" + t], r = s.env.footnotes.list[n].count, s.env.footnotes.list[n].count++, s.push({
    type: "footnote_ref",
    id: n,
    subId: r,
    level: s.level
  })), s.pos = i, s.posMax = o, !0);
}
var Lr = [
  "coap",
  "doi",
  "javascript",
  "aaa",
  "aaas",
  "about",
  "acap",
  "cap",
  "cid",
  "crid",
  "data",
  "dav",
  "dict",
  "dns",
  "file",
  "ftp",
  "geo",
  "go",
  "gopher",
  "h323",
  "http",
  "https",
  "iax",
  "icap",
  "im",
  "imap",
  "info",
  "ipp",
  "iris",
  "iris.beep",
  "iris.xpc",
  "iris.xpcs",
  "iris.lwz",
  "ldap",
  "mailto",
  "mid",
  "msrp",
  "msrps",
  "mtqp",
  "mupdate",
  "news",
  "nfs",
  "ni",
  "nih",
  "nntp",
  "opaquelocktoken",
  "pop",
  "pres",
  "rtsp",
  "service",
  "session",
  "shttp",
  "sieve",
  "sip",
  "sips",
  "sms",
  "snmp",
  "soap.beep",
  "soap.beeps",
  "tag",
  "tel",
  "telnet",
  "tftp",
  "thismessage",
  "tn3270",
  "tip",
  "tv",
  "urn",
  "vemmi",
  "ws",
  "wss",
  "xcon",
  "xcon-userid",
  "xmlrpc.beep",
  "xmlrpc.beeps",
  "xmpp",
  "z39.50r",
  "z39.50s",
  "adiumxtra",
  "afp",
  "afs",
  "aim",
  "apt",
  "attachment",
  "aw",
  "beshare",
  "bitcoin",
  "bolo",
  "callto",
  "chrome",
  "chrome-extension",
  "com-eventbrite-attendee",
  "content",
  "cvs",
  "dlna-playsingle",
  "dlna-playcontainer",
  "dtn",
  "dvb",
  "ed2k",
  "facetime",
  "feed",
  "finger",
  "fish",
  "gg",
  "git",
  "gizmoproject",
  "gtalk",
  "hcp",
  "icon",
  "ipn",
  "irc",
  "irc6",
  "ircs",
  "itms",
  "jar",
  "jms",
  "keyparc",
  "lastfm",
  "ldaps",
  "magnet",
  "maps",
  "market",
  "message",
  "mms",
  "ms-help",
  "msnim",
  "mumble",
  "mvn",
  "notes",
  "oid",
  "palm",
  "paparazzi",
  "platform",
  "proxy",
  "psyc",
  "query",
  "res",
  "resource",
  "rmi",
  "rsync",
  "rtmp",
  "secondlife",
  "sftp",
  "sgn",
  "skype",
  "smb",
  "soldat",
  "spotify",
  "ssh",
  "steam",
  "svn",
  "teamspeak",
  "things",
  "udp",
  "unreal",
  "ut2004",
  "ventrilo",
  "view-source",
  "webcal",
  "wtai",
  "wyciwyg",
  "xfire",
  "xri",
  "ymsgr"
], Rr = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/, Or = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
function Nr(s, e) {
  var t, i, n, r, o, a = s.pos;
  return s.src.charCodeAt(a) !== 60 || (t = s.src.slice(a), t.indexOf(">") < 0) ? !1 : (i = t.match(Or), i ? Lr.indexOf(i[1].toLowerCase()) < 0 || (r = i[0].slice(1, -1), o = Ni(r), !s.parser.validateLink(r)) ? !1 : (e || (s.push({
    type: "link_open",
    href: o,
    level: s.level
  }), s.push({
    type: "text",
    content: r,
    level: s.level + 1
  }), s.push({ type: "link_close", level: s.level })), s.pos += i[0].length, !0) : (n = t.match(Rr), n ? (r = n[0].slice(1, -1), o = Ni("mailto:" + r), s.parser.validateLink(o) ? (e || (s.push({
    type: "link_open",
    href: o,
    level: s.level
  }), s.push({
    type: "text",
    content: r,
    level: s.level + 1
  }), s.push({ type: "link_close", level: s.level })), s.pos += n[0].length, !0) : !1) : !1));
}
function ti(s, e) {
  return s = s.source, e = e || "", function t(i, n) {
    return i ? (n = n.source || n, s = s.replace(i, n), t) : new RegExp(s, e);
  };
}
var Pr = /[a-zA-Z_:][a-zA-Z0-9:._-]*/, Dr = /[^"'=<>`\x00-\x20]+/, jr = /'[^']*'/, Br = /"[^"]*"/, Fr = ti(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", Dr)("single_quoted", jr)("double_quoted", Br)(), zr = ti(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", Pr)("attr_value", Fr)(), qr = ti(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", zr)(), Ur = /<\/[A-Za-z][A-Za-z0-9]*\s*>/, Hr = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/, Vr = /<[?].*?[?]>/, Gr = /<![A-Z]+\s+[^>]*>/, Wr = /<!\[CDATA\[[\s\S]*?\]\]>/, Kr = ti(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", qr)("close_tag", Ur)("comment", Hr)("processing", Vr)("declaration", Gr)("cdata", Wr)();
function Jr(s) {
  var e = s | 32;
  return e >= 97 && e <= 122;
}
function $r(s, e) {
  var t, i, n, r = s.pos;
  return !s.options.html || (n = s.posMax, s.src.charCodeAt(r) !== 60 || r + 2 >= n) || (t = s.src.charCodeAt(r + 1), t !== 33 && t !== 63 && t !== 47 && !Jr(t)) || (i = s.src.slice(r).match(Kr), !i) ? !1 : (e || s.push({
    type: "htmltag",
    content: s.src.slice(r, r + i[0].length),
    level: s.level
  }), s.pos += i[0].length, !0);
}
var Yr = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i, Zr = /^&([a-z][a-z0-9]{1,31});/i;
function Qr(s, e) {
  var t, i, n, r = s.pos, o = s.posMax;
  if (s.src.charCodeAt(r) !== 38)
    return !1;
  if (r + 1 < o) {
    if (t = s.src.charCodeAt(r + 1), t === 35) {
      if (n = s.src.slice(r).match(Yr), n)
        return e || (i = n[1][0].toLowerCase() === "x" ? parseInt(n[1].slice(1), 16) : parseInt(n[1], 10), s.pending += Wn(i) ? Oi(i) : Oi(65533)), s.pos += n[0].length, !0;
    } else if (n = s.src.slice(r).match(Zr), n) {
      var a = Vn(n[1]);
      if (n[1] !== a)
        return e || (s.pending += a), s.pos += n[0].length, !0;
    }
  }
  return e || (s.pending += "&"), s.pos++, !0;
}
var Mi = [
  ["text", gr],
  ["newline", br],
  ["escape", vr],
  ["backticks", yr],
  ["del", xr],
  ["ins", Er],
  ["mark", Sr],
  ["emphasis", _r],
  ["sub", Mr],
  ["sup", Cr],
  ["links", Ar],
  ["footnote_inline", kr],
  ["footnote_ref", Ir],
  ["autolink", Nr],
  ["htmltag", $r],
  ["entity", Qr]
];
function ii() {
  this.ruler = new H();
  for (var s = 0; s < Mi.length; s++)
    this.ruler.push(Mi[s][0], Mi[s][1]);
  this.validateLink = Xr;
}
ii.prototype.skipToken = function(s) {
  var e = this.ruler.getRules(""), t = e.length, i = s.pos, n, r;
  if ((r = s.cacheGet(i)) > 0) {
    s.pos = r;
    return;
  }
  for (n = 0; n < t; n++)
    if (e[n](s, !0)) {
      s.cacheSet(i, s.pos);
      return;
    }
  s.pos++, s.cacheSet(i, s.pos);
};
ii.prototype.tokenize = function(s) {
  for (var e = this.ruler.getRules(""), t = e.length, i = s.posMax, n, r; s.pos < i; ) {
    for (r = 0; r < t && (n = e[r](s, !1), !n); r++)
      ;
    if (n) {
      if (s.pos >= i)
        break;
      continue;
    }
    s.pending += s.src[s.pos++];
  }
  s.pending && s.pushPending();
};
ii.prototype.parse = function(s, e, t, i) {
  var n = new Oe(s, this, e, t, i);
  this.tokenize(n);
};
function Xr(s) {
  var e = ["vbscript", "javascript", "file", "data"], t = s.trim().toLowerCase();
  return t = Ie(t), !(t.indexOf(":") !== -1 && e.indexOf(t.split(":")[0]) !== -1);
}
var eo = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkTarget: "",
    // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",
    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "block",
        "inline",
        "references",
        "replacements",
        "smartquotes",
        "references",
        "abbr2",
        "footnote_tail"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fences",
        "footnote",
        "heading",
        "hr",
        "htmlblock",
        "lheading",
        "list",
        "paragraph",
        "table"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "del",
        "emphasis",
        "entity",
        "escape",
        "footnote_ref",
        "htmltag",
        "links",
        "newline",
        "text"
      ]
    }
  }
}, to = {
  options: {
    html: !1,
    // Enable HTML tags in source
    xhtmlOut: !1,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkTarget: "",
    // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",
    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    // Don't restrict core/block/inline rules
    core: {},
    block: {},
    inline: {}
  }
}, io = {
  options: {
    html: !0,
    // Enable HTML tags in source
    xhtmlOut: !0,
    // Use '/' to close single tags (<br />)
    breaks: !1,
    // Convert '\n' in paragraphs into <br>
    langPrefix: "language-",
    // CSS language prefix for fenced blocks
    linkTarget: "",
    // set target to open link in
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: "“”‘’",
    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    maxNesting: 20
    // Internal protection, recursion limit
  },
  components: {
    core: {
      rules: [
        "block",
        "inline",
        "references",
        "abbr2"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fences",
        "heading",
        "hr",
        "htmlblock",
        "lheading",
        "list",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "htmltag",
        "links",
        "newline",
        "text"
      ]
    }
  }
}, no = {
  default: eo,
  full: to,
  commonmark: io
};
function Xn(s, e, t) {
  this.src = e, this.env = t, this.options = s.options, this.tokens = [], this.inlineMode = !1, this.inline = s.inline, this.block = s.block, this.renderer = s.renderer, this.typographer = s.typographer;
}
function he(s, e) {
  typeof s != "string" && (e = s, s = "default"), e && e.linkify != null && console.warn(
    `linkify option is removed. Use linkify plugin instead:

import Remarkable from 'remarkable';
import linkify from 'remarkable/linkify';
new Remarkable().use(linkify)
`
  ), this.inline = new ii(), this.block = new Vi(), this.core = new Zn(), this.renderer = new Hi(), this.ruler = new H(), this.options = {}, this.configure(no[s]), this.set(e || {});
}
he.prototype.set = function(s) {
  Gn(this.options, s);
};
he.prototype.configure = function(s) {
  var e = this;
  if (!s)
    throw new Error("Wrong `remarkable` preset, check name/content");
  s.options && e.set(s.options), s.components && Object.keys(s.components).forEach(function(t) {
    s.components[t].rules && e[t].ruler.enable(s.components[t].rules, !0);
  });
};
he.prototype.use = function(s, e) {
  return s(this, e), this;
};
he.prototype.parse = function(s, e) {
  var t = new Xn(this, s, e);
  return this.core.process(t), t.tokens;
};
he.prototype.render = function(s, e) {
  return e = e || {}, this.renderer.render(this.parse(s, e), this.options, e);
};
he.prototype.parseInline = function(s, e) {
  var t = new Xn(this, s, e);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
he.prototype.renderInline = function(s, e) {
  return e = e || {}, this.renderer.render(this.parseInline(s, e), this.options, e);
};
class Pi {
  static createNew() {
    const e = window.hljs;
    return e ? new he({
      highlight: function(t, i) {
        if (i && e.getLanguage(i))
          try {
            return e.highlight(i, t).value;
          } catch {
            console.error("failed to setup the highlight dependency");
          }
        try {
          return e.highlightAuto(t).value;
        } catch {
          console.error("failed to automatically highlight messages");
        }
        return "";
      },
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "_blank",
      // set target to open in a new tab
      typographer: !0
      // Enable smartypants and other sweet transforms
    }) : new he({
      highlight: (t) => t,
      linkTarget: "_blank"
      // set target to open in a new tab
    });
  }
}
const es = class Pt {
  static addMessage(e, t, i, n) {
    var r;
    e.elementRef.appendChild(t.outerContainer), e.applyCustomStyles(t, n, !0, (r = e.messageStyles) == null ? void 0 : r[i]), e.elementRef.scrollTop = e.elementRef.scrollHeight;
  }
  static wrapInLink(e, t) {
    const i = document.createElement("a");
    return i.href = t, i.target = "_blank", i.appendChild(e), i;
  }
  static processContent(e, t) {
    return !t || t.startsWith("data") ? e : Pt.wrapInLink(e, t);
  }
  static waitToLoadThenScroll(e) {
    setTimeout(() => {
      e.scrollTop = e.scrollHeight;
    }, 60);
  }
  static scrollDownOnImageLoad(e, t) {
    if (e.startsWith("data"))
      Pt.waitToLoadThenScroll(t);
    else
      try {
        fetch(e, { mode: "no-cors" }).catch(() => {
        }).finally(() => {
          Pt.waitToLoadThenScroll(t);
        });
      } catch {
        t.scrollTop = t.scrollHeight;
      }
  }
  // The strategy is to emit the actual file reference in the `onNewMessage` event for the user to inspect it
  // But it is not actually used by anything in the chat, hence it is removed when adding a message
  // after the body has been stringified and parsed - the file reference will disappear, hence this readds it
  static reAddFileRefToObject(e, t) {
    var i;
    (i = e.files) == null || i.forEach((n, r) => {
      var o;
      n.ref && ((o = t.message.files) != null && o[r]) && (t.message.files[r].ref = n.ref);
    });
  }
  // the chat does not use the actual file
  static removeFileRef(e) {
    const t = { ...e };
    return delete t.ref, t;
  }
};
es.DEFAULT_FILE_NAME = "file";
let ne = es;
class jt {
  static onNewMessage(e, t, i) {
    const n = JSON.parse(JSON.stringify({ message: t, isInitial: i }));
    ne.reAddFileRefToObject(t, n), e.onNewMessage(n), e.dispatchEvent(new CustomEvent("new-message", { detail: n }));
  }
  static onClearMessages(e) {
    e.onClearMessages(), e.dispatchEvent(new CustomEvent("clear-messages"));
  }
  static onRender(e) {
    e.onComponentRender(), e.dispatchEvent(new CustomEvent("render"));
  }
  static onError(e, t) {
    e.onError(t), e.dispatchEvent(new CustomEvent("error", { detail: t }));
  }
}
class D {
  static applyCustomStylesToElements(e, t, i) {
    if (i && (Object.assign(e.outerContainer.style, i.outerContainer), Object.assign(e.innerContainer.style, i.innerContainer), Object.assign(e.bubbleElement.style, i.bubble), t)) {
      const n = e.bubbleElement.children[0], r = n.tagName.toLocaleLowerCase() !== "a" ? n : n.children[0];
      Object.assign(r.style, i.media);
    }
  }
  static applySideStyles(e, t, i, n) {
    n && (D.applyCustomStylesToElements(e, i, n.shared), t === x.USER_ROLE ? D.applyCustomStylesToElements(e, i, n.user) : (D.applyCustomStylesToElements(e, i, n.ai), D.applyCustomStylesToElements(e, i, n[t])));
  }
  static isMessageSideStyles(e) {
    return !!(e.ai || e.shared || e.user);
  }
  // prettier-ignore
  static applyCustomStyles(e, t, i, n, r) {
    var o;
    r && e.default !== r ? D.isMessageSideStyles(r) ? (D.applySideStyles(t, i, n, e.default), D.applySideStyles(t, i, n, r)) : (D.applyCustomStylesToElements(t, n, (o = e.default) == null ? void 0 : o.shared), D.applyCustomStylesToElements(t, n, r)) : D.applySideStyles(t, i, n, e.default);
  }
  // prettier-ignore
  static extractParticularSharedStyles(e, t) {
    if (!(t != null && t.shared))
      return;
    const i = t.shared, n = {
      outerContainer: {},
      innerContainer: {},
      bubble: {},
      media: {}
    };
    return e.forEach((r) => {
      var o, a, l, c;
      n.outerContainer[r] = ((o = i.outerContainer) == null ? void 0 : o[r]) || "", n.innerContainer[r] = ((a = i.innerContainer) == null ? void 0 : a[r]) || "", n.bubble[r] = ((l = i.bubble) == null ? void 0 : l[r]) || "", n.media[r] = ((c = i.media) == null ? void 0 : c[r]) || "";
    }), n;
  }
}
const so = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPHN2ZyBmaWxsPSIjMDAwMDAwIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkJdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCgk8cGF0aCBkPSJNMjMsMzAuMzZIOWMtMi40MDQsMC00LjM2LTEuOTU2LTQuMzYtNC4zNlYxNWMwLTIuNDA0LDEuOTU2LTQuMzYsNC4zNi00LjM2aDMuNjU5DQoJCWMwLjE2Ny0xLjU2NiwxLjQxNS0yLjgxMywyLjk4MS0yLjk4MVY1LjMzM2MtMS4xMzEtMC4xNzQtMi0xLjE1NC0yLTIuMzMzYzAtMS4zMDEsMS4wNTktMi4zNiwyLjM2LTIuMzYNCgkJYzEuMzAyLDAsMi4zNiwxLjA1OSwyLjM2LDIuMzZjMCwxLjE3OS0wLjg2OSwyLjE1OS0yLDIuMzMzVjcuNjZjMS41NjYsMC4xNjcsMi44MTQsMS40MTUsMi45ODEsMi45ODFIMjMNCgkJYzIuNDA0LDAsNC4zNiwxLjk1Niw0LjM2LDQuMzZ2MTFDMjcuMzYsMjguNDA0LDI1LjQwNCwzMC4zNiwyMywzMC4zNnogTTksMTEuMzZjLTIuMDA3LDAtMy42NCwxLjYzMy0zLjY0LDMuNjR2MTENCgkJYzAsMi4wMDcsMS42MzMsMy42NCwzLjY0LDMuNjRoMTRjMi4wMDcsMCwzLjY0LTEuNjMzLDMuNjQtMy42NFYxNWMwLTIuMDA3LTEuNjMzLTMuNjQtMy42NC0zLjY0SDl6IE0xMy4zODQsMTAuNjRoNS4yMzENCgkJQzE4LjQzOSw5LjM1NCwxNy4zMzQsOC4zNiwxNiw4LjM2QzE0LjY2Nyw4LjM2LDEzLjU2MSw5LjM1NCwxMy4zODQsMTAuNjR6IE0xNiwxLjM2Yy0wLjkwNCwwLTEuNjQsMC43MzYtMS42NCwxLjY0DQoJCVMxNS4wOTYsNC42NCwxNiw0LjY0YzAuOTA0LDAsMS42NC0wLjczNiwxLjY0LTEuNjRTMTYuOTA0LDEuMzYsMTYsMS4zNnogTTIwLDI3LjM2aC04Yy0xLjMwMSwwLTIuMzYtMS4wNTktMi4zNi0yLjM2DQoJCXMxLjA1OS0yLjM2LDIuMzYtMi4zNmg4YzEuMzAyLDAsMi4zNiwxLjA1OSwyLjM2LDIuMzZTMjEuMzAyLDI3LjM2LDIwLDI3LjM2eiBNMTIsMjMuMzZjLTAuOTA0LDAtMS42NCwwLjczNS0xLjY0LDEuNjQNCgkJczAuNzM2LDEuNjQsMS42NCwxLjY0aDhjMC45MDQsMCwxLjY0LTAuNzM1LDEuNjQtMS42NHMtMC43MzUtMS42NC0xLjY0LTEuNjRIMTJ6IE0zMSwyMy44NmgtMmMtMC4xOTksMC0wLjM2LTAuMTYxLTAuMzYtMC4zNlYxNQ0KCQljMC0wLjE5OSwwLjE2MS0wLjM2LDAuMzYtMC4zNmgyYzAuMTk5LDAsMC4zNiwwLjE2MSwwLjM2LDAuMzZ2OC41QzMxLjM2LDIzLjY5OSwzMS4xOTksMjMuODYsMzEsMjMuODZ6IE0yOS4zNiwyMy4xNGgxLjI3OXYtNy43OA0KCQlIMjkuMzZWMjMuMTR6IE0zLDIzLjg2SDFjLTAuMTk5LDAtMC4zNi0wLjE2MS0wLjM2LTAuMzZWMTVjMC0wLjE5OSwwLjE2MS0wLjM2LDAuMzYtMC4zNmgyYzAuMTk5LDAsMC4zNiwwLjE2MSwwLjM2LDAuMzZ2OC41DQoJCUMzLjM2LDIzLjY5OSwzLjE5OSwyMy44NiwzLDIzLjg2eiBNMS4zNiwyMy4xNGgxLjI4di03Ljc4SDEuMzZWMjMuMTR6IE0yMCwyMC4zNmMtMS4zMDIsMC0yLjM2LTEuMDU5LTIuMzYtMi4zNg0KCQlzMS4wNTktMi4zNiwyLjM2LTIuMzZzMi4zNiwxLjA1OSwyLjM2LDIuMzZDMjIuMzYsMTkuMzAyLDIxLjMwMiwyMC4zNiwyMCwyMC4zNnogTTIwLDE2LjM2Yy0wLjkwNCwwLTEuNjQsMC43MzYtMS42NCwxLjY0DQoJCXMwLjczNSwxLjY0LDEuNjQsMS42NHMxLjY0LTAuNzM1LDEuNjQtMS42NFMyMC45MDQsMTYuMzYsMjAsMTYuMzZ6IE0xMiwyMC4zNmMtMS4zMDEsMC0yLjM2LTEuMDU5LTIuMzYtMi4zNnMxLjA1OS0yLjM2LDIuMzYtMi4zNg0KCQlzMi4zNiwxLjA1OSwyLjM2LDIuMzZDMTQuMzYsMTkuMzAyLDEzLjMwMSwyMC4zNiwxMiwyMC4zNnogTTEyLDE2LjM2Yy0wLjkwNCwwLTEuNjQsMC43MzYtMS42NCwxLjY0czAuNzM2LDEuNjQsMS42NCwxLjY0DQoJCXMxLjY0LTAuNzM1LDEuNjQtMS42NFMxMi45MDQsMTYuMzYsMTIsMTYuMzZ6Ii8+DQoJPHJlY3Qgc3R5bGU9ImZpbGw6bm9uZTsiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIvPg0KPC9zdmc+", ro = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAMAAAC/MqoPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADNQTFRF////9vX18vLy/Pz86enp4+Li2tnZ1tbWzczM+fn57Ozs4N/f09LS0M/P5uXl7+/v3dzcwtncCAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAZNSURBVHja7d3bdtsqEABQYABZSLH9/3+ZpnUsIcF5iOM6PfElNoMHMfPQdq3GmL0GkLhEUqLaUExnOtOZznSmM53pTGc605nOdKYznelMZzrTmV4LXSqllKyJDkob26xWq8Zae/iH0QoWTm9d1xur4WuypQJtTd+5dqn0VjcxzNO5/57mEBvdLo8Oron6aseWOjYOFkVvjQs3DmgyONMuht52EfztP+4hdu0i6LCO808/M8c1lE/fuPGej41uUzgdtoO/75N+2ELJ9I3b3//hPXbiMenm3pR/Jt4USgcLBIp4Bh10gqKVhvLo0klCxeSky96nKcj3siw6pJIL4XsoiQ7apyvMY/V3HHrSRioLopvEhSpTCn2TPEuwKYMOIX0tAxRBf/Hpa+lfSqBv9gi1FPsNfTrMAiVmIE/vJhz61FGnQxRIEYE4vfNYdN8Rp6MlHaHotHTn8ejekaZPAjEmyvQWdZFTtYTpXqCGJ0zvcek9Yfoel76nS0ffv1NMp1ca+pkgyfRCGind4L7OWWc605l+cxjsyhqy9AGbPpClc1/nvl5VX0c/3Alk6RU3+Am7shNZ+h6bvidLr7jBB+zKBrL0irOOudmIUDzTmf5gIP+iEuXtRuTVaEmY/oZLfyNMrzjryPc0gerMTdpVg0tvjJUU6bLPcGOoUv46SLL6Wi8yhLf06C7TUyekI0efRaaYqdFltkeNpPumRPSMDxgBYvSM035FrKAmH72hRW99PrpvSdEHkTEGUvSsK3yKVDkuJ92RohcZaehzzirPpOg+J92Tolfc4Cumx5xVXpGiZ34+ICX6W84qv5GiR5NPbiIpOv6BCoSvSkTX+eiaGP092zINvBOj4x8mSf9FqejvNo/cvpOji19ZbmviL0GPLsYMFzgzCor0+Bv/ePDvSJKOb9dJ5UlnbnEHiHgzv6cdTpJOWuc/u3FEucLDOL75xGtBiefrcwgoC9NDSH/jkH6pAuXmBqPQ9HSUPVdZBH1GGOrMXAQdYxcKZfxAoK+KKBKFLosoEoX+u4giUehz8jlcnAuhp78I46yDYNAd+QLR6K+pr+yvxdBTHyVDubQh0UfSxaHSd0lbvNkVRE87JGOtc+PQd2QLQ6fHhJkKsSh6yg13tO08JPprsgrrXWH0dJd2vH1MLPprot4eXoujpzrdhngiD40ek2y92lggPcnWa8qN1Yz0BFuvZhRl0uOfR0v4Ewuli/Bg4Qr3lArqGdndQ3UPO1EunXYwnelMZzrTmc50pjOd6UxnOtOZznSmM53pTGf6kuj6oedFKV0s3fX6sX1S3bsi6a4PD7+/YAqYeBw6pIB/4qEgOqxdSPbGiim4NRRCbzs3Jj0L4UfXtQXQVRfn5IdA/Bw7RZzurEV6EtdsLeGXkIPuA+K1UoVeA0l62zmN/LqfSSft9KkepmoRuvi3nd5uKNFB9zbbXEANqdr941XO0NJx2v2jdJenpf+/3bvn0ts16ph+sd6hX7dPo2+2cZzE02Ia43bzDHqr+2Evnhz74ZHU30ffbKOeng1/NPV30Ns1gYQnSP2P6e65Pfxc6h02XZqXQCjhJ6kPL6bFo4NrGvAU4UII4SE2P1vQuZkuOxckVfehisF1MjUddN/MZBN+kvq5uf0O/xa66gyNS9ktMWlz44rO1Z8C19i5FPdHzPamXn+F3hryPfxMr78+4F+kq22kO6Rf6fUQt+puuustyWv4rbG3l/duztFB96GYoe1cTBdXMr+nw9qVM6ZfxOvzezff0nXi/ZOndvrR6Zvpm0c3h6nhdb+5iS7tsIim/qXZD9+97/Jf+rpZ5BET1ayv0GUzLhEuhBBjIy/RdVPgndutIRt9nt7p5cKFEEJ3Z+jQFDZL+XnMDXxHB73gxn5s9Kc3d3/pFciFkN/QTSXHJpX5l66gDrkQoP6hL3xsPw39la4qOiV8tH78XeSbue6N9mvWa6J/ybpc1CT1Wnh5Qq9meP8IOKH3ddH7E/ri1iYux/SXDrXR4UiPdck/wUpU+FtPf6/orja6O9KL3l56LOvVxe5Ib2qjN0d6Vbex4ghWlU3bPqI90If66MNng680FNpbJijH6kCvaF3uMzQ3+IrpFerV4Y9dffQdN3im10ivbuImhD3Qq5u4HdZkua8znelMZ/pS4z9CPVKkxowNxgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wMy0yN1QxNTo0NToxNSswMDowMN1xSg4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDMtMjdUMTU6NDU6MTUrMDA6MDCsLPKyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==";
class ce {
  static applyCustomStylesToElements(e, t, i) {
    Object.assign(e.style, i.container), Object.assign(t.style, i.avatar);
  }
  static applyCustomStyles(e, t, i, n) {
    var r, o, a, l;
    if ((r = i.default) != null && r.styles && ce.applyCustomStylesToElements(e, t, i.default.styles), n === x.USER_ROLE)
      (o = i.user) != null && o.styles && ce.applyCustomStylesToElements(e, t, i.user.styles);
    else {
      (a = i.ai) != null && a.styles && ce.applyCustomStylesToElements(e, t, i.ai.styles);
      const c = (l = i[n]) == null ? void 0 : l.styles;
      c && ce.applyCustomStylesToElements(e, t, c);
    }
  }
  static createAvatar(e, t) {
    var r, o, a, l, c;
    const i = document.createElement("img");
    e === x.USER_ROLE ? i.src = ((r = t == null ? void 0 : t.user) == null ? void 0 : r.src) || ((o = t == null ? void 0 : t.default) == null ? void 0 : o.src) || ro : i.src = ((a = t == null ? void 0 : t[e]) == null ? void 0 : a.src) || ((l = t == null ? void 0 : t.ai) == null ? void 0 : l.src) || ((c = t == null ? void 0 : t.default) == null ? void 0 : c.src) || so, i.classList.add("avatar");
    const n = document.createElement("div");
    return n.classList.add("avatar-container"), n.appendChild(i), t && ce.applyCustomStyles(n, i, t, e), n;
  }
  static getPosition(e, t) {
    var n, r, o, a, l, c;
    let i = (r = (n = t == null ? void 0 : t[e]) == null ? void 0 : n.styles) == null ? void 0 : r.position;
    return e !== x.USER_ROLE && (i ?? (i = (a = (o = t == null ? void 0 : t.ai) == null ? void 0 : o.styles) == null ? void 0 : a.position)), i ?? (i = (c = (l = t == null ? void 0 : t.default) == null ? void 0 : l.styles) == null ? void 0 : c.position), i ?? (i = e === x.USER_ROLE ? "right" : "left"), i;
  }
  static add(e, t, i) {
    const n = typeof i == "boolean" ? void 0 : i, r = ce.createAvatar(t, n), o = ce.getPosition(t, n);
    r.classList.add(o === "left" ? "left-item-position" : "right-item-position"), e.insertAdjacentElement(o === "left" ? "beforebegin" : "afterend", r);
  }
}
class Ge {
  static getPosition(e, t) {
    var n, r, o;
    let i = (n = t == null ? void 0 : t[e]) == null ? void 0 : n.position;
    return e !== x.USER_ROLE && (i ?? (i = (r = t == null ? void 0 : t.ai) == null ? void 0 : r.position)), i ?? (i = (o = t == null ? void 0 : t.default) == null ? void 0 : o.position), i ?? (i = e === x.USER_ROLE ? "right" : "left"), i;
  }
  static applyStyle(e, t, i) {
    var n, r, o, a;
    Object.assign(e.style, (n = i.default) == null ? void 0 : n.style), t === x.USER_ROLE ? Object.assign(e.style, (r = i.user) == null ? void 0 : r.style) : (Object.assign(e.style, (o = i.ai) == null ? void 0 : o.style), Object.assign(e.style, (a = i[t]) == null ? void 0 : a.style));
  }
  static getNameText(e, t) {
    var i, n, r, o, a, l;
    return e === x.USER_ROLE ? ((i = t.user) == null ? void 0 : i.text) || ((n = t.default) == null ? void 0 : n.text) || "User" : e === x.AI_ROLE ? ((r = t.ai) == null ? void 0 : r.text) || ((o = t.default) == null ? void 0 : o.text) || "AI" : ((a = t[e]) == null ? void 0 : a.text) || ((l = t.default) == null ? void 0 : l.text) || e;
  }
  static createName(e, t) {
    const i = document.createElement("div");
    return i.classList.add("name"), i.textContent = Ge.getNameText(e, t), Ge.applyStyle(i, e, t), i;
  }
  static add(e, t, i) {
    const n = typeof i == "boolean" ? {} : i, r = Ge.createName(t, n), o = Ge.getPosition(t, n);
    r.classList.add(o === "left" ? "left-item-position" : "right-item-position"), e.insertAdjacentElement(o === "left" ? "beforebegin" : "afterend", r);
  }
}
class Ke {
  constructor(e) {
    this.messageElementRefs = [], this.messages = [], this.htmlClassUtilities = {}, this.textElementsToText = [], this.elementRef = Ke.createContainerElement(), this.messageStyles = e.messageStyles, this._remarkable = Pi.createNew(), this._avatars = e.avatars, this._names = e.names, this._onNewMessage = jt.onNewMessage.bind(this, e), e.htmlClassUtilities && (this.htmlClassUtilities = e.htmlClassUtilities), setTimeout(() => {
      this.submitUserMessage = e.submitUserMessage;
    });
  }
  static createContainerElement() {
    const e = document.createElement("div");
    return e.id = "messages", e;
  }
  addNewTextMessage(e, t, i) {
    if (i != null && i.status) {
      const r = this.overwriteText(t, e, this.messageElementRefs);
      if (r)
        return r;
      i.status = !1;
    }
    const n = this.createAndAppendNewMessageElement(e, t);
    return n.bubbleElement.classList.add("text-message"), this.applyCustomStyles(n, t, !1), x.fillEmptyMessageElement(n.bubbleElement, e), this.textElementsToText.push([n, e]), n;
  }
  overwriteText(e, t, i) {
    const n = x.overwriteMessage(this.messages, i, t, e, "text", "text-message");
    if (n) {
      this.renderText(n.bubbleElement, t);
      const r = x.getLastTextToElement(this.textElementsToText, n);
      r && (r[1] = t);
    }
    return n;
  }
  createAndAppendNewMessageElement(e, t) {
    const i = this.createNewMessageElement(e, t);
    return this.elementRef.appendChild(i.outerContainer), setTimeout(() => Y.scrollToBottom(this.elementRef)), i;
  }
  createNewMessageElement(e, t) {
    var n;
    (n = this._introPanel) == null || n.hide();
    const i = this.messageElementRefs[this.messageElementRefs.length - 1];
    return Ke.isTemporaryElement(i) && (i.outerContainer.remove(), this.messageElementRefs.pop()), this.createMessageElements(e, t);
  }
  static isTemporaryElement(e) {
    return (e == null ? void 0 : e.bubbleElement.classList.contains("loading-message-text")) || be.isElementTemporary(e);
  }
  createMessageElements(e, t) {
    const i = Ke.createBaseElements(), { outerContainer: n, innerContainer: r, bubbleElement: o } = i;
    return n.appendChild(r), this.addInnerContainerElements(o, e, t), this.messageElementRefs.push(i), i;
  }
  static createBaseElements() {
    const e = document.createElement("div"), t = document.createElement("div");
    t.classList.add("inner-message-container"), e.appendChild(t), e.classList.add("outer-message-container");
    const i = document.createElement("div");
    return i.classList.add("message-bubble"), t.appendChild(i), { outerContainer: e, innerContainer: t, bubbleElement: i };
  }
  // prettier-ignore
  addInnerContainerElements(e, t, i) {
    return e.classList.add(
      "message-bubble",
      x.getRoleClass(i),
      i === x.USER_ROLE ? "user-message-text" : "ai-message-text"
    ), this.renderText(e, t), this._avatars && ce.add(e, i, this._avatars), this._names && Ge.add(e, i, this._names), { bubbleElement: e };
  }
  // prettier-ignore
  applyCustomStyles(e, t, i, n) {
    e && this.messageStyles && D.applyCustomStyles(this.messageStyles, e, t, i, n);
  }
  static createMessageContent(e) {
    const { text: t, files: i, html: n, _sessionId: r, role: o } = e, a = { role: o || x.AI_ROLE };
    return t && (a.text = t), i && (a.files = i), n && (a.html = n), !t && !i && !n && (a.text = ""), r && (a._sessionId = r), a;
  }
  removeLastMessage() {
    this.messageElementRefs[this.messageElementRefs.length - 1].outerContainer.remove(), this.messageElementRefs.pop();
  }
  sendClientUpdate(e, t = !1) {
    var i;
    (i = this._onNewMessage) == null || i.call(this, e, t);
  }
  renderText(e, t) {
    e.innerHTML = this._remarkable.render(t), e.innerText.trim().length === 0 && (e.innerText = t);
  }
  // this is mostly used for enabling highlight.js to highlight code if it downloads later
  refreshTextMessages() {
    this._remarkable = Pi.createNew(), this.textElementsToText.forEach((e) => {
      this.renderText(e[0].bubbleElement, e[1]);
    });
  }
}
const Wi = class st {
  // used for extracting at end and for isStreaming
  constructor(e) {
    this._streamedContent = "", this._streamType = "", this._hasStreamEnded = !1, this._messages = e;
  }
  upsertStreamedMessage(e) {
    var r;
    if (this._hasStreamEnded)
      return;
    if ((e == null ? void 0 : e.text) === void 0 && (e == null ? void 0 : e.html) === void 0)
      return console.error(A.INVALID_STREAM_EVENT);
    const t = (e == null ? void 0 : e.text) || (e == null ? void 0 : e.html) || "", i = Y.isScrollbarAtBottomOfElement(this._messages.elementRef), n = (e == null ? void 0 : e.text) !== void 0 ? "text" : "html";
    if (!this._elements && this._streamedContent === "")
      this.setInitialState(n, t, e == null ? void 0 : e.role);
    else {
      if (this._streamType !== n)
        return console.error(A.INVALID_STREAM_EVENT_MIX);
      this.updateBasedOnType(t, n, (r = this._elements) == null ? void 0 : r.bubbleElement, e == null ? void 0 : e.overwrite);
    }
    i && Y.scrollToBottom(this._messages.elementRef);
  }
  setInitialState(e, t, i) {
    this._streamType = e, i ?? (i = x.AI_ROLE), this._elements = e === "text" ? this._messages.addNewTextMessage(t, i) : Ye.add(this._messages, t, i, this._messages.messageElementRefs), this._elements.bubbleElement.classList.add(st.MESSAGE_CLASS), this._streamedContent = t, this._activeMessageRole = i;
  }
  updateBasedOnType(e, t, i, n = !1) {
    x.unfillEmptyMessageElement(i, e), (t === "text" ? this.updateText : this.updateHTML).bind(this)(e, i, n);
  }
  updateText(e, t, i) {
    this._streamedContent = i ? e : this._streamedContent + e, this._messages.textElementsToText[this._messages.textElementsToText.length - 1][1] = this._streamedContent, this._messages.renderText(t, this._streamedContent);
  }
  updateHTML(e, t, i) {
    if (i)
      this._streamedContent = e, t.innerHTML = e;
    else {
      const n = document.createElement("span");
      n.innerHTML = e, t.appendChild(n), this._streamedContent = st.HTML_CONTENT_PLACEHOLDER;
    }
  }
  finaliseStreamedMessage() {
    var r, o;
    const { textElementsToText: e, elementRef: t } = this._messages, i = (r = x.getLastMessageBubbleElement(t)) == null ? void 0 : r.classList;
    if (i != null && i.contains("loading-message-text"))
      throw Error(A.NO_VALID_STREAM_EVENTS_SENT);
    if (!(i != null && i.contains(st.MESSAGE_CLASS)))
      return;
    const n = { role: this._activeMessageRole || x.AI_ROLE };
    this._streamType === "text" ? (e[e.length - 1][1] = this._streamedContent, n.text = this._streamedContent, this._messages.textToSpeech && Nt.speak(this._streamedContent, this._messages.textToSpeech)) : this._streamType === "html" && (this._streamedContent === st.HTML_CONTENT_PLACEHOLDER && (this._streamedContent = ((o = x.getLastMessageBubbleElement(t)) == null ? void 0 : o.innerHTML) || ""), this._elements && se.apply(this._messages, this._elements.outerContainer), n.html = this._streamedContent), n && (this._messages.messages.push(n), this._messages.sendClientUpdate(Ke.createMessageContent(n), !1)), this._hasStreamEnded = !0;
  }
};
Wi.MESSAGE_CLASS = "streamed-message";
Wi.HTML_CONTENT_PLACEHOLDER = "htmlplaceholder";
let Ze = Wi;
const ts = class rt {
  // need to pass stringifyBody boolean separately as binding is throwing an error for some reason
  // prettier-ignore
  static async tempRemoveContentHeader(e, t, i) {
    if (!(e != null && e.headers))
      throw new Error("Request settings have not been set up");
    const n = e.headers[rt.CONTENT_TYPE];
    delete e.headers[rt.CONTENT_TYPE];
    let r;
    try {
      r = await t(i);
    } catch (o) {
      throw e.headers[rt.CONTENT_TYPE] = n, o;
    }
    return e.headers[rt.CONTENT_TYPE] = n, r;
  }
  static displayError(e, t, i = "Service error, please try again.") {
    if (console.error(t), typeof t == "object")
      return Object.keys(t).length === 0 ? e.addNewErrorMessage("service", i) : e.addNewErrorMessage("service", JSON.stringify(t));
    e.addNewErrorMessage("service", t);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fetch(e, t, i, n) {
    var o, a;
    const r = { method: ((o = e.requestSettings) == null ? void 0 : o.method) || "POST", headers: t };
    return r.method !== "GET" && (r.body = i ? JSON.stringify(n) : n), e.requestSettings.credentials && (r.credentials = e.requestSettings.credentials), fetch(((a = e.requestSettings) == null ? void 0 : a.url) || e.url || "", r);
  }
  static processResponseByType(e) {
    const t = e.headers.get("content-type");
    return t != null && t.includes("application/json") ? e.json() : t != null && t.includes("text/plain") || !t ? e : e.blob();
  }
  static async processRequestInterceptor(e, t) {
    var o;
    const i = await ((o = e.requestInterceptor) == null ? void 0 : o.call(e, t)) || t, n = i, r = i;
    return { body: n.body, headers: n.headers, error: r.error };
  }
  static validateResponseFormat(e) {
    return e && typeof e == "object" && (typeof e.error == "string" || typeof e.text == "string" || typeof e.html == "string" || Array.isArray(e.files));
  }
};
ts.CONTENT_TYPE = "Content-Type";
let _ = ts;
async function oo(s, e) {
  const t = s.getReader();
  let i;
  for (; !(i = await t.read()).done; )
    e(i.value);
}
function ao(s) {
  let e, t, i, n = !1;
  return function(o) {
    e === void 0 ? (e = o, t = 0, i = -1) : e = co(e, o);
    const a = e.length;
    let l = 0;
    for (; t < a; ) {
      n && (e[t] === 10 && (l = ++t), n = !1);
      let c = -1;
      for (; t < a && c === -1; ++t)
        switch (e[t]) {
          case 58:
            i === -1 && (i = t - l);
            break;
          case 13:
            n = !0;
          case 10:
            c = t;
            break;
        }
      if (c === -1)
        break;
      s(e.subarray(l, c), i), l = t, i = -1;
    }
    l === a ? e = void 0 : l !== 0 && (e = e.subarray(l), t -= l);
  };
}
function lo(s, e, t) {
  let i = gn();
  const n = new TextDecoder();
  return function(o, a) {
    if (o.length === 0)
      t == null || t(i), i = gn();
    else if (a > 0) {
      const l = n.decode(o.subarray(0, a)), c = a + (o[a + 1] === 32 ? 2 : 1), d = n.decode(o.subarray(c));
      switch (l) {
        case "data":
          i.data = i.data ? i.data + `
` + d : d;
          break;
        case "event":
          i.event = d;
          break;
        case "id":
          s(i.id = d);
          break;
        case "retry":
          const u = parseInt(d, 10);
          isNaN(u) || e(i.retry = u);
          break;
      }
    }
  };
}
function co(s, e) {
  const t = new Uint8Array(s.length + e.length);
  return t.set(s), t.set(e, s.length), t;
}
function gn() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
var uo = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var i in s)
    Object.prototype.hasOwnProperty.call(s, i) && e.indexOf(i) < 0 && (t[i] = s[i]);
  if (s != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(s); n < i.length; n++)
      e.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(s, i[n]) && (t[i[n]] = s[i[n]]);
  return t;
};
const Di = "text/event-stream", ho = 1e3, bn = "last-event-id";
function po(s, e) {
  var { signal: t, headers: i, onopen: n, onmessage: r, onclose: o, onerror: a, openWhenHidden: l, fetch: c } = e, d = uo(e, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise((u, h) => {
    const p = Object.assign({}, i);
    p.accept || (p.accept = Di);
    let g;
    function m() {
      g.abort(), document.hidden || Q();
    }
    l || document.addEventListener("visibilitychange", m);
    let E = ho, S = 0;
    function V() {
      document.removeEventListener("visibilitychange", m), window.clearTimeout(S), g.abort();
    }
    t == null || t.addEventListener("abort", () => {
      V(), u();
    });
    const k = c ?? window.fetch, G = n ?? fo;
    async function Q() {
      var oe;
      g = new AbortController();
      try {
        const X = await k(s, Object.assign(Object.assign({}, d), { headers: p, signal: g.signal }));
        await G(X), await oo(X.body, ao(lo((N) => {
          N ? p[bn] = N : delete p[bn];
        }, (N) => {
          E = N;
        }, r))), o == null || o(), V(), u();
      } catch (X) {
        if (!g.signal.aborted)
          try {
            const N = (oe = a == null ? void 0 : a(X)) !== null && oe !== void 0 ? oe : E;
            window.clearTimeout(S), S = window.setTimeout(Q, N);
          } catch (N) {
            V(), h(N);
          }
      }
    }
    Q();
  });
}
function fo(s) {
  const e = s.headers.get("content-type");
  if (!(e != null && e.startsWith(Di)))
    throw new Error(`Expected content-type to be ${Di}, Actual: ${e}`);
}
const is = class ot {
  static generateResponse(e) {
    const t = e.messages[e.messages.length - 1];
    if (t.files && t.files.length > 0) {
      if (t.files.length > 1)
        return "These are interesting files!";
      const i = t.files[0];
      return i.src && i.src.startsWith("data:image/gif") ? "That is a nice gif!" : i.type === "image" ? "That is a nice image!" : i.type === "audio" ? "I like the sound of that!" : "That is an interesting file!";
    }
    if (t.text) {
      if (t.text.charAt(t.text.length - 1) === "?")
        return "I'm sorry but I can't answer that question...";
      if (t.text.includes("updog"))
        return "What's updog?";
    }
    return "Hi there! This is a demo response!";
  }
  static getCustomResponse(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  static getResponse(e) {
    return e.customDemoResponse ? ot.getCustomResponse(e.customDemoResponse, e.messages[e.messages.length - 1]) : { text: ot.generateResponse(e) };
  }
  // timeout is used to simulate a timeout for a response to come back
  static request(e, t) {
    const i = ot.getResponse(t);
    setTimeout(async () => {
      var r, o;
      const n = await ((o = (r = e.deepChat).responseInterceptor) == null ? void 0 : o.call(r, i)) || i;
      n.error ? (t.addNewErrorMessage("service", n.error), e.completionsHandlers.onFinish()) : C.isSimulation(e.deepChat.stream) ? C.simulate(t, e.streamHandlers, n) : (t.addNewMessage(n), e.completionsHandlers.onFinish());
    }, 400);
  }
  // timeout is used to simulate a timeout for a response to come back
  static requestStream(e, t) {
    setTimeout(() => {
      const i = ot.getResponse(e);
      C.simulate(e, t, i);
    }, 400);
  }
};
is.URL = "deep-chat-demo";
let ve = is;
class C {
  // prettier-ignore
  static async request(e, t, i, n = !0) {
    var p, g, m, E, S, V;
    const r = { body: t, headers: (p = e.requestSettings) == null ? void 0 : p.headers }, { body: o, headers: a, error: l } = await _.processRequestInterceptor(e.deepChat, r), { onOpen: c, onClose: d, abortStream: u } = e.streamHandlers;
    if (l)
      return C.onInterceptorError(i, l, d);
    if ((g = e.requestSettings) != null && g.handler)
      return Ae.stream(e, o, i);
    if (((m = e.requestSettings) == null ? void 0 : m.url) === ve.URL)
      return ve.requestStream(i, e.streamHandlers);
    const h = new Ze(i);
    po(((E = e.requestSettings) == null ? void 0 : E.url) || e.url || "", {
      method: ((S = e.requestSettings) == null ? void 0 : S.method) || "POST",
      headers: a,
      credentials: (V = e.requestSettings) == null ? void 0 : V.credentials,
      body: n ? JSON.stringify(o) : o,
      openWhenHidden: !0,
      // keep stream open when browser tab not open
      async onopen(k) {
        if (k.ok)
          return c();
        throw await _.processResponseByType(k);
      },
      async onmessage(k) {
        var G, Q, oe;
        if (JSON.stringify(k.data) !== JSON.stringify("[DONE]")) {
          const X = JSON.parse(k.data), N = await ((Q = (G = e.deepChat).responseInterceptor) == null ? void 0 : Q.call(G, X)) || X;
          (oe = e.extractResultData) == null || oe.call(e, N).then((Fe) => {
            h.upsertStreamedMessage(Fe);
          }).catch((Fe) => _.displayError(i, Fe));
        }
      },
      onerror(k) {
        throw d(), k;
      },
      onclose() {
        h.finaliseStreamedMessage(), d();
      },
      signal: u.signal
    }).catch((k) => {
      var G;
      (G = e.extractResultData) == null || G.call(e, k).then(() => {
        _.displayError(i, k);
      }).catch((Q) => {
        _.displayError(i, Q);
      });
    });
  }
  static onInterceptorError(e, t, i) {
    e.addNewErrorMessage("service", t), i == null || i();
  }
  static simulate(e, t, i) {
    const n = t;
    if ((i.files || i.html) && e.addNewMessage({ sendUpdate: !1, ignoreText: !0, ...i }, !1), i.text) {
      t.onOpen();
      const r = i.text.split("");
      C.populateMessages(r, new Ze(e), n);
    }
  }
  static populateMessages(e, t, i, n = 0) {
    const r = e[n];
    if (r) {
      t.upsertStreamedMessage({ text: r });
      const o = setTimeout(() => {
        C.populateMessages(e, t, i, n + 1);
      }, i.simulationInterim || 6);
      i.abortStream.abort = () => {
        C.abort(o, t, i.onClose);
      };
    } else
      t.finaliseStreamedMessage(), i.onClose();
  }
  static isSimulation(e) {
    return typeof e == "object" && !!e.simulation;
  }
  static abort(e, t, i) {
    clearTimeout(e), t.finaliseStreamedMessage(), i();
  }
}
class Ae {
  static async request(e, t, i) {
    var a, l;
    let n = !0;
    const r = async (c) => {
      var u, h;
      if (!n)
        return;
      n = !1;
      const d = await ((h = (u = e.deepChat).responseInterceptor) == null ? void 0 : h.call(u, c)) || c;
      _.validateResponseFormat(d) ? typeof d.error == "string" ? (console.error(d.error), i.addNewErrorMessage("service", d.error), e.completionsHandlers.onFinish()) : C.isSimulation(e.deepChat.stream) ? C.simulate(i, e.streamHandlers, d) : (i.addNewMessage(d), e.completionsHandlers.onFinish()) : (console.error(A.INVALID_RESPONSE(c, "server", !!e.deepChat.responseInterceptor, d)), i.addNewErrorMessage("service", "Error in server message"), e.completionsHandlers.onFinish());
    }, o = Ae.generateOptionalSignals();
    (l = (a = e.requestSettings).handler) == null || l.call(a, t, { ...o, onResponse: r });
  }
  // prettier-ignore
  static stream(e, t, i) {
    var u, h;
    let n = !0, r = !1;
    const o = new Ze(i), a = () => {
      r || !n || (e.streamHandlers.onOpen(), r = !0);
    }, l = () => {
      n && (o.finaliseStreamedMessage(), e.streamHandlers.onClose(), n = !1);
    }, c = (p) => {
      n && (!p || typeof p != "object" || typeof p.error != "string" && typeof p.html != "string" && typeof p.text != "string" ? console.error(A.INVALID_RESPONSE(p, "server", !1)) : p.error ? (console.error(p.error), o.finaliseStreamedMessage(), e.streamHandlers.onClose(), i.addNewErrorMessage("service", p.error), n = !1) : o.upsertStreamedMessage(p));
    };
    e.streamHandlers.abortStream.abort = () => {
      o.finaliseStreamedMessage(), e.streamHandlers.onClose(), n = !1;
    };
    const d = Ae.generateOptionalSignals();
    (h = (u = e.requestSettings).handler) == null || h.call(
      u,
      t,
      { ...d, onOpen: a, onResponse: c, onClose: l, stopClicked: e.streamHandlers.stopClicked }
    );
  }
  // prettier-ignore
  static websocket(e, t) {
    var l, c;
    const i = { isOpen: !1, newUserMessage: { listener: () => {
    } } };
    e.websocket = i;
    const n = () => {
      t.removeError(), i.isOpen = !0;
    }, r = () => {
      i.isOpen = !1;
    }, o = async (d) => {
      var h, p;
      if (!i.isOpen)
        return;
      const u = await ((p = (h = e.deepChat).responseInterceptor) == null ? void 0 : p.call(h, d)) || d;
      _.validateResponseFormat(u) ? typeof u.error == "string" ? (console.error(u.error), t.isLastMessageError() || t.addNewErrorMessage("service", u.error)) : e.deepChat.stream ? C.simulate(t, e.streamHandlers, u) : t.addNewMessage(u) : (console.error(A.INVALID_RESPONSE(d, "server", !!e.deepChat.responseInterceptor, u)), t.addNewErrorMessage("service", "Error in server message"));
    }, a = Ae.generateOptionalSignals();
    (c = (l = e.requestSettings).handler) == null || c.call(
      l,
      void 0,
      { ...a, onOpen: n, onResponse: o, onClose: r, newUserMessage: i.newUserMessage }
    );
  }
  static generateOptionalSignals() {
    return { onClose: () => {
    }, onOpen: () => {
    }, stopClicked: { listener: () => {
    } }, newUserMessage: { listener: () => {
    } } };
  }
}
class w {
  // prettier-ignore
  static async request(e, t, i, n = !0) {
    var h, p, g;
    const r = { body: t, headers: (h = e.requestSettings) == null ? void 0 : h.headers }, { body: o, headers: a, error: l } = await _.processRequestInterceptor(e.deepChat, r), { onFinish: c } = e.completionsHandlers;
    if (l)
      return w.onInterceptorError(i, l, c);
    if ((p = e.requestSettings) != null && p.handler)
      return Ae.request(e, o, i);
    if (((g = e.requestSettings) == null ? void 0 : g.url) === ve.URL)
      return ve.request(e, i);
    let d = !0;
    const u = _.fetch.bind(this, e, a, n);
    u(o).then((m) => (d = !!m.ok, m)).then((m) => _.processResponseByType(m)).then(async (m) => {
      var V, k;
      if (!e.extractResultData)
        return;
      const E = await ((k = (V = e.deepChat).responseInterceptor) == null ? void 0 : k.call(V, m)) || m, S = await e.extractResultData(E, u, o);
      if (!d)
        throw m;
      if (!S || typeof S != "object")
        throw Error(A.INVALID_RESPONSE(m, "response", !!e.deepChat.responseInterceptor, E));
      S.makingAnotherRequest || (C.isSimulation(e.deepChat.stream) ? C.simulate(i, e.streamHandlers, S) : (i.addNewMessage(S), c()));
    }).catch((m) => {
      _.displayError(i, m), c();
    });
  }
  static executePollRequest(e, t, i, n) {
    const { onFinish: r } = e.completionsHandlers;
    fetch(t, i).then((o) => o.json()).then(async (o) => {
      var l, c;
      if (!e.extractPollResultData)
        return;
      const a = await e.extractPollResultData(await ((c = (l = e.deepChat).responseInterceptor) == null ? void 0 : c.call(l, o)) || o);
      a.timeoutMS ? setTimeout(() => {
        w.executePollRequest(e, t, i, n);
      }, a.timeoutMS) : C.isSimulation(e.deepChat.stream) ? C.simulate(n, e.streamHandlers, a) : (n.addNewMessage(a), r());
    }).catch((o) => {
      _.displayError(n, o), r();
    });
  }
  // prettier-ignore
  static async poll(e, t, i, n = !0) {
    var p, g, m;
    const r = { body: t, headers: (p = e.requestSettings) == null ? void 0 : p.headers }, { body: o, headers: a, error: l } = await _.processRequestInterceptor(e.deepChat, r);
    if (l)
      return w.onInterceptorError(i, l);
    const c = ((g = e.requestSettings) == null ? void 0 : g.url) || e.url || "", d = ((m = e.requestSettings) == null ? void 0 : m.method) || "POST", u = n ? JSON.stringify(o) : o, h = { method: d, body: u, headers: a };
    e.requestSettings.credentials && (h.credentials = e.requestSettings.credentials), w.executePollRequest(e, c, h, i);
  }
  static onInterceptorError(e, t, i) {
    e.addNewErrorMessage("service", t), i == null || i();
  }
  // prettier-ignore
  static verifyKey(e, t, i, n, r, o, a, l, c) {
    if (e === "")
      return o(A.INVALID_KEY);
    a(), fetch(t, { method: n, headers: i, body: c || null }).then((d) => _.processResponseByType(d)).then((d) => {
      l(d, e, r, o);
    }).catch((d) => {
      o(A.CONNECTION_FAILED), console.error(d);
    });
  }
}
class Qe {
  static getCharacterLimitMessages(e, t) {
    var r;
    if (t === -1)
      return e;
    let i = 0, n = e.length - 1;
    for (n; n >= 0; n -= 1) {
      const o = (r = e[n]) == null ? void 0 : r.text;
      if (o !== void 0 && (i += o.length, i > t)) {
        e[n].text = o.substring(0, o.length - (i - t));
        break;
      }
    }
    return e.slice(Math.max(n, 0));
  }
  static getMaxMessages(e, t) {
    return e.slice(Math.max(e.length - t, 0));
  }
  // prettier-ignore
  // if maxMessages is not defined we send all messages
  // if maxMessages above 0 we send that number
  // if maxMessages 0 or below we send only what is in the request
  static processMessages(e, t, i) {
    return t !== void 0 ? t > 0 && (e = Qe.getMaxMessages(e, t)) : e = [e[e.length - 1]], e = JSON.parse(JSON.stringify(e)), i === void 0 ? e : Qe.getCharacterLimitMessages(e, i);
  }
}
class $ {
  static setup(e) {
    e.requestSettings.url !== ve.URL && (e.permittedErrorPrefixes = ["Connection error", "Error in server message"], e.websocket = "pending");
  }
  static createConnection(e, t) {
    if (!document.body.contains(e.deepChat))
      return;
    const i = e.requestSettings.websocket;
    if (i) {
      if (e.requestSettings.handler)
        return Ae.websocket(e, t);
      try {
        const n = typeof i != "boolean" ? i : void 0, r = new WebSocket(e.requestSettings.url || "", n);
        e.websocket = r, e.websocket.onopen = () => {
          var o, a;
          t.removeError(), e.websocket && typeof e.websocket == "object" && $.assignListeners(e, r, t), (a = (o = e.deepChat)._validationHandler) == null || a.call(o);
        }, e.websocket.onerror = (o) => {
          console.error(o), $.retryConnection(e, t);
        };
      } catch (n) {
        console.error(n), $.retryConnection(e, t);
      }
    }
  }
  static retryConnection(e, t) {
    var i, n;
    (n = (i = e.deepChat)._validationHandler) == null || n.call(i), document.body.contains(e.deepChat) && (e.websocket = "pending", t.isLastMessageError() || t.addNewErrorMessage("service", "Connection error"), setTimeout(() => {
      $.createConnection(e, t);
    }, 5e3));
  }
  static assignListeners(e, t, i) {
    t.onmessage = async (n) => {
      var r, o;
      if (e.extractResultData)
        try {
          const a = JSON.parse(n.data), l = await ((o = (r = e.deepChat).responseInterceptor) == null ? void 0 : o.call(r, a)) || a, c = await e.extractResultData(l);
          if (!c || typeof c != "object")
            throw Error(A.INVALID_RESPONSE(a, "server", !!e.deepChat.responseInterceptor, l));
          C.isSimulation(e.deepChat.stream) ? C.simulate(i, e.streamHandlers, c) : i.addNewMessage(c);
        } catch (a) {
          _.displayError(i, a, "Error in server message");
        }
    }, t.onclose = () => {
      console.error("Connection closed"), i.isLastMessageError() || i.addNewErrorMessage("service", "Connection error"), e.deepChat.stream && e.streamHandlers.abortStream.abort(), $.createConnection(e, i);
    };
  }
  static async sendWebsocket(e, t, i, n = !0) {
    var d, u;
    const r = e.websocket;
    if (!r || r === "pending")
      return;
    const o = { body: t, headers: (d = e.requestSettings) == null ? void 0 : d.headers }, { body: a, error: l } = await _.processRequestInterceptor(e.deepChat, o);
    if (l)
      return i.addNewErrorMessage("service", l);
    if (!$.isWebSocket(r))
      return r.newUserMessage.listener(a);
    const c = n ? JSON.stringify(a) : a;
    if (((u = e.requestSettings) == null ? void 0 : u.url) === ve.URL)
      return ve.request(e, i);
    r.readyState === void 0 || r.readyState !== r.OPEN ? (console.error("Connection is not open"), i.isLastMessageError() || i.addNewErrorMessage("service", "Connection error")) : (r.send(JSON.stringify(c)), e.completionsHandlers.onFinish());
  }
  static canSendMessage(e) {
    return e ? e === "pending" ? !1 : $.isWebSocket(e) ? e.readyState !== void 0 && e.readyState === e.OPEN : e.isOpen : !0;
  }
  // if false then it is the internal websocket handler
  static isWebSocket(e) {
    return e.send !== void 0;
  }
}
class L {
  // prettier-ignore
  static parseConfig(e, t, i, n) {
    var o;
    const r = { files: t };
    if (typeof n == "object") {
      const { files: a, request: l, button: c } = n;
      a && (a.infoModal && (r.files.infoModal = a.infoModal, (o = a.infoModal) != null && o.textMarkDown && (r.infoModalTextMarkUp = i.render(a.infoModal.textMarkDown))), a.acceptedFormats && (r.files.acceptedFormats = a.acceptedFormats), a.maxNumberOfFiles && (r.files.maxNumberOfFiles = a.maxNumberOfFiles)), r.button = c, l && (l.headers || l.method || l.url || l.credentials || e.headers || e.method || e.url || e.credentials) && (r.request = {
        url: (l == null ? void 0 : l.url) || e.url,
        method: (l == null ? void 0 : l.method) || e.method,
        headers: (l == null ? void 0 : l.headers) || e.headers,
        credentials: (l == null ? void 0 : l.credentials) || e.credentials
      });
    }
    return r;
  }
  static processMixedFiles(e, t, i) {
    if (i) {
      const n = { acceptedFormats: "" };
      e.fileTypes.mixedFiles = L.parseConfig(e.requestSettings, n, t, i);
    }
  }
  // needs to be set after audio to overwrite maxNumberOfFiles
  // prettier-ignore
  static processMicrophone(e, t, i, n) {
    var a, l, c, d, u, h;
    const o = { acceptedFormats: "audio/*", ...((a = e.fileTypes.audio) == null ? void 0 : a.files) || {} };
    i && (navigator.mediaDevices.getUserMedia !== void 0 ? (e.recordAudio = L.parseConfig(e.requestSettings, o, t, i), typeof i == "object" && i.files && ((l = e.recordAudio).files ?? (l.files = {}), e.recordAudio.files.format = (c = i.files) == null ? void 0 : c.format, e.recordAudio.files.maxDurationSeconds = (d = i.files) == null ? void 0 : d.maxDurationSeconds, (u = e.fileTypes.audio) != null && u.files && ((h = e.fileTypes.audio.files).maxNumberOfFiles ?? (h.maxNumberOfFiles = i.files.maxNumberOfFiles)))) : n || (e.fileTypes.audio = L.parseConfig(e.requestSettings, o, t, i)));
  }
  // prettier-ignore
  static processAudioConfig(e, t, i, n) {
    if (!i && !n)
      return;
    const o = { acceptedFormats: "audio/*", ...(n == null ? void 0 : n.files) || {} };
    e.fileTypes.audio = L.parseConfig(e.requestSettings, o, t, i);
  }
  // prettier-ignore
  static processGifConfig(e, t, i, n) {
    if (!i && !n)
      return;
    const o = { acceptedFormats: "image/gif", ...(n == null ? void 0 : n.files) || {} };
    e.fileTypes.gifs = L.parseConfig(e.requestSettings, o, t, i);
  }
  // needs to be set after images to overwrite maxNumberOfFiles
  // prettier-ignore
  static processCamera(e, t, i, n) {
    var a, l, c, d;
    const o = { acceptedFormats: "image/*", ...((a = e.fileTypes.images) == null ? void 0 : a.files) || {} };
    i && (navigator.mediaDevices.getUserMedia !== void 0 ? (e.camera = L.parseConfig(e.requestSettings, o, t, i), typeof i == "object" && (e.camera.modalContainerStyle = i.modalContainerStyle, i.files && ((l = e.camera).files ?? (l.files = {}), e.camera.files.format = (c = i.files) == null ? void 0 : c.format, e.camera.files.dimensions = (d = i.files) == null ? void 0 : d.dimensions))) : n || (e.fileTypes.images = L.parseConfig(e.requestSettings, o, t, i)));
  }
  // prettier-ignore
  static processImagesConfig(e, t, i, n) {
    if (!i && !n)
      return;
    const o = { acceptedFormats: "image/*", ...(n == null ? void 0 : n.files) || {} };
    e.fileTypes.images = L.parseConfig(e.requestSettings, o, t, i);
  }
  // default for direct service
  static populateDefaultFileIO(e, t) {
    var i, n;
    e && (e.files ?? (e.files = {}), (i = e.files).acceptedFormats ?? (i.acceptedFormats = t), (n = e.files).maxNumberOfFiles ?? (n.maxNumberOfFiles = 1));
  }
  static set(e, t, i) {
    L.populateDefaultFileIO(i == null ? void 0 : i.audio, ".4a,.mp3,.webm,.mp4,.mpga,.wav,.mpeg,.m4a"), L.populateDefaultFileIO(i == null ? void 0 : i.images, ".png,.jpg");
    const n = Pi.createNew();
    L.processImagesConfig(t, n, e.images, i == null ? void 0 : i.images), L.processCamera(t, n, e.camera, e.images), L.processGifConfig(t, n, e.gifs, i == null ? void 0 : i.gifs), L.processAudioConfig(t, n, e.audio, i == null ? void 0 : i.audio), L.processMicrophone(t, n, e.microphone, e.audio), L.processMixedFiles(t, n, e.mixedFiles);
  }
}
class Le {
  constructor(e, t, i) {
    var n, r, o, a;
    this.rawBody = {}, this.validateConfigKey = !1, this.canSendMessage = Le.canSendMessage, this.requestSettings = {}, this.fileTypes = {}, this.completionsHandlers = {}, this.streamHandlers = {}, this.deepChat = e, this.demo = i, Object.assign(this.rawBody, (n = e.request) == null ? void 0 : n.additionalBodyProps), this.totalMessagesMaxCharLength = (r = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : r.totalMessagesMaxCharLength, this.maxMessages = (o = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : o.maxMessages, L.set(e, this, t), e.request && (this.requestSettings = e.request), this.demo && ((a = this.requestSettings).url ?? (a.url = ve.URL)), this.requestSettings.websocket && $.setup(this);
  }
  static canSendMessage(e, t, i) {
    return i ? !0 : !!(e && e.trim() !== "") || !!(t && t.length > 0);
  }
  verifyKey(e, t) {
  }
  static createCustomFormDataBody(e, t, i) {
    const n = new FormData();
    i.forEach((a) => n.append("files", a)), Object.keys(e).forEach((a) => n.append(a, String(e[a])));
    let r = 0;
    t.slice(0, t.length - 1).forEach((a) => {
      n.append(`message${r += 1}`, JSON.stringify(a));
    });
    const o = t[t.length - 1];
    return o.text && (delete o.files, n.append(`message${r += 1}`, JSON.stringify(o))), n;
  }
  getServiceIOByType(e) {
    if (e.type.startsWith("audio") && this.fileTypes.audio)
      return this.fileTypes.audio;
    if (e.type.startsWith("image")) {
      if (this.fileTypes.gifs && e.type.endsWith("/gif"))
        return this.fileTypes.gifs;
      if (this.fileTypes.images)
        return this.fileTypes.images;
      if (this.camera)
        return this.camera;
    }
    return this.fileTypes.mixedFiles;
  }
  async request(e, t, i = !0) {
    const { stream: n } = this.deepChat;
    return n && !C.isSimulation(n) ? C.request(this, e, t) : w.request(this, e, t, i);
  }
  async callAPIWithText(e, t) {
    var r, o, a, l;
    const i = { messages: t, ...this.rawBody };
    let n = !1;
    (r = this.requestSettings.headers) != null && r["Content-Type"] || ((o = this.requestSettings).headers ?? (o.headers = {}), (a = this.requestSettings.headers)["Content-Type"] ?? (a["Content-Type"] = "application/json"), n = !0), await this.request(i, e), n && ((l = this.requestSettings.headers) == null || delete l["Content-Type"]);
  }
  async callApiWithFiles(e, t, i) {
    const n = Le.createCustomFormDataBody(this.rawBody, t, i), r = this.requestSettings, o = this.getServiceIOByType(i[0]);
    this.requestSettings = (o == null ? void 0 : o.request) || this.requestSettings, await this.request(n, e, !1), this.requestSettings = r;
  }
  async callServiceAPI(e, t, i) {
    i ? this.callApiWithFiles(e, t, i) : this.callAPIWithText(e, t);
  }
  // prettier-ignore
  async callAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = Qe.processMessages(
      t.messages,
      this.maxMessages,
      this.totalMessagesMaxCharLength
    );
    if (this.requestSettings.websocket) {
      const n = { messages: i, ...this.rawBody };
      $.sendWebsocket(this, n, t, !1);
    } else
      this.callServiceAPI(t, i, e.files);
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    if (e.result)
      return ke.handleResponseProperty(e);
    if (_.validateResponseFormat(e))
      return e;
  }
  isDirectConnection() {
    return !1;
  }
  isWebModel() {
    return !1;
  }
}
class q extends Le {
  // prettier-ignore
  constructor(e, t, i, n, r) {
    var o;
    super(e, r), this.insertKeyPlaceholderText = "API Key", this.getKeyLink = "", Object.assign(this.rawBody, (o = e.request) == null ? void 0 : o.additionalBodyProps), this.keyVerificationDetails = t, this.buildHeadersFunc = i, n && this.setApiKeyProperties(n), this.requestSettings = this.buildRequestSettings(this.key || "", e.request);
  }
  setApiKeyProperties(e) {
    this.key = e.key, e.validateKeyProperty && (this.validateConfigKey = e.validateKeyProperty);
  }
  buildRequestSettings(e, t) {
    const i = t ?? {};
    return i.headers ?? (i.headers = {}), Object.assign(i.headers, this.buildHeadersFunc(e)), i;
  }
  keyAuthenticated(e, t) {
    this.requestSettings = this.buildRequestSettings(t, this.requestSettings), this.key = t, e();
  }
  // prettier-ignore
  verifyKey(e, t) {
    const { url: i, method: n, handleVerificationResult: r, createHeaders: o, body: a } = this.keyVerificationDetails, l = (o == null ? void 0 : o(e)) || this.buildHeadersFunc(e);
    w.verifyKey(
      e,
      i,
      l,
      n,
      this.keyAuthenticated.bind(this, t.onSuccess),
      t.onFail,
      t.onLoad,
      r,
      a
    );
  }
  isDirectConnection() {
    return !0;
  }
}
class Bt {
  static waitForPropertiesToBeUpdatedBeforeRender(e) {
    e._propUpdated_ = !1, setTimeout(() => {
      e._propUpdated_ ? Bt.waitForPropertiesToBeUpdatedBeforeRender(e) : (e._waitingToRender_ = !1, e.onRender());
    });
  }
  static attemptRender(e) {
    e._propUpdated_ = !0, e._waitingToRender_ || (e._waitingToRender_ = !0, Bt.waitForPropertiesToBeUpdatedBeforeRender(e));
  }
}
const Ki = class He extends HTMLElement {
  // If this is not working, try using propertyName directly
  constructor() {
    super(), this._waitingToRender_ = !1, this._propUpdated_ = !1, Object.keys(He._attributeToProperty_).forEach((e) => {
      const t = He._attributeToProperty_[e];
      this.constructPropertyAccessors(t), this.hasOwnProperty(e) || this.constructPropertyAccessors(t, e);
    });
  }
  static get observedAttributes() {
    return Object.keys(He._attributes_) || [];
  }
  // need to be called here as accessors need to be set for the class instance
  constructPropertyAccessors(e, t) {
    let i;
    Object.defineProperty(this, t || e, {
      get: function() {
        return i;
      },
      set: function(o) {
        i = o, t ? this[e] = o : Bt.attemptRender(this);
      }
    });
  }
  attributeChangedCallback(e, t, i) {
    if (t === i)
      return;
    const n = He._attributes_[e](i), r = He._attributeToProperty_[e];
    this[r] = n;
  }
  onRender() {
  }
};
Ki._attributes_ = {};
Ki._attributeToProperty_ = {};
let mo = Ki;
const go = `<?xml version="1.0" standalone="no"?>
<svg version="1.1"
	xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.9em" height="0.9em"
	viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200">
		<path d="
			M669.727,273.516c-22.891-2.476-46.15-3.895-69.727-4.248c-103.025,0.457-209.823,25.517-310.913,73.536
			c-75.058,37.122-148.173,89.529-211.67,154.174C46.232,529.978,6.431,577.76,0,628.74c0.76,44.162,48.153,98.67,77.417,131.764
			c59.543,62.106,130.754,113.013,211.67,154.174c2.75,1.335,5.51,2.654,8.276,3.955l-75.072,131.102l102.005,60.286l551.416-960.033
			l-98.186-60.008L669.727,273.516z M902.563,338.995l-74.927,129.857c34.47,44.782,54.932,100.006,54.932,159.888
			c0,149.257-126.522,270.264-282.642,270.264c-6.749,0-13.29-0.728-19.922-1.172l-49.585,85.84c22.868,2.449,45.99,4.233,69.58,4.541
			c103.123-0.463,209.861-25.812,310.84-73.535c75.058-37.122,148.246-89.529,211.743-154.174
			c31.186-32.999,70.985-80.782,77.417-131.764c-0.76-44.161-48.153-98.669-77.417-131.763
			c-59.543-62.106-130.827-113.013-211.743-154.175C908.108,341.478,905.312,340.287,902.563,338.995L902.563,338.995z
			M599.927,358.478c6.846,0,13.638,0.274,20.361,0.732l-58.081,100.561c-81.514,16.526-142.676,85.88-142.676,168.897
			c0,20.854,3.841,40.819,10.913,59.325c0.008,0.021-0.008,0.053,0,0.074l-58.228,100.854
			c-34.551-44.823-54.932-100.229-54.932-160.182C317.285,479.484,443.808,358.477,599.927,358.478L599.927,358.478z M768.896,570.513
			L638.013,797.271c81.076-16.837,141.797-85.875,141.797-168.603C779.81,608.194,775.724,588.729,768.896,570.513L768.896,570.513z"
			/>
</svg>
`, bo = `<?xml version="1.0" standalone="no"?>
<svg version="1.1"
	xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
	xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.9em" height="0.9em"
	viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200">
		<path id="path6686" inkscape:connector-curvature="0" d="M779.843,599.925c0,95.331-80.664,172.612-180.169,172.612
			c-99.504,0-180.168-77.281-180.168-172.612c0-95.332,80.664-172.612,180.168-172.612
			C699.179,427.312,779.843,504.594,779.843,599.925z M600,240.521c-103.025,0.457-209.814,25.538-310.904,73.557
			c-75.058,37.122-148.206,89.496-211.702,154.141C46.208,501.218,6.431,549,0,599.981c0.76,44.161,48.13,98.669,77.394,131.763
			c59.543,62.106,130.786,113.018,211.702,154.179c94.271,45.751,198.616,72.092,310.904,73.557
			c103.123-0.464,209.888-25.834,310.866-73.557c75.058-37.122,148.243-89.534,211.74-154.179
			c31.185-32.999,70.962-80.782,77.394-131.763c-0.76-44.161-48.13-98.671-77.394-131.764
			c-59.543-62.106-130.824-112.979-211.74-154.141C816.644,268.36,712.042,242.2,600,240.521z M599.924,329.769
			c156.119,0,282.675,120.994,282.675,270.251c0,149.256-126.556,270.25-282.675,270.25S317.249,749.275,317.249,600.02
			C317.249,450.763,443.805,329.769,599.924,329.769L599.924,329.769z"/>
</svg>
`;
class U {
  static createSVGElement(e) {
    return new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
  }
}
const ns = class Ve {
  // prettier-ignore
  static changeVisibility(e, t, i, n) {
    n.target.id === Ve.VISIBLE_ICON_ID ? (t.style.display = "none", i.style.display = "block", e.type = "password") : (t.style.display = "block", i.style.display = "none", e.type = "text");
  }
  static createIconElement(e, t) {
    const i = U.createSVGElement(e);
    return i.id = t, i.classList.add("visibility-icon"), i;
  }
  // prettier-ignore
  static create(e) {
    const t = document.createElement("div");
    t.id = "visibility-icon-container";
    const i = Ve.createIconElement(bo, Ve.VISIBLE_ICON_ID);
    i.style.display = "none", t.appendChild(i);
    const n = Ve.createIconElement(go, "not-visible-icon");
    return t.appendChild(n), t.onclick = Ve.changeVisibility.bind(
      this,
      e,
      i,
      n
    ), t;
  }
};
ns.VISIBLE_ICON_ID = "visible-icon";
let vo = ns;
class P {
  static createCautionText() {
    const e = document.createElement("a");
    return e.classList.add("insert-key-input-help-text"), e.innerText = "Please exercise CAUTION when inserting your API key outside of deepchat.dev or localhost!!", e;
  }
  static createHelpLink(e) {
    const t = document.createElement("a");
    return t.classList.add("insert-key-input-help-text"), t.href = e, t.innerText = "Find more info here", t.target = "_blank", t;
  }
  static createFailText() {
    const e = document.createElement("div");
    return e.id = "insert-key-input-invalid-text", e.style.display = "none", e;
  }
  static createHelpTextContainer(e, t = !0) {
    const i = document.createElement("div");
    i.id = "insert-key-help-text-container";
    const n = document.createElement("div");
    n.id = "insert-key-help-text-contents";
    const r = P.createFailText();
    if (n.appendChild(r), e) {
      const o = P.createHelpLink(e);
      n.appendChild(o);
    }
    if (t === !0) {
      const o = P.createCautionText();
      n.appendChild(o);
    }
    return i.appendChild(n), { helpTextContainerElement: i, failTextElement: r };
  }
  static onFail(e, t, i, n) {
    e.classList.replace("insert-key-input-valid", "insert-key-input-invalid"), i.innerText = n, i.style.display = "block", t.innerText = "Start", e.classList.remove("loading");
  }
  static onLoad(e, t) {
    e.classList.add("loading"), t.innerHTML = '<div id="loading-ring"></div>';
  }
  // prettier-ignore
  static verifyKey(e, t, i) {
    const n = e.value.trim();
    i.verifyKey(n, t);
  }
  // prettier-ignore
  static addVerificationEvents(e, t, i, n, r) {
    const o = {
      onSuccess: n,
      onFail: P.onFail.bind(this, e, t, i),
      onLoad: P.onLoad.bind(this, e, t)
    }, a = P.verifyKey.bind(this, e, o, r);
    t.onclick = a, e.onkeydown = (l) => {
      !e.classList.contains("loading") && l.key === R.ENTER && a();
    };
  }
  static createStartButton() {
    const e = document.createElement("div");
    return e.id = "start-button", e.innerText = "Start", e;
  }
  static onInputFocus(e) {
    e.target.classList.replace("insert-key-input-invalid", "insert-key-input-valid");
  }
  static createInput(e) {
    const t = document.createElement("div");
    t.id = "insert-key-input-container";
    const i = document.createElement("input");
    return i.id = "insert-key-input", i.placeholder = e || "API Key", i.type = "password", i.classList.add("insert-key-input-valid"), i.onfocus = P.onInputFocus, t.appendChild(i), t;
  }
  // prettier-ignore
  static createContents(e, t) {
    var d;
    const i = document.createElement("div");
    i.id = "insert-key-contents";
    const n = P.createInput(t.insertKeyPlaceholderText), r = n.children[0], o = vo.create(r);
    n.appendChild(o), i.appendChild(n);
    const a = P.createStartButton(), { helpTextContainerElement: l, failTextElement: c } = P.createHelpTextContainer(
      t.getKeyLink,
      (d = t.deepChat._insertKeyViewStyles) == null ? void 0 : d.displayCautionText
    );
    return i.appendChild(a), i.appendChild(l), P.addVerificationEvents(r, a, c, e, t), i;
  }
  static createElements(e, t) {
    const i = document.createElement("div");
    i.id = "insert-key-view";
    const n = P.createContents(e, t);
    return i.appendChild(n), i;
  }
  static render(e, t, i) {
    const n = P.createElements(t, i);
    e.replaceChildren(n);
  }
}
class Ft {
  static buildHeaders(e) {
    return {
      Authorization: `Bearer ${e}`,
      "Content-Type": "application/json"
      // bigcode/santacoder expects this so adding just-in-case
    };
  }
  // prettier-ignore
  static handleVerificationResult(e, t, i, n) {
    const r = e;
    Array.isArray(r.error) && r.error[0] === "Error in `parameters`: field required" ? i(t) : n(A.INVALID_KEY);
  }
  static buildKeyVerificationDetails() {
    return {
      url: "https://api-inference.huggingface.co/models/gpt2",
      method: "POST",
      handleVerificationResult: Ft.handleVerificationResult
    };
  }
}
const ss = class ji extends q {
  // prettier-ignore
  constructor(e, t, i, n, r, o) {
    super(
      e,
      Ft.buildKeyVerificationDetails(),
      Ft.buildHeaders,
      r,
      o
    ), this.insertKeyPlaceholderText = "Hugging Face Token", this.getKeyLink = "https://huggingface.co/settings/tokens", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Hugging Face</b></div>
    <p>First message may take an extented amount of time to complete as the model needs to be initialized.</p>`, this.permittedErrorPrefixes = ["Authorization header"], this.url = `${ji.URL_PREFIX}${i}`, this.textInputPlaceholderText = t, typeof n == "object" && (n.model && (this.url = `${ji.URL_PREFIX}${n.model}`), n.options && (this.rawBody.options = n.options), n.parameters && (this.rawBody.parameters = n.parameters));
  }
  // prettier-ignore
  preprocessBody(e, t, i) {
    const n = JSON.parse(JSON.stringify(e)), r = t[t.length - 1].text;
    if (r)
      return n.options ?? (n.options = {}), n.options.wait_for_model = !0, { inputs: r, ...n };
  }
  async callServiceAPI(e, t, i) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const n = this.preprocessBody(this.rawBody, t, i);
    w.request(this, n, e);
  }
};
ss.URL_PREFIX = "https://api-inference.huggingface.co/models/";
let Pe = ss;
class yt extends Pe {
  // prettier-ignore
  constructor(e, t, i, n, r, o) {
    super(e, t, i, n, r, o), this.isTextInputDisabled = !0, this.canSendMessage = yt.canSendFile;
  }
  static canSendFile(e, t) {
    return !!(t != null && t[0]);
  }
  preprocessBody(e, t, i) {
    return i[0];
  }
  // prettier-ignore
  async callServiceAPI(e, t, i) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    if (!(i != null && i[0]))
      throw new Error("No file was added");
    w.poll(this, i[0], e, !1);
  }
}
class yo extends yt {
  // prettier-ignore
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.audioClassification, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(
      e,
      "Attach an audio file",
      "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition",
      t,
      i,
      { audio: {} }
    );
  }
  async extractPollResultData(e) {
    var t;
    if (e.estimated_time)
      return { timeoutMS: (e.estimated_time + 1) * 1e3 };
    if (e.error)
      throw e.error;
    return { text: ((t = e[0]) == null ? void 0 : t.label) || "" };
  }
}
class xo extends yt {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.imageClassification, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Attach an image file", "google/vit-base-patch16-224", t, i, { images: {} });
  }
  async extractPollResultData(e) {
    var t;
    if (e.estimated_time)
      return { timeoutMS: (e.estimated_time + 1) * 1e3 };
    if (e.error)
      throw e.error;
    return { text: ((t = e[0]) == null ? void 0 : t.label) || "" };
  }
}
const xt = "data:image/png;base64,";
class re {
  static buildHeaders(e) {
    return {
      Authorization: `Bearer ${e}`,
      "Content-Type": "application/json"
    };
  }
  // prettier-ignore
  static handleVerificationResult(e, t, i, n) {
    e.message ? n(A.INVALID_KEY) : i(t);
  }
  static buildKeyVerificationDetails() {
    return {
      url: "https://api.stability.ai/v1/engines/list",
      method: "GET",
      handleVerificationResult: re.handleVerificationResult
    };
  }
}
class ni extends q {
  // prettier-ignore
  constructor(e, t, i, n, r) {
    super(e, t, i, n, r), this.insertKeyPlaceholderText = "Stability AI API Key", this.getKeyLink = "https://platform.stability.ai/docs/getting-started/authentication", this.permittedErrorPrefixes = ["Incorrect", "invalid_"];
  }
}
class zt extends ni {
  constructor(e) {
    var o;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t == null ? void 0 : t.stabilityAI, n = { images: { files: { acceptedFormats: ".png", maxNumberOfFiles: 1 } } };
    super(e, re.buildKeyVerificationDetails(), re.buildHeaders, i, n), this.url = "https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale", this.textInputPlaceholderText = "Describe image changes", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Stability AI</b></div>
    <div style="width: 100%; text-align: center; margin-left: -10px; margin-top: 5px"><b>Image to Image Upscale</b></div>
    <p>Upload an image to generate a new one with higher resolution.</p>
    <p>Click <a href="https://platform.stability.ai/">here</a> for more info.</p>`;
    const r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageUpscale;
    typeof r == "object" && (r.engine_id && (this.url = `https://api.stability.ai/v1/generation/${r.engine_id}/image-to-image/upscale`), zt.cleanConfig(r), Object.assign(this.rawBody, r)), this.canSendMessage = zt.canSendFileMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id;
  }
  static canSendFileMessage(e, t) {
    return !!(t != null && t[0]);
  }
  createFormDataBody(e, t) {
    const i = new FormData();
    return i.append("image", t), Object.keys(e).forEach((n) => {
      i.append(n, String(e[n]));
    }), i;
  }
  // prettier-ignore
  async callServiceAPI(e, t, i) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    if (!i)
      throw new Error("Image was not found");
    const n = this.createFormDataBody(this.rawBody, i[0]);
    _.tempRemoveContentHeader(
      this.requestSettings,
      w.request.bind(this, this, n, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.message)
      throw e.message;
    return { files: e.artifacts.map((i) => ({ src: `${xt}${i.base64}`, type: "image" })) };
  }
}
class qt extends ni {
  constructor(e) {
    var o;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t == null ? void 0 : t.stabilityAI, n = { images: { files: { acceptedFormats: ".png", maxNumberOfFiles: 2 } } };
    super(e, re.buildKeyVerificationDetails(), re.buildHeaders, i, n), this.url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image/masking", this._maskSource = "MASK_IMAGE_WHITE", this.textInputPlaceholderText = "Describe image changes", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Stability AI</b></div>
    <div style="width: 100%; text-align: center; margin-left: -10px; margin-top: 5px"><b>Image to Image Masking</b></div>
    <p>Upload an image, its mask image to create a new one based on the changes you have described for the mask area.</p>
    <p>Click <a href="https://platform.stability.ai/">here</a> for more info.</p>`;
    const r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageMasking;
    typeof r == "object" && (r.engine_id && (this.url = `https://api.stability.ai/v1/generation/${r.engine_id}/image-to-image/masking`), r.weight !== void 0 && r.weight !== null && (this._imageWeight = r.weight), r.mask_source !== void 0 && r.mask_source !== null && (this._maskSource = r.mask_source), qt.cleanConfig(r), Object.assign(this.rawBody, r)), this.canSendMessage = qt.canSendFileTextMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id, delete e.weight;
  }
  static canSendFileTextMessage(e, t) {
    return !!(t != null && t[0]) && !!(e && e.trim() !== "");
  }
  createFormDataBody(e, t, i, n) {
    const r = new FormData();
    return r.append("init_image", t), r.append("mask_source", String(this._maskSource)), r.append("mask_image", i), n && n !== "" && r.append("text_prompts[0][text]", n), this._imageWeight !== void 0 && this._imageWeight !== null && r.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach((o) => {
      r.append(o, String(e[o]));
    }), r.get("weight") === void 0 && r.append("weight", String(1)), r;
  }
  // prettier-ignore
  async callServiceAPI(e, t, i) {
    var o, a;
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    if (!i || !i[0] || !i[1])
      throw new Error("Image was not found");
    const n = (a = (o = t[t.length - 1]) == null ? void 0 : o.text) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, i[0], i[1], n);
    _.tempRemoveContentHeader(
      this.requestSettings,
      w.request.bind(this, this, r, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.message)
      throw e.message;
    return { files: e.artifacts.map((i) => ({ src: `${xt}${i.base64}`, type: "image" })) };
  }
}
class Eo extends yt {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.audioSpeechRecognition, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Attach an audio file", "facebook/wav2vec2-large-960h-lv60-self", t, i, { audio: {} });
  }
  async extractPollResultData(e) {
    if (e.estimated_time)
      return { timeoutMS: (e.estimated_time + 1) * 1e3 };
    if (e.error)
      throw e.error;
    return { text: e.text || "" };
  }
}
class So extends Pe {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.textGeneration, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Once upon a time", "gpt2", t, i);
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e[0].generated_text || "" };
  }
}
class _o extends Pe {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.questionAnswer, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Ask a question", "bert-large-uncased-whole-word-masking-finetuned-squad", t, i), this.permittedErrorPrefixes = ["Authorization header", "Error in"], this.context = t.context;
  }
  preprocessBody(e, t) {
    const i = t[t.length - 1].text;
    if (i)
      return {
        inputs: { question: i, context: this.context, options: { wait_for_model: !0 } }
      };
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e.answer || "" };
  }
}
class wo extends Pe {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.summarization, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Insert text to summarize", "facebook/bart-large-cnn", t, i);
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e[0].summary_text || "" };
  }
}
class Mo extends Pe {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.conversation, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Ask me anything!", "facebook/blenderbot-400M-distill", t, i), this.maxMessages ?? (this.maxMessages = -1);
  }
  // prettier-ignore
  processMessages(e) {
    const t = e.filter((a) => a.text), i = t[t.length - 1].text, n = t.slice(0, t.length - 1);
    if (!i)
      return;
    const r = n.filter((a) => a.role === "user").map((a) => a.text), o = n.filter((a) => a.role === "ai").map((a) => a.text);
    return { past_user_inputs: r, generated_responses: o, mostRecentMessageText: i };
  }
  // prettier-ignore
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e)), n = this.processMessages(t);
    if (n)
      return i.options ?? (i.options = {}), i.options.wait_for_model = !0, {
        inputs: {
          past_user_inputs: n.past_user_inputs,
          generated_responses: n.generated_responses,
          text: n.mostRecentMessageText
        },
        ...i
      };
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e.generated_text || "" };
  }
}
class Ut extends ni {
  constructor(e) {
    var o;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t.stabilityAI, n = { images: { files: { acceptedFormats: ".png", maxNumberOfFiles: 1 } } };
    super(e, re.buildKeyVerificationDetails(), re.buildHeaders, i, n), this.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image", this.textInputPlaceholderText = "Describe image changes", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Stability AI: Image to Image</b></div>
    <p>Upload an image to create a new one with the changes you have described.</p>
    <p>Click <a href="https://platform.stability.ai/">here</a> for more info.</p>`;
    const r = (o = t.stabilityAI) == null ? void 0 : o.imageToImage;
    typeof r == "object" && (r.engine_id && (this.url = `https://api.stability.ai/v1/generation/${r.engine_id}/text-to-image`), r.weight !== void 0 && r.weight !== null && (this._imageWeight = r.weight), Ut.cleanConfig(r), Object.assign(this.rawBody, r)), this.canSendMessage = Ut.canSendFileTextMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id, delete e.weight;
  }
  static canSendFileTextMessage(e, t) {
    return !!(t != null && t[0]) && !!(e && e.trim() !== "");
  }
  createFormDataBody(e, t, i) {
    const n = new FormData();
    return n.append("init_image", t), i && i !== "" && n.append("text_prompts[0][text]", i), this._imageWeight !== void 0 && this._imageWeight !== null && n.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach((r) => {
      n.append(r, String(e[r]));
    }), n.get("weight") === void 0 && n.append("weight", String(1)), n;
  }
  // prettier-ignore
  async callServiceAPI(e, t, i) {
    var o, a;
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    if (!i)
      throw new Error("Image was not found");
    const n = (a = (o = t[t.length - 1]) == null ? void 0 : o.text) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, i[0], n);
    _.tempRemoveContentHeader(
      this.requestSettings,
      w.request.bind(this, this, r, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.message)
      throw e.message;
    return { files: e.artifacts.map((i) => ({ src: `${xt}${i.base64}`, type: "image" })) };
  }
}
class To extends Pe {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.translation, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "Insert text to translate", "Helsinki-NLP/opus-tatoeba-en-ja", t, i);
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e[0].translation_text || "" };
  }
}
class Ht extends ni {
  constructor(e) {
    var r;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t.stabilityAI;
    super(e, re.buildKeyVerificationDetails(), re.buildHeaders, i), this.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", this.textInputPlaceholderText = "Describe an image", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Stability AI: Text to Image</b></div>
    <p>Insert text to generate an image.</p>
    <p>Click <a href="https://platform.stability.ai/">here</a> for more info.</p>`;
    const n = (r = t.stabilityAI) == null ? void 0 : r.textToImage;
    typeof n == "object" && (n.engine_id && (this.url = `https://api.stability.ai/v1/generation/${n.engine_id}/text-to-image`), n.weight !== void 0 && n.weight !== null && (this._imageWeight = n.weight), Ht.cleanConfig(n), Object.assign(this.rawBody, n)), this.canSendMessage = Ht.canSendTextMessage;
  }
  static cleanConfig(e) {
    delete e.engine_id, delete e.weight;
  }
  static canSendTextMessage(e) {
    return !!(e && e.trim() !== "");
  }
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e)), n = { text: t };
    return this._imageWeight && (n.weight = this._imageWeight), i.text_prompts = [n], i;
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t[t.length - 1].text);
    w.request(this, i, e);
  }
  async extractResultData(e) {
    if (e.message)
      throw e.message;
    return { files: e.artifacts.map((i) => ({ src: `${xt}${i.base64}`, type: "image" })) };
  }
}
class Co extends Pe {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.huggingFace) == null ? void 0 : r.fillMask, i = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    super(e, "The goal of life is [MASK].", "bert-base-uncased", t, i), this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Hugging Face</b></div>
    <p>Insert a sentence with the word [MASK] and the model will try to fill it for you. E.g. I want [MASK].</p>
    <p>First message may take an extented amount of time to complete as the model needs to be initialized.</p>`, this.permittedErrorPrefixes = ["Authorization header", "No mask_token"];
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e[0].sequence || "" };
  }
}
class Vt {
  static buildHeaders(e) {
    return {
      Authorization: `Bearer ${e}`,
      "Content-Type": "application/json",
      accept: "application/json"
    };
  }
  // prettier-ignore
  static handleVerificationResult(e, t, i, n) {
    var o;
    (o = e.message) != null && o.includes("invalid request: prompt must be at least 1 token long") ? i(t) : n(A.INVALID_KEY);
  }
  static buildKeyVerificationDetails() {
    return {
      url: "https://api.cohere.ai/v1/generate",
      method: "POST",
      handleVerificationResult: Vt.handleVerificationResult,
      body: JSON.stringify({ prompt: "" })
    };
  }
}
class Ji extends q {
  constructor(e, t, i, n, r) {
    super(e, Vt.buildKeyVerificationDetails(), Vt.buildHeaders, r), this.insertKeyPlaceholderText = "Cohere API Key", this.getKeyLink = "https://dashboard.cohere.ai/api-keys", this.permittedErrorPrefixes = ["invalid"], this.url = t, this.textInputPlaceholderText = i, n && typeof n == "object" && Object.assign(this.rawBody, n);
  }
}
class Ao extends Ji {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.cohere) == null ? void 0 : r.textGeneration, i = (o = e.directConnection) == null ? void 0 : o.cohere;
    super(e, "https://api.cohere.ai/v1/generate", "Once upon a time", t, i);
  }
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e)), n = t[t.length - 1].text;
    if (n)
      return { prompt: n, ...i };
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t);
    w.request(this, i, e);
  }
  async extractResultData(e) {
    var t;
    if (e.message)
      throw e.message;
    return { text: ((t = e.generations) == null ? void 0 : t[0].text) || "" };
  }
}
class ko extends Ji {
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.cohere) == null ? void 0 : r.summarization, i = (o = e.directConnection) == null ? void 0 : o.cohere;
    super(e, "https://api.cohere.ai/v1/summarize", "Insert text to summarize", t, i);
  }
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e)), n = t[t.length - 1].text;
    if (n)
      return { text: n, ...i };
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t);
    w.request(this, i, e);
  }
  async extractResultData(e) {
    if (e.message)
      throw e.message;
    return { text: e.summary || "" };
  }
}
class O {
  static buildHeaders(e) {
    return {
      Authorization: `Bearer ${e}`,
      "Content-Type": "application/json"
    };
  }
  // prettier-ignore
  static handleVerificationResult(e, t, i, n) {
    const r = e;
    r.error ? r.error.code === "invalid_api_key" ? n(A.INVALID_KEY) : n(A.CONNECTION_FAILED) : i(t);
  }
  static buildKeyVerificationDetails() {
    return {
      url: "https://api.openai.com/v1/models",
      method: "GET",
      handleVerificationResult: O.handleVerificationResult
    };
  }
  static async storeFiles(e, t, i) {
    const n = e.requestSettings.headers;
    if (!n)
      return;
    e.url = "https://api.openai.com/v1/files";
    const r = n[_.CONTENT_TYPE];
    delete n[_.CONTENT_TYPE];
    const o = i.map(async (a) => {
      const l = new FormData();
      return l.append("purpose", "assistants"), l.append("file", a), new Promise((c) => {
        c(O.directFetch(e, l, "POST", !1));
      });
    });
    try {
      const a = (await Promise.all(o)).map((l) => l.id);
      return n[_.CONTENT_TYPE] = r, a;
    } catch (a) {
      throw n[_.CONTENT_TYPE] = r, _.displayError(t, a), e.completionsHandlers.onFinish(), a;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async directFetch(e, t, i, n = !0) {
    e.requestSettings.method = i;
    const r = await _.fetch(e, e.requestSettings.headers, n, t).then(
      (o) => _.processResponseByType(o)
    );
    if (r.error)
      throw r.error.message;
    return r;
  }
}
const $i = class Bi extends q {
  constructor(e) {
    var r, o, a;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t == null ? void 0 : t.openAI;
    super(e, O.buildKeyVerificationDetails(), O.buildHeaders, i), this.insertKeyPlaceholderText = "OpenAI API Key", this.getKeyLink = "https://platform.openai.com/account/api-keys", this.url = "https://api.openai.com/v1/audio/speech", this.permittedErrorPrefixes = ["Invalid"], this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>OpenAI : Text To Speech</b></div>
    <p>Generate an audio file based on your text input.</p>
    <p>Click <a href="https://platform.openai.com/docs/guides/text-to-speech">here</a> for more information.</p>`;
    const n = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r.textToSpeech;
    typeof n == "object" && Object.assign(this.rawBody, n), (o = this.rawBody).model ?? (o.model = Bi.DEFAULT_MODEL), (a = this.rawBody).voice ?? (a.voice = Bi.DEFAULT_VOIDE), this.textInputPlaceholderText = "Insert text to generate audio", this.rawBody.response_format = "mp3";
  }
  preprocessBody(e, t) {
    var r, o;
    const i = JSON.parse(JSON.stringify(e)), n = (o = (r = t[t.length - 1]) == null ? void 0 : r.text) == null ? void 0 : o.trim();
    return n && n !== "" && (i.input = n), i;
  }
  async callServiceAPI(e, t) {
    var n;
    if (!((n = this.requestSettings) != null && n.headers))
      throw new Error("Request settings have not been set up");
    this.url = this.requestSettings.url || this.url;
    const i = this.preprocessBody(this.rawBody, t);
    w.request(this, i, e);
  }
  async extractResultData(e) {
    if (e instanceof Blob)
      return new Promise((t) => {
        const i = new FileReader();
        i.readAsDataURL(e), i.onload = (n) => {
          t({ files: [{ src: n.target.result, type: "audio" }] });
        };
      });
    if (e.error)
      throw e.error.message;
    return { error: "error" };
  }
};
$i.DEFAULT_MODEL = "tts-1";
$i.DEFAULT_VOIDE = "alloy";
let Io = $i;
const si = class Ee extends q {
  constructor(e) {
    var r, o;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t == null ? void 0 : t.openAI;
    super(e, O.buildKeyVerificationDetails(), O.buildHeaders, i, { audio: {} }), this.insertKeyPlaceholderText = "OpenAI API Key", this.getKeyLink = "https://platform.openai.com/account/api-keys", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>OpenAI : Speech To Text</b></div>
    <p><b>Upload an audio file</b> to transcribe it into text. You can optionally provide text to guide the audio
      processing.
    <p>Click <a href="https://platform.openai.com/docs/guides/speech-to-text">here</a> for more info.</p>`, this.url = "", this.permittedErrorPrefixes = ["Invalid"], this.textInputPlaceholderText = "Upload an audio file", this._service_url = Ee.AUDIO_TRANSCRIPTIONS_URL;
    const n = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r.audio;
    typeof n == "object" && (this.processConfig(n), Ee.cleanConfig(n), Object.assign(this.rawBody, n)), (o = this.rawBody).model ?? (o.model = Ee.DEFAULT_MODEL), this.rawBody.response_format = "json", this.canSendMessage = Ee.canSendFileMessage;
  }
  static canSendFileMessage(e, t) {
    return !!(t != null && t[0]);
  }
  processConfig(e) {
    e != null && e.type && e.type === "translation" && (this._service_url = Ee.AUDIO_TRANSLATIONS_URL, delete e.language);
  }
  static cleanConfig(e) {
    delete e.type;
  }
  static createFormDataBody(e, t) {
    const i = new FormData();
    return i.append("file", t), Object.keys(e).forEach((n) => {
      i.append(n, String(e[n]));
    }), i;
  }
  preprocessBody(e, t) {
    var r, o;
    const i = JSON.parse(JSON.stringify(e)), n = (o = (r = t[t.length - 1]) == null ? void 0 : r.text) == null ? void 0 : o.trim();
    return n && n !== "" && (i.prompt = n), i;
  }
  // prettier-ignore
  async callServiceAPI(e, t, i) {
    var o;
    if (!((o = this.requestSettings) != null && o.headers))
      throw new Error("Request settings have not been set up");
    if (!(i != null && i[0]))
      throw new Error("No file was added");
    this.url = this.requestSettings.url || this._service_url;
    const n = this.preprocessBody(this.rawBody, t), r = Ee.createFormDataBody(n, i[0]);
    _.tempRemoveContentHeader(
      this.requestSettings,
      w.request.bind(this, this, r, e),
      !1
    );
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error.message;
    return { text: e.text };
  }
};
si.AUDIO_TRANSCRIPTIONS_URL = "https://api.openai.com/v1/audio/transcriptions";
si.AUDIO_TRANSLATIONS_URL = "https://api.openai.com/v1/audio/translations";
si.DEFAULT_MODEL = "whisper-1";
let Lo = si;
class Z {
  static buildTextToSpeechHeaders(e, t) {
    return {
      "Ocp-Apim-Subscription-Key": t,
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": e
    };
  }
  static buildSpeechToTextHeaders(e) {
    return {
      "Ocp-Apim-Subscription-Key": e,
      Accept: "application/json"
    };
  }
  // prettier-ignore
  static handleSpeechVerificationResult(e, t, i, n) {
    e.error ? n(A.INVALID_KEY) : i(t);
  }
  static buildSpeechKeyVerificationDetails(e) {
    return {
      url: `https://${e}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`,
      method: "POST",
      createHeaders: (t) => ({ "Ocp-Apim-Subscription-Key": `${t}` }),
      handleVerificationResult: Z.handleSpeechVerificationResult
    };
  }
  static buildSummarizationHeader(e) {
    return {
      "Ocp-Apim-Subscription-Key": e,
      "Content-Type": "application/json"
    };
  }
  // prettier-ignore
  static handleLanguageVerificationResult(e, t, i, n) {
    var o;
    ((o = e.error) == null ? void 0 : o.code) === "401" ? n(A.INVALID_KEY) : i(t);
  }
  static buildLanguageKeyVerificationDetails(e) {
    return {
      url: `${e}/language/analyze-text/jobs?api-version=2022-10-01-preview`,
      method: "POST",
      createHeaders: (t) => ({ "Ocp-Apim-Subscription-Key": `${t}` }),
      handleVerificationResult: Z.handleLanguageVerificationResult
    };
  }
  // prettier-ignore
  static handleTranslationVerificationResult(e, t, i, n) {
    e.json().then((o) => {
      !Array.isArray(o) && o.error.code === 401e3 ? n(A.INVALID_KEY) : i(t);
    });
  }
  static buildTranslationKeyVerificationDetails(e) {
    return {
      url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es",
      method: "POST",
      createHeaders: (t) => Z.buildTranslationHeaders(e, t),
      handleVerificationResult: Z.handleTranslationVerificationResult
    };
  }
  static buildTranslationHeaders(e, t) {
    const i = {
      "Ocp-Apim-Subscription-Key": t,
      "Content-Type": "application/json"
    };
    return e && (i["Ocp-Apim-Subscription-Region"] = e), i;
  }
}
class Ro extends q {
  // prettier-ignore
  constructor(e, t, i, n, r) {
    super(
      e,
      Z.buildLanguageKeyVerificationDetails(i),
      t,
      n,
      r
    ), this.insertKeyPlaceholderText = "Azure Language Subscription Key", this.getKeyLink = // eslint-disable-next-line max-len
    "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal", this.permittedErrorPrefixes = ["Access"];
  }
}
class Oo extends Ro {
  constructor(e) {
    var n, r, o, a;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.azure) == null ? void 0 : r.summarization, i = (o = e.directConnection) == null ? void 0 : o.azure;
    super(e, Z.buildSummarizationHeader, t.endpoint, i), this.url = "", this.textInputPlaceholderText = "Insert text to summarize", (a = this.rawBody).language ?? (a.language = "en"), Object.assign(this.rawBody, t), this.url = `${t.endpoint}/language/analyze-text/jobs?api-version=2022-10-01-preview`;
  }
  preprocessBody(e, t) {
    const i = t[t.length - 1].text;
    if (i)
      return {
        analysisInput: {
          documents: [
            {
              id: "1",
              language: e.language,
              text: i
            }
          ]
        },
        tasks: [
          {
            kind: "ExtractiveSummarization"
          }
        ]
      };
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t);
    w.request(this, i, e), this.messages = e;
  }
  async extractResultData(e) {
    var t;
    if (e.error)
      throw e.error.message;
    if (this.messages && this.completionsHandlers) {
      const i = e.headers.get("operation-location"), n = { method: "GET", headers: (t = this.requestSettings) == null ? void 0 : t.headers };
      w.executePollRequest(this, i, n, this.messages);
    }
    return { makingAnotherRequest: !0 };
  }
  async extractPollResultData(e) {
    if (e.error)
      throw e.error;
    if (e.status === "running")
      return { timeoutMS: 2e3 };
    if (e.errors.length > 0)
      throw e.errors[0];
    if (e.tasks.items[0].results.errors.length > 0)
      throw e.tasks.items[0].results.errors[0];
    let t = "";
    for (const i of e.tasks.items[0].results.documents[0].sentences)
      t += i.text;
    return { text: t || "" };
  }
}
class ct {
  static async poll(e, t) {
    const i = {
      authorization: e,
      "content-type": "application/json"
    }, a = `https://api.assemblyai.com/v2/transcript/${(await (await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      body: JSON.stringify({ audio_url: t }),
      headers: i
    })).json()).id}`;
    let l;
    for (; !l; ) {
      const d = await (await fetch(a, { headers: i })).json();
      if (d.status === "completed")
        l = d;
      else {
        if (d.status === "error")
          throw new Error(`Transcription failed: ${d.error}`);
        await new Promise((u) => setTimeout(u, 3e3));
      }
    }
    return l;
  }
  static buildHeaders(e) {
    return {
      Authorization: e,
      "Content-Type": "application/octet-stream"
    };
  }
  // prettier-ignore
  static handleVerificationResult(e, t, i, n) {
    const r = e;
    r.error ? r.error.code === "invalid_api_key" ? n(A.INVALID_KEY) : n(A.CONNECTION_FAILED) : i(t);
  }
  static buildKeyVerificationDetails() {
    return {
      url: "https://api.assemblyai.com/v2/upload",
      method: "POST",
      handleVerificationResult: ct.handleVerificationResult
    };
  }
}
class Yi extends q {
  constructor(e) {
    var i;
    const t = (i = e.directConnection) == null ? void 0 : i.assemblyAI;
    super(e, ct.buildKeyVerificationDetails(), ct.buildHeaders, t, { audio: {} }), this.insertKeyPlaceholderText = "AssemblyAI API Key", this.getKeyLink = "https://www.assemblyai.com/app/account", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>AssemblyAI Audio</b></div>
    <p><b>Upload an audio file</b> to transcribe it into text.
    <p>
      Click <a href="https://www.assemblyai.com/docs/Guides/transcribing_an_audio_file#get-started">here</a> for more info.
    </p>`, this.url = "https://api.assemblyai.com/v2/upload", this.isTextInputDisabled = !0, this.textInputPlaceholderText = "Upload an audio file", this.permittedErrorPrefixes = ["Authentication", "Invalid"], this.canSendMessage = Yi.canFileSendMessage;
  }
  static canFileSendMessage(e, t) {
    return !!(t != null && t[0]);
  }
  async callServiceAPI(e, t, i) {
    var n;
    if (!((n = this.requestSettings) != null && n.headers))
      throw new Error("Request settings have not been set up");
    if (!(i != null && i[0]))
      throw new Error("No file was added");
    w.request(this, i[0], e, !1);
  }
  async extractResultData(e) {
    var n, r;
    if (e.error)
      throw e.error;
    const t = (r = (n = this.requestSettings) == null ? void 0 : n.headers) == null ? void 0 : r.Authorization;
    return { text: (await ct.poll(t, e.upload_url)).text };
  }
}
class rs extends q {
  // prettier-ignore
  constructor(e, t, i, n, r) {
    super(
      e,
      Z.buildSpeechKeyVerificationDetails(i),
      t,
      n,
      r
    ), this.insertKeyPlaceholderText = "Azure Speech Subscription Key", this.getKeyLink = // eslint-disable-next-line max-len
    "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal";
  }
}
const os = class as extends rs {
  // prettier-ignore
  constructor(e) {
    var n, r, o, a, l, c;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.azure) == null ? void 0 : r.textToSpeech, i = (o = e.directConnection) == null ? void 0 : o.azure;
    super(
      e,
      Z.buildTextToSpeechHeaders.bind({}, (t == null ? void 0 : t.outputFormat) || "audio-16khz-128kbitrate-mono-mp3"),
      t.region,
      i
    ), this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Azure Text To Speech</b></div>
    <p>Insert text to synthesize it to audio.
    <p>
      Click <a href="${as.HELP_LINK}">here</a> for more info.
    </p>`, this.url = "", Object.assign(this.rawBody, t), (a = this.rawBody).lang ?? (a.lang = "en-US"), (l = this.rawBody).name ?? (l.name = "en-US-JennyNeural"), (c = this.rawBody).gender ?? (c.gender = "Female"), this.url = `https://${t.region}.tts.speech.microsoft.com/cognitiveservices/v1`;
  }
  preprocessBody(e, t) {
    const i = t[t.length - 1].text;
    if (i)
      return `<speak version='1.0' xml:lang='${e.lang}'>
      <voice xml:lang='${e.lang}' xml:gender='${e.gender}' name='${e.name}'>
        ${i}
      </voice>
    </speak>`;
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t);
    w.request(this, i, e, !1);
  }
  async extractResultData(e) {
    return new Promise((t) => {
      const i = new FileReader();
      i.readAsDataURL(e), i.onload = (n) => {
        t({ files: [{ src: n.target.result, type: "audio" }] });
      };
    });
  }
};
os.HELP_LINK = // eslint-disable-next-line max-len
"https://learn.microsoft.com/en-GB/azure/cognitive-services/speech-service/get-started-text-to-speech?tabs=windows%2Cterminal&pivots=programming-language-rest";
let No = os;
const ls = class Fi extends rs {
  constructor(e) {
    var o, a, l;
    const t = (a = (o = e.directConnection) == null ? void 0 : o.azure) == null ? void 0 : a.speechToText, i = (l = e.directConnection) == null ? void 0 : l.azure, n = { audio: { files: { acceptedFormats: ".wav,.ogg" } } };
    super(e, Z.buildSpeechToTextHeaders, t.region, i, n), this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>Azure Speech To Text</b></div>
    <p><b>Upload a .wav or .ogg audio file</b> to transcribe it into text.
    <p>
      Click <a href="${Fi.HELP_LINK}">here</a> for more info.
    </p>`, this.url = "", this.isTextInputDisabled = !0, this.textInputPlaceholderText = "Upload an audio file", this.canSendMessage = Fi.canFileSendMessage;
    const r = t.lang || "en-US";
    this.url = `https://${t.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${r}&format=detailed`, this.recordAudio = void 0;
  }
  static canFileSendMessage(e, t) {
    return !!(t != null && t[0]);
  }
  async callServiceAPI(e, t, i) {
    var n, r;
    if (!((n = this.requestSettings) != null && n.headers))
      throw new Error("Request settings have not been set up");
    if (!(i != null && i[0]))
      throw new Error("No file was added");
    (r = this.requestSettings) != null && r.headers && (this.requestSettings.headers["Content-Type"] = i[0].name.toLocaleLowerCase().endsWith(".wav") ? "audio/wav; codecs=audio/pcm; samplerate=16000" : "audio/ogg; codecs=opus"), w.request(this, i[0], e, !1);
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error;
    return { text: e.DisplayText || "" };
  }
};
ls.HELP_LINK = // eslint-disable-next-line max-len
"https://learn.microsoft.com/en-GB/azure/cognitive-services/speech-service/get-started-text-to-speech?tabs=windows%2Cterminal&pivots=programming-language-rest";
let Po = ls;
class Do extends q {
  // prettier-ignore
  constructor(e) {
    var n, r, o;
    const t = (r = (n = e.directConnection) == null ? void 0 : n.azure) == null ? void 0 : r.translation, i = (o = e.directConnection) == null ? void 0 : o.azure;
    super(
      e,
      Z.buildTranslationKeyVerificationDetails(t.region),
      Z.buildTranslationHeaders.bind({}, t == null ? void 0 : t.region),
      i
    ), this.insertKeyPlaceholderText = "Azure Translate Subscription Key", this.getKeyLink = // eslint-disable-next-line max-len
    "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal", this.url = "", this.url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${t.language || "es"}`;
  }
  preprocessBody(e) {
    const t = e[e.length - 1].text;
    if (t)
      return [{ Text: t }];
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(t);
    w.request(this, i, e);
  }
  async extractResultData(e) {
    var t;
    if (Array.isArray(e))
      return { text: ((t = e[0].translations) == null ? void 0 : t[0].text) || "" };
    throw e.error;
  }
}
const Zi = class ae extends q {
  constructor(e) {
    var r, o, a, l, c;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t.openAI;
    super(e, O.buildKeyVerificationDetails(), O.buildHeaders, i), this.insertKeyPlaceholderText = "OpenAI API Key", this.getKeyLink = "https://platform.openai.com/account/api-keys", this.url = "", this.permittedErrorPrefixes = ["Incorrect"], this.searchedForThreadId = !1;
    const n = (r = t.openAI) == null ? void 0 : r.assistant;
    if (typeof n == "object") {
      this.rawBody.assistant_id = n.assistant_id;
      const { function_handler: d } = (a = (o = e.directConnection) == null ? void 0 : o.openAI) == null ? void 0 : a.assistant;
      d && (this._functionHandler = d);
    }
    (l = this.requestSettings).headers ?? (l.headers = {}), (c = this.requestSettings.headers)["OpenAI-Beta"] ?? (c["OpenAI-Beta"] = "assistants=v1"), this.maxMessages = 1;
  }
  processMessage(e, t) {
    const i = this.totalMessagesMaxCharLength || -1;
    return { content: Qe.getCharacterLimitMessages(e, i)[0].text || "", role: "user", file_ids: t };
  }
  createNewThreadMessages(e, t, i) {
    const n = JSON.parse(JSON.stringify(e)), r = this.processMessage(t, i);
    return n.thread = { messages: [r] }, n;
  }
  callService(e, t, i) {
    if (this.sessionId) {
      this.url = `${ae.THREAD_PREFIX}/${this.sessionId}/messages`;
      const n = this.processMessage(t, i);
      w.request(this, n, e);
    } else {
      this.url = `${ae.THREAD_PREFIX}/runs`;
      const n = this.createNewThreadMessages(this.rawBody, t, i);
      w.request(this, n, e);
    }
    this.messages = e;
  }
  async callServiceAPI(e, t, i) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    this.searchedForThreadId || this.searchPreviousMessagesForThreadId(e.messages);
    const n = i ? await O.storeFiles(this, e, i) : void 0;
    this.requestSettings.method = "POST", this.callService(e, t, n);
  }
  searchPreviousMessagesForThreadId(e) {
    const t = e.find((i) => i._sessionId);
    t && (this.sessionId = t._sessionId), this.searchedForThreadId = !0;
  }
  async extractResultData(e) {
    var n;
    if (e.error)
      throw e.error.message;
    await this.assignThreadAndRun(e);
    const t = `${ae.THREAD_PREFIX}/${this.sessionId}/runs/${this.run_id}`, i = { method: "GET", headers: (n = this.requestSettings) == null ? void 0 : n.headers };
    return w.executePollRequest(this, t, i, this.messages), { makingAnotherRequest: !0 };
  }
  async assignThreadAndRun(e) {
    if (this.sessionId) {
      this.url = `${ae.THREAD_PREFIX}/${this.sessionId}/runs`;
      const t = await O.directFetch(this, JSON.parse(JSON.stringify(this.rawBody)), "POST");
      this.run_id = t.id;
    } else
      this.sessionId = e.thread_id, this.run_id = e.id, this.messages && (this.messages.messages[this.messages.messages.length - 1]._sessionId = this.sessionId);
  }
  async extractPollResultData(e) {
    var r;
    const { status: t, required_action: i } = e;
    if (t === "queued" || t === "in_progress")
      return { timeoutMS: ae.POLLING_TIMEOUT_MS };
    if (t === "completed" && this.messages)
      return this.url = `${ae.THREAD_PREFIX}/${e.thread_id}/messages`, { text: (await O.directFetch(this, {}, "GET")).data[0].content[0].text.value, _sessionId: this.sessionId };
    const n = (r = i == null ? void 0 : i.submit_tool_outputs) == null ? void 0 : r.tool_calls;
    if (t === "requires_action" && n)
      return await this.handleTools(n);
    throw Error(`Thread run status: ${t}`);
  }
  // prettier-ignore
  async handleTools(e) {
    if (!this._functionHandler)
      throw Error(
        "Please define the `function_handler` property inside the [openAI](https://deepchat.dev/docs/directConnection/openAI#Assistant) object."
      );
    const t = e.map((r) => ({ name: r.function.name, arguments: r.function.arguments })), i = await this._functionHandler(t);
    if (!Array.isArray(i) || i.find((r) => typeof r != "string") || e.length !== i.length)
      throw Error("Response must contain an array of strings for each individual function/tool_call, see https://deepchat.dev/docs/directConnection/OpenAI/#assistant-functions.");
    const n = i.map((r, o) => ({ tool_call_id: e[o].id, output: r }));
    return this.url = `${ae.THREAD_PREFIX}/${this.sessionId}/runs/${this.run_id}/submit_tool_outputs`, await O.directFetch(this, { tool_outputs: n }, "POST"), { timeoutMS: ae.POLLING_TIMEOUT_MS };
  }
};
Zi.THREAD_PREFIX = "https://api.openai.com/v1/threads";
Zi.POLLING_TIMEOUT_MS = 800;
let jo = Zi;
const ri = class Se extends q {
  constructor(e) {
    var o;
    const { directConnection: t } = e, i = t == null ? void 0 : t.openAI, n = { images: { files: { acceptedFormats: ".png", maxNumberOfFiles: 2 } } };
    super(e, O.buildKeyVerificationDetails(), O.buildHeaders, i, n), this.insertKeyPlaceholderText = "OpenAI API Key", this.getKeyLink = "https://platform.openai.com/account/api-keys", this.introPanelMarkUp = `
    <div style="width: 100%; text-align: center; margin-left: -10px"><b>OpenAI DALL·E</b></div>
    <p><b>Insert text</b> to generate an image.</p>
    <p><b>Upload 1</b> PNG image to generate its variation and optionally insert text to specify the change.</p>
    <p><b>Upload 2</b> PNG images where the second is a copy of the first with a transparent area where the edit should
      take place and text to specify the edit.</p>
    <p>Click <a href="https://platform.openai.com/docs/guides/images/introduction">here</a> for more info.</p>`, this.url = "", this.permittedErrorPrefixes = ["Incorrect", "Invalid input image"];
    const r = (o = t == null ? void 0 : t.openAI) == null ? void 0 : o.images;
    if (this.camera) {
      const a = typeof r == "object" && r.size ? Number.parseInt(r.size) : 1024;
      this.camera.files = { dimensions: { width: a, height: a } };
    }
    typeof r == "object" && Object.assign(this.rawBody, r), this.canSendMessage = Se.canFileSendMessage;
  }
  static canFileSendMessage(e, t) {
    return !!(t != null && t[0]) || !!(e && e.trim() !== "");
  }
  static createFormDataBody(e, t, i) {
    const n = new FormData();
    return n.append("image", t), i && n.append("mask", i), Object.keys(e).forEach((r) => {
      n.append(r, String(e[r]));
    }), n;
  }
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e));
    return t && t !== "" && (i.prompt = t), i;
  }
  // prettier-ignore
  callApiWithImage(e, t, i) {
    var o, a;
    let n;
    const r = (a = (o = t[t.length - 1]) == null ? void 0 : o.text) == null ? void 0 : a.trim();
    if (i[1] || r && r !== "") {
      this.url = Se.IMAGE_EDIT_URL;
      const l = this.preprocessBody(this.rawBody, r);
      n = Se.createFormDataBody(l, i[0], i[1]);
    } else
      this.url = Se.IMAGE_VARIATIONS_URL, n = Se.createFormDataBody(this.rawBody, i[0]);
    _.tempRemoveContentHeader(
      this.requestSettings,
      w.request.bind(this, this, n, e),
      !1
    );
  }
  async callServiceAPI(e, t, i) {
    var n;
    if (!((n = this.requestSettings) != null && n.headers))
      throw new Error("Request settings have not been set up");
    if (i != null && i[0])
      this.callApiWithImage(e, t, i);
    else {
      if (!this.requestSettings)
        throw new Error("Request settings have not been set up");
      this.url = Se.IMAGE_GENERATION_URL;
      const r = this.preprocessBody(this.rawBody, t[t.length - 1].text);
      w.request(this, r, e);
    }
  }
  async extractResultData(e) {
    if (e.error)
      throw e.error.message;
    return { files: e.data.map((i) => i.url ? { src: i.url, type: "image" } : { src: `${xt}${i.b64_json}`, type: "image" }) };
  }
  // private static readonly MODAL_MARKDOWN = `
  // 1 image:
  // - With text - edits image based on the text
  // - No text - creates a variation of the image
  // 2 images:
  // - The second image needs to be a copy of the first with a transparent area where the edit should take place.
  // Add text to describe the required modification.
  // Click here for [more info](https://platform.openai.com/docs/guides/images/introduction).
  //   `;
};
ri.IMAGE_GENERATION_URL = "https://api.openai.com/v1/images/generations";
ri.IMAGE_VARIATIONS_URL = "https://api.openai.com/v1/images/variations";
ri.IMAGE_EDIT_URL = "https://api.openai.com/v1/images/edits";
let Bo = ri;
class dt extends q {
  constructor(e) {
    var r, o, a, l;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = t.openAI;
    super(e, O.buildKeyVerificationDetails(), O.buildHeaders, i), this.insertKeyPlaceholderText = "OpenAI API Key", this.getKeyLink = "https://platform.openai.com/account/api-keys", this.url = "https://api.openai.com/v1/chat/completions", this.permittedErrorPrefixes = ["Incorrect"], this._systemMessage = dt.generateSystemMessage("You are a helpful assistant.");
    const n = (r = t.openAI) == null ? void 0 : r.chat;
    if (typeof n == "object") {
      n.system_prompt && (this._systemMessage = dt.generateSystemMessage(n.system_prompt));
      const { function_handler: c } = (a = (o = e.directConnection) == null ? void 0 : o.openAI) == null ? void 0 : a.chat;
      c && (this._functionHandler = c), this.cleanConfig(n), Object.assign(this.rawBody, n);
    }
    this.maxMessages ?? (this.maxMessages = -1), (l = this.rawBody).model ?? (l.model = "gpt-3.5-turbo");
  }
  static generateSystemMessage(e) {
    return { role: "system", content: e };
  }
  cleanConfig(e) {
    delete e.system_prompt, delete e.function_handler;
  }
  static getContent(e) {
    if (e.files && e.files.length > 0) {
      const t = e.files.map((i) => ({ type: "image_url", image_url: { url: i.src } }));
      return e.text && e.text.trim().length > 0 && t.unshift({ type: "text", text: e.text }), t;
    }
    return e.text;
  }
  // prettier-ignore
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e)), n = Qe.getCharacterLimitMessages(
      t,
      this.totalMessagesMaxCharLength ? this.totalMessagesMaxCharLength - this._systemMessage.content.length : -1
    ).map((r) => ({
      content: dt.getContent(r),
      role: r.role === x.USER_ROLE ? "user" : "assistant"
    }));
    return t.find((r) => r.files && r.files.length > 0) && (i.max_tokens ?? (i.max_tokens = 300)), i.messages = [this._systemMessage, ...n], i;
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t), n = this.deepChat.stream;
    n && (typeof n != "object" || !n.simulation) || i.stream ? (i.stream = !0, C.request(this, i, e)) : w.request(this, i, e);
  }
  // prettier-ignore
  async extractResultData(e, t, i) {
    if (e.error)
      throw e.error.message;
    return e.choices[0].delta ? { text: e.choices[0].delta.content || "" } : e.choices[0].message ? e.choices[0].message.tool_calls ? this.handleTools(e.choices[0].message, t, i) : { text: e.choices[0].message.content } : { text: "" };
  }
  // prettier-ignore
  async handleTools(e, t, i) {
    var a;
    if (!e.tool_calls || !t || !i || !this._functionHandler)
      throw Error(
        "Please define the `function_handler` property inside the [openAI](https://deepchat.dev/docs/directConnection/openAI#Chat) object."
      );
    const n = JSON.parse(JSON.stringify(i)), r = e.tool_calls.map((l) => ({ name: l.function.name, arguments: l.function.arguments })), o = await ((a = this._functionHandler) == null ? void 0 : a.call(this, r));
    if (o.text)
      return { text: o.text };
    if (n.messages.push(e), Array.isArray(o) && !o.find((l) => typeof l != "string") || r.length === o.length) {
      o.forEach((c, d) => {
        var h;
        const u = (h = e.tool_calls) == null ? void 0 : h[d];
        n == null || n.messages.push({
          role: "tool",
          tool_call_id: u == null ? void 0 : u.id,
          name: u == null ? void 0 : u.function.name,
          content: c.response
        });
      }), delete n.tools, delete n.tool_choice;
      const l = await (t == null ? void 0 : t(n).then((c) => _.processResponseByType(c)));
      if (l.error)
        throw l.error.message;
      return { text: l.choices[0].message.content || "" };
    }
    throw Error(
      "Response object must either be {response: string}[] for each individual function or {text: string} for a direct response, see https://deepchat.dev/docs/directConnection/OpenAI#FunctionHandler."
    );
  }
}
class Fo extends Ji {
  constructor(e) {
    var r;
    const t = JSON.parse(JSON.stringify(e.directConnection)), i = (r = t.cohere) == null ? void 0 : r.chat, n = t.cohere;
    super(e, "https://api.cohere.ai/v1/chat", "Ask me anything!", i, n), typeof i == "object" && Object.assign(this.rawBody, i), this.maxMessages ?? (this.maxMessages = -1);
  }
  preprocessBody(e, t) {
    const i = JSON.parse(JSON.stringify(e)), n = t.filter((r) => r.text);
    return i.query = n[n.length - 1].text, i.chat_history = n.slice(0, n.length - 1).map((r) => ({ text: r.text, user_name: r.role === "ai" ? "CHATBOT" : "USER" })), i;
  }
  async callServiceAPI(e, t) {
    if (!this.requestSettings)
      throw new Error("Request settings have not been set up");
    const i = this.preprocessBody(this.rawBody, t);
    w.request(this, i, e);
  }
  async extractResultData(e) {
    if (e.message)
      throw e.message;
    return { text: e.text };
  }
}
const Et = class pe {
  static enableButtons(e, t, i = 0) {
    window.webLLM ? (e && (e.disabled = !1), t && (t.disabled = !1)) : i < cs.MODULE_SEARCH_LIMIT_S * 4 && setTimeout(() => pe.enableButtons(e, t, i + 1), 250);
  }
  static setUpInitial(e, t, i) {
    const n = (t == null ? void 0 : t.downloadClass) || pe.DOWNLOAD_BUTTON_CLASS, r = (t == null ? void 0 : t.uploadClass) || pe.UPLOAD_BUTTON_CLASS, o = (t == null ? void 0 : t.fileInputClass) || pe.FILE_INPUT_CLASS;
    return setTimeout(() => {
      const a = i == null ? void 0 : i.getElementsByClassName(n)[0], l = i == null ? void 0 : i.getElementsByClassName(o)[0], c = i == null ? void 0 : i.getElementsByClassName(r)[0];
      a && (a.onclick = () => e()), l && (l.onchange = () => {
        l.files && l.files.length > 0 && e(l.files);
      }), c && (c.onclick = () => l.click()), (a || c) && pe.enableButtons(a, c);
    }), (t == null ? void 0 : t.initialHtml) || `<div>
        Download or upload a web model that will run entirely on your browser: <br/> 
        <button disabled class="${n} deep-chat-button deep-chat-web-model-button">Download</button>
        <input type="file" class="${o}" hidden multiple />
        <button disabled class="${r} deep-chat-button deep-chat-web-model-button">Upload</button>
      </div>`;
  }
  static exportFile(e) {
    const t = document.createElement("a"), i = 4;
    for (let n = 0; n < e.length / i; n += 1)
      setTimeout(() => {
        const r = n * i;
        for (let o = r; o < Math.min(r + i, e.length); o += 1) {
          const a = URL.createObjectURL(e[o]);
          t.href = a, t.download = e[o].name, document.body.appendChild(t), t.click(), URL.revokeObjectURL(a);
        }
      }, 500 * n);
  }
  static setUpAfterLoad(e, t, i) {
    const n = (t == null ? void 0 : t.exportFilesClass) || pe.EXPORT_BUTTON_CLASS;
    return setTimeout(() => {
      const r = i == null ? void 0 : i.getElementsByClassName(n)[0];
      r && (r.onclick = () => pe.exportFile(e));
    }), (t == null ? void 0 : t.afterLoadHtml) || `<div>
        Model loaded successfully and has been cached for future requests. <br/>
        <button style="margin-top: 5px" class="${n} deep-chat-button">Export</button>
      </div>`;
  }
};
Et.DOWNLOAD_BUTTON_CLASS = "deep-chat-download-button";
Et.UPLOAD_BUTTON_CLASS = "deep-chat-upload-button";
Et.FILE_INPUT_CLASS = "deep-chat-file-input";
Et.EXPORT_BUTTON_CLASS = "deep-chat-export-button";
let vn = Et;
const yn = {
  model_list: [
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f32_1/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-13b-chat-hf-q4f32_1/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f32_1"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-13b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-70b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-70b-chat-hf-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f16_1/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f32_1/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_1"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-vicuna-v1-7b-q4f32_0/resolve/main/",
      local_id: "vicuna-v1-7b-q4f32_0"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-WizardCoder-15B-V1.0-q4f16_1/resolve/main/",
      local_id: "WizardCoder-15B-V1.0-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-WizardCoder-15B-V1.0-q4f32_1/resolve/main/",
      local_id: "WizardCoder-15B-V1.0-q4f32_1"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-WizardMath-7B-V1.0-q4f16_1/resolve/main/",
      local_id: "WizardMath-7B-V1.0-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-WizardMath-7B-V1.0-q4f32_1/resolve/main/",
      local_id: "WizardMath-7B-V1.0-q4f32_1"
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-WizardMath-13B-V1.0-q4f16_1/resolve/main/",
      local_id: "WizardMath-13B-V1.0-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-WizardMath-70B-V1.0-q4f16_1/resolve/main/",
      local_id: "WizardMath-70B-V1.0-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Mistral-7B-Instruct-v0.1-q4f16_1/resolve/main/",
      local_id: "Mistral-7B-Instruct-v0.1-q4f16_1",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Mistral-7B-Instruct-v0.1-q4f32_1/resolve/main/",
      local_id: "Mistral-7B-Instruct-v0.1-q4f32_1"
    },
    // Models below fit for 128MB buffer limit (e.g. webgpu on Android)
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f16_1-1k/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1-1k",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k",
      required_features: ["shader-f16"]
    },
    {
      model_url: "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k"
    }
  ],
  model_lib_map: {
    "Llama-2-7b-chat-hf-q4f32_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f32_1-webgpu.wasm",
    "Llama-2-13b-chat-hf-q4f32_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f32_1-webgpu.wasm",
    "Llama-2-7b-chat-hf-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f16_1-webgpu.wasm",
    "Llama-2-13b-chat-hf-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f16_1-webgpu.wasm",
    "Llama-2-70b-chat-hf-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf-q4f16_1-webgpu.wasm",
    "vicuna-v1-7b-q4f32_0": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/vicuna-v1-7b-q4f32_0-webgpu-v1.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f32_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f32_1-webgpu.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f16_1-webgpu.wasm",
    "WizardCoder-15B-V1.0-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/WizardCoder-15B-V1.0-q4f16_1-webgpu.wasm",
    "WizardCoder-15B-V1.0-q4f32_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/WizardCoder-15B-V1.0-q4f32_1-webgpu.wasm",
    "WizardMath-7B-V1.0-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f16_1-webgpu.wasm",
    "WizardMath-7B-V1.0-q4f32_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f32_1-webgpu.wasm",
    "WizardMath-13B-V1.0-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f16_1-webgpu.wasm",
    "WizardMath-70B-V1.0-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf-q4f16_1-webgpu.wasm",
    "Mistral-7B-Instruct-v0.1-q4f16_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.1-q4f16_1-sw4096_cs1024-webgpu.wasm",
    "Mistral-7B-Instruct-v0.1-q4f32_1": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.1-q4f32_1-sw4096_cs1024-webgpu.wasm",
    // Models below fit for 128MB buffer limit (e.g. webgpu on Android)
    "Llama-2-7b-chat-hf-q4f16_1-1k": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f16_1-1k-webgpu.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k-webgpu.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k": "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k-webgpu.wasm"
  },
  use_web_worker: !0
}, et = class M extends Le {
  constructor(e) {
    var t, i;
    super(e), this._isModelLoaded = !1, this._isModelLoading = !1, this._loadOnFirstMessage = !1, this._webModel = {}, this.permittedErrorPrefixes = [M.MULTIPLE_MODELS_ERROR, M.WEB_LLM_NOT_FOUND_ERROR, M.GENERIC_ERROR], this._conversationHistory = [], typeof e.webModel == "object" && (this._webModel = e.webModel), (t = this._webModel.load) != null && t.clearCache && M.clearAllCache(), this.findModelInWindow(e), this.canSendMessage = this.canSubmit.bind(this), this._chatEl = (i = e.shadowRoot) == null ? void 0 : i.children[0], e.initialMessages && M.setUpHistory(this._conversationHistory, e.initialMessages);
  }
  // need ref of messages object as web model exhibits unique behaviour to manipulate chat
  setUpMessages(e) {
    this._messages = e, this._removeIntro = () => {
      e.removeIntroductoryMessage(), this._removeIntro = void 0;
    };
  }
  static setUpHistory(e, t) {
    t.forEach((i, n) => {
      if (i.role === x.USER_ROLE && i.text) {
        const r = t[n + 1];
        r != null && r.text && r.role !== x.USER_ROLE && e.push([i.text, r.text]);
      }
    });
  }
  findModelInWindow(e, t = 0) {
    var i;
    window.webLLM ? this.configureInit(this.shouldAddInitialMessage(e.introMessage)) : t > M.MODULE_SEARCH_LIMIT_S ? ((i = this._messages) == null || i.addNewErrorMessage("service", M.WEB_LLM_NOT_FOUND_ERROR), console.error(
      "The WebLLM module is either not in the project or not been attached to the window object. Please see the following guide:"
    ), console.error("Hello World")) : setTimeout(() => this.findModelInWindow(e, t + 1), 1e3);
  }
  shouldAddInitialMessage(e) {
    var t;
    return !e && this._webModel && ((t = this._webModel.introMessage) == null ? void 0 : t.displayed) !== !1;
  }
  scrollToTop(e) {
    var t;
    ((t = this._webModel.introMessage) == null ? void 0 : t.autoScroll) !== !1 && setTimeout(() => {
      var i, n;
      (i = this._messages) != null && i.elementRef && Y.scrollToTop((n = this._messages) == null ? void 0 : n.elementRef);
    }, e);
  }
  getIntroMessage(e) {
    if (!this.shouldAddInitialMessage(e) || !this._chatEl)
      return;
    const t = vn.setUpInitial(this.init.bind(this), this._webModel.introMessage, this._chatEl);
    return this.scrollToTop(1), { role: x.AI_ROLE, html: t, sendUpdate: !1 };
  }
  async configureInit(e) {
    const { load: t } = this._webModel;
    if (t) {
      if (t.onInit) {
        this.init();
        return;
      }
      if (t.onMessage) {
        this._loadOnFirstMessage = !0;
        return;
      }
    }
    e || this.init();
  }
  async init(e) {
    const t = this.attemptToCreateChat();
    t && await this.loadModel(t, e);
  }
  attemptToCreateChat() {
    var t;
    if (M.chat) {
      (t = this._messages) == null || t.addNewErrorMessage("service", M.MULTIPLE_MODELS_ERROR), console.error(M.MULTIPLE_MODELS_ERROR);
      return;
    }
    if (this._isModelLoaded || this._isModelLoading)
      return;
    const { worker: e } = this._webModel;
    return yn.use_web_worker && e ? new window.webLLM.ChatWorkerClient(e) : new window.webLLM.ChatModule();
  }
  getConfig() {
    var i, n, r;
    let e = M.DEFAULT_MODEL;
    this._webModel.model && (e = this._webModel.model);
    const t = JSON.parse(JSON.stringify(yn));
    if ((i = this._webModel.urls) != null && i.model) {
      const o = t.model_list.find((a) => a.local_id = e);
      o && (o.model_url = this._webModel.urls.model);
    }
    if ((n = this._webModel.urls) != null && n.wasm) {
      const o = e;
      t.model_lib_map[o] && (t.model_lib_map[o] = this._webModel.urls.wasm);
    }
    return (r = this._webModel.load) != null && r.skipCache && (t.use_cache = !1), { model: e, appConfig: t };
  }
  async loadModel(e, t) {
    var o, a, l, c, d;
    this.scrollToTop(), M.chat = e, this._isModelLoading = !0;
    let i = ((o = this._webModel.introMessage) == null ? void 0 : o.displayed) === !1;
    const n = (u) => {
      var h;
      (h = this._messages) == null || h.addNewMessage({ html: `<div>${u.text}</div>`, overwrite: !0, sendUpdate: !1 }), i && (setTimeout(() => {
        var p;
        return Y.scrollToBottom((p = this._messages) == null ? void 0 : p.elementRef);
      }), i = !1);
    };
    M.chat.setInitProgressCallback(n);
    let r;
    try {
      const { model: u, appConfig: h } = this.getConfig(), p = { conv_config: { system: "keep responses to one sentence" } };
      this._conversationHistory.length > 0 && (p.conversation_history = this._conversationHistory), r = await M.chat.reload(u, p, h, t);
    } catch (u) {
      return this.unloadChat(u);
    }
    if ((a = this._webModel.introMessage) != null && a.removeAfterLoad)
      this._webModel.introMessage.displayed === !1 ? (c = this._messages) == null || c.removeLastMessage() : (d = this._removeIntro) == null || d.call(this);
    else {
      const u = vn.setUpAfterLoad(r, this._webModel.introMessage, this._chatEl);
      (l = this._messages) == null || l.addNewMessage({ html: u, overwrite: !0, sendUpdate: !1 });
    }
    this._isModelLoaded = !0, this._isModelLoading = !1;
  }
  async generateResp(e, t, i) {
    const n = t[t.length - 1].text;
    try {
      this.deepChat.stream ? this.streamResp(e, n, i) : this.immediateResp(e, n, i);
    } catch (r) {
      this.unloadChat(r);
    }
  }
  async immediateResp(e, t, i) {
    const n = await i.generate(t, void 0, 0);
    e.addNewMessage({ text: n }), this.completionsHandlers.onFinish();
  }
  async streamResp(e, t, i) {
    this.streamHandlers.abortStream.abort = () => {
      i.interruptGenerate();
    }, this.streamHandlers.onOpen();
    const n = new Ze(e);
    await i.generate(t, (r, o) => {
      n.upsertStreamedMessage({ text: o, overwrite: !0 });
    }), n.finaliseStreamedMessage(), this.streamHandlers.onClose();
  }
  canSubmit(e) {
    return !(e != null && e.trim()) || this._isModelLoading ? !1 : this._loadOnFirstMessage ? !0 : !!this._isModelLoaded;
  }
  async callServiceAPI(e, t) {
    var i, n;
    if (!this._isModelLoaded)
      if (this._loadOnFirstMessage)
        await this.init();
      else
        return;
    !M.chat || this._isModelLoading || ((i = this._webModel.introMessage) != null && i.removeAfterMessage && ((n = this._removeIntro) == null || n.call(this)), e.addLoadingMessage(), this.generateResp(e, t, M.chat));
  }
  async unloadChat(e) {
    var t;
    (t = this._messages) == null || t.addNewErrorMessage("service", M.GENERIC_ERROR), console.error(e), this._isModelLoaded = !1, this._isModelLoading = !1, M.chat && (await M.chat.unload(), M.chat = void 0);
  }
  isWebModel() {
    return !0;
  }
  static clearAllCache() {
    M.clearCache("webllm/model"), M.clearCache("webllm/wasm");
  }
  static clearCache(e) {
    caches.open(e).then((t) => {
      t.keys().then((i) => {
        i.forEach((n) => {
          t.delete(n);
        });
      });
    });
  }
};
et.GENERIC_ERROR = "Error, please check the following list of [instructions](https://deepchat.dev/docs/webModel#error) to fix this.";
et.MULTIPLE_MODELS_ERROR = "Cannot run multiple web models";
et.WEB_LLM_NOT_FOUND_ERROR = "WebLLM module not found";
et.DEFAULT_MODEL = "Llama-2-7b-chat-hf-q4f32_1";
et.MODULE_SEARCH_LIMIT_S = 5;
let cs = et;
class zo {
  static create(e) {
    const { directConnection: t, request: i, demo: n, webModel: r } = e;
    if (r)
      return new cs(e);
    if (t) {
      if (t.openAI)
        return t.openAI.images ? new Bo(e) : t.openAI.speechToText ? new Lo(e) : t.openAI.textToSpeech ? new Io(e) : t.openAI.assistant ? new jo(e) : new dt(e);
      if (t.assemblyAI)
        return new Yi(e);
      if (t.cohere)
        return t.cohere.textGeneration ? new Ao(e) : t.cohere.summarization ? new ko(e) : new Fo(e);
      if (t.huggingFace)
        return t.huggingFace.textGeneration ? new So(e) : t.huggingFace.summarization ? new wo(e) : t.huggingFace.translation ? new To(e) : t.huggingFace.fillMask ? new Co(e) : t.huggingFace.questionAnswer ? new _o(e) : t.huggingFace.audioSpeechRecognition ? new Eo(e) : t.huggingFace.audioClassification ? new yo(e) : t.huggingFace.imageClassification ? new xo(e) : new Mo(e);
      if (t.azure) {
        if (t.azure.speechToText)
          return new Po(e);
        if (t.azure.textToSpeech)
          return new No(e);
        if (t.azure.summarization)
          return new Oo(e);
        if (t.azure.translation)
          return new Do(e);
      }
      if (t.stabilityAI)
        return t.stabilityAI.imageToImage ? new Ut(e) : t.stabilityAI.imageToImageUpscale ? new zt(e) : t.stabilityAI.imageToImageMasking ? new qt(e) : new Ht(e);
    }
    return i ? new Le(e) : new Le(e, void 0, n || !0);
  }
}
const ds = class zi {
  static appendStyleSheetToHead() {
    const e = document.getElementsByTagName("head")[0];
    if (!Array.from(e.getElementsByTagName("link")).some(
      (i) => i.getAttribute("href") === zi.FONT_URL
    )) {
      const i = document.createElement("link");
      i.rel = "stylesheet", i.href = zi.FONT_URL, e.appendChild(i);
    }
  }
};
ds.FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap";
let qo = ds;
class us {
}
us.attibutes = {
  string: (s) => s,
  number: (s) => parseFloat(s),
  boolean: (s) => s === "true",
  object: (s) => JSON.parse(s),
  array: (s) => JSON.parse(s),
  function: (s) => new Function(`return ${s}`)()
};
function v(s) {
  return function(e, t) {
    Object.defineProperty(e, t, {});
    const i = e.constructor, n = t.toLocaleLowerCase();
    i._attributes_[n] = us.attibutes[s], i._attributeToProperty_[n] = t;
  };
}
class Qi {
  static colorToHex(e) {
    const t = document.createElement("div");
    return t.style.color = e, document.body.appendChild(t), `#${window.getComputedStyle(t).color.match(/\d+/g).map((r) => parseInt(r).toString(16).padStart(2, "0")).join("")}`;
  }
  static set(e, t) {
    var i, n, r, o;
    if ((n = (i = t == null ? void 0 : t.loading) == null ? void 0 : i.bubble) != null && n.color) {
      const a = Qi.colorToHex((o = (r = t == null ? void 0 : t.loading) == null ? void 0 : r.bubble) == null ? void 0 : o.color);
      e.style.setProperty("--message-dots-color", a), e.style.setProperty("--message-dots-color-fade", `${a}33`);
    } else
      e.style.setProperty("--message-dots-color", "#848484"), e.style.setProperty("--message-dots-color-fade", "#55555533");
  }
}
class Gt {
  constructor(e, t, i) {
    this._isDisplayed = !1, e ? (this._elementRef = this.createIntroPanelWithChild(e, i), this._isDisplayed = !0) : t && (this._elementRef = this.createInternalIntroPanel(t, i), this._isDisplayed = !0);
  }
  static createIntroPanel(e) {
    const t = document.createElement("div");
    return t.classList.add("intro-panel"), Object.assign(t.style, e), t;
  }
  createIntroPanelWithChild(e, t) {
    const i = Gt.createIntroPanel(t);
    return e.style.display === "none" && (e.style.display = "block"), i.appendChild(e), i;
  }
  createInternalIntroPanel(e, t) {
    const i = Gt.createIntroPanel(t);
    return i.id = "internal-intro-panel", i.innerHTML = e, i;
  }
  hide() {
    this._isDisplayed && this._elementRef && (this._elementRef.style.display = "none", this._isDisplayed = !1);
  }
  display() {
    !this._isDisplayed && this._elementRef && (this._elementRef.style.display = "", this._isDisplayed = !0);
  }
}
class Uo {
  static getText(e, t) {
    var i, n;
    if (!e.directConnection && !e.request && !e.webModel && !e.demo)
      return `Connect to any API using the [request](https://deepchat.dev/docs/connect#Request)
        property or choose any one of the preconfigured APIs via
        the [directConnection](https://deepchat.dev/docs/directConnection/#directConnection) property.
        
 To get started checkout the [Start](https://deepchat.dev/start) page and
        live code [examples](https://deepchat.dev/examples/frameworks).
        
 To remove this message set the [demo](https://deepchat.dev/docs/demo#demo) property to true.`;
    if (e.directConnection) {
      if (!t.isDirectConnection())
        return `Please define a valid service inside
          the [directConnection](https://deepchat.dev/docs/directConnection/#directConnection) object.`;
      const r = (i = e.directConnection.openAI) == null ? void 0 : i.chat;
      if (typeof r == "object" && r.tools && !r.function_handler)
        return "Please define the `function_handler` property inside the openAI [chat](https://deepchat.dev/docs/directConnection/openAI#Chat) object.";
      const o = (n = e.directConnection.openAI) == null ? void 0 : n.assistant;
      if (typeof o == "boolean" || o && !o.assistant_id)
        return "Please define the `assistant_id` property inside the openAI [assistant](https://deepchat.dev/docs/directConnection/openAI#Assistant) object.";
    } else if (e.request && !e.request.url && !e.request.handler)
      return "Please define a `url` or a `handler` property inside the [request](https://deepchat.dev/docs/connect#Request) object.";
    return null;
  }
}
const Ho = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="50 30 420 450" xml:space="preserve">
<g filter="brightness(0) saturate(100%) invert(16%) sepia(0%) saturate(1942%) hue-rotate(215deg) brightness(99%) contrast(93%)">
	<g>
		<path d="M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008
			C350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237
			h333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931
			l50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278
			c-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239
			h66.527V486.763z"/>
	</g>
</g>
<g>
	<g>
		<path d="M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175
			c6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z"/>
	</g>
</g>
<g>
	<g>
		<path d="M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175
			c6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z"/>
	</g>
</g>
<g>
	<g>
		<path d="M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175
			c6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z"/>
	</g>
</g>
<g>
	<g>
		<path d="M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256
			c6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z"/>
	</g>
</g>
</svg>`;
class fe {
  static createImage(e, t) {
    const i = new Image();
    return i.src = e.src, ne.scrollDownOnImageLoad(i.src, t), ne.processContent(i, i.src);
  }
  // WORK - should base64 images be clickable?
  // WORK - image still does not scroll down when loaded
  static async addNewImageMessage(e, t, i) {
    const n = fe.createImage(t, e.elementRef), r = e.createNewMessageElement("", i);
    r.bubbleElement.appendChild(n), r.bubbleElement.classList.add("image-message"), ne.addMessage(e, r, "image", i);
  }
  static createAudioElement(e, t) {
    const i = document.createElement("audio");
    return i.src = e.src, i.classList.add("audio-player"), i.controls = !0, ge.IS_SAFARI && (i.classList.add("audio-player-safari"), i.classList.add(
      t === x.USER_ROLE ? "audio-player-safari-right" : "audio-player-safari-left"
    )), i;
  }
  static addNewAudioMessage(e, t, i) {
    const n = fe.createAudioElement(t, i), r = e.createNewMessageElement("", i);
    r.bubbleElement.appendChild(n), r.bubbleElement.classList.add("audio-message"), ne.addMessage(e, r, "audio", i);
  }
  static createAnyFile(e) {
    const t = document.createElement("div");
    t.classList.add("any-file-message-contents");
    const i = document.createElement("div");
    i.classList.add("any-file-message-icon-container");
    const n = U.createSVGElement(Ho);
    n.classList.add("any-file-message-icon"), i.appendChild(n);
    const r = document.createElement("div");
    return r.classList.add("any-file-message-text"), r.textContent = e.name || ne.DEFAULT_FILE_NAME, t.appendChild(i), t.appendChild(r), ne.processContent(t, e.src);
  }
  static addNewAnyFileMessage(e, t, i) {
    const n = e.createNewMessageElement("", i), r = fe.createAnyFile(t);
    n.bubbleElement.classList.add("any-file-message-bubble"), n.bubbleElement.appendChild(r), ne.addMessage(e, n, "file", i);
  }
  // no overwrite previous message logic as it is complex to track which files are to be overwritten
  static addMessages(e, t, i) {
    t.forEach((n) => {
      var r, o;
      n.ref && (n = ne.removeFileRef(n)), n.type === "audio" || (r = n.src) != null && r.startsWith("data:audio") ? fe.addNewAudioMessage(e, n, i) : n.type === "image" || (o = n.src) != null && o.startsWith("data:image") ? fe.addNewImageMessage(e, n, i) : fe.addNewAnyFileMessage(e, n, i);
    });
  }
}
class me extends Ke {
  constructor(e, t, i) {
    var a, l;
    super(e);
    const { permittedErrorPrefixes: n, introPanelMarkUp: r, demo: o } = t;
    this._errorMessageOverrides = (a = e.errorMessages) == null ? void 0 : a.overrides, this._onClearMessages = jt.onClearMessages.bind(this, e), this._onError = jt.onError.bind(this, e), this._displayLoadingMessage = me.getDisplayLoadingMessage(e, t), this._permittedErrorPrefixes = n, this.addSetupMessageIfNeeded(e, t), this.populateIntroPanel(i, r, e.introPanelStyle), this.addIntroductoryMessage(e, t), e.initialMessages && this.populateInitialMessages(e.initialMessages), this._displayServiceErrorMessages = (l = e.errorMessages) == null ? void 0 : l.displayServiceErrorMessages, e.getMessages = () => JSON.parse(JSON.stringify(this.messages)), e.clearMessages = this.clearMessages.bind(this, t), e.refreshMessages = this.refreshTextMessages.bind(this), e.scrollToBottom = Y.scrollToBottom.bind(this, this.elementRef), t.isWebModel() && t.setUpMessages(this), o && this.prepareDemo(o), e.textToSpeech && Nt.processConfig(e.textToSpeech, (c) => {
      this.textToSpeech = c;
    });
  }
  static getDisplayLoadingMessage(e, t) {
    return t.websocket ? !1 : e.displayLoadingBubble ?? !0;
  }
  prepareDemo(e) {
    typeof e == "object" && (e.response && (this.customDemoResponse = e.response), e.displayErrors && (e.displayErrors.default && this.addNewErrorMessage("", ""), e.displayErrors.service && this.addNewErrorMessage("service", ""), e.displayErrors.speechToText && this.addNewErrorMessage("speechToText", "")), e.displayLoadingBubble && this.addLoadingMessage());
  }
  addSetupMessageIfNeeded(e, t) {
    const i = Uo.getText(e, t);
    if (i) {
      const n = this.createAndAppendNewMessageElement(i, x.AI_ROLE);
      this.applyCustomStyles(n, x.AI_ROLE, !1);
    }
  }
  // WORK - const file for deep chat classes
  addIntroductoryMessage(e, t) {
    var n;
    e != null && e.shadowRoot && (this._introMessage = e.introMessage);
    let i = this._introMessage;
    if (t != null && t.isWebModel() && (i ?? (i = t.getIntroMessage(i))), i) {
      let r;
      i != null && i.text ? r = this.createAndAppendNewMessageElement(i.text, x.AI_ROLE) : i != null && i.html && (r = Ye.add(this, i.html, x.AI_ROLE, this.messageElementRefs)), r && (this.applyCustomStyles(r, x.AI_ROLE, !1, (n = this.messageStyles) == null ? void 0 : n.intro), r.outerContainer.classList.add("deep-chat-intro"));
    }
  }
  removeIntroductoryMessage() {
    const e = this.messageElementRefs[0];
    e.outerContainer.classList.contains("deep-chat-intro") && (e.outerContainer.remove(), this.messageElementRefs.shift());
  }
  populateInitialMessages(e) {
    e.forEach((t) => {
      ke.processInitialMessageFile(t), this.addNewMessage(t, !0);
    }), setTimeout(() => Y.scrollToBottom(this.elementRef));
  }
  // this should not be activated by streamed messages
  addNewMessage(e, t = !1) {
    const i = me.createMessageContent(e), n = { status: e.overwrite };
    if (!e.ignoreText && i.text !== void 0 && e.text !== null && (this.addNewTextMessage(i.text, i.role, n), !t && this.textToSpeech && i.role !== x.USER_ROLE && Nt.speak(i.text, this.textToSpeech)), i.files && Array.isArray(i.files) && fe.addMessages(this, i.files, i.role), i.html !== void 0 && i.html !== null) {
      const r = Ye.add(this, i.html, i.role, this.messageElementRefs, n);
      be.isElementTemporary(r) && delete i.html;
    }
    this.updateStateOnMessage(i, e.overwrite, e.sendUpdate, t);
  }
  updateStateOnMessage(e, t, i = !0, n = !1) {
    t || this.messages.push(e), i && this.sendClientUpdate(e, n);
  }
  // prettier-ignore
  removeMessageOnError() {
    const e = this.messageElementRefs[this.messageElementRefs.length - 1], t = e == null ? void 0 : e.bubbleElement;
    (t != null && t.classList.contains(Ze.MESSAGE_CLASS) && t.textContent === "" || me.isTemporaryElement(e)) && this.removeLastMessage();
  }
  // prettier-ignore
  addNewErrorMessage(e, t) {
    var l, c, d, u, h;
    this.removeMessageOnError();
    const i = me.createBaseElements(), { outerContainer: n, bubbleElement: r } = i;
    r.classList.add("error-message-text");
    const o = this.getPermittedMessage(t) || ((l = this._errorMessageOverrides) == null ? void 0 : l[e]) || ((c = this._errorMessageOverrides) == null ? void 0 : c.default) || "Error, please try again.";
    this.renderText(r, o);
    const a = D.extractParticularSharedStyles(
      ["fontSize", "fontFamily"],
      (d = this.messageStyles) == null ? void 0 : d.default
    );
    D.applyCustomStylesToElements(i, !1, a), D.applyCustomStylesToElements(i, !1, (u = this.messageStyles) == null ? void 0 : u.error), this.elementRef.appendChild(n), Y.scrollToBottom(this.elementRef), this.textToSpeech && Nt.speak(o, this.textToSpeech), (h = this._onError) == null || h.call(this, o);
  }
  static checkPermittedErrorPrefixes(e, t) {
    for (let i = 0; i < e.length; i += 1)
      if (t.startsWith(e[i]))
        return t;
  }
  getPermittedMessage(e) {
    if (e) {
      if (this._displayServiceErrorMessages)
        return e;
      if (typeof e == "string" && this._permittedErrorPrefixes) {
        const t = me.checkPermittedErrorPrefixes(this._permittedErrorPrefixes, e);
        if (t)
          return t;
      } else if (Array.isArray(e) && this._permittedErrorPrefixes)
        for (let t = 0; t < e.length; t += 1) {
          const i = me.checkPermittedErrorPrefixes(this._permittedErrorPrefixes, e[t]);
          if (i)
            return i;
        }
    }
  }
  isLastMessageError() {
    var e;
    return (e = x.getLastMessageBubbleElement(this.elementRef)) == null ? void 0 : e.classList.contains("error-message-text");
  }
  removeError() {
    this.isLastMessageError() && x.getLastMessageElement(this.elementRef).remove();
  }
  addLoadingMessage() {
    var r;
    if (!this._displayLoadingMessage)
      return;
    const e = this.createMessageElements("", x.AI_ROLE), { outerContainer: t, bubbleElement: i } = e;
    i.classList.add("loading-message-text");
    const n = document.createElement("div");
    n.classList.add("dots-flashing"), i.appendChild(n), this.applyCustomStyles(e, x.AI_ROLE, !1, (r = this.messageStyles) == null ? void 0 : r.loading), Qi.set(i, this.messageStyles), this.elementRef.appendChild(t), Y.scrollToBottom(this.elementRef);
  }
  populateIntroPanel(e, t, i) {
    (e || t) && (this._introPanel = new Gt(e, t, i), this._introPanel._elementRef && (se.apply(this, this._introPanel._elementRef), this.elementRef.appendChild(this._introPanel._elementRef)));
  }
  async addMultipleFiles(e) {
    return Promise.all(
      (e || []).map((t) => new Promise((i) => {
        if (!t.type || t.type === "any") {
          const n = t.file.name || ne.DEFAULT_FILE_NAME;
          i({ name: n, type: "any", ref: t.file });
        } else {
          const n = new FileReader();
          n.readAsDataURL(t.file), n.onload = () => {
            i({ src: n.result, type: t.type, ref: t.file });
          };
        }
      }))
    );
  }
  // WORK - update all message classes to use deep-chat prefix
  clearMessages(e, t) {
    var n, r;
    const i = [];
    this.messageElementRefs.forEach((o) => {
      const a = o.bubbleElement.classList;
      a.contains("loading-message-text") || a.contains(Ze.MESSAGE_CLASS) ? i.push(o) : o.outerContainer.remove();
    }), Array.from(this.elementRef.children).forEach((o) => {
      var l;
      const a = (l = o.children[0]) == null ? void 0 : l.children[0];
      a != null && a.classList.contains("error-message-text") && o.remove();
    }), this.messageElementRefs = i, t !== !1 && ((n = this._introPanel) != null && n._elementRef && this._introPanel.display(), this.addIntroductoryMessage()), this.messages.splice(0, this.messages.length), this.textElementsToText.splice(0, this.textElementsToText.length), (r = this._onClearMessages) == null || r.call(this), delete e.sessionId;
  }
}
const St = class W {
  static adjustInputPadding(e, t) {
    t["inside-left"].length > 0 && e.classList.add("text-input-inner-left-adjustment"), t["inside-right"].length > 0 && e.classList.add("text-input-inner-right-adjustment");
  }
  static adjustForOutsideButton(e, t, i) {
    i["outside-right"].length === 0 && i["outside-left"].length > 0 ? (e[0].classList.add(W.INPUT_OUTSIDE_LEFT_SMALL_ADJUSTMENT_CLASS), t.classList.add(W.INPUT_OUTSIDE_LEFT_SMALL_ADJUSTMENT_CLASS)) : i["outside-left"].length === 0 && i["outside-right"].length > 0 && (e[3].classList.add(W.INPUT_OUTSIDE_RIGHT_SMALL_ADJUSTMENT_CLASS), t.classList.add(W.INPUT_OUTSIDE_RIGHT_SMALL_ADJUSTMENT_CLASS));
  }
  // when submit is the only button
  // when submit button is outside by itself - we increase the height for a better look
  static adjustOutsideSubmit(e, t, i) {
    if (!(i["inside-left"].length > 0 || i["inside-right"].length > 0)) {
      if (i["outside-right"].length === 0 && i["outside-left"].length > 0)
        return e[0].classList.add(W.INPUT_OUTSIDE_LEFT_ADJUSTMENT_CLASS), t.classList.add(W.INPUT_OUTSIDE_LEFT_ADJUSTMENT_CLASS), i["outside-left"].map((n) => n.button.elementRef.classList.add("submit-button-enlarged"));
      if (i["outside-left"].length === 0 && i["outside-right"].length > 0)
        return e[3].classList.add(W.INPUT_OUTSIDE_RIGHT_ADJUSTMENT_CLASS), t.classList.add(W.INPUT_OUTSIDE_RIGHT_ADJUSTMENT_CLASS), i["outside-right"].map(
          (n) => n.button.elementRef.classList.add("submit-button-enlarged")
        );
    }
  }
  static set(e, t, i, n) {
    !!W.adjustOutsideSubmit(t, i, n) || W.adjustForOutsideButton(t, i, n), W.adjustInputPadding(e, n);
  }
};
St.INPUT_OUTSIDE_LEFT_ADJUSTMENT_CLASS = "text-input-container-left-adjustment";
St.INPUT_OUTSIDE_RIGHT_ADJUSTMENT_CLASS = "text-input-container-right-adjustment";
St.INPUT_OUTSIDE_LEFT_SMALL_ADJUSTMENT_CLASS = "text-input-container-left-small-adjustment";
St.INPUT_OUTSIDE_RIGHT_SMALL_ADJUSTMENT_CLASS = "text-input-container-right-small-adjustment";
let Vo = St;
class Xe {
  static create() {
    return Array.from({ length: 4 }).map((e, t) => {
      const i = document.createElement("div");
      return i.classList.add("input-button-container"), (t === 0 || t === 3) && i.classList.add("outer-button-container"), (t === 1 || t === 2) && i.classList.add("inner-button-container"), i;
    });
  }
  static add(e, t) {
    e.insertBefore(t[1], e.firstChild), e.insertBefore(t[0], e.firstChild), e.appendChild(t[2]), e.appendChild(t[3]);
  }
  static getContainerIndex(e) {
    return e === "outside-left" ? 0 : e === "inside-left" ? 1 : e === "inside-right" ? 2 : 3;
  }
  static addButton(e, t, i) {
    t.classList.add(i);
    const n = Xe.getContainerIndex(i);
    e[n].appendChild(t), n === 3 && t.classList.add("outside-right");
  }
}
const xn = [
  "camera",
  "gifs",
  "images",
  "audio",
  "mixedFiles",
  "submit",
  "microphone"
];
class j {
  static createTextElement(e) {
    const t = document.createElement("div");
    return t.classList.add("text-button"), t.innerText = e, t;
  }
  static createElement(e, t) {
    return t ? j.createTextElement(e) : U.createSVGElement(e);
  }
  static createCustomElement(e, t) {
    var n, r, o, a;
    const i = t == null ? void 0 : t[e];
    if ((n = i == null ? void 0 : i.text) != null && n.content)
      return j.createElement((r = i == null ? void 0 : i.text) == null ? void 0 : r.content, !0);
    if ((o = i == null ? void 0 : i.svg) != null && o.content)
      return j.createElement((a = i == null ? void 0 : i.svg) == null ? void 0 : a.content, !1);
  }
  static processElement(e, t) {
    t != null && t.classList.contains("text-button") || e.classList.add("input-button-svg");
  }
  // publicly used for creating elements that do not change state in a sequence
  // prettier-ignore
  static createSpecificStateElement(e, t, i) {
    let n;
    return i && (n = j.createCustomElement(t, i)), j.processElement(e, n), n;
  }
  // used for creating elements that change state in a sequence
  // prettier-ignore
  static create(e, t, i) {
    const n = {};
    if (!i)
      return j.processElement(e), n;
    const r = j.createSpecificStateElement(e, t[0], i);
    n[t[0]] = r;
    let o = r;
    return t.slice(1).forEach((a) => {
      o = j.createCustomElement(a, i) || o, n[a] = o;
    }), n;
  }
}
const Go = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
</svg>`;
class te {
  static unsetAllCSS(e, t) {
    var i, n;
    t.container && T.unsetAllCSSMouseStates(e, t.container), (i = t.svg) != null && i.styles && T.unsetAllCSSMouseStates(e.children[0], t.svg.styles), (n = t.text) != null && n.styles && T.unsetAllCSSMouseStates(e.children[0], t.text.styles);
  }
  static unsetActionCSS(e, t) {
    var i, n;
    t.container && T.unsetActivityCSSMouseStates(e, t.container), (i = t.svg) != null && i.styles && T.unsetActivityCSSMouseStates(e.children[0], t.svg.styles), (n = t.text) != null && n.styles && T.unsetActivityCSSMouseStates(e.children[0], t.text.styles);
  }
  static setElementsCSS(e, t, i) {
    var n, r, o, a, l;
    Object.assign(e.style, (n = t.container) == null ? void 0 : n[i]), Object.assign(e.children[0].style, (o = (r = t.svg) == null ? void 0 : r.styles) == null ? void 0 : o[i]), Object.assign(e.children[0].style, (l = (a = t.text) == null ? void 0 : a.styles) == null ? void 0 : l[i]);
  }
  static setElementCssUpToState(e, t, i) {
    te.setElementsCSS(e, t, "default"), i !== "default" && (te.setElementsCSS(e, t, "hover"), i !== "hover" && te.setElementsCSS(e, t, "click"));
  }
}
class _t {
  constructor(e, t, i, n) {
    this._mouseState = { state: "default" }, this.elementRef = e, this._customStyles = i, this.position = t, this.dropupText = n;
  }
  buttonMouseLeave(e) {
    this._mouseState.state = "default", e && (te.unsetAllCSS(this.elementRef, e), te.setElementsCSS(this.elementRef, e, "default"));
  }
  buttonMouseEnter(e) {
    this._mouseState.state = "hover", e && te.setElementsCSS(this.elementRef, e, "hover");
  }
  buttonMouseUp(e) {
    e && te.unsetActionCSS(this.elementRef, e), this.buttonMouseEnter(e);
  }
  buttonMouseDown(e) {
    this._mouseState.state = "click", e && te.setElementsCSS(this.elementRef, e, "click");
  }
  // be careful not to use onclick as that is used for button functionality
  setEvents(e) {
    this.elementRef.onmousedown = this.buttonMouseDown.bind(this, e), this.elementRef.onmouseup = this.buttonMouseUp.bind(this, e), this.elementRef.onmouseenter = this.buttonMouseEnter.bind(this, e), this.elementRef.onmouseleave = this.buttonMouseLeave.bind(this, e);
  }
  unsetCustomStateStyles(e) {
    if (this._customStyles)
      for (let t = 0; t < e.length; t += 1) {
        const i = e[t], n = i && this._customStyles[i];
        n && te.unsetActionCSS(this.elementRef, n);
      }
  }
  reapplyStateStyle(e, t) {
    if (!this._customStyles)
      return;
    t && this.unsetCustomStateStyles(t);
    const i = this._customStyles[e];
    i && te.setElementCssUpToState(this.elementRef, i, this._mouseState.state), this.setEvents(i);
  }
}
class gt {
  static focusItemWhenOnEdge(e, t) {
    const i = t ? e.children[0] : e.children[e.children.length - 1];
    gt.focusSiblingItem(i, e, t, !0);
  }
  // isEdgeItem means is it a start or end item
  // prettier-ignore
  static focusSiblingItem(e, t, i, n = !1) {
    const r = n ? e : e[i ? "nextSibling" : "previousSibling"];
    r ? (e.dispatchEvent(new MouseEvent("mouseleave")), r.dispatchEvent(new MouseEvent("mouseenter"))) : (e.dispatchEvent(new MouseEvent("mouseleave")), gt.focusItemWhenOnEdge(t, i));
  }
}
class we {
  static addItemEvents(e, t, i, n) {
    Te.add(t, n), t.addEventListener("click", () => {
      i.click();
    }), t.addEventListener("mouseenter", (r) => {
      e.highlightedItem = r.target;
    }), t.addEventListener("mouseleave", () => {
      e.highlightedItem = void 0;
    });
  }
  static createItemText(e, t) {
    const i = document.createElement("div");
    return Object.assign(i.style, t), i.classList.add("dropup-menu-item-text"), i.textContent = e || "File", i;
  }
  static createItemIcon(e, t) {
    const i = document.createElement("div");
    return Object.assign(i.style, t), i.classList.add("dropup-menu-item-icon"), i.appendChild(e.children[0]), i;
  }
  static populateItem(e, t, i, n) {
    const r = e.children[0];
    r.classList.contains("text-button") ? t.appendChild(we.createItemText(r.textContent, n == null ? void 0 : n.text)) : (t.appendChild(we.createItemIcon(e, n == null ? void 0 : n.iconContainer)), t.appendChild(we.createItemText(i, n == null ? void 0 : n.text)));
  }
  // prettier-ignore
  static createItem(e, t, i) {
    var l;
    const { elementRef: n, dropupText: r } = t, o = document.createElement("div");
    Object.assign(o.style, (l = i == null ? void 0 : i.item) == null ? void 0 : l.default), we.populateItem(n, o, r, i), o.classList.add("dropup-menu-item");
    const a = T.processStateful(
      (i == null ? void 0 : i.item) || {},
      { backgroundColor: "#f3f3f3" },
      { backgroundColor: "#ebebeb" }
    );
    return we.addItemEvents(e, o, n, a), o;
  }
}
class Xi {
  constructor(e, t) {
    var i;
    this._isOpen = !0, this._styles = t, this.elementRef = Xi.createElement((i = this._styles) == null ? void 0 : i.container), this.close(), setTimeout(() => this.addWindowEvents(e));
  }
  static createElement(e) {
    const t = document.createElement("div");
    return t.id = "dropup-menu", Object.assign(t.style, e), t;
  }
  open() {
    this.elementRef.style.display = "block", this._isOpen = !0;
  }
  close() {
    this._isOpen && (this.elementRef.style.display = "none", this._isOpen = !1);
  }
  toggle() {
    this._isOpen ? this.close() : this.open();
  }
  addItem(e) {
    const t = we.createItem(this, e, this._styles);
    this.elementRef.appendChild(t);
  }
  // prettier-ignore
  addWindowEvents(e) {
    window.addEventListener("click", (t) => {
      var i;
      e.parentElement !== ((i = t.target.shadowRoot) == null ? void 0 : i.children[0]) && this.close();
    }), window.addEventListener("keydown", (t) => {
      var i, n, r;
      this._isOpen && (t.key === R.ESCAPE ? (this.close(), (i = this.highlightedItem) == null || i.dispatchEvent(new MouseEvent("mouseleave"))) : t.key === R.ENTER ? ((n = this.highlightedItem) == null || n.click(), (r = this.highlightedItem) == null || r.dispatchEvent(new MouseEvent("mouseleave"))) : t.key === R.ARROW_DOWN ? gt.focusSiblingItem(
        this.highlightedItem || this.elementRef.children[this.elementRef.children.length - 1],
        this.elementRef,
        !0
      ) : t.key === R.ARROW_UP && gt.focusSiblingItem(
        this.highlightedItem || this.elementRef.children[0],
        this.elementRef,
        !1
      ));
    });
  }
}
class Je extends _t {
  constructor(e, t) {
    var n;
    super(Je.createButtonElement(), void 0, { styles: (n = t == null ? void 0 : t.button) == null ? void 0 : n.styles });
    const i = this.createInnerElements(this._customStyles);
    this._menu = new Xi(e, t == null ? void 0 : t.menu), this.addClickEvent(), this.buttonContainer = Je.createButtonContainer(), this.elementRef.appendChild(i.styles), this.buttonContainer.appendChild(this.elementRef), this.elementRef.classList.add("dropup-icon", "upload-file-button"), this.buttonContainer.appendChild(this._menu.elementRef), this.reapplyStateStyle("styles"), this.addContainerEvents(e);
  }
  static createButtonElement() {
    const e = document.createElement("div");
    return e.classList.add("input-button"), e;
  }
  createInnerElements(e) {
    return {
      styles: this.createInnerElement(Je.createSVGIconElement(), "styles", e)
    };
  }
  createInnerElement(e, t, i) {
    return j.createSpecificStateElement(this.elementRef, t, i) || e;
  }
  static createSVGIconElement() {
    const e = U.createSVGElement(Go);
    return e.id = "dropup-icon", e;
  }
  addClickEvent() {
    this.elementRef.onclick = this._menu.toggle.bind(this._menu);
  }
  static createButtonContainer() {
    const e = document.createElement("div");
    return e.id = "dropup-container", e;
  }
  addItem(e) {
    this._menu.addItem(e);
  }
  addContainerEvents(e) {
    e.addEventListener("click", (t) => {
      t.target.classList.contains("dropup-icon") || this._menu.close();
    });
  }
  static getPosition(e, t) {
    var i, n;
    return (i = t == null ? void 0 : t.button) != null && i.position ? (n = t == null ? void 0 : t.button) == null ? void 0 : n.position : e["outside-left"].length > 0 && e["outside-right"].length === 0 ? "outside-right" : "outside-left";
  }
}
class B {
  // prettier-ignore
  static addToDropup(e, t, i, n) {
    const r = new Je(i, n);
    xn.forEach((a) => {
      const l = t["dropup-menu"].findIndex((d) => d.buttonType === a), c = t["dropup-menu"][l];
      c && (r.addItem(c.button), t["dropup-menu"].splice(l, 1));
    });
    const o = Je.getPosition(t, n);
    Xe.addButton(e, r.buttonContainer, o), t[o].push({});
  }
  static addToSideContainer(e, t) {
    ["inside-left", "inside-right", "outside-left", "outside-right"].forEach((n) => {
      const r = n;
      t[r].forEach((o) => {
        Xe.addButton(e, o.button.elementRef, r);
      });
    });
  }
  static setPosition(e, t, i) {
    const n = { ...e[t], buttonType: t };
    i.push(n), delete e[t];
  }
  static createPositionsObj() {
    return {
      "dropup-menu": [],
      "outside-left": [],
      "inside-left": [],
      "inside-right": [],
      "outside-right": []
    };
  }
  // prettier-ignore
  static generatePositions(e) {
    const t = B.createPositionsObj();
    Object.keys(e).forEach((n) => {
      var o;
      const r = (o = e[n]) == null ? void 0 : o.button.position;
      r && B.setPosition(e, n, t[r]);
    }), t["inside-right"].length === 0 && e.submit && B.setPosition(e, "submit", t["inside-right"]), t["outside-right"].length === 0 && (e.submit ? B.setPosition(e, "submit", t["outside-right"]) : e.microphone ? B.setPosition(e, "microphone", t["outside-right"]) : e.camera && B.setPosition(e, "camera", t["outside-right"])), e.submit && B.setPosition(
      e,
      "submit",
      t["outside-left"].length === 0 ? t["outside-left"] : t["inside-right"]
    ), e.microphone && B.setPosition(
      e,
      "microphone",
      t["outside-left"].length === 0 ? t["outside-left"] : t["inside-right"]
    );
    const i = Object.keys(e);
    return i.length > 1 || t["dropup-menu"].length > 0 ? xn.forEach((n) => {
      e[n] && t["dropup-menu"].push({ ...e[n], buttonType: n });
    }) : i.length === 1 && B.setPosition(
      e,
      i[0],
      t["outside-right"].length === 0 ? t["outside-right"] : t["outside-left"]
    ), t;
  }
  // prettier-ignore
  static addButtons(e, t, i, n) {
    const r = B.generatePositions(t);
    return B.addToSideContainer(e, r), r["dropup-menu"].length > 0 && B.addToDropup(e, r, i, n), r;
  }
}
const Wo = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<title>file</title>
<path d="M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`, Ko = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M20,15.2928932 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,12.2928932 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 L13.5,14.7928932 L16.1464466,12.1464466 C16.3417088,11.9511845 16.6582912,11.9511845 16.8535534,12.1464466 L20,15.2928932 Z M20,16.7071068 L16.5,13.2071068 L13.8535534,15.8535534 C13.6582912,16.0488155 13.3417088,16.0488155 13.1464466,15.8535534 L7.5,10.2071068 L4,13.7071068 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,16.7071068 Z M3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 Z M15,6 L17,6 C17.5522847,6 18,6.44771525 18,7 L18,9 C18,9.55228475 17.5522847,10 17,10 L15,10 C14.4477153,10 14,9.55228475 14,9 L14,7 C14,6.44771525 14.4477153,6 15,6 Z M15,7 L15,9 L17,9 L17,7 L15,7 Z"/>
</svg>
`, Jo = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-49.49 -49.49 593.87 593.87" stroke-width="3.95908" transform="rotate(0)">
  <g stroke-width="0"></g>
  <g stroke-linecap="round" stroke-linejoin="round" stroke-width="0.98977"></g>
  <g>
    <g>
      <g>
        <path d="M163.205,76.413v293.301c-3.434-3.058-7.241-5.867-11.486-8.339c-21.38-12.452-49.663-15.298-77.567-7.846 c-49.038,13.096-80.904,54.519-71.038,92.337c4.019,15.404,14.188,28.221,29.404,37.087c13.553,7.894,29.87,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.447-4.087c42.74-11.406,72.411-44.344,72.807-77.654h0.011v-0.162c0.002-0.166,0-0.331,0-0.496V187.072 l290.971-67.3v178.082c-3.433-3.055-7.238-5.863-11.481-8.334c-21.385-12.452-49.654-15.308-77.567-7.846 c-49.038,13.087-80.904,54.519-71.038,92.356c4.019,15.385,14.183,28.212,29.404,37.067c13.548,7.894,29.875,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.452-4.087c42.74-11.413,72.411-44.346,72.804-77.654h0.004v-0.065c0.003-0.236,0.001-0.469,0-0.704V0 L163.205,76.413z M104.999,471.779c-22.543,6.038-45.942,3.846-62.572-5.846c-10.587-6.163-17.591-14.817-20.255-25.038 c-7.144-27.375,18.452-58.029,57.062-68.346c8.409-2.25,16.938-3.346,25.188-3.346c13.87,0,26.962,3.115,37.389,9.192 c10.587,6.163,17.591,14.817,20.255,25.029c0.809,3.102,1.142,6.248,1.139,9.4v0.321h0.014 C162.99,437.714,139.082,462.678,104.999,471.779z M182.898,166.853V92.067l290.971-67.298v74.784L182.898,166.853z M415.677,399.923c-22.558,6.038-45.942,3.837-62.587-5.846c-10.587-6.163-17.587-14.817-20.25-25.019 c-7.144-27.385,18.452-58.058,57.058-68.365c8.414-2.25,16.942-3.346,25.192-3.346c13.875,0,26.962,3.115,37.385,9.192 c10.596,6.163,17.596,14.817,20.26,25.029v0.01c0.796,3.05,1.124,6.144,1.135,9.244v0.468h0.02 C473.668,365.851,449.763,390.814,415.677,399.923z">
        </path>
      </g>
    </g>
  </g>
</svg>`, $o = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 5.9266752 5.6408391" height="21.31971" width="22.4">
  <g>
    <path d="m 5.2564627,1.548212 c -3.1136005,-0.4796804 -1.5568006,-0.2398402 0,0 z M 2.0001198,2.0922063 c 0.1556781,0 0.2657489,0.020893 0.3917849,0.080366 0.081154,0.038347 0.1153492,0.134065 0.076377,0.2138602 -0.038973,0.07979 -0.1363527,0.1134129 -0.2175069,0.075091 -0.078199,-0.036919 -0.1407455,-0.048792 -0.250655,-0.048792 -0.2260486,0 -0.3921482,0.2042182 -0.3921482,0.4801409 0,0.2761822 0.1663188,0.4810688 0.3921482,0.4810688 0.1117901,0 0.2064255,-0.046133 0.255659,-0.1284198 l 0.00162,-0.00389 V 3.0534032 l -0.098011,1.75e-4 c -0.081844,0 -0.1495979,-0.059305 -0.1612403,-0.1365887 l -0.00175,-0.023683 c 0,-0.08047 0.060311,-0.1470874 0.1389194,-0.1585331 l 0.024085,-0.00195 h 0.2612303 c 0.081842,0 0.149598,0.059305 0.1612404,0.1365891 l 0.00175,0.023683 -3.398e-4,0.3968809 v 0 l -0.00168,0.014211 v 0 l -0.00553,0.023034 v 0 l -0.00532,0.014145 c -0.098178,0.22826 -0.3236506,0.3528713 -0.5706303,0.3528713 -0.4240855,0 -0.7181621,-0.3622714 -0.7181621,-0.8016063 0,-0.4391857 0.2940275,-0.8006848 0.7181621,-0.8006848 z m 1.2034759,0.031275 c 0.081843,0 0.1495977,0.059305 0.1612403,0.1365891 l 0.00175,0.023683 v 1.2211775 c 0,0.088516 -0.07298,0.1602721 -0.1630073,0.1602721 -0.081841,0 -0.1495972,-0.059305 -0.1612397,-0.1365892 L 3.040589,3.5049308 V 2.2837527 c 0,-0.088516 0.07298,-0.1602721 0.1630067,-0.1602714 z m 0.7813442,0 0.5209469,0.00195 c 0.090025,3.048e-4 0.1627543,0.072306 0.1624458,0.1608234 -2.809e-4,0.08047 -0.06083,0.1468798 -0.1394772,0.158066 l -0.024092,0.00195 -0.3575326,-0.0013 v 0.4497782 l 0.2928918,2.27e-4 c 0.081842,0 0.1495979,0.059305 0.1612403,0.136589 l 0.00175,0.023683 c 0,0.080469 -0.06031,0.1470871 -0.1389193,0.1585393 l -0.024092,0.00195 -0.2928919,-2.336e-4 1.563e-4,0.2860316 c 0,0.080471 -0.06031,0.1470873 -0.1389193,0.1585395 l -0.024085,0.00195 c -0.081843,0 -0.1495979,-0.059305 -0.1612403,-0.1365826 l -0.00175,-0.023691 V 2.2841354 c 2.798e-4,-0.08047 0.060829,-0.1468797 0.1394758,-0.1580594 z"/>
    <path d="m 5.0894191,1.0943261 c 0,-0.21918999 -0.177687,-0.39686999 -0.396876,-0.39686999 h -3.43959 c -0.2191879,0 -0.391262,0.1777519 -0.3968759,0.39686999 l -0.027082,3.4379266 c 0.040152,0.2939927 0.4235456,0.409415 0.4235456,0.409415 l 3.4785583,-0.00851 c 0,0 0.3008506,-0.1402998 0.3236271,-0.4201576 0.042911,-0.5272495 0.034693,-1.6106146 0.034693,-3.4186761 z m -4.49792494,0 c 0,-0.36530999 0.29614504,-0.66145999 0.66145894,-0.66145999 h 3.43959 c 0.365314,0 0.66146,0.29615 0.66146,0.66145999 v 3.43959 c 0,0.36532 -0.296146,0.66146 -0.66146,0.66146 h -3.43959 c -0.3653139,0 -0.66145894,-0.29614 -0.66145894,-0.66146 z"/>
  </g>
</svg>
`, Yo = {
  images: { id: "upload-images-icon", svgString: Ko, dropupText: "Image" },
  gifs: { id: "upload-gifs-icon", svgString: $o, dropupText: "GIF" },
  audio: { id: "upload-audio-icon", svgString: Jo, dropupText: "Audio" },
  mixedFiles: { id: "upload-mixed-files-icon", svgString: Wo, dropupText: "File" }
};
class ue {
  // prettier-ignore
  constructor(e, t, i, n) {
    this._attachments = [], this._fileCountLimit = 99, this._acceptedFormat = "", t.maxNumberOfFiles && (this._fileCountLimit = t.maxNumberOfFiles), this._toggleContainerDisplay = i, this._fileAttachmentsContainerRef = n, this._attachmentChangeCallback = e.onAttachmentChange, t.acceptedFormats && (this._acceptedFormat = t.acceptedFormats), setTimeout(() => {
      this._validationHandler = e._validationHandler;
    });
  }
  attemptAddFile(e, t) {
    var i;
    return ue.isFileTypeValid(e, this._acceptedFormat) ? (this.addAttachmentBasedOnType(e, t, !0), (i = this._attachmentChangeCallback) == null || i.call(void 0, this._attachments, e), !0) : !1;
  }
  static isFileTypeValid(e, t) {
    if (t === "")
      return !0;
    const i = t.split(",");
    for (let n = 0; n < i.length; n++) {
      const r = i[n].trim();
      if (e.type === r)
        return !0;
      if (r.startsWith(".")) {
        const o = r.slice(1);
        if (e.name.endsWith(o))
          return !0;
      } else {
        if (e.name.endsWith(r))
          return !0;
        if (r.endsWith("/*") && e.type.startsWith(r.slice(0, -2)))
          return !0;
      }
    }
    return !1;
  }
  static getTypeFromBlob(e) {
    const { type: t } = e;
    return t.startsWith("image") ? "image" : t.startsWith("audio") ? "audio" : "any";
  }
  addAttachmentBasedOnType(e, t, i) {
    const n = ue.getTypeFromBlob(e);
    if (n === "image") {
      const r = ue.createImageAttachment(t);
      this.addFileAttachment(e, "image", r, i);
    } else if (n === "audio") {
      const r = qi.createAudioAttachment(t);
      this.addFileAttachment(e, "audio", r, i);
    } else {
      const r = ue.createAnyFileAttachment(e.name);
      this.addFileAttachment(e, "any", r, i);
    }
  }
  static createImageAttachment(e) {
    const t = new Image();
    return t.src = e, t.classList.add("image-attachment"), t;
  }
  static createAnyFileAttachment(e) {
    const t = document.createElement("div");
    t.classList.add("border-bound-attachment"), ge.IS_SAFARI && t.classList.add("border-bound-attachment-safari");
    const i = document.createElement("div");
    i.classList.add("any-file-attachment-text");
    const n = document.createElement("div");
    return n.classList.add("file-attachment-text-container"), n.appendChild(i), i.textContent = e, t.appendChild(n), t;
  }
  addFileAttachment(e, t, i, n) {
    var a;
    const r = ue.createContainer(i);
    if (this._attachments.length >= this._fileCountLimit) {
      const l = this._attachments[this._attachments.length - 1].removeButton;
      l == null || l.click();
      const c = this._fileAttachmentsContainerRef.children;
      this._fileAttachmentsContainerRef.insertBefore(r, c[0]);
    } else
      this._fileAttachmentsContainerRef.appendChild(r);
    const o = { file: e, attachmentContainerElement: r, fileType: t };
    return n && (o.removeButton = this.createRemoveAttachmentButton(o), r.appendChild(o.removeButton)), this._toggleContainerDisplay(!0), this._attachments.push(o), this._fileAttachmentsContainerRef.scrollTop = this._fileAttachmentsContainerRef.scrollHeight, (a = this._validationHandler) == null || a.call(this), o;
  }
  static createContainer(e) {
    const t = document.createElement("div");
    return t.classList.add("file-attachment"), t.appendChild(e), t;
  }
  createRemoveAttachmentButton(e) {
    const t = document.createElement("div");
    t.classList.add("remove-file-attachment-button"), t.onclick = this.removeAttachment.bind(this, e);
    const i = document.createElement("div");
    return i.classList.add("x-icon"), i.innerText = "×", t.appendChild(i), t;
  }
  removeAttachment(e) {
    var n;
    const t = this._attachments.findIndex((r) => r === e), i = this._attachments[t].attachmentContainerElement;
    this._attachments.splice(t, 1), qi.stopAttachmentPlayback(i), i.remove(), this._toggleContainerDisplay(!1), (n = this._validationHandler) == null || n.call(this);
  }
  getFiles() {
    return Array.from(this._attachments).map((e) => ({ file: e.file, type: e.fileType }));
  }
  removeAllAttachments() {
    this._attachments.forEach((e) => {
      setTimeout(() => {
        var t;
        return (t = e.removeButton) == null ? void 0 : t.click();
      });
    });
  }
}
const Zo = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <title>play</title>
  <path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"></path>
</svg>`, En = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
<title>stop</title>
<path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path>
</svg>`, hs = class _e extends ue {
  // prettier-ignore
  constructor(e, t, i, n) {
    super(e, t, i, n);
  }
  static createAudioContainer() {
    const e = document.createElement("div");
    return e.classList.add("border-bound-attachment", "audio-attachment-icon-container"), ge.IS_SAFARI && e.classList.add("border-bound-attachment-safari"), e;
  }
  static addAudioElements(e, t) {
    const i = e.parentElement ? Y.cloneElement(e) : e, n = document.createElement("audio");
    n.src = t;
    const r = U.createSVGElement(Zo);
    r.classList.add("attachment-icon", "play-icon");
    const o = U.createSVGElement(En);
    o.classList.add("attachment-icon", "stop-icon"), i.replaceChildren(r), n.onplay = () => {
      i.replaceChildren(o);
    }, n.onpause = () => {
      i.replaceChildren(r), n.currentTime = 0;
    }, n.onended = () => {
      i.replaceChildren(r);
    }, i.onclick = () => {
      n.paused ? n.play() : n.pause();
    };
  }
  static createAudioAttachment(e) {
    const t = _e.createAudioContainer();
    return _e.addAudioElements(t, e), t;
  }
  createTimer(e, t) {
    let i = 0;
    const n = t !== void 0 && t < _e.TIMER_LIMIT_S ? t : _e.TIMER_LIMIT_S;
    return setInterval(() => {
      var a;
      i += 1, i === n && ((a = this.stopPlaceholderCallback) == null || a.call(this), this.clearTimer()), i === 600 && e.classList.add("audio-placeholder-text-4-digits");
      const r = Math.floor(i / 60), o = (i % 60).toString().padStart(2, "0");
      e.textContent = `${r}:${o}`;
    }, 1e3);
  }
  createPlaceholderAudioAttachment(e) {
    const t = _e.createAudioContainer(), i = document.createElement("div");
    i.classList.add("audio-placeholder-text-3-digits");
    const n = document.createElement("div");
    n.classList.add("file-attachment-text-container", "audio-placeholder-text-3-digits-container"), n.appendChild(i);
    const r = U.createSVGElement(En);
    return r.classList.add("attachment-icon", "stop-icon", "not-removable-attachment-icon"), i.textContent = "0:00", this._activePlaceholderTimer = this.createTimer(i, e), t.appendChild(n), this.addPlaceholderAudioAttachmentEvents(t, r, n), t;
  }
  addPlaceholderAudioAttachmentEvents(e, t, i) {
    const n = () => e.replaceChildren(t);
    e.addEventListener("mouseenter", n);
    const r = () => e.replaceChildren(i);
    e.addEventListener("mouseleave", r);
    const o = () => {
      var a;
      return (a = this.stopPlaceholderCallback) == null ? void 0 : a.call(this);
    };
    e.addEventListener("click", o);
  }
  addPlaceholderAttachment(e, t) {
    const i = this.createPlaceholderAudioAttachment(t);
    this._activePlaceholderAttachment = this.addFileAttachment(new File([], ""), "audio", i, !1), this.stopPlaceholderCallback = e;
  }
  // prettier-ignore
  completePlaceholderAttachment(e, t) {
    const i = this._activePlaceholderAttachment;
    i && (i.file = e, _e.addAudioElements(
      i.attachmentContainerElement.children[0],
      t
    ), i.removeButton = this.createRemoveAttachmentButton(i), i.attachmentContainerElement.appendChild(i.removeButton), this._activePlaceholderAttachment = void 0, this.clearTimer());
  }
  removePlaceholderAttachment() {
    this._activePlaceholderAttachment && (this.removeAttachment(this._activePlaceholderAttachment), this._activePlaceholderAttachment = void 0, this.clearTimer());
  }
  clearTimer() {
    this._activePlaceholderTimer !== void 0 && (clearInterval(this._activePlaceholderTimer), this._activePlaceholderTimer = void 0, this.stopPlaceholderCallback = void 0);
  }
  static stopAttachmentPlayback(e) {
    var t, i, n;
    (n = (i = (t = e.children[0]) == null ? void 0 : t.children) == null ? void 0 : i[0]) != null && n.classList.contains("stop-icon") && e.children[0].click();
  }
};
hs.TIMER_LIMIT_S = 5999;
let qi = hs;
class Qo {
  // prettier-ignore
  static create(e, t, i, n, r) {
    return r === "audio" ? new qi(e, t, i, n) : new ue(e, t, i, n);
  }
}
class wt {
  constructor(e, t, i) {
    this._fileAttachmentsTypes = [], this.elementRef = this.createAttachmentContainer();
    const n = typeof i == "object" && !!i.displayFileAttachmentContainer;
    this.toggleContainerDisplay(n), e.appendChild(this.elementRef), t && Object.assign(this.elementRef.style, t);
  }
  // prettier-ignore
  addType(e, t, i) {
    const n = Qo.create(
      e,
      t,
      this.toggleContainerDisplay.bind(this),
      this.elementRef,
      i
    );
    return this._fileAttachmentsTypes.push(n), n;
  }
  createAttachmentContainer() {
    const e = document.createElement("div");
    return e.id = "file-attachment-container", e;
  }
  toggleContainerDisplay(e) {
    e ? this.elementRef.style.display = "block" : this.elementRef.children.length === 0 && (this.elementRef.style.display = "none");
  }
  getAllFileData() {
    const e = this._fileAttachmentsTypes.map((t) => t.getFiles()).flat();
    return e.length > 0 ? e : void 0;
  }
  async completePlaceholders() {
    await Promise.all(
      this._fileAttachmentsTypes.map(
        async (e) => {
          var t;
          return (t = e.stopPlaceholderCallback) == null ? void 0 : t.call(e);
        }
      )
    );
  }
  static addFilesToType(e, t) {
    e.forEach((i) => {
      const n = new FileReader();
      n.readAsDataURL(i), n.onload = (r) => {
        for (let o = 0; o < t.length && !t[o].attemptAddFile(i, r.target.result); o += 1)
          ;
      };
    });
  }
  addFilesToAnyType(e) {
    wt.addFilesToType(e, this._fileAttachmentsTypes);
  }
  removeAllFiles() {
    this._fileAttachmentsTypes.forEach((e) => e.removeAllAttachments()), this.elementRef.replaceChildren(), this.toggleContainerDisplay(!1);
  }
  getNumberOfTypes() {
    return this._fileAttachmentsTypes.length;
  }
}
const ps = class le {
  constructor(e, t, i) {
    this._isOpen = !1, this._contentRef = le.createModalContent(t, i == null ? void 0 : i.backgroundColor), this._buttonPanel = le.createButtonPanel(i == null ? void 0 : i.backgroundColor), this._elementRef = le.createContainer(this._contentRef, i), this._elementRef.appendChild(this._buttonPanel), e.appendChild(this._elementRef), this._backgroundPanelRef = le.createDarkBackgroundPanel(), e.appendChild(this._backgroundPanelRef), this.addWindowEvents();
  }
  isOpen() {
    return this._isOpen;
  }
  static createContainer(e, t) {
    const i = document.createElement("div");
    return i.classList.add("modal"), i.appendChild(e), t && delete t.backgroundColor, Object.assign(i.style, t), i;
  }
  static createModalContent(e, t) {
    const i = document.createElement("div");
    return i.classList.add(...e), t && (i.style.backgroundColor = t), document.createElement("div").appendChild(i), i;
  }
  static createButtonPanel(e) {
    const t = document.createElement("div");
    return t.classList.add("modal-button-panel"), e && (t.style.backgroundColor = e), t;
  }
  static createDarkBackgroundPanel() {
    const e = document.createElement("div");
    return e.id = "modal-background-panel", e;
  }
  addButtons(...e) {
    e.forEach((t) => this._buttonPanel.appendChild(t));
  }
  static createTextButton(e) {
    const t = document.createElement("div");
    return t.classList.add("modal-button"), t.textContent = e, t;
  }
  static createSVGButton(e) {
    const t = document.createElement("div");
    t.classList.add("modal-button", "modal-svg-button");
    const i = U.createSVGElement(e);
    return i.classList.add("modal-svg-button-icon"), t.appendChild(i), t;
  }
  close() {
    this._elementRef.classList.remove("show-modal"), this._elementRef.classList.add("hide-modal"), this._backgroundPanelRef.classList.remove("show-modal-background"), this._backgroundPanelRef.classList.add("hide-modal-background"), this._isOpen = !1, setTimeout(() => {
      this._elementRef.style.display = "none", this._backgroundPanelRef.style.display = "none";
    }, le.MODAL_CLOSE_TIMEOUT_MS);
  }
  displayModalElements() {
    this._elementRef.style.display = "flex", this._elementRef.classList.remove("hide-modal"), this._elementRef.classList.add("show-modal"), this._backgroundPanelRef.style.display = "block", this._backgroundPanelRef.classList.remove("hide-modal-background"), this._backgroundPanelRef.classList.add("show-modal-background"), this._isOpen = !0;
  }
  openTextModal(e) {
    this._contentRef.innerHTML = e, this.displayModalElements();
  }
  addCloseButton(e, t, i) {
    const n = t ? le.createSVGButton(e) : le.createTextButton(e);
    return this.addButtons(n), n.onclick = () => {
      this.close(), setTimeout(() => {
        i == null || i();
      }, 140);
    }, n;
  }
  static createTextModalFunc(e, t, i) {
    var n;
    if (typeof t == "object" && ((n = t.files) != null && n.infoModal)) {
      const r = new le(e, ["modal-content"], t.files.infoModal.containerStyle);
      return r.addCloseButton("OK", !1, i), r.openTextModal.bind(r, t.infoModalTextMarkUp || "");
    }
  }
  addWindowEvents() {
    window.addEventListener("keydown", (e) => {
      var t, i;
      this._isOpen && (e.key === R.ESCAPE ? (this.close(), (t = this.extensionCloseCallback) == null || t.call(this)) : e.key === R.ENTER && (this.close(), (i = this.extensionCloseCallback) == null || i.call(this)));
    });
  }
};
ps.MODAL_CLOSE_TIMEOUT_MS = 190;
let at = ps;
class ut extends _t {
  // prettier-ignore
  constructor(e, t, i, n, r, o) {
    var l, c, d, u, h, p;
    super(ut.createButtonElement(), (l = i.button) == null ? void 0 : l.position, i.button, o);
    const a = this.createInnerElements(n, r, this._customStyles);
    this._inputElement = ut.createInputElement((c = i == null ? void 0 : i.files) == null ? void 0 : c.acceptedFormats), this.addClickEvent(e, i), this.elementRef.replaceChildren(a.styles), this.reapplyStateStyle("styles"), this._fileAttachmentsType = t, this._openModalOnce = ((u = (d = i.files) == null ? void 0 : d.infoModal) == null ? void 0 : u.openModalOnce) === !1 || (p = (h = i.files) == null ? void 0 : h.infoModal) == null ? void 0 : p.openModalOnce, e.appendChild(this._inputElement);
  }
  createInnerElements(e, t, i) {
    const n = ut.createSVGIconElement(e, t);
    return {
      styles: this.createInnerElement(n, "styles", i)
    };
  }
  triggerImportPrompt(e) {
    e.onchange = this.import.bind(this, e), e.click();
  }
  import(e) {
    wt.addFilesToType(Array.from(e.files || []), [this._fileAttachmentsType]), e.value = "";
  }
  static createInputElement(e) {
    const t = document.createElement("input");
    return t.type = "file", t.accept = e || "", t.hidden = !0, t.multiple = !0, t;
  }
  createInnerElement(e, t, i) {
    return j.createSpecificStateElement(this.elementRef, t, i) || e;
  }
  static createButtonElement() {
    const e = document.createElement("div");
    return e.classList.add("input-button", "upload-file-button"), e;
  }
  static createSVGIconElement(e, t) {
    const i = U.createSVGElement(t);
    return i.id = e, i;
  }
  addClickEvent(e, t) {
    const i = this.triggerImportPrompt.bind(this, this._inputElement), n = at.createTextModalFunc(e, t, i);
    this.elementRef.onclick = this.click.bind(this, n);
  }
  click(e) {
    e && (this._openModalOnce === void 0 || this._openModalOnce === !0) ? (e(), this._openModalOnce === !0 && (this._openModalOnce = !1)) : this.triggerImportPrompt(this._inputElement);
  }
}
class de {
  static create(e, t, i) {
    const n = de.createElement(i);
    de.addEvents(n, e, t), e.appendChild(n);
  }
  static createElement(e) {
    const t = document.createElement("div");
    return t.id = "drag-and-drop", typeof e == "object" && Object.assign(t.style, e), t;
  }
  static addEvents(e, t, i) {
    t.ondragenter = (n) => {
      n.preventDefault(), de.display(e);
    }, e.ondragleave = (n) => {
      n.preventDefault(), de.hide(e);
    }, e.ondragover = (n) => {
      n.preventDefault();
    }, e.ondrop = (n) => {
      n.preventDefault(), de.uploadFile(i, n), de.hide(e);
    };
  }
  static uploadFile(e, t) {
    var n;
    const i = (n = t.dataTransfer) == null ? void 0 : n.files;
    i && e.addFilesToAnyType(Array.from(i));
  }
  static display(e) {
    e.style.display = "block";
  }
  static hide(e) {
    e.style.display = "none";
  }
  static isEnabled(e, t) {
    return t !== void 0 && t === !1 ? !1 : !!t || e.getNumberOfTypes() > 0;
  }
}
class Me {
  // prettier-ignore
  static validate(e, t, i, n, r) {
    const o = e(i, n, r);
    return o ? t.changeToSubmitIcon() : t.changeToDisabledIcon(), o;
  }
  // prettier-ignore
  static async useValidationFunc(e, t, i, n) {
    const r = t.inputElementRef, o = r.classList.contains("text-input-placeholder") ? "" : r.textContent;
    await i.completePlaceholders();
    const a = i.getAllFileData(), l = a == null ? void 0 : a.map((c) => c.file);
    return Me.validate(e, n, o, l);
  }
  // prettier-ignore
  static async useValidationFuncProgrammatic(e, t, i) {
    var r;
    const n = (r = t.files) == null ? void 0 : r.map((o) => o.file);
    return Me.validate(e, i, t.text, n, !0);
  }
  static validateWebsocket(e, t) {
    return e.websocket && !$.canSendMessage(e.websocket) ? (t.changeToDisabledIcon(), !1) : !0;
  }
  // prettier-ignore
  static attach(e, t, i, n, r) {
    const o = e.validateInput || ke.processValidateInput(e);
    e._validationHandler = async (a) => {
      if (r.status.loadingActive || r.status.requestInProgress || t.isSubmitProgrammaticallyDisabled === !0 || !Me.validateWebsocket(t, r))
        return !1;
      const l = o || t.canSendMessage;
      return l ? a ? Me.useValidationFuncProgrammatic(l, a, r) : Me.useValidationFunc(l, i, n, r) : null;
    };
  }
}
const Xo = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg height="1.4em" width="1.4em" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 490.9 490.9" xml:space="preserve">
	<g>
		<g>
			<path d="M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5
				C149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5
				c0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z"/>
			<path d="M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3
				s5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8
				c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9
				C106.6,220,101.2,214.5,94.4,214.5z"/>
		</g>
	</g>
</svg>
`;
class bt extends _t {
  constructor(e) {
    (e == null ? void 0 : e.position) === "dropup-menu" && (e.position = "outside-right"), super(bt.createMicrophoneElement(), e == null ? void 0 : e.position, e), this.isActive = !1, this._innerElements = this.createInnerElements(this._customStyles), this.changeToDefault();
  }
  createInnerElements(e) {
    const t = bt.createSVGIconElement();
    return {
      default: this.createInnerElement(t, "default", e),
      active: this.createInnerElement(t, "active", e),
      unsupported: this.createInnerElement(t, "unsupported", e),
      commandMode: this.createInnerElement(t, "commandMode", e)
    };
  }
  // prettier-ignore
  createInnerElement(e, t, i) {
    return j.createSpecificStateElement(this.elementRef, t, i) || e;
  }
  static createMicrophoneElement() {
    const e = document.createElement("div");
    return e.id = "microphone-button", e.classList.add("input-button"), e;
  }
  static createSVGIconElement() {
    const e = U.createSVGElement(Xo);
    return e.id = "microphone-icon", e;
  }
  changeToActive() {
    this.elementRef.replaceChildren(this._innerElements.active), this.toggleIconFilter("active"), this.reapplyStateStyle("active", ["default", "commandMode"]), this.isActive = !0;
  }
  changeToDefault() {
    this.elementRef.replaceChildren(this._innerElements.default), this.toggleIconFilter("default"), this.reapplyStateStyle("default", ["active", "commandMode"]), this.isActive = !1;
  }
  changeToCommandMode() {
    this.elementRef.replaceChildren(this._innerElements.unsupported), this.toggleIconFilter("command"), this.reapplyStateStyle("commandMode", ["active"]);
  }
  changeToUnsupported() {
    this.elementRef.replaceChildren(this._innerElements.unsupported), this.elementRef.classList.add("unsupported-microphone"), this.reapplyStateStyle("unsupported", ["active"]);
  }
  toggleIconFilter(e) {
    const t = this.elementRef.children[0];
    if (t.tagName.toLocaleLowerCase() === "svg")
      switch (e) {
        case "default":
          t.classList.remove("active-microphone-icon", "command-microphone-icon"), t.classList.add("default-microphone-icon");
          break;
        case "active":
          t.classList.remove("default-microphone-icon", "command-microphone-icon"), t.classList.add("active-microphone-icon");
          break;
        case "command":
          t.classList.remove("active-microphone-icon", "default-microphone-icon"), t.classList.add("command-microphone-icon");
          break;
      }
  }
}
var fs = {}, oi = {}, ai = {}, Mt = {}, De = {};
Object.defineProperty(De, "__esModule", { value: !0 });
De.Text = void 0;
class ye {
  static capitalize(e) {
    return e.replace(ye.FIRST_CHAR_REGEX, (t) => t.toUpperCase());
  }
  static lineBreak(e) {
    return e.replace(ye.DOUBLE_LINE, "<p></p>").replace(ye.ONE_LINE, "<br>");
  }
  static isCharDefined(e) {
    return e !== void 0 && e !== " " && e !== " " && e !== `
` && e !== "";
  }
  // WORK - can optimize to not not have to do it multiple times
  static breakupIntoWordsArr(e) {
    return e.split(/(\W+)/);
  }
}
De.Text = ye;
ye.FIRST_CHAR_REGEX = /\S/;
ye.DOUBLE_LINE = /\n\n/g;
ye.ONE_LINE = /\n/g;
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.Translate = void 0;
const ea = De;
class ta {
  static translate(e, t) {
    const i = ea.Text.breakupIntoWordsArr(e);
    for (let n = 0; n < i.length; n += 1)
      t[i[n]] && (i[n] = t[i[n]]);
    return i.join("");
  }
}
Mt.Translate = ta;
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.WebSpeechTranscript = void 0;
const Sn = Mt;
class ia {
  static extract(e, t, i) {
    let n = "";
    for (let r = e.resultIndex; r < e.results.length; ++r) {
      let o = e.results[r][0].transcript;
      i && (o = Sn.Translate.translate(o, i)), e.results[r].isFinal ? t += o : n += o;
    }
    return { interimTranscript: n, finalTranscript: t, newText: n || t };
  }
  static extractSafari(e, t, i) {
    let n = "";
    const r = "";
    for (let o = e.resultIndex; o < e.results.length; ++o) {
      let a = e.results[o][0].transcript;
      i && (a = Sn.Translate.translate(a, i)), n += a;
    }
    return { interimTranscript: r, finalTranscript: n, newText: r || n };
  }
}
ai.WebSpeechTranscript = ia;
var tt = {};
Object.defineProperty(tt, "__esModule", { value: !0 });
tt.Browser = void 0;
class lt {
}
tt.Browser = lt;
lt.IS_SAFARI = () => (lt._IS_SAFARI === void 0 && (lt._IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)), lt._IS_SAFARI);
var Tt = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.EventListeners = void 0;
class J {
  static getElementIfFocusedOnAvailable(e, t) {
    return Array.isArray(e) ? e.find((i) => t === i) : t === e ? e : void 0;
  }
  static keyDownWindow(e) {
    e.element && J.getElementIfFocusedOnAvailable(e.element, document.activeElement) && (J.KEY_DOWN_TIMEOUT !== null && clearTimeout(J.KEY_DOWN_TIMEOUT), J.KEY_DOWN_TIMEOUT = setTimeout(() => {
      J.KEY_DOWN_TIMEOUT = null, this.resetRecording(e);
    }, 500));
  }
  static mouseDownWindow(e, t) {
    this.mouseDownElement = J.getElementIfFocusedOnAvailable(e, t.target);
  }
  static mouseUpWindow(e) {
    this.mouseDownElement && this.resetRecording(e), this.mouseDownElement = void 0;
  }
  static add(e, t) {
    const i = (t == null ? void 0 : t.insertInCursorLocation) === void 0 || (t == null ? void 0 : t.insertInCursorLocation);
    t != null && t.element && i && (e.mouseDownEvent = J.mouseDownWindow.bind(e, t.element), document.addEventListener("mousedown", e.mouseDownEvent), e.mouseUpEvent = J.mouseUpWindow.bind(e, t), document.addEventListener("mouseup", e.mouseUpEvent), e.keyDownEvent = J.keyDownWindow.bind(e, t), document.addEventListener("keydown", e.keyDownEvent));
  }
  static remove(e) {
    document.removeEventListener("mousedown", e.mouseDownEvent), document.removeEventListener("mouseup", e.mouseUpEvent), document.removeEventListener("keydown", e.keyDownEvent);
  }
}
li.EventListeners = J;
J.KEY_DOWN_TIMEOUT = null;
var ci = {};
Object.defineProperty(ci, "__esModule", { value: !0 });
ci.PreResultUtils = void 0;
class na {
  static process(e, t, i, n, r) {
    const o = n == null ? void 0 : n(t, i);
    return o ? (setTimeout(() => {
      o.restart ? e.resetRecording(r) : o.stop && e.stop();
    }), (o.stop || o.restart) && o.removeNewText) : !1;
  }
}
ci.PreResultUtils = na;
var Ct = {}, At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
At.AutoScroll = void 0;
class en {
  static changeStateIfNeeded(e, t) {
    t && !e.isCursorAtEnd && (e.endPadding = "", e.scrollingSpan.innerHTML = "&nbsp;");
  }
  static scrollGeneric(e, t) {
    e.isCursorAtEnd ? t.scrollTop = t.scrollHeight : e.scrollingSpan.scrollIntoView({ block: "nearest" });
  }
  // primitives don't need to be scrolled except in safari
  // they can only safely be scrolled to the end
  static scrollSafariPrimitiveToEnd(e) {
    e.scrollLeft = e.scrollWidth, e.scrollTop = e.scrollHeight;
  }
  static isElementOverflown(e) {
    return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
  }
  static isRequired(e, t) {
    return e && en.isElementOverflown(t);
  }
}
At.AutoScroll = en;
var je = {};
Object.defineProperty(je, "__esModule", { value: !0 });
je.Elements = void 0;
class sa {
  static isPrimitiveElement(e) {
    return e.tagName === "INPUT" || e.tagName === "TEXTAREA";
  }
  static createInterimSpan() {
    const e = document.createElement("span");
    return e.style.color = "grey", e.style.pointerEvents = "none", e;
  }
  static createGenericSpan() {
    const e = document.createElement("span");
    return e.style.pointerEvents = "none", e;
  }
  static appendSpans(e, t) {
    if (e.spansPopulated = !0, e.insertInCursorLocation && document.activeElement === t) {
      const i = window.getSelection();
      if (i != null && i.focusNode) {
        const n = i.getRangeAt(0);
        n.insertNode(e.scrollingSpan), n.insertNode(e.interimSpan), n.insertNode(e.finalSpan), n.collapse(!1), i.removeAllRanges(), i.addRange(n);
        return;
      }
    }
    t.appendChild(e.finalSpan), t.appendChild(e.interimSpan), t.appendChild(e.scrollingSpan);
  }
  static applyCustomColors(e, t) {
    t.interim && (e.interimSpan.style.color = t.interim), t.final && (e.finalSpan.style.color = t.final);
  }
  static isInsideShadowDOM(e) {
    return e.getRootNode() instanceof ShadowRoot;
  }
}
je.Elements = sa;
var Be = {};
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.Cursor = void 0;
class ht {
  static setOffsetForGeneric(e, t, i = 0) {
    let n = 0;
    for (let r = 0; r < e.childNodes.length; r += 1) {
      const o = e.childNodes[r];
      if (o.childNodes.length > 0) {
        const a = ht.setOffsetForGeneric(o, t, i);
        if (a === -1)
          return -1;
        i += a;
      } else if (o.textContent !== null) {
        if (i + o.textContent.length > t) {
          const a = document.createRange();
          a.setStart(o, t - i), a.collapse(!0);
          const l = window.getSelection();
          return l == null || l.removeAllRanges(), l == null || l.addRange(a), e.focus(), -1;
        }
        i += o.textContent.length, n += o.textContent.length;
      }
    }
    return n;
  }
  static focusEndOfGeneric(e) {
    const t = document.createRange();
    t.selectNodeContents(e), t.collapse(!1);
    const i = window.getSelection();
    i && (i.removeAllRanges(), i.addRange(t));
  }
  static setOffsetForSafariGeneric(e, t) {
    const i = window.getSelection();
    if (i) {
      const n = ht.getGenericElementCursorOffset(e, i, !0);
      console.log(n), setTimeout(() => {
      }, 100), ht.setOffsetForGeneric(e, n + t);
    }
  }
  // set to automatically scroll to cursor (scroll does not work in Safari)
  static setOffsetForPrimitive(e, t, i) {
    i && e.blur(), e.setSelectionRange(t, t), e.focus();
  }
  // Scroll Input in Safari - does not work for TextArea and uses span which can have a different style
  // private static getCursorOffsetFromLeft(inputElement: HTMLInputElement, position: number) {
  //   // Get the value of the input element up to the cursor position
  //   const valueUpToCursor = inputElement.value.substring(0, position);
  //   // Create a temporary span element to measure the width of the text
  //   const tempSpan = document.createElement('span');
  //   tempSpan.textContent = valueUpToCursor;
  //   tempSpan.style.visibility = 'hidden';
  //   tempSpan.style.position = 'absolute';
  //   document.body.appendChild(tempSpan);
  //   // Measure the width of the text up to the cursor position
  //   const offsetWidth = tempSpan.offsetWidth;
  //   const offsetHeight = tempSpan.offsetHeight;
  //   // Clean up the temporary span element
  //   document.body.removeChild(tempSpan);
  //   return {left: offsetWidth, top: offsetHeight};
  // }
  static getGenericElementCursorOffset(e, t, i) {
    let n = 0;
    if (t.rangeCount > 0) {
      const r = t.getRangeAt(0), o = r.cloneRange();
      o.selectNodeContents(e), i ? o.setEnd(r.startContainer, r.startOffset) : o.setEnd(r.endContainer, r.endOffset), n = o.toString().length;
    }
    return n;
  }
}
Be.Cursor = ht;
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.CommandUtils = void 0;
const _n = At, ra = je, oa = tt, wn = Be, Mn = De;
class K {
  static processCommand(e, t) {
    return (!t || !t.caseSensitive) && (e = e.toLowerCase()), (t == null ? void 0 : t.substrings) === !1 ? Mn.Text.breakupIntoWordsArr(e) : e;
  }
  static process(e) {
    var t;
    return ((t = e.settings) === null || t === void 0 ? void 0 : t.caseSensitive) === !0 ? e : Object.keys(e).reduce((n, r) => {
      const o = e[r];
      return n[r] = typeof o == "string" ? K.processCommand(o, e.settings) : o, n;
    }, {});
  }
  static toggleCommandModeOn(e) {
    var t;
    e.isWaitingForCommand = !0, (t = e.onCommandModeTrigger) === null || t === void 0 || t.call(e, !0);
  }
  static toggleCommandModeOff(e) {
    var t;
    e.isWaitingForCommand && ((t = e.onCommandModeTrigger) === null || t === void 0 || t.call(e, !1), e.isWaitingForCommand = !1);
  }
  static setText(e, t, i, n) {
    K.toggleCommandModeOff(e), ra.Elements.isPrimitiveElement(n) ? (n.value = i, e.isTargetInShadow || wn.Cursor.setOffsetForPrimitive(n, i.length, !0), oa.Browser.IS_SAFARI() && e.autoScroll && _n.AutoScroll.scrollSafariPrimitiveToEnd(n)) : (n.textContent = i, e.isTargetInShadow || wn.Cursor.focusEndOfGeneric(n), setTimeout(() => _n.AutoScroll.scrollGeneric(e, n))), e.resetRecording(t);
  }
  static checkIfMatchesSubstring(e, t) {
    return t.includes(e);
  }
  static checkIfMatchesWord(e, t, i) {
    const n = e;
    for (let r = i.length - 1; r >= 0; r -= 1) {
      let o = r, a = n.length - 1;
      for (; i[o] === n[a] && a >= 0; )
        o -= 1, a -= 1;
      if (a < 0)
        return !0;
    }
    return !1;
  }
  // prettier-ignore
  static execCommand(e, t, i, n, r) {
    var o, a, l;
    const c = e.commands;
    if (!c || !n || !i)
      return;
    const d = ((o = c.settings) === null || o === void 0 ? void 0 : o.caseSensitive) === !0 ? t : t.toLowerCase(), u = Mn.Text.breakupIntoWordsArr(d), h = ((a = c.settings) === null || a === void 0 ? void 0 : a.substrings) === !1 ? K.checkIfMatchesWord : K.checkIfMatchesSubstring;
    if (c.commandMode && h(c.commandMode, d, u))
      return e.setInterimColorToFinal(), setTimeout(() => K.toggleCommandModeOn(e)), { doNotProcessTranscription: !1 };
    if (!(c.commandMode && !e.isWaitingForCommand)) {
      if (c.stop && h(c.stop, d, u))
        return K.toggleCommandModeOff(e), setTimeout(() => e.stop()), { doNotProcessTranscription: !1 };
      if (c.pause && h(c.pause, d, u))
        return K.toggleCommandModeOff(e), e.setInterimColorToFinal(), setTimeout(() => {
          var p;
          e.isPaused = !0, (p = e.onPauseTrigger) === null || p === void 0 || p.call(e, !0);
        }), { doNotProcessTranscription: !1 };
      if (c.resume && h(c.resume, d, u))
        return e.isPaused = !1, (l = e.onPauseTrigger) === null || l === void 0 || l.call(e, !1), K.toggleCommandModeOff(e), e.resetRecording(i), { doNotProcessTranscription: !0 };
      if (c.reset && h(c.reset, d, u))
        return r !== void 0 && K.setText(e, i, r, n), { doNotProcessTranscription: !0 };
      if (c.removeAllText && h(c.removeAllText, d, u))
        return K.setText(e, i, "", n), { doNotProcessTranscription: !0 };
    }
  }
}
Ct.CommandUtils = K;
var di = {};
Object.defineProperty(di, "__esModule", { value: !0 });
di.Highlight = void 0;
const aa = je, it = Be;
class Wt {
  static setStateForPrimitive(e, t) {
    let i, n;
    t.selectionStart !== null && (i = t.selectionStart), t.selectionEnd !== null && (n = t.selectionEnd), e.isHighlighted = i !== n;
  }
  static setStateForGeneric(e, t) {
    const i = window.getSelection();
    if (i != null && i.focusNode) {
      const n = it.Cursor.getGenericElementCursorOffset(t, i, !0), r = it.Cursor.getGenericElementCursorOffset(t, i, !1);
      e.isHighlighted = n !== r;
    }
  }
  static setState(e, t) {
    document.activeElement === t && (aa.Elements.isPrimitiveElement(t) ? Wt.setStateForPrimitive(e, t) : Wt.setStateForGeneric(e, t));
  }
  static removeForGeneric(e, t) {
    const i = window.getSelection();
    if (i) {
      const n = it.Cursor.getGenericElementCursorOffset(t, i, !0);
      i.deleteFromDocument(), it.Cursor.setOffsetForGeneric(t, n), e.isHighlighted = !1;
    }
  }
  static removeForPrimitive(e, t) {
    const i = t.selectionStart, n = t.selectionEnd, r = t.value;
    if (i && n) {
      const o = r.substring(0, i) + r.substring(n);
      t.value = o, it.Cursor.setOffsetForPrimitive(t, i, e.autoScroll);
    }
    e.isHighlighted = !1;
  }
}
di.Highlight = Wt;
var ui = {};
Object.defineProperty(ui, "__esModule", { value: !0 });
ui.Padding = void 0;
const la = je, Tn = Be, qe = De;
class Kt {
  static setStateForPrimitiveElement(e, t) {
    if (document.activeElement === t && t.selectionStart !== null) {
      const n = t.selectionStart, r = t.value[n - 1], o = t.selectionEnd === null ? n : t.selectionEnd, a = t.value[o];
      qe.Text.isCharDefined(r) && (e.startPadding = " ", e.numberOfSpacesBeforeNewText = 1), qe.Text.isCharDefined(a) && (e.endPadding = " ", e.numberOfSpacesAfterNewText = 1), e.isCursorAtEnd = t.value.length === o;
      return;
    }
    const i = t.value[t.value.length - 1];
    qe.Text.isCharDefined(i) && (e.startPadding = " ", e.numberOfSpacesBeforeNewText = 1), e.isCursorAtEnd = !0;
  }
  static setStateForGenericElement(e, t) {
    var i, n, r;
    if (document.activeElement === t) {
      const a = window.getSelection();
      if (a != null && a.focusNode) {
        const l = Tn.Cursor.getGenericElementCursorOffset(t, a, !0), c = (i = t.textContent) === null || i === void 0 ? void 0 : i[l - 1], d = Tn.Cursor.getGenericElementCursorOffset(t, a, !1), u = (n = t.textContent) === null || n === void 0 ? void 0 : n[d];
        qe.Text.isCharDefined(c) && (e.startPadding = " "), qe.Text.isCharDefined(u) && (e.endPadding = " "), e.isCursorAtEnd = ((r = t.textContent) === null || r === void 0 ? void 0 : r.length) === d;
        return;
      }
    }
    const o = t.innerText.charAt(t.innerText.length - 1);
    qe.Text.isCharDefined(o) && (e.startPadding = " "), e.isCursorAtEnd = !0;
  }
  static setState(e, t) {
    la.Elements.isPrimitiveElement(t) ? Kt.setStateForPrimitiveElement(e, t) : Kt.setStateForGenericElement(e, t);
  }
  static adjustStateAfterRecodingPrimitiveElement(e, t) {
    if (e.primitiveTextRecorded = !0, e.insertInCursorLocation && document.activeElement === t && (t.selectionEnd !== null && (e.endPadding = e.endPadding + t.value.slice(t.selectionEnd)), t.selectionStart !== null)) {
      e.startPadding = t.value.slice(0, t.selectionStart) + e.startPadding;
      return;
    }
    e.startPadding = t.value + e.startPadding;
  }
  static adjustSateForNoTextPrimitiveElement(e) {
    e.numberOfSpacesBeforeNewText === 1 && (e.startPadding = e.startPadding.substring(0, e.startPadding.length - 1), e.numberOfSpacesBeforeNewText = 0), e.numberOfSpacesAfterNewText === 1 && (e.endPadding = e.endPadding.substring(1), e.numberOfSpacesAfterNewText = 0);
  }
}
ui.Padding = Kt;
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.Speech = void 0;
const Cn = li, ca = ci, An = Ct, Rt = At, Ti = di, ie = je, Ci = ui, kn = tt, In = Be, Ai = De;
class da {
  constructor() {
    this.finalTranscript = "", this.interimSpan = ie.Elements.createInterimSpan(), this.finalSpan = ie.Elements.createGenericSpan(), this.scrollingSpan = ie.Elements.createGenericSpan(), this.isCursorAtEnd = !1, this.spansPopulated = !1, this.startPadding = "", this.endPadding = "", this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.recognizing = !1, this._displayInterimResults = !0, this.insertInCursorLocation = !0, this.autoScroll = !0, this.isRestarting = !1, this.isPaused = !1, this.isWaitingForCommand = !1, this.isTargetInShadow = !1, this.cannotBeStopped = !1, this.resetState();
  }
  prepareBeforeStart(e) {
    var t, i;
    if (e != null && e.element)
      if (Cn.EventListeners.add(this, e), Array.isArray(e.element)) {
        const r = e.element.find((o) => o === document.activeElement) || e.element[0];
        if (!r)
          return;
        this.prepare(r);
      } else
        this.prepare(e.element);
    (e == null ? void 0 : e.displayInterimResults) !== void 0 && (this._displayInterimResults = e.displayInterimResults), e != null && e.textColor && (this._finalTextColor = (t = e == null ? void 0 : e.textColor) === null || t === void 0 ? void 0 : t.final, ie.Elements.applyCustomColors(this, e.textColor)), (e == null ? void 0 : e.insertInCursorLocation) !== void 0 && (this.insertInCursorLocation = e.insertInCursorLocation), (e == null ? void 0 : e.autoScroll) !== void 0 && (this.autoScroll = e.autoScroll), this._onResult = e == null ? void 0 : e.onResult, this._onPreResult = e == null ? void 0 : e.onPreResult, this._onStart = e == null ? void 0 : e.onStart, this._onStop = e == null ? void 0 : e.onStop, this._onError = e == null ? void 0 : e.onError, this.onCommandModeTrigger = e == null ? void 0 : e.onCommandModeTrigger, this.onPauseTrigger = e == null ? void 0 : e.onPauseTrigger, this._options = e, !((i = this._options) === null || i === void 0) && i.commands && (this.commands = An.CommandUtils.process(this._options.commands));
  }
  prepare(e) {
    Ci.Padding.setState(this, e), Ti.Highlight.setState(this, e), this.isTargetInShadow = ie.Elements.isInsideShadowDOM(e), ie.Elements.isPrimitiveElement(e) ? (this._primitiveElement = e, this._originalText = this._primitiveElement.value) : (this._genericElement = e, this._originalText = this._genericElement.textContent);
  }
  // there was an attempt to optimize this by not having to restart the service and just reset state:
  // unfortunately it did not work because the service would still continue firing the intermediate and final results
  // into the new position
  resetRecording(e) {
    this.isRestarting = !0, this.stop(!0), this.resetState(!0), this.start(e, !0);
  }
  // prettier-ignore
  updateElements(e, t, i) {
    var n;
    const r = Ai.Text.capitalize(t);
    if (this.finalTranscript === r && e === "")
      return;
    ca.PreResultUtils.process(this, i, e === "", this._onPreResult, this._options) && (e = "", i = "");
    const o = this.commands && An.CommandUtils.execCommand(this, i, this._options, this._primitiveElement || this._genericElement, this._originalText);
    if (o) {
      if (o.doNotProcessTranscription)
        return;
      e = "", i = "";
    }
    if (this.isPaused || this.isWaitingForCommand)
      return;
    (n = this._onResult) === null || n === void 0 || n.call(this, i, e === ""), this.finalTranscript = r, this._displayInterimResults || (e = "");
    const a = this.finalTranscript === "" && e === "";
    this._primitiveElement ? this.updatePrimitiveElement(this._primitiveElement, e, a) : this._genericElement && this.updateGenericElement(this._genericElement, e, a);
  }
  // prettier-ignore
  // remember that padding values here contain actual text left and right
  updatePrimitiveElement(e, t, i) {
    this.isHighlighted && Ti.Highlight.removeForPrimitive(this, e), this.primitiveTextRecorded || Ci.Padding.adjustStateAfterRecodingPrimitiveElement(this, e), i && Ci.Padding.adjustSateForNoTextPrimitiveElement(this);
    const n = this.startPadding + this.finalTranscript + t;
    if (e.value = n + this.endPadding, !this.isTargetInShadow) {
      const r = n.length + this.numberOfSpacesAfterNewText;
      In.Cursor.setOffsetForPrimitive(e, r, this.autoScroll);
    }
    this.autoScroll && kn.Browser.IS_SAFARI() && this.isCursorAtEnd && Rt.AutoScroll.scrollSafariPrimitiveToEnd(e);
  }
  updateGenericElement(e, t, i) {
    this.isHighlighted && Ti.Highlight.removeForGeneric(this, e), this.spansPopulated || ie.Elements.appendSpans(this, e);
    const n = (i ? "" : this.startPadding) + Ai.Text.lineBreak(this.finalTranscript);
    this.finalSpan.innerHTML = n;
    const r = Rt.AutoScroll.isRequired(this.autoScroll, e);
    Rt.AutoScroll.changeStateIfNeeded(this, r);
    const o = Ai.Text.lineBreak(t) + (i ? "" : this.endPadding);
    this.interimSpan.innerHTML = o, kn.Browser.IS_SAFARI() && this.insertInCursorLocation && In.Cursor.setOffsetForSafariGeneric(e, n.length + o.length), r && Rt.AutoScroll.scrollGeneric(this, e), i && (this.scrollingSpan.innerHTML = "");
  }
  finalise(e) {
    this._genericElement && (e ? (this.finalSpan = ie.Elements.createGenericSpan(), this.setInterimColorToFinal(), this.interimSpan = ie.Elements.createInterimSpan(), this.scrollingSpan = ie.Elements.createGenericSpan()) : this._genericElement.textContent = this._genericElement.textContent, this.spansPopulated = !1), Cn.EventListeners.remove(this);
  }
  setInterimColorToFinal() {
    this.interimSpan.style.color = this._finalTextColor || "black";
  }
  resetState(e) {
    this._primitiveElement = void 0, this._genericElement = void 0, this.finalTranscript = "", this.finalSpan.innerHTML = "", this.interimSpan.innerHTML = "", this.scrollingSpan.innerHTML = "", this.startPadding = "", this.endPadding = "", this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, e || (this.stopTimeout = void 0);
  }
  setStateOnStart() {
    var e;
    this.recognizing = !0, this.isRestarting ? this.isRestarting = !1 : (e = this._onStart) === null || e === void 0 || e.call(this);
  }
  setStateOnStop() {
    var e;
    this.recognizing = !1, this.isRestarting || (e = this._onStop) === null || e === void 0 || e.call(this);
  }
  setStateOnError(e) {
    var t;
    (t = this._onError) === null || t === void 0 || t.call(this, e), this.recognizing = !1;
  }
}
Tt.Speech = da;
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.WebSpeech = void 0;
const Ln = ai, Rn = tt, ua = Tt;
class Jt extends ua.Speech {
  constructor() {
    super();
  }
  start(e) {
    var t;
    this._extractText === void 0 && (this._extractText = Rn.Browser.IS_SAFARI() ? Ln.WebSpeechTranscript.extractSafari : Ln.WebSpeechTranscript.extract), this.validate() && (this.prepareBeforeStart(e), this.instantiateService(e), (t = this._service) === null || t === void 0 || t.start(), this._translations = e == null ? void 0 : e.translations);
  }
  validate() {
    return Jt.getAPI() ? !0 : (this.error("Speech Recognition is unsupported"), !1);
  }
  instantiateService(e) {
    var t, i;
    const n = Jt.getAPI();
    this._service = new n(), this._service.continuous = !0, this._service.interimResults = (t = e == null ? void 0 : e.displayInterimResults) !== null && t !== void 0 ? t : !0, this._service.lang = ((i = e == null ? void 0 : e.language) === null || i === void 0 ? void 0 : i.trim()) || "en-US", this.setEvents();
  }
  setEvents() {
    this._service && (this._service.onstart = () => {
      this.setStateOnStart();
    }, this._service.onerror = (e) => {
      Rn.Browser.IS_SAFARI() && e.message === "Another request is started" || e.error === "aborted" && this.isRestarting || e.error !== "no-speech" && this.error(e.message || e.error);
    }, this._service.onaudioend = () => {
      this.setStateOnStop();
    }, this._service.onend = () => {
      this._stopping = !1;
    }, this._service.onresult = (e) => {
      if (typeof e.results > "u" && this._service)
        this._service.onend = null, this._service.stop();
      else if (this._extractText && !this._stopping) {
        const { interimTranscript: t, finalTranscript: i, newText: n } = this._extractText(e, this.finalTranscript, this._translations);
        this.updateElements(t, i, n);
      }
    });
  }
  stop(e) {
    var t;
    this._stopping = !0, (t = this._service) === null || t === void 0 || t.stop(), this.finalise(e);
  }
  static getAPI() {
    return window.webkitSpeechRecognition || window.SpeechRecognition;
  }
  error(e) {
    console.error(e), this.setStateOnError(e), this.stop();
  }
}
oi.WebSpeech = Jt;
var hi = {};
Object.defineProperty(hi, "__esModule", { value: !0 });
hi.GlobalState = void 0;
class $e {
  static doubleClickDetector() {
    return $e.doubleClickPending ? !0 : ($e.doubleClickPending = !0, setTimeout(() => {
      $e.doubleClickPending = !1;
    }, 300), !1);
  }
}
hi.GlobalState = $e;
$e.doubleClickPending = !1;
var pi = {}, fi = {};
Object.defineProperty(fi, "__esModule", { value: !0 });
fi.PreventConnectionStop = void 0;
class ha {
  static applyPrevention(e) {
    clearTimeout(e._manualConnectionStopPrevention), e.cannotBeStopped = !0, e._manualConnectionStopPrevention = setTimeout(() => {
      e.cannotBeStopped = !1;
    }, 800);
  }
  static clearPrevention(e) {
    clearTimeout(e._manualConnectionStopPrevention), e.cannotBeStopped = !1;
  }
}
fi.PreventConnectionStop = ha;
var mi = {}, gi = {};
Object.defineProperty(gi, "__esModule", { value: !0 });
gi.README_URL = void 0;
gi.README_URL = "https://github.com/OvidijusParsiunas/speech-to-element";
Object.defineProperty(mi, "__esModule", { value: !0 });
mi.AzureSpeechConfig = void 0;
const ki = gi;
class $t {
  static validateOptions(e, t) {
    return t ? !t.subscriptionKey && !t.token && !t.retrieveToken ? (e(`Please define a 'subscriptionKey', 'token' or 'retrieveToken' property - more info: ${ki.README_URL}`), !1) : t.region ? !0 : (e(`Please define a 'region' property - more info: ${ki.README_URL}`), !1) : (e(`Please provide subscription details - more info: ${ki.README_URL}`), !1);
  }
  static async getNewSpeechConfig(e, t) {
    if (t.region)
      return t.subscriptionKey ? e.fromSubscription(t.subscriptionKey.trim(), t.region.trim()) : t.token ? e.fromAuthorizationToken(t.token.trim(), t.region.trim()) : t.retrieveToken ? t.retrieveToken().then((i) => t.region ? e.fromAuthorizationToken((i == null ? void 0 : i.trim()) || "", t.region.trim()) : null).catch((i) => (console.error(i), null)) : null;
  }
  static process(e, t) {
    t.language && (e.speechRecognitionLanguage = t.language.trim());
  }
  static async get(e, t) {
    const i = await $t.getNewSpeechConfig(e, t);
    return i && $t.process(i, t), i;
  }
}
mi.AzureSpeechConfig = $t;
var bi = {};
Object.defineProperty(bi, "__esModule", { value: !0 });
bi.StopTimeout = void 0;
class vt {
  static set(e) {
    e.stopTimeout = setTimeout(() => e.stop(), e.stopTimeoutMS);
  }
  static reset(e, t) {
    e.stopTimeoutMS = t || vt.DEFAULT_MS, e.stopTimeout && clearTimeout(e.stopTimeout), vt.set(e);
  }
}
bi.StopTimeout = vt;
vt.DEFAULT_MS = 2e4;
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
vi.AzureTranscript = void 0;
const pa = Mt;
class fa {
  // newText is used to only send new text in onResult as finalTranscript is continuously accumulated
  static extract(e, t, i, n) {
    return n && (e = pa.Translate.translate(e, n)), i ? { interimTranscript: "", finalTranscript: t + e, newText: e } : { interimTranscript: e, finalTranscript: t, newText: e };
  }
}
vi.AzureTranscript = fa;
Object.defineProperty(pi, "__esModule", { value: !0 });
pi.Azure = void 0;
const On = fi, Nn = mi, Ii = bi, Pn = vi, ma = Tt;
class Yt extends ma.Speech {
  constructor() {
    super(...arguments), this._newTextPadding = "";
  }
  start(e, t) {
    this._newTextPadding = "", this.stopTimeout === void 0 && Ii.StopTimeout.reset(this, e == null ? void 0 : e.stopAfterSilenceMs), this.prepareBeforeStart(e), this.startAsync(e), t || On.PreventConnectionStop.applyPrevention(this);
  }
  async startAsync(e) {
    var t;
    this.validate(e) && (await this.instantiateService(e), this._translations = e == null ? void 0 : e.translations, (t = this._service) === null || t === void 0 || t.startContinuousRecognitionAsync(() => {
    }, this.error));
  }
  validate(e) {
    return Yt.getAPI() ? Nn.AzureSpeechConfig.validateOptions(this.error.bind(this), e) : (this.moduleNotFound(), !1);
  }
  async instantiateService(e) {
    const t = Yt.getAPI(), i = t.AudioConfig.fromDefaultMicrophoneInput(), n = await Nn.AzureSpeechConfig.get(t.SpeechConfig, e);
    if (n) {
      const r = new t.SpeechRecognizer(n, i);
      this.setEvents(r), this._service = r, e.retrieveToken && this.retrieveTokenInterval(e.retrieveToken);
    } else
      this.error("Unable to contact Azure server");
  }
  setEvents(e) {
    e.recognizing = this.onRecognizing.bind(this), e.recognized = this.onRecognized.bind(this), e.sessionStarted = this.onSessionStarted.bind(this), e.canceled = this.onCanceled.bind(this), e.sessionStopped = this.onSessionStopped.bind(this);
  }
  // prettier-ignore
  onRecognizing(e, t) {
    if (this._stopping)
      return;
    const { interimTranscript: i, finalTranscript: n, newText: r } = Pn.AzureTranscript.extract(this._newTextPadding + t.result.text, this.finalTranscript, !1, this._translations);
    Ii.StopTimeout.reset(this, this.stopTimeoutMS), this.updateElements(i, n, r);
  }
  // WORK - huge opportunity to fix this in the repo!!!!!
  //   function onRecognized(sender, recognitionEventArgs) {
  //     var result = recognitionEventArgs.result;
  //     onRecognizedResult(recognitionEventArgs.result);
  // }
  // prettier-ignore
  onRecognized(e, t) {
    const i = t.result;
    switch (i.reason) {
      case window.SpeechSDK.ResultReason.Canceled:
        break;
      case window.SpeechSDK.ResultReason.RecognizedSpeech:
        if (i.text && !this._stopping) {
          const { interimTranscript: n, finalTranscript: r, newText: o } = Pn.AzureTranscript.extract(this._newTextPadding + i.text, this.finalTranscript, !0, this._translations);
          Ii.StopTimeout.reset(this, this.stopTimeoutMS), this.updateElements(n, r, o), r !== "" && (this._newTextPadding = " ");
        }
        break;
    }
  }
  onCanceled(e, t) {
    t.reason === window.SpeechSDK.CancellationReason.Error && this.error(t.errorDetails);
  }
  onSessionStarted() {
    On.PreventConnectionStop.clearPrevention(this), this.setStateOnStart();
  }
  onSessionStopped() {
    this._retrieveTokenInterval || clearInterval(this._retrieveTokenInterval), this._stopping = !1, this.setStateOnStop();
  }
  retrieveTokenInterval(e) {
    this._retrieveTokenInterval = setInterval(() => {
      e == null || e().then((t) => {
        this._service && (this._service.authorizationToken = (t == null ? void 0 : t.trim()) || "");
      }).catch((t) => {
        this.error(t);
      });
    }, 1e4);
  }
  stop(e) {
    var t;
    !e && this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), this._stopping = !0, (t = this._service) === null || t === void 0 || t.stopContinuousRecognitionAsync(), this.finalise(e);
  }
  static getAPI() {
    return window.SpeechSDK;
  }
  moduleNotFound() {
    console.error("speech recognition module not found:"), console.error(`please install the 'microsoft-cognitiveservices-speech-sdk' npm package or add a script tag: <script src="https://aka.ms/csspeech/jsbrowserpackageraw"><\/script>`), this.setStateOnError("speech recognition module not found");
  }
  error(e) {
    this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), console.error(e), this.setStateOnError(e), this.stop();
  }
}
pi.Azure = Yt;
Object.defineProperty(fs, "__esModule", { value: !0 });
const Dn = oi, ga = Ct, ee = hi, ba = pi;
class We {
  static toggle(e, t) {
    var i, n;
    const r = e.toLocaleLowerCase().trim();
    !((i = ee.GlobalState.service) === null || i === void 0) && i.recognizing ? this.stop() : r === "webspeech" ? We.startWebSpeech(t) : r === "azure" ? We.startAzure(t) : (console.error("service not found - must be either 'webspeech' or 'azure'"), (n = t == null ? void 0 : t.onError) === null || n === void 0 || n.call(t, "service not found - must be either 'webspeech' or 'azure'"));
  }
  static startWebSpeech(e) {
    We.stop() || (ee.GlobalState.service = new Dn.WebSpeech(), ee.GlobalState.service.start(e));
  }
  static isWebSpeechSupported() {
    return !!Dn.WebSpeech.getAPI();
  }
  static startAzure(e) {
    var t;
    We.stop() || !((t = ee.GlobalState.service) === null || t === void 0) && t.cannotBeStopped || (ee.GlobalState.service = new ba.Azure(), ee.GlobalState.service.start(e));
  }
  static stop() {
    var e;
    return ee.GlobalState.doubleClickDetector() ? !0 : (!((e = ee.GlobalState.service) === null || e === void 0) && e.recognizing && ee.GlobalState.service.stop(), !1);
  }
  static endCommandMode() {
    ee.GlobalState.service && ga.CommandUtils.toggleCommandModeOff(ee.GlobalState.service);
  }
}
var Li = fs.default = We;
class Zt extends bt {
  constructor(e, t, i) {
    var o;
    super(typeof e.speechToText == "object" ? (o = e.speechToText) == null ? void 0 : o.button : {});
    const { serviceName: n, processedConfig: r } = Zt.processConfiguration(t, e.speechToText);
    if (this._addErrorMessage = i, n === "webspeech" && !Li.isWebSpeechSupported())
      this.changeToUnsupported();
    else {
      const a = !e.textInput || !e.textInput.disabled;
      this.elementRef.onclick = this.buttonClick.bind(this, t, a, n, r);
    }
  }
  // prettier-ignore
  static processConfiguration(e, t) {
    var c;
    const i = typeof t == "object" ? t : {}, n = typeof i.webSpeech == "object" ? i.webSpeech : {}, r = i.azure || {}, o = {
      displayInterimResults: i.displayInterimResults ?? void 0,
      textColor: i.textColor ?? void 0,
      translations: i.translations ?? void 0,
      commands: i.commands ?? void 0,
      ...n,
      ...r
    }, a = (c = i.commands) == null ? void 0 : c.submit;
    return a && (o.onPreResult = (d) => d.toLowerCase().includes(a) ? (setTimeout(() => {
      var u;
      return (u = e.submit) == null ? void 0 : u.call(e);
    }), Li.endCommandMode(), { restart: !0, removeNewText: !0 }) : null), { serviceName: Zt.getServiceName(i), processedConfig: o };
  }
  static getServiceName(e) {
    return e.webSpeech ? "webspeech" : e.azure ? "azure" : "webspeech";
  }
  buttonClick(e, t, i, n) {
    e.removeTextIfPlaceholder(), Li.toggle(i, {
      insertInCursorLocation: !1,
      element: t ? e.inputElementRef : void 0,
      onError: this.onError.bind(this),
      onStart: this.changeToActive.bind(this),
      onStop: this.changeToDefault.bind(this),
      onCommandModeTrigger: this.onCommandModeTrigger.bind(this),
      ...n
    });
  }
  onCommandModeTrigger(e) {
    e ? this.changeToCommandMode() : this.changeToActive();
  }
  onError() {
    this._addErrorMessage("speechToText", "speech input error");
  }
}
class ms {
  static getFileName(e, t) {
    const i = /* @__PURE__ */ new Date(), n = String(i.getHours()).padStart(2, "0"), r = String(i.getMinutes()).padStart(2, "0"), o = String(i.getSeconds()).padStart(2, "0");
    return `${e}-${n}-${r}-${o}.${t}`;
  }
}
class va extends bt {
  constructor(e, t) {
    var i, n;
    super(t.button), this._waitingForBrowserApproval = !1, this._audioType = e, this._extension = ((i = t.files) == null ? void 0 : i.format) || "mp3", this._maxDurationSeconds = (n = t.files) == null ? void 0 : n.maxDurationSeconds, this.elementRef.onclick = this.buttonClick.bind(this);
  }
  buttonClick() {
    this._waitingForBrowserApproval || (this.isActive ? this.stop() : (this._waitingForBrowserApproval = !0, this.record()));
  }
  stop() {
    return new Promise((e) => {
      var t, i;
      this.changeToDefault(), (t = this._mediaRecorder) == null || t.stop(), (i = this._mediaStream) == null || i.getTracks().forEach((n) => n.stop()), setTimeout(() => {
        e();
      }, 10);
    });
  }
  record() {
    navigator.mediaDevices.getUserMedia({ audio: !0 }).then((e) => {
      this.changeToActive(), this._mediaRecorder = new MediaRecorder(e), this._audioType.addPlaceholderAttachment(this.stop.bind(this), this._maxDurationSeconds), this._mediaStream = e, this._mediaRecorder.addEventListener("dataavailable", (t) => {
        this.createFile(t);
      }), this._mediaRecorder.start();
    }).catch((e) => {
      console.error(e), this.stop();
    }).finally(() => {
      this._waitingForBrowserApproval = !1;
    });
  }
  createFile(e) {
    const t = new Blob([e.data], { type: `audio/${this._extension}` }), i = ms.getFileName(this._newFilePrefix || "audio", this._extension), n = new File([t], i, { type: t.type }), r = new FileReader();
    r.readAsDataURL(n), r.onload = (o) => {
      this._audioType.completePlaceholderAttachment(n, o.target.result);
    };
  }
}
const ya = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="1" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
  <line x1="22" y1="2" x2="11" y2="14"></line>
  <polygon points="22 2 15 22 11 14 2 10 22 2"></polygon>
</svg>
`;
class F {
  static setPropertyValueIfDoesNotExist(e, t, i) {
    const n = t[0];
    t.length === 1 ? e[n] ?? (e[n] = i) : (e[n] ?? (e[n] = {}), t.shift(), F.setPropertyValueIfDoesNotExist(e[n], t, i));
  }
  static setPropertyValue(e, t, i) {
    const n = t[0];
    t.length === 1 ? e[n] = i : (e[n] ?? (e[n] = {}), t.shift(), F.setPropertyValue(e[n], t, i));
  }
  static getObjectValue(e, t) {
    const i = t[0], n = e[i];
    return n === void 0 || t.length === 1 ? n : F.getObjectValue(n, t.slice(1));
  }
  static overwritePropertyObjectFromAnother(e, t, i) {
    const n = F.getObjectValue(t, i);
    if (n) {
      const r = { ...n, ...F.getObjectValue(e, i) || {} };
      F.setPropertyValue(e, i, r);
    }
  }
}
class Ce {
  static resetSubmit(e, t) {
    t ? e.unsetCustomStateStyles(["loading", "submit"]) : e.unsetCustomStateStyles(["stop", "loading", "submit"]), e.reapplyStateStyle("submit");
  }
  static overwriteDefaultStyleWithSubmit(e, t) {
    if (!e.submit)
      return;
    const i = JSON.parse(JSON.stringify(e[t] || {}));
    F.overwritePropertyObjectFromAnother(i, e.submit, ["container", "default"]), F.overwritePropertyObjectFromAnother(i, e.submit, ["text", "styles", "default"]), F.overwritePropertyObjectFromAnother(i, e.submit, ["svg", "styles", "default"]), e[t] = i;
  }
  // prettier-ignore
  static setUpDisabledButton(e) {
    F.setPropertyValueIfDoesNotExist(e, ["submit", "container", "default", "backgroundColor"], ""), F.setPropertyValueIfDoesNotExist(e, ["disabled", "container", "default", "backgroundColor"], "unset"), F.setPropertyValueIfDoesNotExist(e.submit, ["svg", "styles", "default", "filter"], ""), F.setPropertyValueIfDoesNotExist(
      e.disabled,
      ["svg", "styles", "default", "filter"],
      "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(5564%) hue-rotate(207deg) brightness(100%) contrast(97%)"
    ), Ce.overwriteDefaultStyleWithSubmit(e, "disabled");
  }
  static process(e) {
    const t = JSON.parse(JSON.stringify(e || {}));
    return Ce.overwriteDefaultStyleWithSubmit(t, "loading"), Ce.overwriteDefaultStyleWithSubmit(t, "stop"), e != null && e.alwaysEnabled || Ce.setUpDisabledButton(t), t;
  }
}
const yi = class I extends _t {
  // prettier-ignore
  constructor(e, t, i, n, r) {
    const o = Ce.process(e.submitButtonStyles);
    super(I.createButtonContainerElement(), o == null ? void 0 : o.position, o), this._isSVGLoadingIconOverriden = !1, this.status = { requestInProgress: !1, loadingActive: !1 }, this._messages = i, this._inputElementRef = t, this._fileAttachments = r, this._innerElements = this.createInnerElements(), this._abortStream = new AbortController(), this._stopClicked = { listener: () => {
    } }, this._serviceIO = n, this._alwaysEnabled = !!(o != null && o.alwaysEnabled), e.disableSubmitButton = this.disableSubmitButton.bind(this, n), this.attemptOverwriteLoadingStyle(e), setTimeout(() => {
      var a;
      this._validationHandler = e._validationHandler, this.assignHandlers(this._validationHandler), (a = this._validationHandler) == null || a.call(this);
    });
  }
  // prettier-ignore
  createInnerElements() {
    const { submit: e, loading: t, stop: i } = j.create(
      this.elementRef,
      ["submit", "loading", "stop"],
      this._customStyles
    ), n = e || I.createSubmitIconElement();
    return {
      submit: n,
      loading: t || I.createLoadingIconElement(),
      stop: i || I.createStopIconElement(),
      disabled: this.createDisabledIconElement(n)
    };
  }
  static createButtonContainerElement() {
    const e = document.createElement("div");
    return e.classList.add("input-button"), e;
  }
  static createSubmitIconElement() {
    const e = U.createSVGElement(ya);
    return e.id = "submit-icon", e;
  }
  static createLoadingIconElement() {
    const e = document.createElement("div");
    return e.classList.add("dots-jumping"), e;
  }
  static createStopIconElement() {
    const e = document.createElement("div");
    return e.id = "stop-icon", e;
  }
  createDisabledIconElement(e) {
    return j.createCustomElement("disabled", this._customStyles) || e.cloneNode(!0);
  }
  // prettier-ignore
  attemptOverwriteLoadingStyle(e) {
    var t, i, n, r, o, a, l, c, d;
    if (!((i = (t = this._customStyles) == null ? void 0 : t.submit) != null && i.svg || (o = (r = (n = this._customStyles) == null ? void 0 : n.loading) == null ? void 0 : r.svg) != null && o.content || (c = (l = (a = this._customStyles) == null ? void 0 : a.loading) == null ? void 0 : l.text) != null && c.content) && (e.displayLoadingBubble === void 0 || e.displayLoadingBubble === !0)) {
      const u = document.createElement("style");
      u.textContent = `
        .loading-button > * {
          filter: brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%)
            contrast(96%) !important;
        }`, (d = e.shadowRoot) == null || d.appendChild(u), this._isSVGLoadingIconOverriden = !0;
    }
  }
  assignHandlers(e) {
    this._serviceIO.completionsHandlers = {
      onFinish: this.resetSubmit.bind(this, e)
    }, this._serviceIO.streamHandlers = {
      onOpen: this.changeToStopIcon.bind(this),
      onClose: this.resetSubmit.bind(this, e),
      abortStream: this._abortStream,
      stopClicked: this._stopClicked
    };
    const { stream: t } = this._serviceIO.deepChat;
    typeof t == "object" && typeof t.simulation == "number" && (this._serviceIO.streamHandlers.simulationInterim = t.simulation);
  }
  resetSubmit(e) {
    this.status.requestInProgress = !1, this.status.loadingActive = !1, e();
  }
  async submitFromInput() {
    var t;
    await this._fileAttachments.completePlaceholders();
    const e = this._fileAttachments.getAllFileData();
    if (this._inputElementRef.classList.contains("text-input-placeholder"))
      this.attemptSubmit({ text: "", files: e });
    else {
      const i = (t = this._inputElementRef.textContent) == null ? void 0 : t.trim();
      this.attemptSubmit({ text: i, files: e });
    }
  }
  async programmaticSubmit(e) {
    typeof e == "string" && (e = ke.processSubmitUserMessage(e));
    const t = { text: e.text };
    e.files && (t.files = Array.from(e.files).map((i) => ({ file: i, type: ue.getTypeFromBlob(i) }))), setTimeout(() => this.attemptSubmit(t, !0));
  }
  // TO-DO - should be disabled when loading history
  async attemptSubmit(e, t = !1) {
    var r, o, a;
    if (await ((r = this._validationHandler) == null ? void 0 : r.call(this, t ? e : void 0)) === !1)
      return;
    this.changeToLoadingIcon(), await this.addNewMessage(e), this._serviceIO.isWebModel() || this._messages.addLoadingMessage(), Ui.clear(this._inputElementRef);
    const i = (o = e.files) == null ? void 0 : o.map((l) => l.file), n = { text: e.text === "" ? void 0 : e.text, files: i };
    await this._serviceIO.callAPI(n, this._messages), (a = this._fileAttachments) == null || a.removeAllFiles();
  }
  async addNewMessage({ text: e, files: t }) {
    const i = { role: x.USER_ROLE };
    e && (i.text = e), t && (i.files = await this._messages.addMultipleFiles(t)), this._serviceIO.sessionId && (i._sessionId = this._serviceIO.sessionId), Object.keys(i).length > 0 && this._messages.addNewMessage(i);
  }
  stopStream() {
    var e;
    this._abortStream.abort(), (e = this._stopClicked) == null || e.listener(), this._validationHandler && this.resetSubmit(this._validationHandler);
  }
  changeToStopIcon() {
    this._serviceIO.websocket || (this.elementRef.classList.remove(I.LOADING_CLASS, I.DISABLED_CLASS, I.SUBMIT_CLASS), this.elementRef.replaceChildren(this._innerElements.stop), this.reapplyStateStyle("stop", ["loading", "submit"]), this.elementRef.onclick = this.stopStream.bind(this), this.status.loadingActive = !1);
  }
  // WORK - animation needs to be lowered
  changeToLoadingIcon() {
    this._serviceIO.websocket || (this._isSVGLoadingIconOverriden || this.elementRef.replaceChildren(this._innerElements.loading), this.elementRef.classList.remove(I.SUBMIT_CLASS, I.DISABLED_CLASS), this.elementRef.classList.add(I.LOADING_CLASS), this.reapplyStateStyle("loading", ["submit"]), this.elementRef.onclick = () => {
    }, this.status.requestInProgress = !0, this.status.loadingActive = !0);
  }
  // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  changeToSubmitIcon() {
    this.elementRef.classList.contains(I.SUBMIT_CLASS) || (this.elementRef.classList.remove(I.LOADING_CLASS, I.DISABLED_CLASS), this.elementRef.classList.add(I.SUBMIT_CLASS), this.elementRef.replaceChildren(this._innerElements.submit), Ce.resetSubmit(this, this.status.loadingActive), this.elementRef.onclick = this.submitFromInput.bind(this));
  }
  // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  changeToDisabledIcon(e = !1) {
    this._alwaysEnabled && !e ? this.changeToSubmitIcon() : this.elementRef.classList.contains(I.DISABLED_CLASS) || (this.elementRef.classList.remove(I.LOADING_CLASS, I.SUBMIT_CLASS), this.elementRef.classList.add(I.DISABLED_CLASS), this.elementRef.replaceChildren(this._innerElements.disabled), this.reapplyStateStyle("disabled", ["submit"]), this.elementRef.onclick = () => {
    });
  }
  disableSubmitButton(e, t) {
    var i;
    e.isSubmitProgrammaticallyDisabled = t !== !1, !(this.status.requestInProgress || this.status.loadingActive) && (t === !1 ? (i = this._validationHandler) == null || i.call(this) : this.changeToDisabledIcon(!0));
  }
};
yi.SUBMIT_CLASS = "submit-button";
yi.LOADING_CLASS = "loading-button";
yi.DISABLED_CLASS = "disabled-button";
let xa = yi;
const Ea = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path d="M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z"/>
</svg>
`, Sa = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <title>capture</title>
  <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z"></path>
</svg>
`, _a = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
</svg>`, wa = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
class tn extends at {
  // prettier-ignore
  constructor(e, t, i, n) {
    super(e, ["modal-content", "modal-camera-content"], i), this._stopped = !1, this._format = "image/png", this._canvas = document.createElement("canvas"), this._canvas.classList.add("camera-modal-canvas");
    const { captureButton: r, submitButton: o } = this.addButtonsAndTheirEvents(t);
    this._captureButton = r, this._submitButton = o, this._captureIcon = this._captureButton.children[0], this._refreshIcon = U.createSVGElement(Ea), this._refreshIcon.classList.add("modal-svg-button-icon", "modal-svg-refresh-icon"), (n == null ? void 0 : n.format) === "jpeg" && (this._format = "image/jpeg"), n != null && n.dimensions && (this._dimensions = n.dimensions), this._contentRef.appendChild(this._canvas), this.extensionCloseCallback = this.stop;
  }
  addButtonsAndTheirEvents(e) {
    const t = at.createSVGButton(Sa);
    t.classList.add("modal-svg-camera-button"), t.children[0].classList.add("modal-svg-camera-icon");
    const i = this.addCloseButton(_a, !0);
    i.classList.add("modal-svg-close-button"), i.children[0].classList.add("modal-svg-close-icon");
    const n = at.createSVGButton(wa);
    return n.classList.add("modal-svg-submit-button"), this.addButtons(t, n), this.addButtonEvents(t, i, n, e), { captureButton: t, submitButton: n };
  }
  // prettier-ignore
  addButtonEvents(e, t, i, n) {
    e.onclick = () => {
      this.capture();
    }, t.addEventListener("click", this.stop.bind(this)), i.onclick = () => {
      const r = this.getFile();
      r && wt.addFilesToType([r], [n]), this.stop(), this.close();
    };
  }
  stop() {
    this._mediaStream && this._mediaStream.getTracks().forEach((e) => e.stop()), this._stopped = !0, setTimeout(() => {
      this._captureButton.replaceChildren(this._captureIcon), this._captureButton.classList.replace("modal-svg-refresh-button", "modal-svg-camera-button");
      const e = this._canvas.getContext("2d");
      e == null || e.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }, at.MODAL_CLOSE_TIMEOUT_MS);
  }
  start() {
    this._dataURL = void 0, this._submitButton.classList.add("modal-svg-submit-disabled"), this._stopped = !1, navigator.mediaDevices.getUserMedia({ video: this._dimensions || !0 }).then((e) => {
      if (this._mediaStream = e, !this.isOpen())
        return this.stop();
      const t = document.createElement("video");
      t.srcObject = e, t.play(), requestAnimationFrame(this.updateCanvas.bind(this, t, this._canvas));
    }).catch((e) => {
      console.error(e), this.stop(), this.close();
    });
  }
  capture() {
    this._dataURL ? (this._captureButton.replaceChildren(this._captureIcon), this._captureButton.classList.replace("modal-svg-refresh-button", "modal-svg-camera-button"), this._submitButton.classList.add("modal-svg-submit-disabled"), this._dataURL = void 0) : (this._captureButton.replaceChildren(this._refreshIcon), this._captureButton.classList.replace("modal-svg-camera-button", "modal-svg-refresh-button"), this._submitButton.classList.remove("modal-svg-submit-disabled"), this._dataURL = this._canvas.toDataURL());
  }
  getFile() {
    if (this._dataURL) {
      const e = atob(this._dataURL.split(",")[1]), t = new Array(e.length);
      for (let a = 0; a < e.length; a++)
        t[a] = e.charCodeAt(a);
      const i = new Uint8Array(t), n = new Blob([i], { type: this._format }), r = this._format === "image/jpeg" ? "jpeg" : "png", o = ms.getFileName(this._newFilePrefix || "photo", r);
      return new File([n], o, { type: n.type });
    }
  }
  updateCanvas(e, t) {
    if (!this._stopped) {
      if (!this._dataURL) {
        t.width = e.videoWidth, t.height = e.videoHeight;
        const i = t.getContext("2d");
        i == null || i.drawImage(e, 0, 0, t.width, t.height);
      }
      requestAnimationFrame(this.updateCanvas.bind(this, e, t));
    }
  }
  openCameraModal(e) {
    this.displayModalElements(), e.start();
  }
  // prettier-ignore
  static createCameraModalFunc(e, t, i, n) {
    const r = new tn(e, t, i, n);
    return r.openCameraModal.bind(r, r);
  }
}
const Ma = `<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path d="M29 7h-4.599l-2.401-4h-12l-2.4 4h-4.6c-1 0-3 1-3 2.969v16.031c0 1.657 1.5 3 2.792 3h26.271c1.313 0 2.938-1.406 2.938-2.968v-16.032c0-1-1-3-3-3zM30 26.032c0 0.395-0.639 0.947-0.937 0.969h-26.265c-0.232-0.019-0.797-0.47-0.797-1v-16.031c0-0.634 0.851-0.953 1-0.969h5.732l2.4-4h9.802l1.785 3.030 0.55 0.97h5.731c0.705 0 0.99 0.921 1 1v16.032zM16 10c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM16 22c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
</svg>`;
class Qt extends _t {
  constructor(e, t, i) {
    var r;
    super(Qt.createButtonElement(), (r = i == null ? void 0 : i.button) == null ? void 0 : r.position, (i == null ? void 0 : i.button) || {}, "Photo");
    const n = this.createInnerElements(this._customStyles);
    i && this.addClickEvent(e, t, i.modalContainerStyle, i.files), this.elementRef.classList.add("upload-file-button"), this.elementRef.appendChild(n.styles), this.reapplyStateStyle("styles");
  }
  createInnerElements(e) {
    return {
      styles: this.createInnerElement(Qt.createSVGIconElement(), "styles", e)
    };
  }
  createInnerElement(e, t, i) {
    return j.createSpecificStateElement(this.elementRef, t, i) || e;
  }
  static createButtonElement() {
    const e = document.createElement("div");
    return e.classList.add("input-button"), e;
  }
  static createSVGIconElement() {
    const e = U.createSVGElement(Ma);
    return e.id = "camera-icon", e;
  }
  // prettier-ignore
  addClickEvent(e, t, i, n) {
    const r = tn.createCameraModalFunc(
      e,
      t,
      i,
      n
    );
    this.elementRef.onclick = r;
  }
}
class pt {
  // prettier-ignore
  constructor(e, t, i, n) {
    this.elementRef = pt.createPanelElement(e.inputAreaStyle);
    const r = new Ui(e, i), o = {}, a = this.createFileUploadComponents(e, i, n, o);
    e.speechToText && !o.microphone && (o.microphone = { button: new Zt(e, r, t.addNewErrorMessage.bind(t)) });
    const l = new xa(e, r.inputElementRef, t, i, a);
    r.submit = l.submitFromInput.bind(l), Me.attach(e, i, r, a, l), e.submitUserMessage = l.programmaticSubmit.bind(l), o.submit = { button: l }, pt.addElements(this.elementRef, r, o, n, a, e.dropupStyles);
  }
  static createPanelElement(e) {
    const t = document.createElement("div");
    return t.id = "input", Object.assign(t.style, e), t;
  }
  // prettier-ignore
  createFileUploadComponents(e, t, i, n) {
    var o, a, l, c;
    const r = new wt(this.elementRef, e.attachmentContainerStyle, t.demo);
    if (pt.createUploadButtons(e, t.fileTypes || {}, r, i, n), (o = t.camera) != null && o.files) {
      const d = ((a = n.images) == null ? void 0 : a.fileType) || r.addType(e, t.camera.files, "images");
      n.camera = { button: new Qt(i, d, t.camera) };
    }
    if ((l = t.recordAudio) != null && l.files) {
      const d = ((c = n.audio) == null ? void 0 : c.fileType) || r.addType(e, t.recordAudio.files, "audio");
      n.microphone = { button: new va(d, t.recordAudio) };
    }
    return de.isEnabled(r, e.dragAndDrop) && de.create(i, r, e.dragAndDrop), r;
  }
  // prettier-ignore
  static createUploadButtons(e, t, i, n, r) {
    Object.keys(t).forEach((o) => {
      const a = o, l = t[a];
      if (l.files) {
        const c = i.addType(e, l.files, a), { id: d, svgString: u, dropupText: h } = Yo[a], p = new ut(n, c, l, d, u, h);
        r[a] = { button: p, fileType: c };
      }
    });
  }
  // prettier-ignore
  static addElements(e, t, i, n, r, o) {
    Y.addElements(e, t.elementRef);
    const a = Xe.create(), l = B.addButtons(a, i, n, o);
    Vo.set(t.inputElementRef, a, r.elementRef, l), Xe.add(e, a);
  }
}
class nn {
  static createElements(e, t, i) {
    const n = document.createElement("div");
    n.id = "chat-view";
    const r = new me(e, t, i);
    t.websocket && $.createConnection(t, r);
    const o = new pt(e, r, t, n);
    return Y.addElements(n, r.elementRef, o.elementRef), n;
  }
  static render(e, t, i, n) {
    const r = nn.createElements(e, i, n);
    t.replaceChildren(r);
  }
}
const Ta = `#validate-property-key-view{height:100%;position:relative;display:flex;justify-content:center;align-items:center;padding:8px}#large-loading-ring{display:inline-block;width:50px;height:50px}#large-loading-ring:after{content:" ";display:block;width:38px;height:38px;margin:1px;border-radius:50%;border:5px solid #5fb2ff;border-color:#5fb2ff transparent #5fb2ff transparent;animation:large-loading-ring 1.4s linear infinite}@keyframes large-loading-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}#insert-key-view{height:100%;position:relative}#insert-key-contents{text-align:center;position:absolute;top:44%;left:50%;transform:translate(-50%,-50%);width:82%;display:flex;max-width:700px}#insert-key-title{margin-bottom:15px}#insert-key-input-container{margin-right:2.7em;width:calc(100% - 80px)}#insert-key-input{padding:.3em 1.7em .3em .3em;border-width:1px;border-style:solid;border-radius:3px;width:100%;font-size:inherit}.insert-key-input-valid{border-color:gray}.insert-key-input-invalid{border-color:red}#visibility-icon-container{position:relative;float:right;cursor:pointer;-webkit-user-select:none;user-select:none}.visibility-icon{filter:brightness(0) saturate(100%) invert(63%) sepia(1%) saturate(9%) hue-rotate(43deg) brightness(98%) contrast(92%);position:absolute;right:-1.7em;top:-1.43em}#visible-icon{top:-1.4em}.visibility-icon:hover{filter:unset}.visibility-icon>*{pointer-events:none}#start-button{border:1px solid grey;color:#454545;border-radius:4px;width:3em;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:.28em .3em;-webkit-user-select:none;user-select:none;background-color:#fff}#start-button:hover{background-color:#f2f2f2}#start-button:active{background-color:#d2d2d2}#insert-key-help-text-container{width:100%;position:absolute;margin-top:32px;margin-bottom:20px}#insert-key-help-text-contents{width:100%;position:absolute}#insert-key-input-invalid-text{display:block;margin-top:1em;margin-bottom:.5em;color:red}.insert-key-input-help-text{display:block;margin-top:16px}#loading-ring{display:inline-block;width:16px;height:16px}#loading-ring:after{content:" ";display:block;width:11px;height:11px;margin:1px;border-radius:50%;border:2px solid #0084ff;border-color:#0084ff transparent #0084ff transparent;animation:loading-ring 1.2s linear infinite}@keyframes loading-ring{0%{transform:rotate(0)}to{transform:rotate(360deg)}}#error-view{color:red;font-size:1.2em;line-height:1.3em;margin-top:-5px;text-align:center;height:100%;display:flex;justify-content:center;align-items:center;padding-left:8px;padding-right:8px}.intro-panel{position:absolute;display:flex;justify-content:center;right:0;bottom:0;left:0;margin:auto;height:fit-content;top:-2.5em}#internal-intro-panel{width:250px;height:min-content;display:block;border-radius:5px;overflow:auto;border:1px solid rgb(203,203,203);padding:10px;max-height:calc(100% - 6.8em)}#internal-intro-panel>p{margin-block-start:.8em;margin-block-end:.8em}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!
  Theme: a11y-dark
  Author: @ericwbailey
  Maintainer: @ericwbailey

  Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css
*/.hljs{background:#2b2b2b;color:#f8f8f2}.hljs-comment,.hljs-quote{color:#d4d0ab}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ffa07a}.hljs-built_in,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#f5ab35}.hljs-attribute{color:gold}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#abe338}.hljs-section,.hljs-title{color:#00e0e0}.hljs-keyword,.hljs-selector-tag{color:#dcc6e0}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}@media screen and (-ms-high-contrast: active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}#messages{overflow:auto}.outer-message-container:last-child{margin-bottom:5px}.inner-message-container{display:flex;margin-left:auto;margin-right:auto;width:calc(97.5% - 24px);max-width:100%}.message-bubble{margin-top:10px;word-wrap:break-word;width:fit-content;max-width:60%;border-radius:10px;padding:.42em .55em;height:fit-content;line-height:1.26em}.user-message-text{color:#fff;background-color:#0084ff;margin-right:0;margin-left:auto}.ai-message-text{color:#000;background-color:#e4e6eb;margin-left:0;margin-right:auto}.html-message{max-width:unset}.error-message-text{margin:14px auto 10px;background-color:#f4c0c0;color:#474747;text-align:center;max-width:95%}.loading-message-text{width:1em;padding:.6em .75em .6em 1.3em}.message-bubble>p:first-child{margin-top:0}.message-bubble>p:last-child{margin-bottom:0}pre{overflow:auto;display:block;word-break:break-all;word-wrap:break-word;border-radius:7px;background:#2b2b2b;color:#f8f8f2;margin-top:.8em;margin-bottom:.8em;padding:.6em;font-size:.9em;line-height:1.5em}.image-message{padding:0;display:flex;background-color:#ddd}.image-message>*,.image-message>*>*{width:100%;border-radius:8px;display:flex}.audio-message{width:60%;max-width:300px;height:2.2em;max-height:54px;padding:0;background-color:unset}.audio-player{width:100%;height:100%}.audio-player-safari{height:fit-content;width:40px}.audio-player-safari-left{float:left}.audio-player-safari-right{float:right}.any-file-message-bubble{padding:1px}.any-file-message-contents{display:flex}.any-file-message-icon-container{width:1.3em;min-width:1.3em;position:relative;border-radius:4px;margin-left:6px;margin-right:2px}.any-file-message-icon{background-color:#fff;border-radius:4px;position:absolute;width:1em;height:1.25em;padding:1px;margin-top:auto;margin-bottom:auto;top:0;bottom:0}.any-file-message-text{padding-top:5px;overflow-wrap:anywhere;padding-bottom:5px;padding-right:7px}.message-bubble>a{color:inherit}.left-item-position{margin-right:10px}.right-item-position{margin-left:10px}.deep-chat-web-model-button{margin-top:10px;margin-bottom:5px;margin-left:1px}.avatar{padding-top:5px;width:1.5em;height:1.5em;border-radius:1px}.avatar-container{margin-top:9px}.name{margin-top:16px;font-size:15px}#drag-and-drop{position:absolute;display:none;z-index:10;height:calc(100% - 10px);width:calc(100% - 10px);background-color:#70c6ff4d;border:5px dashed #6dafff}#file-attachment-container{position:absolute;height:3.6em;width:calc(80% - 4px);top:-2.5em;border-radius:5px;overflow:auto;text-align:left;background-color:#d7d7d73b;padding-left:4px}.file-attachment{width:2.85em;height:2.85em;display:inline-flex;margin-right:.6em;margin-bottom:.44em;margin-top:4px;position:relative;background-color:#fff;border-radius:5px}.image-attachment{width:100%;height:100%;object-fit:cover;border-radius:5px}.border-bound-attachment{width:calc(100% - 2px);height:calc(100% - 2px);border:1px solid #c3c3c3;border-radius:5px;overflow:hidden}.border-bound-attachment-safari{width:calc(100% - 1px);height:calc(100% - 1px)}.audio-attachment-icon-container{cursor:pointer}.audio-attachment-icon-container:hover{background-color:#f8f8f8}.attachment-icon{left:0;right:0;bottom:0;top:2px;margin:auto;position:absolute;width:25px;-webkit-user-select:none;user-select:none}.not-removable-attachment-icon{top:0;right:0;bottom:0;left:0}.play-icon{filter:brightness(0) saturate(100%) invert(17%) sepia(0%) saturate(1392%) hue-rotate(67deg) brightness(98%) contrast(97%)}.stop-icon{filter:brightness(0) saturate(100%) invert(29%) sepia(90%) saturate(1228%) hue-rotate(198deg) brightness(93%) contrast(98%)}.audio-placeholder-text-3-digits{padding-left:.26rem}.audio-placeholder-text-4-digits{padding-left:.1rem}.any-file-attachment{padding:2px 0}.file-attachment-text-container{position:absolute;width:inherit;display:flex;align-items:center;height:100%;top:-1px}.audio-placeholder-text-3-digits-container{padding-top:1px;cursor:default}.any-file-attachment-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:.13em;margin-left:auto;margin-right:auto}.remove-file-attachment-button{height:1.25em;width:1.25em;border:1px solid #cfcfcf;border-radius:25px;background-color:#fff;top:-4px;right:-5px;position:absolute;display:flex;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none}.remove-file-attachment-button:hover{background-color:#e4e4e4}.remove-file-attachment-button:active{background-color:#d7d7d7}.x-icon{color:#4e4e4e;top:-.075em;position:relative;font-size:1.05em}.modal{display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;width:80%;max-width:420px;max-height:80%;margin:auto;top:0;right:0;bottom:0;left:0;z-index:2}.modal-content{border-top:1px solid rgb(217,217,217);border-left:1px solid rgb(217,217,217);border-right:1px solid rgb(217,217,217);border-top-left-radius:inherit;border-top-right-radius:inherit;background-color:#fff;overflow-y:auto;height:fit-content;max-height:calc(100% - 3.3em);width:100%}.modal-content>p{margin-left:1em;margin-right:1em}.modal-content>ul{margin-right:1em}.modal-button-panel{height:3.3em;border:1px solid;border-color:rgb(223,223,223) rgb(217,217,217) rgb(217,217,217);border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;background-color:#fff;text-align:center;justify-content:center;display:flex;width:100%}.modal-button{min-width:2.5em;text-align:center;color:#fff;border-radius:5px;padding:.4em .4em .3em;height:1.25em;background-color:#3279b2;top:0;bottom:0;cursor:pointer;-webkit-user-select:none;user-select:none;margin:auto .31em}.modal-button:hover{background-color:#276da7}.modal-button:active{background-color:#1b5687}.modal-svg-button{padding:0 0 2px;width:2em;height:1.8em}.modal-svg-button-icon{width:100%;height:100%;filter:brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(4%) hue-rotate(346deg) brightness(101%) contrast(102%)}#modal-background-panel{position:absolute;width:100%;height:100%;background-color:#00000042;z-index:1;display:none}.show-modal-background{animation:fadeInBackground .3s ease-in-out}@keyframes fadeInBackground{0%{opacity:0}to{opacity:1}}.show-modal{animation:fadeInModal .3s ease-in-out}@keyframes fadeInModal{0%{opacity:0;scale:.95}to{opacity:1;scale:1}}.hide-modal-background{animation:fadeOutBackground .2s ease-in-out}@keyframes fadeOutBackground{0%{opacity:1}to{opacity:0}}.hide-modal{animation:fadeOutModal .2s ease-in-out}@keyframes fadeOutModal{0%{opacity:1;scale:1}to{opacity:0;scale:.95}}.modal-camera-content{overflow:hidden;text-align:center;border:unset;height:100%;background-color:#2a2a2a;display:flex;justify-content:center}.camera-modal-canvas{max-width:100%;max-height:100%;margin-top:auto;margin-bottom:auto}.modal-svg-submit-button{background-color:green}.modal-svg-submit-button:hover{background-color:#007500}.modal-svg-submit-button:active{background-color:#006500}.modal-svg-submit-disabled{pointer-events:none;background-color:#747474}.modal-svg-close-button{height:1.56em;padding-top:.37em;padding-bottom:0;background-color:#c13e3e}.modal-svg-close-button:hover{background-color:#b43434}.modal-svg-close-button:active{background-color:#972929}.modal-svg-close-icon{width:80%;height:80%}.modal-svg-camera-button{height:1.6em;padding-top:.38em;padding-bottom:0}.modal-svg-camera-icon{height:76%}.modal-svg-refresh-icon{height:105%}.modal-svg-refresh-button{height:1.66em;padding-top:.11em;padding-bottom:.21em}.input-button-container{position:relative;z-index:1}.inside-right{position:absolute;right:calc(10% + .35em);bottom:.85em}.inside-left{position:absolute;left:calc(10% + .35em);bottom:.85em}.outside-left{position:absolute;right:calc(11px - .55em);bottom:.88em}.outside-right{position:absolute;left:calc(11px - .55em);bottom:.88em}#upload-images-icon{position:absolute;pointer-events:none;width:1.45em;height:1.45em;left:.11em;bottom:.08em;filter:brightness(0) saturate(100%) invert(43%) sepia(0%) saturate(740%) hue-rotate(77deg) brightness(99%) contrast(92%)}#upload-gifs-icon{position:absolute;pointer-events:none;width:1.5em;height:1.48em;left:.07em;bottom:.08em;filter:brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(2586%) hue-rotate(12deg) brightness(93%) contrast(90%)}#upload-audio-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.17em;bottom:.2em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%);transform:scaleX(.95)}#camera-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.23em;bottom:.2em;filter:brightness(0) saturate(100%) invert(52%) sepia(0%) saturate(161%) hue-rotate(164deg) brightness(91%) contrast(92%);transform:scaleX(.95)}#upload-mixed-files-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.25em;bottom:.2em;filter:brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(36%) hue-rotate(74deg) brightness(98%) contrast(93%);transform:scaleX(.95)}#interim-text{color:gray}#microphone-button{padding-top:.5px}.outer-button-container>#microphone-button{padding-bottom:1px}#microphone-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.25em;bottom:.25em}.default-microphone-icon{filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%)}.active-microphone-icon{filter:brightness(0) saturate(100%) invert(10%) sepia(97%) saturate(7495%) hue-rotate(0deg) brightness(101%) contrast(107%);border-radius:10px}.command-microphone-icon{filter:brightness(0) saturate(100%) invert(42%) sepia(96%) saturate(1067%) hue-rotate(77deg) brightness(99%) contrast(102%)}.unsupported-microphone{display:none}#submit-icon{height:100%;filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%);width:1.21em}#stop-icon{background-color:#acacac;position:absolute;width:.95em;height:.95em;left:.35em;bottom:.35em;border-radius:2px}.submit-button-enlarged{scale:1.1;margin-right:.3em;margin-left:.3em}.dots-jumping{position:relative;left:calc(-9990px + .275em);width:.22em;height:.22em;border-radius:5px;background-color:#848484;color:#848484;box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484;animation:dots-jumping 1.5s infinite linear;bottom:-.7em}@keyframes dots-jumping{0%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}16.667%{box-shadow:9990px -6px #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}33.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}50%{box-shadow:9990px 0 #848484,calc(9990px + .44em) -6px 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}66.667%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}83.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) -6px 0 0 #848484}to{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}}.dots-flashing{position:relative;width:.45em;height:.45em;border-radius:5px;background-color:var(--message-dots-color);color:var(--message-dots-color);animation:dots-flashing 1s infinite linear alternate;animation-delay:.5s}.dots-flashing:before,.dots-flashing:after{content:"";display:inline-block;position:absolute;top:0}.dots-flashing:before{left:-.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--message-dots-color);color:var(--message-dots-color);animation:dots-flashing 1s infinite alternate;animation-delay:0s}.dots-flashing:after{left:.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--message-dots-color);color:var(--message-dots-color);animation:dots-flashing 1s infinite alternate;animation-delay:1s}@keyframes dots-flashing{0%{background-color:var(--message-dots-color)}50%,to{background-color:var(--message-dots-color-fade)}}.input-button{border-radius:4px;cursor:pointer;margin-bottom:.2em;-webkit-user-select:none;user-select:none}.input-button-svg{width:1.65em;height:1.65em}.input-button:hover{background-color:#9c9c9c2e}.input-button:active{background-color:#9c9c9c5e}.loading-button{cursor:auto}.loading-button:hover{background-color:unset}.text-button{filter:unset!important;display:flex;justify-content:center;align-items:center;margin-left:4px;margin-right:4px;height:1.6em}#text-input-container{background-color:#fff;width:80%;display:flex;border:1px solid #0000001a;border-radius:5px;margin-top:.8em;margin-bottom:.8em;box-shadow:#959da533 0 1px 12px;overflow-y:auto;max-height:200px;position:relative}.text-input-container-left-adjustment{margin-left:1.5em}.text-input-container-right-adjustment{margin-right:1.5em}.text-input-container-left-small-adjustment{margin-left:1.1em}.text-input-container-left-small-adjustment>.outside-left{right:calc(14px - .55em)}.text-input-container-right-small-adjustment{margin-right:1.1em}.text-input-container-right-small-adjustment>.outside-right{left:calc(14px - .55em)}#text-input{text-align:left;outline:none;word-wrap:break-word;line-break:auto}.text-input-styling{padding:.4em .5em;overflow:overlay;width:100%}.text-input-inner-left-adjustment{padding-left:2.2em}.text-input-inner-right-adjustment{padding-right:2em}.text-input-disabled{pointer-events:none;-webkit-user-select:none;user-select:none}.text-input-placeholder{color:gray}.outside-right>#dropup-menu,.inside-right>#dropup-menu{right:0}#dropup-icon{position:absolute;pointer-events:none;width:1.16em;height:1.2em;left:.265em;bottom:.43em;filter:brightness(0) saturate(100%) invert(54%) sepia(0%) saturate(724%) hue-rotate(6deg) brightness(92%) contrast(90%)}#dropup-menu{background-color:#fff;position:absolute;transform:translateY(-100%);border-radius:5px;z-index:1;top:-.49em;box-shadow:#0003 -1px 2px 10px,#0000001a 0 2px 4px;cursor:pointer;-webkit-user-select:none;user-select:none}.dropup-menu-item{height:1.4em;padding:.28em .84em .28em .35em;display:flex;position:relative}.dropup-menu-item:first-child{padding-top:.49em;border-top-left-radius:inherit;border-top-right-radius:inherit}.dropup-menu-item:last-child{padding-bottom:.45em;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.dropup-menu-item-icon{width:1.39em;position:relative;margin-right:.56em}.dropup-menu-item-icon>svg{bottom:0!important;top:0!important;margin-bottom:auto;margin-top:auto}.dropup-menu-item-text{margin-top:.08em;width:max-content}#input{width:100%;display:inline-flex;text-align:center;margin-left:auto;margin-right:auto;margin-top:auto;position:relative;justify-content:center}#chat-view{height:100%;display:grid;grid-template-columns:100%}::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-thumb{background-color:#d0d0d0;border-radius:5px}::-webkit-scrollbar-track{background-color:#f2f2f2}:host{all:initial;display:table-cell}#container{height:inherit;width:inherit;overflow:hidden}
`;
var Ca = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, y = (s, e, t, i) => {
  for (var n = i > 1 ? void 0 : i ? Aa(e, t) : e, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(e, t, n) : o(n)) || n);
  return i && n && Ca(e, t, n), n;
};
class b extends mo {
  constructor() {
    super(), this.getMessages = () => [], this.submitUserMessage = () => console.warn("submitUserMessage failed - please wait for chat view to render before calling this property."), this.focusInput = () => Xt.focusFromParentElement(this._elementRef), this.refreshMessages = () => {
    }, this.clearMessages = () => {
    }, this.scrollToBottom = () => {
    }, this.disableSubmitButton = () => {
    }, this.onNewMessage = () => {
    }, this.onClearMessages = () => {
    }, this.onComponentRender = () => {
    }, this.onError = () => {
    }, this._hasBeenRendered = !1, this._auxiliaryStyleApplied = !1, qo.appendStyleSheetToHead(), this._elementRef = document.createElement("div"), this._elementRef.id = "container", this.attachShadow({ mode: "open" }).appendChild(this._elementRef), Ei.apply(Ta, this.shadowRoot), setTimeout(() => {
      this._hasBeenRendered || this.onRender();
    }, 20);
  }
  changeToChatView() {
    this._activeService && (this._activeService.validateConfigKey = !1), this.onRender();
  }
  // prettier-ignore
  onRender() {
    this._activeService ?? (this._activeService = zo.create(this)), this._activeService && (this.auxiliaryStyle && !this._auxiliaryStyleApplied && (Ei.apply(this.auxiliaryStyle, this.shadowRoot), this._auxiliaryStyleApplied = !0), Ei.applyDefaultStyleToComponent(this.style, this.chatStyle), ke.checkForContainerStyles(this, this._elementRef), this._activeService.key && this._activeService.validateConfigKey ? Dt.render(this._elementRef, this.changeToChatView.bind(this), this._activeService) : !(this._activeService instanceof q) || this._activeService.key ? (this._childElement ?? (this._childElement = this.children[0]), nn.render(this, this._elementRef, this._activeService, this._childElement)) : this._activeService instanceof q && P.render(this._elementRef, this.changeToChatView.bind(this), this._activeService), this._hasBeenRendered = !0, jt.onRender(this));
  }
}
y([
  v("function")
], b.prototype, "onAttachmentChange", 2);
y([
  v("object")
], b.prototype, "directConnection", 2);
y([
  v("object")
], b.prototype, "request", 2);
y([
  v("object")
], b.prototype, "webModel", 2);
y([
  v("object")
], b.prototype, "stream", 2);
y([
  v("object")
], b.prototype, "requestBodyLimits", 2);
y([
  v("function")
], b.prototype, "requestInterceptor", 2);
y([
  v("function")
], b.prototype, "responseInterceptor", 2);
y([
  v("function")
], b.prototype, "validateInput", 2);
y([
  v("object")
], b.prototype, "chatStyle", 2);
y([
  v("object")
], b.prototype, "attachmentContainerStyle", 2);
y([
  v("object")
], b.prototype, "dropupStyles", 2);
y([
  v("object")
], b.prototype, "inputAreaStyle", 2);
y([
  v("object")
], b.prototype, "textInput", 2);
y([
  v("object")
], b.prototype, "submitButtonStyles", 2);
y([
  v("string")
], b.prototype, "auxiliaryStyle", 2);
y([
  v("array")
], b.prototype, "initialMessages", 2);
y([
  v("object")
], b.prototype, "introMessage", 2);
y([
  v("object")
], b.prototype, "avatars", 2);
y([
  v("object")
], b.prototype, "names", 2);
y([
  v("boolean")
], b.prototype, "displayLoadingBubble", 2);
y([
  v("object")
], b.prototype, "errorMessages", 2);
y([
  v("object")
], b.prototype, "messageStyles", 2);
y([
  v("object")
], b.prototype, "textToSpeech", 2);
y([
  v("object")
], b.prototype, "speechToText", 2);
y([
  v("object")
], b.prototype, "images", 2);
y([
  v("object")
], b.prototype, "gifs", 2);
y([
  v("object")
], b.prototype, "camera", 2);
y([
  v("object")
], b.prototype, "audio", 2);
y([
  v("object")
], b.prototype, "microphone", 2);
y([
  v("object")
], b.prototype, "mixedFiles", 2);
y([
  v("object")
], b.prototype, "dragAndDrop", 2);
y([
  v("object")
], b.prototype, "introPanelStyle", 2);
y([
  v("object")
], b.prototype, "htmlClassUtilities", 2);
y([
  v("function")
], b.prototype, "onNewMessage", 2);
y([
  v("function")
], b.prototype, "onClearMessages", 2);
y([
  v("function")
], b.prototype, "onComponentRender", 2);
y([
  v("function")
], b.prototype, "onError", 2);
y([
  v("object")
], b.prototype, "demo", 2);
y([
  v("object")
], b.prototype, "_insertKeyViewStyles", 2);
customElements.define("deep-chat", b);
export {
  b as DeepChat
};
