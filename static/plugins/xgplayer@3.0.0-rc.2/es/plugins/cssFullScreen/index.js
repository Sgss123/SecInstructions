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

import Plugin, { Events, POSITIONS } from '../../plugin';
var CssFullSceenSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"31\" height=\"40\" viewBox=\"0 -5 31 40\"><path fill=\"#fff\" class=\"path_full\" d=\"M11.7 13v1.3a1.17 1.17 0 01-1.3 1.3 1.17 1.17 0 01-1.3-1.3v-2.6a1.17 1.17 0 011.3-1.3H13a1.17 1.17 0 011.3 1.3A1.17 1.17 0 0113 13zm7.8 5.2v-1.3a1.3 1.3 0 012.6 0v2.6a1.17 1.17 0 01-1.3 1.3h-2.6a1.3 1.3 0 010-2.6zm3.9-9.1H7.8v13h15.6zm2.6 0v13a2.6 2.6 0 01-2.6 2.6H7.8a2.6 2.6 0 01-2.6-2.6v-13a2.6 2.6 0 012.6-2.6h15.6A2.6 2.6 0 0126 9.1z\"/></svg>";
var ExitCssFullSceenSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"31\" height=\"40\" viewBox=\"0 -5 31 40\"><path fill=\"#fff\" d=\"M11.7 13v-1.3a1.17 1.17 0 011.3-1.3 1.17 1.17 0 011.3 1.3v2.6a1.17 1.17 0 01-1.3 1.3h-2.6a1.17 1.17 0 01-1.3-1.3 1.17 1.17 0 011.3-1.3zm7.8 5.2v1.3a1.3 1.3 0 01-2.6 0v-2.6a1.17 1.17 0 011.3-1.3h2.6a1.3 1.3 0 010 2.6zm3.9-9.1H7.8v13h15.6zm2.6 0v13a2.6 2.6 0 01-2.6 2.6H7.8a2.6 2.6 0 01-2.6-2.6v-13a2.6 2.6 0 012.6-2.6h15.6A2.6 2.6 0 0126 9.1z\"/></svg>";
/**
  * @typedef { {
  *  position: string,
  *  index: number,
  *  disable: boolean,
  *  target: null | HTMLElement,
  *  [propName: string]: any
  * } } ICssConfig
  */

var CssFullScreen = /*#__PURE__*/function (_Plugin) {
  _inherits(CssFullScreen, _Plugin);

  var _super = _createSuper(CssFullScreen);

  function CssFullScreen() {
    _classCallCheck(this, CssFullScreen);

    return _super.apply(this, arguments);
  }

  _createClass(CssFullScreen, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      if (this.config.disable) {
        return;
      }

      this.initIcons();
      this.on(Events.CSS_FULLSCREEN_CHANGE, function (isCssfullScreen) {
        _this.animate(isCssfullScreen);
      });
      this.btnClick = this.btnClick.bind(this);
      this.bind(['click', 'touchend'], this.btnClick);
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      var contentIcon = this.find('.xgplayer-icon');
      contentIcon.appendChild(icons.cssFullscreen);
      contentIcon.appendChild(icons.exitCssFullscreen);
    }
  }, {
    key: "btnClick",
    value: function btnClick(e) {
      e.preventDefault();
      e.stopPropagation();
      var isCssfullScreen = this.player.isCssfullScreen;
      this.emitUserAction(e, 'switch_css_fullscreen', {
        prop: 'cssfullscreen',
        from: isCssfullScreen,
        to: !isCssfullScreen
      });

      if (!isCssfullScreen) {
        this.player.getCssFullscreen(this.config.target);
      } else {
        this.player.exitCssFullscreen(this.config.target);
      }
    }
  }, {
    key: "animate",
    value: function animate(isFullScreen) {
      if (!this.root) {
        return;
      }

      isFullScreen ? this.setAttr('data-state', 'full') : this.setAttr('data-state', 'normal');
      this.switchTips(isFullScreen);
    }
  }, {
    key: "switchTips",
    value: function switchTips(isFullScreen) {
      var i18nKeys = this.i18nKeys;
      this.changeLangTextKey(this.find('.xg-tips'), isFullScreen ? i18nKeys.EXITCSSFULLSCREEN_TIPS : i18nKeys.CSSFULLSCREEN_TIPS);
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        cssFullscreen: {
          icon: CssFullSceenSvg,
          class: 'xg-get-cssfull'
        },
        exitCssFullscreen: {
          icon: ExitCssFullSceenSvg,
          class: 'xg-exit-cssfull'
        }
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.btnClick);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      return "<xg-icon class='xgplayer-cssfullscreen'>\n    <div class=\"xgplayer-icon\">\n    </div>\n    <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys.EXITCSSFULLSCREEN_TIPS, "\">").concat(this.i18n.CSSFULLSCREEN_TIPS, "</div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'cssFullscreen';
    }
    /**
     * @type ICssConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 1,
        disable: false,
        target: null
      };
    }
  }]);

  return CssFullScreen;
}(Plugin);

export { CssFullScreen as default };