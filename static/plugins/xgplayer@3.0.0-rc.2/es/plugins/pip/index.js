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

import Plugin, { Events, Util, POSITIONS } from '../../plugin';
var PipIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.5 4.3h-13a.2.2 0 00-.2.2v11c0 .11.09.2.2.2h5v1.8h-5a2 2 0 01-2-2v-11a2 2 0 012-2h13a2 2 0 012 2v4h-1.8v-4a.2.2 0 00-.2-.2zM12 11.5a1 1 0 00-1 1v4a1 1 0 001 1h5.5a1 1 0 001-1v-4a1 1 0 00-1-1H12z\" fill=\"#fff\"/></svg>";
var PipIconExit = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.5 4.3h-13a.2.2 0 00-.2.2v11c0 .11.09.2.2.2h5v1.8h-5a2 2 0 01-2-2v-11a2 2 0 012-2h13a2 2 0 012 2v4h-1.8v-4a.2.2 0 00-.2-.2zM12 11.5a1 1 0 00-1 1v4a1 1 0 001 1h5.5a1 1 0 001-1v-4a1 1 0 00-1-1H12z\" fill=\"#fff\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.5 7.7a.5.5 0 00.5-.5v-.7a.5.5 0 00-.5-.5h-4a.5.5 0 00-.5.5v3.96a.5.5 0 00.5.5h.7a.5.5 0 00.5-.5V8.83l2.07 2.109a.5.5 0 00.707.006l.5-.49a.5.5 0 00.006-.707L7.973 7.7H9.5z\" fill=\"#fff\"/></svg>";
/**
 * @description picture-in-picture plugin
 * @doc https://www.w3.org/TR/picture-in-picture/
 * @doc https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls
 */

var PresentationMode = {
  PIP: 'picture-in-picture',
  INLINE: 'inline',
  FULLSCREEN: 'fullscreen'
};

var PIP = /*#__PURE__*/function (_Plugin) {
  _inherits(PIP, _Plugin);

  var _super = _createSuper(PIP);

  function PIP() {
    var _this;

    _classCallCheck(this, PIP);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "switchPIP", function (e) {
      if (!_this.isPIPAvailable()) {
        return false;
      }

      e.stopPropagation();

      if (_this.isPip) {
        _this.exitPIP();

        _this.emitUserAction(e, 'change_pip', {
          props: 'pip',
          from: true,
          to: false
        });

        _this.setAttr('data-state', 'normal');
      } else if (_this.player.video.readyState === 4) {
        _this.requestPIP();

        _this.emitUserAction(e, 'change_pip', {
          props: 'pip',
          from: false,
          to: true
        });

        _this.setAttr('data-state', 'pip');
      }
    });

    return _this;
  }

  _createClass(PIP, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (typeof args.player.config.pip === 'boolean') {
        args.config.showIcon = args.player.config.pip;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      // 非可用状态不做初始化
      if (!this.isPIPAvailable()) {
        return;
      }

      this.pMode = PresentationMode.INLINE;
      this.initPipEvents(); // 确认开启按钮的情况下才初始化按钮

      if (this.config.showIcon) {
        this.initIcons();
      } // video初始化之后再做判断是否显示


      this.once(Events.COMPLETE, function () {
        if (_this2.config.showIcon) {
          Util.removeClass(_this2.find('.xgplayer-icon'), 'xg-icon-disable');

          _this2.bind('click', _this2.switchPIP);
        }
      });
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        pipIcon: {
          icon: PipIcon,
          class: 'xg-get-pip'
        },
        pipIconExit: {
          icon: PipIconExit,
          class: 'xg-exit-pip'
        }
      };
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild('.xgplayer-icon', icons.pipIcon);
      this.appendChild('.xgplayer-icon', icons.pipIconExit);
    }
  }, {
    key: "initPipEvents",
    value: function initPipEvents() {
      var _this3 = this;

      var player = this.player;

      this.leavePIPCallback = function () {
        // 处理点击x关闭画中画的时候暂停问题
        var paused = player.paused;
        Util.setTimeout(_this3, function () {
          // 使用videoPlay避免多次触发 playhooks
          !paused && player.videoPlay();
        }, 0);
        !paused && player.videoPlay();

        _this3.setAttr('data-state', 'normal');

        player.emit(Events.PIP_CHANGE, false);
      };

      this.enterPIPCallback = function (e) {
        player.emit(Events.PIP_CHANGE, true);
        _this3.pipWindow = e.pictureInPictureWindow;

        _this3.setAttr('data-state', 'pip');
      };

      this.onWebkitpresentationmodechanged = function (e) {
        var mode = player.video.webkitPresentationMode; // 如果在全屏下进入了该逻辑,调用退出全屏处理

        if (_this3.pMode === PresentationMode.FULLSCREEN && mode !== PresentationMode.FULLSCREEN) {
          player.onFullscreenChange(null, false);
        }

        _this3.pMode = mode;

        if (mode === PresentationMode.PIP) {
          _this3.enterPIPCallback(e);
        } else if (mode === PresentationMode.INLINE) {
          _this3.leavePIPCallback(e);
        }
      };

      if (player.video) {
        player.video.addEventListener('enterpictureinpicture', this.enterPIPCallback);
        player.video.addEventListener('leavepictureinpicture', this.leavePIPCallback);
        PIP.checkWebkitSetPresentationMode(player.video) && player.video.addEventListener('webkitpresentationmodechanged', this.onWebkitpresentationmodechanged);
      }
    }
  }, {
    key: "requestPIP",
    value:
    /*
     * 进入画中画
    */
    function requestPIP() {
      var player = this.player,
          playerConfig = this.playerConfig;

      if (!this.isPIPAvailable() || this.isPip) {
        return;
      }

      try {
        if (playerConfig.poster) {
          player.video.poster = playerConfig.poster;
        }

        PIP.checkWebkitSetPresentationMode(player.video) ? player.video.webkitSetPresentationMode('picture-in-picture') : player.video.requestPictureInPicture();
        return true;
      } catch (reason) {
        console.error('requestPiP', reason);
        return false;
      }
    }
    /**
     * 退出画中画
     */

  }, {
    key: "exitPIP",
    value: function exitPIP() {
      var player = this.player;

      try {
        if (this.isPIPAvailable() && this.isPip) {
          PIP.checkWebkitSetPresentationMode(player.video) ? player.video.webkitSetPresentationMode('inline') : document.exitPictureInPicture();
        }

        return true;
      } catch (reason) {
        console.error('exitPIP', reason);
        return false;
      }
    }
  }, {
    key: "isPip",
    get: function get() {
      var player = this.player;
      return document.pictureInPictureElement && document.pictureInPictureElement === player.video || player.video.webkitPresentationMode === PresentationMode.PIP;
    }
  }, {
    key: "isPIPAvailable",
    value: function isPIPAvailable() {
      var video = this.player.video;
      return document.pictureInPictureEnabled && (Util.typeOf(video.disablePictureInPicture) === 'Boolean' && !video.disablePictureInPicture || video.webkitSupportsPresentationMode && Util.typeOf(video.webkitSetPresentationMode) === 'Function');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var player = this.player;
      player.video.removeEventListener('enterpictureinpicture', this.enterPIPCallback);
      player.video.removeEventListener('leavepictureinpicture', this.leavePIPCallback);
      this.exitPIP();
      this.unbind('click', this.btnClick);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.config.showIcon && this.isPIPAvailable()) {
        return;
      }

      return "<xg-icon class=\"xgplayer-pip\">\n      <div class=\"xgplayer-icon xg-icon-disable\">\n      </div>\n      <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys.PIP, "\">").concat(this.i18n.PIP, "</div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'pip';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 6,
        showIcon: false
      };
    }
  }, {
    key: "checkWebkitSetPresentationMode",
    value: function checkWebkitSetPresentationMode(video) {
      return typeof video.webkitSetPresentationMode === 'function';
    }
  }]);

  return PIP;
}(Plugin);

export default PIP;