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

import Plugin, { Events, Util, Sniffer } from '../../plugin';
import XG_DEBUG from '../../utils/debug';
var MODES = {
  REAL_TIME: 'realtime',
  FIRST_FRAME: 'firstframe',
  FRAME_RATE: 'framerate'
};

function nowTime() {
  try {
    return window.performance.now();
  } catch (e) {
    return new Date().getTime();
  }
}
/**
 * Check whether the current video object supports screenshots
 * @param { VideoElement } video
 * @returns
 */


function checkVideoIsSupport(video) {
  if (Sniffer.browser === 'safari' && (/^blob/.test(video.currentSrc) || /^blob/.test(video.src))) {
    return false;
  }

  return true;
}
/**
 * Check whether the current environment supports canvas
 * @returns { Boolean }
 */


function checkIsSupportCanvas() {
  try {
    var ctx = document.createElement('canvas').getContext;

    if (ctx) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}
/**
 * @typedef { {
 *   disable?: boolean,
 *   mode?: "realtime" | "firstframe" | "framerate",
 *   frameRate?: number
 *   filter?: string,
 *   addMask?: boolean,
 *   maskBg?: string,
 *   [propName: string]: any
 * } } IDynamicBgConfig
 */


var isSupportCanvas = null;

var DynamicBg = /*#__PURE__*/function (_Plugin) {
  _inherits(DynamicBg, _Plugin);

  var _super = _createSuper(DynamicBg);

  function DynamicBg() {
    var _this;

    _classCallCheck(this, DynamicBg);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onLoadedData", function () {
      var video = _this.player.video;
      _this.videoPI = parseInt(video.videoWidth / video.videoHeight * 100, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "start", function () {
      var video = _this.player.video;

      var _now = nowTime();

      if (!checkVideoIsSupport(video) || !_this.canvasCtx) {
        return;
      }

      _this.stop();

      if (_this.config.mode === MODES.REAL_TIME) {
        video && video.videoWidth && _this.update(video, video.videoWidth, video.videoHeight);
        _this.preTime = _now;
      } else if (_now - _this.preTime >= _this.interval) {
        video && video.videoWidth && _this.update(video, video.videoWidth, video.videoHeight);
        _this.preTime = _now;
      }

      _this.frameId = Util.requestAnimationFrame(_this.start);
    });

    _defineProperty(_assertThisInitialized(_this), "stop", function () {
      if (_this.frameId) {
        Util.cancelAnimationFrame(_this.frameId);
        _this.frameId = null;
      }
    });

    return _this;
  }

  _createClass(DynamicBg, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      if (this.playerConfig.dynamicBg === true) {
        this.config.disable = false;
      }

      if (!DynamicBg.isSupport) {
        this.config.disable = true;
      }

      var _this$config = this.config,
          disable = _this$config.disable,
          mode = _this$config.mode;

      if (disable) {
        return;
      }
      /**
       * @private
       */


      this._pos = {
        width: 0,
        height: 0,
        rwidth: 0,
        rheight: 0,
        x: 0,
        y: 0
      };
      /**
       * @readonly
       */

      this.isStart = false;
      /**
       * @readonly
       */

      this.videoPI = 0;
      /**
       * @readonly
       */

      this.preTime = 0;
      /**
       * @readonly
       */

      this.interval = parseInt(1000 / this.config.frameRate, 10);
      /**
       * @readonly
       */

      this.canvas = null;
      /**
       * @readonly
       */

      this.canvasCtx = null;
      this.once(Events.COMPLETE, function () {
        _this2.init();

        !_this2.player.paused && _this2.start();
      });
      this.once(Events.LOADED_DATA, this.onLoadedData);
      this.on(Events.URL_CHANGE, function () {
        _this2.once(Events.LOADED_DATA, _this2.onLoadedData);
      });

      if (mode !== MODES.FIRST_FRAME) {
        this.on(Events.PLAY, function () {
          _this2.start();
        });
        this.on(Events.PAUSE, function () {
          _this2.stop();
        });
      } // First frame rendering


      if (mode === MODES.FIRST_FRAME) {
        this.once(Events.TIME_UPDATE, function () {
          var video = _this2.player.video;
          video && checkVideoIsSupport(video) && video.videoWidth && _this2.update(video, video.videoWidth, video.videoHeight);
        });
      }
    }
  }, {
    key: "init",
    value:
    /**
     * @private
     */
    function init() {
      var player = this.player,
          config = this.config;

      try {
        // Ensure that the node is inserted before player.video
        var parent = player.innerContainer || player.root;
        parent.insertAdjacentHTML('afterbegin', "<div class=\"xgplayer-dynamic-bg\"><canvas>\n        </canvas><xgmask></xgmask></div>");
        this.root = parent.children[0];
        this.canvas = this.find('canvas'); // Canvas filter does not take effect in safari

        if (Sniffer.browser === 'safari') {
          this.canvas.style.filter = config.filter;
          this.canvas.style.webkitFilter = config.filter;
        }

        this.mask = this.find('xgmask');
        config.addMask && (this.mask.style.background = config.maskBg);
        this.canvasCtx = this.canvas.getContext('2d');
        var poster = this.playerConfig.poster;

        if (poster) {
          var url = Util.typeOf(poster) === 'String' ? poster : Util.typeOf(poster.poster) === 'String' ? poster.poster : null;
          this.updateImg(url);
        }
      } catch (e) {
        XG_DEBUG.logError('plugin:DynamicBg', e);
      }
    }
  }, {
    key: "updateImg",
    value: function updateImg(url) {
      var _this3 = this;

      if (!url) {
        return;
      } // Render using the image


      var _this$canvas$getBound = this.canvas.getBoundingClientRect(),
          width = _this$canvas$getBound.width,
          height = _this$canvas$getBound.height;

      var image = new window.Image();

      image.onload = function () {
        if (!_this3.canvas) {
          return;
        }

        _this3.canvas.height = height;
        _this3.canvas.width = width;

        _this3.update(image, image.width, image.height);

        image = null;
      };

      image.src = url;
    }
  }, {
    key: "update",
    value: function update(video, videoWidth, videoHeight) {
      if (!this.canvas || !this.canvasCtx) {
        return;
      }

      try {
        var _pos = this._pos,
            config = this.config;

        var _this$canvas$getBound2 = this.canvas.getBoundingClientRect(),
            width = _this$canvas$getBound2.width,
            height = _this$canvas$getBound2.height;

        this.videoPI = parseInt(videoWidth / videoHeight * 100, 10);

        if (width !== _pos.width || height !== _pos.height) {
          var pi = parseInt(width / height * 100, 10);
          _pos.width = this.canvas.width = width;
          _pos.height = this.canvas.height = height;
          var rheight = height;
          var rwidth = width;

          if (pi < this.videoPI) {
            rwidth = parseInt(height * this.videoPI / 100, 10);
          } else if (pi > this.videoPI) {
            rheight = parseInt(width * 100 / this.videoPI, 10);
          }

          if (pi < this.videoPI) {
            rwidth = parseInt(height * this.videoPI / 100, 10);
          } else if (pi > this.videoPI) {
            rheight = parseInt(width * 100 / this.videoPI, 10);
          }

          _pos.rwidth = rwidth * 1.2;
          _pos.rheight = rheight * 1.2;
          _pos.x = (width - _pos.rwidth) / 2;
          _pos.y = (height - _pos.rheight) / 2;
        } // console.log(`x:${_pos.x} y:${_pos.y}  rwidth:${_pos.rwidth} rheight:${ _pos.rheight}`)


        this.canvasCtx.filter = config.filter;
        this.canvasCtx.drawImage(video, _pos.x, _pos.y, _pos.rwidth, _pos.rheight);
      } catch (e) {
        XG_DEBUG.logError('plugin:DynamicBg', e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this.canvasCtx = null;
      this.canvas = null;
    }
  }, {
    key: "render",
    value: function render() {
      return '';
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'dynamicBg';
    }
    /**
     * @type IDynamicBgConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        disable: true,

        /**
         * Rendering method
         * realtime - Realtime rendering
         * firstframe - Render only the first frame
         * framerate - Render by frame
         */
        mode: 'framerate',
        frameRate: 10,
        // Frame rate when mode=framerate
        filter: 'blur(50px)',
        // Filter settings
        addMask: true,
        // Whether need a mask
        maskBg: 'rgba(0,0,0,0.7)' // Mask background color

      };
    }
    /**
     * @type {boolean}
     * @description Does the current environment support Canvas
     */

  }, {
    key: "isSupport",
    get: function get() {
      if (typeof isSupportCanvas === 'boolean') {
        return isSupportCanvas;
      }

      isSupportCanvas = checkIsSupportCanvas();
      return isSupportCanvas;
    }
  }]);

  return DynamicBg;
}(Plugin);

export default DynamicBg;