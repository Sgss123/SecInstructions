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
var DANMU_OPEN = "<dk-switch class=\"danmu-switch\">\n<span class=\"txt\">\u5F39</span>\n</dk-switch>";

var DanmuIcon = /*#__PURE__*/function (_Plugin) {
  _inherits(DanmuIcon, _Plugin);

  var _super = _createSuper(DanmuIcon);

  function DanmuIcon() {
    _classCallCheck(this, DanmuIcon);

    return _super.apply(this, arguments);
  }

  _createClass(DanmuIcon, [{
    key: "afterCreate",
    value: function afterCreate() {
      this.initIcons();
      this.onStateChange = this.onStateChange.bind(this);
      this.bind(['click', 'touchend'], this.onStateChange);
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        openDanmu: {
          icon: DANMU_OPEN,
          class: 'danmu-switch-open'
        },
        closeDanmu: {
          icon: DANMU_OPEN,
          class: 'danmu-switch-closed'
        }
      };
    }
  }, {
    key: "switchState",
    value: function switchState(isOpen) {
      if (isOpen) {
        this.setAttr('data-state', 'active');
      } else {
        this.setAttr('data-state', 'normal');
      }

      this.switchTips(isOpen);
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      var contentIcon = this.find('.xgplayer-icon');
      contentIcon.appendChild(icons.openDanmu);
      contentIcon.appendChild(icons.closeDanmu);
    }
  }, {
    key: "switchTips",
    value: function switchTips(isOpen) {
      this.changeLangTextKey(this.find('.xg-tips'), isOpen ? 'OFF' : 'OPEN');
    }
  }, {
    key: "onStateChange",
    value: function onStateChange(e) {
      e.preventDefault();
      e.stopPropagation();
      var state = this.root.getAttribute('data-state');
      var isOpen = state === 'active';
      this.switchState(!isOpen);
      this.config.onSwitch && this.config.onSwitch(e, !isOpen);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.getMini);
    }
  }, {
    key: "render",
    value: function render() {
      var langKey = 'OPEN';
      return "\n    <xg-icon class=\"danmu-icon\">\n      <div class=\"xgplayer-icon\">\n      </div>\n      <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys[langKey], "\">").concat(this.i18n[langKey], "</div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'danmuIcon';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 11,
        onSwitch: function onSwitch(event, state) {}
      };
    }
  }]);

  return DanmuIcon;
}(Plugin);

export default DanmuIcon;