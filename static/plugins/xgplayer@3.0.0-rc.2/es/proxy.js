function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import EventEmitter from 'eventemitter3';
import Util from './utils/util';
import Sniffer from './utils/sniffer';
import Errors, { ERROR_TYPE_MAP } from './error';
import { URL_CHANGE, DESTROY } from './events';
/**
 * @typedef { {
 *   duration: number,
 *   currentTime: number,
 *   muted: boolean,
 *   defaultMuted: boolean,
 *   volume: number,
 *   playbackRate: number,
 *   defaultPlaybackRate: number,
 *   autoplay: boolean,
 *   readonly paused: boolean,
 *   readonly ended: boolean,
 *   readonly networkState: number,
 *   readonly readyState: number,
 *   readonly seeking: boolean,
 *   src: any,
 *   play: Function,
 *   pause: Function,
 * } } IVideoProxy
 */

var VIDEO_EVENTS = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata', 'loadstart', 'emptied', 'ratechange', 'progress', 'stalled', 'suspend', 'abort'];

function emitEvents(eventKey, e) {
  if (!this || !this.emit) {
    return;
  }

  if (eventKey === 'error') {
    this.errorHandler(eventKey);
  } else {
    this.emit(eventKey, e);
  }
}

function getHandler(eventName, player) {
  var funName = "on".concat(eventName.charAt(0).toUpperCase()).concat(eventName.slice(1));

  if (player[funName] && typeof player[funName] === 'function') {
    player.on(eventName, player[funName]);
  }

  return function (e) {
    var eventKey = eventName;
    e.player = player;
    e.eventName = eventName;

    if (eventKey === 'timeupdate') {
      player._currentTime = player.video && player.video.currentTime;
    }

    if (eventName === 'durationchange') {
      player._duration = player.video.duration;
    } // 执行video相关事件中间件能力


    if (player.videoEventMiddleware[eventName]) {
      var callback = emitEvents.bind(player);

      try {
        player.videoEventMiddleware[eventName].call(player, e, callback);
      } catch (e) {
        emitEvents.call(player, eventKey, e);
        throw e;
      }
    } else {
      emitEvents.call(player, eventKey, e);
    }
  };
}

var VideoProxy = /*#__PURE__*/function (_EventEmitter) {
  _inherits(VideoProxy, _EventEmitter);

  var _super = _createSuper(VideoProxy);

  /**
   * @param {any} options
   */
  function VideoProxy(options) {
    var _this;

    _classCallCheck(this, VideoProxy);

    _this = _super.call(this, options);
    /**
     * @private
     */

    _this._currentTime = 0;
    /**
     * @private
     */

    _this._duration = 0;
    /**
     * @description 初始化时添加在video上的属性集合
     * @type { {[propName: string]: any; } }
     */

    _this.videoConfig = Object.assign({}, {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      'x5-playsinline': options.playsinline,
      'webkit-playsinline': options.playsinline,
      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options.x5VideoPlayerFullscreen,
      'x5-video-orientation': options['x5-video-orientation'] || options.x5VideoOrientation,
      airplay: options.airplay,
      'webkit-airplay': options.airplay,
      tabindex: 2,
      mediaType: options.mediaType || 'video'
    }, options.videoConfig, options.videoAttributes);
    /**
     * @description Compatible with WeChat webview
     * "x5-playsinline' and 'x5-video-player-type' only one needs to exist
     * @doc https://x5.tencent.com/docs/video.html
     */

    var playerType = options['x5-video-player-type'] || options.x5VideoPlayerType;

    if (Sniffer.isWeixin && Sniffer.os.isAndroid && playerType) {
      _this.videoConfig['x5-video-player-type'] = playerType;
      delete _this.videoConfig.playsinline;
      delete _this.videoConfig['webkit-playsinline'];
      delete _this.videoConfig['x5-playsinline'];
    }

    if (options.loop) {
      _this.videoConfig.loop = 'loop';
    }
    /**
     * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null }
     */


    _this.video = Util.createDom(_this.videoConfig.mediaType, '', _this.videoConfig, ''); // if (options.defaultPlaybackRate) {
    //   this.video.defaultPlaybackRate = this.video.playbackRate = options.defaultPlaybackRate
    // }

    if (options.autoplayMuted) {
      _this.video.muted = true;
    }

    if (options.autoplay) {
      _this.video.autoplay = true;
    }
    /**
     * @private
     */


    _this._interval = {};
    /**
     * @readonly
     */

    _this.videoEventMiddleware = {};

    _this.attachVideoEvents();

    return _this;
  }
  /**
   * @description set middleware
   * @param { {[propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
   */


  _createClass(VideoProxy, [{
    key: "setEventsMiddleware",
    value: function setEventsMiddleware(middlewares) {
      var _this2 = this;

      Object.keys(middlewares).map(function (key) {
        _this2.videoEventMiddleware[key] = middlewares[key];
      });
    }
    /**
     * @description remove middleware
     * @param { { [propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
     */

  }, {
    key: "removeEventsMiddleware",
    value: function removeEventsMiddleware(middlewares) {
      var _this3 = this;

      Object.keys(middlewares).map(function (key) {
        delete _this3.videoEventMiddleware[key];
      });
    }
    /**
     * Add media eventListener to the video object
     * @param { any } [video]
     */

  }, {
    key: "attachVideoEvents",
    value: function attachVideoEvents(video) {
      var _this4 = this;

      if (!this.evHandlers) {
        /**
         * @private
         */
        this._evHandlers = VIDEO_EVENTS.map(function (item) {
          return _defineProperty({}, item, getHandler(item, _this4));
        });
      }

      if (!video) {
        video = this.video;
      }

      this._evHandlers.map(function (item) {
        var eventKey = Object.keys(item)[0];
        video.addEventListener(eventKey, item[eventKey], false);
      });
    }
    /**
     * @description remove media eventListener from the video object
     * @param { any } [video]
     */

  }, {
    key: "detachVideoEvents",
    value: function detachVideoEvents(video) {
      if (!video) {
        video = this.video;
      }

      this._evHandlers.map(function (item) {
        var eventKey = Object.keys(item)[0];
        video.removeEventListener(Object.keys(item)[0], item[eventKey], false);
      });
    }
    /**
     * @description Media Error handler
     * @param { string } eventName
     */

  }, {
    key: "errorHandler",
    value: function errorHandler(name) {
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.video && (this.video.error || error)) {
        var _e = this.video.error || error;

        var type = _e.code ? ERROR_TYPE_MAP[_e.code] : 'other';
        this.emit(name, new Errors(this, {
          errorType: type,
          errorCode: _e.code,
          errorMessage: _e.message || ''
        }));
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      if (this.video) {
        if (this.video.pause) {
          this.video.pause();
        }

        this.video.removeAttribute('src'); // empty source
        // this.video.load()
      }

      this._currentTime = 0;
      this._duration = 0;
      this.videoConfig = null;

      for (var k in this._interval) {
        clearInterval(this._interval[k]);
        this._interval[k] = null;
      }

      this.emit(DESTROY);
      this.detachVideoEvents();

      this._evHandlers.map(function (item) {
        var eventKey = Object.keys(item)[0];
        var funName = "on".concat(eventKey.charAt(0).toUpperCase()).concat(eventKey.slice(1));

        if (typeof _this5[funName] === 'function') {
          _this5.off(eventKey, _this5[funName]);
        }
      });

      this._evHandlers = null;
      this.video = null;
      this.videoEventMiddleware = {};
      this.removeAllListeners();
    }
    /**
     *
     * @returns {  Promise<void> | null }
     */

  }, {
    key: "play",
    value: function play() {
      return this.video ? this.video.play() : null;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.video && this.video.pause();
    }
    /**
     *
     * @param { string } type
     * @returns { boolean }
     */

  }, {
    key: "canPlayType",
    value: function canPlayType(type) {
      return this.video.canPlayType(type);
    }
    /**
     *
     * @param { any } [buffered]
     * @returns { Array<number> }
     */

  }, {
    key: "getBufferedRange",
    value: function getBufferedRange(buffered) {
      var range = [0, 0];

      if (!this.video) {
        return range;
      }

      if (!buffered) {
        buffered = this.video.buffered;
      }

      var currentTime = this.video.currentTime;

      if (buffered) {
        for (var i = 0, len = buffered.length; i < len; i++) {
          range[0] = buffered.start(i);
          range[1] = buffered.end(i);

          if (range[0] <= currentTime && currentTime <= range[1]) {
            break;
          }
        }
      }

      if (range[0] - currentTime <= 0 && currentTime - range[1] <= 0) {
        return range;
      } else {
        return [0, 0];
      }
    }
    /**
     * @type { boolean }
     * @description 设置/返回 自动播放属性
     */

  }, {
    key: "autoplay",
    get: function get() {
      return this.video.autoplay;
    }
    /**
     * @type { TimeRanges }
     * @description  返回当前缓冲的TimeRange对象集合
     */
    ,
    set: function set(isTrue) {
      this.video.autoplay = isTrue;
    }
  }, {
    key: "buffered",
    get: function get() {
      return this.video.buffered;
    }
    /**
     * @type { Array<{start: number, end: number}> }
     * @description  返回当前自定义的缓存列表
     */

  }, {
    key: "buffered2",
    get: function get() {
      return Util.getBuffered2(this.video.buffered);
    }
    /**
     * @type { {start: number, end: number} }
     */

  }, {
    key: "bufferedPoint",
    get: function get() {
      var _buffered = this.video.buffered;
      var ret = {
        start: 0,
        end: 0
      };

      if (!_buffered || _buffered.length === 0) {
        return ret;
      }

      for (var i = 0; i < _buffered.length; i++) {
        if ((_buffered.start(i) <= this.currentTime || _buffered.start(i) < 0.1) && _buffered.end(i) >= this.currentTime) {
          return {
            start: _buffered.start(i),
            end: _buffered.end(i)
          };
        }
      }

      return ret;
    }
    /**
     * @type { string}
     * @description 设置/返回是否跨域
     * */

  }, {
    key: "crossOrigin",
    get: function get() {
      return this.video.crossOrigin;
    },
    set: function set(isTrue) {
      this.video.crossOrigin = isTrue;
    }
    /**
     * @type { string }
     * @description 设置/返回视频播放地址
     * */

  }, {
    key: "currentSrc",
    get: function get() {
      return this.video.currentSrc;
    },
    set: function set(src) {
      this.video.currentSrc = src;
    }
    /**
     * @type { number }
     * @description 设置/返回视频当前播放时间
     * */

  }, {
    key: "currentTime",
    get: function get() {
      return this.video.currentTime !== undefined ? this.video.currentTime : this._currentTime;
    },
    set: function set(time) {
      this.video.currentTime = time;
    }
    /**
     * @type { boolean }
     * 设置/返回视频默认静音
     * */

  }, {
    key: "defaultMuted",
    get: function get() {
      return this.video.defaultMuted;
    },
    set: function set(isTrue) {
      this.video.defaultMuted = isTrue;
    }
    /**
     * @type { number }
     * @description 返回视频时长，单位：s
     * */

  }, {
    key: "duration",
    get: function get() {
      return this._duration;
    }
    /**
     * @type { boolean }
     * @description  回视频是否播放结束
     * */

  }, {
    key: "ended",
    get: function get() {
      return this.video.ended;
    }
    /**
     * @type { MediaError }
     * @description the player current error
     */

  }, {
    key: "error",
    get: function get() {
      return this.video.error;
    }
    /**
     * @type { string }
     * @description return error description text
     */

  }, {
    key: "errorNote",
    get: function get() {
      var err = this.video.error;

      if (!err) {
        return '';
      }

      var status = ['MEDIA_ERR_ABORTED', 'MEDIA_ERR_NETWORK', 'MEDIA_ERR_DECODE', 'MEDIA_ERR_SRC_NOT_SUPPORTED'];
      return status[err.code - 1];
    }
    /**
     * @type { boolean }
     * @description 否开启了循环播放
     */

  }, {
    key: "loop",
    get: function get() {
      return this.video.loop;
    },
    set: function set(isTrue) {
      this.video.loop = isTrue;
    }
    /**
     * @type { boolean }
     * @description 静音
     */

  }, {
    key: "muted",
    get: function get() {
      return this.video.muted;
    },
    set: function set(isTrue) {
      this.video.muted = isTrue;
    }
    /**
     * @type { number }
     * @description  返回视频的当前网络状态
     */

  }, {
    key: "networkState",
    get: function get() {
      return this.video.networkState;
    }
    /**
     * @type { boolean }
     * @description  回当前视频是否是暂停状态
     */

  }, {
    key: "paused",
    get: function get() {
      return this.video.paused;
    }
    /**
     * @type { number }
     * @description 返回/设置倍速
     */

  }, {
    key: "playbackRate",
    get: function get() {
      return this.video.playbackRate;
    },
    set: function set(rate) {
      this.video.defaultPlaybackRate = rate;
      this.video.playbackRate = rate;
    }
    /**
     * @type { TimeRanges }
     */

  }, {
    key: "played",
    get: function get() {
      return this.video.played;
    }
    /**
     * @type { boolean }
     */

  }, {
    key: "preload",
    get: function get() {
      return this.video.preload;
    },
    set: function set(isTrue) {
      this.video.preload = isTrue;
    }
    /**
     * @type { string }
     * @description 回视频的就绪状态
     */

  }, {
    key: "readyState",
    get: function get() {
      return this.video.readyState;
    }
    /**
     * @type { boolean }
     * @description 当前视频是否可以seek
     */

  }, {
    key: "seekable",
    get: function get() {
      return this.video.seekable;
    }
    /**
     * @type { boolean }
     * @description 当前视频是否处于seeking状态下
     */

  }, {
    key: "seeking",
    get: function get() {
      return this.video.seeking;
    }
    /**
     * @type { any }
     * @description 设置/返回当前视频的地址
     */

  }, {
    key: "src",
    get: function get() {
      return this.video.src;
    },
    set: function set(url) {
      this.emit(URL_CHANGE, url); // this.video.pause()

      this._currentTime = 0;
      this._duration = 0; // Some firefox versions firefox Cannot recognize currentSrc of type Blob

      if (/^blob/.test(this.video.currentSrc) || /^blob/.test(this.video.src)) {
        // has transmuxer core
        this.onWaiting();
        return;
      }

      this.video.src = url;
    }
    /**
     * @type { number }
     * @description 设置/返回视频的音量
     */

  }, {
    key: "volume",
    get: function get() {
      return this.video.volume;
    },
    set: function set(vol) {
      this.video.volume = vol;
    }
    /** ******************* 以下api只有申明作用,具体实现依赖EventEmitter ******************/

    /**
     *
     * @param { string } event
     * @param { any } [data]
     * @returns
     */

  }, {
    key: "emit",
    value: function emit(event, data) {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      (_get2 = _get(_getPrototypeOf(VideoProxy.prototype), "emit", this)).call.apply(_get2, [this, event, data].concat(args));
    }
    /**
     *
     * @param { string } event
     * @param { (data?: any) => any } callback
     * @returns
     */

  }, {
    key: "on",
    value: function on(event, callback) {
      var _get3;

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      (_get3 = _get(_getPrototypeOf(VideoProxy.prototype), "on", this)).call.apply(_get3, [this, event, callback].concat(args));
    }
    /**
     *
     * @param { string } event
     * @param { (data?: any) => any } callback
     * @returns
     */

  }, {
    key: "once",
    value: function once(event, callback) {
      var _get4;

      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      (_get4 = _get(_getPrototypeOf(VideoProxy.prototype), "once", this)).call.apply(_get4, [this, event, callback].concat(args));
    }
    /**
     *
     * @param { string } event
     * @param { (data?: any) => any } callback
     * @returns
     */

  }, {
    key: "off",
    value: function off(event, callback) {
      var _get5;

      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      (_get5 = _get(_getPrototypeOf(VideoProxy.prototype), "off", this)).call.apply(_get5, [this, event, callback].concat(args));
    }
  }, {
    key: "offAll",
    value: function offAll() {
      _get(_getPrototypeOf(VideoProxy.prototype), "removeAllListeners", this).call(this);
    }
  }]);

  return VideoProxy;
}(EventEmitter);

export default VideoProxy;