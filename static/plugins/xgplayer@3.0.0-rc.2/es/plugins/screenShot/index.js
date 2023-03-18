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

import Plugin, { POSITIONS, Events } from '../../plugin';

var ScreenShot = /*#__PURE__*/function (_Plugin) {
  _inherits(ScreenShot, _Plugin);

  var _super = _createSuper(ScreenShot);

  function ScreenShot() {
    _classCallCheck(this, ScreenShot);

    return _super.apply(this, arguments);
  }

  _createClass(ScreenShot, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (typeof args.player.config.screenShot === 'boolean') {
        args.config.disable = !args.player.config.screenShot;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      this.appendChild('.xgplayer-icon', this.icons.screenshotIcon);
      var config = this.config;

      this.initSize = function (data) {
        if (config.fitVideo) {
          config.width = data.vWidth;
          config.height = data.vHeight;
        }
      };

      this.once(Events.VIDEO_RESIZE, this.initSize);
    }
  }, {
    key: "onPluginsReady",
    value: function onPluginsReady() {
      this.show();
      this.onClickBtn = this.onClickBtn.bind(this);
      this.bind(['click', 'touchend'], this.onClickBtn);
    }
  }, {
    key: "saveScreenShot",
    value: function saveScreenShot(data, filename) {
      var saveLink = document.createElement('a');
      saveLink.href = data;
      saveLink.download = filename;
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      saveLink.dispatchEvent(event);
    }
  }, {
    key: "createCanvans",
    value: function createCanvans(width, height) {
      var canvas = document.createElement('canvas');
      this.canvasCtx = canvas.getContext('2d');
      this.canvas = canvas;
      canvas.width = width || this.config.width;
      canvas.height = height || this.config.height;
    }
  }, {
    key: "onClickBtn",
    value: function onClickBtn(e) {
      var _this = this;

      e.preventDefault();
      e.stopPropagation();
      this.emitUserAction(e, 'shot');
      this.shot().then(function (data) {
        _this.emit(Events.SCREEN_SHOT, data);

        _this.saveScreenShot(data, _this.config.name + _this.config.format);
      });
    }
  }, {
    key: "shot",
    value: function shot(width, height) {
      var _this2 = this;

      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        quality: 0.92,
        type: 'image/png'
      };
      var config = this.config,
          player = this.player;
      var quality = option.quality || config.quality;
      var type = option.type || config.type;
      return new Promise(function (resolve, reject) {
        if (!_this2.canvas) {
          _this2.createCanvans(width, height);
        } else {
          _this2.canvas.width = width || config.width;
          _this2.canvas.height = height || config.height;
        }

        _this2.canvasCtx.drawImage(player.video, 0, 0, width || config.width, height || config.height);

        var src = _this2.canvas.toDataURL(type, quality).replace(type, 'image/octet-stream');

        src = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        resolve(src);
      });
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        screenshotIcon: null
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.onClickBtn);
      this.off(Events.VIDEO_RESIZE, this.initSize);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      var className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-text';
      var langKey = 'SCREENSHOT';
      return "\n      <xg-icon class=\"xgplayer-shot\">\n      <div class=\"".concat(className, "\">\n      ").concat(this.icons.screenshotIcon ? '' : "<span lang-key=\"".concat(this.i18nKeys[langKey], "\">").concat(this.i18n[langKey], "</span>"), " \n      </div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'screenShot';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 5,
        quality: 0.92,
        type: 'image/png',
        format: '.png',
        width: 600,
        height: 337,
        fitVideo: true,
        disable: false,
        name: '截图'
      };
    }
  }]);

  return ScreenShot;
}(Plugin);

export { ScreenShot as default };