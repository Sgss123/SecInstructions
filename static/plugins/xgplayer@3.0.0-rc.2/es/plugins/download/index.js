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

import downloadUtil from 'downloadjs';
import Plugin, { POSITIONS } from '../../plugin';
var DownloadSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><g fill=\"#FFF\" fill-rule=\"evenodd\"><rect x=\"11\" y=\"4\" width=\"2\" height=\"12\" rx=\"1\"/><rect x=\"3\" y=\"18\" width=\"18\" height=\"2\" rx=\"1\"/><rect transform=\"rotate(90 4 17.5)\" x=\"1.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"/><rect transform=\"rotate(90 20 17.5)\" x=\"17.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"/><path d=\"M11.988 14.3l-4.243-4.242a1 1 0 00-1.414 1.414l4.95 4.95a1 1 0 001.414 0l4.95-4.95a1 1 0 10-1.414-1.414L11.988 14.3z\"/></g></svg>";
/**
 * @typedef { {
 *   position: string,
 *   index: number,
 *   disable: boolean,
 *   [propName: string]: any
 *  } } IDownloadConfig
 */

var Download = /*#__PURE__*/function (_Plugin) {
  _inherits(Download, _Plugin);

  var _super = _createSuper(Download);

  function Download(args) {
    var _this;

    _classCallCheck(this, Download);

    _this = _super.call(this, args);

    _defineProperty(_assertThisInitialized(_this), "download", function (e) {
      if (_this.isLock) {
        return;
      }

      _this.emitUserAction(e, 'download');

      var url = _this.getAbsoluteURL(_this.player.src);

      downloadUtil(url);
      _this.isLock = true;
      _this.timer = window.setTimeout(function () {
        _this.isLock = false;
        window.clearTimeout(_this.timer);
        _this.timer = null;
      }, 300);
    });

    _this.timer = null;
    _this.isLock = false;
    return _this;
  }

  _createClass(Download, [{
    key: "afterCreate",
    value: function afterCreate() {
      if (this.config.disable) {
        return;
      }

      this.appendChild('.xgplayer-icon', this.icons.download);
      this.bind(['click', 'touchend'], this.download);
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        download: DownloadSvg
      };
    }
  }, {
    key: "getAbsoluteURL",
    value: function getAbsoluteURL(url) {
      // Check if absolute URL
      if (!url.match(/^https?:\/\//)) {
        var div = document.createElement('div');
        div.innerHTML = "<a href=\"".concat(url, "\">x</a>");
        url = div.firstChild.href;
      }

      return url;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.download);
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      return "<xg-icon class=\"xgplayer-download\">\n   <div class=\"xgplayer-icon\">\n   </div>\n   <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys.DOWNLOAD_TIPS, "\">").concat(this.i18n.DOWNLOAD_TIPS, "</div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'download';
    }
    /**
     * @type IDownloadConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 3,
        disable: true
      };
    }
  }]);

  return Download;
}(Plugin);

export { Download as default };