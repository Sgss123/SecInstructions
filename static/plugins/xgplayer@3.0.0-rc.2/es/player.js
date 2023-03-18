function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import VideoProxy from './proxy';
import Util from './utils/util';
import Sniffer from './utils/sniffer';
import Database from './utils/database';
import Errors from './error';
import * as Events from './events';
import { FULLSCREEN_EVENTS, GET_FULLSCREEN_API, EXIT_FULLSCREEN_API } from './constant';
import Plugin from './plugin/plugin';
import BasePlugin from './plugin/basePlugin';
import pluginsManager from './plugin/pluginsManager';
import STATE_CLASS from './stateClassMap';
import getDefaultConfig from './defaultConfig';
import { usePreset } from './plugin/preset';
import hooksDescriptor, { runHooks, useHooks as _useHooks, delHooksDescriptor, usePluginHooks as _usePluginHooks, hook as _hook } from './plugin/hooksDescriptor';
import Controls from './plugins/controls/index';
import XG_DEBUG, { bindDebug } from './utils/debug';
import I18N from './lang/i18n';
import version from './version';
import { STATES, STATE_ARRAY } from './state';
/**
 * @typedef { import ('./defaultConfig').IPlayerOptions } IPlayerOptions
 */

/* eslint-disable camelcase */

var PlAYER_HOOKS = ['play', 'pause', 'replay', 'retry'];

var Player = /*#__PURE__*/function (_VideoProxy) {
  _inherits(Player, _VideoProxy);

  var _super = _createSuper(Player);

  /**
   * @param { IPlayerOptions } options
   */
  function Player(options) {
    var _this;

    _classCallCheck(this, Player);

    var config = Util.deepMerge(getDefaultConfig(), options);
    _this = _super.call(this, config);
    hooksDescriptor(_assertThisInitialized(_this), PlAYER_HOOKS);
    /**
     * @type { IPlayerOptions }
     * @description 当前播放器的配置信息
     */

    _this.config = config;
    bindDebug(_assertThisInitialized(_this)); // resolve default preset

    var defaultPreset = _this.constructor.defaultPreset;

    if (_this.config.presets.length) {
      var defaultIdx = _this.config.presets.indexOf('default');

      if (defaultIdx >= 0 && defaultPreset) {
        _this.config.presets[defaultIdx] = defaultPreset;
      }
    } else if (defaultPreset) {
      _this.config.presets.push(defaultPreset);
    } // timer and flags


    _this.userTimer = null;
    /**
     * @private
     */

    _this.waitTimer = null;
    /**
     * @private
     */

    _this._state = STATES.INITIAL;
    /**
     * @private
     */

    _this._hasStart = false;
    /**
     * Whether the player is in the seeking state
     * @type { boolean }
     * @readonly
     */

    _this.isSeeking = false;
    /**
     * @type { boolean }
     * @readonly
     */

    _this.isCanplay = false;
    /**
     * @private
     * @readonly
     */

    _this._runPending = false;
    /**
     *  @type { number }
     */

    _this.rotateDeg = 0;
    /**
     * Whether the player is focus
     * @type { boolean }
     * @readonly
     */

    _this.isActive = false;
    /**
     * @type { boolean }
     * @readonly
     */

    _this.isCssfullScreen = false;
    /**
     * Whether player is currently in fullscreen
     * @type { boolean }
     * @readonly
     */

    _this.fullscreen = false;
    /**
     * fullscreenElement
     * @type { HTMLElement | null }
     * @readonly
     */

    _this._fullscreenEl = null;
    /**
     * cssFullscreen target Element
     * @type { HTMLElement | null }
     * @readonly
     */

    _this._cssfullscreenEl = null;
    /**
     * @private
     * @type { string }
     */

    _this._orgCss = '';
    /**
     * @readonly
     * @type { number }
     */

    _this._fullScreenOffset = null;
    /**
     * @private
     * @type { number }
     */

    _this._videoHeight = 0;
    /**
     * @private
     * @type { number }
     */

    _this._videoWidth = 0;
    /**
     * @private
     * @type { { begin: number, end:number, acc: number } }
     */

    _this._played = {
      begin: -1,
      end: -1,
      acc: 0
    };
    /**
     * @type { null | HTMLElement }
     * @readonly
     * @description  控制栏和video不同布局的时候内部容器
     */

    _this.innerContainer = null;
    /**
     * @type { null | Object }
     * @readonly
     * @description 控制栏插件
     */

    _this.controls = null;
    /**
     * @type { null | HTMLElement }
     * @readonly
     */

    _this.topBar = null;
    /**
     * @type { null | HTMLElement }
     * @readonly
     */

    _this.topBar = null;
    /**
     * @type { null | HTMLElement }
     * @readonly
     * @description 当前播放器根节点
     */

    _this.root = null; // android 6以下不支持自动播放

    if (Sniffer.os.isAndroid && Sniffer.osVersion > 0 && Sniffer.osVersion < 6) {
      _this.config.autoplay = false;
    }
    /**
     * @readonly
     * @type {any}
     */


    _this.database = new Database();

    var rootInit = _this._initDOM();

    if (!rootInit) {
      console.error(new Error("can't find the dom which id is ".concat(_this.config.id, " or this.config.el does not exist")));
      return _possibleConstructorReturn(_this);
    }

    _this._bindEvents();

    _this._registerPresets();

    _this._registerPlugins();

    pluginsManager.onPluginsReady(_assertThisInitialized(_this));

    _this.setState(STATES.READY);

    _this.emit(Events.READY);

    _this.onReady && _this.onReady();

    if (_this.config.videoInit || _this.config.autoplay) {
      if (!_this.hasStart || _this.state < STATES.ATTACHED) {
        _this.start();
      }
    }

    return _this;
  }
  /**
   * init control domElement
   * @private
   */


  _createClass(Player, [{
    key: "_initDOM",
    value: function _initDOM() {
      var _this2 = this;

      this.root = this.config.id ? document.getElementById(this.config.id) : null;

      if (!this.root) {
        var el = this.config.el;

        if (el && el.nodeType === 1) {
          this.root = el;
        } else {
          this.emit(Events.ERROR, new Errors('use', this.config.vid, {
            line: 32,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          }));
          console.error('this.confg.id or this.config.el can\'t be empty');
          return false;
        }
      }

      var ret = pluginsManager.checkPlayerRoot(this.root);

      if (ret) {
        XG_DEBUG.logWarn('The is an Player instance already exists in this.root, destroy it and reinitialize');
        ret.destroy();
      }

      this._initBaseDoms(); // 允许自定义video对象的构造


      var XgVideoProxy = this.constructor.XgVideoProxy;

      if (XgVideoProxy && this.videoConfig.mediaType === XgVideoProxy.mediaType) {
        var _el = this.innerContainer || this.root;

        this.detachVideoEvents(this.video);

        var _nVideo = new XgVideoProxy(_el, this.config, this.videoConfig);

        this.attachVideoEvents(_nVideo);
        this.video = _nVideo;
      }

      if (this.config.controls) {
        var controls = pluginsManager.register(this, Controls);
        this.controls = controls;
      }

      var device = this.config.isMobileSimulateMode ? 'mobile' : Sniffer.device;
      this.addClass("".concat(STATE_CLASS.DEFAULT, " ").concat(STATE_CLASS.ACTIVE, " xgplayer-").concat(device, " ").concat(this.config.controls ? '' : STATE_CLASS.NO_CONTROLS));

      if (this.config.autoplay) {
        this.addClass(STATE_CLASS.ENTER);
      } else {
        this.addClass(STATE_CLASS.NO_START);
      }

      if (this.config.fluid) {
        var style = {
          'max-width': '100%',
          width: '100%',
          height: '0',
          'padding-top': "".concat(this.config.height * 100 / this.config.width, "%"),
          position: 'position',
          top: '0',
          left: '0'
        };
        Object.keys(style).map(function (key) {
          _this2.root.style[key] = style[key];
        });
      } else {
        ['width', 'height'].map(function (key) {
          if (_this2.config[key]) {
            if (typeof _this2.config[key] !== 'number') {
              _this2.root.style[key] = _this2.config[key];
            } else {
              _this2.root.style[key] = "".concat(_this2.config[key], "px");
            }
          }
        });
      }

      return true;
    }
    /**
     * @private
     */

  }, {
    key: "_initBaseDoms",
    value: function _initBaseDoms() {
      /**
       * @readonly
       * @type { HTMLElement }
       */
      this.topBar = Util.createDom('xg-bar', '', {
        'data-index': -1
      }, 'xg-top-bar');
      /**
       * @readonly
       * @type { HTMLElement }
       */

      this.leftBar = Util.createDom('xg-bar', '', {
        'data-index': -1
      }, 'xg-left-bar');
      /**
       * @readonly
       * @type { HTMLElement }
       */

      this.rightBar = Util.createDom('xg-bar', '', {
        'data-index': -1
      }, 'xg-right-bar');

      if (this.config.marginControls) {
        this.innerContainer = Util.createDom('xg-video-container', '', {
          'data-index': -1
        }, 'xg-video-container');
        this.root.appendChild(this.innerContainer);
      }

      this.root.appendChild(this.topBar);
      this.root.appendChild(this.leftBar);
      this.root.appendChild(this.rightBar);
    }
    /**
     * @private
     */

  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this3 = this;

      ['focus', 'blur'].forEach(function (item) {
        _this3.on(item, _this3['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
      });

      var resetFullState = function resetFullState() {
        _this3.fullscreen = false;
        _this3._fullScreenOffset = null;
      };
      /**
       * @private
       */


      this.onFullscreenChange = function (event, isFullScreen) {
        var fullEl = Util.getFullScreenEl();

        if (_this3._fullActionFrom) {
          _this3._fullActionFrom = '';
        } else {
          // 快捷键触发
          _this3.emit(Events.USER_ACTION, {
            eventType: 'system',
            action: 'switch_fullscreen',
            pluginName: 'player',
            currentTime: _this3.currentTime,
            duration: _this3.duration,
            props: [{
              prop: 'fullscreen',
              from: true,
              to: false
            }]
          });
        }

        if (isFullScreen || fullEl && (fullEl === _this3._fullscreenEl || fullEl.tagName === 'VIDEO')) {
          Util.setTimeout(_this3, function () {
            _this3.resize();
          }, 100);

          _this3.video.focus();

          _this3.fullscreen = true; // this.addClass(STATE_CLASS.FULLSCREEN)

          _this3.changeFullStyle(_this3.root, fullEl, STATE_CLASS.FULLSCREEN);

          _this3.emit(Events.FULLSCREEN_CHANGE, true, _this3._fullScreenOffset);

          if (_this3.isCssfullScreen) {
            _this3.exitCssFullscreen();
          }
        } else if (_this3.fullscreen) {
          Util.setTimeout(_this3, function () {
            _this3.resize();
          }, 100);
          var _fullScreenOffset = _this3._fullScreenOffset,
              config = _this3.config;

          if (config.needFullscreenScroll) {
            try {
              window.scrollTo(_fullScreenOffset.left, _fullScreenOffset.top);
              Util.setTimeout(_this3, function () {
                resetFullState();
              }, 50);
            } catch (e) {
              XG_DEBUG.logError(e);
              resetFullState();
            }
          } else {
            // 保证页面scroll的情况下退出全屏 页面定位在播放器位置
            _this3.video.focus();

            resetFullState();
          }

          if (!_this3.isCssfullScreen) {
            _this3.recoverFullStyle(_this3.root, _this3._fullscreenEl, STATE_CLASS.FULLSCREEN);
          } else {
            _this3.removeClass(STATE_CLASS.FULLSCREEN);
          }

          _this3._fullscreenEl = null; // this.removeClass(STATE_CLASS.FULLSCREEN)

          _this3.emit(Events.FULLSCREEN_CHANGE, false);
        }
      };

      FULLSCREEN_EVENTS.forEach(function (item) {
        document && document.addEventListener(item, _this3.onFullscreenChange);
      });
      /**
       * @private
       */

      this.__webkitbeginfullscreen = function (e) {
        _this3._fullscreenEl = _this3.video;

        _this3.onFullscreenChange(e, true);
      };
      /**
       * @private
       */


      this.__webkitendfullscreen = function (e) {
        _this3.onFullscreenChange(e, false);
      };

      if (Sniffer.os.isIos) {
        this.video.addEventListener('webkitbeginfullscreen', this.__webkitbeginfullscreen);
        this.video.addEventListener('webkitendfullscreen', this.__webkitendfullscreen);
      }

      this.once('loadeddata', this.resize);

      this.playFunc = function () {
        if (!_this3.config.closeFocusVideoFocus) {
          _this3.video.focus();
        }
      };

      this.once('play', this.playFunc);
    }
    /**
     * @private
     */

  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      var _this4 = this;

      this.root.removeEventListener('mousemove', this.mousemoveFunc);
      FULLSCREEN_EVENTS.forEach(function (item) {
        document.removeEventListener(item, _this4.onFullscreenChange);
      });
      this.playFunc && this.off('play', this.playFunc);
      this.canPlayFunc && this.off('canplay', this.canPlayFunc);
      this.video.removeEventListener('webkitbeginfullscreen', this.__webkitbeginfullscreen);
      this.video.removeEventListener('webkitendfullscreen', this.__webkitendfullscreen);
    }
    /**
     *
     * @param { any } url
     * @returns
     */

  }, {
    key: "_startInit",
    value: function _startInit(url) {
      var _this5 = this;

      if (!url || url === '') {
        this.emit(Events.URL_NULL);
        XG_DEBUG.logWarn('config.url is null, please get url and run player._startInit(url)');

        if (this.config.nullUrlStart) {
          return;
        }
      }

      this.canPlayFunc = function () {
        if (!_this5.config) {
          return;
        }

        var _this5$config = _this5.config,
            autoplay = _this5$config.autoplay,
            startTime = _this5$config.startTime,
            volume = _this5$config.volume,
            defaultPlaybackRate = _this5$config.defaultPlaybackRate;
        XG_DEBUG.logInfo('player', 'canPlayFunc', startTime);

        if (Util.typeOf(volume) === 'Number') {
          _this5.volume = volume;
        }

        if (startTime) {
          _this5.currentTime = startTime > _this5.duration ? _this5.duration : startTime;
        }

        if (defaultPlaybackRate !== 1) {
          _this5.playbackRate = defaultPlaybackRate;
        }

        autoplay && _this5.videoPlay();

        _this5.off(Events.CANPLAY, _this5.canPlayFunc);

        _this5.removeClass(STATE_CLASS.ENTER);
      };

      if (Util.typeOf(url) === 'Array') {
        url.forEach(function (item) {
          _this5.video.appendChild(Util.createDom('source', '', {
            src: "".concat(item.src),
            type: "".concat(item.type || '')
          }));
        });

        this._attachSourceEvents(this.video);
      } else {
        this.video.src = url;
      }

      this.loadeddataFunc && this.once('loadeddata', this.loadeddataFunc);

      var _root = this.innerContainer ? this.innerContainer : this.root;

      if (this.video instanceof window.Element && !_root.contains(this.video)) {
        _root.insertBefore(this.video, _root.firstChild);
      }

      if (this.video.readyState >= 2) {
        this.canPlayFunc();
      } else {
        this.once(Events.CANPLAY, this.canPlayFunc);
      }

      XG_DEBUG.logInfo('_startInit');

      if (this.config.autoplay) {
        this.load(); // ios端无法自动播放的场景下，不调用play不会触发canplay loadeddata等事件

        (Sniffer.os.isIpad || Sniffer.os.isPhone) && this.videoPlay();
      }

      Util.setTimeout(this, function () {
        _this5.emit(Events.COMPLETE);
      }, 1);

      if (!this.hasStart || this.state < STATES.ATTACHED) {
        pluginsManager.afterInit(this);
      }

      this.hasStart = true;
      this.setState(STATES.ATTACHED);
    }
    /**
     * 针对source列表播放方式添加错误监听
     * @doc https://stackoverflow.com/questions/47557135/html5-detect-the-type-of-error-when-trying-to-load-a-video-using-a-source-elem
     * @protected
     * @param { HTMLVideoElement | HTMLAudioElement } video
     */

  }, {
    key: "_attachSourceEvents",
    value: function _attachSourceEvents(video) {
      var _this6 = this;

      var _c = video.children;
      /**
       * @private
       */

      this._videoSourceCount = _c.length;
      /**
       * @private
       */

      !this._sourceError && (this._sourceError = function (e) {
        _this6._videoSourceCount--;

        if (_this6._videoSourceCount === 0) {
          if (_this6.videoEventMiddleware.error) {
            _this6.videoEventMiddleware.error.call(_this6, e, function () {
              _this6.errorHandler('error');
            });
          } else {
            _this6.errorHandler('error', {
              code: 4,
              message: 'sources load error'
            });
          }
        }
      });

      for (var i = 0; i < _c.length; i++) {
        _c[i].addEventListener('error', this._sourceError);
      }
    }
    /**
     * 移除source列表错误事件监听
     * @protected
     * @param { HTMLVideoElement | HTMLAudioElement } video
     */

  }, {
    key: "_detachSourceEvents",
    value: function _detachSourceEvents(video) {
      var _c = video.children;

      if (_c.length === 0 || !this._sourceError) {
        return;
      }

      for (var i = 0; i < _c.length; i++) {
        _c[i].removeEventListener('error', this._sourceError);
      }
    }
    /**
     * 注册组件 组件列表config.plugins
     * @private
     */

  }, {
    key: "_registerPlugins",
    value: function _registerPlugins() {
      var _this7 = this;

      /**
       * @private
       */
      this._loadingPlugins = [];
      var ignores = this.config.ignores || [];
      var plugins = this.config.plugins || [];
      var i18n = this.config.i18n || [];
      i18n.map(function (item) {
        I18N.use(item);
      });
      var ignoresStr = ignores.join('||').toLowerCase().split('||');
      plugins.map(function (plugin) {
        try {
          var pluginName = plugin.plugin ? plugin.plugin.pluginName : plugin.pluginName; // 在ignores中的不做组装

          if (pluginName && ignoresStr.indexOf(pluginName.toLowerCase()) > -1) {
            return null;
          }

          if (plugin.lazy && plugin.loader) {
            var loadingPlugin = pluginsManager.lazyRegister(_this7, plugin);

            if (plugin.forceBeforeInit) {
              loadingPlugin.then(function () {
                _this7._loadingPlugins.splice(_this7._loadingPlugins.indexOf(loadingPlugin), 1);
              }).catch(function (e) {
                XG_DEBUG.logError('_registerPlugins:loadingPlugin', e);

                _this7._loadingPlugins.splice(_this7._loadingPlugins.indexOf(loadingPlugin), 1);
              });

              _this7._loadingPlugins.push(loadingPlugin);
            }

            return;
          }

          return _this7.registerPlugin(plugin);
        } catch (err) {
          XG_DEBUG.logError('_registerPlugins:', err);
          return null;
        }
      });
    }
    /**
     * @private
     */

  }, {
    key: "_registerPresets",
    value: function _registerPresets() {
      var _this8 = this;

      this.config.presets.forEach(function (preset) {
        usePreset(_this8, preset);
      });
    }
    /**
     *
     * @param { {plugin: function, options:object} | function } plugin
     * @param { {[propName: string]: any;} } [config]
     * @returns { any } plugin
     */

  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin, config) {
      var PLUFGIN = null;
      var options = null;

      if (plugin.plugin && typeof plugin.plugin === 'function') {
        PLUFGIN = plugin.plugin;
        options = plugin.options;
      } else {
        PLUFGIN = plugin;
        options = {};
      }

      if (config) {
        options.config = config;
      } // 获取配置的position或者root


      var keys = Object.keys(this.config);

      for (var i = 0; i < keys.length; i++) {
        if (PLUFGIN.pluginName.toLowerCase() === keys[i].toLowerCase()) {
          var _pConfig = this.config[keys[i]];

          if (Util.typeOf(_pConfig) === 'Object') {
            _pConfig.root && (options.root = _pConfig.root);
            _pConfig.position && (options.position = _pConfig.position);
          }

          break;
        }
      }

      var position = options.position ? options.position : options.config && options.config.position || PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position;
      var POSITIONS = Plugin.POSITIONS;

      if (!options.root && typeof position === 'string' && position.indexOf('controls') > -1) {
        return this.controls && this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName);
      }

      if (!options.root) {
        switch (position) {
          case POSITIONS.ROOT_RIGHT:
            options.root = this.rightBar;
            break;

          case POSITIONS.ROOT_LEFT:
            options.root = this.leftBar;
            break;

          case POSITIONS.ROOT_TOP:
            options.root = this.topBar;
            break;

          default:
            options.root = this.innerContainer || this.root;
            break;
        }
      }

      return pluginsManager.register(this, PLUFGIN, options);
    }
    /**
     *
     * @param { any } plugin
     */

  }, {
    key: "deregister",
    value: function deregister(plugin) {
      if (typeof plugin === 'string') {
        pluginsManager.unRegister(this, plugin);
      } else if (plugin instanceof BasePlugin) {
        pluginsManager.unRegister(this, plugin.pluginName);
      }
    }
    /**
     *
     * @param { any } plugin
     */

  }, {
    key: "unRegisterPlugin",
    value: function unRegisterPlugin(plugin) {
      this.deregister(plugin);
    }
    /**
     * 当前播放器挂载的插件实例列表
     * @type { {[propName: string]: any | null } }
     */

  }, {
    key: "plugins",
    get: function get() {
      return pluginsManager.getPlugins(this);
    }
    /**
     * get a plugin instance
     * @param { string } pluginName
     * @return { null | any } plugin
     */

  }, {
    key: "getPlugin",
    value: function getPlugin(pluginName) {
      var plugin = pluginsManager.findPlugin(this, pluginName);
      return plugin && plugin.pluginName ? plugin : null;
    }
    /**
     *
     * @param { string } className
     */

  }, {
    key: "addClass",
    value: function addClass(className) {
      if (!this.root) {
        return;
      }

      if (!Util.hasClass(this.root, className)) {
        Util.addClass(this.root, className);
      }
    }
    /**
     *
     * @param { string } className
     * @returns
     */

  }, {
    key: "removeClass",
    value: function removeClass(className) {
      if (!this.root) {
        return;
      }

      Util.removeClass(this.root, className);
    }
    /**
     *
     * @param { string } className
     * @returns { boolean } has
     */

  }, {
    key: "hasClass",
    value: function hasClass(className) {
      if (!this.root) {
        return;
      }

      return Util.hasClass(this.root, className);
    }
    /**
     *
     * @param { string } key
     * @param { any } value
     * @returns void
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (!this.root) {
        return;
      }

      this.root.setAttribute(key, value);
    }
    /**
     *
     * @param { string } key
     * @param { any } value
     * @returns void
     */

  }, {
    key: "removeAttribute",
    value: function removeAttribute(key, value) {
      if (!this.root) {
        return;
      }

      this.root.removeAttribute(key, value);
    }
    /**
     *
     * @param { any } url
     * @returns { Promise<void> | void }
     * @description 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
     */

  }, {
    key: "start",
    value: function start(url) {
      var _this9 = this;

      // 已经开始初始化播放了 则直接调用play
      if (this.hasStart || this.state >= STATES.ATTACHING) {
        return Promise.resolve();
      }

      this.hasStart = true;
      this.setState(STATES.ATTACHING);
      return pluginsManager.beforeInit(this).then(function () {
        // this.config为空即已经销毁，不再执行后面的异步流程
        if (!_this9.config) {
          return;
        }

        if (!url) {
          url = _this9.url || _this9.config.url;
        }

        var ret = _this9._startInit(url);

        return ret;
      }).catch(function (e) {
        e.fileName = 'player';
        e.lineNumber = '236';
        XG_DEBUG.logError('start:beforeInit:', e);
        throw e;
      });
    }
  }, {
    key: "load",
    value: function load() {
      this.video && this.video.load();
    }
  }, {
    key: "videoPlay",
    value: function videoPlay() {
      var _this10 = this;

      if (!this.hasStart && this.state < STATES.ATTACHED) {
        this.removeClass(STATE_CLASS.NO_START);
        this.addClass(STATE_CLASS.ENTER);
        var ret = this.start();
        ret && ret.then(function (resolve) {
          !_this10.config.autoplay && _this10.videoPlay();
        });
        return;
      }

      if (this.state < STATES.RUNNING) {
        this.removeClass(STATE_CLASS.NO_START);
        !this.isCanplay && this.addClass(STATE_CLASS.ENTER);
      }

      var playPromise = _get(_getPrototypeOf(Player.prototype), "play", this).call(this);

      if (playPromise !== undefined && playPromise && playPromise.then) {
        playPromise.then(function () {
          _this10.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);

          _this10.addClass(STATE_CLASS.PLAYING);

          if (_this10.state < STATES.RUNNING) {
            XG_DEBUG.logInfo('>>>>playPromise.then');

            _this10.setState(STATES.RUNNING);

            _this10.emit(Events.AUTOPLAY_STARTED);
          }
        }).catch(function (e) {
          XG_DEBUG.logWarn('>>>>playPromise.catch', e.name);

          if (_this10.video && _this10.video.error) {
            _this10.onError(); // this.errorHandler('error')


            _this10.removeClass(STATE_CLASS.ENTER);

            _this10.setState(STATES.ERROR);

            return;
          } // 避免AUTOPLAY_PREVENTED先于playing和play触发


          if (e.name === 'NotAllowedError') {
            /**
             * @private
             */
            _this10._errorTimer = Util.setTimeout(_this10, function () {
              _this10._errorTimer = null;

              _this10.emit(Events.AUTOPLAY_PREVENTED);

              _this10.addClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);

              _this10.removeClass(STATE_CLASS.ENTER);

              _this10.pause();

              _this10.setState(STATES.NOTALLOW);
            }, 0);
          }
        });
      } else {
        XG_DEBUG.logWarn('video.play not return promise');

        if (this.state < STATES.RUNNING) {
          this.setState(STATES.RUNNING);
          this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);
          this.removeClass(STATE_CLASS.NO_START);
          this.removeClass(STATE_CLASS.ENTER);
          this.addClass(STATE_CLASS.PLAYING);
          this.emit(Events.AUTOPLAY_STARTED);
        }
      }

      return playPromise;
    }
  }, {
    key: "videoPause",
    value: function videoPause() {
      _get(_getPrototypeOf(Player.prototype), "pause", this).call(this);
    }
  }, {
    key: "play",
    value: function play() {
      var _this11 = this;

      this.removeClass(STATE_CLASS.PAUSED);
      runHooks(this, 'play', function () {
        _this11.videoPlay();
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this12 = this;

      runHooks(this, 'pause', function () {
        _get(_getPrototypeOf(Player.prototype), "pause", _this12).call(_this12);
      });
    }
    /**
     *
     * @param { number } time
     * @returns
     */

  }, {
    key: "seek",
    value: function seek(time) {
      var _this13 = this;

      if (!this.video || isNaN(Number(time))) {
        return;
      }

      var _this$config = this.config,
          isSeekedPlay = _this$config.isSeekedPlay,
          seekedStatus = _this$config.seekedStatus;

      var _status = isSeekedPlay ? 'play' : seekedStatus;

      time = time < 0 ? 0 : time > this.duration ? parseInt(this.duration, 10) : time;
      this.once(Events.CANPLAY, function () {
        _this13.removeClass(STATE_CLASS.ENTER);

        _this13.isSeeking = false;

        switch (_status) {
          case 'play':
            _this13.play();

            break;

          case 'pause':
            _this13.pause();

            break;

          default:
            !_this13.paused && _this13.play();
        }
      });

      if (this.state < STATES.RUNNING) {
        this.removeClass(STATE_CLASS.NO_START);
        this.addClass(STATE_CLASS.ENTER);
        this.currentTime = time;
        _status === 'play' && this.play();
      } else {
        this.currentTime = time;
      }
    }
  }, {
    key: "reload",
    value: function reload() {
      this.load();
      /**
       * @private
       */

      this.reloadFunc = function () {
        this.play().catch(function (err) {
          console.log(err);
        });
      };

      this.once('loadeddata', this.reloadFunc);
    }
  }, {
    key: "resetState",
    value: function resetState() {
      var _this14 = this;

      var NOT_ALLOW_AUTOPLAY = STATE_CLASS.NOT_ALLOW_AUTOPLAY,
          PLAYING = STATE_CLASS.PLAYING,
          NO_START = STATE_CLASS.NO_START,
          PAUSED = STATE_CLASS.PAUSED,
          REPLAY = STATE_CLASS.REPLAY,
          ENTER = STATE_CLASS.ENTER,
          ENDED = STATE_CLASS.ENDED,
          ERROR = STATE_CLASS.ERROR,
          LOADING = STATE_CLASS.LOADING;
      var clsList = [NOT_ALLOW_AUTOPLAY, PLAYING, NO_START, PAUSED, REPLAY, ENTER, ENDED, ERROR, LOADING];
      this.hasStart = false;
      this.videoPause();
      clsList.forEach(function (cls) {
        _this14.removeClass(cls);
      });
      this.addClass(STATE_CLASS.ENTER);
      this.emit(Events.EMPTIED);
    }
    /**
     * @description destroy the player instance
     * @returns
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this15 = this;

      var innerContainer = this.innerContainer,
          root = this.root,
          video = this.video;

      if (!root) {
        return;
      }

      this._hasStart = false;

      this._unbindEvents();

      this._detachSourceEvents(this.video);

      Util.clearAllTimers(this);
      pluginsManager.destroy(this);
      delHooksDescriptor(this);

      _get(_getPrototypeOf(Player.prototype), "destroy", this).call(this); // 退出全屏


      if (this.fullscreen && this._fullscreenEl === this.root) {
        try {
          this.exitFullscreen();
        } catch (e) {}
      }

      if (innerContainer) {
        var _c = innerContainer.children;

        for (var i = 0; i < _c.length; i++) {
          innerContainer.removeChild(_c[i]);
        }
      }

      root.contains(video) && root.removeChild(video);
      ['topBar', 'leftBar', 'rightBar', 'innerContainer'].map(function (item) {
        _this15[item] && root.removeChild(_this15[item]);
        _this15[item] = null;
      });
      var cList = root.className.split(' ');

      if (cList.length > 0) {
        root.className = cList.filter(function (name) {
          return name.indexOf('xgplayer') < 0;
        }).join(' ');
      } else {
        root.className = '';
      }

      this.removeAttribute('data-xgfill');
      ['isSeeking', 'isCanplay', 'isActive', 'isCssfullScreen', 'fullscreen'].map(function (key) {
        _this15[key] = false;
      });
    }
  }, {
    key: "replay",
    value: function replay() {
      var _this16 = this;

      this.removeClass(STATE_CLASS.ENDED);
      this.currentTime = 0;
      this.isSeeking = false;
      runHooks(this, 'replay', function () {
        _this16.once(Events.CANPLAY, function () {
          var playPromise = _this16.play();

          if (playPromise && playPromise.catch) {
            playPromise.catch(function (err) {
              console.log(err);
            });
          }
        });

        _this16.play();

        _this16.emit(Events.REPLAY);

        _this16.onPlay();
      });
    }
  }, {
    key: "retry",
    value: function retry() {
      var _this17 = this;

      this.removeClass(STATE_CLASS.ERROR);
      this.addClass(STATE_CLASS.LOADING);
      runHooks(this, 'retry', function () {
        var cur = _this17.currentTime;

        _this17.videoPause();

        _this17.src = _this17.config.url;
        !_this17.config.isLive && (_this17.currentTime = cur);

        _this17.once(Events.CANPLAY, function () {
          _this17.videoPlay();
        });
      });
    }
    /**
     *
     * @param { HTMLElement } [root]
     * @param { HTMLElement } [el]
     * @param { string } [rootClass]
     * @param { string } [pClassName]
     */

  }, {
    key: "changeFullStyle",
    value: function changeFullStyle(root, el, rootClass, pClassName) {
      if (!pClassName) {
        pClassName = STATE_CLASS.PARENT_FULLSCREEN;
      }

      if (root && !this._orgCss) {
        this._orgCss = Util.filterStyleFromText(root);
        Util.addClass(root, rootClass);
      }

      if (el && el !== root && !this._orgPCss) {
        /**
         * @private
         */
        this._orgPCss = Util.filterStyleFromText(el);
        Util.addClass(el, pClassName);
      }
    }
    /**
     *
     * @param { HTMLElement } [root]
     * @param { HTMLElement } [el]
     * @param { string } [rootClass]
     * @param { string } [pClassName]
     */

  }, {
    key: "recoverFullStyle",
    value: function recoverFullStyle(root, el, rootClass, pClassName) {
      if (!pClassName) {
        pClassName = STATE_CLASS.PARENT_FULLSCREEN;
      }

      if (root && this._orgCss) {
        Util.setStyleFromCsstext(root, this._orgCss);
        this._orgCss = '';
        Util.removeClass(root, rootClass);
      }

      if (el && el !== root && this._orgPCss) {
        Util.setStyleFromCsstext(el, this._orgPCss);
        this._orgPCss = '';
        Util.removeClass(el, pClassName);
      }
    }
    /**
     * @param { HTMLElement } [el]
     * @returns { Promise<void>; }
     */

  }, {
    key: "getFullscreen",
    value: function getFullscreen(el) {
      var root = this.root,
          video = this.video;

      if (!el) {
        el = root;
      }

      this._fullScreenOffset = {
        top: Util.scrollTop(),
        left: Util.scrollLeft()
      }; // if (root.getAttribute('style')) {
      //   this._orgCss = root.style.cssText
      //   root.removeAttribute('style')
      // }

      this._fullscreenEl = el;
      /**
       * @private
       */

      this._fullActionFrom = 'get';

      for (var i = 0; i < GET_FULLSCREEN_API.length; i++) {
        var key = GET_FULLSCREEN_API[i];

        if (el[key]) {
          var ret = key === 'webkitRequestFullscreen' ? el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT) : el[key]();

          if (ret && ret.then) {
            return ret;
          } else {
            return Promise.resolve();
          }
        }
      }

      if (video.fullscreenEnabled || video.webkitSupportsFullscreen) {
        video.webkitEnterFullscreen();
        return Promise.resolve();
      }

      return Promise.reject(new Error('call getFullscreen fail'));
    }
    /**
     * @param { HTMLElement } [el]
     * @returns { Promise<void>; }
     */

  }, {
    key: "exitFullscreen",
    value: function exitFullscreen(el) {
      if (!this._fullscreenEl || !Util.getFullScreenEl()) {
        return;
      }

      var root = this.root,
          video = this.video;

      if (el) {
        el = root;
      }

      this._fullActionFrom = 'exit';

      for (var i = 0; i < EXIT_FULLSCREEN_API.length; i++) {
        var key = EXIT_FULLSCREEN_API[i];

        if (document[key]) {
          var ret = document[key]();

          if (ret && ret.then) {
            return ret;
          } else {
            return Promise.resolve();
          }
        }
      }

      if (video && video.webkitSupportsFullscreen) {
        video.webkitExitFullScreen();
        return Promise.resolve();
      }

      return Promise.reject(new Error('call exitFullscreen fail'));
    }
    /**
     * @param { HTMLElement } [el]
     * @returns
     */

  }, {
    key: "getCssFullscreen",
    value: function getCssFullscreen(el) {
      if (this.fullscreen) {
        this.exitFullscreen();
      }

      this._cssfullscreenEl = el;
      this.changeFullStyle(this.root, el, el ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.CSS_FULLSCREEN);
      this.isCssfullScreen = true;
      this.emit(Events.CSS_FULLSCREEN_CHANGE, true);
    }
    /**
     * @param { HTMLElement } [el]
     * @returns
     */

  }, {
    key: "exitCssFullscreen",
    value: function exitCssFullscreen() {
      if (!this.fullscreen) {
        var _class = this._cssfullscreenEl ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.CSS_FULLSCREEN;

        this.recoverFullStyle(this.root, this._cssfullscreenEl, _class);
      }

      this.isCssfullScreen = false;
      this.emit(Events.CSS_FULLSCREEN_CHANGE, false);
    }
    /**
     * @description 播放器焦点状态，控制栏显示
     * @param { {
     *   autoHide?: boolean, // 是否可以自动隐藏
     *   delay?: number // 自动隐藏的延迟时间，ms, 不传默认使用3000ms
     * } } [data]
     */

  }, {
    key: "focus",
    value: function focus() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        autoHide: true,
        delay: 3000
      };

      if (this.isActive) {
        this.onFocus(data);
        return;
      }

      this.emit(Events.PLAYER_FOCUS, _objectSpread({
        paused: this.paused,
        ended: this.ended
      }, data));
    }
    /**
     * @description 取消播放器当前焦点状态
     * @param { { ignorePaused?: boolean } } [data]
     */

  }, {
    key: "blur",
    value: function blur() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        ignorePaused: false
      };

      if (!this.isActive) {
        this.onBlur(data);
        return;
      }

      this.emit(Events.PLAYER_BLUR, _objectSpread({
        paused: this.paused,
        ended: this.ended
      }, data));
    }
    /**
     * @protected
     * @param { { autoHide?: boolean, delay?: number} } [data]
     * @returns
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      var _this18 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        autoHide: true,
        delay: 3000
      };
      this.isActive = true;
      this.removeClass(STATE_CLASS.ACTIVE);

      if (this.userTimer) {
        Util.clearTimeout(this, this.userTimer);
      }

      if (data.autoHide === false) {
        return;
      }

      var time = data && data.delay ? data.delay : this.config.inactive;
      this.userTimer = Util.setTimeout(this, function () {
        _this18.blur();
      }, time);
    }
    /**
     * @protected
     * @param {{ ignorePaused?: boolean }} [data]
     * @returns
     */

  }, {
    key: "onBlur",
    value: function onBlur() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        ignorePaused: false
      };

      if (!this.isActive) {
        return;
      }

      var closePauseVideoFocus = this.config.closePauseVideoFocus;
      this.isActive = false;

      if (data.ignorePaused || closePauseVideoFocus || !this.paused && !this.ended) {
        this.addClass(STATE_CLASS.ACTIVE);
      }
    }
    /**
     * @protected
     */

  }, {
    key: "onCanplay",
    value: function onCanplay() {
      this.state >= STATES.RUNNING && this.removeClass(STATE_CLASS.ENTER);
      this.isCanplay = true;
    }
    /**
     * @protected
     */

  }, {
    key: "onPlay",
    value: function onPlay() {
      // this.addClass(STATE_CLASS.PLAYING)
      // this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY)
      if (this.state === STATES.ENDED) {
        this.setState(STATES.RUNNING);
      }

      this.removeClass(STATE_CLASS.PAUSED);
      this.ended && this.removeClass(STATE_CLASS.ENDED);
      !this.config.closePlayVideoFocus && this.focus();
    }
    /**
     * @protected
     */

  }, {
    key: "onPause",
    value: function onPause() {
      this.addClass(STATE_CLASS.PAUSED);

      if (!this.config.closePauseVideoFocus) {
        if (this.userTimer) {
          Util.clearTimeout(this, this.userTimer);
        }

        this.focus();
      }
    }
    /**
     * @protected
     */

  }, {
    key: "onEnded",
    value: function onEnded() {
      this.addClass(STATE_CLASS.ENDED);
      this.setState(STATES.ENDED); // this.removeClass(STATE_CLASS.PLAYING)
    }
    /**
     * @protected
     */

  }, {
    key: "onError",
    value: function onError() {
      this.setState(STATES.ERROR);
      this.removeClass(STATE_CLASS.NOT_ALLOW_AUTOPLAY);
      this.removeClass(STATE_CLASS.NO_START);
      this.removeClass(STATE_CLASS.ENTER);
      this.removeClass(STATE_CLASS.LOADING);
      this.addClass(STATE_CLASS.ERROR);
    }
    /**
     * @protected
     */

  }, {
    key: "onSeeking",
    value: function onSeeking() {
      if (!this.isSeeking) {
        var _played = this._played;
        _played.acc += _played.begin < _played.end && _played.end > -1 ? _played.end - _played.begin : 0;
        _played.begin = parseInt(this.video.currentTime * 1000, 10);
        _played.end = -1;
      }

      this.isSeeking = true;
      this.addClass(STATE_CLASS.SEEKING);
    }
    /**
     * @protected
     */

  }, {
    key: "onSeeked",
    value: function onSeeked() {
      this.isSeeking = false; // for ie,playing fired before waiting

      if (this.waitTimer) {
        Util.clearTimeout(this, this.waitTimer);
      }

      this.removeClass(STATE_CLASS.LOADING);
      this.removeClass(STATE_CLASS.SEEKING);
    }
    /**
     * @protected
     */

  }, {
    key: "onWaiting",
    value: function onWaiting() {
      var _this19 = this;

      if (this.waitTimer) {
        Util.clearTimeout(this, this.waitTimer);
      }

      this.waitTimer = Util.setTimeout(this, function () {
        _this19.addClass(STATE_CLASS.LOADING);

        Util.clearTimeout(_this19, _this19.waitTimer);
        _this19.waitTimer = null;
      }, 500);
    }
    /**
     * @protected
     */

  }, {
    key: "onPlaying",
    value: function onPlaying() {
      var _this20 = this;

      var NO_START = STATE_CLASS.NO_START,
          PAUSED = STATE_CLASS.PAUSED,
          ENDED = STATE_CLASS.ENDED,
          ERROR = STATE_CLASS.ERROR,
          REPLAY = STATE_CLASS.REPLAY,
          LOADING = STATE_CLASS.LOADING;
      var clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING];
      clsList.forEach(function (cls) {
        _this20.removeClass(cls);
      });
    }
    /**
     * @protected
     */

  }, {
    key: "onTimeupdate",
    value: function onTimeupdate() {
      !this._videoHeight && this.resize();

      if (this.waitTimer || this.hasClass(STATE_CLASS.LOADING)) {
        if (this.checkBuffer()) {
          this.removeClass(STATE_CLASS.LOADING);
          Util.clearTimeout(this, this.waitTimer);
          this.waitTimer = null;
        }
      }

      if (this._played.begin < 0) {
        this._played.begin = parseInt(this.video.currentTime * 1000, 10);
      }

      this._played.end = parseInt(this.video.currentTime * 1000, 10);
    }
    /**
     *
     * @param { number } time
     * @returns { boolean }
     */

  }, {
    key: "checkBuffer",
    value: function checkBuffer(time) {
      var buffered = this.video.buffered;

      if (!buffered || buffered.length === 0) {
        return true;
      }

      var currentTime = time || this.video.currentTime || 0.2;
      var len = buffered.length;

      for (var i = 0; i < len; i++) {
        if (buffered.start(i) <= currentTime && buffered.end(i) > currentTime) {
          return true;
        }
      }

      return false;
    }
    /**
     * @description position video/audio according to height ratio and y coordinate
     * @param { { h: number, y?: number } } pos
     * @returns
     */

  }, {
    key: "position",
    value: function position() {
      var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        h: 0,
        y: 0
      };

      if (!pos || !pos.h) {
        return;
      }

      var _this$root$getBoundin = this.root.getBoundingClientRect(),
          height = _this$root$getBoundin.height;

      var rvH = height / pos.h;

      var _transform = "scale(".concat(rvH / height, ")");

      if (pos.y) {
        var _ty = (100 - pos.h * 100) / 2 - pos.y * 100;

        _transform += " translate(0px, ".concat(_ty, "%)");
      }

      this.video.style.transform = _transform;
      this.video.style.webkitTransform = _transform;
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this$video = this.video,
          videoWidth = _this$video.videoWidth,
          videoHeight = _this$video.videoHeight;
      var _this$config2 = this.config,
          fitVideoSize = _this$config2.fitVideoSize,
          videoFillMode = _this$config2.videoFillMode;

      if (videoFillMode === 'fill' || videoFillMode === 'cover') {
        this.setAttribute('data-xgfill', videoFillMode);
      }

      if (!videoHeight || !videoWidth) {
        return;
      }

      this._videoHeight = videoHeight;
      this._videoWidth = videoWidth;
      var containerSize = this.root.getBoundingClientRect();
      var controlsHeight = this.controls && this.innerContainer ? this.controls.root.getBoundingClientRect().height : 0;
      var width = containerSize.width;
      var height = containerSize.height - controlsHeight;
      var videoFit = parseInt(videoWidth / videoHeight * 1000, 10);
      var fit = parseInt(width / height * 1000, 10);
      var rWidth = width;
      var rHeight = height;

      if (fitVideoSize === 'auto' && fit > videoFit || fitVideoSize === 'fixWidth') {
        rHeight = width / videoFit * 1000;

        if (this.config.fluid) {
          this.root.style.paddingTop = "".concat(rHeight * 100 / rWidth, "%");
        } else {
          this.root.style.height = "".concat(rHeight + controlsHeight, "px");
        }
      } else if (fitVideoSize === 'auto' && fit < videoFit || fitVideoSize === 'fixHeight') {
        rWidth = videoFit * height / 1000;
        this.root.style.width = "".concat(rWidth, "px");
      } // video填充模式


      if (videoFillMode === 'fillHeight' && fit < videoFit || videoFillMode === 'fillWidth' && fit > videoFit) {
        this.setAttribute('data-xgfill', 'cover');
      }

      var data = {
        videoScale: videoFit,
        vWidth: rWidth,
        vHeight: rHeight,
        cWidth: rWidth,
        cHeight: rHeight + controlsHeight
      };
      this.emit(Events.VIDEO_RESIZE, data);
    }
    /**
     *
     * @param { number } left
     * @param { number } top
     * @returns
     */

  }, {
    key: "updateObjectPosition",
    value: function updateObjectPosition() {
      var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (this.video.updateObjectPosition) {
        this.video.updateObjectPosition(left, top);
        return;
      }

      this.video.style.objectPosition = "".concat(left * 100, "% ").concat(top * 100, "%");
    }
    /**
     * @protected
     * @param { number } newState
     */

  }, {
    key: "setState",
    value: function setState(newState) {
      XG_DEBUG.logInfo('setState', "state from:".concat(STATE_ARRAY[this.state], " to:").concat(STATE_ARRAY[newState]));
      this._state = newState;
    }
    /**
     * @readonly
     * @type { number }
     */

  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
    /**
     * @type { boolean }
     * @description 是否开始播放
     */

  }, {
    key: "hasStart",
    get: function get() {
      return this._hasStart;
    },
    set: function set(bool) {
      if (typeof bool === 'boolean') {
        this._hasStart = bool;

        if (bool === false) {
          this._state = STATES.READY;
        }

        this.emit('hasstart');
      }
    }
    /**
     * @type { string }
     */

  }, {
    key: "lang",
    get: function get() {
      return this.config.lang;
    },
    set: function set(lang) {
      var result = I18N.langKeys.filter(function (key) {
        return key === lang;
      });

      if (result.length === 0 && lang !== 'zh') {
        console.error("Sorry, set lang fail, because the language [".concat(lang, "] is not supported now, list of all supported languages is [").concat(I18N.langKeys.join(), "] "));
        return;
      }

      this.config.lang = lang;
      pluginsManager.setLang(lang, this);
    }
  }, {
    key: "i18n",
    get: function get() {
      var lang = this.config.lang;
      return I18N.lang[lang] || I18N.lang.en;
    }
  }, {
    key: "i18nKeys",
    get: function get() {
      return I18N.textKeys || {};
    }
    /**
     * @type { string }
     */

  }, {
    key: "version",
    get: function get() {
      return version;
    }
    /**
     * @type { any }
     */

  }, {
    key: "url",
    get: function get() {
      return this.__url || this.config.url;
    }
    /**
     * @type { string }
     */
    ,
    set: function set(url) {
      /**
       * @private
       */
      this.__url = url;
    }
  }, {
    key: "poster",
    get: function get() {
      return this.plugins.poster ? this.plugins.poster.config.poster : this.config.poster;
    }
    /**
     * @type { string }
     */
    ,
    set: function set(posterUrl) {
      this.plugins.poster && this.plugins.poster.update(posterUrl);
    }
  }, {
    key: "readyState",
    get: function get() {
      var key = _get(_getPrototypeOf(Player.prototype), "readyState", this);

      return this.i18n[key] || key;
    }
  }, {
    key: "error",
    get: function get() {
      var key = _get(_getPrototypeOf(Player.prototype), "error", this);

      return this.i18n[key] || key;
    }
  }, {
    key: "networkState",
    get: function get() {
      var key = _get(_getPrototypeOf(Player.prototype), "networkState", this);

      return this.i18n[key] || key;
    }
    /**
     * @type { boolean }
     */

  }, {
    key: "fullscreenChanging",
    get: function get() {
      return !(this._fullScreenOffset === null);
    }
    /**
     * 累计观看时长
     * @type number
     */

  }, {
    key: "cumulateTime",
    get: function get() {
      var _this$_played = this._played,
          acc = _this$_played.acc,
          end = _this$_played.end,
          begin = _this$_played.begin;
      return begin > -1 && end > begin ? (acc + end - begin) / 1000 : acc / 1000;
    }
    /**
    * @type { number }
    */

  }, {
    key: "zoom",
    get: function get() {
      return this.config.zoom;
    }
    /**
     * @type { number }
     */
    ,
    set: function set(value) {
      this.config.zoom = value;
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
     * @param { (player: any, ...args) => boolean | Promise<any> } handler
     * @param  {...any} args
     * @returns {boolean} isSuccess
     */

  }, {
    key: "useHooks",
    value: function useHooks(hookName, handler) {
      return _useHooks.call.apply(_useHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
    /**
     *
     * @param { string } pluginName
     * @param { string } hookName
     * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
     * @param  {...any} args
     * @returns { boolean } isSuccess
     */

  }, {
    key: "usePluginHooks",
    value: function usePluginHooks(pluginName, hookName, handler) {
      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }

      return _usePluginHooks.call.apply(_usePluginHooks, [this].concat(Array.prototype.slice.call(arguments)));
    }
    /***
     * @deprecated
     * 插件全部迁移完成再做删除
     */

  }], [{
    key: "debugger",
    get: function get() {
      return XG_DEBUG.config.debug;
    },
    set:
    /**
     * @type {number}
     * @description set debugger level
     *  1 - only print error logs
     *  2 - print warn logs and error logs
     *  3 - print all debug logs and error stack logs
     */
    function set(value) {
      XG_DEBUG.config.debug = value;
    }
  }, {
    key: "install",
    value: function install(name, descriptor) {
      if (!Player.plugins) {
        Player.plugins = {};
      }

      if (!Player.plugins[name]) {
        Player.plugins[name] = descriptor;
      }
    }
    /***
     * @deprecated
     * 插件全部迁移完成再做删除
     */

  }, {
    key: "use",
    value: function use(name, descriptor) {
      if (!Player.plugins) {
        Player.plugins = {};
      }

      Player.plugins[name] = descriptor;
    }
  }]);

  return Player;
}(VideoProxy);

_defineProperty(Player, "defaultPreset", null);

_defineProperty(Player, "XgVideoProxy", null);

export { Player as default, Plugin, BasePlugin, Events, Errors, Sniffer, Util, STATE_CLASS, I18N };