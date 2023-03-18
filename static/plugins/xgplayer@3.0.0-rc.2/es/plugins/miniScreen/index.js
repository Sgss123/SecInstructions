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

import Plugin, { Util, Events } from '../../plugin';
var PlayIcon = "<svg class=\"play\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"3 -4 28 40\"><path fill=\"#fff\" d=\"M18.468 11.639l7.503 4.777-7.503 4.777zM10.965 6.86l7.503 4.778v9.554l-7.503 4.778z\"/></svg>";
var PauseIcon = "<svg class=\"pause\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"3 -4 28 40\"><path fill=\"#fff\" d=\"M19.173 6.861h5.451v19.11h-5.45V6.86zM8.208 25.971V6.86h5.45v19.11h-5.45z\"/></svg>";
import MiniScreenIcon from './miniScreenIcon';
import Draggabilly from '../../utils/draggabilly';
/**
 * @typedef {{
 *   index?: number,
 *   disable?: boolean,
 *   width?: number,
 *   height?: number,
 *   left?: number, // 默认左下角
 *   top?: number, // 默认左下角
 *   isShowIcon?: boolean, // 是否显示icon
 *   isScrollSwitch?: boolean, // 滚动自动切换自动切换
 *   scrollTop?: number, // 触发滚动的高度
 *   disableDrag?: boolean, // 禁用拖拽
 *   [propName: string]: any
 * }} IMiniScreenConfig
 */

var MiniScreen = /*#__PURE__*/function (_Plugin) {
  _inherits(MiniScreen, _Plugin);

  var _super = _createSuper(MiniScreen);

  function MiniScreen(args) {
    var _this;

    _classCallCheck(this, MiniScreen);

    _this = _super.call(this, args);

    _defineProperty(_assertThisInitialized(_this), "onCancelClick", function (e) {
      // e.preventDefault()
      // e.stopPropagation()
      _this.exitMini();

      _this.isClose = true;
    });

    _defineProperty(_assertThisInitialized(_this), "onCenterClick", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          player = _assertThisInitialize.player;

      player.paused ? player.play() : player.pause();
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (e) {
      if (!window.scrollY && window.scrollY !== 0 || Math.abs(window.scrollY - _this.pos.scrollY) < 50) {
        return;
      }

      var scrollHeight = parseInt(Util.getCss(_this.player.root, 'height'));
      scrollHeight += _this.config.scrollTop;
      _this.pos.scrollY = window.scrollY;

      if (window.scrollY > scrollHeight + 5) {
        !_this.isMini && !_this.isClose && _this.getMini();
      } else if (window.scrollY <= scrollHeight) {
        _this.isMini && _this.exitMini();
        _this.isClose = false;
      }
    });

    _this.isMini = false;
    _this.isClose = false;

    var _assertThisInitialize2 = _assertThisInitialized(_this),
        config = _assertThisInitialize2.config;

    _this.pos = {
      left: config.left < 0 ? window.innerWidth - config.width - 20 : config.left,
      top: config.top < 0 ? window.innerHeight - config.height - 20 : config.top,
      height: _this.config.height,
      width: _this.config.width,
      scrollY: window.scrollY || 0
    };
    _this.lastStyle = null;
    return _this;
  }

  _createClass(MiniScreen, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (typeof args.player.config.mini === 'boolean') {
        args.config.isShowIcon = args.player.config.mini;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      this.initIcons();
      this.on(Events.PAUSE, function () {
        _this2.setAttr('data-state', 'pause');
      });
      this.on(Events.PLAY, function () {
        _this2.setAttr('data-state', 'play');
      });
    }
  }, {
    key: "onPluginsReady",
    value: function onPluginsReady() {
      var _this3 = this;

      var player = this.player,
          config = this.config;

      if (config.disable) {
        return;
      }

      if (this.config.isShowIcon) {
        var options = {
          config: {
            onClick: function onClick() {
              _this3.getMini();
            }
          }
        };
        player.controls.registerPlugin(MiniScreenIcon, options, MiniScreenIcon.pluginName);
      }

      var eventName = Util.checkTouchSupport() ? 'touchend' : 'click';
      this.bind('.mini-cancel-btn', eventName, this.onCancelClick);
      this.bind('.play-icon', eventName, this.onCenterClick);

      if (!this.config.disableDrag) {
        this._draggabilly = new Draggabilly(this.player.root, {
          handle: this.root
        });
      }

      if (this.config.isScrollSwitch) {
        window.addEventListener('scroll', this.onScroll);
      }
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        play: {
          icon: PlayIcon,
          class: 'xg-icon-play'
        },
        pause: {
          icon: PauseIcon,
          class: 'xg-icon-pause'
        }
      };
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild('.play-icon', icons.play);
      this.appendChild('.play-icon', icons.pause);
    }
  }, {
    key: "getMini",
    value: function getMini() {
      var _this4 = this;

      if (this.isMini) {
        return;
      }

      var player = this.player,
          playerConfig = this.playerConfig;
      var target = this.config.target || this.player.root;
      this.lastStyle = {};
      Util.addClass(player.root, 'xgplayer-mini');
      ['width', 'height', 'top', 'left'].map(function (key) {
        _this4.lastStyle[key] = target.style[key];
        target.style[key] = "".concat(_this4.pos[key], "px");
      });

      if (playerConfig.fluid) {
        target.style['padding-top'] = '';
      }

      this.emit(Events.MINI_STATE_CHANGE, true);
      player.isMini = this.isMini = true;
    }
  }, {
    key: "exitMini",
    value: function exitMini() {
      var _this5 = this;

      if (!this.isMini) {
        return false;
      }

      var player = this.player,
          playerConfig = this.playerConfig;
      var target = this.config.target || this.player.root;
      Util.removeClass(player.root, 'xgplayer-mini');

      if (this.lastStyle) {
        Object.keys(this.lastStyle).map(function (key) {
          target.style[key] = _this5.lastStyle[key];
        });
      }

      this.lastStyle = null;

      if (playerConfig.fluid) {
        player.root.style.width = '100%';
        player.root.style.height = '0';
        player.root.style['padding-top'] = "".concat(playerConfig.height * 100 / playerConfig.width, "%");
      }

      this.emit(Events.MINI_STATE_CHANGE, false);
      this.isMini = player.isMini = false;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('scroll', this.onScroll);
      var eventName = Util.checkTouchSupport() ? 'touchend' : 'click';
      this.unbind('.mini-cancel-btn', eventName, this.onCancelClick);
      this.unbind('.play-icon', eventName, this.onCenterClick);
      this._draggabilly && this._draggabilly.destroy();
      this._draggabilly = null;
      this.exitMini();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      return "\n      <xg-mini-layer class=\"xg-mini-layer\">\n      <xg-mini-header class=\"xgplayer-mini-header\">\n      <div lang-key=\"".concat(this.i18nKeys.MINI_DRAG, "\">").concat(this.i18n.MINI_DRAG, "</div>\n      </xg-mini-header>\n      <div class=\"mini-cancel-btn\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\">\n          <path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M3.99 3.49a1 1 0 0 1 1.414 0L10 8.085l4.596-4.595a1 1 0 1 1 1.414 1.414L11.414 9.5l4.596 4.596a1 1 0 0 1 .084 1.32l-.084.094a1 1 0 0 1-1.414 0L10 10.914 5.404 15.51a1 1 0 0 1-1.414-1.414L8.585 9.5 3.99 4.904a1 1 0 0 1-.084-1.32z\"></path>\n        </svg>\n      </div>\n      <div class=\"play-icon\">\n      </div>\n      </xg-mini-layer>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'miniscreen';
    }
    /**
     * @type IMiniScreenConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        index: 10,
        disable: false,
        width: 320,
        height: 180,
        left: -1,
        // Default bottom left corner
        top: -1,
        // Default bottom left corner
        isShowIcon: false,
        // Whether to show icon
        isScrollSwitch: false,
        scrollTop: 0,
        // Height to trigger scroll
        disableDrag: false // Disable drag and drop

      };
    }
  }]);

  return MiniScreen;
}(Plugin);

export { MiniScreen as default, MiniScreenIcon };