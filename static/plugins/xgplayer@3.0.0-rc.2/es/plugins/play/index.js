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
var PlaySvg = "<svg class=\"play\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"3 -4 28 40\"><path fill=\"#fff\" d=\"M18.468 11.639l7.503 4.777-7.503 4.777zM10.965 6.86l7.503 4.778v9.554l-7.503 4.778z\"/></svg>";
var PauseSvg = "<svg class=\"pause\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"3 -4 28 40\"><path fill=\"#fff\" d=\"M19.173 6.861h5.451v19.11h-5.45V6.86zM8.208 25.971V6.86h5.45v19.11h-5.45z\"/></svg>";

var Play = /*#__PURE__*/function (_Plugin) {
  _inherits(Play, _Plugin);

  var _super = _createSuper(Play);

  function Play() {
    _classCallCheck(this, Play);

    return _super.apply(this, arguments);
  }

  _createClass(Play, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      var player = this.player,
          config = this.config;

      if (config.disable) {
        return;
      }

      this.initIcons();
      this.btnClick = this.btnClick.bind(this);
      this.bind(['touchend', 'click'], this.btnClick);
      this.on(Events.PAUSE, function () {
        _this.animate(player.paused);
      });
      this.on(Events.PLAY, function () {
        _this.animate(player.paused);
      });
      this.animate(true);
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        play: {
          icon: PlaySvg,
          class: 'xg-icon-play'
        },
        pause: {
          icon: PauseSvg,
          class: 'xg-icon-pause'
        }
      };
    }
  }, {
    key: "btnClick",
    value: function btnClick(e) {
      e.preventDefault();
      e.stopPropagation();
      var player = this.player;
      this.emitUserAction(e, 'switch_play_pause', {
        prop: 'paused',
        from: player.paused,
        to: !player.paused
      });

      if (player.paused) {
        player.play();
        this.animate(false);
      } else {
        player.pause();
        this.animate(true);
      }

      return false;
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild('.xgplayer-icon', icons.play);
      this.appendChild('.xgplayer-icon', icons.pause);
    }
  }, {
    key: "animate",
    value: function animate(paused) {
      var i18nKeys = this.i18nKeys;

      if (paused) {
        this.setAttr('data-state', 'pause');
        this.changeLangTextKey(this.find('.xg-tips'), i18nKeys.PLAY_TIPS);
      } else {
        this.setAttr('data-state', 'play');
        this.changeLangTextKey(this.find('.xg-tips'), i18nKeys.PAUSE_TIPS);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['touchend', 'click'], this.btnClick);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      return "<xg-icon class=\"xgplayer-play\">\n    <div class=\"xgplayer-icon\">\n    </div>\n    <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys.PLAY_TIPS, "\">").concat(this.i18n.PLAY_TIPS, "</div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'play';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_LEFT,
        index: 0,
        disable: false
      };
    }
  }]);

  return Play;
}(Plugin);

export default Play;