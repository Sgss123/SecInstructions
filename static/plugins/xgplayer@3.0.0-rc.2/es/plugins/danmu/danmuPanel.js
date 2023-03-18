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

import Plugin, { Sniffer, Util, POSITIONS } from '../../plugin';
var PanelIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-5 -11 40 40\" width=\"40\" height=\"40\"><path fill=\"#f85959\" d=\"M29.2 14.984a.952.952 0 00.8-.912v-1.008a.96.96 0 00-.8-.904l-.488-.064a1.4 1.4 0 01-1.04-.688l-.168-.288-.16-.288A1.376 1.376 0 0127.2 9.6l.184-.464a.944.944 0 00-.4-1.136l-.88-.496a.944.944 0 00-1.176.24l-.312.408a1.456 1.456 0 01-1.128.576c-.352 0-1.504-.216-1.776-.56l-.312-.392a.944.944 0 00-1.184-.224l-.872.512a.952.952 0 00-.376 1.144l.2.472a1.496 1.496 0 01-.064 1.264c-.208.296-.936 1.2-1.368 1.264l-.504.072a.952.952 0 00-.8.912v1.016a.936.936 0 00.8.896l.488.064a1.392 1.392 0 011.04.696l.168.288.16.28a1.352 1.352 0 01.112 1.232l-.184.472a.952.952 0 00.4 1.136l.88.496a.952.952 0 001.184-.248l.304-.4a1.464 1.464 0 011.128-.576c.352 0 1.504.2 1.776.552l.312.392a.944.944 0 001.184.224l.904-.512a.952.952 0 00.376-1.144l-.192-.456a1.472 1.472 0 01.056-1.264c.208-.296.936-1.2 1.376-1.264zm-4.4.168a2.208 2.208 0 01-3.72-.96 2.168 2.168 0 01.52-2.088 2.208 2.208 0 013.712.96 2.16 2.16 0 01-.512 2.088z\"/><path fill=\"#f85959\" d=\"M25.6 0H2.872A2.872 2.872 0 000 2.872v13.6a2.872 2.872 0 002.872 2.888h12.904a10.072 10.072 0 01-.648-.96A9.384 9.384 0 0128.432 5.824V2.872A2.872 2.872 0 0025.6 0zM10.4 11.344H3.432a1.216 1.216 0 010-2.4H10.4a1.216 1.216 0 010 2.4zM13.16 6.4H3.432a1.208 1.208 0 010-2.4h9.728a1.208 1.208 0 110 2.4z\"/></svg>";
/**
  * @typedef {{
  *   position?: string,
  *   index?: number,
  *   onChangeSet?: () => any,
  *   speed?: number,
  *   area?: any,
  *   opacity?: number,
  *   fonSize?: number
  * }} IDanmuPanelConfig
  */

var DanmuPanel = /*#__PURE__*/function (_Plugin) {
  _inherits(DanmuPanel, _Plugin);

  var _super = _createSuper(DanmuPanel);

  function DanmuPanel(args) {
    var _this;

    _classCallCheck(this, DanmuPanel);

    _this = _super.call(this, args);
    _this.set = {
      speed: 1,
      // 速度
      area: {},
      // 区域
      opacity: 1,
      // 透明度
      fonSize: 'middle' // 字体

    };
    return _this;
  }

  _createClass(DanmuPanel, [{
    key: "afterCreate",
    value: function afterCreate() {
      if (Sniffer.device === 'mobile') {
        this.activeEvent = 'click';
      } else {
        this.activeEvent = 'mouseenter';
      }

      this.onStateChange = this.onStateChange.bind(this);
      this.onToggle = this.onToggle.bind(this);
      this.bind(this.activeEvent, this.onToggle);
      this.bind('mouseleave', this.onToggle);
      this.appendChild('.xgplayer-panel-icon', PanelIcon()); // this.bind(['click', 'touchend'], this.onStateChange)
    }
  }, {
    key: "onStateChange",
    value: function onStateChange(e) {
      this.config.onChangeSet && this.config.onChangeSet(this.set);
    }
  }, {
    key: "onToggle",
    value: function onToggle(e) {
      e.preventDefault();
      e.stopPropagation();
      Util.hasClass(this.root, 'slider-show') ? Util.removeClass(this.root, 'slider-show') : Util.addClass(this.root, 'slider-show');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.onStateChange);
    }
  }, {
    key: "render",
    value: function render() {
      return "\n      <xg-icon class=\"xgplayer-panel\">\n          <xg-panel-icon class=\"xgplayer-panel-icon\">\n          </xg-panel-icon>\n          <xg-panel-slider class=\"xgplayer-panel-slider\">\n            <xg-hidemode class=\"xgplayer-hidemode\">\n              <p class=\"xgplayer-hidemode-font\">\u5C4F\u853D\u7C7B\u578B</p>\n              <ul class=\"xgplayer-hidemode-radio\">\n                <li class=\"xgplayer-hidemode-scroll\" id=\"false\">\u6EDA\u52A8</li><li class=\"xgplayer-hidemode-top\" id=\"false\">\u9876\u90E8</li><li class=\"xgplayer-hidemode-bottom\" id=\"false\">\u5E95\u90E8</li><li class=\"xgplayer-hidemode-color\" id=\"false\">\u8272\u5F69</li>\n              </ul>\n            </xg-hidemode>\n            <xg-transparency class=\"xgplayer-transparency\">\n              <span>\u4E0D\u900F\u660E\u5EA6</span>\n              <input class=\"xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient\" type=\"range\" min=\"0\" max=\"100\" step=\"0.1\" value=\"50\"></input>\n            </xg-transparency>\n            <xg-showarea class=\"xgplayer-showarea\">\n              <div class=\"xgplayer-showarea-name\">\u663E\u793A\u533A\u57DF</div>\n              <div class=\"xgplayer-showarea-control\">\n                <div class=\"xgplayer-showarea-control-up\">\n                  <span class=\"xgplayer-showarea-control-up-item xgplayer-showarea-onequarters\">1/4</span>\n                  <span class=\"xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color\">1/2</span>\n                  <span class=\"xgplayer-showarea-control-up-item xgplayer-showarea-threequarters\">3/4</span>\n                  <span class=\"xgplayer-showarea-control-up-item xgplayer-showarea-full\">1</span>\n                </div>\n                <div class=\"xgplayer-showarea-control-down\">\n                  <div class=\"xgplayer-showarea-control-down-dots\">\n                    <span class=\"xgplayer-showarea-onequarters-dot\"></span>\n                    <span class=\"xgplayer-showarea-twoquarters-dot\"></span>\n                    <span class=\"xgplayer-showarea-threequarters-dot\"></span>\n                    <span class=\"xgplayer-showarea-full-dot\"></span>\n                  </div>\n                  <input class=\"xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient\" type=\"range\" min=\"1\" max=\"4\" step=\"1\" value=\"1\">\n                </div>\n              </div>\n            </xg-showarea>\n            <xg-danmuspeed class=\"xgplayer-danmuspeed\">\n              <div class=\"xgplayer-danmuspeed-name\">\u5F39\u5E55\u901F\u5EA6</div>\n              <div class=\"xgplayer-danmuspeed-control\">\n                <div class=\"xgplayer-danmuspeed-control-up\">\n                  <span class=\"xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small\">\u6162</span>\n                  <span class=\"xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color\">\u4E2D</span>\n                  <span class=\"xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large\">\u5FEB</span>\n                </div>\n                <div class=\"xgplayer-danmuspeed-control-down\">\n                  <div class=\"xgplayer-danmuspeed-control-down-dots\">\n                    <span class=\"xgplayer-danmuspeed-small-dot\"></span>\n                    <span class=\"xgplayer-danmuspeed-middle-dot\"></span>\n                    <span class=\"xgplayer-danmuspeed-large-dot\"></span>\n                  </div>\n                  <input class=\"xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient\" type=\"range\" min=\"50\" max=\"150\" step=\"50\" value=\"100\">\n                </div>\n              </div>\n            </xg-danmuspeed>\n            <xg-danmufont class=\"xgplayer-danmufont\">\n              <div class=\"xgplayer-danmufont-name\">\u5B57\u4F53\u5927\u5C0F</div>\n              <div class=\"xgplayer-danmufont-control\">\n                <div class=\"xgplayer-danmufont-control-up\">\n                  <span class=\"xgplayer-danmufont-control-up-item xgplayer-danmufont-small\">\u5C0F</span>\n                  <span class=\"xgplayer-danmufont-control-up-item xgplayer-danmufont-middle\">\u4E2D</span>\n                  <span class=\"xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color\">\u5927</span>\n                </div>\n                <div class=\"xgplayer-danmufont-control-down\">\n                  <div class=\"xgplayer-danmufont-control-down-dots\">\n                    <span class=\"xgplayer-danmufont-small-dot\"></span>\n                    <span class=\"xgplayer-danmufont-middle-dot\"></span>\n                    <span class=\"xgplayer-danmufont-large-dot\"></span>\n                  </div>\n                  <input class=\"xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient\" type=\"range\" min=\"20\" max=\"30\" step=\"5\" value=\"25\">\n                </div>\n              </div>\n            </xg-danmufont>\n          </xg-panel-slider>\n      </xg-icon>";
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'danmuPanel';
    }
    /**
     * @type IDanmuPanelConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 11,
        onChangeSet: function onChangeSet(set) {
          console.log("DanmuPanel:".concat(set));
        },
        speed: 1,
        area: {},
        opacity: 1,
        fonSize: 'middle'
      };
    }
  }]);

  return DanmuPanel;
}(Plugin);

export default DanmuPanel;