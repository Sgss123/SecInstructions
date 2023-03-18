function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { BasePlugin, Events } from '../../plugin';
/**
 * @typedef {{
 *   seekStep?: number,
 *   checkVisible?: boolean,
 *   disableBodyTrigger?: boolean,
 *   keyCodeMap?: { [propName: string]: any },
 *   disable: boolean,
 *   [propName: string]: any
 * }} IKeyboardConfig
 */

function preventDefault(e) {
  e.preventDefault();
  e.returnValue = false;
}

var Keyboard = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Keyboard, _BasePlugin);

  var _super = _createSuper(Keyboard);

  function Keyboard() {
    var _this;

    _classCallCheck(this, Keyboard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onBodyKeyDown", function (event) {
      if (_this.config.disable || _this.config.disableBodyTrigger || !_this.checkIsVisible()) {
        return;
      }

      var e = event || window.event;
      var keyCode = e.keyCode;

      if (e.target === document.body && _this.checkCode(keyCode, true)) {
        preventDefault(e);

        _this.handleKeyCode(keyCode, event);

        return false;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeydown", function (event) {
      if (_this.config.disable) {
        return;
      }

      var e = event || window.event;

      if (e && (e.keyCode === 37 || _this.checkCode(e.keyCode)) && (e.target === _this.player.root || e.target === _this.player.video || e.target === _this.player.controls.el)) {
        preventDefault(e);
      } else {
        return true;
      }

      _this.handleKeyCode(e.keyCode, event);
    });

    return _this;
  }

  _createClass(Keyboard, [{
    key: "mergekeyCodeMap",
    value: function mergekeyCodeMap() {
      var _this2 = this;

      var extendkeyCodeMap = this.config.keyCodeMap;

      if (extendkeyCodeMap) {
        Object.keys(extendkeyCodeMap).map(function (key) {
          if (!_this2.keyCodeMap[key]) {
            _this2.keyCodeMap[key] = extendkeyCodeMap[key];
          } else {
            ['keyCode', 'action', 'disable', 'isBodyTarget'].map(function (key1) {
              extendkeyCodeMap[key][key1] && (_this2.keyCodeMap[key][key1] = extendkeyCodeMap[key][key1]);
            });
          }
        });
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      this.config.disable = !this.playerConfig.keyShortcut;
      var seekStep = typeof this.config.seekStep === 'function' ? this.config.seekStep(this.player) : this.config.seekStep;

      if (!(!seekStep || typeof seekStep !== 'number')) {
        this.seekStep = seekStep;
      }

      this.keyCodeMap = {
        space: {
          keyCode: 32,
          action: 'playPause',
          disable: false,
          noBodyTarget: false
        },
        up: {
          keyCode: 38,
          action: 'upVolume',
          disable: false,
          noBodyTarget: true
        },
        down: {
          keyCode: 40,
          action: 'downVolume',
          disable: false,
          noBodyTarget: true
        },
        left: {
          keyCode: 37,
          action: 'seekBack',
          disable: false
        },
        right: {
          keyCode: 39,
          action: 'seek',
          disable: false
        },
        esc: {
          keyCode: 27,
          action: 'exitFullscreen',
          disable: false
        }
      };
      this.mergekeyCodeMap();
      this.player.root.addEventListener('keydown', this.onKeydown);
      document.addEventListener('keydown', this.onBodyKeyDown);
    }
  }, {
    key: "checkIsVisible",
    value: function checkIsVisible() {
      if (!this.config.checkVisible) {
        return true;
      }

      var rec = this.player.root.getBoundingClientRect();
      var height = rec.height,
          top = rec.top,
          bottom = rec.bottom;
      var h = window.innerHeight;

      if (top < 0 && top < 0 - height * 0.9 || bottom > 0 && bottom - h > height * 0.9) {
        return false;
      }

      return true;
    }
  }, {
    key: "checkCode",
    value: function checkCode(code, isBodyTarget) {
      var _this3 = this;

      var flag = false;
      Object.keys(this.keyCodeMap).map(function (key) {
        if (_this3.keyCodeMap[key] && code === _this3.keyCodeMap[key].keyCode && !_this3.keyCodeMap[key].disable) {
          flag = !isBodyTarget || isBodyTarget && !_this3.keyCodeMap[key].noBodyTarget;
        }
      });
      return flag;
    }
  }, {
    key: "downVolume",
    value: function downVolume(event) {
      var player = this.player;
      var val = parseFloat((player.volume - 0.1).toFixed(1));
      this.emitUserAction(event, 'change_volume', {
        prop: 'volume',
        from: player.volume,
        to: val
      });

      if (val >= 0) {
        player.volume = val;
      } else {
        player.volume = 0;
      }
    }
  }, {
    key: "upVolume",
    value: function upVolume(event) {
      var player = this.player;
      var val = parseFloat((player.volume + 0.1).toFixed(1));
      this.emitUserAction(event, 'change_volume', {
        prop: 'volume',
        from: player.volume,
        to: val
      });

      if (val <= 1) {
        player.volume = val;
      } else {
        player.volume = 1;
      }
    }
  }, {
    key: "seek",
    value: function seek(event) {
      var _this$player = this.player,
          currentTime = _this$player.currentTime,
          duration = _this$player.duration;
      var _time = currentTime;

      if (currentTime + this.seekStep <= duration) {
        _time = currentTime + this.seekStep;
      } else {
        _time = duration - 1;
      }

      this.emitUserAction(event, 'seek', {
        prop: 'currentTime',
        from: currentTime,
        to: _time
      });
      this.player.currentTime = _time;
    }
  }, {
    key: "seekBack",
    value: function seekBack(event) {
      var currentTime = this.player.currentTime;
      var _time = 0;

      if (currentTime - this.seekStep >= 0) {
        _time = currentTime - this.seekStep;
      }

      this.emitUserAction(event, 'seek', {
        prop: 'currentTime',
        from: currentTime,
        to: _time
      });
      this.player.currentTime = _time;
    }
  }, {
    key: "playPause",
    value: function playPause(event) {
      var player = this.player;
      this.emitUserAction(event, 'switch_play_pause', {
        prop: 'paused',
        from: player.paused,
        to: !player.paused
      });

      if (player.paused) {
        // eslint-disable-next-line handle-callback-err
        player.play();
      } else {
        player.pause();
      }
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen(event) {
      console.log('exitFullscreen', event);
      var player = this.player;
      var isCssfullScreen = player.isCssfullScreen,
          fullscreen = player.fullscreen;

      if (fullscreen) {
        this.emitUserAction('keyup', 'switch_fullscreen', {
          prop: 'fullscreen',
          from: fullscreen,
          to: !fullscreen
        });
        player.exitFullscreen();
      }

      if (isCssfullScreen) {
        this.emitUserAction('keyup', 'switch_css_fullscreen', {
          prop: 'cssfullscreen',
          from: isCssfullScreen,
          to: !isCssfullScreen
        });
        player.exitCssFullscreen();
      }
    }
  }, {
    key: "handleKeyCode",
    value: function handleKeyCode(curKeyCode, event) {
      var _this4 = this;

      Object.keys(this.keyCodeMap).map(function (key) {
        var _this4$keyCodeMap$key = _this4.keyCodeMap[key],
            action = _this4$keyCodeMap$key.action,
            keyCode = _this4$keyCodeMap$key.keyCode,
            disable = _this4$keyCodeMap$key.disable;

        if (keyCode === curKeyCode && !disable) {
          if (typeof action === 'function') {
            action(event);
          } else if (typeof action === 'string') {
            if (typeof _this4[action] === 'function') {
              _this4[action](event);
            }
          }

          _this4.emit(Events.SHORTCUT, _objectSpread({
            key: key,
            target: event.target
          }, _this4.keyCodeMap[key]));
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.player.root.removeEventListener('keydown', this.onKeydown);
      document.removeEventListener('keydown', this.onBodyKeyDown);
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'keyboard';
    }
    /**
     * @type IKeyboardConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        seekStep: 10,
        // Left/right fast forward each operation time
        checkVisible: true,
        // Whether to check the visibility when the shortcut key takes effect
        disableBodyTrigger: false,
        // Whether to monitor the shortcut keys on the body
        keyCodeMap: {},
        disable: false
      };
    }
  }]);

  return Keyboard;
}(BasePlugin);

export default Keyboard;