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

import Plugin, { Util, Sniffer } from '../../plugin';
import initDotsAPI from './dotsApi';
/**
 * @typedef {{
 *   miniWidth?: number, // 故事点显示最小宽度
 *   ispots?: Array<{ //故事点列表
 *     time?: number, // 进度条在此时间戳打点 单位为s
 *     text?: string, // 打点处的自定义文案
 *     id?: number | string, // 标记唯一标识，用于删除的时候索引
 *     duration:? number, // 进度条标识点的时长 默认1s【可选】单位为s
 *     color?: string, // 进度条标识点的显示颜色【可选】
 *     style?: { [propName: string]: any }, // 指定样式
 *     width?: number,
 *     height?: number
 *    }>,
 *   defaultText?: '', // 故事点hover默认文案
 *   isFocusDots?: true, //
 *   isShowThumbnail?: true, // 是否显示预览图
 *   isShowCoverPreview?: false, // 进度条拖动时是否显示播放区域预览图
 *   mode?: 'short' | 'production', // short // production
 *   [propName: string]: any
 * }} IProgressPreviewConfig
 */

var CALLBACK_MAP = {
  dragmove: 'onProgressMove',
  dragstart: 'onProgressDragStart',
  dragend: 'onProgressDragEnd'
};
/** */

var ProgressPreview = /*#__PURE__*/function (_Plugin) {
  _inherits(ProgressPreview, _Plugin);

  var _super = _createSuper(ProgressPreview);

  function ProgressPreview(args) {
    var _this;

    _classCallCheck(this, ProgressPreview);

    _this = _super.call(this, args);

    _defineProperty(_assertThisInitialized(_this), "onMousemove", function (e) {
      if (_this._state.f || Util.hasClass(e.target, 'xg-spot-content')) {
        Util.event(e);
        e.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMousedown", function (e) {
      if (_this._state.f || Util.hasClass(e.target, 'xg-spot-content')) {
        Util.event(e);
        e.stopPropagation();
      }
    });

    _this._ispots = [];
    _this.videoPreview = null;
    _this.videothumbnail = null;
    _this.thumbnail = null;
    _this._state = {
      now: 0,
      f: false
    };
    return _this;
  }

  _createClass(ProgressPreview, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      var progress = args.player.plugins.progress;

      if (progress) {
        args.root = progress.root;
      }
    }
  }, {
    key: "onPluginsReady",
    value: function onPluginsReady() {
      var player = this.player;

      if (!player.plugins.progress) {
        return;
      }

      this.previewLine = this.find('.xg-spot-line');
      this.timePoint = this.find('.xgplayer-progress-point');
      this.timeText = this.find('.xg-spot-time');
      this.tipText = this.find('.spot-inner-text');
      this._hasThumnail = false;
      this.registerThumbnail();
      initDotsAPI(this);
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;

      var progress = this.player.plugins.progress;

      if (Sniffer.device === 'mobile' || !progress) {
        return;
      }

      Object.keys(CALLBACK_MAP).map(function (key) {
        _this2[CALLBACK_MAP[key]] = _this2[CALLBACK_MAP[key]].bind(_this2);
        progress.addCallBack(key, _this2[CALLBACK_MAP[key]]);
      });
      this.bind('.xg-spot-info', 'mousemove', this.onMousemove);
      this.bind('.xg-spot-info', 'mousedown', this.onMousedown);
      var fun = this.hook('previewClick', function () {// console.log('args', args)
      });

      this.handlerPreviewClick = function (e) {
        e.stopPropagation();
        fun(parseInt(_this2._state.now * 1000, 10) / 1000, e);
      };

      this.bind('.xg-spot-content', 'mouseup', this.handlerPreviewClick);
    }
  }, {
    key: "onProgressMove",
    value: function onProgressMove(data) {
      this.updatePosition(data.offset, data.width, data.currentTime, data.e);
    }
  }, {
    key: "onProgressDragStart",
    value: function onProgressDragStart(data) {
      this.isDrag = true;
      this.videoPreview && Util.addClass(this.videoPreview, 'show');
    }
  }, {
    key: "onProgressDragEnd",
    value: function onProgressDragEnd(data) {
      this.isDrag = false;
      this.videoPreview && Util.removeClass(this.videoPreview, 'show');
    }
  }, {
    key: "updateLinePos",
    value: function updateLinePos(offset, cwidth) {
      var root = this.root,
          previewLine = this.previewLine,
          timePoint = this.timePoint,
          player = this.player;
      var mode = player.controls.mode;
      var isflex = mode === 'flex';
      var lwidth = root.getBoundingClientRect().width;
      var tWidth = timePoint.getBoundingClientRect().width;
      var x = offset - lwidth / 2;

      var _t, _tt;

      if (x < 0 && !isflex) {
        x = 0;
        _t = offset - lwidth / 2;
        !this.thumbnail && (_tt = offset - lwidth / 2 - tWidth / 2);
      } else if (x > cwidth - lwidth && !isflex) {
        _t = x - (cwidth - lwidth);
        !this.thumbnail && (_tt = x - (cwidth - lwidth) - tWidth / 2);
        x = cwidth - lwidth;
      } else {
        _t = 0;
        !this.thumbnail && (_tt = -tWidth / 2);
      }

      _t !== undefined && (previewLine.style.transform = "translateX(".concat(_t, "px)"));
      _tt !== undefined && (timePoint.style.transform = "translateX(".concat(_tt, "px)"));
      root.style.transform = "translateX(".concat(x, "px)");
    }
  }, {
    key: "updateTimeText",
    value: function updateTimeText(timeStr) {
      var timeText = this.timeText,
          timePoint = this.timePoint;
      timeText.textContent = timeStr;
      !this.thumbnail && (timePoint.textContent = timeStr);
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(offset, cwidth, time, e) {
      var root = this.root,
          config = this.config,
          _state = this._state;

      if (!root) {
        return;
      }

      this.updateLinePos(offset, cwidth); // let now = offset / cwidth * player.duration
      // now = now < 0 ? 0 : (now > player.duration ? player.duration : now)

      _state.now = time;
      var timeStr = Util.format(time);

      if (e && e.target && Util.hasClass(e.target, 'xgplayer-spot')) {
        this.showTips(e.target.getAttribute('data-text'), false, timeStr);
        _state.f = true;
        config.isFocusDots && _state.f && (_state.now = parseInt(e.target.getAttribute('data-time'), 10));
      } else if (config.defaultText) {
        _state.f = false;
        this.showTips(config.defaultText, true, timeStr);
      } else {
        _state.f = false;
        this.hideTips('');
      }

      this.updateTimeText(timeStr);
      this.updateThumbnails(_state.now);
    }
  }, {
    key: "updateThumbnails",
    value: function updateThumbnails(time) {
      var player = this.player,
          videoPreview = this.videoPreview;
      var thumbnail = player.plugins.thumbnail;

      if (thumbnail && thumbnail.usable) {
        this.thumbnail && thumbnail.update(this.thumbnail, time, 160, 90);
        var rect = videoPreview && videoPreview.getBoundingClientRect();
        this.videothumbnail && thumbnail.update(this.videothumbnail, time, rect.width, rect.height);
      }
    }
  }, {
    key: "registerThumbnail",
    value: function registerThumbnail() {
      var thumbnailConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (Sniffer.device === 'mobile') {
        return;
      }

      var player = this.player,
          config = this.config;
      var thumbnail = player.getPlugin('thumbnail');

      if (thumbnail) {
        Object.keys(thumbnailConfig).map(function (key) {
          thumbnail.config[key] = thumbnailConfig[key];
        });
      }

      if (!thumbnail || !thumbnail.usable || !config.isShowThumbnail) {
        Util.addClass(this.root, 'short-line no-thumbnail');
        return;
      } else {
        Util.removeClass(this.root, 'short-line no-thumbnail');
      }

      this._hasThumnail = true;
      var tRoot = this.find('.xg-spot-thumbnail');
      this.thumbnail = thumbnail.createThumbnail(tRoot, 'progress-thumbnail');

      if (config.isShowCoverPreview) {
        this.videoPreview = Util.createDom('xg-video-preview', '', {}, 'xgvideo-preview');
        player.root.appendChild(this.videoPreview);
        this.videothumbnail = thumbnail.createThumbnail(this.videoPreview, 'xgvideo-thumbnail');
      }
    }
  }, {
    key: "calcuPosition",
    value: function calcuPosition(time, duration) {
      var progress = this.player.plugins.progress;
      var player = this.player;
      var totalWidth = progress.root.getBoundingClientRect().width;
      var widthPerSeconds = player.duration / totalWidth * 6;
      var ret = {};

      if (time + duration > player.duration) {
        duration = player.duration - time;
      }

      ret.left = time / player.duration * 100;
      ret.width = duration / player.duration;
      ret.isMini = widthPerSeconds > duration;
      return {
        left: time / player.duration * 100,
        width: duration / player.duration * 100,
        isMini: duration < widthPerSeconds
      };
    }
  }, {
    key: "showDot",
    value: function showDot(id) {
      var dot = this.findDot(id);

      if (dot) {
        var rect = this.root.getBoundingClientRect();
        var width = rect.width;
        var offset = dot.time / this.player.duration * width;
        this.updatePosition(offset, width, dot.time);
      }
    }
  }, {
    key: "showTips",
    value: function showTips(text, isDefault) {
      var timeStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (!text) {
        return;
      }

      Util.addClass(this.root, 'no-timepoint');
      Util.addClass(this.find('.xg-spot-content'), 'show-text');

      if (isDefault && this.config.mode === 'production') {
        Util.addClass(this.root, 'product');
        this.tipText.textContent = text;
      } else {
        Util.removeClass(this.root, 'product');
        this.tipText.textContent = this._hasThumnail ? text : "".concat(timeStr, " ").concat(text);
      }
    }
  }, {
    key: "hideTips",
    value: function hideTips() {
      Util.removeClass(this.root, 'no-timepoint');
      this.tipText.textContent = '';
      Util.removeClass(this.find('.xg-spot-content'), 'show-text');
      Util.removeClass(this.root, 'product');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      var progress = this.player.plugins.progress;
      progress && Object.keys(CALLBACK_MAP).map(function (key) {
        progress.removeCallBack(key, _this3[CALLBACK_MAP[key]]);
      });
      this.videothumbnail = null;
      this.thumbnail = null;
      this.videoPreview && this.player.root.removeChild(this.videoPreview);
      this.unbind('.xg-spot-info', 'mousemove', this.onMousemove);
      this.unbind('.xg-spot-info', 'mousedown', this.onMousedown);
      this.unbind('.xg-spot-content', 'mouseup', this.handlerPreviewClick);
    }
  }, {
    key: "render",
    value: function render() {
      if (Sniffer.device === 'mobile' || this.playerConfig.isMobileSimulateMode) {
        return '';
      }

      return "<div class=\"xg-spot-info ".concat(this.config.mode === 'short' ? 'short-line' : '', "\">\n      <div class=\"xg-spot-content\">\n        <div class=\"xg-spot-thumbnail\">\n          <span class=\"xg-spot-time\"></span>\n        </div>\n        <div class=\"xg-spot-text\"><span class=\"spot-inner-text\"></span></div>\n      </div>\n      <div class=\"xgplayer-progress-point\">00:00</div>\n      <div class=\"xg-spot-line\"></div>\n    </div>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'progresspreview';
    }
    /**
     * @type IProgressPreviewConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        index: 1,
        miniWidth: 6,
        // 故事点显示最小宽度
        ispots: [],
        // 故事点列表
        defaultText: '',
        // 故事点hover默认文案
        isFocusDots: true,
        //
        isShowThumbnail: true,
        // 是否显示预览图
        isShowCoverPreview: false,
        // 进度条拖动时是否显示播放区域预览图
        mode: '' // short // production

      };
    }
  }]);

  return ProgressPreview;
}(Plugin);

export { ProgressPreview as default };