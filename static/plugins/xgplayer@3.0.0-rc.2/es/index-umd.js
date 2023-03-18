function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Player from './player';
import Plugin from './plugin/plugin';
import BasePlugin from './plugin/basePlugin';
import * as Events from './events';
import STATE_CLASS from './stateClassMap';
import I18N from './lang/i18n';
import Errors from './error';
import Sniffer from './utils/sniffer';
import Util from './utils/util';
import defaultPreset from './presets/default';

var PresetPlayer = /*#__PURE__*/function (_Player) {
  _inherits(PresetPlayer, _Player);

  var _super = _createSuper(PresetPlayer);

  function PresetPlayer() {
    _classCallCheck(this, PresetPlayer);

    return _super.apply(this, arguments);
  }

  return PresetPlayer;
}(Player);

_defineProperty(PresetPlayer, "defaultPreset", defaultPreset);

_defineProperty(PresetPlayer, "Util", Util);

_defineProperty(PresetPlayer, "Sniffer", Sniffer);

_defineProperty(PresetPlayer, "Errors", Errors);

_defineProperty(PresetPlayer, "Events", Events);

_defineProperty(PresetPlayer, "Plugin", Plugin);

_defineProperty(PresetPlayer, "BasePlugin", BasePlugin);

_defineProperty(PresetPlayer, "I18N", I18N);

_defineProperty(PresetPlayer, "STATE_CLASS", STATE_CLASS);

export default PresetPlayer;