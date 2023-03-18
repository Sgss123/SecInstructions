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

import Plugin, { Events, Util } from '../../plugin';
/**
 * @typedef {{
 *   isEndedShow?: boolean, // 是否在播放结束之后显示
 *   hideCanplay?: boolean, // cnaplay 时间大于1的时候才隐藏
 *   poster?: string // 封面图地址
 * }} IPosterConfig
 */

var Poster = /*#__PURE__*/function (_Plugin) {
  _inherits(Poster, _Plugin);

  var _super = _createSuper(Poster);

  function Poster() {
    _classCallCheck(this, Poster);

    return _super.apply(this, arguments);
  }

  _createClass(Poster, [{
    key: "isEndedShow",
    get: function get() {
      return this.config.isEndedShow;
    },
    set: function set(value) {
      this.config.isEndedShow = value;
    }
  }, {
    key: "hide",
    value: function hide() {
      Util.addClass(this.root, 'hide');
    }
  }, {
    key: "show",
    value: function show() {
      Util.removeClass(this.root, 'hide');
    }
  }, {
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (typeof args.player.config.poster === 'string') {
        args.config.poster = args.player.config.poster;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      this.on(Events.ENDED, function () {
        if (!_this.isEndedShow) {
          Util.addClass(_this.root, 'hide');
        }
      });

      if (this.config.hideCanplay) {
        this.once(Events.TIME_UPDATE, function () {
          _this.onTimeUpdate();
        });
        this.on(Events.URL_CHANGE, function () {
          Util.removeClass(_this.root, 'hide');
          Util.addClass(_this.root, 'xg-showplay');

          _this.once(Events.TIME_UPDATE, function () {
            _this.onTimeUpdate();
          });
        });
      } else {
        this.on(Events.PLAY, function () {
          Util.addClass(_this.root, 'hide');
        });
      }
    }
  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate() {
      var _this2 = this;

      if (!this.player.currentTime) {
        this.once(Events.TIME_UPDATE, function () {
          _this2.onTimeUpdate();
        });
      } else {
        Util.removeClass(this.root, 'xg-showplay');
      }
    }
  }, {
    key: "update",
    value: function update(poster) {
      if (!poster) {
        return;
      }

      this.config.poster = poster;
      this.root.style.backgroundImage = "url(".concat(poster, ")");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$config = this.config,
          poster = _this$config.poster,
          hideCanplay = _this$config.hideCanplay;
      var style = poster ? "background-image:url(".concat(poster, ");") : '';
      return "<xg-poster class=\"xgplayer-poster ".concat(hideCanplay ? 'xg-showplay' : '', "\" style=\"").concat(style, "\">\n    </xg-poster>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'poster';
    }
    /**
     * @type IPosterConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        isEndedShow: true,
        // 是否在播放结束之后显示
        hideCanplay: false,
        // cnaplay 时间大于1的时候才隐藏
        poster: '' // 封面图地址

      };
    }
  }]);

  return Poster;
}(Plugin);

export default Poster;