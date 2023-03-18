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

import Plugin, { POSITIONS, Util } from '../../plugin';
var BackSVG = "<svg width=\"32\" height=\"40\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11.237 14l6.382-6.381A.875.875 0 1016.38 6.38l-7 7a.875.875 0 000 1.238l7 7a.875.875 0 101.238-1.238L11.237 14z\" fill=\"#FFF\" fill-rule=\"evenodd\"/></svg>";

var TopBackIcon = /*#__PURE__*/function (_Plugin) {
  _inherits(TopBackIcon, _Plugin);

  var _super = _createSuper(TopBackIcon);

  function TopBackIcon() {
    _classCallCheck(this, TopBackIcon);

    return _super.apply(this, arguments);
  }

  _createClass(TopBackIcon, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      this.initIcons();

      this.onClick = function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this.config.onClick(e);
      };

      this.bind(['click', 'touchend'], this.onClick);
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        screenBack: {
          icon: BackSVG,
          class: 'xg-fullscreen-back'
        }
      };
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild(this.root, icons.screenBack);
    }
  }, {
    key: "show",
    value: function show() {
      Util.addClass(this.root, 'show');
    }
  }, {
    key: "hide",
    value: function hide() {
      Util.removeClass(this.root, 'show');
    }
  }, {
    key: "render",
    value: function render() {
      return "<xg-icon class=\"xgplayer-back\">\n    </xg-icon>";
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'topbackicon';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.ROOT_TOP,
        index: 0
      };
    }
  }]);

  return TopBackIcon;
}(Plugin);

export { TopBackIcon as default };