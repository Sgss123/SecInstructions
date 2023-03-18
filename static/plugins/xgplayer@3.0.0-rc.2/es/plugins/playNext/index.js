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

/**
 * 下一个按钮组件
 */
import Plugin, { POSITIONS, Sniffer, Events } from '../../plugin';
var Next = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"40\" viewBox=\"10 0 24 40\"><path d=\"M30.4 10.64v21.504h-4.864v-9.856l-12.16 8.96V11.536l12.16 8.96V10.64z\"/></svg>";

var PlayNextIcon = /*#__PURE__*/function (_Plugin) {
  _inherits(PlayNextIcon, _Plugin);

  var _super = _createSuper(PlayNextIcon);

  function PlayNextIcon(options) {
    var _this;

    _classCallCheck(this, PlayNextIcon);

    _this = _super.call(this, options);

    _defineProperty(_assertThisInitialized(_this), "playNext", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          player = _assertThisInitialize.player;

      e.preventDefault();
      e.stopPropagation();

      if (_this.idx + 1 < _this.config.urlList.length) {
        _this.idx++;
        player.emit(Events.PLAYNEXT, _this.idx + 1);

        _this.nextHandler(_this.config.urlList[_this.idx], _this.idx);
      } else {
        _this.nextHandler();

        player.emit(Events.PLAYNEXT);
      }
    });

    _this.idx = -1;
    return _this;
  }

  _createClass(PlayNextIcon, [{
    key: "afterCreate",
    value: function afterCreate() {
      if (!this.config.urlList || this.config.urlList.length === 0) {
        return;
      }

      this.appendChild('.xgplayer-icon', this.icons.playNext);
      this.initEvents();
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        playNext: Next
      };
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      this.nextHandler = this.hook('nextClick', this.changeSrc);
      var event = Sniffer.device === 'mobile' ? 'touchend' : 'click';
      this.bind(event, this.playNext);
      this.show();
    }
  }, {
    key: "changeSrc",
    value: function changeSrc(url) {
      var player = this.player;

      if (!url) {
        return;
      }

      player.pause();
      player.currentTime = 0;
      player.autoplay = true;
      player.src = url;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['touchend', 'click'], this.playNext);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.config.urlList || this.config.urlList.length === 0) {
        return;
      }

      return "\n     <xg-icon class=\"xgplayer-playnext\">\n      <div class=\"xgplayer-icon\">\n      </div>\n      <div class=\"xg-tips\" lang-key=\"PLAYNEXT_TIPS\">".concat(this.i18n.PLAYNEXT_TIPS, "</div>\n     </xg-icon>\n    ");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'playNext';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_LEFT,
        index: 1,
        url: null,
        urlList: []
      };
    }
  }]);

  return PlayNextIcon;
}(Plugin);

export { PlayNextIcon as default };