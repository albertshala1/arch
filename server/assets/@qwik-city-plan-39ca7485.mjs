const isServer = true;
/**
 * @license
 * @builder.io/qwik 1.2.6
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */
const qDev = false;
const qDynamicPlatform = globalThis.qDynamicPlatform !== false;
const qTest = globalThis.qTest === true;
const qRuntimeQrl = globalThis.qRuntimeQrl === true;
const seal = (obj) => {
};
const isNode$1 = (value) => {
  return value && typeof value.nodeType === "number";
};
const isDocument = (value) => {
  return value.nodeType === 9;
};
const isElement$1 = (value) => {
  return value.nodeType === 1;
};
const isQwikElement = (value) => {
  const nodeType = value.nodeType;
  return nodeType === 1 || nodeType === 111;
};
const isNodeElement = (value) => {
  const nodeType = value.nodeType;
  return nodeType === 1 || nodeType === 111 || nodeType === 3;
};
const isVirtualElement = (value) => {
  return value.nodeType === 111;
};
const isText = (value) => {
  return value.nodeType === 3;
};
const isComment = (value) => {
  return value.nodeType === 8;
};
const STYLE = "";
const logError = (message, ...optionalParams) => {
  const err = message instanceof Error ? message : createError(message);
  const messageStr = err.stack || err.message;
  console.error("%cQWIK ERROR", STYLE, messageStr, ...printParams(optionalParams));
  return err;
};
const createError = (message) => {
  const err = new Error(message);
  return err;
};
const logErrorAndStop = (message, ...optionalParams) => {
  const err = logError(message, ...optionalParams);
  debugger;
  return err;
};
const printParams = (optionalParams) => {
  return optionalParams;
};
const QError_stringifyClassOrStyle = 0;
const QError_verifySerializable = 3;
const QError_setProperty = 6;
const QError_qrlIsNotFunction = 10;
const QError_notFoundContext = 13;
const QError_useMethodOutsideContext = 14;
const QError_immutableProps = 17;
const QError_useInvokeContext = 20;
const QError_invalidJsxNodeType = 25;
const QError_trackUseStore = 26;
const QError_missingObjectId = 27;
const QError_qrlMissingContainer = 30;
const QError_qrlMissingChunk = 31;
const QError_invalidRefValue = 32;
const qError = (code, ...parts) => {
  const text = codeToText(code);
  return logErrorAndStop(text, ...parts);
};
const codeToText = (code) => {
  {
    return `Code(${code})`;
  }
};
const createPlatform = () => {
  return {
    isServer,
    importSymbol(containerEl, url, symbolName) {
      var _a2;
      {
        const hash = getSymbolHash(symbolName);
        const regSym = (_a2 = globalThis.__qwik_reg_symbols) == null ? void 0 : _a2.get(hash);
        if (regSym) {
          return regSym;
        }
      }
      if (!url) {
        throw qError(QError_qrlMissingChunk, symbolName);
      }
      if (!containerEl) {
        throw qError(QError_qrlMissingContainer, url, symbolName);
      }
      const urlDoc = toUrl$1(containerEl.ownerDocument, containerEl, url).toString();
      const urlCopy = new URL(urlDoc);
      urlCopy.hash = "";
      urlCopy.search = "";
      const importURL = urlCopy.href;
      return import(
        /* @vite-ignore */
        importURL
      ).then((mod) => {
        return mod[symbolName];
      });
    },
    raf: (fn) => {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(fn());
        });
      });
    },
    nextTick: (fn) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(fn());
        });
      });
    },
    chunkForSymbol(symbolName, chunk) {
      return [symbolName, chunk ?? "_"];
    }
  };
};
const toUrl$1 = (doc, containerEl, url) => {
  const baseURI = doc.baseURI;
  const base = new URL(containerEl.getAttribute("q:base") ?? baseURI, baseURI);
  return new URL(url, base);
};
let _platform = /* @__PURE__ */ createPlatform();
const setPlatform = (plt) => _platform = plt;
const getPlatform = () => {
  return _platform;
};
const isServerPlatform = () => {
  if (qDynamicPlatform) {
    return _platform.isServer;
  }
  return false;
};
function assertDefined(value, text, ...parts) {
}
function assertEqual(value1, value2, text, ...parts) {
}
function assertTrue(value1, text, ...parts) {
}
function assertString(value1, text, ...parts) {
}
function assertQwikElement(el) {
}
function assertElement(el) {
}
const isSerializableObject = (v) => {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};
const isObject = (v) => {
  return v && typeof v === "object";
};
const isArray = (v) => {
  return Array.isArray(v);
};
const isString = (v) => {
  return typeof v === "string";
};
const isFunction = (v) => {
  return typeof v === "function";
};
const isPromise = (value) => {
  return value instanceof Promise;
};
const safeCall = (call, thenFn, rejectFn) => {
  try {
    const promise = call();
    if (isPromise(promise)) {
      return promise.then(thenFn, rejectFn);
    } else {
      return thenFn(promise);
    }
  } catch (e) {
    return rejectFn(e);
  }
};
const then = (promise, thenFn) => {
  return isPromise(promise) ? promise.then(thenFn) : thenFn(promise);
};
const promiseAll = (promises) => {
  const hasPromise = promises.some(isPromise);
  if (hasPromise) {
    return Promise.all(promises);
  }
  return promises;
};
const promiseAllLazy = (promises) => {
  if (promises.length > 0) {
    return Promise.all(promises);
  }
  return promises;
};
const isNotNullable = (v) => {
  return v != null;
};
const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const EMPTY_ARRAY = [];
const EMPTY_OBJ = {};
const getDocument = (node) => {
  if (!qDynamicPlatform) {
    return document;
  }
  if (typeof document !== "undefined") {
    return document;
  }
  if (node.nodeType === 9) {
    return node;
  }
  const doc = node.ownerDocument;
  return doc;
};
const OnRenderProp = "q:renderFn";
const ComponentStylesPrefixContent = "⭐️";
const QSlot = "q:slot";
const QSlotRef = "q:sref";
const QSlotS = "q:s";
const QStyle = "q:style";
const QScopedStyle = "q:sstyle";
const QLocaleAttr = "q:locale";
const QContainerAttr = "q:container";
const QContainerSelector = "[q\\:container]";
const RenderEvent = "qRender";
const ELEMENT_ID = "q:id";
const ELEMENT_ID_PREFIX = "#";
const fromCamelToKebabCase = (text) => {
  return text.replace(/([A-Z])/g, "-$1").toLowerCase();
};
const fromKebabToCamelCase = (text) => {
  return text.replace(/-./g, (x) => x[1].toUpperCase());
};
const directSetAttribute = (el, prop, value) => {
  return el.setAttribute(prop, value);
};
const directGetAttribute = (el, prop) => {
  return el.getAttribute(prop);
};
const CONTAINER_STATE = Symbol("ContainerState");
const _getContainerState = (containerEl) => {
  let set = containerEl[CONTAINER_STATE];
  if (!set) {
    containerEl[CONTAINER_STATE] = set = createContainerState(containerEl, directGetAttribute(containerEl, "q:base") ?? "/");
  }
  return set;
};
const createContainerState = (containerEl, base) => {
  const containerState = {
    $containerEl$: containerEl,
    $elementIndex$: 0,
    $styleMoved$: false,
    $proxyMap$: /* @__PURE__ */ new WeakMap(),
    $opsNext$: /* @__PURE__ */ new Set(),
    $taskNext$: /* @__PURE__ */ new Set(),
    $taskStaging$: /* @__PURE__ */ new Set(),
    $hostsNext$: /* @__PURE__ */ new Set(),
    $hostsStaging$: /* @__PURE__ */ new Set(),
    $styleIds$: /* @__PURE__ */ new Set(),
    $events$: /* @__PURE__ */ new Set(),
    $serverData$: {},
    $base$: base,
    $renderPromise$: void 0,
    $hostsRendering$: void 0,
    $pauseCtx$: void 0,
    $subsManager$: null
  };
  containerState.$subsManager$ = createSubscriptionManager(containerState);
  return containerState;
};
const setRef = (value, elm) => {
  if (isFunction(value)) {
    return value(elm);
  } else if (isObject(value)) {
    if ("value" in value) {
      return value.value = elm;
    }
  }
  throw qError(QError_invalidRefValue, value);
};
const SHOW_COMMENT$1 = 128;
const isContainer$1 = (el) => {
  return isElement$1(el) && el.hasAttribute(QContainerAttr);
};
const intToStr = (nu) => {
  return nu.toString(36);
};
const strToInt = (nu) => {
  return parseInt(nu, 36);
};
const getEventName = (attribute) => {
  const colonPos = attribute.indexOf(":");
  if (attribute) {
    return fromKebabToCamelCase(attribute.slice(colonPos + 1));
  } else {
    return attribute;
  }
};
const ON_PROP_REGEX = /^(on|window:|document:)/;
const PREVENT_DEFAULT = "preventdefault:";
const isOnProp = (prop) => {
  return prop.endsWith("$") && ON_PROP_REGEX.test(prop);
};
const groupListeners = (listeners) => {
  if (listeners.length === 0) {
    return EMPTY_ARRAY;
  }
  if (listeners.length === 1) {
    const listener = listeners[0];
    return [[listener[0], [listener[1]]]];
  }
  const keys = [];
  for (let i = 0; i < listeners.length; i++) {
    const eventName = listeners[i][0];
    if (!keys.includes(eventName)) {
      keys.push(eventName);
    }
  }
  return keys.map((eventName) => {
    return [eventName, listeners.filter((l) => l[0] === eventName).map((a) => a[1])];
  });
};
const setEvent = (existingListeners, prop, input, containerEl) => {
  assertTrue(prop.endsWith("$"), "render: event property does not end with $", prop);
  prop = normalizeOnProp(prop.slice(0, -1));
  if (input) {
    if (isArray(input)) {
      const processed = input.flat(Infinity).filter((q) => q != null).map((q) => [prop, ensureQrl(q, containerEl)]);
      existingListeners.push(...processed);
    } else {
      existingListeners.push([prop, ensureQrl(input, containerEl)]);
    }
  }
  return prop;
};
const PREFIXES = ["on", "window:on", "document:on"];
const SCOPED = ["on", "on-window", "on-document"];
const normalizeOnProp = (prop) => {
  let scope = "on";
  for (let i = 0; i < PREFIXES.length; i++) {
    const prefix = PREFIXES[i];
    if (prop.startsWith(prefix)) {
      scope = SCOPED[i];
      prop = prop.slice(prefix.length);
      break;
    }
  }
  if (prop.startsWith("-")) {
    prop = fromCamelToKebabCase(prop.slice(1));
  } else {
    prop = prop.toLowerCase();
  }
  return scope + ":" + prop;
};
const ensureQrl = (value, containerEl) => {
  const qrl = isQrl(value) ? value : $(value);
  qrl.$setContainer$(containerEl);
  return qrl;
};
const getDomListeners = (elCtx, containerEl) => {
  const attributes = elCtx.$element$.attributes;
  const listeners = [];
  for (let i = 0; i < attributes.length; i++) {
    const { name, value } = attributes.item(i);
    if (name.startsWith("on:") || name.startsWith("on-window:") || name.startsWith("on-document:")) {
      const urls = value.split("\n");
      for (const url of urls) {
        const qrl = parseQRL(url, containerEl);
        if (qrl.$capture$) {
          inflateQrl(qrl, elCtx);
        }
        listeners.push([name, qrl]);
      }
    }
  }
  return listeners;
};
function isElement(value) {
  return isNode(value) && value.nodeType === 1;
}
function isNode(value) {
  return value && typeof value.nodeType === "number";
}
const QObjectRecursive = 1 << 0;
const QObjectImmutable = 1 << 1;
const QOjectTargetSymbol = Symbol("proxy target");
const QObjectFlagsSymbol = Symbol("proxy flags");
const QObjectManagerSymbol = Symbol("proxy manager");
const _IMMUTABLE = Symbol("IMMUTABLE");
const _IMMUTABLE_PREFIX = "$$";
const _fnSignal = (fn, args, fnStr) => {
  return new SignalDerived(fn, args, fnStr);
};
const serializeDerivedSignalFunc = (signal) => {
  const fnBody = "null";
  let args = "";
  for (let i = 0; i < signal.$args$.length; i++) {
    args += `p${i},`;
  }
  return `(${args})=>(${fnBody})`;
};
var _a$1;
const _createSignal = (value, containerState, flags, subscriptions) => {
  const manager = containerState.$subsManager$.$createManager$(subscriptions);
  const signal = new SignalImpl(value, manager, flags);
  return signal;
};
const QObjectSignalFlags = Symbol("proxy manager");
const SIGNAL_IMMUTABLE = 1 << 0;
const SIGNAL_UNASSIGNED = 1 << 1;
const SignalUnassignedException = Symbol("unassigned signal");
class SignalBase {
}
class SignalImpl extends SignalBase {
  constructor(v, manager, flags) {
    super();
    this[_a$1] = 0;
    this.untrackedValue = v;
    this[QObjectManagerSymbol] = manager;
    this[QObjectSignalFlags] = flags;
  }
  // prevent accidental use as value
  valueOf() {
  }
  toString() {
    return `[Signal ${String(this.value)}]`;
  }
  toJSON() {
    return { value: this.value };
  }
  get value() {
    var _a2;
    if (this[QObjectSignalFlags] & SIGNAL_UNASSIGNED) {
      throw SignalUnassignedException;
    }
    const sub = (_a2 = tryGetInvokeContext()) == null ? void 0 : _a2.$subscriber$;
    if (sub) {
      this[QObjectManagerSymbol].$addSub$(sub);
    }
    return this.untrackedValue;
  }
  set value(v) {
    const manager = this[QObjectManagerSymbol];
    const oldValue = this.untrackedValue;
    if (manager && oldValue !== v) {
      this.untrackedValue = v;
      manager.$notifySubs$();
    }
  }
}
_a$1 = QObjectSignalFlags;
class SignalDerived extends SignalBase {
  constructor($func$, $args$, $funcStr$) {
    super();
    this.$func$ = $func$;
    this.$args$ = $args$;
    this.$funcStr$ = $funcStr$;
  }
  get value() {
    return this.$func$.apply(void 0, this.$args$);
  }
}
class SignalWrapper extends SignalBase {
  constructor(ref, prop) {
    super();
    this.ref = ref;
    this.prop = prop;
  }
  get [QObjectManagerSymbol]() {
    return getSubscriptionManager(this.ref);
  }
  get value() {
    return this.ref[this.prop];
  }
  set value(value) {
    this.ref[this.prop] = value;
  }
}
const isSignal = (obj) => {
  return obj instanceof SignalBase;
};
const _wrapProp = (obj, prop) => {
  var _a2, _b;
  if (!isObject(obj)) {
    return obj[prop];
  }
  if (obj instanceof SignalBase) {
    return obj;
  }
  const target = getProxyTarget(obj);
  if (target) {
    const signal = target[_IMMUTABLE_PREFIX + prop];
    if (signal) {
      return signal;
    }
    if (((_a2 = target[_IMMUTABLE]) == null ? void 0 : _a2[prop]) !== true) {
      return new SignalWrapper(obj, prop);
    }
  }
  const immutable = (_b = obj[_IMMUTABLE]) == null ? void 0 : _b[prop];
  if (isSignal(immutable)) {
    return immutable;
  }
  return _IMMUTABLE;
};
const _wrapSignal = (obj, prop) => {
  const r = _wrapProp(obj, prop);
  if (r === _IMMUTABLE) {
    return obj[prop];
  }
  return r;
};
const getOrCreateProxy = (target, containerState, flags = 0) => {
  const proxy = containerState.$proxyMap$.get(target);
  if (proxy) {
    return proxy;
  }
  if (flags !== 0) {
    setObjectFlags(target, flags);
  }
  return createProxy(target, containerState, void 0);
};
const createProxy = (target, containerState, subs) => {
  assertEqual(unwrapProxy(target), target, "Unexpected proxy at this location", target);
  assertTrue(!containerState.$proxyMap$.has(target), "Proxy was already created", target);
  const manager = containerState.$subsManager$.$createManager$(subs);
  const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
  containerState.$proxyMap$.set(target, proxy);
  return proxy;
};
const createPropsState = () => {
  const props = {};
  setObjectFlags(props, QObjectImmutable);
  return props;
};
const setObjectFlags = (obj, flags) => {
  Object.defineProperty(obj, QObjectFlagsSymbol, { value: flags, enumerable: false });
};
class ReadWriteProxyHandler {
  constructor($containerState$, $manager$) {
    this.$containerState$ = $containerState$;
    this.$manager$ = $manager$;
  }
  deleteProperty(target, prop) {
    if (target[QObjectFlagsSymbol] & QObjectImmutable) {
      throw qError(QError_immutableProps);
    }
    if (typeof prop != "string" || !delete target[prop]) {
      return false;
    }
    this.$manager$.$notifySubs$(isArray(target) ? void 0 : prop);
    return true;
  }
  get(target, prop) {
    var _a2;
    if (typeof prop === "symbol") {
      if (prop === QOjectTargetSymbol) {
        return target;
      }
      if (prop === QObjectManagerSymbol) {
        return this.$manager$;
      }
      return target[prop];
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    const invokeCtx = tryGetInvokeContext();
    const recursive = (flags & QObjectRecursive) !== 0;
    const immutable = (flags & QObjectImmutable) !== 0;
    const hiddenSignal = target[_IMMUTABLE_PREFIX + prop];
    let subscriber;
    let value;
    if (invokeCtx) {
      subscriber = invokeCtx.$subscriber$;
    }
    if (immutable && (!(prop in target) || immutableValue((_a2 = target[_IMMUTABLE]) == null ? void 0 : _a2[prop]))) {
      subscriber = null;
    }
    if (hiddenSignal) {
      value = hiddenSignal.value;
      subscriber = null;
    } else {
      value = target[prop];
    }
    if (subscriber) {
      const isA = isArray(target);
      this.$manager$.$addSub$(subscriber, isA ? void 0 : prop);
    }
    return recursive ? wrap(value, this.$containerState$) : value;
  }
  set(target, prop, newValue) {
    if (typeof prop === "symbol") {
      target[prop] = newValue;
      return true;
    }
    const flags = target[QObjectFlagsSymbol] ?? 0;
    const immutable = (flags & QObjectImmutable) !== 0;
    if (immutable) {
      throw qError(QError_immutableProps);
    }
    const recursive = (flags & QObjectRecursive) !== 0;
    const unwrappedNewValue = recursive ? unwrapProxy(newValue) : newValue;
    const isA = isArray(target);
    if (isA) {
      target[prop] = unwrappedNewValue;
      this.$manager$.$notifySubs$();
      return true;
    }
    const oldValue = target[prop];
    target[prop] = unwrappedNewValue;
    if (oldValue !== unwrappedNewValue) {
      this.$manager$.$notifySubs$(prop);
    }
    return true;
  }
  has(target, property) {
    if (property === QOjectTargetSymbol) {
      return true;
    }
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    if (hasOwnProperty.call(target, property)) {
      return true;
    }
    if (typeof property === "string" && hasOwnProperty.call(target, _IMMUTABLE_PREFIX + property)) {
      return true;
    }
    return false;
  }
  ownKeys(target) {
    const flags = target[QObjectFlagsSymbol] ?? 0;
    const immutable = (flags & QObjectImmutable) !== 0;
    if (!immutable) {
      let subscriber = null;
      const invokeCtx = tryGetInvokeContext();
      if (invokeCtx) {
        subscriber = invokeCtx.$subscriber$;
      }
      if (subscriber) {
        this.$manager$.$addSub$(subscriber);
      }
    }
    if (isArray(target)) {
      return Reflect.ownKeys(target);
    }
    return Reflect.ownKeys(target).map((a) => {
      return typeof a === "string" && a.startsWith(_IMMUTABLE_PREFIX) ? a.slice(_IMMUTABLE_PREFIX.length) : a;
    });
  }
  getOwnPropertyDescriptor(target, prop) {
    if (isArray(target) || typeof prop === "symbol") {
      return Object.getOwnPropertyDescriptor(target, prop);
    }
    return {
      enumerable: true,
      configurable: true
    };
  }
}
const immutableValue = (value) => {
  return value === _IMMUTABLE || isSignal(value);
};
const wrap = (value, containerState) => {
  if (isObject(value)) {
    if (Object.isFrozen(value)) {
      return value;
    }
    const nakedValue = unwrapProxy(value);
    if (nakedValue !== value) {
      return value;
    }
    if (fastSkipSerialize(nakedValue)) {
      return value;
    }
    if (isSerializableObject(nakedValue) || isArray(nakedValue)) {
      const proxy = containerState.$proxyMap$.get(nakedValue);
      return proxy ? proxy : getOrCreateProxy(nakedValue, containerState, QObjectRecursive);
    }
  }
  return value;
};
const Q_CTX = "_qc_";
const HOST_FLAG_DIRTY = 1 << 0;
const HOST_FLAG_NEED_ATTACH_LISTENER = 1 << 1;
const HOST_FLAG_MOUNTED = 1 << 2;
const HOST_FLAG_DYNAMIC = 1 << 3;
const tryGetContext = (element) => {
  return element[Q_CTX];
};
const getContext = (el, containerState) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    return ctx;
  }
  const elCtx = createContext(el);
  const elementID = directGetAttribute(el, "q:id");
  if (elementID) {
    const pauseCtx = containerState.$pauseCtx$;
    elCtx.$id$ = elementID;
    if (pauseCtx) {
      const { getObject, meta, refs } = pauseCtx;
      if (isElement(el)) {
        const refMap = refs[elementID];
        if (refMap) {
          assertTrue(isElement(el));
          elCtx.$refMap$ = refMap.split(" ").map(getObject);
          elCtx.li = getDomListeners(elCtx, containerState.$containerEl$);
        }
      } else {
        const styleIds = el.getAttribute(QScopedStyle);
        elCtx.$scopeIds$ = styleIds ? styleIds.split("|") : null;
        const ctxMeta = meta[elementID];
        if (ctxMeta) {
          const seq = ctxMeta.s;
          const host = ctxMeta.h;
          const contexts = ctxMeta.c;
          const tasks = ctxMeta.w;
          if (seq) {
            elCtx.$seq$ = seq.split(" ").map(getObject);
          }
          if (tasks) {
            elCtx.$tasks$ = tasks.split(" ").map(getObject);
          }
          if (contexts) {
            elCtx.$contexts$ = /* @__PURE__ */ new Map();
            for (const part of contexts.split(" ")) {
              const [key, value] = part.split("=");
              elCtx.$contexts$.set(key, getObject(value));
            }
          }
          if (host) {
            const [renderQrl, props] = host.split(" ");
            elCtx.$flags$ = HOST_FLAG_MOUNTED;
            if (renderQrl) {
              elCtx.$componentQrl$ = getObject(renderQrl);
            }
            if (props) {
              const propsObj = getObject(props);
              elCtx.$props$ = propsObj;
              setObjectFlags(propsObj, QObjectImmutable);
              propsObj[_IMMUTABLE] = getImmutableFromProps(propsObj);
            } else {
              elCtx.$props$ = createProxy(createPropsState(), containerState);
            }
          }
        }
      }
    }
  }
  return elCtx;
};
const getImmutableFromProps = (props) => {
  const immutable = {};
  const target = getProxyTarget(props);
  for (const key in target) {
    if (key.startsWith(_IMMUTABLE_PREFIX)) {
      immutable[key.slice(_IMMUTABLE_PREFIX.length)] = target[key];
    }
  }
  return immutable;
};
const createContext = (element) => {
  const ctx = {
    $flags$: 0,
    $id$: "",
    $element$: element,
    $refMap$: [],
    li: [],
    $tasks$: null,
    $seq$: null,
    $slots$: null,
    $scopeIds$: null,
    $appendStyles$: null,
    $props$: null,
    $vdom$: null,
    $componentQrl$: null,
    $contexts$: null,
    $dynamicSlots$: null,
    $parent$: null,
    $slotParent$: null
  };
  element[Q_CTX] = ctx;
  return ctx;
};
const cleanupContext = (elCtx, subsManager) => {
  var _a2;
  (_a2 = elCtx.$tasks$) == null ? void 0 : _a2.forEach((task) => {
    subsManager.$clearSub$(task);
    destroyTask(task);
  });
  elCtx.$componentQrl$ = null;
  elCtx.$seq$ = null;
  elCtx.$tasks$ = null;
};
let _locale = void 0;
function getLocale(defaultLocale) {
  if (_locale === void 0) {
    const ctx = tryGetInvokeContext();
    if (ctx && ctx.$locale$) {
      return ctx.$locale$;
    }
    if (defaultLocale !== void 0) {
      return defaultLocale;
    }
    throw new Error("Reading `locale` outside of context.");
  }
  return _locale;
}
function withLocale(locale, fn) {
  const previousLang = _locale;
  try {
    _locale = locale;
    return fn();
  } finally {
    _locale = previousLang;
  }
}
function setLocale(locale) {
  _locale = locale;
}
let _context;
const tryGetInvokeContext = () => {
  if (!_context) {
    const context = typeof document !== "undefined" && document && document.__q_context__;
    if (!context) {
      return void 0;
    }
    if (isArray(context)) {
      return document.__q_context__ = newInvokeContextFromTuple(context);
    }
    return context;
  }
  return _context;
};
const getInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx) {
    throw qError(QError_useMethodOutsideContext);
  }
  return ctx;
};
const useInvokeContext = () => {
  const ctx = tryGetInvokeContext();
  if (!ctx || ctx.$event$ !== RenderEvent) {
    throw qError(QError_useInvokeContext);
  }
  assertDefined(ctx.$hostElement$, `invoke: $hostElement$ must be defined`, ctx);
  assertDefined(ctx.$waitOn$, `invoke: $waitOn$ must be defined`, ctx);
  assertDefined(ctx.$renderCtx$, `invoke: $renderCtx$ must be defined`, ctx);
  assertDefined(ctx.$subscriber$, `invoke: $subscriber$ must be defined`, ctx);
  return ctx;
};
function invoke(context, fn, ...args) {
  const previousContext = _context;
  let returnValue;
  try {
    _context = context;
    returnValue = fn.apply(this, args);
  } finally {
    _context = previousContext;
  }
  return returnValue;
}
const waitAndRun = (ctx, callback) => {
  const waitOn = ctx.$waitOn$;
  if (waitOn.length === 0) {
    const result = callback();
    if (isPromise(result)) {
      waitOn.push(result);
    }
  } else {
    waitOn.push(Promise.all(waitOn).then(callback));
  }
};
const newInvokeContextFromTuple = (context) => {
  const element = context[0];
  const container = element.closest(QContainerSelector);
  const locale = (container == null ? void 0 : container.getAttribute(QLocaleAttr)) || void 0;
  locale && setLocale(locale);
  return newInvokeContext(locale, void 0, element, context[1], context[2]);
};
const newInvokeContext = (locale, hostElement, element, event, url) => {
  const ctx = {
    $seq$: 0,
    $hostElement$: hostElement,
    $element$: element,
    $event$: event,
    $url$: url,
    $locale$: locale,
    $qrl$: void 0,
    $renderCtx$: void 0,
    $subscriber$: void 0,
    $waitOn$: void 0
  };
  return ctx;
};
const getWrappingContainer = (el) => {
  return el.closest(QContainerSelector);
};
const untrack = (fn) => {
  return invoke(void 0, fn);
};
const trackInvocation = /* @__PURE__ */ newInvokeContext(void 0, void 0, void 0, RenderEvent);
const trackSignal = (signal, sub) => {
  trackInvocation.$subscriber$ = sub;
  return invoke(trackInvocation, () => signal.value);
};
const _jsxBranch = (input) => {
  const iCtx = tryGetInvokeContext();
  if (iCtx && iCtx.$hostElement$ && iCtx.$renderCtx$) {
    const hostElement = iCtx.$hostElement$;
    const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
    elCtx.$flags$ |= HOST_FLAG_DYNAMIC;
  }
  return input;
};
const useOn = (event, eventQrl2) => {
  _useOn(createEventName(event, void 0), eventQrl2);
};
const useOnDocument = (event, eventQrl2) => {
  _useOn(createEventName(event, "document"), eventQrl2);
};
const createEventName = (event, eventType) => {
  const formattedEventType = eventType !== void 0 ? eventType + ":" : "";
  const res = Array.isArray(event) ? event.map((e) => `${formattedEventType}on-${e}`) : `${formattedEventType}on-${event}`;
  return res;
};
const _useOn = (eventName, eventQrl2) => {
  if (eventQrl2) {
    const invokeCtx = useInvokeContext();
    const elCtx = getContext(invokeCtx.$hostElement$, invokeCtx.$renderCtx$.$static$.$containerState$);
    if (typeof eventName === "string") {
      elCtx.li.push([normalizeOnProp(eventName), eventQrl2]);
    } else {
      elCtx.li.push(...eventName.map((name) => [normalizeOnProp(name), eventQrl2]));
    }
    elCtx.$flags$ |= HOST_FLAG_NEED_ATTACH_LISTENER;
  }
};
const SkipRender = Symbol("skip render");
const SSRRaw = () => null;
const InternalSSRStream = () => null;
const useSequentialScope = () => {
  const iCtx = useInvokeContext();
  const i = iCtx.$seq$;
  const hostElement = iCtx.$hostElement$;
  const elCtx = getContext(hostElement, iCtx.$renderCtx$.$static$.$containerState$);
  const seq = elCtx.$seq$ ? elCtx.$seq$ : elCtx.$seq$ = [];
  iCtx.$seq$++;
  const set = (value) => {
    return seq[i] = value;
  };
  return {
    get: seq[i],
    set,
    i,
    iCtx,
    elCtx
  };
};
const setAttribute = (staticCtx, el, prop, value) => {
  staticCtx.$operations$.push({
    $operation$: _setAttribute,
    $args$: [el, prop, value]
  });
};
const _setAttribute = (el, prop, value) => {
  if (value == null || value === false) {
    el.removeAttribute(prop);
  } else {
    const str = value === true ? "" : String(value);
    directSetAttribute(el, prop, str);
  }
};
const setProperty = (staticCtx, node, key, value) => {
  staticCtx.$operations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
const setPropertyPost = (staticCtx, node, key, value) => {
  staticCtx.$postOperations$.push({
    $operation$: _setProperty,
    $args$: [node, key, value]
  });
};
const _setProperty = (node, key, value) => {
  try {
    node[key] = value == null ? "" : value;
    if (value == null && isNode$1(node) && isElement$1(node)) {
      node.removeAttribute(key);
    }
  } catch (err) {
    logError(codeToText(QError_setProperty), { node, key, value }, err);
  }
};
const createElement = (doc, expectTag, isSvg) => {
  const el = isSvg ? doc.createElementNS(SVG_NS, expectTag) : doc.createElement(expectTag);
  return el;
};
const insertBefore = (staticCtx, parent, newChild, refChild) => {
  staticCtx.$operations$.push({
    $operation$: directInsertBefore,
    $args$: [parent, newChild, refChild ? refChild : null]
  });
  return newChild;
};
const insertAfter = (staticCtx, parent, newChild, refChild) => {
  staticCtx.$operations$.push({
    $operation$: directInsertAfter,
    $args$: [parent, newChild, refChild ? refChild : null]
  });
  return newChild;
};
const appendChild = (staticCtx, parent, newChild) => {
  staticCtx.$operations$.push({
    $operation$: directAppendChild,
    $args$: [parent, newChild]
  });
  return newChild;
};
const appendHeadStyle = (staticCtx, styleTask) => {
  staticCtx.$containerState$.$styleIds$.add(styleTask.styleId);
  staticCtx.$postOperations$.push({
    $operation$: _appendHeadStyle,
    $args$: [staticCtx.$containerState$, styleTask]
  });
};
const _appendHeadStyle = (containerState, styleTask) => {
  const containerEl = containerState.$containerEl$;
  const doc = getDocument(containerEl);
  const isDoc = doc.documentElement === containerEl;
  const headEl = doc.head;
  const style = doc.createElement("style");
  directSetAttribute(style, QStyle, styleTask.styleId);
  directSetAttribute(style, "hidden", "");
  style.textContent = styleTask.content;
  if (isDoc && headEl) {
    directAppendChild(headEl, style);
  } else {
    directInsertBefore(containerEl, style, containerEl.firstChild);
  }
};
const prepend = (staticCtx, parent, newChild) => {
  staticCtx.$operations$.push({
    $operation$: directPrepend,
    $args$: [parent, newChild]
  });
};
const directPrepend = (parent, newChild) => {
  directInsertBefore(parent, newChild, parent.firstChild);
};
const removeNode = (staticCtx, el) => {
  if (isQwikElement(el)) {
    const subsManager = staticCtx.$containerState$.$subsManager$;
    cleanupTree(el, staticCtx, subsManager, true);
  }
  staticCtx.$operations$.push({
    $operation$: _removeNode,
    $args$: [el, staticCtx]
  });
};
const _removeNode = (el, staticCtx) => {
  const parent = el.parentElement;
  if (parent) {
    directRemoveChild(parent, el);
  }
};
const createTemplate = (doc, slotName) => {
  const template = createElement(doc, "q:template", false);
  directSetAttribute(template, QSlot, slotName);
  directSetAttribute(template, "hidden", "");
  directSetAttribute(template, "aria-hidden", "true");
  return template;
};
const executeDOMRender = (staticCtx) => {
  for (const op of staticCtx.$operations$) {
    op.$operation$.apply(void 0, op.$args$);
  }
  resolveSlotProjection(staticCtx);
};
const getKey = (el) => {
  return directGetAttribute(el, "q:key");
};
const setKey = (el, key) => {
  if (key !== null) {
    directSetAttribute(el, "q:key", key);
  }
};
const resolveSlotProjection = (staticCtx) => {
  const subsManager = staticCtx.$containerState$.$subsManager$;
  for (const slotEl of staticCtx.$rmSlots$) {
    const key = getKey(slotEl);
    const slotChildren = getChildren(slotEl, isChildComponent);
    if (slotChildren.length > 0) {
      const sref = slotEl.getAttribute(QSlotRef);
      const hostCtx = staticCtx.$roots$.find((r) => r.$id$ === sref);
      if (hostCtx) {
        const hostElm = hostCtx.$element$;
        if (hostElm.isConnected) {
          const hasTemplate = getChildren(hostElm, isSlotTemplate).some((node) => directGetAttribute(node, QSlot) === key);
          if (!hasTemplate) {
            const template = createTemplate(staticCtx.$doc$, key);
            for (const child of slotChildren) {
              directAppendChild(template, child);
            }
            directInsertBefore(hostElm, template, hostElm.firstChild);
          } else {
            cleanupTree(slotEl, staticCtx, subsManager, false);
          }
        } else {
          cleanupTree(slotEl, staticCtx, subsManager, false);
        }
      } else {
        cleanupTree(slotEl, staticCtx, subsManager, false);
      }
    }
  }
  for (const [slotEl, hostElm] of staticCtx.$addSlots$) {
    const key = getKey(slotEl);
    const template = getChildren(hostElm, isSlotTemplate).find((node) => {
      return node.getAttribute(QSlot) === key;
    });
    if (template) {
      getChildren(template, isChildComponent).forEach((child) => {
        directAppendChild(slotEl, child);
      });
      template.remove();
    }
  }
};
const printRenderStats = (staticCtx) => {
};
const VIRTUAL_SYMBOL = "__virtual";
const newVirtualElement = (doc, isSvg) => {
  const open = doc.createComment("qv ");
  const close = doc.createComment("/qv");
  return new VirtualElementImpl(open, close, isSvg);
};
const parseVirtualAttributes = (str) => {
  if (!str) {
    return {};
  }
  const attributes = str.split(" ");
  return Object.fromEntries(attributes.map((attr) => {
    const index2 = attr.indexOf("=");
    if (index2 >= 0) {
      return [attr.slice(0, index2), unescape(attr.slice(index2 + 1))];
    } else {
      return [attr, ""];
    }
  }));
};
const SHOW_COMMENT = 128;
const FILTER_ACCEPT = 1;
const FILTER_REJECT = 2;
const walkerVirtualByAttribute = (el, prop, value) => {
  return el.ownerDocument.createTreeWalker(el, SHOW_COMMENT, {
    acceptNode(c) {
      const virtual = getVirtualElement(c);
      if (virtual) {
        return directGetAttribute(virtual, prop) === value ? FILTER_ACCEPT : FILTER_REJECT;
      }
      return FILTER_REJECT;
    }
  });
};
const queryAllVirtualByAttribute = (el, prop, value) => {
  const walker = walkerVirtualByAttribute(el, prop, value);
  const pars = [];
  let currentNode = null;
  while (currentNode = walker.nextNode()) {
    pars.push(getVirtualElement(currentNode));
  }
  return pars;
};
const unescape = (s) => {
  return s.replace(/\+/g, " ");
};
const VIRTUAL = ":virtual";
class VirtualElementImpl {
  constructor(open, close, isSvg) {
    this.open = open;
    this.close = close;
    this.isSvg = isSvg;
    this._qc_ = null;
    this.nodeType = 111;
    this.localName = VIRTUAL;
    this.nodeName = VIRTUAL;
    const doc = this.ownerDocument = open.ownerDocument;
    this.$template$ = createElement(doc, "template", false);
    this.$attributes$ = parseVirtualAttributes(open.data.slice(3));
    assertTrue(open.data.startsWith("qv "));
    open[VIRTUAL_SYMBOL] = this;
  }
  insertBefore(node, ref) {
    const parent = this.parentElement;
    if (parent) {
      const ref2 = ref ? ref : this.close;
      parent.insertBefore(node, ref2);
    } else {
      this.$template$.insertBefore(node, ref);
    }
    return node;
  }
  remove() {
    const parent = this.parentElement;
    if (parent) {
      const ch = this.childNodes;
      assertEqual(this.$template$.childElementCount);
      parent.removeChild(this.open);
      this.$template$.append(...ch);
      parent.removeChild(this.close);
    }
  }
  appendChild(node) {
    return this.insertBefore(node, null);
  }
  insertBeforeTo(newParent, child) {
    const ch = this.childNodes;
    newParent.insertBefore(this.open, child);
    for (const c of ch) {
      newParent.insertBefore(c, child);
    }
    newParent.insertBefore(this.close, child);
    assertEqual(this.$template$.childElementCount);
  }
  appendTo(newParent) {
    this.insertBeforeTo(newParent, null);
  }
  get namespaceURI() {
    var _a2;
    return ((_a2 = this.parentElement) == null ? void 0 : _a2.namespaceURI) ?? "";
  }
  removeChild(child) {
    if (this.parentElement) {
      this.parentElement.removeChild(child);
    } else {
      this.$template$.removeChild(child);
    }
  }
  getAttribute(prop) {
    return this.$attributes$[prop] ?? null;
  }
  hasAttribute(prop) {
    return prop in this.$attributes$;
  }
  setAttribute(prop, value) {
    this.$attributes$[prop] = value;
  }
  removeAttribute(prop) {
    delete this.$attributes$[prop];
  }
  matches(_) {
    return false;
  }
  compareDocumentPosition(other) {
    return this.open.compareDocumentPosition(other);
  }
  closest(query) {
    const parent = this.parentElement;
    if (parent) {
      return parent.closest(query);
    }
    return null;
  }
  querySelectorAll(query) {
    const result = [];
    const ch = getChildren(this, isNodeElement);
    ch.forEach((el) => {
      if (isQwikElement(el)) {
        if (el.matches(query)) {
          result.push(el);
        }
        result.concat(Array.from(el.querySelectorAll(query)));
      }
    });
    return result;
  }
  querySelector(query) {
    for (const el of this.childNodes) {
      if (isElement$1(el)) {
        if (el.matches(query)) {
          return el;
        }
        const v = el.querySelector(query);
        if (v !== null) {
          return v;
        }
      }
    }
    return null;
  }
  get innerHTML() {
    return "";
  }
  set innerHTML(html) {
    const parent = this.parentElement;
    if (parent) {
      this.childNodes.forEach((a) => this.removeChild(a));
      this.$template$.innerHTML = html;
      parent.insertBefore(this.$template$.content, this.close);
    } else {
      this.$template$.innerHTML = html;
    }
  }
  get firstChild() {
    if (this.parentElement) {
      const first = this.open.nextSibling;
      if (first === this.close) {
        return null;
      }
      return first;
    } else {
      return this.$template$.firstChild;
    }
  }
  get nextSibling() {
    return this.close.nextSibling;
  }
  get previousSibling() {
    return this.open.previousSibling;
  }
  get childNodes() {
    if (!this.parentElement) {
      return Array.from(this.$template$.childNodes);
    }
    const nodes = [];
    let node = this.open;
    while (node = node.nextSibling) {
      if (node !== this.close) {
        nodes.push(node);
      } else {
        break;
      }
    }
    return nodes;
  }
  get isConnected() {
    return this.open.isConnected;
  }
  get parentElement() {
    return this.open.parentElement;
  }
}
const processVirtualNodes = (node) => {
  if (node == null) {
    return null;
  }
  if (isComment(node)) {
    const virtual = getVirtualElement(node);
    if (virtual) {
      return virtual;
    }
  }
  return node;
};
const getVirtualElement = (open) => {
  var _a2;
  const virtual = open[VIRTUAL_SYMBOL];
  if (virtual) {
    return virtual;
  }
  if (open.data.startsWith("qv ")) {
    const close = findClose(open);
    return new VirtualElementImpl(open, close, ((_a2 = open.parentElement) == null ? void 0 : _a2.namespaceURI) === SVG_NS);
  }
  return null;
};
const findClose = (open) => {
  let node = open.nextSibling;
  let stack = 1;
  while (node) {
    if (isComment(node)) {
      if (node.data.startsWith("qv ")) {
        stack++;
      } else if (node.data === "/qv") {
        stack--;
        if (stack === 0) {
          return node;
        }
      }
    }
    node = node.nextSibling;
  }
};
const getRootNode = (node) => {
  if (node == null) {
    return null;
  }
  if (isVirtualElement(node)) {
    return node.open;
  } else {
    return node;
  }
};
const createContextId = (name) => {
  return /* @__PURE__ */ Object.freeze({
    id: fromCamelToKebabCase(name)
  });
};
const useContextProvider = (context, newValue) => {
  const { get, set, elCtx } = useSequentialScope();
  if (get !== void 0) {
    return;
  }
  let contexts = elCtx.$contexts$;
  if (!contexts) {
    elCtx.$contexts$ = contexts = /* @__PURE__ */ new Map();
  }
  contexts.set(context.id, newValue);
  set(true);
};
const useContext = (context, defaultValue) => {
  const { get, set, iCtx, elCtx } = useSequentialScope();
  if (get !== void 0) {
    return get;
  }
  const value = resolveContext(context, elCtx, iCtx.$renderCtx$.$static$.$containerState$);
  if (typeof defaultValue === "function") {
    return set(invoke(void 0, defaultValue, value));
  }
  if (value !== void 0) {
    return set(value);
  }
  if (defaultValue !== void 0) {
    return set(defaultValue);
  }
  throw qError(QError_notFoundContext, context.id);
};
const resolveContext = (context, hostCtx, containerState) => {
  const contextID = context.id;
  if (hostCtx) {
    let hostElement = hostCtx.$element$;
    let ctx = hostCtx.$slotParent$ ?? hostCtx.$parent$;
    while (ctx) {
      hostElement = ctx.$element$;
      if (ctx.$contexts$) {
        const found = ctx.$contexts$.get(contextID);
        if (found) {
          return found;
        }
        if (ctx.$contexts$.get("_") === true) {
          break;
        }
      }
      ctx = ctx.$slotParent$ ?? ctx.$parent$;
    }
    if (hostElement.closest) {
      const value = queryContextFromDom(hostElement, containerState, contextID);
      if (value !== void 0) {
        return value;
      }
    }
  }
  return void 0;
};
const queryContextFromDom = (hostElement, containerState, contextId) => {
  var _a2;
  let element = hostElement;
  while (element) {
    let node = element;
    let virtual;
    while (node && (virtual = findVirtual(node))) {
      const contexts = (_a2 = getContext(virtual, containerState)) == null ? void 0 : _a2.$contexts$;
      if (contexts) {
        if (contexts.has(contextId)) {
          return contexts.get(contextId);
        }
      }
      node = virtual;
    }
    element = element.parentElement;
  }
  return void 0;
};
const findVirtual = (el) => {
  let node = el;
  let stack = 1;
  while (node = node.previousSibling) {
    if (isComment(node)) {
      if (node.data === "/qv") {
        stack++;
      } else if (node.data.startsWith("qv ")) {
        stack--;
        if (stack === 0) {
          return getVirtualElement(node);
        }
      }
    }
  }
  return null;
};
const ERROR_CONTEXT = /* @__PURE__ */ createContextId("qk-error");
const handleError = (err, hostElement, rCtx) => {
  const elCtx = tryGetContext(hostElement);
  if (isServerPlatform()) {
    throw err;
  } else {
    const errorStore = resolveContext(ERROR_CONTEXT, elCtx, rCtx.$static$.$containerState$);
    if (errorStore === void 0) {
      throw err;
    }
    errorStore.error = err;
  }
};
const executeComponent = (rCtx, elCtx) => {
  elCtx.$flags$ &= ~HOST_FLAG_DIRTY;
  elCtx.$flags$ |= HOST_FLAG_MOUNTED;
  elCtx.$slots$ = [];
  elCtx.li.length = 0;
  const hostElement = elCtx.$element$;
  const componentQRL = elCtx.$componentQrl$;
  const props = elCtx.$props$;
  const newCtx = pushRenderContext(rCtx);
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, RenderEvent);
  const waitOn = iCtx.$waitOn$ = [];
  newCtx.$cmpCtx$ = elCtx;
  newCtx.$slotCtx$ = null;
  iCtx.$subscriber$ = [0, hostElement];
  iCtx.$renderCtx$ = rCtx;
  componentQRL.$setContainer$(rCtx.$static$.$containerState$.$containerEl$);
  const componentFn = componentQRL.getFn(iCtx);
  return safeCall(() => componentFn(props), (jsxNode) => {
    if (waitOn.length > 0) {
      return Promise.all(waitOn).then(() => {
        if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
          return executeComponent(rCtx, elCtx);
        }
        return {
          node: jsxNode,
          rCtx: newCtx
        };
      });
    }
    if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
      return executeComponent(rCtx, elCtx);
    }
    return {
      node: jsxNode,
      rCtx: newCtx
    };
  }, (err) => {
    if (err === SignalUnassignedException) {
      return Promise.all(waitOn).then(() => {
        return executeComponent(rCtx, elCtx);
      });
    }
    handleError(err, hostElement, rCtx);
    return {
      node: SkipRender,
      rCtx: newCtx
    };
  });
};
const createRenderContext = (doc, containerState) => {
  const ctx = {
    $static$: {
      $doc$: doc,
      $locale$: containerState.$serverData$.locale,
      $containerState$: containerState,
      $hostElements$: /* @__PURE__ */ new Set(),
      $operations$: [],
      $postOperations$: [],
      $roots$: [],
      $addSlots$: [],
      $rmSlots$: [],
      $visited$: []
    },
    $cmpCtx$: null,
    $slotCtx$: null
  };
  seal(ctx.$static$);
  return ctx;
};
const pushRenderContext = (ctx) => {
  const newCtx = {
    $static$: ctx.$static$,
    $cmpCtx$: ctx.$cmpCtx$,
    $slotCtx$: ctx.$slotCtx$
  };
  return newCtx;
};
const serializeClassWithHost = (obj, hostCtx) => {
  if (hostCtx && hostCtx.$scopeIds$) {
    return hostCtx.$scopeIds$.join(" ") + " " + serializeClass(obj);
  }
  return serializeClass(obj);
};
const serializeClass = (obj) => {
  if (!obj) {
    return "";
  }
  if (isString(obj)) {
    return obj.trim();
  }
  if (isArray(obj)) {
    return obj.reduce((result, o) => {
      const classList = serializeClass(o);
      return classList ? result ? `${result} ${classList}` : classList : result;
    }, "");
  }
  return Object.entries(obj).reduce((result, [key, value]) => value ? result ? `${result} ${key.trim()}` : key.trim() : result, "");
};
const stringifyStyle = (obj) => {
  if (obj == null) {
    return "";
  }
  if (typeof obj == "object") {
    if (isArray(obj)) {
      throw qError(QError_stringifyClassOrStyle, obj, "style");
    } else {
      const chunks = [];
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (value != null) {
            const normalizedKey = key.startsWith("--") ? key : fromCamelToKebabCase(key);
            chunks.push(normalizedKey + ":" + value);
          }
        }
      }
      return chunks.join(";");
    }
  }
  return String(obj);
};
const getNextIndex = (ctx) => {
  return intToStr(ctx.$static$.$containerState$.$elementIndex$++);
};
const setQId = (rCtx, elCtx) => {
  const id = getNextIndex(rCtx);
  elCtx.$id$ = id;
};
const jsxToString = (data) => {
  if (isSignal(data)) {
    return jsxToString(data.value);
  }
  return data == null || typeof data === "boolean" ? "" : String(data);
};
function isAriaAttribute(prop) {
  return prop.startsWith("aria-");
}
const shouldWrapFunctional = (res, node) => {
  if (node.key) {
    return !isJSXNode(res) || !isFunction(res.type) && res.key != node.key;
  }
  return false;
};
const static_listeners = 1 << 0;
const static_subtree = 1 << 1;
const dangerouslySetInnerHTML = "dangerouslySetInnerHTML";
const version = "1.2.6";
const hashCode = (text, hash = 0) => {
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Number(Math.abs(hash)).toString(36);
};
const styleKey = (qStyles, index2) => {
  return `${hashCode(qStyles.$hash$)}-${index2}`;
};
const styleContent = (styleId) => {
  return ComponentStylesPrefixContent + styleId;
};
const serializeSStyle = (scopeIds) => {
  const value = scopeIds.join("|");
  if (value.length > 0) {
    return value;
  }
  return void 0;
};
var _a;
const FLUSH_COMMENT = "<!--qkssr-f-->";
const IS_HEAD$1 = 1 << 0;
const IS_HTML = 1 << 2;
const IS_TEXT = 1 << 3;
const IS_INVISIBLE = 1 << 4;
const IS_IMMUTABLE$1 = 1 << 10;
class MockElement {
  constructor(nodeType) {
    this.nodeType = nodeType;
    this[_a] = null;
  }
}
_a = Q_CTX;
const createDocument = () => {
  return new MockElement(9);
};
const _renderSSR = async (node, opts) => {
  var _a2, _b, _c;
  const root = opts.containerTagName;
  const containerEl = createSSRContext(1).$element$;
  const containerState = createContainerState(containerEl, opts.base ?? "/");
  containerState.$serverData$.locale = (_a2 = opts.serverData) == null ? void 0 : _a2.locale;
  const doc = createDocument();
  const rCtx = createRenderContext(doc, containerState);
  const headNodes = opts.beforeContent ?? [];
  const ssrCtx = {
    $static$: {
      $contexts$: [],
      $headNodes$: root === "html" ? headNodes : [],
      $locale$: (_b = opts.serverData) == null ? void 0 : _b.locale,
      $textNodes$: /* @__PURE__ */ new Map()
    },
    $projectedChildren$: void 0,
    $projectedCtxs$: void 0,
    $invocationContext$: void 0
  };
  let qRender = "ssr";
  if (opts.containerAttributes["q:render"]) {
    qRender = `${opts.containerAttributes["q:render"]}-${qRender}`;
  }
  const containerAttributes = {
    ...opts.containerAttributes,
    "q:container": "paused",
    "q:version": version,
    "q:render": qRender,
    "q:base": opts.base,
    "q:locale": (_c = opts.serverData) == null ? void 0 : _c.locale,
    "q:manifest-hash": opts.manifestHash
  };
  const children = root === "html" ? [node] : [headNodes, node];
  if (root !== "html") {
    containerAttributes.class = "qc📦" + (containerAttributes.class ? " " + containerAttributes.class : "");
  }
  if (opts.serverData) {
    containerState.$serverData$ = opts.serverData;
  }
  node = _jsxQ(root, null, containerAttributes, children, 3, null);
  containerState.$hostsRendering$ = /* @__PURE__ */ new Set();
  await Promise.resolve().then(() => renderRoot$1(node, rCtx, ssrCtx, opts.stream, containerState, opts));
};
const renderRoot$1 = async (node, rCtx, ssrCtx, stream, containerState, opts) => {
  const beforeClose = opts.beforeClose;
  await renderNode(node, rCtx, ssrCtx, stream, 0, beforeClose ? (stream2) => {
    const result = beforeClose(ssrCtx.$static$.$contexts$, containerState, false, ssrCtx.$static$.$textNodes$);
    return processData$1(result, rCtx, ssrCtx, stream2, 0, void 0);
  } : void 0);
  return rCtx;
};
const renderGenerator = async (node, rCtx, ssrCtx, stream, flags) => {
  stream.write(FLUSH_COMMENT);
  const generator = node.props.children;
  let value;
  if (isFunction(generator)) {
    const v = generator({
      write(chunk) {
        stream.write(chunk);
        stream.write(FLUSH_COMMENT);
      }
    });
    if (isPromise(v)) {
      return v;
    }
    value = v;
  } else {
    value = generator;
  }
  for await (const chunk of value) {
    await processData$1(chunk, rCtx, ssrCtx, stream, flags, void 0);
    stream.write(FLUSH_COMMENT);
  }
};
const renderNodeVirtual = (node, elCtx, extraNodes, rCtx, ssrCtx, stream, flags, beforeClose) => {
  var _a2;
  const props = node.props;
  const renderQrl = props[OnRenderProp];
  if (renderQrl) {
    elCtx.$componentQrl$ = renderQrl;
    return renderSSRComponent(rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose);
  }
  let virtualComment = "<!--qv" + renderVirtualAttributes(props);
  const isSlot = QSlotS in props;
  const key = node.key != null ? String(node.key) : null;
  if (isSlot) {
    assertDefined((_a2 = rCtx.$cmpCtx$) == null ? void 0 : _a2.$id$);
    virtualComment += " q:sref=" + rCtx.$cmpCtx$.$id$;
  }
  if (key != null) {
    virtualComment += " q:key=" + key;
  }
  virtualComment += "-->";
  stream.write(virtualComment);
  const html = node.props[dangerouslySetInnerHTML];
  if (html) {
    stream.write(html);
    stream.write(CLOSE_VIRTUAL);
    return;
  }
  if (extraNodes) {
    for (const node2 of extraNodes) {
      renderNodeElementSync(node2.type, node2.props, stream);
    }
  }
  const promise = walkChildren(node.children, rCtx, ssrCtx, stream, flags);
  return then(promise, () => {
    var _a3;
    if (!isSlot && !beforeClose) {
      stream.write(CLOSE_VIRTUAL);
      return;
    }
    let promise2;
    if (isSlot) {
      const content = (_a3 = ssrCtx.$projectedChildren$) == null ? void 0 : _a3[key];
      if (content) {
        const [rCtx2, sCtx] = ssrCtx.$projectedCtxs$;
        const newSlotRctx = pushRenderContext(rCtx2);
        newSlotRctx.$slotCtx$ = elCtx;
        ssrCtx.$projectedChildren$[key] = void 0;
        promise2 = processData$1(content, newSlotRctx, sCtx, stream, flags);
      }
    }
    if (beforeClose) {
      promise2 = then(promise2, () => beforeClose(stream));
    }
    return then(promise2, () => {
      stream.write(CLOSE_VIRTUAL);
    });
  });
};
const CLOSE_VIRTUAL = `<!--/qv-->`;
const renderAttributes = (attributes) => {
  let text = "";
  for (const prop in attributes) {
    if (prop === dangerouslySetInnerHTML) {
      continue;
    }
    const value = attributes[prop];
    if (value != null) {
      text += " " + (value === "" ? prop : prop + '="' + value + '"');
    }
  }
  return text;
};
const renderVirtualAttributes = (attributes) => {
  let text = "";
  for (const prop in attributes) {
    if (prop === "children" || prop === dangerouslySetInnerHTML) {
      continue;
    }
    const value = attributes[prop];
    if (value != null) {
      text += " " + (value === "" ? prop : prop + "=" + value);
    }
  }
  return text;
};
const renderNodeElementSync = (tagName, attributes, stream) => {
  stream.write("<" + tagName + renderAttributes(attributes) + ">");
  const empty = !!emptyElements[tagName];
  if (empty) {
    return;
  }
  const innerHTML = attributes[dangerouslySetInnerHTML];
  if (innerHTML != null) {
    stream.write(innerHTML);
  }
  stream.write(`</${tagName}>`);
};
const renderSSRComponent = (rCtx, ssrCtx, stream, elCtx, node, flags, beforeClose) => {
  const props = node.props;
  setComponentProps$1(rCtx, elCtx, props.props);
  return then(executeComponent(rCtx, elCtx), (res) => {
    const hostElement = elCtx.$element$;
    const newRCtx = res.rCtx;
    const iCtx = newInvokeContext(ssrCtx.$static$.$locale$, hostElement, void 0);
    iCtx.$subscriber$ = [0, hostElement];
    iCtx.$renderCtx$ = newRCtx;
    const newSSrContext = {
      $static$: ssrCtx.$static$,
      $projectedChildren$: splitProjectedChildren(node.children, ssrCtx),
      $projectedCtxs$: [rCtx, ssrCtx],
      $invocationContext$: iCtx
    };
    const extraNodes = [];
    if (elCtx.$appendStyles$) {
      const isHTML = !!(flags & IS_HTML);
      const array = isHTML ? ssrCtx.$static$.$headNodes$ : extraNodes;
      for (const style of elCtx.$appendStyles$) {
        array.push(_jsxQ("style", {
          [QStyle]: style.styleId,
          [dangerouslySetInnerHTML]: style.content,
          hidden: ""
        }, null, null, 0, null));
      }
    }
    const newID = getNextIndex(rCtx);
    const scopeId = elCtx.$scopeIds$ ? serializeSStyle(elCtx.$scopeIds$) : void 0;
    const processedNode = _jsxC(node.type, {
      [QScopedStyle]: scopeId,
      [ELEMENT_ID]: newID,
      children: res.node
    }, 0, node.key);
    elCtx.$id$ = newID;
    ssrCtx.$static$.$contexts$.push(elCtx);
    return renderNodeVirtual(processedNode, elCtx, extraNodes, newRCtx, newSSrContext, stream, flags, (stream2) => {
      if (elCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
        const placeholderCtx = createSSRContext(1);
        const listeners = placeholderCtx.li;
        listeners.push(...elCtx.li);
        elCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER;
        placeholderCtx.$id$ = getNextIndex(rCtx);
        const attributes = {
          type: "placeholder",
          hidden: "",
          "q:id": placeholderCtx.$id$
        };
        ssrCtx.$static$.$contexts$.push(placeholderCtx);
        const groups = groupListeners(listeners);
        for (const listener of groups) {
          const eventName = normalizeInvisibleEvents(listener[0]);
          attributes[eventName] = serializeQRLs(listener[1], placeholderCtx);
          registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
        }
        renderNodeElementSync("script", attributes, stream2);
      }
      if (beforeClose) {
        return then(renderQTemplates(rCtx, newSSrContext, ssrCtx, stream2), () => beforeClose(stream2));
      } else {
        return renderQTemplates(rCtx, newSSrContext, ssrCtx, stream2);
      }
    });
  });
};
const renderQTemplates = (rCtx, ssrCtx, parentSSRCtx, stream) => {
  const projectedChildren = ssrCtx.$projectedChildren$;
  if (projectedChildren) {
    const nodes = Object.keys(projectedChildren).map((slotName) => {
      const value = projectedChildren[slotName];
      if (value) {
        return _jsxQ("q:template", {
          [QSlot]: slotName,
          hidden: "",
          "aria-hidden": "true"
        }, null, value, 0, null);
      }
    });
    return processData$1(nodes, rCtx, parentSSRCtx, stream, 0, void 0);
  }
};
const splitProjectedChildren = (children, ssrCtx) => {
  const flatChildren = flatVirtualChildren(children, ssrCtx);
  if (flatChildren === null) {
    return void 0;
  }
  const slotMap = {};
  for (const child of flatChildren) {
    let slotName = "";
    if (isJSXNode(child)) {
      slotName = child.props[QSlot] ?? "";
    }
    let array = slotMap[slotName];
    if (!array) {
      slotMap[slotName] = array = [];
    }
    array.push(child);
  }
  return slotMap;
};
const createSSRContext = (nodeType) => {
  const elm = new MockElement(nodeType);
  return createContext(elm);
};
const renderNode = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
  var _a2;
  const tagName = node.type;
  const hostCtx = rCtx.$cmpCtx$;
  if (typeof tagName === "string") {
    const key = node.key;
    const props = node.props;
    const immutable = node.immutableProps;
    const elCtx = createSSRContext(1);
    const elm = elCtx.$element$;
    const isHead = tagName === "head";
    let openingElement = "<" + tagName;
    let useSignal2 = false;
    let hasRef = false;
    let classStr = "";
    let htmlStr = null;
    if (immutable) {
      for (const prop in immutable) {
        let value = immutable[prop];
        if (isOnProp(prop)) {
          setEvent(elCtx.li, prop, value, void 0);
          continue;
        }
        const attrName = processPropKey(prop);
        if (isSignal(value)) {
          value = trackSignal(value, [1, elm, value, hostCtx.$element$, attrName]);
          useSignal2 = true;
        }
        if (prop === dangerouslySetInnerHTML) {
          htmlStr = value;
          continue;
        }
        if (prop.startsWith(PREVENT_DEFAULT)) {
          registerQwikEvent$1(prop.slice(PREVENT_DEFAULT.length), rCtx.$static$.$containerState$);
        }
        const attrValue = processPropValue(attrName, value);
        if (attrValue != null) {
          if (attrName === "class") {
            classStr = attrValue;
          } else if (attrName === "value" && tagName === "textarea") {
            htmlStr = escapeHtml(attrValue);
          } else if (isSSRUnsafeAttr(attrName))
            ;
          else {
            openingElement += " " + (value === "" ? attrName : attrName + '="' + escapeAttr(attrValue) + '"');
          }
        }
      }
    }
    for (const prop in props) {
      let value = props[prop];
      if (prop === "ref") {
        if (value !== void 0) {
          setRef(value, elm);
          hasRef = true;
        }
        continue;
      }
      if (isOnProp(prop)) {
        setEvent(elCtx.li, prop, value, void 0);
        continue;
      }
      const attrName = processPropKey(prop);
      if (isSignal(value)) {
        value = trackSignal(value, [2, hostCtx.$element$, value, elm, attrName]);
        useSignal2 = true;
      }
      if (prop === dangerouslySetInnerHTML) {
        htmlStr = value;
        continue;
      }
      if (prop.startsWith(PREVENT_DEFAULT)) {
        registerQwikEvent$1(prop.slice(PREVENT_DEFAULT.length), rCtx.$static$.$containerState$);
      }
      const attrValue = processPropValue(attrName, value);
      if (attrValue != null) {
        if (attrName === "class") {
          classStr = attrValue;
        } else if (attrName === "value" && tagName === "textarea") {
          htmlStr = escapeHtml(attrValue);
        } else if (isSSRUnsafeAttr(attrName))
          ;
        else {
          openingElement += " " + (value === "" ? attrName : attrName + '="' + escapeAttr(attrValue) + '"');
        }
      }
    }
    const listeners = elCtx.li;
    if (hostCtx) {
      if ((_a2 = hostCtx.$scopeIds$) == null ? void 0 : _a2.length) {
        const extra = hostCtx.$scopeIds$.join(" ");
        classStr = classStr ? `${extra} ${classStr}` : extra;
      }
      if (hostCtx.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
        listeners.push(...hostCtx.li);
        hostCtx.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER;
      }
    }
    if (isHead) {
      flags |= IS_HEAD$1;
    }
    if (tagName in invisibleElements) {
      flags |= IS_INVISIBLE;
    }
    if (tagName in textOnlyElements) {
      flags |= IS_TEXT;
    }
    if (classStr) {
      openingElement += ' class="' + escapeAttr(classStr) + '"';
    }
    if (listeners.length > 0) {
      const groups = groupListeners(listeners);
      const isInvisible = (flags & IS_INVISIBLE) !== 0;
      for (const listener of groups) {
        const eventName = isInvisible ? normalizeInvisibleEvents(listener[0]) : listener[0];
        openingElement += " " + eventName + '="' + serializeQRLs(listener[1], elCtx) + '"';
        registerQwikEvent$1(eventName, rCtx.$static$.$containerState$);
      }
    }
    if (key != null) {
      openingElement += ' q:key="' + escapeAttr(key) + '"';
    }
    if (hasRef || useSignal2 || listeners.length > 0) {
      if (hasRef || useSignal2 || listenersNeedId(listeners)) {
        const newID = getNextIndex(rCtx);
        openingElement += ' q:id="' + newID + '"';
        elCtx.$id$ = newID;
      }
      ssrCtx.$static$.$contexts$.push(elCtx);
    }
    if (flags & IS_HEAD$1) {
      openingElement += " q:head";
    }
    openingElement += ">";
    stream.write(openingElement);
    if (tagName in emptyElements) {
      return;
    }
    if (htmlStr != null) {
      stream.write(String(htmlStr));
      stream.write(`</${tagName}>`);
      return;
    }
    if (tagName === "html") {
      flags |= IS_HTML;
    } else {
      flags &= ~IS_HTML;
    }
    if (node.flags & static_subtree) {
      flags |= IS_IMMUTABLE$1;
    }
    const promise = processData$1(node.children, rCtx, ssrCtx, stream, flags);
    return then(promise, () => {
      if (isHead) {
        for (const node2 of ssrCtx.$static$.$headNodes$) {
          renderNodeElementSync(node2.type, node2.props, stream);
        }
        ssrCtx.$static$.$headNodes$.length = 0;
      }
      if (!beforeClose) {
        stream.write(`</${tagName}>`);
        return;
      }
      return then(beforeClose(stream), () => {
        stream.write(`</${tagName}>`);
      });
    });
  }
  if (tagName === Virtual) {
    const elCtx = createSSRContext(111);
    elCtx.$parent$ = rCtx.$cmpCtx$;
    elCtx.$slotParent$ = rCtx.$slotCtx$;
    if (hostCtx && hostCtx.$flags$ & HOST_FLAG_DYNAMIC) {
      addDynamicSlot(hostCtx, elCtx);
    }
    return renderNodeVirtual(node, elCtx, void 0, rCtx, ssrCtx, stream, flags, beforeClose);
  }
  if (tagName === SSRRaw) {
    stream.write(node.props.data);
    return;
  }
  if (tagName === InternalSSRStream) {
    return renderGenerator(node, rCtx, ssrCtx, stream, flags);
  }
  const res = invoke(ssrCtx.$invocationContext$, tagName, node.props, node.key, node.flags, node.dev);
  if (!shouldWrapFunctional(res, node)) {
    return processData$1(res, rCtx, ssrCtx, stream, flags, beforeClose);
  }
  return renderNode(_jsxC(Virtual, { children: res }, 0, node.key), rCtx, ssrCtx, stream, flags, beforeClose);
};
const processData$1 = (node, rCtx, ssrCtx, stream, flags, beforeClose) => {
  var _a2;
  if (node == null || typeof node === "boolean") {
    return;
  }
  if (isString(node) || typeof node === "number") {
    stream.write(escapeHtml(String(node)));
  } else if (isJSXNode(node)) {
    return renderNode(node, rCtx, ssrCtx, stream, flags, beforeClose);
  } else if (isArray(node)) {
    return walkChildren(node, rCtx, ssrCtx, stream, flags);
  } else if (isSignal(node)) {
    const insideText = flags & IS_TEXT;
    const hostEl = (_a2 = rCtx.$cmpCtx$) == null ? void 0 : _a2.$element$;
    let value;
    if (hostEl) {
      if (!insideText) {
        const id = getNextIndex(rCtx);
        const subs = flags & IS_IMMUTABLE$1 ? [3, "#" + id, node, "#" + id] : [4, hostEl, node, "#" + id];
        value = trackSignal(node, subs);
        const str = jsxToString(value);
        ssrCtx.$static$.$textNodes$.set(str, id);
        stream.write(`<!--t=${id}-->${escapeHtml(str)}<!---->`);
        return;
      } else {
        value = invoke(ssrCtx.$invocationContext$, () => node.value);
      }
    }
    stream.write(escapeHtml(jsxToString(value)));
    return;
  } else if (isPromise(node)) {
    stream.write(FLUSH_COMMENT);
    return node.then((node2) => processData$1(node2, rCtx, ssrCtx, stream, flags, beforeClose));
  } else {
    return;
  }
};
const walkChildren = (children, rCtx, ssrContext, stream, flags) => {
  if (children == null) {
    return;
  }
  if (!isArray(children)) {
    return processData$1(children, rCtx, ssrContext, stream, flags);
  }
  const len = children.length;
  if (len === 1) {
    return processData$1(children[0], rCtx, ssrContext, stream, flags);
  }
  if (len === 0) {
    return;
  }
  let currentIndex = 0;
  const buffers = [];
  return children.reduce((prevPromise, child, index2) => {
    const buffer = [];
    buffers.push(buffer);
    const localStream = prevPromise ? {
      write(chunk) {
        if (currentIndex === index2) {
          stream.write(chunk);
        } else {
          buffer.push(chunk);
        }
      }
    } : stream;
    const rendered = processData$1(child, rCtx, ssrContext, localStream, flags);
    const next = () => {
      currentIndex++;
      if (buffers.length > currentIndex) {
        buffers[currentIndex].forEach((chunk) => stream.write(chunk));
      }
    };
    if (isPromise(rendered) && prevPromise) {
      return Promise.all([rendered, prevPromise]).then(next);
    } else if (isPromise(rendered)) {
      return rendered.then(next);
    } else if (prevPromise) {
      return prevPromise.then(next);
    } else {
      currentIndex++;
      return void 0;
    }
  }, void 0);
};
const flatVirtualChildren = (children, ssrCtx) => {
  if (children == null) {
    return null;
  }
  const result = _flatVirtualChildren(children, ssrCtx);
  const nodes = isArray(result) ? result : [result];
  if (nodes.length === 0) {
    return null;
  }
  return nodes;
};
const _flatVirtualChildren = (children, ssrCtx) => {
  if (children == null) {
    return null;
  }
  if (isArray(children)) {
    return children.flatMap((c) => _flatVirtualChildren(c, ssrCtx));
  } else if (isJSXNode(children) && isFunction(children.type) && children.type !== SSRRaw && children.type !== InternalSSRStream && children.type !== Virtual) {
    const res = invoke(ssrCtx.$invocationContext$, children.type, children.props, children.key, children.flags);
    return flatVirtualChildren(res, ssrCtx);
  }
  return children;
};
const setComponentProps$1 = (rCtx, elCtx, expectProps) => {
  const keys = Object.keys(expectProps);
  const target = createPropsState();
  elCtx.$props$ = createProxy(target, rCtx.$static$.$containerState$);
  if (keys.length === 0) {
    return;
  }
  const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
  for (const prop of keys) {
    if (prop === "children" || prop === QSlot) {
      continue;
    }
    if (isSignal(immutableMeta[prop])) {
      target[_IMMUTABLE_PREFIX + prop] = immutableMeta[prop];
    } else {
      target[prop] = expectProps[prop];
    }
  }
};
const processPropKey = (prop) => {
  if (prop === "htmlFor") {
    return "for";
  }
  return prop;
};
const processPropValue = (prop, value) => {
  if (prop === "class") {
    return serializeClass(value);
  }
  if (prop === "style") {
    return stringifyStyle(value);
  }
  if (isAriaAttribute(prop) || prop === "draggable" || prop === "spellcheck") {
    return value != null ? String(value) : value;
  }
  if (value === false || value == null) {
    return null;
  }
  if (value === true) {
    return "";
  }
  return String(value);
};
const invisibleElements = {
  head: true,
  style: true,
  script: true,
  link: true,
  meta: true
};
const textOnlyElements = {
  title: true,
  style: true,
  script: true,
  noframes: true,
  textarea: true
};
const emptyElements = {
  area: true,
  base: true,
  basefont: true,
  bgsound: true,
  br: true,
  col: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};
const ESCAPE_HTML = /[&<>]/g;
const ESCAPE_ATTRIBUTES = /[&"]/g;
const registerQwikEvent$1 = (prop, containerState) => {
  containerState.$events$.add(getEventName(prop));
};
const escapeHtml = (s) => {
  return s.replace(ESCAPE_HTML, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      default:
        return "";
    }
  });
};
const escapeAttr = (s) => {
  return s.replace(ESCAPE_ATTRIBUTES, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
      default:
        return "";
    }
  });
};
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const isSSRUnsafeAttr = (name) => {
  return unsafeAttrCharRE.test(name);
};
const listenersNeedId = (listeners) => {
  return listeners.some((l) => l[1].$captureRef$ && l[1].$captureRef$.length > 0);
};
const addDynamicSlot = (hostCtx, elCtx) => {
  let dynamicSlots = hostCtx.$dynamicSlots$;
  if (!dynamicSlots) {
    hostCtx.$dynamicSlots$ = dynamicSlots = [];
  }
  if (!dynamicSlots.includes(elCtx)) {
    dynamicSlots.push(elCtx);
  }
};
const normalizeInvisibleEvents = (eventName) => {
  return eventName === "on:qvisible" ? "on-document:qinit" : eventName;
};
const emitEvent$1 = (el, eventName, detail, bubbles) => {
  if (!qTest && typeof CustomEvent === "function") {
    if (el) {
      el.dispatchEvent(new CustomEvent(eventName, {
        detail,
        bubbles,
        composed: bubbles
      }));
    }
  }
};
const renderComponent = (rCtx, elCtx, flags) => {
  const justMounted = !(elCtx.$flags$ & HOST_FLAG_MOUNTED);
  const hostElement = elCtx.$element$;
  const containerState = rCtx.$static$.$containerState$;
  containerState.$hostsStaging$.delete(elCtx);
  containerState.$subsManager$.$clearSub$(hostElement);
  return then(executeComponent(rCtx, elCtx), (res) => {
    const staticCtx = rCtx.$static$;
    const newCtx = res.rCtx;
    const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement);
    staticCtx.$hostElements$.add(hostElement);
    iCtx.$subscriber$ = [0, hostElement];
    iCtx.$renderCtx$ = newCtx;
    if (justMounted) {
      if (elCtx.$appendStyles$) {
        for (const style of elCtx.$appendStyles$) {
          appendHeadStyle(staticCtx, style);
        }
      }
    }
    const processedJSXNode = processData(res.node, iCtx);
    return then(processedJSXNode, (processedJSXNode2) => {
      const newVdom = wrapJSX(hostElement, processedJSXNode2);
      const oldVdom = getVdom(elCtx);
      return then(smartUpdateChildren(newCtx, oldVdom, newVdom, flags), () => {
        elCtx.$vdom$ = newVdom;
      });
    });
  });
};
const getVdom = (elCtx) => {
  if (!elCtx.$vdom$) {
    elCtx.$vdom$ = domToVnode(elCtx.$element$);
  }
  return elCtx.$vdom$;
};
class ProcessedJSXNodeImpl {
  constructor($type$, $props$, $immutableProps$, $children$, $flags$, $key$) {
    this.$type$ = $type$;
    this.$props$ = $props$;
    this.$immutableProps$ = $immutableProps$;
    this.$children$ = $children$;
    this.$flags$ = $flags$;
    this.$key$ = $key$;
    this.$elm$ = null;
    this.$text$ = "";
    this.$signal$ = null;
    this.$id$ = $type$ + ($key$ ? ":" + $key$ : "");
  }
}
const processNode = (node, invocationContext) => {
  const { key, type, props, children, flags, immutableProps } = node;
  let textType = "";
  if (isString(type)) {
    textType = type;
  } else if (type === Virtual) {
    textType = VIRTUAL;
  } else if (isFunction(type)) {
    const res = invoke(invocationContext, type, props, key, flags, node.dev);
    if (!shouldWrapFunctional(res, node)) {
      return processData(res, invocationContext);
    }
    return processNode(_jsxC(Virtual, { children: res }, 0, key), invocationContext);
  } else {
    throw qError(QError_invalidJsxNodeType, type);
  }
  let convertedChildren = EMPTY_ARRAY;
  if (children != null) {
    return then(processData(children, invocationContext), (result) => {
      if (result !== void 0) {
        convertedChildren = isArray(result) ? result : [result];
      }
      const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
      return vnode;
    });
  } else {
    const vnode = new ProcessedJSXNodeImpl(textType, props, immutableProps, convertedChildren, flags, key);
    return vnode;
  }
};
const wrapJSX = (element, input) => {
  const children = input === void 0 ? EMPTY_ARRAY : isArray(input) ? input : [input];
  const node = new ProcessedJSXNodeImpl(":virtual", {}, null, children, 0, null);
  node.$elm$ = element;
  return node;
};
const processData = (node, invocationContext) => {
  if (node == null || typeof node === "boolean") {
    return void 0;
  }
  if (isPrimitive(node)) {
    const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
    newNode.$text$ = String(node);
    return newNode;
  } else if (isJSXNode(node)) {
    return processNode(node, invocationContext);
  } else if (isSignal(node)) {
    const newNode = new ProcessedJSXNodeImpl("#text", EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
    newNode.$signal$ = node;
    return newNode;
  } else if (isArray(node)) {
    const output = promiseAll(node.flatMap((n) => processData(n, invocationContext)));
    return then(output, (array) => array.flat(100).filter(isNotNullable));
  } else if (isPromise(node)) {
    return node.then((node2) => processData(node2, invocationContext));
  } else if (node === SkipRender) {
    return new ProcessedJSXNodeImpl(SKIP_RENDER_TYPE, EMPTY_OBJ, null, EMPTY_ARRAY, 0, null);
  } else {
    return void 0;
  }
};
const isPrimitive = (obj) => {
  return isString(obj) || typeof obj === "number";
};
const resumeIfNeeded = (containerEl) => {
  const isResumed = directGetAttribute(containerEl, QContainerAttr);
  if (isResumed === "paused") {
    resumeContainer(containerEl);
  }
};
const getPauseState = (containerEl) => {
  const doc = getDocument(containerEl);
  const isDocElement = containerEl === doc.documentElement;
  const parentJSON = isDocElement ? doc.body : containerEl;
  const script = getQwikJSON(parentJSON, "type");
  if (script) {
    const data = script.firstChild.data;
    return JSON.parse(unescapeText(data) || "{}");
  }
};
const _deserializeData = (data, element) => {
  const obj = JSON.parse(data);
  if (typeof obj !== "object") {
    return null;
  }
  const { _objs, _entry } = obj;
  if (typeof _objs === "undefined" || typeof _entry === "undefined") {
    return null;
  }
  let doc = {};
  let containerState = {};
  if (isNode$1(element) && isQwikElement(element)) {
    const containerEl = getWrappingContainer(element);
    if (containerEl) {
      containerState = _getContainerState(containerEl);
      doc = containerEl.ownerDocument;
    }
  }
  const parser = createParser(containerState, doc);
  for (let i = 0; i < _objs.length; i++) {
    const value = _objs[i];
    if (isString(value)) {
      _objs[i] = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value);
    }
  }
  const getObject = (id) => _objs[strToInt(id)];
  for (const obj2 of _objs) {
    reviveNestedObjects(obj2, getObject, parser);
  }
  return getObject(_entry);
};
const resumeContainer = (containerEl) => {
  if (!isContainer$1(containerEl)) {
    return;
  }
  const pauseState = containerEl["_qwikjson_"] ?? getPauseState(containerEl);
  containerEl["_qwikjson_"] = null;
  if (!pauseState) {
    return;
  }
  const doc = getDocument(containerEl);
  const isDocElement = containerEl === doc.documentElement;
  const parentJSON = isDocElement ? doc.body : containerEl;
  const inlinedFunctions = getQwikInlinedFuncs(parentJSON);
  const containerState = _getContainerState(containerEl);
  const elements = /* @__PURE__ */ new Map();
  const text = /* @__PURE__ */ new Map();
  let node = null;
  let container = 0;
  const elementWalker = doc.createTreeWalker(containerEl, SHOW_COMMENT$1);
  while (node = elementWalker.nextNode()) {
    const data = node.data;
    if (container === 0) {
      if (data.startsWith("qv ")) {
        const id = getID(data);
        if (id >= 0) {
          elements.set(id, node);
        }
      } else if (data.startsWith("t=")) {
        const id = data.slice(2);
        const index2 = strToInt(id);
        const textNode = getTextNode(node);
        elements.set(index2, textNode);
        text.set(index2, textNode.data);
      }
    }
    if (data === "cq") {
      container++;
    } else if (data === "/cq") {
      container--;
    }
  }
  const slotPath = containerEl.getElementsByClassName("qc📦").length !== 0;
  containerEl.querySelectorAll("[q\\:id]").forEach((el) => {
    if (slotPath && el.closest("[q\\:container]") !== containerEl) {
      return;
    }
    const id = directGetAttribute(el, ELEMENT_ID);
    const index2 = strToInt(id);
    elements.set(index2, el);
  });
  const parser = createParser(containerState, doc);
  const finalized = /* @__PURE__ */ new Map();
  const revived = /* @__PURE__ */ new Set();
  const getObject = (id) => {
    assertTrue(typeof id === "string" && id.length > 0, "resume: id must be an non-empty string, got:", id);
    if (finalized.has(id)) {
      return finalized.get(id);
    }
    return computeObject(id);
  };
  const computeObject = (id) => {
    var _a2;
    if (id.startsWith("#")) {
      const elementId = id.slice(1);
      const index3 = strToInt(elementId);
      assertTrue(elements.has(index3), `missing element for id:`, elementId);
      const rawElement = elements.get(index3);
      if (isComment(rawElement)) {
        if (!rawElement.isConnected) {
          finalized.set(id, void 0);
          return void 0;
        }
        const close = findClose(rawElement);
        const virtual = new VirtualElementImpl(rawElement, close, ((_a2 = rawElement.parentElement) == null ? void 0 : _a2.namespaceURI) === SVG_NS);
        finalized.set(id, virtual);
        getContext(virtual, containerState);
        return virtual;
      } else if (isElement$1(rawElement)) {
        finalized.set(id, rawElement);
        getContext(rawElement, containerState);
        return rawElement;
      }
      finalized.set(id, rawElement);
      return rawElement;
    } else if (id.startsWith("@")) {
      const funcId = id.slice(1);
      const index3 = strToInt(funcId);
      const func = inlinedFunctions[index3];
      return func;
    } else if (id.startsWith("*")) {
      const elementId = id.slice(1);
      const index3 = strToInt(elementId);
      assertTrue(elements.has(index3), `missing element for id:`, elementId);
      const str = text.get(index3);
      finalized.set(id, str);
      return str;
    }
    const index2 = strToInt(id);
    const objs = pauseState.objs;
    assertTrue(objs.length > index2, "resume: index is out of bounds", id);
    let value = objs[index2];
    if (isString(value)) {
      value = value === UNDEFINED_PREFIX ? void 0 : parser.prepare(value);
    }
    let obj = value;
    for (let i = id.length - 1; i >= 0; i--) {
      const code = id[i];
      const transform = OBJECT_TRANSFORMS[code];
      if (!transform) {
        break;
      }
      obj = transform(obj, containerState);
    }
    finalized.set(id, obj);
    if (!isPrimitive(value) && !revived.has(index2)) {
      revived.add(index2);
      reviveSubscriptions(value, index2, pauseState.subs, getObject, containerState, parser);
      reviveNestedObjects(value, getObject, parser);
    }
    return obj;
  };
  containerState.$elementIndex$ = 1e5;
  containerState.$pauseCtx$ = {
    getObject,
    meta: pauseState.ctx,
    refs: pauseState.refs
  };
  directSetAttribute(containerEl, QContainerAttr, "resumed");
  emitEvent$1(containerEl, "qresume", void 0, true);
};
const reviveSubscriptions = (value, i, objsSubs, getObject, containerState, parser) => {
  const subs = objsSubs[i];
  if (subs) {
    const converted = [];
    let flag = 0;
    for (const sub of subs) {
      if (sub.startsWith("_")) {
        flag = parseInt(sub.slice(1), 10);
      } else {
        const parsed = parseSubscription(sub, getObject);
        if (parsed) {
          converted.push(parsed);
        }
      }
    }
    if (flag > 0) {
      setObjectFlags(value, flag);
    }
    if (!parser.subs(value, converted)) {
      const proxy = containerState.$proxyMap$.get(value);
      if (proxy) {
        getSubscriptionManager(proxy).$addSubs$(converted);
      } else {
        createProxy(value, containerState, converted);
      }
    }
  }
};
const reviveNestedObjects = (obj, getObject, parser) => {
  if (parser.fill(obj, getObject)) {
    return;
  }
  if (obj && typeof obj == "object") {
    if (isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = getObject(obj[i]);
      }
    } else if (isSerializableObject(obj)) {
      for (const key in obj) {
        obj[key] = getObject(obj[key]);
      }
    }
  }
};
const unescapeText = (str) => {
  return str.replace(/\\x3C(\/?script)/g, "<$1");
};
const getQwikInlinedFuncs = (parentElm) => {
  const elm = getQwikJSON(parentElm, "q:func");
  return (elm == null ? void 0 : elm.qFuncs) ?? EMPTY_ARRAY;
};
const getQwikJSON = (parentElm, attribute) => {
  let child = parentElm.lastElementChild;
  while (child) {
    if (child.tagName === "SCRIPT" && directGetAttribute(child, attribute) === "qwik/json") {
      return child;
    }
    child = child.previousElementSibling;
  }
  return void 0;
};
const getTextNode = (mark) => {
  const nextNode = mark.nextSibling;
  if (isText(nextNode)) {
    return nextNode;
  } else {
    const textNode = mark.ownerDocument.createTextNode("");
    mark.parentElement.insertBefore(textNode, mark);
    return textNode;
  }
};
const getID = (stuff) => {
  const index2 = stuff.indexOf("q:id=");
  if (index2 > 0) {
    return strToInt(stuff.slice(index2 + 5));
  }
  return -1;
};
const _jsxQ = (type, mutableProps, immutableProps, children, flags, key, dev) => {
  const processed = key == null ? null : String(key);
  const node = new JSXNodeImpl(type, mutableProps ?? EMPTY_OBJ, immutableProps, children, flags, processed);
  return node;
};
const _jsxS = (type, mutableProps, immutableProps, flags, key, dev) => {
  let children = null;
  if (mutableProps && "children" in mutableProps) {
    children = mutableProps.children;
    delete mutableProps.children;
  }
  return _jsxQ(type, mutableProps, immutableProps, children, flags, key);
};
const _jsxC = (type, mutableProps, flags, key, dev) => {
  const processed = key == null ? null : String(key);
  const props = mutableProps ?? EMPTY_OBJ;
  const node = new JSXNodeImpl(type, props, null, props.children, flags, processed);
  if (typeof type === "string" && mutableProps) {
    delete mutableProps.children;
  }
  return node;
};
const jsx = (type, props, key) => {
  const processed = key == null ? null : String(key);
  const children = untrack(() => {
    const c = props.children;
    if (typeof type === "string") {
      delete props.children;
    }
    return c;
  });
  if (isString(type)) {
    if ("className" in props) {
      props["class"] = props["className"];
      delete props["className"];
    }
  }
  const node = new JSXNodeImpl(type, props, null, children, 0, processed);
  return node;
};
const SKIP_RENDER_TYPE = ":skipRender";
class JSXNodeImpl {
  constructor(type, props, immutableProps, children, flags, key = null) {
    this.type = type;
    this.props = props;
    this.immutableProps = immutableProps;
    this.children = children;
    this.flags = flags;
    this.key = key;
  }
}
const Virtual = (props) => props.children;
const isJSXNode = (n) => {
  {
    return n instanceof JSXNodeImpl;
  }
};
const Fragment = (props) => props.children;
const SVG_NS = "http://www.w3.org/2000/svg";
const IS_SVG = 1 << 0;
const IS_HEAD = 1 << 1;
const IS_IMMUTABLE = 1 << 2;
const CHILDREN_PLACEHOLDER = [];
const smartUpdateChildren = (ctx, oldVnode, newVnode, flags) => {
  assertQwikElement(oldVnode.$elm$);
  const ch = newVnode.$children$;
  if (ch.length === 1 && ch[0].$type$ === SKIP_RENDER_TYPE) {
    newVnode.$children$ = oldVnode.$children$;
    return;
  }
  const elm = oldVnode.$elm$;
  const needsDOMRead = oldVnode.$children$ === CHILDREN_PLACEHOLDER;
  let filter = isChildComponent;
  if (needsDOMRead) {
    const isHead = elm.nodeName === "HEAD";
    if (isHead) {
      filter = isHeadChildren;
      flags |= IS_HEAD;
    }
  }
  const oldCh = getVnodeChildren(oldVnode, filter);
  if (oldCh.length > 0 && ch.length > 0) {
    return diffChildren(ctx, elm, oldCh, ch, flags);
  } else if (oldCh.length > 0 && ch.length === 0) {
    return removeChildren(ctx.$static$, oldCh, 0, oldCh.length - 1);
  } else if (ch.length > 0) {
    return addChildren(ctx, elm, null, ch, 0, ch.length - 1, flags);
  }
};
const getVnodeChildren = (oldVnode, filter) => {
  const oldCh = oldVnode.$children$;
  const elm = oldVnode.$elm$;
  if (oldCh === CHILDREN_PLACEHOLDER) {
    return oldVnode.$children$ = getChildrenVnodes(elm, filter);
  }
  return oldCh;
};
const diffChildren = (ctx, parentElm, oldCh, newCh, flags) => {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  const results = [];
  const staticCtx = ctx.$static$;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode.$id$ === newStartVnode.$id$) {
      results.push(diffVnode(ctx, oldStartVnode, newStartVnode, flags));
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (oldEndVnode.$id$ === newEndVnode.$id$) {
      results.push(diffVnode(ctx, oldEndVnode, newEndVnode, flags));
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (oldStartVnode.$key$ && oldStartVnode.$id$ === newEndVnode.$id$) {
      assertDefined(oldStartVnode.$elm$);
      assertDefined(oldEndVnode.$elm$);
      results.push(diffVnode(ctx, oldStartVnode, newEndVnode, flags));
      insertAfter(staticCtx, parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (oldEndVnode.$key$ && oldEndVnode.$id$ === newStartVnode.$id$) {
      assertDefined(oldStartVnode.$elm$);
      assertDefined(oldEndVnode.$elm$);
      results.push(diffVnode(ctx, oldEndVnode, newStartVnode, flags));
      insertBefore(staticCtx, parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === void 0) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.$key$];
      if (idxInOld === void 0) {
        const newElm = createElm(ctx, newStartVnode, flags, results);
        insertBefore(staticCtx, parentElm, newElm, oldStartVnode == null ? void 0 : oldStartVnode.$elm$);
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.$type$ !== newStartVnode.$type$) {
          const newElm = createElm(ctx, newStartVnode, flags, results);
          then(newElm, (newElm2) => {
            insertBefore(staticCtx, parentElm, newElm2, oldStartVnode == null ? void 0 : oldStartVnode.$elm$);
          });
        } else {
          results.push(diffVnode(ctx, elmToMove, newStartVnode, flags));
          oldCh[idxInOld] = void 0;
          assertDefined(elmToMove.$elm$);
          insertBefore(staticCtx, parentElm, elmToMove.$elm$, oldStartVnode.$elm$);
        }
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }
  if (newStartIdx <= newEndIdx) {
    const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$;
    results.push(addChildren(ctx, parentElm, before, newCh, newStartIdx, newEndIdx, flags));
  }
  let wait = promiseAll(results);
  if (oldStartIdx <= oldEndIdx) {
    wait = then(wait, () => {
      removeChildren(staticCtx, oldCh, oldStartIdx, oldEndIdx);
    });
  }
  return wait;
};
const getChildren = (elm, filter) => {
  const end = isVirtualElement(elm) ? elm.close : null;
  const nodes = [];
  let node = elm.firstChild;
  while (node = processVirtualNodes(node)) {
    if (filter(node)) {
      nodes.push(node);
    }
    node = node.nextSibling;
    if (node === end) {
      break;
    }
  }
  return nodes;
};
const getChildrenVnodes = (elm, filter) => {
  return getChildren(elm, filter).map(getVnodeFromEl);
};
const getVnodeFromEl = (el) => {
  var _a2;
  if (isElement$1(el)) {
    return ((_a2 = tryGetContext(el)) == null ? void 0 : _a2.$vdom$) ?? domToVnode(el);
  }
  return domToVnode(el);
};
const domToVnode = (node) => {
  if (isQwikElement(node)) {
    const t = new ProcessedJSXNodeImpl(node.localName, {}, null, CHILDREN_PLACEHOLDER, 0, getKey(node));
    t.$elm$ = node;
    return t;
  } else if (isText(node)) {
    const t = new ProcessedJSXNodeImpl(node.nodeName, EMPTY_OBJ, null, CHILDREN_PLACEHOLDER, 0, null);
    t.$text$ = node.data;
    t.$elm$ = node;
    return t;
  }
};
const isHeadChildren = (node) => {
  const type = node.nodeType;
  if (type === 1) {
    return node.hasAttribute("q:head");
  }
  return type === 111;
};
const isSlotTemplate = (node) => {
  return node.nodeName === "Q:TEMPLATE";
};
const isChildComponent = (node) => {
  const type = node.nodeType;
  if (type === 3 || type === 111) {
    return true;
  }
  if (type !== 1) {
    return false;
  }
  const nodeName = node.nodeName;
  if (nodeName === "Q:TEMPLATE") {
    return false;
  }
  if (nodeName === "HEAD") {
    return node.hasAttribute("q:head");
  }
  if (nodeName === "STYLE") {
    return !node.hasAttribute(QStyle);
  }
  return true;
};
const splitChildren = (input) => {
  const output = {};
  for (const item of input) {
    const key = getSlotName(item);
    const node = output[key] ?? (output[key] = new ProcessedJSXNodeImpl(VIRTUAL, {
      [QSlotS]: ""
    }, null, [], 0, key));
    node.$children$.push(item);
  }
  return output;
};
const diffVnode = (rCtx, oldVnode, newVnode, flags) => {
  assertEqual(oldVnode.$type$, newVnode.$type$);
  assertEqual(oldVnode.$key$, newVnode.$key$);
  assertEqual(oldVnode.$id$, newVnode.$id$);
  const elm = oldVnode.$elm$;
  const tag = newVnode.$type$;
  const staticCtx = rCtx.$static$;
  const containerState = staticCtx.$containerState$;
  const currentComponent = rCtx.$cmpCtx$;
  newVnode.$elm$ = elm;
  if (tag === "#text") {
    staticCtx.$visited$.push(elm);
    const signal = newVnode.$signal$;
    if (signal) {
      newVnode.$text$ = jsxToString(trackSignal(signal, [4, currentComponent.$element$, signal, elm]));
    }
    setProperty(staticCtx, elm, "data", newVnode.$text$);
    return;
  }
  const props = newVnode.$props$;
  const vnodeFlags = newVnode.$flags$;
  const elCtx = getContext(elm, containerState);
  if (tag !== VIRTUAL) {
    let isSvg = (flags & IS_SVG) !== 0;
    if (!isSvg && tag === "svg") {
      flags |= IS_SVG;
      isSvg = true;
    }
    if (props !== EMPTY_OBJ) {
      if ((vnodeFlags & static_listeners) === 0) {
        elCtx.li.length = 0;
      }
      const values = oldVnode.$props$;
      newVnode.$props$ = values;
      for (const prop in props) {
        let newValue = props[prop];
        if (prop === "ref") {
          if (newValue !== void 0) {
            setRef(newValue, elm);
          }
          continue;
        }
        if (isOnProp(prop)) {
          const normalized = setEvent(elCtx.li, prop, newValue, containerState.$containerEl$);
          addQwikEvent(staticCtx, elm, normalized);
          continue;
        }
        if (isSignal(newValue)) {
          newValue = trackSignal(newValue, [1, currentComponent.$element$, newValue, elm, prop]);
        }
        if (prop === "class") {
          newValue = serializeClassWithHost(newValue, currentComponent);
        } else if (prop === "style") {
          newValue = stringifyStyle(newValue);
        }
        if (values[prop] !== newValue) {
          values[prop] = newValue;
          smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
        }
      }
    }
    if (vnodeFlags & static_subtree) {
      return;
    }
    if (isSvg && tag === "foreignObject") {
      flags &= ~IS_SVG;
    }
    const setsInnerHTML = props[dangerouslySetInnerHTML] !== void 0;
    if (setsInnerHTML) {
      return;
    }
    if (tag === "textarea") {
      return;
    }
    return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
  } else if (OnRenderProp in props) {
    const cmpProps = props.props;
    setComponentProps(containerState, elCtx, cmpProps);
    let needsRender = !!(elCtx.$flags$ & HOST_FLAG_DIRTY);
    if (!needsRender && !elCtx.$componentQrl$ && !elCtx.$element$.hasAttribute(ELEMENT_ID)) {
      setQId(rCtx, elCtx);
      elCtx.$componentQrl$ = cmpProps[OnRenderProp];
      assertQrl(elCtx.$componentQrl$);
      needsRender = true;
    }
    if (needsRender) {
      return then(renderComponent(rCtx, elCtx, flags), () => renderContentProjection(rCtx, elCtx, newVnode, flags));
    }
    return renderContentProjection(rCtx, elCtx, newVnode, flags);
  } else if (QSlotS in props) {
    assertDefined(currentComponent.$slots$);
    currentComponent.$slots$.push(newVnode);
    return;
  } else if (dangerouslySetInnerHTML in props) {
    setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]);
    return;
  }
  if (vnodeFlags & static_subtree) {
    return;
  }
  return smartUpdateChildren(rCtx, oldVnode, newVnode, flags);
};
const renderContentProjection = (rCtx, hostCtx, vnode, flags) => {
  if (vnode.$flags$ & static_subtree) {
    return;
  }
  const newChildren = vnode.$children$;
  const staticCtx = rCtx.$static$;
  const splittedNewChildren = splitChildren(newChildren);
  const slotMaps = getSlotMap(hostCtx);
  for (const key in slotMaps.slots) {
    if (!splittedNewChildren[key]) {
      const slotEl = slotMaps.slots[key];
      const oldCh = getChildrenVnodes(slotEl, isChildComponent);
      if (oldCh.length > 0) {
        const slotCtx = tryGetContext(slotEl);
        if (slotCtx && slotCtx.$vdom$) {
          slotCtx.$vdom$.$children$ = [];
        }
        removeChildren(staticCtx, oldCh, 0, oldCh.length - 1);
      }
    }
  }
  for (const key in slotMaps.templates) {
    const templateEl = slotMaps.templates[key];
    if (templateEl && !splittedNewChildren[key]) {
      slotMaps.templates[key] = void 0;
      removeNode(staticCtx, templateEl);
    }
  }
  return promiseAll(Object.keys(splittedNewChildren).map((slotName) => {
    const newVdom = splittedNewChildren[slotName];
    const slotCtx = getSlotCtx(staticCtx, slotMaps, hostCtx, slotName, rCtx.$static$.$containerState$);
    const oldVdom = getVdom(slotCtx);
    const slotRctx = pushRenderContext(rCtx);
    const slotEl = slotCtx.$element$;
    slotRctx.$slotCtx$ = slotCtx;
    slotCtx.$vdom$ = newVdom;
    newVdom.$elm$ = slotEl;
    let newFlags = flags & ~IS_SVG;
    if (slotEl.isSvg) {
      newFlags |= IS_SVG;
    }
    const index2 = staticCtx.$addSlots$.findIndex((slot) => slot[0] === slotEl);
    if (index2 >= 0) {
      staticCtx.$addSlots$.splice(index2, 1);
    }
    return smartUpdateChildren(slotRctx, oldVdom, newVdom, newFlags);
  }));
};
const addChildren = (ctx, parentElm, before, vnodes, startIdx, endIdx, flags) => {
  const promises = [];
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    const elm = createElm(ctx, ch, flags, promises);
    insertBefore(ctx.$static$, parentElm, elm, before);
  }
  return promiseAllLazy(promises);
};
const removeChildren = (staticCtx, nodes, startIdx, endIdx) => {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = nodes[startIdx];
    if (ch) {
      assertDefined(ch.$elm$);
      removeNode(staticCtx, ch.$elm$);
    }
  }
};
const getSlotCtx = (staticCtx, slotMaps, hostCtx, slotName, containerState) => {
  const slotEl = slotMaps.slots[slotName];
  if (slotEl) {
    return getContext(slotEl, containerState);
  }
  const templateEl = slotMaps.templates[slotName];
  if (templateEl) {
    return getContext(templateEl, containerState);
  }
  const template = createTemplate(staticCtx.$doc$, slotName);
  const elCtx = createContext(template);
  elCtx.$parent$ = hostCtx;
  prepend(staticCtx, hostCtx.$element$, template);
  slotMaps.templates[slotName] = template;
  return elCtx;
};
const getSlotName = (node) => {
  return node.$props$[QSlot] ?? "";
};
const createElm = (rCtx, vnode, flags, promises) => {
  const tag = vnode.$type$;
  const doc = rCtx.$static$.$doc$;
  const currentComponent = rCtx.$cmpCtx$;
  if (tag === "#text") {
    const signal = vnode.$signal$;
    const elm2 = doc.createTextNode(vnode.$text$);
    if (signal) {
      const subs = flags & IS_IMMUTABLE ? [3, elm2, signal, elm2] : [4, currentComponent.$element$, signal, elm2];
      elm2.data = vnode.$text$ = jsxToString(trackSignal(signal, subs));
    }
    return vnode.$elm$ = elm2;
  }
  let elm;
  let isSvg = !!(flags & IS_SVG);
  if (!isSvg && tag === "svg") {
    flags |= IS_SVG;
    isSvg = true;
  }
  const isVirtual = tag === VIRTUAL;
  const props = vnode.$props$;
  const staticCtx = rCtx.$static$;
  const containerState = staticCtx.$containerState$;
  if (isVirtual) {
    elm = newVirtualElement(doc, isSvg);
  } else if (tag === "head") {
    elm = doc.head;
    flags |= IS_HEAD;
  } else {
    elm = createElement(doc, tag, isSvg);
    flags &= ~IS_HEAD;
  }
  if (vnode.$flags$ & static_subtree) {
    flags |= IS_IMMUTABLE;
  }
  vnode.$elm$ = elm;
  const elCtx = createContext(elm);
  elCtx.$parent$ = rCtx.$cmpCtx$;
  elCtx.$slotParent$ = rCtx.$slotCtx$;
  if (!isVirtual) {
    if (vnode.$immutableProps$) {
      setProperties(staticCtx, elCtx, currentComponent, vnode.$immutableProps$, isSvg, true);
    }
    if (props !== EMPTY_OBJ) {
      elCtx.$vdom$ = vnode;
      vnode.$props$ = setProperties(staticCtx, elCtx, currentComponent, props, isSvg, false);
    }
    if (isSvg && tag === "foreignObject") {
      isSvg = false;
      flags &= ~IS_SVG;
    }
    if (currentComponent) {
      const scopedIds = currentComponent.$scopeIds$;
      if (scopedIds) {
        scopedIds.forEach((styleId) => {
          elm.classList.add(styleId);
        });
      }
      if (currentComponent.$flags$ & HOST_FLAG_NEED_ATTACH_LISTENER) {
        elCtx.li.push(...currentComponent.li);
        currentComponent.$flags$ &= ~HOST_FLAG_NEED_ATTACH_LISTENER;
      }
    }
    for (const listener of elCtx.li) {
      addQwikEvent(staticCtx, elm, listener[0]);
    }
    const setsInnerHTML = props[dangerouslySetInnerHTML] !== void 0;
    if (setsInnerHTML) {
      return elm;
    }
    if (isSvg && tag === "foreignObject") {
      isSvg = false;
      flags &= ~IS_SVG;
    }
  } else if (OnRenderProp in props) {
    const renderQRL = props[OnRenderProp];
    const target = createPropsState();
    const manager = containerState.$subsManager$.$createManager$();
    const proxy = new Proxy(target, new ReadWriteProxyHandler(containerState, manager));
    const expectProps = props.props;
    containerState.$proxyMap$.set(target, proxy);
    elCtx.$props$ = proxy;
    if (expectProps !== EMPTY_OBJ) {
      const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
      for (const prop in expectProps) {
        if (prop !== "children" && prop !== QSlot) {
          const immutableValue2 = immutableMeta[prop];
          if (isSignal(immutableValue2)) {
            target[_IMMUTABLE_PREFIX + prop] = immutableValue2;
          } else {
            target[prop] = expectProps[prop];
          }
        }
      }
    }
    setQId(rCtx, elCtx);
    elCtx.$componentQrl$ = renderQRL;
    const wait = then(renderComponent(rCtx, elCtx, flags), () => {
      let children2 = vnode.$children$;
      if (children2.length === 0) {
        return;
      }
      if (children2.length === 1 && children2[0].$type$ === SKIP_RENDER_TYPE) {
        children2 = children2[0].$children$;
      }
      const slotMap = getSlotMap(elCtx);
      const p = [];
      const splittedNewChildren = splitChildren(children2);
      for (const slotName in splittedNewChildren) {
        const newVnode = splittedNewChildren[slotName];
        const slotCtx = getSlotCtx(staticCtx, slotMap, elCtx, slotName, staticCtx.$containerState$);
        const slotRctx = pushRenderContext(rCtx);
        const slotEl = slotCtx.$element$;
        slotRctx.$slotCtx$ = slotCtx;
        slotCtx.$vdom$ = newVnode;
        newVnode.$elm$ = slotEl;
        let newFlags = flags & ~IS_SVG;
        if (slotEl.isSvg) {
          newFlags |= IS_SVG;
        }
        for (const node of newVnode.$children$) {
          const nodeElm = createElm(slotRctx, node, newFlags, p);
          assertDefined(node.$elm$);
          assertEqual(nodeElm, node.$elm$);
          appendChild(staticCtx, slotEl, nodeElm);
        }
      }
      return promiseAllLazy(p);
    });
    if (isPromise(wait)) {
      promises.push(wait);
    }
    return elm;
  } else if (QSlotS in props) {
    assertDefined(currentComponent.$slots$);
    setKey(elm, vnode.$key$);
    directSetAttribute(elm, QSlotRef, currentComponent.$id$);
    directSetAttribute(elm, QSlotS, "");
    currentComponent.$slots$.push(vnode);
    staticCtx.$addSlots$.push([elm, currentComponent.$element$]);
  } else if (dangerouslySetInnerHTML in props) {
    setProperty(staticCtx, elm, "innerHTML", props[dangerouslySetInnerHTML]);
    return elm;
  }
  let children = vnode.$children$;
  if (children.length === 0) {
    return elm;
  }
  if (children.length === 1 && children[0].$type$ === SKIP_RENDER_TYPE) {
    children = children[0].$children$;
  }
  const nodes = children.map((ch) => createElm(rCtx, ch, flags, promises));
  for (const node of nodes) {
    directAppendChild(elm, node);
  }
  return elm;
};
const getSlots = (elCtx) => {
  const slots = elCtx.$slots$;
  if (!slots) {
    elCtx.$element$.parentElement;
    return elCtx.$slots$ = readDOMSlots(elCtx);
  }
  return slots;
};
const getSlotMap = (elCtx) => {
  const slotsArray = getSlots(elCtx);
  const slots = {};
  const templates = {};
  const t = Array.from(elCtx.$element$.childNodes).filter(isSlotTemplate);
  for (const vnode of slotsArray) {
    assertQwikElement(vnode.$elm$);
    slots[vnode.$key$ ?? ""] = vnode.$elm$;
  }
  for (const elm of t) {
    templates[directGetAttribute(elm, QSlot) ?? ""] = elm;
  }
  return { slots, templates };
};
const readDOMSlots = (elCtx) => {
  const parent = elCtx.$element$.parentElement;
  return queryAllVirtualByAttribute(parent, QSlotRef, elCtx.$id$).map(domToVnode);
};
const handleStyle = (ctx, elm, newValue) => {
  setProperty(ctx, elm.style, "cssText", newValue);
  return true;
};
const handleClass = (ctx, elm, newValue) => {
  if (elm.namespaceURI === SVG_NS) {
    setAttribute(ctx, elm, "class", newValue);
  } else {
    setProperty(ctx, elm, "className", newValue);
  }
  return true;
};
const checkBeforeAssign = (ctx, elm, newValue, prop) => {
  if (prop in elm) {
    if (elm[prop] !== newValue) {
      if (elm.tagName === "SELECT") {
        setPropertyPost(ctx, elm, prop, newValue);
      } else {
        setProperty(ctx, elm, prop, newValue);
      }
    }
  }
  return true;
};
const forceAttribute = (ctx, elm, newValue, prop) => {
  setAttribute(ctx, elm, prop.toLowerCase(), newValue);
  return true;
};
const setInnerHTML = (ctx, elm, newValue) => {
  setProperty(ctx, elm, "innerHTML", newValue);
  return true;
};
const noop = () => {
  return true;
};
const PROP_HANDLER_MAP = {
  style: handleStyle,
  class: handleClass,
  value: checkBeforeAssign,
  checked: checkBeforeAssign,
  href: forceAttribute,
  list: forceAttribute,
  form: forceAttribute,
  tabIndex: forceAttribute,
  download: forceAttribute,
  innerHTML: noop,
  [dangerouslySetInnerHTML]: setInnerHTML
};
const smartSetProperty = (staticCtx, elm, prop, newValue, isSvg) => {
  if (isAriaAttribute(prop)) {
    setAttribute(staticCtx, elm, prop, newValue != null ? String(newValue) : newValue);
    return;
  }
  const exception = PROP_HANDLER_MAP[prop];
  if (exception) {
    if (exception(staticCtx, elm, newValue, prop)) {
      return;
    }
  }
  if (!isSvg && prop in elm) {
    setProperty(staticCtx, elm, prop, newValue);
    return;
  }
  if (prop.startsWith(PREVENT_DEFAULT)) {
    registerQwikEvent(prop.slice(PREVENT_DEFAULT.length));
  }
  setAttribute(staticCtx, elm, prop, newValue);
};
const setProperties = (staticCtx, elCtx, hostCtx, newProps, isSvg, immutable) => {
  const values = {};
  const elm = elCtx.$element$;
  for (const prop in newProps) {
    let newValue = newProps[prop];
    if (prop === "ref") {
      if (newValue !== void 0) {
        setRef(newValue, elm);
      }
      continue;
    }
    if (isOnProp(prop)) {
      setEvent(elCtx.li, prop, newValue, staticCtx.$containerState$.$containerEl$);
      continue;
    }
    if (isSignal(newValue)) {
      newValue = trackSignal(newValue, immutable ? [1, elm, newValue, hostCtx.$element$, prop] : [2, hostCtx.$element$, newValue, elm, prop]);
    }
    if (prop === "class") {
      newValue = serializeClassWithHost(newValue, hostCtx);
      if (!newValue) {
        continue;
      }
    } else if (prop === "style") {
      newValue = stringifyStyle(newValue);
    }
    values[prop] = newValue;
    smartSetProperty(staticCtx, elm, prop, newValue, isSvg);
  }
  return values;
};
const setComponentProps = (containerState, elCtx, expectProps) => {
  let props = elCtx.$props$;
  if (!props) {
    elCtx.$props$ = props = createProxy(createPropsState(), containerState);
  }
  if (expectProps === EMPTY_OBJ) {
    return;
  }
  const manager = getSubscriptionManager(props);
  const target = getProxyTarget(props);
  const immutableMeta = target[_IMMUTABLE] = expectProps[_IMMUTABLE] ?? EMPTY_OBJ;
  for (const prop in expectProps) {
    if (prop !== "children" && prop !== QSlot && !immutableMeta[prop]) {
      const value = expectProps[prop];
      if (target[prop] !== value) {
        target[prop] = value;
        manager.$notifySubs$(prop);
      }
    }
  }
};
const cleanupTree = (elm, staticCtx, subsManager, stopSlots) => {
  subsManager.$clearSub$(elm);
  if (isQwikElement(elm)) {
    if (stopSlots && elm.hasAttribute(QSlotS)) {
      staticCtx.$rmSlots$.push(elm);
      return;
    }
    const ctx = tryGetContext(elm);
    if (ctx) {
      cleanupContext(ctx, subsManager);
    }
    const end = isVirtualElement(elm) ? elm.close : null;
    let node = elm.firstChild;
    while (node = processVirtualNodes(node)) {
      cleanupTree(node, staticCtx, subsManager, true);
      node = node.nextSibling;
      if (node === end) {
        break;
      }
    }
  }
};
const executeContextWithScrollAndTransition = async (ctx) => {
  executeDOMRender(ctx);
};
const directAppendChild = (parent, child) => {
  if (isVirtualElement(child)) {
    child.appendTo(parent);
  } else {
    parent.appendChild(child);
  }
};
const directRemoveChild = (parent, child) => {
  if (isVirtualElement(child)) {
    child.remove();
  } else {
    parent.removeChild(child);
  }
};
const directInsertAfter = (parent, child, ref) => {
  if (isVirtualElement(child)) {
    child.insertBeforeTo(parent, (ref == null ? void 0 : ref.nextSibling) ?? null);
  } else {
    parent.insertBefore(child, (ref == null ? void 0 : ref.nextSibling) ?? null);
  }
};
const directInsertBefore = (parent, child, ref) => {
  if (isVirtualElement(child)) {
    child.insertBeforeTo(parent, getRootNode(ref));
  } else {
    parent.insertBefore(child, getRootNode(ref));
  }
};
const createKeyToOldIdx = (children, beginIdx, endIdx) => {
  const map = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const child = children[i];
    const key = child.$key$;
    if (key != null) {
      map[key] = i;
    }
  }
  return map;
};
const addQwikEvent = (staticCtx, elm, prop) => {
  if (!prop.startsWith("on:")) {
    setAttribute(staticCtx, elm, prop, "");
  }
  registerQwikEvent(prop);
};
const registerQwikEvent = (prop) => {
  var _a2;
  if (!qTest) {
    const eventName = getEventName(prop);
    try {
      const qwikevents = (_a2 = globalThis).qwikevents || (_a2.qwikevents = []);
      qwikevents.push(eventName);
    } catch (err) {
    }
  }
};
const useLexicalScope = () => {
  const context = getInvokeContext();
  let qrl = context.$qrl$;
  if (!qrl) {
    const el = context.$element$;
    const container = getWrappingContainer(el);
    qrl = parseQRL(decodeURIComponent(String(context.$url$)), container);
    resumeIfNeeded(container);
    const elCtx = getContext(el, _getContainerState(container));
    inflateQrl(qrl, elCtx);
  } else {
    assertDefined(qrl.$captureRef$, "invoke: qrl $captureRef$ must be defined inside useLexicalScope()", qrl);
  }
  return qrl.$captureRef$;
};
const executeSignalOperation = (staticCtx, operation) => {
  try {
    const type = operation[0];
    switch (type) {
      case 1:
      case 2: {
        let elm;
        let hostElm;
        if (type === 1) {
          elm = operation[1];
          hostElm = operation[3];
        } else {
          elm = operation[3];
          hostElm = operation[1];
        }
        const elCtx = tryGetContext(elm);
        if (elCtx == null) {
          return;
        }
        const prop = operation[4];
        const isSVG = elm.namespaceURI === SVG_NS;
        staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
        let value = trackSignal(operation[2], operation.slice(0, -1));
        if (prop === "class") {
          value = serializeClassWithHost(value, tryGetContext(hostElm));
        } else if (prop === "style") {
          value = stringifyStyle(value);
        }
        const vdom = getVdom(elCtx);
        if (prop in vdom.$props$ && vdom.$props$[prop] === value) {
          return;
        }
        vdom.$props$[prop] = value;
        return smartSetProperty(staticCtx, elm, prop, value, isSVG);
      }
      case 3:
      case 4: {
        const elm = operation[3];
        if (!staticCtx.$visited$.includes(elm)) {
          staticCtx.$containerState$.$subsManager$.$clearSignal$(operation);
          const value = trackSignal(operation[2], operation.slice(0, -1));
          return setProperty(staticCtx, elm, "data", jsxToString(value));
        }
      }
    }
  } catch (e) {
  }
};
const notifyChange = (subAction, containerState) => {
  if (subAction[0] === 0) {
    const host = subAction[1];
    if (isSubscriberDescriptor(host)) {
      notifyTask(host, containerState);
    } else {
      notifyRender(host, containerState);
    }
  } else {
    notifySignalOperation(subAction, containerState);
  }
};
const notifyRender = (hostElement, containerState) => {
  const server = isServerPlatform();
  if (!server) {
    resumeIfNeeded(containerState.$containerEl$);
  }
  const elCtx = getContext(hostElement, containerState);
  assertDefined(elCtx.$componentQrl$, `render: notified host element must have a defined $renderQrl$`, elCtx);
  if (elCtx.$flags$ & HOST_FLAG_DIRTY) {
    return;
  }
  elCtx.$flags$ |= HOST_FLAG_DIRTY;
  const activeRendering = containerState.$hostsRendering$ !== void 0;
  if (activeRendering) {
    containerState.$hostsStaging$.add(elCtx);
  } else {
    if (server) {
      return void 0;
    }
    containerState.$hostsNext$.add(elCtx);
    scheduleFrame(containerState);
  }
};
const notifySignalOperation = (op, containerState) => {
  const activeRendering = containerState.$hostsRendering$ !== void 0;
  containerState.$opsNext$.add(op);
  if (!activeRendering) {
    scheduleFrame(containerState);
  }
};
const notifyTask = (task, containerState) => {
  if (task.$flags$ & TaskFlagsIsDirty) {
    return;
  }
  task.$flags$ |= TaskFlagsIsDirty;
  const activeRendering = containerState.$hostsRendering$ !== void 0;
  if (activeRendering) {
    containerState.$taskStaging$.add(task);
  } else {
    containerState.$taskNext$.add(task);
    scheduleFrame(containerState);
  }
};
const scheduleFrame = (containerState) => {
  if (containerState.$renderPromise$ === void 0) {
    containerState.$renderPromise$ = getPlatform().nextTick(() => renderMarked(containerState));
  }
  return containerState.$renderPromise$;
};
const _hW = () => {
  const [task] = useLexicalScope();
  notifyTask(task, _getContainerState(getWrappingContainer(task.$el$)));
};
const renderMarked = async (containerState) => {
  const containerEl = containerState.$containerEl$;
  const doc = getDocument(containerEl);
  try {
    const rCtx = createRenderContext(doc, containerState);
    const staticCtx = rCtx.$static$;
    const hostsRendering = containerState.$hostsRendering$ = new Set(containerState.$hostsNext$);
    containerState.$hostsNext$.clear();
    await executeTasksBefore(containerState, rCtx);
    containerState.$hostsStaging$.forEach((host) => {
      hostsRendering.add(host);
    });
    containerState.$hostsStaging$.clear();
    const signalOperations = Array.from(containerState.$opsNext$);
    containerState.$opsNext$.clear();
    const renderingQueue = Array.from(hostsRendering);
    sortNodes(renderingQueue);
    if (!containerState.$styleMoved$ && renderingQueue.length > 0) {
      containerState.$styleMoved$ = true;
      const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
      parentJSON.querySelectorAll("style[q\\:style]").forEach((el) => {
        containerState.$styleIds$.add(directGetAttribute(el, QStyle));
        appendChild(staticCtx, doc.head, el);
      });
    }
    for (const elCtx of renderingQueue) {
      const el = elCtx.$element$;
      if (!staticCtx.$hostElements$.has(el)) {
        if (elCtx.$componentQrl$) {
          assertTrue(el.isConnected, "element must be connected to the dom");
          staticCtx.$roots$.push(elCtx);
          try {
            await renderComponent(rCtx, elCtx, getFlags(el.parentElement));
          } catch (err) {
            if (qDev)
              ;
            else {
              logError(err);
            }
          }
        }
      }
    }
    signalOperations.forEach((op) => {
      executeSignalOperation(staticCtx, op);
    });
    staticCtx.$operations$.push(...staticCtx.$postOperations$);
    if (staticCtx.$operations$.length === 0) {
      printRenderStats(staticCtx);
      await postRendering(containerState, rCtx);
      return;
    }
    await executeContextWithScrollAndTransition(staticCtx);
    printRenderStats(staticCtx);
    return postRendering(containerState, rCtx);
  } catch (err) {
    logError(err);
  }
};
const getFlags = (el) => {
  let flags = 0;
  if (el) {
    if (el.namespaceURI === SVG_NS) {
      flags |= IS_SVG;
    }
    if (el.tagName === "HEAD") {
      flags |= IS_HEAD;
    }
  }
  return flags;
};
const postRendering = async (containerState, rCtx) => {
  const hostElements = rCtx.$static$.$hostElements$;
  await executeTasksAfter(containerState, rCtx, (task, stage) => {
    if ((task.$flags$ & TaskFlagsIsVisibleTask) === 0) {
      return false;
    }
    if (stage) {
      return hostElements.has(task.$el$);
    }
    return true;
  });
  containerState.$hostsStaging$.forEach((el) => {
    containerState.$hostsNext$.add(el);
  });
  containerState.$hostsStaging$.clear();
  containerState.$hostsRendering$ = void 0;
  containerState.$renderPromise$ = void 0;
  const pending = containerState.$hostsNext$.size + containerState.$taskNext$.size + containerState.$opsNext$.size;
  if (pending > 0) {
    containerState.$renderPromise$ = renderMarked(containerState);
  }
};
const executeTasksBefore = async (containerState, rCtx) => {
  const containerEl = containerState.$containerEl$;
  const resourcesPromises = [];
  const taskPromises = [];
  const isTask = (task) => (task.$flags$ & TaskFlagsIsTask) !== 0;
  const isResourceTask2 = (task) => (task.$flags$ & TaskFlagsIsResource) !== 0;
  containerState.$taskNext$.forEach((task) => {
    if (isTask(task)) {
      taskPromises.push(then(task.$qrl$.$resolveLazy$(containerEl), () => task));
      containerState.$taskNext$.delete(task);
    }
    if (isResourceTask2(task)) {
      resourcesPromises.push(then(task.$qrl$.$resolveLazy$(containerEl), () => task));
      containerState.$taskNext$.delete(task);
    }
  });
  do {
    containerState.$taskStaging$.forEach((task) => {
      if (isTask(task)) {
        taskPromises.push(then(task.$qrl$.$resolveLazy$(containerEl), () => task));
      } else if (isResourceTask2(task)) {
        resourcesPromises.push(then(task.$qrl$.$resolveLazy$(containerEl), () => task));
      } else {
        containerState.$taskNext$.add(task);
      }
    });
    containerState.$taskStaging$.clear();
    if (taskPromises.length > 0) {
      const tasks = await Promise.all(taskPromises);
      sortTasks(tasks);
      await Promise.all(tasks.map((task) => {
        return runSubscriber(task, containerState, rCtx);
      }));
      taskPromises.length = 0;
    }
  } while (containerState.$taskStaging$.size > 0);
  if (resourcesPromises.length > 0) {
    const resources = await Promise.all(resourcesPromises);
    sortTasks(resources);
    resources.forEach((task) => runSubscriber(task, containerState, rCtx));
  }
};
const executeTasksAfter = async (containerState, rCtx, taskPred) => {
  const taskPromises = [];
  const containerEl = containerState.$containerEl$;
  containerState.$taskNext$.forEach((task) => {
    if (taskPred(task, false)) {
      if (task.$el$.isConnected) {
        taskPromises.push(then(task.$qrl$.$resolveLazy$(containerEl), () => task));
      }
      containerState.$taskNext$.delete(task);
    }
  });
  do {
    containerState.$taskStaging$.forEach((task) => {
      if (task.$el$.isConnected) {
        if (taskPred(task, true)) {
          taskPromises.push(then(task.$qrl$.$resolveLazy$(containerEl), () => task));
        } else {
          containerState.$taskNext$.add(task);
        }
      }
    });
    containerState.$taskStaging$.clear();
    if (taskPromises.length > 0) {
      const tasks = await Promise.all(taskPromises);
      sortTasks(tasks);
      for (const task of tasks) {
        runSubscriber(task, containerState, rCtx);
      }
      taskPromises.length = 0;
    }
  } while (containerState.$taskStaging$.size > 0);
};
const sortNodes = (elements) => {
  elements.sort((a, b) => a.$element$.compareDocumentPosition(getRootNode(b.$element$)) & 2 ? 1 : -1);
};
const sortTasks = (tasks) => {
  tasks.sort((a, b) => {
    if (a.$el$ === b.$el$) {
      return a.$index$ < b.$index$ ? -1 : 1;
    }
    return (a.$el$.compareDocumentPosition(getRootNode(b.$el$)) & 2) !== 0 ? 1 : -1;
  });
};
const TaskFlagsIsVisibleTask = 1 << 0;
const TaskFlagsIsTask = 1 << 1;
const TaskFlagsIsResource = 1 << 2;
const TaskFlagsIsComputed = 1 << 3;
const TaskFlagsIsDirty = 1 << 4;
const TaskFlagsIsCleanup = 1 << 5;
const useTaskQrl = (qrl, opts) => {
  const { get, set, iCtx, i, elCtx } = useSequentialScope();
  if (get) {
    return;
  }
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  const task = new Task(TaskFlagsIsDirty | TaskFlagsIsTask, i, elCtx.$element$, qrl, void 0);
  set(true);
  qrl.$resolveLazy$(containerState.$containerEl$);
  if (!elCtx.$tasks$) {
    elCtx.$tasks$ = [];
  }
  elCtx.$tasks$.push(task);
  waitAndRun(iCtx, () => runTask(task, containerState, iCtx.$renderCtx$));
  if (isServerPlatform()) {
    useRunTask(task, opts == null ? void 0 : opts.eagerness);
  }
};
const useVisibleTaskQrl = (qrl, opts) => {
  const { get, set, i, iCtx, elCtx } = useSequentialScope();
  const eagerness = (opts == null ? void 0 : opts.strategy) ?? "intersection-observer";
  if (get) {
    if (isServerPlatform()) {
      useRunTask(get, eagerness);
    }
    return;
  }
  const task = new Task(TaskFlagsIsVisibleTask, i, elCtx.$element$, qrl, void 0);
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  if (!elCtx.$tasks$) {
    elCtx.$tasks$ = [];
  }
  elCtx.$tasks$.push(task);
  set(task);
  useRunTask(task, eagerness);
  if (!isServerPlatform()) {
    qrl.$resolveLazy$(containerState.$containerEl$);
    notifyTask(task, containerState);
  }
};
const isResourceTask = (task) => {
  return (task.$flags$ & TaskFlagsIsResource) !== 0;
};
const isComputedTask = (task) => {
  return (task.$flags$ & TaskFlagsIsComputed) !== 0;
};
const runSubscriber = async (task, containerState, rCtx) => {
  assertEqual(!!(task.$flags$ & TaskFlagsIsDirty), true, "Resource is not dirty", task);
  if (isResourceTask(task)) {
    return runResource(task, containerState, rCtx);
  } else if (isComputedTask(task)) {
    return runComputed(task, containerState, rCtx);
  } else {
    return runTask(task, containerState, rCtx);
  }
};
const runResource = (task, containerState, rCtx, waitOn) => {
  task.$flags$ &= ~TaskFlagsIsDirty;
  cleanupTask(task);
  const el = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, el, void 0, "TaskEvent");
  const { $subsManager$: subsManager } = containerState;
  iCtx.$renderCtx$ = rCtx;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const cleanups = [];
  const resource = task.$state$;
  const track = (obj, prop) => {
    if (isFunction(obj)) {
      const ctx = newInvokeContext();
      ctx.$renderCtx$ = rCtx;
      ctx.$subscriber$ = [0, task];
      return invoke(ctx, obj);
    }
    const manager = getSubscriptionManager(obj);
    if (manager) {
      manager.$addSub$([0, task], prop);
    } else {
      logErrorAndStop(codeToText(QError_trackUseStore), obj);
    }
    if (prop) {
      return obj[prop];
    } else if (isSignal(obj)) {
      return obj.value;
    } else {
      return obj;
    }
  };
  const resourceTarget = unwrapProxy(resource);
  const opts = {
    track,
    cleanup(callback) {
      cleanups.push(callback);
    },
    cache(policy) {
      let milliseconds = 0;
      if (policy === "immutable") {
        milliseconds = Infinity;
      } else {
        milliseconds = policy;
      }
      resource._cache = milliseconds;
    },
    previous: resourceTarget._resolved
  };
  let resolve;
  let reject;
  let done = false;
  const setState = (resolved, value) => {
    if (!done) {
      done = true;
      if (resolved) {
        done = true;
        resource.loading = false;
        resource._state = "resolved";
        resource._resolved = value;
        resource._error = void 0;
        resolve(value);
      } else {
        done = true;
        resource.loading = false;
        resource._state = "rejected";
        resource._error = value;
        reject(value);
      }
      return true;
    }
    return false;
  };
  invoke(iCtx, () => {
    resource._state = "pending";
    resource.loading = !isServerPlatform();
    resource.value = new Promise((r, re) => {
      resolve = r;
      reject = re;
    });
  });
  task.$destroy$ = noSerialize(() => {
    done = true;
    cleanups.forEach((fn) => fn());
  });
  const promise = safeCall(() => then(waitOn, () => taskFn(opts)), (value) => {
    setState(true, value);
  }, (reason) => {
    setState(false, reason);
  });
  const timeout = resourceTarget._timeout;
  if (timeout > 0) {
    return Promise.race([
      promise,
      delay(timeout).then(() => {
        if (setState(false, new Error("timeout"))) {
          cleanupTask(task);
        }
      })
    ]);
  }
  return promise;
};
const runTask = (task, containerState, rCtx) => {
  task.$flags$ &= ~TaskFlagsIsDirty;
  cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "TaskEvent");
  iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  const track = (obj, prop) => {
    if (isFunction(obj)) {
      const ctx = newInvokeContext();
      ctx.$subscriber$ = [0, task];
      return invoke(ctx, obj);
    }
    const manager = getSubscriptionManager(obj);
    if (manager) {
      manager.$addSub$([0, task], prop);
    } else {
      logErrorAndStop(codeToText(QError_trackUseStore), obj);
    }
    if (prop) {
      return obj[prop];
    } else {
      return obj;
    }
  };
  const cleanups = [];
  task.$destroy$ = noSerialize(() => {
    cleanups.forEach((fn) => fn());
  });
  const opts = {
    track,
    cleanup(callback) {
      cleanups.push(callback);
    }
  };
  return safeCall(() => taskFn(opts), (returnValue) => {
    if (isFunction(returnValue)) {
      cleanups.push(returnValue);
    }
  }, (reason) => {
    handleError(reason, hostElement, rCtx);
  });
};
const runComputed = (task, containerState, rCtx) => {
  assertSignal(task.$state$);
  task.$flags$ &= ~TaskFlagsIsDirty;
  cleanupTask(task);
  const hostElement = task.$el$;
  const iCtx = newInvokeContext(rCtx.$static$.$locale$, hostElement, void 0, "ComputedEvent");
  iCtx.$subscriber$ = [0, task];
  iCtx.$renderCtx$ = rCtx;
  const { $subsManager$: subsManager } = containerState;
  const taskFn = task.$qrl$.getFn(iCtx, () => {
    subsManager.$clearSub$(task);
  });
  return safeCall(taskFn, (returnValue) => untrack(() => {
    const signal = task.$state$;
    signal[QObjectSignalFlags] &= ~SIGNAL_UNASSIGNED;
    signal.untrackedValue = returnValue;
    signal[QObjectManagerSymbol].$notifySubs$();
  }), (reason) => {
    handleError(reason, hostElement, rCtx);
  });
};
const cleanupTask = (task) => {
  const destroy = task.$destroy$;
  if (destroy) {
    task.$destroy$ = void 0;
    try {
      destroy();
    } catch (err) {
      logError(err);
    }
  }
};
const destroyTask = (task) => {
  if (task.$flags$ & TaskFlagsIsCleanup) {
    task.$flags$ &= ~TaskFlagsIsCleanup;
    const cleanup = task.$qrl$;
    cleanup();
  } else {
    cleanupTask(task);
  }
};
const useRunTask = (task, eagerness) => {
  if (eagerness === "visible" || eagerness === "intersection-observer") {
    useOn("qvisible", getTaskHandlerQrl(task));
  } else if (eagerness === "load" || eagerness === "document-ready") {
    useOnDocument("qinit", getTaskHandlerQrl(task));
  } else if (eagerness === "idle" || eagerness === "document-idle") {
    useOnDocument("qidle", getTaskHandlerQrl(task));
  }
};
const getTaskHandlerQrl = (task) => {
  const taskQrl = task.$qrl$;
  const taskHandler = createQRL(taskQrl.$chunk$, "_hW", _hW, null, null, [task], taskQrl.$symbol$);
  return taskHandler;
};
const isSubscriberDescriptor = (obj) => {
  return isObject(obj) && obj instanceof Task;
};
const serializeTask = (task, getObjId) => {
  let value = `${intToStr(task.$flags$)} ${intToStr(task.$index$)} ${getObjId(task.$qrl$)} ${getObjId(task.$el$)}`;
  if (task.$state$) {
    value += ` ${getObjId(task.$state$)}`;
  }
  return value;
};
const parseTask = (data) => {
  const [flags, index2, qrl, el, resource] = data.split(" ");
  return new Task(strToInt(flags), strToInt(index2), el, qrl, resource);
};
class Task {
  constructor($flags$, $index$, $el$, $qrl$, $state$) {
    this.$flags$ = $flags$;
    this.$index$ = $index$;
    this.$el$ = $el$;
    this.$qrl$ = $qrl$;
    this.$state$ = $state$;
  }
}
const _serializeData = async (data, pureQRL) => {
  const containerState = {};
  const collector = createCollector(containerState);
  collectValue(data, collector, false);
  let promises;
  while ((promises = collector.$promises$).length > 0) {
    collector.$promises$ = [];
    await Promise.all(promises);
  }
  const objs = Array.from(collector.$objSet$.keys());
  let count = 0;
  const objToId = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    objToId.set(obj, intToStr(count));
    count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const mustGetObjId = (obj) => {
    let suffix = "";
    if (isPromise(obj)) {
      const promiseValue = getPromiseValue(obj);
      if (!promiseValue) {
        throw qError(QError_missingObjectId, obj);
      }
      obj = promiseValue.value;
      if (promiseValue.resolved) {
        suffix += "~";
      } else {
        suffix += "_";
      }
    }
    if (isObject(obj)) {
      const target = getProxyTarget(obj);
      if (target) {
        suffix += "!";
        obj = target;
      }
    }
    const key = objToId.get(obj);
    if (key === void 0) {
      throw qError(QError_missingObjectId, obj);
    }
    return key + suffix;
  };
  const convertedObjs = objs.map((obj) => {
    if (obj === null) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "number":
        if (!Number.isFinite(obj)) {
          break;
        }
        return obj;
      case "string":
      case "boolean":
        return obj;
    }
    const value = serializeValue(obj, mustGetObjId, collector, containerState);
    if (value !== void 0) {
      return value;
    }
    if (typeObj === "object") {
      if (isArray(obj)) {
        return obj.map(mustGetObjId);
      }
      if (isSerializableObject(obj)) {
        const output = {};
        for (const key in obj) {
          output[key] = mustGetObjId(obj[key]);
        }
        return output;
      }
    }
    throw qError(QError_verifySerializable, obj);
  });
  return JSON.stringify({
    _entry: mustGetObjId(data),
    _objs: convertedObjs
  });
};
const _pauseFromContexts = async (allContexts, containerState, fallbackGetObjId, textNodes) => {
  var _a2;
  const collector = createCollector(containerState);
  textNodes == null ? void 0 : textNodes.forEach((_, key) => {
    collector.$seen$.add(key);
  });
  let hasListeners = false;
  for (const ctx of allContexts) {
    if (ctx.$tasks$) {
      for (const task of ctx.$tasks$) {
        if (isResourceTask(task)) {
          collector.$resources$.push(task.$state$);
        }
        destroyTask(task);
      }
    }
  }
  for (const ctx of allContexts) {
    const el = ctx.$element$;
    const ctxListeners = ctx.li;
    for (const listener of ctxListeners) {
      if (isElement$1(el)) {
        const qrl = listener[1];
        const captured = qrl.$captureRef$;
        if (captured) {
          for (const obj of captured) {
            collectValue(obj, collector, true);
          }
        }
        collector.$qrls$.push(qrl);
        hasListeners = true;
      }
    }
  }
  if (!hasListeners) {
    return {
      state: {
        refs: {},
        ctx: {},
        objs: [],
        subs: []
      },
      objs: [],
      funcs: [],
      qrls: [],
      resources: collector.$resources$,
      mode: "static"
    };
  }
  let promises;
  while ((promises = collector.$promises$).length > 0) {
    collector.$promises$ = [];
    await Promise.all(promises);
  }
  const canRender = collector.$elements$.length > 0;
  if (canRender) {
    for (const elCtx of collector.$deferElements$) {
      collectElementData(elCtx, collector, elCtx.$element$);
    }
    for (const ctx of allContexts) {
      collectProps(ctx, collector);
    }
  }
  while ((promises = collector.$promises$).length > 0) {
    collector.$promises$ = [];
    await Promise.all(promises);
  }
  const elementToIndex = /* @__PURE__ */ new Map();
  const objs = Array.from(collector.$objSet$.keys());
  const objToId = /* @__PURE__ */ new Map();
  const getElementID = (el) => {
    let id = elementToIndex.get(el);
    if (id === void 0) {
      id = getQId(el);
      if (!id) {
        console.warn("Missing ID", el);
      }
      elementToIndex.set(el, id);
    }
    return id;
  };
  const getObjId = (obj) => {
    let suffix = "";
    if (isPromise(obj)) {
      const promiseValue = getPromiseValue(obj);
      if (!promiseValue) {
        return null;
      }
      obj = promiseValue.value;
      if (promiseValue.resolved) {
        suffix += "~";
      } else {
        suffix += "_";
      }
    }
    if (isObject(obj)) {
      const target = getProxyTarget(obj);
      if (target) {
        suffix += "!";
        obj = target;
      } else if (isQwikElement(obj)) {
        const elID = getElementID(obj);
        if (elID) {
          return ELEMENT_ID_PREFIX + elID + suffix;
        }
        return null;
      }
    }
    const id = objToId.get(obj);
    if (id) {
      return id + suffix;
    }
    const textId = textNodes == null ? void 0 : textNodes.get(obj);
    if (textId) {
      return "*" + textId;
    }
    if (fallbackGetObjId) {
      return fallbackGetObjId(obj);
    }
    return null;
  };
  const mustGetObjId = (obj) => {
    const key = getObjId(obj);
    if (key === null) {
      throw qError(QError_missingObjectId, obj);
    }
    return key;
  };
  const subsMap = /* @__PURE__ */ new Map();
  for (const obj of objs) {
    const subs2 = (_a2 = getManager(obj, containerState)) == null ? void 0 : _a2.$subs$;
    if (!subs2) {
      continue;
    }
    const flags = getProxyFlags(obj) ?? 0;
    const converted = [];
    if (flags & QObjectRecursive) {
      converted.push(flags);
    }
    for (const sub of subs2) {
      const host = sub[1];
      if (sub[0] === 0 && isNode$1(host) && isVirtualElement(host)) {
        if (!collector.$elements$.includes(tryGetContext(host))) {
          continue;
        }
      }
      converted.push(sub);
    }
    if (converted.length > 0) {
      subsMap.set(obj, converted);
    }
  }
  objs.sort((a, b) => {
    const isProxyA = subsMap.has(a) ? 0 : 1;
    const isProxyB = subsMap.has(b) ? 0 : 1;
    return isProxyA - isProxyB;
  });
  let count = 0;
  for (const obj of objs) {
    objToId.set(obj, intToStr(count));
    count++;
  }
  if (collector.$noSerialize$.length > 0) {
    const undefinedID = objToId.get(void 0);
    for (const obj of collector.$noSerialize$) {
      objToId.set(obj, undefinedID);
    }
  }
  const subs = [];
  for (const obj of objs) {
    const value = subsMap.get(obj);
    if (value == null) {
      break;
    }
    subs.push(value.map((s) => {
      if (typeof s === "number") {
        return `_${s}`;
      }
      return serializeSubscription(s, getObjId);
    }).filter(isNotNullable));
  }
  assertEqual(subs.length, subsMap.size, "missing subscriptions to serialize", subs, subsMap);
  const convertedObjs = objs.map((obj) => {
    if (obj === null) {
      return null;
    }
    const typeObj = typeof obj;
    switch (typeObj) {
      case "undefined":
        return UNDEFINED_PREFIX;
      case "number":
        if (!Number.isFinite(obj)) {
          break;
        }
        return obj;
      case "string":
      case "boolean":
        return obj;
    }
    const value = serializeValue(obj, mustGetObjId, collector, containerState);
    if (value !== void 0) {
      return value;
    }
    if (typeObj === "object") {
      if (isArray(obj)) {
        return obj.map(mustGetObjId);
      }
      if (isSerializableObject(obj)) {
        const output = {};
        for (const key in obj) {
          const id = getObjId(obj[key]);
          if (id !== null) {
            output[key] = id;
          }
        }
        return output;
      }
    }
    throw qError(QError_verifySerializable, obj);
  });
  const meta = {};
  const refs = {};
  for (const ctx of allContexts) {
    const node = ctx.$element$;
    const elementID = ctx.$id$;
    const ref = ctx.$refMap$;
    const props = ctx.$props$;
    const contexts = ctx.$contexts$;
    const tasks = ctx.$tasks$;
    const renderQrl = ctx.$componentQrl$;
    const seq = ctx.$seq$;
    const metaValue = {};
    const elementCaptured = isVirtualElement(node) && collector.$elements$.includes(ctx);
    if (ref.length > 0) {
      const value = mapJoin(ref, mustGetObjId, " ");
      if (value) {
        refs[elementID] = value;
      }
    } else if (canRender) {
      let add = false;
      if (elementCaptured) {
        const propsId = getObjId(props);
        metaValue.h = mustGetObjId(renderQrl) + (propsId ? " " + propsId : "");
        add = true;
      } else {
        const propsId = getObjId(props);
        if (propsId) {
          metaValue.h = " " + propsId;
          add = true;
        }
      }
      if (tasks && tasks.length > 0) {
        const value = mapJoin(tasks, getObjId, " ");
        if (value) {
          metaValue.w = value;
          add = true;
        }
      }
      if (elementCaptured && seq && seq.length > 0) {
        const value = mapJoin(seq, mustGetObjId, " ");
        metaValue.s = value;
        add = true;
      }
      if (contexts) {
        const serializedContexts = [];
        contexts.forEach((value2, key) => {
          const id = getObjId(value2);
          if (id) {
            serializedContexts.push(`${key}=${id}`);
          }
        });
        const value = serializedContexts.join(" ");
        if (value) {
          metaValue.c = value;
          add = true;
        }
      }
      if (add) {
        meta[elementID] = metaValue;
      }
    }
  }
  return {
    state: {
      refs,
      ctx: meta,
      objs: convertedObjs,
      subs
    },
    objs,
    funcs: collector.$inlinedFunctions$,
    resources: collector.$resources$,
    qrls: collector.$qrls$,
    mode: canRender ? "render" : "listeners"
  };
};
const mapJoin = (objects, getObjectId, sep) => {
  let output = "";
  for (const obj of objects) {
    const id = getObjectId(obj);
    if (id !== null) {
      if (output !== "") {
        output += sep;
      }
      output += id;
    }
  }
  return output;
};
const collectProps = (elCtx, collector) => {
  var _a2;
  const parentCtx = elCtx.$parent$;
  const props = elCtx.$props$;
  if (parentCtx && props && !isEmptyObj(props) && collector.$elements$.includes(parentCtx)) {
    const subs = (_a2 = getSubscriptionManager(props)) == null ? void 0 : _a2.$subs$;
    const el = elCtx.$element$;
    if (subs) {
      for (const sub of subs) {
        if (sub[0] === 0) {
          if (sub[1] !== el) {
            collectSubscriptions(getSubscriptionManager(props), collector, false);
          }
          collectElement(sub[1], collector);
        } else {
          collectValue(props, collector, false);
          collectSubscriptions(getSubscriptionManager(props), collector, false);
        }
      }
    }
  }
};
const createCollector = (containerState) => {
  return {
    $containerState$: containerState,
    $seen$: /* @__PURE__ */ new Set(),
    $objSet$: /* @__PURE__ */ new Set(),
    $prefetch$: 0,
    $noSerialize$: [],
    $inlinedFunctions$: [],
    $resources$: [],
    $elements$: [],
    $qrls$: [],
    $deferElements$: [],
    $promises$: []
  };
};
const collectDeferElement = (el, collector) => {
  const ctx = tryGetContext(el);
  if (collector.$elements$.includes(ctx)) {
    return;
  }
  collector.$elements$.push(ctx);
  collector.$prefetch$++;
  if (ctx.$flags$ & HOST_FLAG_DYNAMIC) {
    collectElementData(ctx, collector, true);
  } else {
    collector.$deferElements$.push(ctx);
  }
  collector.$prefetch$--;
};
const collectElement = (el, collector) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    if (collector.$elements$.includes(ctx)) {
      return;
    }
    collector.$elements$.push(ctx);
    collectElementData(ctx, collector, el);
  }
};
const collectElementData = (elCtx, collector, dynamicCtx) => {
  if (elCtx.$props$ && !isEmptyObj(elCtx.$props$)) {
    collectValue(elCtx.$props$, collector, dynamicCtx);
    collectSubscriptions(getSubscriptionManager(elCtx.$props$), collector, dynamicCtx);
  }
  if (elCtx.$componentQrl$) {
    collectValue(elCtx.$componentQrl$, collector, dynamicCtx);
  }
  if (elCtx.$seq$) {
    for (const obj of elCtx.$seq$) {
      collectValue(obj, collector, dynamicCtx);
    }
  }
  if (elCtx.$tasks$) {
    const map = collector.$containerState$.$subsManager$.$groupToManagers$;
    for (const obj of elCtx.$tasks$) {
      if (map.has(obj)) {
        collectValue(obj, collector, dynamicCtx);
      }
    }
  }
  if (dynamicCtx === true) {
    collectContext(elCtx, collector);
    if (elCtx.$dynamicSlots$) {
      for (const slotCtx of elCtx.$dynamicSlots$) {
        collectContext(slotCtx, collector);
      }
    }
  }
};
const collectContext = (elCtx, collector) => {
  while (elCtx) {
    if (elCtx.$contexts$) {
      for (const obj of elCtx.$contexts$.values()) {
        collectValue(obj, collector, true);
      }
      if (elCtx.$contexts$.get("_") === true) {
        break;
      }
    }
    elCtx = elCtx.$slotParent$ ?? elCtx.$parent$;
  }
};
const collectSubscriptions = (manager, collector, leaks) => {
  if (collector.$seen$.has(manager)) {
    return;
  }
  collector.$seen$.add(manager);
  const subs = manager.$subs$;
  for (const key of subs) {
    const type = key[0];
    if (type > 0) {
      collectValue(key[2], collector, leaks);
    }
    if (leaks === true) {
      const host = key[1];
      if (isNode$1(host) && isVirtualElement(host)) {
        if (type === 0) {
          collectDeferElement(host, collector);
        }
      } else {
        collectValue(host, collector, true);
      }
    }
  }
};
const PROMISE_VALUE = Symbol();
const resolvePromise = (promise) => {
  return promise.then((value) => {
    const v = {
      resolved: true,
      value
    };
    promise[PROMISE_VALUE] = v;
    return value;
  }, (value) => {
    const v = {
      resolved: false,
      value
    };
    promise[PROMISE_VALUE] = v;
    return value;
  });
};
const getPromiseValue = (promise) => {
  return promise[PROMISE_VALUE];
};
const collectValue = (obj, collector, leaks) => {
  if (obj !== null) {
    const objType = typeof obj;
    switch (objType) {
      case "function":
      case "object": {
        const seen = collector.$seen$;
        if (seen.has(obj)) {
          return;
        }
        seen.add(obj);
        if (fastSkipSerialize(obj)) {
          collector.$objSet$.add(void 0);
          collector.$noSerialize$.push(obj);
          return;
        }
        const input = obj;
        const target = getProxyTarget(obj);
        if (target) {
          obj = target;
          if (seen.has(obj)) {
            return;
          }
          seen.add(obj);
          const mutable = (getProxyFlags(obj) & QObjectImmutable) === 0;
          if (leaks && mutable) {
            collectSubscriptions(getSubscriptionManager(input), collector, leaks);
          }
          if (fastWeakSerialize(input)) {
            collector.$objSet$.add(obj);
            return;
          }
        }
        const collected = collectDeps(obj, collector, leaks);
        if (collected) {
          collector.$objSet$.add(obj);
          return;
        }
        if (isPromise(obj)) {
          collector.$promises$.push(resolvePromise(obj).then((value) => {
            collectValue(value, collector, leaks);
          }));
          return;
        }
        if (objType === "object") {
          if (isNode$1(obj)) {
            return;
          }
          if (isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
              collectValue(input[i], collector, leaks);
            }
          } else if (isSerializableObject(obj)) {
            for (const key in obj) {
              collectValue(input[key], collector, leaks);
            }
          }
        }
        break;
      }
      case "string": {
        if (collector.$seen$.has(obj)) {
          return;
        }
      }
    }
  }
  collector.$objSet$.add(obj);
};
const getManager = (obj, containerState) => {
  if (!isObject(obj)) {
    return void 0;
  }
  if (obj instanceof SignalImpl) {
    return getSubscriptionManager(obj);
  }
  const proxy = containerState.$proxyMap$.get(obj);
  if (proxy) {
    return getSubscriptionManager(proxy);
  }
  return void 0;
};
const getQId = (el) => {
  const ctx = tryGetContext(el);
  if (ctx) {
    return ctx.$id$;
  }
  return null;
};
const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};
const inlinedQrl = (symbol, symbolName, lexicalScopeCapture = EMPTY_ARRAY) => {
  return createQRL(null, symbolName, symbol, null, null, lexicalScopeCapture, null);
};
const _noopQrl = (symbolName, lexicalScopeCapture = EMPTY_ARRAY) => {
  return createQRL(null, symbolName, null, null, null, lexicalScopeCapture, null);
};
const serializeQRL = (qrl, opts = {}) => {
  let symbol = qrl.$symbol$;
  let chunk = qrl.$chunk$;
  const refSymbol = qrl.$refSymbol$ ?? symbol;
  const platform = getPlatform();
  if (platform) {
    const result = platform.chunkForSymbol(refSymbol, chunk);
    if (result) {
      chunk = result[1];
      if (!qrl.$refSymbol$) {
        symbol = result[0];
      }
    }
  }
  if (qRuntimeQrl && !chunk) {
    chunk = "/runtimeQRL";
    symbol = "_";
  }
  if (!chunk) {
    throw qError(QError_qrlMissingChunk, qrl.$symbol$);
  }
  if (chunk.startsWith("./")) {
    chunk = chunk.slice(2);
  }
  let output = `${chunk}#${symbol}`;
  const capture = qrl.$capture$;
  const captureRef = qrl.$captureRef$;
  if (captureRef && captureRef.length) {
    if (opts.$getObjId$) {
      output += `[${mapJoin(captureRef, opts.$getObjId$, " ")}]`;
    } else if (opts.$addRefMap$) {
      output += `[${mapJoin(captureRef, opts.$addRefMap$, " ")}]`;
    }
  } else if (capture && capture.length > 0) {
    output += `[${capture.join(" ")}]`;
  }
  return output;
};
const serializeQRLs = (existingQRLs, elCtx) => {
  assertElement(elCtx.$element$);
  const opts = {
    $addRefMap$: (obj) => addToArray(elCtx.$refMap$, obj)
  };
  return mapJoin(existingQRLs, (qrl) => serializeQRL(qrl, opts), "\n");
};
const parseQRL = (qrl, containerEl) => {
  const endIdx = qrl.length;
  const hashIdx = indexOf(qrl, 0, "#");
  const captureIdx = indexOf(qrl, hashIdx, "[");
  const chunkEndIdx = Math.min(hashIdx, captureIdx);
  const chunk = qrl.substring(0, chunkEndIdx);
  const symbolStartIdx = hashIdx == endIdx ? hashIdx : hashIdx + 1;
  const symbolEndIdx = captureIdx;
  const symbol = symbolStartIdx == symbolEndIdx ? "default" : qrl.substring(symbolStartIdx, symbolEndIdx);
  const captureStartIdx = captureIdx;
  const captureEndIdx = endIdx;
  const capture = captureStartIdx === captureEndIdx ? EMPTY_ARRAY : qrl.substring(captureStartIdx + 1, captureEndIdx - 1).split(" ");
  const iQrl = createQRL(chunk, symbol, null, null, capture, null, null);
  if (containerEl) {
    iQrl.$setContainer$(containerEl);
  }
  return iQrl;
};
const indexOf = (text, startIdx, char) => {
  const endIdx = text.length;
  const charIdx = text.indexOf(char, startIdx == endIdx ? 0 : startIdx);
  return charIdx == -1 ? endIdx : charIdx;
};
const addToArray = (array, obj) => {
  const index2 = array.indexOf(obj);
  if (index2 === -1) {
    array.push(obj);
    return String(array.length - 1);
  }
  return String(index2);
};
const inflateQrl = (qrl, elCtx) => {
  assertDefined(qrl.$capture$, "invoke: qrl capture must be defined inside useLexicalScope()", qrl);
  return qrl.$captureRef$ = qrl.$capture$.map((idx) => {
    const int = parseInt(idx, 10);
    const obj = elCtx.$refMap$[int];
    assertTrue(elCtx.$refMap$.length > int, "out of bounds inflate access", idx);
    return obj;
  });
};
const _createResourceReturn = (opts) => {
  const resource = {
    __brand: "resource",
    value: void 0,
    loading: isServerPlatform() ? false : true,
    _resolved: void 0,
    _error: void 0,
    _state: "pending",
    _timeout: (opts == null ? void 0 : opts.timeout) ?? -1,
    _cache: 0
  };
  return resource;
};
const isResourceReturn = (obj) => {
  return isObject(obj) && obj.__brand === "resource";
};
const serializeResource = (resource, getObjId) => {
  const state = resource._state;
  if (state === "resolved") {
    return `0 ${getObjId(resource._resolved)}`;
  } else if (state === "pending") {
    return `1`;
  } else {
    return `2 ${getObjId(resource._error)}`;
  }
};
const parseResourceReturn = (data) => {
  const [first, id] = data.split(" ");
  const result = _createResourceReturn(void 0);
  result.value = Promise.resolve();
  if (first === "0") {
    result._state = "resolved";
    result._resolved = id;
    result.loading = false;
  } else if (first === "1") {
    result._state = "pending";
    result.value = new Promise(() => {
    });
    result.loading = true;
  } else if (first === "2") {
    result._state = "rejected";
    result._error = id;
    result.loading = false;
  }
  return result;
};
const Slot = (props) => {
  return _jsxC(Virtual, {
    [QSlotS]: ""
  }, 0, props.name ?? "");
};
const UNDEFINED_PREFIX = "";
const QRLSerializer = {
  $prefix$: "",
  $test$: (v) => isQrl(v),
  $collect$: (v, collector, leaks) => {
    if (v.$captureRef$) {
      for (const item of v.$captureRef$) {
        collectValue(item, collector, leaks);
      }
    }
    if (collector.$prefetch$ === 0) {
      collector.$qrls$.push(v);
    }
  },
  $serialize$: (obj, getObjId) => {
    return serializeQRL(obj, {
      $getObjId$: getObjId
    });
  },
  $prepare$: (data, containerState) => {
    return parseQRL(data, containerState.$containerEl$);
  },
  $fill$: (qrl, getObject) => {
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
};
const TaskSerializer = {
  $prefix$: "",
  $test$: (v) => isSubscriberDescriptor(v),
  $collect$: (v, collector, leaks) => {
    collectValue(v.$qrl$, collector, leaks);
    if (v.$state$) {
      collectValue(v.$state$, collector, leaks);
      if (leaks === true && v.$state$ instanceof SignalImpl) {
        collectSubscriptions(v.$state$[QObjectManagerSymbol], collector, true);
      }
    }
  },
  $serialize$: (obj, getObjId) => serializeTask(obj, getObjId),
  $prepare$: (data) => parseTask(data),
  $fill$: (task, getObject) => {
    task.$el$ = getObject(task.$el$);
    task.$qrl$ = getObject(task.$qrl$);
    if (task.$state$) {
      task.$state$ = getObject(task.$state$);
    }
  }
};
const ResourceSerializer = {
  $prefix$: "",
  $test$: (v) => isResourceReturn(v),
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.value, collector, leaks);
    collectValue(obj._resolved, collector, leaks);
  },
  $serialize$: (obj, getObjId) => {
    return serializeResource(obj, getObjId);
  },
  $prepare$: (data) => {
    return parseResourceReturn(data);
  },
  $fill$: (resource, getObject) => {
    if (resource._state === "resolved") {
      resource._resolved = getObject(resource._resolved);
      resource.value = Promise.resolve(resource._resolved);
    } else if (resource._state === "rejected") {
      const p = Promise.reject(resource._error);
      p.catch(() => null);
      resource._error = getObject(resource._error);
      resource.value = p;
    }
  }
};
const URLSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof URL,
  $serialize$: (obj) => obj.href,
  $prepare$: (data) => new URL(data),
  $fill$: void 0
};
const DateSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof Date,
  $serialize$: (obj) => obj.toISOString(),
  $prepare$: (data) => new Date(data),
  $fill$: void 0
};
const RegexSerializer = {
  $prefix$: "\x07",
  $test$: (v) => v instanceof RegExp,
  $serialize$: (obj) => `${obj.flags} ${obj.source}`,
  $prepare$: (data) => {
    const space = data.indexOf(" ");
    const source = data.slice(space + 1);
    const flags = data.slice(0, space);
    return new RegExp(source, flags);
  },
  $fill$: void 0
};
const ErrorSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof Error,
  $serialize$: (obj) => {
    return obj.message;
  },
  $prepare$: (text) => {
    const err = new Error(text);
    err.stack = void 0;
    return err;
  },
  $fill$: void 0
};
const DocumentSerializer = {
  $prefix$: "",
  $test$: (v) => isDocument(v),
  $serialize$: void 0,
  $prepare$: (_, _c, doc) => {
    return doc;
  },
  $fill$: void 0
};
const SERIALIZABLE_STATE = Symbol("serializable-data");
const ComponentSerializer = {
  $prefix$: "",
  $test$: (obj) => isQwikComponent(obj),
  $serialize$: (obj, getObjId) => {
    const [qrl] = obj[SERIALIZABLE_STATE];
    return serializeQRL(qrl, {
      $getObjId$: getObjId
    });
  },
  $prepare$: (data, containerState) => {
    const qrl = parseQRL(data, containerState.$containerEl$);
    return componentQrl(qrl);
  },
  $fill$: (component, getObject) => {
    const [qrl] = component[SERIALIZABLE_STATE];
    if (qrl.$capture$ && qrl.$capture$.length > 0) {
      qrl.$captureRef$ = qrl.$capture$.map(getObject);
      qrl.$capture$ = null;
    }
  }
};
const DerivedSignalSerializer = {
  $prefix$: "",
  $test$: (obj) => obj instanceof SignalDerived,
  $collect$: (obj, collector, leaks) => {
    if (obj.$args$) {
      for (const arg of obj.$args$) {
        collectValue(arg, collector, leaks);
      }
    }
  },
  $serialize$: (signal, getObjID, collector) => {
    const serialized = serializeDerivedSignalFunc(signal);
    let index2 = collector.$inlinedFunctions$.indexOf(serialized);
    if (index2 < 0) {
      collector.$inlinedFunctions$.push(serialized);
      index2 = collector.$inlinedFunctions$.length - 1;
    }
    return mapJoin(signal.$args$, getObjID, " ") + " @" + intToStr(index2);
  },
  $prepare$: (data) => {
    const ids = data.split(" ");
    const args = ids.slice(0, -1);
    const fn = ids[ids.length - 1];
    return new SignalDerived(fn, args, fn);
  },
  $fill$: (fn, getObject) => {
    assertString(fn.$func$);
    fn.$func$ = getObject(fn.$func$);
    fn.$args$ = fn.$args$.map(getObject);
  }
};
const SignalSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof SignalImpl,
  $collect$: (obj, collector, leaks) => {
    collectValue(obj.untrackedValue, collector, leaks);
    const mutable = (obj[QObjectSignalFlags] & SIGNAL_IMMUTABLE) === 0;
    if (leaks === true && mutable) {
      collectSubscriptions(obj[QObjectManagerSymbol], collector, true);
    }
    return obj;
  },
  $serialize$: (obj, getObjId) => {
    return getObjId(obj.untrackedValue);
  },
  $prepare$: (data, containerState) => {
    var _a2;
    return new SignalImpl(data, (_a2 = containerState == null ? void 0 : containerState.$subsManager$) == null ? void 0 : _a2.$createManager$(), 0);
  },
  $subs$: (signal, subs) => {
    signal[QObjectManagerSymbol].$addSubs$(subs);
  },
  $fill$: (signal, getObject) => {
    signal.untrackedValue = getObject(signal.untrackedValue);
  }
};
const SignalWrapperSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof SignalWrapper,
  $collect$(obj, collector, leaks) {
    collectValue(obj.ref, collector, leaks);
    if (fastWeakSerialize(obj.ref)) {
      const localManager = getSubscriptionManager(obj.ref);
      if (isTreeShakeable(collector.$containerState$.$subsManager$, localManager, leaks)) {
        collectValue(obj.ref[obj.prop], collector, leaks);
      }
    }
    return obj;
  },
  $serialize$: (obj, getObjId) => {
    return `${getObjId(obj.ref)} ${obj.prop}`;
  },
  $prepare$: (data) => {
    const [id, prop] = data.split(" ");
    return new SignalWrapper(id, prop);
  },
  $fill$: (signal, getObject) => {
    signal.ref = getObject(signal.ref);
  }
};
const NoFiniteNumberSerializer = {
  $prefix$: "",
  $test$: (v) => typeof v === "number",
  $serialize$: (v) => {
    return String(v);
  },
  $prepare$: (data) => {
    return Number(data);
  },
  $fill$: void 0
};
const URLSearchParamsSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof URLSearchParams,
  $serialize$: (obj) => obj.toString(),
  $prepare$: (data) => new URLSearchParams(data),
  $fill$: void 0
};
const FormDataSerializer = {
  $prefix$: "",
  $test$: (v) => typeof FormData !== "undefined" && v instanceof globalThis.FormData,
  $serialize$: (formData) => {
    const array = [];
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        array.push([key, value]);
      } else {
        array.push([key, value.name]);
      }
    });
    return JSON.stringify(array);
  },
  $prepare$: (data) => {
    const array = JSON.parse(data);
    const formData = new FormData();
    for (const [key, value] of array) {
      formData.append(key, value);
    }
    return formData;
  },
  $fill$: void 0
};
const JSXNodeSerializer = {
  $prefix$: "",
  $test$: (v) => isJSXNode(v),
  $collect$: (node, collector, leaks) => {
    collectValue(node.children, collector, leaks);
    collectValue(node.props, collector, leaks);
    collectValue(node.immutableProps, collector, leaks);
    let type = node.type;
    if (type === Slot) {
      type = ":slot";
    } else if (type === Fragment) {
      type = ":fragment";
    }
    collectValue(type, collector, leaks);
  },
  $serialize$: (node, getObjID) => {
    let type = node.type;
    if (type === Slot) {
      type = ":slot";
    } else if (type === Fragment) {
      type = ":fragment";
    }
    return `${getObjID(type)} ${getObjID(node.props)} ${getObjID(node.immutableProps)} ${getObjID(node.children)} ${node.flags}`;
  },
  $prepare$: (data) => {
    const [type, props, immutableProps, children, flags] = data.split(" ");
    const node = new JSXNodeImpl(type, props, immutableProps, children, parseInt(flags, 10));
    return node;
  },
  $fill$: (node, getObject) => {
    node.type = getResolveJSXType(getObject(node.type));
    node.props = getObject(node.props);
    node.immutableProps = getObject(node.immutableProps);
    node.children = getObject(node.children);
  }
};
const BigIntSerializer = {
  $prefix$: "",
  $test$: (v) => typeof v === "bigint",
  $serialize$: (v) => {
    return v.toString();
  },
  $prepare$: (data) => {
    return BigInt(data);
  },
  $fill$: void 0
};
const DATA = Symbol();
const SetSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof Set,
  $collect$: (set, collector, leaks) => {
    set.forEach((value) => collectValue(value, collector, leaks));
  },
  $serialize$: (v, getObjID) => {
    return Array.from(v).map(getObjID).join(" ");
  },
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Set();
    set[DATA] = data;
    return set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    for (const id of data.split(" ")) {
      set.add(getObject(id));
    }
  }
};
const MapSerializer = {
  $prefix$: "",
  $test$: (v) => v instanceof Map,
  $collect$: (map, collector, leaks) => {
    map.forEach((value, key) => {
      collectValue(value, collector, leaks);
      collectValue(key, collector, leaks);
    });
  },
  $serialize$: (map, getObjID) => {
    const result = [];
    map.forEach((value, key) => {
      result.push(getObjID(key) + " " + getObjID(value));
    });
    return result.join(" ");
  },
  $prepare$: (data) => {
    const set = /* @__PURE__ */ new Map();
    set[DATA] = data;
    return set;
  },
  $fill$: (set, getObject) => {
    const data = set[DATA];
    set[DATA] = void 0;
    const items = data.split(" ");
    assertTrue(items.length % 2 === 0);
    for (let i = 0; i < items.length; i += 2) {
      set.set(getObject(items[i]), getObject(items[i + 1]));
    }
  }
};
const serializers = [
  QRLSerializer,
  SignalSerializer,
  SignalWrapperSerializer,
  TaskSerializer,
  ResourceSerializer,
  URLSerializer,
  DateSerializer,
  RegexSerializer,
  ErrorSerializer,
  DerivedSignalSerializer,
  FormDataSerializer,
  URLSearchParamsSerializer,
  ComponentSerializer,
  NoFiniteNumberSerializer,
  JSXNodeSerializer,
  BigIntSerializer,
  SetSerializer,
  MapSerializer,
  DocumentSerializer
  ///////// \u000F
];
const collectorSerializers = /* @__PURE__ */ serializers.filter((a) => a.$collect$);
const canSerialize = (obj) => {
  for (const s of serializers) {
    if (s.$test$(obj)) {
      return true;
    }
  }
  return false;
};
const collectDeps = (obj, collector, leaks) => {
  for (const s of collectorSerializers) {
    if (s.$test$(obj)) {
      s.$collect$(obj, collector, leaks);
      return true;
    }
  }
  return false;
};
const serializeValue = (obj, getObjID, collector, containerState) => {
  for (const s of serializers) {
    if (s.$test$(obj)) {
      let value = s.$prefix$;
      if (s.$serialize$) {
        value += s.$serialize$(obj, getObjID, collector, containerState);
      }
      return value;
    }
  }
  return void 0;
};
const createParser = (containerState, doc) => {
  const fillMap = /* @__PURE__ */ new Map();
  const subsMap = /* @__PURE__ */ new Map();
  return {
    prepare(data) {
      for (const s of serializers) {
        const prefix = s.$prefix$;
        if (data.startsWith(prefix)) {
          const value = s.$prepare$(data.slice(prefix.length), containerState, doc);
          if (s.$fill$) {
            fillMap.set(value, s);
          }
          if (s.$subs$) {
            subsMap.set(value, s);
          }
          return value;
        }
      }
      return data;
    },
    subs(obj, subs) {
      const serializer = subsMap.get(obj);
      if (serializer) {
        serializer.$subs$(obj, subs, containerState);
        return true;
      }
      return false;
    },
    fill(obj, getObject) {
      const serializer = fillMap.get(obj);
      if (serializer) {
        serializer.$fill$(obj, getObject, containerState);
        return true;
      }
      return false;
    }
  };
};
const OBJECT_TRANSFORMS = {
  "!": (obj, containerState) => {
    return containerState.$proxyMap$.get(obj) ?? getOrCreateProxy(obj, containerState);
  },
  "~": (obj) => {
    return Promise.resolve(obj);
  },
  _: (obj) => {
    return Promise.reject(obj);
  }
};
const isTreeShakeable = (manager, target, leaks) => {
  if (typeof leaks === "boolean") {
    return leaks;
  }
  const localManager = manager.$groupToManagers$.get(leaks);
  if (localManager && localManager.length > 0) {
    if (localManager.length === 1) {
      return localManager[0] !== target;
    }
    return true;
  }
  return false;
};
const getResolveJSXType = (type) => {
  if (type === ":slot") {
    return Slot;
  }
  if (type === ":fragment") {
    return Fragment;
  }
  return type;
};
const verifySerializable = (value, preMessage) => {
  const seen = /* @__PURE__ */ new Set();
  return _verifySerializable(value, seen, "_", preMessage);
};
const _verifySerializable = (value, seen, ctx, preMessage) => {
  const unwrapped = unwrapProxy(value);
  if (unwrapped == null) {
    return value;
  }
  if (shouldSerialize(unwrapped)) {
    if (seen.has(unwrapped)) {
      return value;
    }
    seen.add(unwrapped);
    if (canSerialize(unwrapped)) {
      return value;
    }
    const typeObj = typeof unwrapped;
    switch (typeObj) {
      case "object":
        if (isPromise(unwrapped)) {
          return value;
        }
        if (isNode$1(unwrapped)) {
          return value;
        }
        if (isArray(unwrapped)) {
          let expectIndex = 0;
          unwrapped.forEach((v, i) => {
            if (i !== expectIndex) {
              throw qError(QError_verifySerializable, unwrapped);
            }
            _verifySerializable(v, seen, ctx + "[" + i + "]");
            expectIndex = i + 1;
          });
          return value;
        }
        if (isSerializableObject(unwrapped)) {
          for (const [key, item] of Object.entries(unwrapped)) {
            _verifySerializable(item, seen, ctx + "." + key);
          }
          return value;
        }
        break;
      case "boolean":
      case "string":
      case "number":
        return value;
    }
    let message = "";
    if (preMessage) {
      message = preMessage;
    } else {
      message = "Value cannot be serialized";
    }
    if (ctx !== "_") {
      message += ` in ${ctx},`;
    }
    if (typeObj === "object") {
      message += ` because it's an instance of "${value == null ? void 0 : value.constructor.name}". You might need to use 'noSerialize()' or use an object literal instead. Check out https://qwik.builder.io/docs/advanced/dollar/`;
    } else if (typeObj === "function") {
      const fnName = value.name;
      message += ` because it's a function named "${fnName}". You might need to convert it to a QRL using $(fn):

const ${fnName} = $(${String(value)});

Please check out https://qwik.builder.io/docs/advanced/qrl/ for more information.`;
    }
    console.error("Trying to serialize", value);
    throw createError(message);
  }
  return value;
};
const noSerializeSet = /* @__PURE__ */ new WeakSet();
const weakSerializeSet = /* @__PURE__ */ new WeakSet();
const shouldSerialize = (obj) => {
  if (isObject(obj) || isFunction(obj)) {
    return !noSerializeSet.has(obj);
  }
  return true;
};
const fastSkipSerialize = (obj) => {
  return noSerializeSet.has(obj);
};
const fastWeakSerialize = (obj) => {
  return weakSerializeSet.has(obj);
};
const noSerialize = (input) => {
  if (input != null) {
    noSerializeSet.add(input);
  }
  return input;
};
const _weakSerialize = (input) => {
  weakSerializeSet.add(input);
  return input;
};
const unwrapProxy = (proxy) => {
  return isObject(proxy) ? getProxyTarget(proxy) ?? proxy : proxy;
};
const getProxyTarget = (obj) => {
  return obj[QOjectTargetSymbol];
};
const getSubscriptionManager = (obj) => {
  return obj[QObjectManagerSymbol];
};
const getProxyFlags = (obj) => {
  return obj[QObjectFlagsSymbol];
};
const serializeSubscription = (sub, getObjId) => {
  const type = sub[0];
  const host = typeof sub[1] === "string" ? sub[1] : getObjId(sub[1]);
  if (!host) {
    return void 0;
  }
  let base = type + " " + host;
  let key;
  if (type === 0) {
    key = sub[2];
  } else {
    const signalID = getObjId(sub[2]);
    if (!signalID) {
      return void 0;
    }
    if (type <= 2) {
      key = sub[5];
      base += ` ${signalID} ${must(getObjId(sub[3]))} ${sub[4]}`;
    } else if (type <= 4) {
      key = sub[4];
      const nodeID = typeof sub[3] === "string" ? sub[3] : must(getObjId(sub[3]));
      base += ` ${signalID} ${nodeID}`;
    } else
      ;
  }
  if (key) {
    base += ` ${encodeURI(key)}`;
  }
  return base;
};
const parseSubscription = (sub, getObject) => {
  const parts = sub.split(" ");
  const type = parseInt(parts[0], 10);
  assertTrue(parts.length >= 2);
  const host = getObject(parts[1]);
  if (!host) {
    return void 0;
  }
  if (isSubscriberDescriptor(host) && !host.$el$) {
    return void 0;
  }
  const subscription = [type, host];
  if (type === 0) {
    assertTrue(parts.length <= 3);
    subscription.push(safeDecode(parts[2]));
  } else if (type <= 2) {
    assertTrue(parts.length === 5 || parts.length === 6);
    subscription.push(getObject(parts[2]), getObject(parts[3]), parts[4], safeDecode(parts[5]));
  } else if (type <= 4) {
    assertTrue(parts.length === 4 || parts.length === 5);
    subscription.push(getObject(parts[2]), getObject(parts[3]), safeDecode(parts[4]));
  }
  return subscription;
};
const safeDecode = (str) => {
  if (str !== void 0) {
    return decodeURI(str);
  }
  return void 0;
};
const createSubscriptionManager = (containerState) => {
  const groupToManagers = /* @__PURE__ */ new Map();
  const manager = {
    $groupToManagers$: groupToManagers,
    $createManager$: (initialMap) => {
      return new LocalSubscriptionManager(groupToManagers, containerState, initialMap);
    },
    $clearSub$: (group) => {
      const managers = groupToManagers.get(group);
      if (managers) {
        for (const manager2 of managers) {
          manager2.$unsubGroup$(group);
        }
        groupToManagers.delete(group);
        managers.length = 0;
      }
    },
    $clearSignal$: (signal) => {
      const managers = groupToManagers.get(signal[1]);
      if (managers) {
        for (const manager2 of managers) {
          manager2.$unsubEntry$(signal);
        }
      }
    }
  };
  return manager;
};
class LocalSubscriptionManager {
  constructor($groupToManagers$, $containerState$, initialMap) {
    this.$groupToManagers$ = $groupToManagers$;
    this.$containerState$ = $containerState$;
    this.$subs$ = [];
    if (initialMap) {
      this.$addSubs$(initialMap);
    }
  }
  $addSubs$(subs) {
    this.$subs$.push(...subs);
    for (const sub of this.$subs$) {
      this.$addToGroup$(sub[1], this);
    }
  }
  $addToGroup$(group, manager) {
    let managers = this.$groupToManagers$.get(group);
    if (!managers) {
      this.$groupToManagers$.set(group, managers = []);
    }
    if (!managers.includes(manager)) {
      managers.push(manager);
    }
  }
  $unsubGroup$(group) {
    const subs = this.$subs$;
    for (let i = 0; i < subs.length; i++) {
      const found = subs[i][1] === group;
      if (found) {
        subs.splice(i, 1);
        i--;
      }
    }
  }
  $unsubEntry$(entry) {
    const [type, group, signal, elm] = entry;
    const subs = this.$subs$;
    if (type === 1 || type === 2) {
      const prop = entry[4];
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        const match = sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm && sub[4] === prop;
        if (match) {
          subs.splice(i, 1);
          i--;
        }
      }
    } else if (type === 3 || type === 4) {
      for (let i = 0; i < subs.length; i++) {
        const sub = subs[i];
        const match = sub[0] === type && sub[1] === group && sub[2] === signal && sub[3] === elm;
        if (match) {
          subs.splice(i, 1);
          i--;
        }
      }
    }
  }
  $addSub$(sub, key) {
    const subs = this.$subs$;
    const group = sub[1];
    if (sub[0] === 0 && subs.some(([_type, _group, _key]) => _type === 0 && _group === group && _key === key)) {
      return;
    }
    subs.push([...sub, key]);
    this.$addToGroup$(group, this);
  }
  $notifySubs$(key) {
    const subs = this.$subs$;
    for (const sub of subs) {
      const compare = sub[sub.length - 1];
      if (key && compare && compare !== key) {
        continue;
      }
      notifyChange(sub, this.$containerState$);
    }
  }
}
const must = (a) => {
  if (a == null) {
    throw logError("must be non null", a);
  }
  return a;
};
const isQrl = (value) => {
  return typeof value === "function" && typeof value.getSymbol === "function";
};
const createQRL = (chunk, symbol, symbolRef, symbolFn, capture, captureRef, refSymbol) => {
  let _containerEl;
  const setContainer = (el) => {
    if (!_containerEl) {
      _containerEl = el;
    }
    return _containerEl;
  };
  const resolve = async (containerEl) => {
    if (containerEl) {
      setContainer(containerEl);
    }
    if (symbolRef !== null) {
      return symbolRef;
    }
    if (symbolFn !== null) {
      return symbolRef = symbolFn().then((module) => symbolRef = module[symbol]);
    } else {
      const symbol2 = getPlatform().importSymbol(_containerEl, chunk, symbol);
      return symbolRef = then(symbol2, (ref) => {
        return symbolRef = ref;
      });
    }
  };
  const resolveLazy = (containerEl) => {
    return symbolRef !== null ? symbolRef : resolve(containerEl);
  };
  function invokeFn(currentCtx, beforeFn) {
    return (...args) => {
      const start = now();
      const fn = resolveLazy();
      return then(fn, (fn2) => {
        if (isFunction(fn2)) {
          if (beforeFn && beforeFn() === false) {
            return;
          }
          const baseContext = createOrReuseInvocationContext(currentCtx);
          const context = {
            ...baseContext,
            $qrl$: QRL
          };
          if (context.$event$ === void 0) {
            context.$event$ = this;
          }
          emitUsedSymbol(symbol, context.$element$, start);
          return invoke.call(this, context, fn2, ...args);
        }
        throw qError(QError_qrlIsNotFunction);
      });
    };
  }
  const createOrReuseInvocationContext = (invoke2) => {
    if (invoke2 == null) {
      return newInvokeContext();
    } else if (isArray(invoke2)) {
      return newInvokeContextFromTuple(invoke2);
    } else {
      return invoke2;
    }
  };
  const invokeQRL = async function(...args) {
    const fn = invokeFn.call(this, tryGetInvokeContext());
    const result = await fn(...args);
    return result;
  };
  const resolvedSymbol = refSymbol ?? symbol;
  const hash = getSymbolHash(resolvedSymbol);
  const QRL = invokeQRL;
  const methods = {
    getSymbol: () => resolvedSymbol,
    getHash: () => hash,
    getCaptured: () => captureRef,
    resolve,
    $resolveLazy$: resolveLazy,
    $setContainer$: setContainer,
    $chunk$: chunk,
    $symbol$: symbol,
    $refSymbol$: refSymbol,
    $hash$: hash,
    getFn: invokeFn,
    $capture$: capture,
    $captureRef$: captureRef,
    dev: null
  };
  const qrl = Object.assign(invokeQRL, methods);
  return qrl;
};
const getSymbolHash = (symbolName) => {
  const index2 = symbolName.lastIndexOf("_");
  if (index2 > -1) {
    return symbolName.slice(index2 + 1);
  }
  return symbolName;
};
function assertQrl(qrl) {
}
function assertSignal(obj) {
}
const EMITTED = /* @__PURE__ */ new Set();
const emitUsedSymbol = (symbol, element, reqTime) => {
  if (!EMITTED.has(symbol)) {
    EMITTED.add(symbol);
    emitEvent("qsymbol", {
      symbol,
      element,
      reqTime
    });
  }
};
const emitEvent = (eventName, detail) => {
  if (!qTest && !isServerPlatform() && typeof document === "object") {
    document.dispatchEvent(new CustomEvent(eventName, {
      bubbles: false,
      detail
    }));
  }
};
const now = () => {
  if (qTest || isServerPlatform()) {
    return 0;
  }
  if (typeof performance === "object") {
    return performance.now();
  }
  return 0;
};
let runtimeSymbolId = 0;
const $ = (expression) => {
  if (!qRuntimeQrl && qDev) {
    throw new Error("Optimizer should replace all usages of $() with some special syntax. If you need to create a QRL manually, use inlinedQrl() instead.");
  }
  return createQRL(null, "s" + runtimeSymbolId++, expression, null, null, null, null);
};
const eventQrl = (qrl) => {
  return qrl;
};
const componentQrl = (componentQrl2) => {
  function QwikComponent(props, key, flags) {
    const hash = qTest ? "sX" : componentQrl2.$hash$.slice(0, 4);
    const finalKey = hash + ":" + (key ? key : "");
    return _jsxC(Virtual, {
      [OnRenderProp]: componentQrl2,
      [QSlot]: props[QSlot],
      [_IMMUTABLE]: props[_IMMUTABLE],
      children: props.children,
      props
    }, flags, finalKey);
  }
  QwikComponent[SERIALIZABLE_STATE] = [componentQrl2];
  return QwikComponent;
};
const isQwikComponent = (component) => {
  return typeof component == "function" && component[SERIALIZABLE_STATE] !== void 0;
};
const useStore = (initialState, opts) => {
  const { get, set, iCtx } = useSequentialScope();
  if (get != null) {
    return get;
  }
  const value = isFunction(initialState) ? invoke(void 0, initialState) : initialState;
  if ((opts == null ? void 0 : opts.reactive) === false) {
    set(value);
    return value;
  } else {
    const containerState = iCtx.$renderCtx$.$static$.$containerState$;
    const recursive = (opts == null ? void 0 : opts.deep) ?? true;
    const flags = recursive ? QObjectRecursive : 0;
    const newStore = getOrCreateProxy(value, containerState, flags);
    set(newStore);
    return newStore;
  }
};
function useServerData(key, defaultValue) {
  var _a2;
  const ctx = tryGetInvokeContext();
  return ((_a2 = ctx == null ? void 0 : ctx.$renderCtx$) == null ? void 0 : _a2.$static$.$containerState$.$serverData$[key]) ?? defaultValue;
}
const useStylesQrl = (styles) => {
  _useStyles(styles, (str) => str, false);
};
const _useStyles = (styleQrl, transform, scoped) => {
  const { get, set, iCtx, i, elCtx } = useSequentialScope();
  if (get) {
    return get;
  }
  const styleId = styleKey(styleQrl, i);
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  set(styleId);
  if (!elCtx.$appendStyles$) {
    elCtx.$appendStyles$ = [];
  }
  if (!elCtx.$scopeIds$) {
    elCtx.$scopeIds$ = [];
  }
  if (scoped) {
    elCtx.$scopeIds$.push(styleContent(styleId));
  }
  if (containerState.$styleIds$.has(styleId)) {
    return styleId;
  }
  containerState.$styleIds$.add(styleId);
  const value = styleQrl.$resolveLazy$(containerState.$containerEl$);
  const appendStyle = (styleText) => {
    assertDefined(elCtx.$appendStyles$);
    elCtx.$appendStyles$.push({
      styleId,
      content: transform(styleText, styleId)
    });
  };
  if (isPromise(value)) {
    iCtx.$waitOn$.push(value.then(appendStyle));
  } else {
    appendStyle(value);
  }
  return styleId;
};
const useSignal = (initialState) => {
  const { get, set, iCtx } = useSequentialScope();
  if (get != null) {
    return get;
  }
  const containerState = iCtx.$renderCtx$.$static$.$containerState$;
  const value = isFunction(initialState) && !isQwikComponent(initialState) ? invoke(void 0, initialState) : initialState;
  const signal = _createSignal(value, containerState, 0, void 0);
  return set(signal);
};
const onGet$2 = async ({ query, json, url, pathname, redirect }) => {
  const event = query.get("event") || "";
  const path = pathname || "";
  console.log("searchParams: ", url);
  if (event === "test")
    throw redirect(307, `/login?eventSignUp`);
  if (event.includes("SignUp"))
    throw redirect(307, `/login?${query}`);
  if (pathname === "/redirect") {
    json(200, {
      event,
      url,
      pathname,
      test: event === "SignUp",
      test2: event.includes("SignUp"),
      test3: url.href.includes("SignUp")
    });
    if (event === "SignUp")
      throw redirect(307, `/login?eventSignUp`);
  }
  const redirectURL = {
    SignUp: "/login",
    ResendCode: "/login",
    ForgotPassword: "/reset-password",
    SAML: `/login`,
    InvitationSignUp: `/register`,
    InvitationRequest: "/login",
    GithubInstallation: "/github/connect"
  }[event] || "";
  if (!path.includes(redirectURL))
    throw redirect(307, `${redirectURL}?${query}`);
};
const s_mGpD62emHWU = () => {
  _jsxBranch();
  useSignal(false);
  const isAuthenticated = useSignal(false);
  return /* @__PURE__ */ _jsxQ("div", null, {
    class: "h-full"
  }, (isAuthenticated.value, /* @__PURE__ */ _jsxC(Slot, null, 3, "yL_6")), 1, "yL_7");
};
const layout = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_mGpD62emHWU, "s_mGpD62emHWU"));
const Layout_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: layout,
  onGet: onGet$2
}, Symbol.toStringTag, { value: "Module" }));
const swRegister = '((s,a,i,r)=>{i=(e,t)=>{t=document.querySelector("[q\\\\:base]"),t&&a.active&&a.active.postMessage({type:"qprefetch",base:t.getAttribute("q:base"),...e})},document.addEventListener("qprefetch",e=>{const t=e.detail;a?i(t):t.bundles&&s.push(...t.bundles)}),navigator.serviceWorker.register("/service-worker.js").then(e=>{r=()=>{a=e,i({bundles:s})},e.installing?e.installing.addEventListener("statechange",t=>{t.target.state=="activated"&&r()}):e.active&&r()}).catch(e=>console.error(e))})([])';
const RouteStateContext = /* @__PURE__ */ createContextId("qc-s");
const ContentContext = /* @__PURE__ */ createContextId("qc-c");
const ContentInternalContext = /* @__PURE__ */ createContextId("qc-ic");
const DocumentHeadContext = /* @__PURE__ */ createContextId("qc-h");
const RouteLocationContext = /* @__PURE__ */ createContextId("qc-l");
const RouteNavigateContext = /* @__PURE__ */ createContextId("qc-n");
const RouteActionContext = /* @__PURE__ */ createContextId("qc-a");
const RouteInternalContext = /* @__PURE__ */ createContextId("qc-ir");
const s_DyVc0YBIqQU = (currentScript) => {
  const win = window;
  const currentPath = location.pathname + location.search;
  const spa = "_qCitySPA";
  const historyPatch = "_qCityHistoryPatch";
  const bootstrap = "_qCityBootstrap";
  const initPopstate = "_qCityInitPopstate";
  const initAnchors = "_qCityInitAnchors";
  const initVisibility = "_qCityInitVisibility";
  const initScroll = "_qCityInitScroll";
  const scrollEnabled = "_qCityScrollEnabled";
  const debounceTimeout = "_qCityScrollDebounce";
  const scrollHistory = "_qCityScroll";
  const checkAndScroll = (scrollState) => {
    if (scrollState)
      win.scrollTo(scrollState.x, scrollState.y);
  };
  const currentScrollState2 = () => {
    const elm = document.documentElement;
    return {
      x: elm.scrollLeft,
      y: elm.scrollTop,
      w: Math.max(elm.scrollWidth, elm.clientWidth),
      h: Math.max(elm.scrollHeight, elm.clientHeight)
    };
  };
  const saveScrollState = (scrollState) => {
    const state = history.state || {};
    state[scrollHistory] = scrollState || currentScrollState2();
    history.replaceState(state, "");
  };
  if (!win[spa] && !win[initPopstate] && !win[initAnchors] && !win[initVisibility] && !win[initScroll]) {
    saveScrollState();
    win[initPopstate] = () => {
      var _a2;
      if (win[spa])
        return;
      win[scrollEnabled] = false;
      clearTimeout(win[debounceTimeout]);
      if (currentPath !== location.pathname + location.search) {
        const container = currentScript.closest("[q\\:container]");
        const link = container.querySelector('a[q\\:key="AD_1"]');
        if (link) {
          const container2 = link.closest("[q\\:container]");
          const bootstrapLink = link.cloneNode();
          bootstrapLink.setAttribute("q:nbs", "");
          bootstrapLink.style.display = "none";
          container2.appendChild(bootstrapLink);
          win[bootstrap] = bootstrapLink;
          bootstrapLink.click();
        } else
          location.reload();
      } else if (history.scrollRestoration === "manual") {
        const scrollState = (_a2 = history.state) == null ? void 0 : _a2[scrollHistory];
        checkAndScroll(scrollState);
        win[scrollEnabled] = true;
      }
    };
    if (!win[historyPatch]) {
      win[historyPatch] = true;
      const pushState = history.pushState;
      const replaceState = history.replaceState;
      const prepareState = (state) => {
        if (state === null || false)
          state = {};
        else if ((state == null ? void 0 : state.constructor) !== Object)
          state = {
            _data: state
          };
        state._qCityScroll = state._qCityScroll || currentScrollState2();
        return state;
      };
      history.pushState = (state, title, url) => {
        state = prepareState(state);
        return pushState.call(history, state, title, url);
      };
      history.replaceState = (state, title, url) => {
        state = prepareState(state);
        return replaceState.call(history, state, title, url);
      };
    }
    win[initAnchors] = (event) => {
      if (win[spa] || event.defaultPrevented)
        return;
      const target = event.target.closest("a[href]");
      if (target && !target.hasAttribute("preventdefault:click")) {
        const href = target.getAttribute("href");
        const prev = new URL(location.href);
        const dest = new URL(href, prev);
        const sameOrigin = dest.origin === prev.origin;
        const samePath = dest.pathname + dest.search === prev.pathname + prev.search;
        if (sameOrigin && samePath) {
          event.preventDefault();
          if (dest.href !== prev.href)
            history.pushState(null, "", dest);
          if (!dest.hash) {
            if (dest.href.endsWith("#"))
              window.scrollTo(0, 0);
            else {
              win[scrollEnabled] = false;
              clearTimeout(win[debounceTimeout]);
              saveScrollState({
                ...currentScrollState2(),
                x: 0,
                y: 0
              });
              location.reload();
            }
          } else {
            const elmId = dest.hash.slice(1);
            const elm = document.getElementById(elmId);
            if (elm)
              elm.scrollIntoView();
          }
        }
      }
    };
    win[initVisibility] = () => {
      if (!win[spa] && win[scrollEnabled] && document.visibilityState === "hidden")
        saveScrollState();
    };
    win[initScroll] = () => {
      if (win[spa] || !win[scrollEnabled])
        return;
      clearTimeout(win[debounceTimeout]);
      win[debounceTimeout] = setTimeout(() => {
        saveScrollState();
        win[debounceTimeout] = void 0;
      }, 200);
    };
    win[scrollEnabled] = true;
    setTimeout(() => {
      addEventListener("popstate", win[initPopstate]);
      addEventListener("scroll", win[initScroll], {
        passive: true
      });
      document.body.addEventListener("click", win[initAnchors]);
      if (!win.navigation)
        document.addEventListener("visibilitychange", win[initVisibility], {
          passive: true
        });
    }, 0);
  }
};
const spaInit = /* @__PURE__ */ inlinedQrl(s_DyVc0YBIqQU, "s_DyVc0YBIqQU");
const shim = () => {
  {
    const [symbol, bundle] = getPlatform().chunkForSymbol(spaInit.getSymbol(), null);
    const path = basePathname + "build/" + bundle;
    return `(${shim$1.toString()})('${path}','${symbol}');`;
  }
};
const shim$1 = async (path, symbol) => {
  var _a2;
  if (!window._qcs && history.scrollRestoration === "manual") {
    window._qcs = true;
    const scrollState = (_a2 = history.state) == null ? void 0 : _a2._qCityScroll;
    if (scrollState)
      window.scrollTo(scrollState.x, scrollState.y);
    const currentScript = document.currentScript;
    (await import(path))[symbol](currentScript);
  }
};
const s_e0ssiDXoeAM = () => {
  const shimScript = shim();
  _jsxBranch();
  const nonce = useServerData("nonce");
  const context = useContext(ContentInternalContext);
  if (context.value && context.value.length > 0) {
    const contentsLen = context.value.length;
    let cmp = null;
    for (let i = contentsLen - 1; i >= 0; i--)
      if (context.value[i].default)
        cmp = _jsxC(context.value[i].default, {
          children: cmp
        }, 1, "zl_0");
    return /* @__PURE__ */ _jsxC(Fragment, {
      children: [
        cmp,
        /* @__PURE__ */ _jsxQ("script", {
          dangerouslySetInnerHTML: shimScript
        }, {
          nonce
        }, null, 3, null)
      ]
    }, 1, "zl_1");
  }
  return SkipRender;
};
const RouterOutlet = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_e0ssiDXoeAM, "s_e0ssiDXoeAM"));
const resolveHead = (endpoint, routeLocation, contentModules, locale) => {
  const head2 = createDocumentHead();
  const getData = (loaderOrAction) => {
    const id = loaderOrAction.__id;
    if (loaderOrAction.__brand === "server_loader") {
      if (!(id in endpoint.loaders))
        throw new Error("You can not get the returned data of a loader that has not been executed for this request.");
    }
    const data = endpoint.loaders[id];
    if (data instanceof Promise)
      throw new Error("Loaders returning a function can not be referred to in the head function.");
    return data;
  };
  const headProps = {
    head: head2,
    withLocale: (fn) => withLocale(locale, fn),
    resolveValue: getData,
    ...routeLocation
  };
  for (let i = contentModules.length - 1; i >= 0; i--) {
    const contentModuleHead = contentModules[i] && contentModules[i].head;
    if (contentModuleHead) {
      if (typeof contentModuleHead === "function")
        resolveDocumentHead(head2, withLocale(locale, () => contentModuleHead(headProps)));
      else if (typeof contentModuleHead === "object")
        resolveDocumentHead(head2, contentModuleHead);
    }
  }
  return headProps.head;
};
const resolveDocumentHead = (resolvedHead, updatedHead) => {
  if (typeof updatedHead.title === "string")
    resolvedHead.title = updatedHead.title;
  mergeArray(resolvedHead.meta, updatedHead.meta);
  mergeArray(resolvedHead.links, updatedHead.links);
  mergeArray(resolvedHead.styles, updatedHead.styles);
  Object.assign(resolvedHead.frontmatter, updatedHead.frontmatter);
};
const mergeArray = (existingArr, newArr) => {
  if (Array.isArray(newArr))
    for (const newItem of newArr) {
      if (typeof newItem.key === "string") {
        const existingIndex = existingArr.findIndex((i) => i.key === newItem.key);
        if (existingIndex > -1) {
          existingArr[existingIndex] = newItem;
          continue;
        }
      }
      existingArr.push(newItem);
    }
};
const createDocumentHead = () => ({
  title: "",
  meta: [],
  links: [],
  styles: [],
  frontmatter: {}
});
const toPath = (url) => url.pathname + url.search + url.hash;
const toUrl = (url, baseUrl) => new URL(url, baseUrl.href);
const isSameOrigin = (a, b) => a.origin === b.origin;
const isSamePath = (a, b) => a.pathname + a.search === b.pathname + b.search;
const isSamePathname = (a, b) => a.pathname === b.pathname;
const isSameSearchQuery = (a, b) => a.search === b.search;
const getClientNavPath = (props, baseUrl) => {
  const href = props.href;
  if (typeof href === "string" && typeof props.target !== "string")
    try {
      const linkUrl = toUrl(href.trim(), baseUrl.url);
      const currentUrl = toUrl("", baseUrl.url);
      if (isSameOrigin(linkUrl, currentUrl))
        return toPath(linkUrl);
    } catch (e) {
      console.error(e);
    }
  else if (props.reload)
    return toPath(toUrl("", baseUrl.url));
  return null;
};
const getPrefetchDataset = (props, clientNavPath, currentLoc) => {
  if (props.prefetch === true && clientNavPath) {
    const prefetchUrl = toUrl(clientNavPath, currentLoc.url);
    const currentUrl = toUrl("", currentLoc.url);
    if (!isSamePathname(prefetchUrl, currentUrl) || !isSameSearchQuery(prefetchUrl, currentUrl))
      return "";
  }
  return null;
};
const useDocumentHead = () => useContext(DocumentHeadContext);
const useLocation = () => useContext(RouteLocationContext);
const useNavigate = () => useContext(RouteNavigateContext);
const useQwikCityEnv = () => noSerialize(useServerData("qwikcity"));
const s_RPDJAz33WLA = `:root{view-transition-name:none}`;
const s_fX0bDjeJa0E = async (path, opt) => {
  const [actionState2, navResolver2, routeInternal2, routeLocation2] = useLexicalScope();
  const { type = "link", forceReload = path === void 0, replaceState = false, scroll = true } = typeof opt === "object" ? opt : {
    forceReload: opt
  };
  const lastDest = routeInternal2.value.dest;
  const dest = path === void 0 ? lastDest : toUrl(path, routeLocation2.url);
  if (!isSameOrigin(dest, lastDest))
    return;
  if (!forceReload && isSamePath(dest, lastDest))
    return;
  routeInternal2.value = {
    type,
    dest,
    forceReload,
    replaceState,
    scroll
  };
  actionState2.value = void 0;
  routeLocation2.isNavigating = true;
  return new Promise((resolve) => {
    navResolver2.r = resolve;
  });
};
const s_02wMImzEAbk = ({ track }) => {
  const [actionState2, content2, contentInternal2, documentHead2, env2, goto2, loaderState2, navResolver2, props2, routeInternal2, routeLocation2] = useLexicalScope();
  async function run() {
    const [navigation, action] = track(() => [
      routeInternal2.value,
      actionState2.value
    ]);
    const locale = getLocale("");
    const prevUrl = routeLocation2.url;
    const navType = action ? "form" : navigation.type;
    navigation.replaceState;
    let trackUrl;
    let clientPageData;
    let loadedRoute = null;
    trackUrl = new URL(navigation.dest, routeLocation2.url);
    loadedRoute = env2.loadedRoute;
    clientPageData = env2.response;
    if (loadedRoute) {
      const [params, mods, menu] = loadedRoute;
      const contentModules = mods;
      const pageModule = contentModules[contentModules.length - 1];
      routeLocation2.prevUrl = prevUrl;
      routeLocation2.url = trackUrl;
      routeLocation2.params = {
        ...params
      };
      routeInternal2.untrackedValue = {
        type: navType,
        dest: trackUrl
      };
      const resolvedHead = resolveHead(clientPageData, routeLocation2, contentModules, locale);
      content2.headings = pageModule.headings;
      content2.menu = menu;
      contentInternal2.value = noSerialize(contentModules);
      documentHead2.links = resolvedHead.links;
      documentHead2.meta = resolvedHead.meta;
      documentHead2.styles = resolvedHead.styles;
      documentHead2.title = resolvedHead.title;
      documentHead2.frontmatter = resolvedHead.frontmatter;
    }
  }
  const promise = run();
  return promise;
};
const s_TxCFOy819ag = (props) => {
  useStylesQrl(/* @__PURE__ */ inlinedQrl(s_RPDJAz33WLA, "s_RPDJAz33WLA"));
  const env = useQwikCityEnv();
  if (!(env == null ? void 0 : env.params))
    throw new Error(`Missing Qwik City Env Data`);
  const urlEnv = useServerData("url");
  if (!urlEnv)
    throw new Error(`Missing Qwik URL Env Data`);
  const url = new URL(urlEnv);
  const routeLocation = useStore({
    url,
    params: env.params,
    isNavigating: false,
    prevUrl: void 0
  }, {
    deep: false
  });
  const navResolver = {};
  const loaderState = _weakSerialize(useStore(env.response.loaders, {
    deep: false
  }));
  const routeInternal = useSignal({
    type: "initial",
    dest: url,
    forceReload: false,
    replaceState: false,
    scroll: true
  });
  const documentHead = useStore(createDocumentHead);
  const content = useStore({
    headings: void 0,
    menu: void 0
  });
  const contentInternal = useSignal();
  const currentActionId = env.response.action;
  const currentAction = currentActionId ? env.response.loaders[currentActionId] : void 0;
  const actionState = useSignal(currentAction ? {
    id: currentActionId,
    data: env.response.formData,
    output: {
      result: currentAction,
      status: env.response.status
    }
  } : void 0);
  const goto = /* @__PURE__ */ inlinedQrl(s_fX0bDjeJa0E, "s_fX0bDjeJa0E", [
    actionState,
    navResolver,
    routeInternal,
    routeLocation
  ]);
  useContextProvider(ContentContext, content);
  useContextProvider(ContentInternalContext, contentInternal);
  useContextProvider(DocumentHeadContext, documentHead);
  useContextProvider(RouteLocationContext, routeLocation);
  useContextProvider(RouteNavigateContext, goto);
  useContextProvider(RouteStateContext, loaderState);
  useContextProvider(RouteActionContext, actionState);
  useContextProvider(RouteInternalContext, routeInternal);
  useTaskQrl(/* @__PURE__ */ inlinedQrl(s_02wMImzEAbk, "s_02wMImzEAbk", [
    actionState,
    content,
    contentInternal,
    documentHead,
    env,
    goto,
    loaderState,
    navResolver,
    props,
    routeInternal,
    routeLocation
  ]));
  return /* @__PURE__ */ _jsxC(Slot, null, 3, "qY_0");
};
const QwikCityProvider = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_TxCFOy819ag, "s_TxCFOy819ag"));
const s_8gdLBszqbaM = (props) => {
  const nav = useNavigate();
  const loc = useLocation();
  const { onClick$, reload, replaceState, scroll, ...linkProps } = (() => props)();
  const clientNavPath = untrack(() => getClientNavPath(linkProps, loc));
  const prefetchDataset = untrack(() => getPrefetchDataset(props, clientNavPath, loc));
  linkProps["preventdefault:click"] = !!clientNavPath;
  linkProps.href = clientNavPath || props.href;
  const onPrefetch = prefetchDataset != null ? eventQrl(/* @__PURE__ */ _noopQrl("s_eBQ0vFsFKsk")) : void 0;
  const handleClick = eventQrl(/* @__PURE__ */ _noopQrl("s_i1Cv0pYJNR0", [
    nav,
    reload,
    replaceState,
    scroll
  ]));
  return /* @__PURE__ */ _jsxS("a", {
    ...linkProps,
    children: /* @__PURE__ */ _jsxC(Slot, null, 3, "AD_0"),
    "data-prefetch": prefetchDataset,
    onClick$: [
      onClick$,
      handleClick
    ],
    onFocus$: onPrefetch,
    onMouseOver$: onPrefetch,
    onQVisible$: onPrefetch
  }, null, 0, "AD_1");
};
const Link = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_8gdLBszqbaM, "s_8gdLBszqbaM"));
const ServiceWorkerRegister = (props) => _jsxQ("script", {
  nonce: _wrapSignal(props, "nonce")
}, {
  dangerouslySetInnerHTML: swRegister
}, null, 3, "1Z_0");
const s_guGxLbhOyuk = () => {
  useVisibleTaskQrl(/* @__PURE__ */ _noopQrl("s_RJXV3eps9hs"));
  return /* @__PURE__ */ _jsxQ("nav", null, {
    class: "fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
  }, /* @__PURE__ */ _jsxQ("div", null, {
    class: "mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 py-2"
  }, [
    /* @__PURE__ */ _jsxC(Link, {
      children: /* @__PURE__ */ _jsxQ("span", null, {
        class: "self-center whitespace-nowrap text-2xl font-extralight uppercase text-purple-900 dark:text-white"
      }, "Arch", 3, null),
      class: "flex items-center",
      href: "/",
      [_IMMUTABLE]: {
        class: _IMMUTABLE,
        href: _IMMUTABLE
      }
    }, 3, "D0_0"),
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "flex md:order-2"
    }, [
      /* @__PURE__ */ _jsxC(Link, {
        children: "Get started",
        class: "mr-3 rounded bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 md:mr-0",
        href: "/login",
        [_IMMUTABLE]: {
          class: _IMMUTABLE,
          href: _IMMUTABLE
        }
      }, 3, "D0_1"),
      /* @__PURE__ */ _jsxQ("button", null, {
        "aria-controls": "navbar-sticky",
        "aria-expanded": "false",
        class: "inline-flex items-center rounded p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
        "data-collapse-toggle": "navbar-sticky",
        type: "button"
      }, [
        /* @__PURE__ */ _jsxQ("span", null, {
          class: "sr-only"
        }, "Open main menu", 3, null),
        /* @__PURE__ */ _jsxQ("svg", null, {
          "aria-hidden": "true",
          class: "h-6 w-6",
          fill: "currentColor",
          viewBox: "0 0 20 20",
          xmlns: "http://www.w3.org/2000/svg"
        }, /* @__PURE__ */ _jsxQ("path", null, {
          "clip-rule": "evenodd",
          d: "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
          "fill-rule": "evenodd"
        }, null, 3, null), 3, null)
      ], 3, null)
    ], 1, null),
    /* @__PURE__ */ _jsxQ("div", null, {
      class: "hidden w-full items-center justify-between md:order-1 md:flex md:w-auto",
      id: "navbar-sticky"
    }, /* @__PURE__ */ _jsxQ("ul", null, {
      class: "mt-4 flex flex-col rounded border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-800"
    }, [
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("a", null, {
        "aria-current": "page",
        class: "block rounded bg-purple-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-purple-700 md:dark:text-purple-500",
        href: "#"
      }, "Home", 3, null), 3, null),
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("a", null, {
        class: "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-purple-500",
        href: "#"
      }, "About", 3, null), 3, null),
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("a", null, {
        class: "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-purple-500",
        href: "#"
      }, "Services", 3, null), 3, null),
      /* @__PURE__ */ _jsxQ("li", null, null, /* @__PURE__ */ _jsxQ("a", null, {
        class: "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-purple-500",
        href: "#"
      }, "Contact", 3, null), 3, null)
    ], 3, null), 3, null)
  ], 1, null), 1, "D0_2");
};
const Header = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_guGxLbhOyuk, "s_guGxLbhOyuk"));
const s_khPUjs089pU = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: [
      /* @__PURE__ */ _jsxQ("header", null, null, /* @__PURE__ */ _jsxC(Header, null, 3, "bG_0"), 1, null),
      /* @__PURE__ */ _jsxQ("p", null, null, "Main Page", 3, null)
    ]
  }, 1, "bG_1");
};
const index$1 = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_khPUjs089pU, "s_khPUjs089pU"));
const head = {
  title: "Unknown",
  meta: [
    {
      name: "description",
      content: "Unknown description"
    }
  ]
};
const IndexRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  head
}, Symbol.toStringTag, { value: "Module" }));
const s_BGJwV8bbUQk = () => {
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: "Login Page"
  }, 3, "Q2_0");
};
const index = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_BGJwV8bbUQk, "s_BGJwV8bbUQk"));
const LoginRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const onGet$1 = async ({ query, url, pathname, redirect }) => {
  const event = query.get("event") || "";
  const path = pathname || "";
  console.log("searchParams: ", url);
  if (event === "test")
    throw redirect(307, `/login?eventSignUp`);
  if (event.includes("SignUp"))
    throw redirect(307, `/login?${query}`);
  const redirectURL = {
    SignUp: "/login",
    ResendCode: "/login",
    ForgotPassword: "/reset-password",
    SAML: `/login`,
    InvitationSignUp: `/register`,
    InvitationRequest: "/login",
    GithubInstallation: "/github/connect"
  }[event] || "";
  if (!path.includes(redirectURL))
    throw redirect(307, `${redirectURL}?${query}`);
};
const RedirectRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onGet: onGet$1
}, Symbol.toStringTag, { value: "Module" }));
const onGet = async ({ redirect, query, pathname }) => {
  const event = query.get("event") || "";
  const path = pathname || "";
  const redirectURL = {
    SignUp: "/login",
    ResendCode: "/login",
    ForgotPassword: "/reset-password",
    SAML: `/login`,
    InvitationSignUp: `/register`,
    InvitationRequest: "/login",
    GithubInstallation: "/github/connect"
  }[event] || "";
  if (!path.includes(redirectURL))
    throw redirect(307, `${redirectURL}?${query}`);
};
const RedirectsRoute = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  onGet
}, Symbol.toStringTag, { value: "Module" }));
const serverPlugins = [];
const Layout = () => Layout_;
const routes = [
  [/^\/$/, [Layout, () => IndexRoute], void 0, "/", ["q-46a15655.js", "q-ddf86263.js"]],
  [/^\/login\/?$/, [Layout, () => LoginRoute], void 0, "/login", ["q-46a15655.js", "q-12a7542f.js"]],
  [/^\/redirect\/?$/, [Layout, () => RedirectRoute], void 0, "/redirect", ["q-46a15655.js", "q-c31a0420.js"]],
  [/^\/redirects\/?$/, [Layout, () => RedirectsRoute], void 0, "/redirects", ["q-46a15655.js", "q-ddcec355.js"]]
];
const menus = [];
const trailingSlash = false;
const basePathname = "/";
const cacheModules = true;
const qwikCityPlan = { routes, serverPlugins, menus, trailingSlash, basePathname, cacheModules };
export {
  Fragment as F,
  QwikCityProvider as Q,
  RouterOutlet as R,
  ServiceWorkerRegister as S,
  _deserializeData as _,
  _serializeData as a,
  _renderSSR as b,
  _pauseFromContexts as c,
  componentQrl as d,
  useLocation as e,
  _jsxC as f,
  _jsxQ as g,
  _fnSignal as h,
  inlinedQrl as i,
  jsx as j,
  _jsxS as k,
  _wrapSignal as l,
  serverPlugins as m,
  menus as n,
  basePathname as o,
  cacheModules as p,
  qwikCityPlan as q,
  routes as r,
  setPlatform as s,
  trailingSlash as t,
  useDocumentHead as u,
  verifySerializable as v
};
