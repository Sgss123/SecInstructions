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

import Plugin, { POSITIONS } from '../../plugin';

var MiniScreenIcon = /*#__PURE__*/function (_Plugin) {
  _inherits(MiniScreenIcon, _Plugin);

  var _super = _createSuper(MiniScreenIcon);

  function MiniScreenIcon() {
    _classCallCheck(this, MiniScreenIcon);

    return _super.apply(this, arguments);
  }

  _createClass(MiniScreenIcon, [{
    key: "afterCreate",
    value: function afterCreate() {
      this.getMini = this.getMini.bind(this);
      this.exitMini = this.exitMini.bind(this);
      this.bind('click', this.getMini);
    }
  }, {
    key: "getMini",
    value: function getMini() {
      this.config.onClick && this.config.onClick();
    }
  }, {
    key: "exitMini",
    value: function exitMini() {
      this.config.onClick && this.config.onClick();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.getMini);
    }
  }, {
    key: "render",
    value: function render() {
      var langKey = 'MINISCREEN';
      return "\n      <xg-icon class=\"xgplayer-miniicon\">\n      <div class=\"xgplayer-icon btn-text\"><span class=\"icon-text\" lang-key=\"".concat(this.i18nKeys[langKey], "\">").concat(this.i18n[langKey], "</span></div>\n      </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'miniscreenIcon';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 10
      };
    }
  }]);

  return MiniScreenIcon;
}(Plugin);

export default MiniScreenIcon;