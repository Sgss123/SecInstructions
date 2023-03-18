function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import Plugin, { Events, POSITIONS, Sniffer, STATE_CLASS } from '../../plugin';
import TopBackIcon from './backicon';
var FullScreenSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"2 -4 28 40\"><path fill=\"#fff\" d=\"M19.173 6.861h6.798v6.798h-2.694V9.555h-4.104V6.86zm4.104 16.416v-4.104h2.694v6.798h-6.798v-2.694h4.104zM6.861 13.66V6.86h6.798v2.694H9.555v4.104H6.86zm2.694 5.514v4.104h4.104v2.694H6.86v-6.798h2.694z\"/></svg>";
var ExitFullScreenSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"2 -4 28 40\"><path fill=\"#fff\" d=\"M21.867 10.965h4.104v2.694h-6.798V6.86h2.694v4.104zm-2.694 15.006v-6.798h6.798v2.694h-4.104v4.104h-2.694zm-8.208-15.006V6.861h2.694v6.798H6.86v-2.694h4.104zM6.861 21.867v-2.694h6.798v6.798h-2.694v-4.104H6.861z\"/></svg>";
/**
 * @typedef { {
 *   position?: string,
 *   index?: number,
 *   useCssFullscreen?: boolean,
 *   rotateFullscreen?: boolean,
 *   switchCallback?: () => any,
 *   target?: null | HTMLElement,
 *   disable?: boolean,
 *   needBackIcon?: boolean,
 *   [propName: string]: any
 * } } IFullscreenConfig
 */

var Fullscreen = /*#__PURE__*/function (_Plugin) {
  _inherits(Fullscreen, _Plugin);

  var _super = _createSuper(Fullscreen);

  function Fullscreen() {
    var _this;

    _classCallCheck(this, Fullscreen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_onOrientationChange", function (e) {
      if (_this.player.fullscreen && _this.config.rotateFullscreen) {
        if (window.orientation === 90 || window.orientation === -90) {
          _this.setRotateDeg(0);
        } else {
          _this.setRotateDeg(90);
        }
      }
    });

    return _this;
  }

  _createClass(Fullscreen, [{
    key: "afterCreate",
    value:
    /**
     * @private
     */
    function afterCreate() {
      var _this2 = this;

      if (this.config.disable) {
        return;
      }

      this.initIcons();
      this.handleFullscreen = this.hook('fullscreenChange', this.changeFullScreen, {
        pre: function pre(e) {
          var fullscreen = _this2.player.fullscreen;

          _this2.emitUserAction(e, 'switch_fullscreen', {
            prop: 'fullscreen',
            from: fullscreen,
            to: !fullscreen
          });
        }
      });
      this.bind('.xgplayer-fullscreen', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.handleFullscreen);
      this.on(Events.FULLSCREEN_CHANGE, function (isFullScreen) {
        _this2.changeLangTextKey(_this2.find('.xg-tips'), isFullScreen ? _this2.i18nKeys.EXITFULLSCREEN_TIPS : _this2.i18nKeys.FULLSCREEN_TIPS);

        _this2.animate(isFullScreen);

        if (_this2.config.needBackIcon) {
          _this2.show();
        }
      });

      if (this.config.needBackIcon) {
        this.topBackIcon = this.player.registerPlugin({
          plugin: TopBackIcon,
          options: {
            config: {
              onClick: function onClick(e) {
                _this2.handleFullscreen(e);
              }
            }
          }
        });
      }

      if (Sniffer.device === 'mobile') {
        window.addEventListener('orientationchange', this._onOrientationChange);
      }
    }
    /**
     * @private
     */

  }, {
    key: "registerIcons",
    value:
    /**
     * @private
     */
    function registerIcons() {
      return {
        fullscreen: {
          icon: FullScreenSvg,
          class: 'xg-get-fullscreen'
        },
        exitFullscreen: {
          icon: ExitFullScreenSvg,
          class: 'xg-exit-fullscreen'
        }
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.handleFullscreen);

      if (Sniffer.device === 'mobile') {
        window.removeEventListener('orientationchange', this._onOrientationChange);
      }
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild('.xgplayer-icon', icons.fullscreen);
      this.appendChild('.xgplayer-icon', icons.exitFullscreen);
    }
  }, {
    key: "setRotateDeg",
    value: function setRotateDeg(deg) {
      var player = this.player;

      if (window.orientation === 90 || window.orientation === -90) {
        player.rotateDeg = 0;
      } else {
        player.rotateDeg = deg;
      }
    }
    /**
     * 进入旋转全屏
     * @param { HTMLElement } [el]
     */

  }, {
    key: "getRotateFullscreen",
    value: function getRotateFullscreen(el) {
      var player = this.player;

      if (player.isCssfullScreen) {
        player.exitCssFullscreen(el);
      }

      var _class = el ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.ROTATE_FULLSCREEN;

      player._fullscreenEl = el || player.root;
      player.changeFullStyle(player.root, el, _class, STATE_CLASS.PARENT_ROTATE_FULLSCREEN);
      player.fullscreen = true;
      this.setRotateDeg(90);
      this.emit(Events.FULLSCREEN_CHANGE, true);
    }
    /**
     * 退出旋转全屏
     * @param { HTMLElement } [el]
     */

  }, {
    key: "exitRotateFullscreen",
    value: function exitRotateFullscreen(el) {
      var player = this.player;
      player.fullscreen = false;

      var _class = player._fullscreenEl !== player.root ? STATE_CLASS.INNER_FULLSCREEN : STATE_CLASS.ROTATE_FULLSCREEN;

      player.recoverFullStyle(player.root, player._fullscreenEl, _class, STATE_CLASS.PARENT_ROTATE_FULLSCREEN);
      this.setRotateDeg(0);
      this.emit(Events.FULLSCREEN_CHANGE, false);
    }
    /**
     * 进入旋转全屏
     * @param { Event } [e]
     */

  }, {
    key: "changeFullScreen",
    value: function changeFullScreen(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      var player = this.player,
          config = this.config;
      var useCssFullscreen = false;

      if (config.useCssFullscreen === true || typeof config.useCssFullscreen === 'function' && config.useCssFullscreen()) {
        useCssFullscreen = true;
      }

      if (useCssFullscreen) {
        if (player.fullscreen) {
          player.fullscreen = false;
          player.exitCssFullscreen(config.target);
          this.emit(Events.FULLSCREEN_CHANGE, false);
        } else {
          player.fullscreen = true;
          player.getCssFullscreen(config.target);
          this.emit(Events.FULLSCREEN_CHANGE, true);
        }

        this.animate(player.fullscreen);
      } else if (config.rotateFullscreen) {
        if (player.fullscreen) {
          this.exitRotateFullscreen(config.target);
        } else {
          this.getRotateFullscreen(config.target);
        }

        this.animate(player.fullscreen);
      } else {
        if (config.switchCallback && typeof config.switchCallback === 'function') {
          config.switchCallback(player.fullscreen);
          return;
        }

        if (player.fullscreen) {
          player.exitFullscreen(config.target);
        } else {
          player.getFullscreen(config.target);
        }
      }
    }
    /**
     *
     * @param { boolean } isFullScreen
     */

  }, {
    key: "animate",
    value: function animate(isFullScreen) {
      isFullScreen ? this.setAttr('data-state', 'full') : this.setAttr('data-state', 'normal');

      if (this.topBackIcon) {
        if (isFullScreen) {
          this.topBackIcon.show();
          this.hide();
        } else {
          this.topBackIcon.hide();
          this.show();
        }
      }
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(Fullscreen.prototype), "show", this).call(this);
    }
  }, {
    key: "hide",
    value: function hide() {
      _get(_getPrototypeOf(Fullscreen.prototype), "hide", this).call(this);
    }
    /**
     * @private
     * @returns
     */

  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      var langKey = 'FULLSCREEN_TIPS';
      return "<xg-icon class=\"xgplayer-fullscreen\">\n    <div class=\"xgplayer-icon\">\n    </div>\n    <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys[langKey], "\">").concat(this.i18n[langKey], "</div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'fullscreen';
    }
    /**
     * @type IFullscreenConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 0,
        useCssFullscreen: false,
        // Whether to use the page full screen
        rotateFullscreen: false,
        // Whether to enable rotating full screen
        switchCallback: null,
        // Custom switch function
        target: null,
        // Trigger Dom element
        disable: false,
        needBackIcon: false // Whether to enable the return button in the upper left corner of the full screen exit

      };
    }
  }]);

  return Fullscreen;
}(Plugin);

export { Fullscreen as default };