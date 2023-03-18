function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
* an ui Plugin class
*
**/
import BasePlugin, { Util, XG_DEBUG } from './basePlugin';
import _delegate from 'delegate';
var ROOT_TYPES = {
  CONTROLS: 'controls',
  ROOT: 'root'
};
var POSITIONS = {
  ROOT: 'root',
  ROOT_LEFT: 'rootLeft',
  ROOT_RIGHT: 'rootRight',
  ROOT_TOP: 'rootTop',
  CONTROLS_LEFT: 'controlsLeft',
  CONTROLS_RIGTH: 'controlsRight',
  CONTROLS_RIGHT: 'controlsRight',
  CONTROLS_CENTER: 'controlsCenter',
  CONTROLS: 'controls'
};
/**
 * Check if the url is a link address
 * @param { string } str
 */

function isUrl(str) {
  if (!str) {
    return false;
  }

  return str.indexOf && /^http/.test(str);
}

function mergeIconClass(icon, classname) {
  if (_typeof(icon) === 'object' && icon.class && typeof icon.class === 'string') {
    return "".concat(classname, " ").concat(icon.class);
  }

  return classname;
}

function mergeIconAttr(icon, attr) {
  if (_typeof(icon) === 'object' && icon.attr && _typeof(icon.attr) === 'object') {
    Object.keys(icon.attr).map(function (key) {
      attr[key] = icon.attr[key];
    });
  }

  return attr;
}

function createIcon(icon, key) {
  var classname = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var attr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var pluginName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var newIcon = null;

  if (icon instanceof window.Element) {
    Util.addClass(icon, classname);
    Object.keys(attr).map(function (key) {
      icon.setAttribute(key, attr[key]);
    });
    return icon;
  }

  if (isUrl(icon) || isUrl(icon.url)) {
    attr.src = isUrl(icon) ? icon : icon.url || '';
    newIcon = Util.createDom(icon.tag || 'img', '', attr, "xg-img ".concat(classname));
    return newIcon;
  }

  if (typeof icon === 'function') {
    try {
      newIcon = icon();

      if (newIcon instanceof window.Element) {
        Util.addClass(newIcon, classname);
        Object.keys(attr).map(function (key) {
          newIcon.setAttribute(key, attr[key]);
        });
        return newIcon;
      } else {
        XG_DEBUG.logWarn("warn>>icons.".concat(key, " in config of plugin named [").concat(pluginName, "] is a function mast return an Element Object"));
      }

      return null;
    } catch (e) {
      XG_DEBUG.logError("Plugin named [".concat(pluginName, "]:createIcon"), e);
      return null;
    }
  }

  if (typeof icon === 'string') {
    return Util.createDomFromHtml(icon, attr, classname);
  }

  XG_DEBUG.logWarn("warn>>icons.".concat(key, " in config of plugin named [").concat(pluginName, "] is invalid"));
  return null;
}

function registerIconsObj(iconsConfig, plugin) {
  var _icons = plugin.config.icons || plugin.playerConfig.icons;

  Object.keys(iconsConfig).map(function (key) {
    var orgIcon = iconsConfig[key];
    var classname = orgIcon && orgIcon.class ? orgIcon.class : '';
    var attr = orgIcon && orgIcon.attr ? orgIcon.attr : {};
    var newIcon = null;

    if (_icons && _icons[key]) {
      classname = mergeIconClass(_icons[key], classname);
      attr = mergeIconAttr(_icons[key], attr);
      newIcon = createIcon(_icons[key], key, classname, attr, plugin.pluginName);
    }

    if (!newIcon && orgIcon) {
      newIcon = createIcon(orgIcon.icon ? orgIcon.icon : orgIcon, attr, classname, {}, plugin.pluginName);
    }

    plugin.icons[key] = newIcon;
  });
}

function registerTextObj(textConfig, plugin) {
  Object.keys(textConfig).map(function (key) {
    Object.defineProperty(plugin.langText, key, {
      get: function get() {
        var lang = plugin.lang;
        return textConfig[key][lang] || textConfig[key].zh;
      }
    });
  });
}
/**
 * @typedef { import ('../player').default } Player
 */

/**
 * @typedef {{
 *  index?: number,
 *  player: Player,
 *  pluginName: string,
 *  config: {
 *   [propName: string]: any
 *  },
 *  root?: HTMLElement,
 *  position?: string,
 *  [propName: string]: any
 * }} IPluginOptions
*/


var Plugin = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Plugin, _BasePlugin);

  var _super = _createSuper(Plugin);

  /**
   * @param { IPluginOptions } args
   */
  function Plugin() {
    var _this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Plugin);

    _this = _super.call(this, args);
    /**
     * @private
     */

    _this.__delegates = [];
    return _this;
  }
  /**
   * @private
   */


  _createClass(Plugin, [{
    key: "__init",
    value: function __init(args) {
      _get(_getPrototypeOf(Plugin.prototype), "__init", this).call(this, args);

      if (!args.root) {
        return;
      }

      var _parent = args.root;
      var _el = null;
      /**
       * @readonly
       */

      this.icons = {};
      /**
       * @readonly
       * @type { HTMLElement }
       */

      this.root = null;
      /**
       * @readonly
       * @type { HTMLElement }
       */

      this.parent = null;

      var _orgicons = this.registerIcons() || {};

      registerIconsObj(_orgicons, this);
      /**
       * @readonly
       */

      this.langText = {};
      var defaultTexConfig = this.registerLanguageTexts() || {};
      registerTextObj(defaultTexConfig, this);
      var renderStr = '';

      try {
        renderStr = this.render();
      } catch (e) {
        XG_DEBUG.logError("Plugin:".concat(this.pluginName, ":render"), e);
        throw new Error("Plugin:".concat(this.pluginName, ":render:").concat(e.message));
      }

      if (renderStr) {
        _el = Plugin.insert(renderStr, _parent, args.index);

        _el.setAttribute('data-index', args.index);
      } else if (args.tag) {
        _el = Util.createDom(args.tag, '', args.attr, args.name);

        _el.setAttribute('data-index', args.index);

        _parent.appendChild(_el);
      } else {
        return;
      }

      this.root = _el;
      this.parent = _parent; // Plugin.defineGetterOrSetter(this, {
      //   /**
      //    * @readonly
      //    * @type { HTMLElement }
      //    */
      //   root: {
      //     get: () => {
      //       return _el
      //     },
      //     configurable: true
      //   },
      //   /**
      //    * @readonly
      //    * @type { HTMLElement }
      //    */
      //   parent: {
      //     get: () => {
      //       return _parent
      //     },
      //     configurable: true
      //   }
      // })

      var attr = this.config.attr || {};
      var style = this.config.style || {};
      this.setAttr(attr);
      this.setStyle(style);

      if (this.config.index) {
        this.root.setAttribute('data-index', this.config.index);
      }

      this.__registerChildren();
    }
    /**
     * @private
     */

  }, {
    key: "__registerChildren",
    value: function __registerChildren() {
      var _this2 = this;

      if (!this.root) {
        return;
      }
      /**
       * @private
       */


      this._children = [];
      var children = this.children();

      if (children && _typeof(children) === 'object') {
        if (Object.keys(children).length > 0) {
          Object.keys(children).map(function (item) {
            var name = item;
            var _plugin = children[name];
            var options = {
              root: _this2.root
            }; // eslint-disable-next-line no-unused-vars

            var config, _Plugin;

            if (typeof _plugin === 'function') {
              config = _this2.config[name] || {};
              _Plugin = _plugin;
            } else if (_typeof(_plugin) === 'object' && typeof _plugin.plugin === 'function') {
              config = _plugin.options ? Util.deepCopy(_this2.config[name] || {}, _plugin.options) : _this2.config[name] || {};
              _Plugin = _plugin.plugin;
            }

            options.config = config;
            config.index !== undefined && (options.index = config.index);
            config.root && (options.root = config.root);

            _this2.registerPlugin(_Plugin, options, name);
          });
        }
      }
    }
  }, {
    key: "updateLang",
    value: function updateLang(lang) {
      if (!lang) {
        lang = this.lang;
      }

      function checkChildren(node, callback) {
        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].children.length > 0) {
            checkChildren(node.children[i], callback);
          } else {
            callback(node.children[i]);
          }
        }
      }

      var root = this.root,
          i18n = this.i18n,
          langText = this.langText;

      if (root) {
        checkChildren(root, function (node) {
          var langKey = node.getAttribute && node.getAttribute('lang-key');

          if (!langKey) {
            return;
          }

          var langTextShow = i18n[langKey.toUpperCase()] || langText[langKey];

          if (langTextShow) {
            node.innerHTML = typeof langTextShow === 'function' ? langTextShow(lang) : langTextShow;
          }
        });
      }
    }
  }, {
    key: "lang",
    get: function get() {
      return this.player.lang;
    }
  }, {
    key: "changeLangTextKey",
    value: function changeLangTextKey(dom) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var i18n = this.i18n || {};
      var langText = this.langText;
      dom.setAttribute && dom.setAttribute('lang-key', key);
      var text = i18n[key.toUpperCase()] || langText[key];

      if (text) {
        dom.innerHTML = text;
      }
    }
  }, {
    key: "plugins",
    value: function plugins() {
      return this._children;
    }
  }, {
    key: "children",
    value: function children() {
      return {};
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      options.root = options.root || this.root;

      var _c = _get(_getPrototypeOf(Plugin.prototype), "registerPlugin", this).call(this, plugin, options, name);

      this._children.push(_c);

      return _c;
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {};
    }
  }, {
    key: "registerLanguageTexts",
    value: function registerLanguageTexts() {
      return {};
    }
    /**
     *
     * @param { string } qs
     * @returns { HTMLElement | null }
     */

  }, {
    key: "find",
    value: function find(qs) {
      if (!this.root) {
        return;
      }

      return this.root.querySelector(qs);
    }
    /**
     * 绑定事件
     * @param { string | Array<string> } querySelector
     * @param { string | Function } eventType
     * @param { Function } [callback]
     */

  }, {
    key: "bind",
    value: function bind(querySelector, eventType, callback) {
      var _this3 = this;

      if (arguments.length < 3 && typeof eventType === 'function') {
        if (Array.isArray(querySelector)) {
          querySelector.forEach(function (item) {
            _this3.bindEL(item, eventType);
          });
        } else {
          this.bindEL(querySelector, eventType);
        }
      } else {
        var ret = Plugin.delegate.call(this, this.root, querySelector, eventType, callback);
        this.__delegates = this.__delegates.concat(ret);
      }
    }
    /**
     * 绑定事件
     * @param { string | Array<string> } querySelector
     * @param { string | Function } eventType
     */

  }, {
    key: "unbind",
    value: function unbind(querySelector, eventType) {
      var _this4 = this;

      if (arguments.length < 3 && typeof eventType === 'function') {
        if (Array.isArray(querySelector)) {
          querySelector.forEach(function (item) {
            _this4.unbindEL(item, eventType);
          });
        } else {
          this.unbindEL(querySelector, eventType);
        }
      } else {
        var key = "".concat(querySelector, "_").concat(eventType);

        for (var i = 0; i < this.__delegates.length; i++) {
          if (this.__delegates[i].key === key) {
            this.__delegates[i].destroy();

            this.__delegates.splice(i, 1);

            break;
          }
        }
      }
    }
    /**
     * 给插件设置样式
     * @param { string | {[propName: string]: any} } name
     * @param { ？ | any } value
     * @returns
     */

  }, {
    key: "setStyle",
    value: function setStyle(name, value) {
      var _this5 = this;

      if (!this.root) {
        return;
      }

      if (Util.typeOf(name) === 'String') {
        return this.root.style[name] = value;
      } else if (Util.typeOf(name) === 'Object') {
        Object.keys(name).map(function (key) {
          _this5.root.style[key] = name[key];
        });
      }
    }
    /**
     * 给插件根节点设置属性
     * @param { string | {[propName: string]: any} } name
     * @param { ？ | any } value
     * @returns
     */

  }, {
    key: "setAttr",
    value: function setAttr(name, value) {
      var _this6 = this;

      if (!this.root) {
        return;
      }

      if (Util.typeOf(name) === 'String') {
        return this.root.setAttribute(name, value);
      } else if (Util.typeOf(name) === 'Object') {
        Object.keys(name).map(function (key) {
          _this6.root.setAttribute(key, name[key]);
        });
      }
    }
    /**
     *
     * @param { string } htmlStr
     * @param { Function } [callback]
     * @returns
     */

  }, {
    key: "setHtml",
    value: function setHtml(htmlStr, callback) {
      if (!this.root) {
        return;
      }

      this.root.innerHTML = htmlStr;

      if (typeof callback === 'function') {
        callback();
      }
    }
    /**
     *
     * @param { string } event
     * @param { Function } eventHandle
     * @param { boolean } [isBubble=false]
     * @returns
     */

  }, {
    key: "bindEL",
    value: function bindEL(event, eventHandle) {
      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.root) {
        return;
      }

      if ("on".concat(event) in this.root && typeof eventHandle === 'function') {
        this.root.addEventListener(event, eventHandle, isBubble);
      }
    }
    /**
     *
     * @param { string } event
     * @param { Function } eventHandle
     * @param { boolean } [isBubble]
     * @returns
     */

  }, {
    key: "unbindEL",
    value: function unbindEL(event, eventHandle) {
      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.root) {
        return;
      }

      if ("on".concat(event) in this.root && typeof eventHandle === 'function') {
        this.root.removeEventListener(event, eventHandle, isBubble);
      }
    }
    /**
     *
     * @param { string } [value]
     * @returns
     */

  }, {
    key: "show",
    value: function show(value) {
      if (!this.root) {
        return;
      }

      this.root.style.display = value !== undefined ? value : 'block';
      var cs = window.getComputedStyle(this.root, null);
      var cssDisplayValue = cs.getPropertyValue('display');

      if (cssDisplayValue === 'none') {
        return this.root.style.display = 'block';
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.root && (this.root.style.display = 'none');
    }
    /**
     *
     * @param { string | HTMLElement } pdom
     * @param { HTMLElement} child
     * @returns { HTMLElement | nul }
     */

  }, {
    key: "appendChild",
    value: function appendChild(pdom, child) {
      if (arguments.length < 2 && arguments[0] instanceof window.Element) {
        return this.root.appendChild(arguments[0]);
      }

      if (!child || !(child instanceof window.Element)) {
        return null;
      }

      try {
        if (typeof pdom === 'string') {
          return this.find(pdom).appendChild(child);
        } else {
          return pdom.appendChild(child);
        }
      } catch (err) {
        XG_DEBUG.logError('Plugin:appendChild', err);
        return null;
      }
    }
    /**
     *
     * @returns { string | HTMLElement }
     */

  }, {
    key: "render",
    value: function render() {
      return '';
    }
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "__destroy",
    value: function __destroy() {
      var _this7 = this;

      var player = this.player;

      this.__delegates.map(function (item) {
        item.destroy();
      });

      this.__delegates = []; // destroy the sub-plugin instance

      if (this._children instanceof Array) {
        this._children.map(function (item) {
          player.unRegisterPlugin(item.pluginName);
        });

        this._children = null;
      }

      if (this.root) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.root.hasOwnProperty('remove')) {
          this.root.remove();
        } else if (this.root.parentNode) {
          this.root.parentNode.removeChild(this.root);
        }
      }

      _get(_getPrototypeOf(Plugin.prototype), "__destroy", this).call(this);

      this.icons = {};
      ['root', 'parent'].map(function (item) {
        _this7[item] = null;
      });
    }
  }], [{
    key: "insert",
    value:
    /**
      * 插入dom结构
      * @param { String | HTMLElement } html html字符串或者dom
      * @param { HTMLElement } parent
      * @param { number } index
      * @returns { HTMLElement }
      */
    function insert(html, parent) {
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var len = parent.children.length;
      var insertIdx = Number(index);
      var isDomElement = html instanceof window.Node;

      if (len) {
        var i = 0;
        var coordinate = null;
        var mode = '';

        for (; i < len; i++) {
          coordinate = parent.children[i];
          var curIdx = Number(coordinate.getAttribute('data-index'));

          if (curIdx >= insertIdx) {
            mode = 'beforebegin';
            break;
          } else if (curIdx < insertIdx) {
            mode = 'afterend';
          }
        }

        if (isDomElement) {
          if (mode === 'afterend') {
            // as last element
            parent.appendChild(html);
          } else {
            parent.insertBefore(html, coordinate);
          }
        } else {
          coordinate.insertAdjacentHTML(mode, html);
        }

        return mode === 'afterend' ? parent.children[parent.children.length - 1] : parent.children[i];
      } else {
        isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html);
        return parent.children[parent.children.length - 1];
      }
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {};
    }
    /**
     *
     * @param { HTMLElement } root
     * @param { String } querySelector
     * @param { String | Array<String> } eventType
     * @param { Function } callback
     * @param { boolean } [capture=false]
     * @returns
     */

  }, {
    key: "delegate",
    value: function delegate(root, querySelector, eventType, callback) {
      var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var dels = [];

      if (root instanceof window.Node && typeof callback === 'function') {
        if (Array.isArray(eventType)) {
          eventType.forEach(function (item) {
            var ret = _delegate(root, querySelector, item, callback, capture);

            ret.key = "".concat(querySelector, "_").concat(item);
            dels.push(ret);
          });
        } else {
          var ret = _delegate(root, querySelector, eventType, callback, capture);

          ret.key = "".concat(querySelector, "_").concat(eventType);
          dels.push(ret);
        }
      }

      return dels;
    }
  }, {
    key: "ROOT_TYPES",
    get: function get() {
      return ROOT_TYPES;
    }
  }, {
    key: "POSITIONS",
    get: function get() {
      return POSITIONS;
    }
  }]);

  return Plugin;
}(BasePlugin);

export { Plugin as default, ROOT_TYPES, POSITIONS };