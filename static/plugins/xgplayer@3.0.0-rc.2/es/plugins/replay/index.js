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
var ReplaySvg = "<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 78 78\" width=\"78\" height=\"78\"><path fill=\"#fff\" d=\"M28.227 33.876l3.04-1.229a1 1 0 011.303.553l.374.927a1 1 0 01-.552 1.302l-5.564 2.247-.927.375a1 1 0 01-1.302-.553l-2.622-6.49a1 1 0 01.553-1.302l.927-.374a1 1 0 011.302.552l.92 2.278A15.005 15.005 0 0139.5 23c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15a14.955 14.955 0 01-10.63-4.417 1.5 1.5 0 112.126-2.116A11.956 11.956 0 0039.5 50c6.627 0 12-5.373 12-12s-5.373-12-12-12a12.005 12.005 0 00-11.273 7.876z\"/></svg>";

var Replay = /*#__PURE__*/function (_Plugin) {
  _inherits(Replay, _Plugin);

  var _super = _createSuper(Replay);

  function Replay() {
    _classCallCheck(this, Replay);

    return _super.apply(this, arguments);
  }

  _createClass(Replay, [{
    key: "registerIcons",
    value: function registerIcons() {
      return {
        replay: ReplaySvg
      };
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      Plugin.insert(this.icons.replay, this.root, 0);
      this.__handleReplay = this.hook('replayClick', function () {
        _this.player.replay();
      }, {
        pre: function pre(e) {
          e.preventDefault();
          e.stopPropagation();
        }
      }); // this.bind('.xgplayer-replay', ['click', 'touchend'], this.__handleReplay)

      this.bind('svg', ['click', 'touchend'], this.__handleReplay);
      this.bind('.xgplayer-replay-txt', ['click', 'touchend'], this.__handleReplay);
      this.on(Events.ENDED, function () {
        if (!_this.playerConfig.loop) {
          Util.addClass(_this.player.root, 'replay');
        }

        if (_this.config.disable) {
          return;
        }

        _this.show();

        var path = _this.root.querySelector('path');

        if (path) {
          var transform = window.getComputedStyle(path).getPropertyValue('transform');

          if (typeof transform === 'string' && transform.indexOf('none') > -1) {
            return null;
          } else {
            path.setAttribute('transform', transform);
          }
        }
      });
      this.on(Events.PLAY, function () {
        _this.hide();
      });
    }
  }, {
    key: "handleReplay",
    value: function handleReplay(e) {
      e.preventDefault();
      e.stopPropagation();
      this.player.replay();
      Util.removeClass(this.player.root, 'replay');
    }
  }, {
    key: "show",
    value: function show() {
      if (this.config.disable) {
        return;
      }

      this.root.style.display = 'flex';
    }
  }, {
    key: "enable",
    value: function enable() {
      this.config.disable = false;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.config.disable = true;
      this.hide();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind('svg', ['click', 'touchend'], this.__handleReplay);
      this.unbind('.xgplayer-replay-txt', ['click', 'touchend'], this.__handleReplay);
    }
  }, {
    key: "render",
    value: function render() {
      return "<xg-replay class=\"xgplayer-replay\">\n      <xg-replay-txt class=\"xgplayer-replay-txt\" lang-key=\"".concat(this.i18nKeys.REPLAY, "\">").concat(this.i18n.REPLAY || '重播', "</xg-replay-txt>\n    </xg-replay>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'replay';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        disable: false
      };
    }
  }]);

  return Replay;
}(Plugin);

export default Replay;