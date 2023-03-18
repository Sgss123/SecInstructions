function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Util from '../utils/util';
import Sniffer from '../utils/sniffer';
import Errors from '../error';
import * as Events from '../events';
import XG_DEBUG from '../utils/debug';
import hooksDescriptor, { hook as _hook, useHooks as _useHooks, delHooksDescriptor } from '../plugin/hooksDescriptor';

function showErrorMsg(pluginName, msg) {
  XG_DEBUG.logError("[".concat(pluginName, "] event or callback cant be undefined or null when call ").concat(msg));
}
/**
 * @typedef { import ('../player').default } Player
 */

/**
 * @typedef { import ('../defaultConfig').IPlayerOptions } IPlayerOptions
 */

/**
  * @typedef {{
  * index?: number,
  * player: Player,
  * pluginName: string,
  * config: {
  *   [propName: string]: any
  * },
  * [propName: string]: any;
  * }} IBasePluginOptions
 */


var BasePlugin = /*#__PURE__*/function () {
  /**
   * @param { IBasePluginOptions } args
   */
  function BasePlugin(args) {
    _classCallCheck(this, BasePlugin);

    if (Util.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate(args);
    }

    hooksDescriptor(this);
    /**
     * @private
     */

    this.__args = args;
    /**
     * @private
     */

    this.__events = {};
    this.config = args.config || {};
    /**
     * @readonly
     * @type { Player }
     */

    this.player = null;
    /**
       * @readonly
       * @type { IPlayerOptions }
       */

    this.playerConfig = {};
    /**
       * @readonly
       * @type {string}
       */

    this.pluginName = '';

    this.__init(args);
  }
  /**
   * @param { IBasePluginOptions } args
   */


  _createClass(BasePlugin, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {}
  }, {
    key: "afterCreate",
    value: function afterCreate() {}
  }, {
    key: "beforePlayerInit",
    value: function beforePlayerInit() {}
  }, {
    key: "onPluginsReady",
    value: function onPluginsReady() {}
  }, {
    key: "afterPlayerInit",
    value: function afterPlayerInit() {}
  }, {
    key: "destroy",
    value: function destroy() {}
    /**
     * @private
     * @param { any } args
     */

  }, {
    key: "__init",
    value: function __init(args) {
      this.player = args.player;
      this.playerConfig = args.player && args.player.config;
      this.pluginName = args.pluginName ? args.pluginName.toLowerCase() : this.constructor.pluginName.toLowerCase();
      this.logger = args.player && args.player.logger;
    }
    /**
     * 更新语言
     * @param { string } lang
     */

  }, {
    key: "updateLang",
    value: function updateLang(lang) {
      if (!lang) {
        lang = this.lang;
      }
    }
    /**
     * @type { string }
     */

  }, {
    key: "lang",
    get: function get() {
      return this.player.lang;
    }
  }, {
    key: "i18n",
    get: function get() {
      return this.player.i18n;
    }
  }, {
    key: "i18nKeys",
    get: function get() {
      return this.player.i18nKeys;
    }
    /**
     *
     * @param { string | Array<string> } event
     * @param { Function } callback
     * @returns
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      var _this = this;

      if (!event || !callback || !this.player) {
        showErrorMsg(this.pluginName, 'plugin.on(event, callback)');
        return;
      }

      if (typeof event === 'string') {
        this.__events[event] = callback;
        this.player.on(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function (item) {
          _this.__events[item] = callback;

          _this.player.on(item, callback);
        });
      }
    }
    /**
     *
     * @param { string } event
     * @param { Function } callback
     * @returns
     */

  }, {
    key: "once",
    value: function once(event, callback) {
      if (!event || !callback || !this.player) {
        showErrorMsg(this.pluginName, 'plugin.once(event, callback)');
        return;
      }

      this.player.once(event, callback);
    }
    /**
     *
     * @param { string } event
     * @param { Function } callback
     * @returns
     */

  }, {
    key: "off",
    value: function off(event, callback) {
      var _this2 = this;

      if (!event || !callback || !this.player) {
        showErrorMsg(this.pluginName, 'plugin.off(event, callback)');
        return;
      }

      if (typeof event === 'string') {
        delete this.__events[event];
        this.player.off(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function (item) {
          delete _this2.__events[event];

          _this2.player.off(item, callback);
        });
      }
    }
  }, {
    key: "offAll",
    value: function offAll() {
      var _this3 = this;

      Object.keys(this.__events).map(function (item) {
        _this3.__events[item] && _this3.off(item, _this3.__events[item]);
        item && delete _this3.__events[item];
      });
      this.__events = {};
    }
    /**
     *
     * @param { string } event
     * @param { any } [res]
     * @returns
     */

  }, {
    key: "emit",
    value: function emit(event, res) {
      if (!this.player) {
        return;
      }

      this.player.emit(event, res);
    }
  }, {
    key: "emitUserAction",
    value: function emitUserAction(event, action) {
      var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var ext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (!action || !event) {
        return;
      }

      var eventType = Util.typeOf(event) === 'String' ? event : event.type || '';
      event = new Event(eventType);

      if (Util.typeOf(props) !== 'Array') {
        props = [props];
      }

      this.emit(Events.USER_ACTION, _objectSpread({
        action: action,
        pluginName: this.pluginName,
        currentTime: this.player.currentTime,
        duration: this.player.duration,
        ended: this.player.ended,
        event: event,
        props: props
      }, ext));
    }
    /**
     * @param { string } hookName
     * @param { Function } handler
     * @param { {pre: Function| null , next: Function | null} } preset
     * @returns
     */

  }, {
    key: "hook",
    value: function hook(hookName, handler) {
      var preset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        pre: null,
        next: null
      };
      // eslint-disable-next-line no-return-assign
      return _hook.call.apply(_hook, [this].concat(Array.prototype.slice.call(arguments)));
    }
    /**
     * @param { string } hookName
     * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
     * @param  {...any} args
     * @returns { boolean } isSuccess
     */

  }, {
    key: "useHooks",
    value: function useHooks(hookName, handler) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return _useHooks.call.apply(_useHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
    /**
     * 注册子插件
     * @param { any } plugin
     * @param { any } [options]
     * @param { string } [name]
     * @returns { any }
     */

  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (!this.player) {
        return;
      }

      name && (options.pluginName = name);
      return this.player.registerPlugin({
        plugin: plugin,
        options: options
      });
    }
    /**
     *
     * @param { string } name
     * @returns { any | null }
     */

  }, {
    key: "getPlugin",
    value: function getPlugin(name) {
      return this.player ? this.player.getPlugin(name) : null;
    }
  }, {
    key: "__destroy",
    value: function __destroy() {
      var _this4 = this;

      var player = this.player;
      var pluginName = this.pluginName;
      this.offAll();
      Util.clearAllTimers(this);

      if (Util.checkIsFunction(this.destroy)) {
        this.destroy();
      }

      ['player', 'playerConfig', 'pluginName', 'logger', '__args', '__hooks'].map(function (item) {
        _this4[item] = null;
      });
      player.unRegisterPlugin(pluginName);
      delHooksDescriptor(this);
    }
  }], [{
    key: "defineGetterOrSetter",
    value: function defineGetterOrSetter(Obj, map) {
      for (var key in map) {
        Object.defineProperty(Obj, key, map[key]);
      }
    }
    /**
     * @type { { [propName: string]: any } }
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {};
    }
    /**
     * @type { string }
     */

  }, {
    key: "pluginName",
    get: function get() {
      return 'pluginName';
    }
  }]);

  return BasePlugin;
}();

export { BasePlugin as default, Util, Sniffer, Errors, Events, XG_DEBUG };