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

var ErrorPlugin = /*#__PURE__*/function (_Plugin) {
  _inherits(ErrorPlugin, _Plugin);

  var _super = _createSuper(ErrorPlugin);

  function ErrorPlugin() {
    _classCallCheck(this, ErrorPlugin);

    return _super.apply(this, arguments);
  }

  _createClass(ErrorPlugin, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      this.clickHandler = this.hook('errorRetry', this.errorRetry, {
        pre: function pre(e) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
      this.onError = this.hook('showError', this.handleError);
      this.bind('.xgplayer-error-refresh', 'click', this.clickHandler);
      this.on(Events.CANPLAY, function () {
        _this.handleCanPlay();
      });
      this.on(Events.ERROR, function (error) {
        _this.onError(error);
      });
    }
  }, {
    key: "errorRetry",
    value: function errorRetry() {
      this.player.retry();
    }
  }, {
    key: "handleCanPlay",
    value: function handleCanPlay() {
      Util.removeClass(this.player.root, 'xgplayer-is-error');
    }
  }, {
    key: "handleError",
    value: function handleError() {
      var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var player = this.player;
      var type = error.errorType;
      var errorNote = player.errorNote ? this.i18n[player.errorNote] : '';

      if (!errorNote) {
        switch (type) {
          case 'decoder':
            errorNote = this.i18n.MEDIA_ERR_DECODE;
            break;

          case 'network':
            errorNote = this.i18n.MEDIA_ERR_NETWORK;
            break;

          default:
            errorNote = this.i18n.MEDIA_ERR_SRC_NOT_SUPPORTED;
        }
      }

      this.find('.xgplayer-error-text').innerHTML = errorNote;
      this.find('.xgplayer-error-tips').innerHTML = "".concat(this.i18n.REFRESH_TIPS, "<span class=\"xgplayer-error-refresh\">").concat(this.i18n.REFRESH, "</span>");
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind('.xgplayer-error-refresh', 'click', this.clickHandler);
    }
  }, {
    key: "render",
    value: function render() {
      return "<xg-error class=\"xgplayer-error\">\n      <div class=\"xgplayer-errornote\">\n       <span class=\"xgplayer-error-text\"></span>\n       <span class=\"xgplayer-error-tips\"><em class=\"xgplayer-error-refresh\"></em></span>\n      </div>\n    </xg-error>";
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'error';
    }
  }]);

  return ErrorPlugin;
}(Plugin);

export { ErrorPlugin as default };