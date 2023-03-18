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

import Plugin, { STATE_CLASS, Util } from '../../plugin';
/**
 * 消息组件
 */

var Prompt = /*#__PURE__*/function (_Plugin) {
  _inherits(Prompt, _Plugin);

  var _super = _createSuper(Prompt);

  function Prompt() {
    _classCallCheck(this, Prompt);

    return _super.apply(this, arguments);
  }

  _createClass(Prompt, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      this.intervalId = 0;
      this.customConfig = null;
      this.bind('.highlight', ['click', 'touchend'], function (e) {
        if (_this.config.onClick || _this.customOnClick) {
          e.preventDefault();
          e.stopPropagation();
          _this.customOnClick ? _this.customOnClick(e) : _this.config.onClick(e);
        }
      });

      this.player.showPrompt = function () {
        _this.show.apply(_this, arguments);
      };

      this.player.hidePrompt = function () {
        _this.hide();
      };
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      var _this2 = this;

      Object.keys(style).map(function (key) {
        _this2.root.style[key] = style[key];
      });
    }
  }, {
    key: "show",
    value: function show(detail) {
      var _this3 = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var onClick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (!detail) {
        return;
      }

      this.customOnClick = onClick;
      var interval = this.config.interval;

      if (this.intervalId) {
        clearTimeout(this.intervalId);
        this.intervalId = null;
      }

      Util.addClass(this.root, 'show');
      config.mode === 'arrow' && Util.addClass(this.root, 'arrow');

      if (typeof detail === 'string') {
        this.find('.xgplayer-prompt-detail').innerHTML = detail;
      } else {
        this.find('.xgplayer-prompt-detail').innerHTML = "".concat(detail.text || '') + "".concat(detail.highlight ? "<i class=\"highlight\">".concat(detail.highlight, "</i>") : '');
      }

      config.style && this.setStyle(config.style);
      var autoHide = typeof config.autoHide === 'boolean' ? config.autoHide : this.config.autoHide;

      if (autoHide) {
        var hideinterval = config.interval || interval;
        this.intervalId = setTimeout(function () {
          _this3.hide();
        }, hideinterval);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      Util.removeClass(this.root, 'show');
      Util.removeClass(this.root, 'arrow');
      this.root.removeAttribute('style');
      this.customOnClick = null;
    }
  }, {
    key: "render",
    value: function render() {
      return "<xg-prompt class=\"xgplayer-prompt ".concat(STATE_CLASS.CONTROLS_FOLLOW, "\">\n    <span class=\"xgplayer-prompt-detail\"></span>\n    </xg-prompt>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'prompt';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        interval: 3000,
        style: {},
        mode: 'arrow',
        autoHide: true,
        detail: {
          text: '',
          highlight: ''
        },
        onClick: function onClick() {}
      };
    }
  }]);

  return Prompt;
}(Plugin);

export default Prompt;