function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import { BasePlugin, Sniffer } from '../../plugin';
import { runHooks } from '../../plugin/hooksDescriptor';
var MOUSE_EVENTS = {
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mousemove: 'onMouseMove'
};
var HOOKS = ['videoClick', 'videoDbClick'];

var PCPlugin = /*#__PURE__*/function (_BasePlugin) {
  _inherits(PCPlugin, _BasePlugin);

  var _super = _createSuper(PCPlugin);

  function PCPlugin() {
    var _this;

    _classCallCheck(this, PCPlugin);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          player = _assertThisInitialize.player,
          playerConfig = _assertThisInitialize.playerConfig;

      if (!player.isActive) {
        player.focus({
          autoHide: playerConfig.closeDelayBlur
        });
        !playerConfig.closeFocusVideoFocus && player.video.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          playerConfig = _assertThisInitialize2.playerConfig,
          player = _assertThisInitialize2.player;

      !playerConfig.closeFocusVideoFocus && player.video.focus();

      if (playerConfig.closeDelayBlur) {
        player.focus({
          autoHide: false
        });
      } else {
        player.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      var _this$playerConfig = _this.playerConfig,
          closePlayerBlur = _this$playerConfig.closePlayerBlur,
          leavePlayerTime = _this$playerConfig.leavePlayerTime;

      if (!closePlayerBlur) {
        if (leavePlayerTime) {
          _this.player.focus({
            autoHide: true,
            hideDelay: leavePlayerTime
          });
        } else {
          _this.player.blur();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVideoClick", function (e) {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          player = _assertThisInitialize3.player,
          playerConfig = _assertThisInitialize3.playerConfig;

      if (e.target && playerConfig.closeVideoClick) {
        return;
      }

      if (e.target === player.root || e.target === player.video || e.target === player.innerContainer || e.target === player.video.__canvas) {
        e.preventDefault();

        if (!playerConfig.closeVideoStopPropagation) {
          e.stopPropagation();
        }

        _this._clickCount++;

        if (_this.clickTimer) {
          clearTimeout(_this.clickTimer);
          _this.clickTimer = null;
        }

        _this.clickTimer = setTimeout(function () {
          if (!_this._clickCount) {
            return;
          }

          _this._clickCount--;
          runHooks(_assertThisInitialized(_this), HOOKS[0], function (plugin, data) {
            _this.switchPlayPause(data.e);
          }, {
            e: e,
            paused: player.paused
          });
          clearTimeout(_this.clickTimer);
          _this.clickTimer = null;
        }, 300);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVideoDblClick", function (e) {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          player = _assertThisInitialize4.player,
          playerConfig = _assertThisInitialize4.playerConfig;

      if (!e.target || e.target !== player.video && e.target !== player.video.__canvas || playerConfig.closeVideoDblclick) {
        return;
      }

      if (_this._clickCount < 2) {
        _this._clickCount = 0;
        return;
      }

      _this._clickCount = 0;

      if (_this.clickTimer) {
        clearTimeout(_this.clickTimer);
        _this.clickTimer = null;
      }

      e.preventDefault();
      e.stopPropagation();
      runHooks(_assertThisInitialized(_this), HOOKS[1], function (plugin, data) {
        _this.emitUserAction(data.e, 'switch_fullscreen', {
          props: 'fullscreen',
          from: player.fullscreen,
          to: !player.fullscreen
        });

        player.fullscreen ? player.exitFullscreen() : player.getFullscreen();
      }, {
        e: e,
        fullscreen: player.fullscreen
      });
    });

    return _this;
  }

  _createClass(PCPlugin, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      this._clickCount = 0;
      HOOKS.map(function (item) {
        _this2.__hooks[item] = null;
      });
      var _this$playerConfig2 = this.playerConfig,
          enableContextmenu = _this$playerConfig2.enableContextmenu,
          isMobileSimulateMode = _this$playerConfig2.isMobileSimulateMode;

      if (isMobileSimulateMode || Sniffer.device === 'mobile') {
        return;
      }

      this.config.disableContextmenu = !enableContextmenu;
      this.initEvents();
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this3 = this;

      var _this$player = this.player,
          video = _this$player.video,
          root = _this$player.root;
      root.addEventListener('click', this.onVideoClick, false);
      video.addEventListener('dblclick', this.onVideoDblClick, false);
      Object.keys(MOUSE_EVENTS).map(function (item) {
        root.addEventListener(item, _this3[MOUSE_EVENTS[item]], false);
      });
      this.config.disableContextmenu && video.addEventListener('contextmenu', this.onContextmenu, false);
    }
  }, {
    key: "switchPlayPause",
    value: function switchPlayPause(e) {
      var player = this.player;
      this.emitUserAction(e, 'switch_play_pause', {
        props: 'paused',
        from: player.paused,
        to: !player.paused
      });

      if (!player.ended) {
        player.paused ? player.play() : player.pause();
      } else {
        player.duration !== Infinity && player.duration > 0 && player.replay();
      }
    }
  }, {
    key: "onContextmenu",
    value: function onContextmenu(e) {
      e = e || window.event;

      if (e.preventDefault) {
        e.preventDefault();
      }

      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.returnValue = false; // 解决IE8右键弹出

        e.cancelBubble = true;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;

      var _this$player2 = this.player,
          video = _this$player2.video,
          root = _this$player2.root;
      this.clickTimer && clearTimeout(this.clickTimer);
      root.removeEventListener('click', this.onVideoClick, false);
      video.removeEventListener('dblclick', this.onVideoDblClick, false);
      video.removeEventListener('contextmenu', this.onContextmenu, false);
      Object.keys(MOUSE_EVENTS).map(function (item) {
        root.removeEventListener(item, _this4[MOUSE_EVENTS[item]], false);
      });
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'pc';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        disableContextmenu: true
      };
    }
  }]);

  return PCPlugin;
}(BasePlugin);

export { PCPlugin as default };