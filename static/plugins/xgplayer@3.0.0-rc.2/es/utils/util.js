function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import XG_DEBUG from './debug';
import XgplayerTimeRange from './xgplayerTimeRange';
var util = {};
/**
 *
 * @param { string } el
 * @param { string } [tpl=]
 * @param { {[propName: string]: any }} [attrs={}]
 * @param { string } [cname='']
 * @returns { HTMLElement | null }
 */

util.createDom = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var tpl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cname = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var dom = document.createElement(el);
  dom.className = cname;
  dom.innerHTML = tpl;
  Object.keys(attrs).forEach(function (item) {
    var key = item;
    var value = attrs[item];

    if (el === 'video' || el === 'audio' || el === 'live-video') {
      if (value) {
        dom.setAttribute(key, value);
      }
    } else {
      dom.setAttribute(key, value);
    }
  });
  return dom;
};
/**
 *
 * @param { string } html
 * @param { string } [attrs={}]
 * @param { string } [classname=""]
 * @returns { HTMLElement | null }
 */


util.createDomFromHtml = function (html) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var classname = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  try {
    var doc = document.createElement('div');
    doc.innerHTML = html;
    var dom = doc.children;
    doc = null;

    if (dom.length > 0) {
      dom = dom[0];
      classname && util.addClass(dom, classname);

      if (attrs) {
        Object.keys(attrs).forEach(function (key) {
          dom.setAttribute(key, attrs[key]);
        });
      }

      return dom;
    }

    return null;
  } catch (err) {
    XG_DEBUG.logError('util.createDomFromHtml', err);
    return null;
  }
};
/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { boolean }
 */


util.hasClass = function (el, className) {
  if (!el || !className) {
    return false;
  }

  try {
    return Array.prototype.some.call(el.classList, function (item) {
      return item === className;
    });
  } catch (e) {
    var orgClassName = el.className && _typeof(el.className) === 'object' ? el.getAttribute('class') : el.className;
    return orgClassName && !!orgClassName.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  } // if (el.classList) {
  //   return Array.prototype.some.call(el.classList, item => item === className)
  // } else {
  //   const orgClassName = el.className && typeof el.className === 'object' ? el.getAttribute('class') : el.className
  //   return orgClassName && !!orgClassName.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  // }

};
/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { void }
 */


util.addClass = function (el, className) {
  if (!el || !className) {
    return;
  }

  try {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
      item && el.classList.add(item);
    });
  } catch (e) {
    if (!util.hasClass(el, className)) {
      if (el.className && _typeof(el.className) === 'object') {
        el.setAttribute('class', el.getAttribute('class') + ' ' + className);
      } else {
        el.className += ' ' + className;
      }
    }
  }
};
/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { void }
 */


util.removeClass = function (el, className) {
  if (!el || !className) {
    return;
  }

  try {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
      item && el.classList.remove(item);
    });
  } catch (e) {
    if (util.hasClass(el, className)) {
      className.split(/\s+/g).forEach(function (item) {
        var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');

        if (el.className && _typeof(el.className) === 'object') {
          el.setAttribute('class', el.getAttribute('class').replace(reg, ' '));
        } else {
          el.className = el.className.replace(reg, ' ');
        }
      });
    }
  }
};
/**
 *
 * @param { HTMLElement } el
 * @param { string } className
 * @returns { void }
 */


util.toggleClass = function (el, className) {
  if (!el) {
    return;
  }

  className.split(/\s+/g).forEach(function (item) {
    if (util.hasClass(el, item)) {
      util.removeClass(el, item);
    } else {
      util.addClass(el, item);
    }
  });
};
/**
 *
 * @param { string | Object } args0
 * @param { string } [className]
 * @returns { string }
 */


util.classNames = function () {
  var _arguments = arguments;
  var classname = [];

  var _loop = function _loop(i) {
    if (util.typeOf(_arguments[i]) === 'String') {
      // classname += `${arguments[i]}`
      classname.push(_arguments[i]);
    } else if (util.typeOf(_arguments[i]) === 'Object') {
      Object.keys(_arguments[i]).map(function (key) {
        if (_arguments[i][key]) {
          // classname += key
          classname.push(key);
        }
      });
    } // if (i < arguments.length - 1) {
    //   classname += ' '
    // }

  };

  for (var i = 0; i < arguments.length; i++) {
    _loop(i);
  }

  return classname.join(' ');
};
/**
 *
 * @param { HTMLElement } el
 * @param { string } sel
 * @returns { HTMLElement }
 */


util.findDom = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var sel = arguments.length > 1 ? arguments[1] : undefined;
  var dom; // fix querySelector IDs that start with a digit
  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document

  try {
    dom = el.querySelector(sel);
  } catch (e) {
    XG_DEBUG.logError('util.findDom', e);

    if (sel.indexOf('#') === 0) {
      dom = el.getElementById(sel.slice(1));
    }
  }

  return dom;
};
/**
 *
 * @param { HTMLElement } dom
 * @param { string } key
 * @returns { any }
 */


util.getCss = function (dom, key) {
  return dom.currentStyle ? dom.currentStyle[key] : document.defaultView.getComputedStyle(dom, false)[key];
};

util.padStart = function (str, length, pad) {
  var charstr = String(pad);
  var len = length >> 0;
  var maxlen = Math.ceil(len / charstr.length);
  var chars = [];
  var r = String(str);

  while (maxlen--) {
    chars.push(charstr);
  }

  return chars.join('').substring(0, len - r.length) + r;
};
/**
 *
 * @param { Number } time
 * @returns { string }
 */


util.format = function (time) {
  if (window.isNaN(time)) {
    return '';
  }

  time = Math.round(time);
  var hour = util.padStart(Math.floor(time / 3600), 2, 0);
  var minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
  var second = util.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
};
/**
 *
 * @param { Object } e
 * @returns { Object }
 */


util.event = function (e) {
  if (e.touches) {
    var touch = e.touches[0] || e.changedTouches[0];
    e.clientX = touch.clientX || 0;
    e.clientY = touch.clientY || 0;
    e.offsetX = touch.pageX - touch.target.offsetLeft;
    e.offsetY = touch.pageY - touch.target.offsetTop;
  }

  e._target = e.target || e.srcElement;
};
/**
 *
 * @param { any } obj
 * @returns { string }
 */


util.typeOf = function (obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
};
/**
 *
 * @param { any } dst
 * @param { any } src
 * @returns { any }
 */


util.deepCopy = function (dst, src) {
  if (util.typeOf(src) === 'Object' && util.typeOf(dst) === 'Object') {
    Object.keys(src).forEach(function (key) {
      // eslint-disable-next-line no-undef
      if (util.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (dst[key] === undefined || dst[key] === undefined) {
          dst[key] = src[key];
        } else {
          util.deepCopy(dst[key], src[key]);
        }
      } else if (util.typeOf(src[key]) === 'Array') {
        dst[key] = util.typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key];
      } else {
        dst[key] = src[key];
      }
    });
    return dst;
  }
};
/**
 *
 * @param { any } dst
 * @param { any } src
 * @returns { any }
 */


util.deepMerge = function (dst, src) {
  Object.keys(src).map(function (key) {
    if (util.typeOf(src[key]) === 'Array' && util.typeOf(dst[key]) === 'Array') {
      if (util.typeOf(dst[key]) === 'Array') {
        var _dst$key;

        (_dst$key = dst[key]).push.apply(_dst$key, _toConsumableArray(src[key]));
      }
    } else if (util.typeOf(dst[key]) === util.typeOf(src[key]) && dst[key] !== null && util.typeOf(dst[key]) === 'Object' && !(src[key] instanceof window.Node)) {
      util.deepMerge(dst[key], src[key]);
    } else {
      src[key] !== null && (dst[key] = src[key]);
    }
  });
  return dst;
};

util.getBgImage = function (el) {
  // fix: return current page url when url is none
  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;

  if (!url || url === 'none') {
    return '';
  }

  var a = document.createElement('a');
  a.href = url.replace(/url\("|"\)/g, '');
  return a.href;
};
/**
 *
 * @param {  HTMLElement } dom
 * @returns { HTMLElement | null }
 */


util.copyDom = function (dom) {
  if (dom && dom.nodeType === 1) {
    var back = document.createElement(dom.tagName);
    Array.prototype.forEach.call(dom.attributes, function (node) {
      back.setAttribute(node.name, node.value);
    });

    if (dom.innerHTML) {
      back.innerHTML = dom.innerHTML;
    }

    return back;
  } else {
    return '';
  }
};
/**
 *
 * @param { any } context
 * @param { string } eventName
 * @param { function } intervalFunc
 * @param { number } frequency
 */


util.setInterval = function (context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency);
  }
};
/**
 *
 * @param { any } context
 * @param { string } eventName
 * @returns { void }
 */


util.clearInterval = function (context, eventName) {
  clearInterval(context._interval[eventName]);
  context._interval[eventName] = null;
};
/**
 *
 * @param { any } context
 * @param { function } fun
 * @param { number } time
 * @returns { number }
 */


util.setTimeout = function (context, fun, time) {
  if (!context._timers) {
    context._timers = [];
  }

  var id = setTimeout(function () {
    fun();
    util.clearTimeout(context, id);
  }, time);

  context._timers.push(id);

  return id;
};
/**
 *
 * @param { any } context
 * @param { number } id
 */


util.clearTimeout = function (context, id) {
  var _timers = context._timers;

  if (util.typeOf(_timers) === 'Array') {
    for (var i = 0; i < _timers.length; i++) {
      if (_timers[i] === id) {
        _timers.splice(i, 1);

        clearTimeout(id);
        break;
      }
    }
  } else {
    clearTimeout(id);
  }
};
/**
 *
 * @param { any } context
 */


util.clearAllTimers = function (context) {
  var _timers = context._timers;

  if (util.typeOf(_timers) === 'Array') {
    _timers.map(function (item) {
      clearTimeout(item);
    });

    context._timerIds = [];
  }
};
/**
 *
 * @param { string } name
 * @param { string } imgUrl
 * @param { number } [width]
 * @param { number } [height]
 * @returns { HTMLElement }
 */


util.createImgBtn = function (name, imgUrl, width, height) {
  var btn = util.createDom("xg-".concat(name), '', {}, "xgplayer-".concat(name, "-img"));
  btn.style.backgroundImage = "url(\"".concat(imgUrl, "\")");

  if (width && height) {
    var w, h, unit;
    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every(function (item) {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = parseFloat(width.slice(0, width.indexOf(item)).trim());
        h = parseFloat(height.slice(0, height.indexOf(item)).trim());
        unit = item;
        return false;
      } else {
        return true;
      }
    });
    btn.style.width = "".concat(w).concat(unit);
    btn.style.height = "".concat(h).concat(unit);
    btn.style.backgroundSize = "".concat(w).concat(unit, " ").concat(h).concat(unit);

    if (name === 'start') {
      btn.style.margin = "-".concat(h / 2).concat(unit, " auto auto -").concat(w / 2).concat(unit);
    } else {
      btn.style.margin = 'auto 5px auto 5px';
    }
  }

  return btn;
};
/**
 *
 * @param { string } hex
 * @param { string | number } alpha
 * @returns { string }
 */


util.Hex2RGBA = function (hex, alpha) {
  var rgb = []; // 定义rgb数组
  // eslint-disable-next-line no-useless-escape

  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    var sixHex = '#';
    hex.replace(/[0-9A-F]/ig, function (kw) {
      sixHex += kw + kw;
    });
    hex = sixHex;
  }

  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
      rgb.push(parseInt(kw, 16));
    });
    return "rgba(".concat(rgb.join(','), ", ").concat(alpha, ")");
  } else {
    return 'rgba(255, 255, 255, 0.1)';
  }
};
/**
 *
 * @returns { HTMLElement | null }
 */


util.getFullScreenEl = function () {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
};
/**
 * @param { any }
 * @returns { boolean }
 */


util.checkIsFunction = function (fun) {
  return fun && typeof fun === 'function';
};
/**
 * @param { any }
 * @returns { boolean }
 */


util.checkIsObject = function (obj) {
  return obj !== null && _typeof(obj) === 'object';
};
/**
 * @param { HTMLElement }
 */


util.hide = function (dom) {
  dom.style.display = 'none';
};
/**
 * @param { HTMLElement }
 * @param { block | flex | inline-block | inline-flex } [display]
 */


util.show = function (dom, display) {
  dom.style.display = display || 'block';
};
/**
 *
 * @param { any } val
 * @returns { boolean }
 */


util.isUndefined = function (val) {
  if (typeof val === 'undefined' || val === null) {
    return true;
  }
};
/**
 *
 * @param { HTMLElement } dom
 * @param { string } [text]
 * @returns
 */


util.setStyleFromCsstext = function (dom, text) {
  // dom.setAttribute(style, text)
  if (!text) {
    return;
  }

  if (util.typeOf(text) === 'String') {
    var styleArr = text.replace(/\s+/g, '').split(';');
    styleArr.map(function (item) {
      if (item) {
        var arr = item.split(':');

        if (arr.length > 1) {
          dom.style[arr[0]] = arr[1];
        }
      }
    });
  } else {
    Object.keys(text).map(function (key) {
      dom.style[key] = text[key];
    });
  }
};
/**
 *
 * @param { string } key
 * @param { Array<any>} list
 * @returns { boolean }
 */


function checkIsIn(key, list) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (key.indexOf(list[i]) > -1) {
      return true;
    }
  }

  return false;
}
/**
 *
 * @param { HTMLElement } dom
 * @param { Array<string> } [list] attribute names to filter
 * @returns { {} | {[propName: string]: any;} }
 */


util.filterStyleFromText = function (dom) {
  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['width', 'height', 'top', 'left', 'bottom', 'right', 'position', 'z-index', 'padding', 'margin', 'transform'];
  var _cssText = dom.style.cssText;

  if (!_cssText) {
    return {};
  }

  var styleArr = _cssText.replace(/\s+/g, '').split(';');

  var ret = {};
  var remain = {};
  styleArr.map(function (item) {
    if (item) {
      var arr = item.split(':');

      if (arr.length > 1) {
        if (checkIsIn(arr[0], list)) {
          ret[arr[0]] = arr[1]; // dom.style[arr[0]] = 'initial'
        } else {
          remain[arr[0]] = arr[1];
        }
      }
    }
  });
  dom.setAttribute('style', '');
  Object.keys(remain).map(function (key) {
    // netStyle += `${key}: ${remain[key]};`
    dom.style[key] = remain[key];
  });
  return ret;
};
/**
 *
 * @param { HTMLElement } dom
 * @returns { {} | {[propName: string]: any;} }
 */


util.getStyleFromCsstext = function (dom) {
  var _cssText = dom.style.cssText;

  if (!_cssText) {
    return {};
  }

  var styleArr = _cssText.replace(/\s+/g, '').split(';');

  var ret = {};
  styleArr.map(function (item) {
    if (item) {
      var arr = item.split(':');

      if (arr.length > 1) {
        ret[arr[0]] = arr[1];
      }
    }
  });
  return ret;
};

util.preloadImg = function (url) {
  var onload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var onerror = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var img = new window.Image();

  if (img.complete) {
    // 图片已经加载过了，可以使用图片
    // do something here
    // img = null
    onload && onload();
  } else {
    img.onload = function (e) {
      img = null;
      onload && onload(e);
    };

    img.onerror = function (e) {
      img = null;
      onerror && onerror(e);
    };
  }

  img.src = url;
};

util.stopPropagation = function (e) {
  if (e) {
    e.stopPropagation();
    e.cancelable && e.preventDefault();
  }
};

util.scrollTop = function () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

util.scrollLeft = function () {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

util.checkTouchSupport = function () {
  return 'ontouchstart' in window;
};

util.getBuffered2 = function (vbuffered) {
  var maxHoleDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  // ref: hls.js
  var buffered = [];

  for (var i = 0; i < vbuffered.length; i++) {
    buffered.push({
      start: vbuffered.start(i) < 0.5 ? 0 : vbuffered.start(i),
      end: vbuffered.end(i)
    });
  }

  buffered.sort(function (a, b) {
    var diff = a.start - b.start;

    if (diff) {
      return diff;
    } else {
      return b.end - a.end;
    }
  });
  var buffered2 = [];

  if (maxHoleDuration) {
    for (var _i = 0; _i < buffered.length; _i++) {
      var buf2len = buffered2.length;

      if (buf2len) {
        var buf2end = buffered2[buf2len - 1].end;

        if (buffered[_i].start - buf2end < maxHoleDuration) {
          if (buffered[_i].end > buf2end) {
            buffered2[buf2len - 1].end = buffered[_i].end;
          }
        } else {
          buffered2.push(buffered[_i]);
        }
      } else {
        buffered2.push(buffered[_i]);
      }
    }
  } else {
    buffered2 = buffered;
  }

  return new XgplayerTimeRange(buffered2);
};
/**
 * @description css中有zoom的时候，位移会等比缩放，但是元素的宽高不会等比缩放，所以通过该api做统一
 * https://bugs.chromium.org/p/chromium/issues/detail?id=429140#c8
 * @param {Events} e
 * @param {number} zoom
 * @returns
 */


util.getEventPos = function (e) {
  var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return {
    x: e.x / zoom,
    y: e.y / zoom,
    clientX: e.clientX / zoom,
    clientY: e.clientY / zoom,
    offsetX: e.offsetX / zoom,
    offsetY: e.offsetY / zoom,
    pageX: e.pageX / zoom,
    pageY: e.pageY / zoom
  };
};

util.requestAnimationFrame = function (callback) {
  var _fun = window.requestAnimationFrame || // Older versions Chrome/Webkit
  window.webkitRequestAnimationFrame || // Firefox < 23
  window.mozRequestAnimationFrame || // opera
  window.oRequestAnimationFrame || // ie
  window.msRequestAnimationFrame;

  if (_fun) {
    return _fun(callback);
  }
};

util.cancelAnimationFrame = function (frameId) {
  var _fun = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.cancelRequestAnimationFrame;

  _fun && _fun(frameId);
};

export default util;