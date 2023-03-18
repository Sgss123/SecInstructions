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

import Plugin, { Events, Util, Sniffer, STATES } from '../../plugin';
import Touche from './touch';
var SeekTipIcon = "<svg width=\"20\" height=\"9\" viewBox=\"0 0 8 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path opacity=\".54\" d=\"M7.5 3.634a1 1 0 010 1.732l-6 3.464A1 1 0 010 7.964V1.036A1 1 0 011.5.17l6 3.464z\" fill=\"#fff\"/><path d=\"M12.5 3.634a1 1 0 010 1.732l-6 3.464A1 1 0 015 7.964V1.036A1 1 0 016.5.17l6 3.464z\" fill=\"#fff\"/></svg>"; // import BackSvg from './back.svg'

/**
 * @typedef {{
 *   index?: number,
 *   disableGesture?: boolean,
 *   gestureX?: boolean,
 *   gestureY?: boolean,
 *   gradient?: 'normal' | 'none' | 'top' | 'bottom',
 *   isTouchingSeek?: boolean,
 *   miniMoveStep?: number,
 *   miniYPer?: number,
 *   scopeL?: number,
 *   scopeR?: number,
 *   pressRate?: number,
 *   darkness?: boolean,
 *   maxDarkness?: number,
 *   disableActive?: boolean,
 *   disableTimeProgress?: boolean,
 *   hideControlsActive?: boolean,
 *   hideControlsEnd?: boolean,
 *   moveDuration?: number,
 *   closedbClick?: boolean,
 *   disablePress?: boolean,
 *   disableSeekIcon?: boolean,
 *   [propName: string]: any
 * }} IMobileConfig
 */

var ACTIONS = {
  AUTO: 'auto',
  SEEKING: 'seeking',
  PLAYBACK: 'playbackrate',
  LIGHT: ''
};

var MobilePlugin = /*#__PURE__*/function (_Plugin) {
  _inherits(MobilePlugin, _Plugin);

  var _super = _createSuper(MobilePlugin);

  function MobilePlugin(options) {
    var _this;

    _classCallCheck(this, MobilePlugin);

    _this = _super.call(this, options);
    /**
     * @readonly
     */

    _defineProperty(_assertThisInitialized(_this), "onTouchStart", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          player = _assertThisInitialize.player,
          config = _assertThisInitialize.config,
          pos = _assertThisInitialize.pos,
          playerConfig = _assertThisInitialize.playerConfig;

      var touche = _this.getTouche(e);

      if (touche && !config.disableGesture && _this.duration > 0 && !player.ended) {
        pos.isStart = true; // e.cancelable && e.preventDefault()

        Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler();
        _this.find('.xg-dur').innerHTML = Util.format(_this.duration); // pos.volume = player.volume * 100

        var rect = _this.root.getBoundingClientRect();

        if (player.rotateDeg === 90) {
          pos.top = rect.left;
          pos.left = rect.top;
          pos.width = rect.height;
          pos.height = rect.width;
        } else {
          pos.top = rect.top;
          pos.left = rect.left;
          pos.width = rect.width;
          pos.height = rect.height;
        }

        pos.x = parseInt(touche.pageX - pos.left, 10);
        pos.y = parseInt(touche.pageY - pos.top, 10);
        pos.scopeL = config.scopeL * pos.width;
        pos.scopeR = (1 - config.scopeR) * pos.width;
        pos.scopeM1 = pos.width * (1 - config.scopeM) / 2;
        pos.scopeM2 = pos.width - pos.scopeM1;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchMove", function (e) {
      var touche = _this.getTouche(e);

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          pos = _assertThisInitialize2.pos,
          config = _assertThisInitialize2.config,
          player = _assertThisInitialize2.player;

      if (!touche || config.disableGesture || !_this.duration || !pos.isStart) {
        return;
      }

      var miniMoveStep = config.miniMoveStep,
          hideControlsActive = config.hideControlsActive;
      var x = parseInt(touche.pageX - pos.left, 10);
      var y = parseInt(touche.pageY - pos.top, 10);

      if (Math.abs(x - pos.x) > miniMoveStep || Math.abs(y - pos.y) > miniMoveStep) {
        var diffx = x - pos.x;
        var diffy = y - pos.y;
        var scope = pos.scope;

        if (scope === -1) {
          scope = _this.checkScope(x, y, diffx, diffy, pos); // 手势为快进快退记录起始操作时间

          if (scope === 0) {
            !hideControlsActive ? player.focus({
              autoHide: false
            }) : player.blur();
            !pos.time && (pos.time = parseInt(player.currentTime * 1000, 10) + _this.timeOffset * 1000);
          }

          pos.scope = scope;
        }

        if (scope === -1 || scope > 0 && !config.gestureY || scope === 0 && !config.gestureX) {
          return;
        }

        e.cancelable && e.preventDefault();

        _this.executeMove(diffx, diffy, scope, pos.width, pos.height);

        pos.x = x;
        pos.y = y;
      } else {// console.log('touche.pageX - pos.x', touche.pageX - pos.x)
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onTouchEnd", function (e) {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          player = _assertThisInitialize3.player,
          pos = _assertThisInitialize3.pos,
          playerConfig = _assertThisInitialize3.playerConfig;

      if (!pos.isStart) {
        return;
      }

      if (pos.scope > -1) {
        e.cancelable && e.preventDefault();
      }

      _this.endLastMove(pos.scope);

      setTimeout(function () {
        player.getPlugin('progress') && player.getPlugin('progress').resetSeekState();
      }, 10);
      pos.scope = -1;

      _this.resetPos();

      Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler();

      _this.changeAction(ACTIONS.AUTO);
    });

    _defineProperty(_assertThisInitialized(_this), "onRootTouchMove", function (e) {
      if (_this.config.disableGesture || !_this.config.gestureX) {
        return;
      }

      if (_this.checkIsRootTarget(e)) {
        e.stopPropagation();

        if (!_this.pos.isStart) {
          _this.onTouchStart(e);
        } else {
          _this.onTouchMove(e);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRootTouchEnd", function (e) {
      if (_this.pos.isStart && _this.checkIsRootTarget(e)) {
        e.stopPropagation();

        _this.onTouchEnd(e);

        var controls = _this.player.controls;
        controls && controls.recoverAutoHide();
      }
    });

    _this.pos = {
      isStart: false,
      x: 0,
      y: 0,
      time: 0,
      volume: 0,
      rate: 1,
      light: 0,
      width: 0,
      height: 0,
      scopeL: 0,
      scopeR: 0,
      scopeM1: 0,
      scopeM2: 0,
      scope: -1
    };
    /**
     * @private
     */

    _this.timer = null;
    return _this;
  }

  _createClass(MobilePlugin, [{
    key: "duration",
    get: function get() {
      return this.playerConfig.customDuration || this.player.duration;
    }
  }, {
    key: "timeOffset",
    get: function get() {
      return this.playerConfig.timeOffset || 0;
    }
    /**
     * @private
     * @returns {[propName: string]: any}
     */

  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        seekTipIcon: {
          icon: SeekTipIcon,
          class: 'xg-seek-pre'
        }
      };
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      var playerConfig = this.playerConfig,
          config = this.config,
          player = this.player;

      if (playerConfig.closeVideoDblclick === true) {
        config.closedbClick = true;
      }

      this.resetPos();

      if (!Util.isUndefined(playerConfig.disableGesture)) {
        config.disableGesture = !!playerConfig.disableGesture;
      }

      this.appendChild('.xg-seek-icon', this.icons.seekTipIcon);
      this.xgMask = Util.createDom('xg-mask', '', {}, 'xgmask');
      player.root.appendChild(this.xgMask);
      this.initCustomStyle();
      this.registerThumbnail();
      var eventType = Sniffer.device !== 'mobile' ? 'mouse' : 'touch';
      this.touch = new Touche(this.root, {
        eventType: eventType
      });
      this.root.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      });
      player.root.addEventListener('touchmove', this.onRootTouchMove, true);
      player.root.addEventListener('touchend', this.onRootTouchEnd, true);
      this.on(Events.DURATION_CHANGE, function () {
        var player = _this2.player,
            config = _this2.config;

        if (player.duration * 1000 < config.moveDuration) {
          config.moveDuration = player.duration * 1000;
        }
      });
      this.on([Events.CANPLAY, Events.ENDED], function () {
        var _this2$pos = _this2.pos,
            time = _this2$pos.time,
            isStart = _this2$pos.isStart;

        if (!isStart && time > 0) {
          _this2.pos.time = 0;
        }
      });
      var eventsMap = {
        touchstart: 'onTouchStart',
        touchmove: 'onTouchMove',
        touchend: 'onTouchEnd',
        press: 'onPress',
        pressend: 'onPressEnd',
        click: 'onClick',
        doubleclick: 'onDbClick'
      };
      Object.keys(eventsMap).map(function (key) {
        _this2.touch.on(key, function (e) {
          _this2[eventsMap[key]](e);
        });
      });

      if (!config.disableActive) {
        // Add progress bar drag event callback
        var progressPlugin = player.plugins.progress;

        if (progressPlugin) {
          progressPlugin.addCallBack('dragmove', function (data) {
            _this2.activeSeekNote(data.currentTime, data.forward);
          });
          progressPlugin.addCallBack('dragend', function () {
            _this2.changeAction(ACTIONS.AUTO);
          });
        }
      }
    }
  }, {
    key: "registerThumbnail",
    value: function registerThumbnail() {
      var player = this.player;
      var thumbnail = player.plugins.thumbnail;

      if (thumbnail && thumbnail.usable) {
        this.thumbnail = thumbnail.createThumbnail(null, 'mobile-thumbnail');
        var timePreview = this.find('.time-preview');
        timePreview.insertBefore(this.thumbnail, timePreview.children[0]);
      }
    }
  }, {
    key: "initCustomStyle",
    value: function initCustomStyle() {
      var _ref = this.playerConfig || {},
          commonStyle = _ref.commonStyle;

      var playedColor = commonStyle.playedColor,
          progressColor = commonStyle.progressColor;

      if (playedColor) {
        this.find('.xg-curbar').style.backgroundColor = playedColor;
        this.find('.xg-cur').style.color = playedColor;
      }

      if (progressColor) {
        this.find('.xg-bar').style.backgroundColor = progressColor;
        this.find('.time-preview').style.color = progressColor;
      }

      this.config.disableTimeProgress && Util.addClass(this.find('.xg-timebar'), 'hide');
    }
  }, {
    key: "resetPos",
    value: function resetPos() {
      var _this3 = this;

      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.pos) {
        this.pos.isStart = false;
        this.pos.scope = -1;
        ['x', 'y', 'width', 'height', 'scopeL', 'scopeR', 'scopeM1', 'scopeM2'].map(function (item) {
          _this3.pos[item] = 0;
        });
      } else {
        this.pos = {
          isStart: false,
          x: 0,
          y: 0,
          volume: 0,
          rate: 1,
          light: 0,
          width: 0,
          height: 0,
          scopeL: 0,
          scopeR: 0,
          scopeM1: 0,
          scopeM2: 0,
          scope: -1,
          time: 0
        };
      }
    }
  }, {
    key: "changeAction",
    value: function changeAction(action) {
      var player = this.player,
          root = this.root;
      root.setAttribute('data-xg-action', action);
      var startPlugin = player.plugins.start;
      startPlugin && startPlugin.recover();
    }
  }, {
    key: "getTouche",
    value: function getTouche(e) {
      var rotateDeg = this.player.rotateDeg;
      var touche = e.touches && e.touches.length > 0 ? e.touches[e.touches.length - 1] : e; // if (touches && touches.length > 0) {
      //   const touche = touches[touches.length - 1]
      //   if (rotateDeg === 0) {
      //     return {
      //       pageX: touche.pageX,
      //       pageY: touche.pageY
      //     }
      //   } else {
      //     return {
      //       pageX: touche.pageY,
      //       pageY: touche.pageX
      //     }
      //   }
      // } else {
      // }

      return rotateDeg === 0 ? {
        pageX: touche.pageX,
        pageY: touche.pageY
      } : {
        pageX: touche.pageX,
        pageY: touche.pageY
      };
    }
    /**
     * 校验具体的操作范围
     * @param { number } x 方向位移
     * @param { number } y 方向位移
     * @param { number } diffx 方向位移差
     * @param { number } diffy 方向位移差
     * @param { any } pos 当前操作区域位置信息 包含{width, height}
     * @return { number } scope 区域 0=>中间x方向滑动  1=>左侧上下滑动 2=>右侧上下滑动
     */

  }, {
    key: "checkScope",
    value: function checkScope(x, y, diffx, diffy, pos) {
      var width = pos.width;
      var scope = -1;

      if (x < 0 || x > width) {
        return scope;
      }

      var mold = diffy === 0 ? Math.abs(diffx) : Math.abs(diffx / diffy);

      if (Math.abs(diffx) > 0 && mold >= 1.73 && x > pos.scopeM1 && x < pos.scopeM2) {
        scope = 0;
      } else if (Math.abs(diffx) === 0 || mold <= 0.57) {
        scope = x < pos.scopeL ? 1 : x > pos.scopeR ? 2 : 3;
      }

      return scope;
    }
    /**
     * 根据位移和操作类型进行对应处理
     * @param {number} diffx x方向位移差
     * @param {number} diffy y方向位移差
     * @param {number} scope scope 区域 0=>中间x方向滑动  1=>左侧上下滑动 2=>右侧上下滑动
     * @param {number} width 总体宽度
     * @param {number} height 总高度
     */

  }, {
    key: "executeMove",
    value: function executeMove(diffx, diffy, scope, width, height) {
      switch (scope) {
        case 0:
          this.updateTime(diffx / width * this.config.scopeM);
          break;

        case 1:
          this.updateBrightness(diffy / height);
          break;

        case 2:
          // ios系统不支持音量调节
          if (!Sniffer.os.isIos) {
            this.updateVolume(diffy / height);
          }

          break;

        default:
      }
    }
    /**
     * 结束手势操作
     * @param {number} scope 当前手势类型 区域 0=>中间x方向滑动  1=>左侧上下滑动 2=>右侧上下滑动
     * @param {number} lastScope 上一次手势类型
     */

  }, {
    key: "endLastMove",
    value: function endLastMove(lastScope) {
      var _this4 = this;

      var pos = this.pos,
          player = this.player,
          config = this.config;
      var time = (pos.time - this.timeOffset) / 1000;

      switch (lastScope) {
        case 0:
          player.seek(Number(time).toFixed(1));
          config.hideControlsEnd ? player.blur() : player.focus();
          this.timer = setTimeout(function () {
            _this4.pos.time = 0;
          }, 500);
          break;

        case 1:
        case 2:
        default:
      }

      this.changeAction(ACTIONS.AUTO);
    }
  }, {
    key: "checkIsRootTarget",
    value: function checkIsRootTarget(e) {
      var plugins = this.player.plugins || {};

      if (plugins.progress && plugins.progress.root.contains(e.target)) {
        return false;
      }

      return plugins.start && plugins.start.root.contains(e.target) || plugins.controls && plugins.controls.root.contains(e.target);
    }
  }, {
    key: "sendUseAction",
    value: function sendUseAction(event) {
      var paused = this.player.paused;
      this.emitUserAction(event, 'switch_play_pause', {
        prop: 'paused',
        from: paused,
        to: !paused
      });
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var player = this.player,
          config = this.config,
          playerConfig = this.playerConfig;

      if (player.state < STATES.RUNNING) {
        if (!playerConfig.closeVideoClick) {
          this.sendUseAction(new Event('click'));
          player.play();
        }

        return;
      }

      if (!config.closedbClick || playerConfig.closeVideoClick) {
        player.isActive ? player.blur() : player.focus();
      } else if (!playerConfig.closeVideoClick) {
        if (player.isActive) {
          this.sendUseAction(new Event('click'));
          this.switchPlayPause();
        }

        player.focus();
      }
    }
  }, {
    key: "onDbClick",
    value: function onDbClick(e) {
      var config = this.config,
          player = this.player;

      if (!config.closedbClick && player.state >= STATES.RUNNING) {
        this.sendUseAction(new Event('dblclick'));
        this.switchPlayPause();
      }
    }
  }, {
    key: "onPress",
    value: function onPress(e) {
      var pos = this.pos,
          config = this.config,
          player = this.player;

      if (config.disablePress) {
        return;
      }

      pos.rate = this.player.playbackRate;
      this.emitUserAction('press', 'change_rate', {
        prop: 'playbackRate',
        from: player.playbackRate,
        to: config.pressRate
      });
      player.playbackRate = config.pressRate;
      this.changeAction(ACTIONS.PLAYBACK);
    }
  }, {
    key: "onPressEnd",
    value: function onPressEnd(e) {
      var pos = this.pos,
          config = this.config,
          player = this.player;

      if (config.disablePress) {
        return;
      }

      this.emitUserAction('pressend', 'change_rate', {
        prop: 'playbackRate',
        from: player.playbackRate,
        to: pos.rate
      });
      player.playbackRate = pos.rate;
      pos.rate = 1;
      this.changeAction(ACTIONS.AUTO);
    }
  }, {
    key: "updateTime",
    value: function updateTime(percent) {
      var player = this.player,
          config = this.config;
      var duration = this.player.duration;
      percent = Number(percent.toFixed(4));
      var time = parseInt(percent * config.moveDuration, 10) + this.timeOffset;
      time += this.pos.time;
      time = time < 0 ? 0 : time > duration * 1000 ? duration * 1000 - 200 : time;
      player.getPlugin('time') && player.getPlugin('time').updateTime(time / 1000);
      player.getPlugin('progress') && player.getPlugin('progress').updatePercent(time / 1000 / this.duration, true);
      this.activeSeekNote(time / 1000, percent > 0); // 在滑动的同时实时seek

      if (config.isTouchingSeek) {
        // player.currentTime = time / 1000
        player.seek(Number((time - this.timeOffset) / 1000).toFixed(1));
      }

      this.pos.time = time;
    }
  }, {
    key: "updateVolume",
    value: function updateVolume(percent) {
      if (this.player.rotateDeg) {
        percent = -percent;
      }

      var player = this.player,
          pos = this.pos;
      percent = parseInt(percent * 100, 10);
      pos.volume += percent;

      if (Math.abs(pos.volume) < 10) {
        return;
      }

      var volume = parseInt(player.volume * 10, 10) - parseInt(pos.volume / 10, 10);
      volume = volume > 10 ? 10 : volume < 1 ? 0 : volume;
      player.volume = volume / 10;
      pos.volume = 0;
    }
  }, {
    key: "updateBrightness",
    value: function updateBrightness(percent) {
      if (this.player.rotateDeg) {
        percent = -percent;
      }

      var pos = this.pos,
          config = this.config,
          xgMask = this.xgMask;
      var light = pos.light + 0.8 * percent;
      light = light > config.maxDarkness ? config.maxDarkness : light < 0 ? 0 : light;

      if (xgMask) {
        xgMask.style.backgroundColor = "rgba(0,0,0,".concat(light, ")");
      }

      pos.light = light;
    }
  }, {
    key: "activeSeekNote",
    value: function activeSeekNote(time) {
      var isForward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var player = this.player,
          config = this.config;
      var isLive = !(this.duration !== Infinity && this.duration > 0);

      if (!time || typeof time !== 'number' || isLive || config.disableActive) {
        return;
      }

      if (time < 0) {
        time = 0;
      } else if (time > player.duration) {
        time = player.duration - 0.2;
      }

      this.changeAction(ACTIONS.SEEKING);
      var startPlugin = player.plugins.start;
      startPlugin && startPlugin.focusHide();
      this.find('.xg-dur').innerHTML = Util.format(this.duration);
      this.find('.xg-cur').innerHTML = Util.format(time);
      this.find('.xg-curbar').style.width = "".concat(time / this.duration * 100, "%");

      if (isForward) {
        Util.removeClass(this.find('.xg-seek-show'), 'xg-back');
      } else {
        Util.addClass(this.find('.xg-seek-show'), 'xg-back');
      }

      this.updateThumbnails(time); // const {thumbnail} = player.plugins
      // this.thumbnailPlugin && thumbnail.update(time)
    }
  }, {
    key: "updateThumbnails",
    value: function updateThumbnails(time) {
      var player = this.player;
      var thumbnail = player.plugins.thumbnail;

      if (thumbnail && thumbnail.usable) {
        this.thumbnail && thumbnail.update(this.thumbnail, time, 160, 90); // this.videothumbnail && thumbnail.update(this.videothumbnail, time, rect.width, rect.height)
      }
    }
  }, {
    key: "switchPlayPause",
    value: function switchPlayPause() {
      var player = this.player;

      if (!player.state < STATES.ATTACHED) {
        return false;
      } else if (!player.ended) {
        if (player.paused) {
          player.play();
        } else {
          player.pause();
        }
      }
    } // 动态禁用手势

  }, {
    key: "disableGesture",
    value: function disableGesture() {
      this.config.disableGesture = false;
    } // 动态启用手势

  }, {
    key: "enableGesture",
    value: function enableGesture() {
      this.config.disableGesture = true;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var player = this.player;
      this.timer && clearTimeout(this.timer);
      this.thumbnail = null;
      player.root.removeChild(this.xgMask);
      this.xgMask = null;
      this.touch && this.touch.destroy();
      this.touch = null;
      player.root.removeEventListener('touchmove', this.onRootTouchMove, true);
      player.root.removeEventListener('touchend', this.onRootTouchEnd, true);
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.config.gradient !== 'normal' ? "gradient ".concat(this.config.gradient) : 'gradient';
      return "\n     <xg-trigger class=\"trigger\">\n     <div class=\"".concat(className, "\"></div>\n        <div class=\"time-preview\">\n            <div class=\"xg-seek-show ").concat(this.config.disableSeekIcon ? ' hide-seek-icon' : '', "\">\n              <i class=\"xg-seek-icon\"></i>\n              <span class=\"xg-cur\">00:00</span>\n              <span>/</span>\n              <span class=\"xg-dur\">00:00</span>\n            </div>\n              <div class=\"xg-bar xg-timebar\">\n                <div class=\"xg-curbar\"></div>\n              </div>\n        </div>\n        <div class=\"xg-playbackrate xg-top-note\">\n            <span><i>").concat(this.config.pressRate, "X</i>\u5FEB\u8FDB\u4E2D</span>\n        </div>\n     </xg-trigger>\n    ");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'mobile';
    }
    /**
     * @type IMobileConfig & { [propName: string]: any}
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        index: 0,
        disableGesture: false,
        // Whether to disable gestures
        gestureX: true,
        // Whether to enable horizontal gestures
        gestureY: true,
        // Whether to enable vertical gestures
        gradient: 'normal',
        // Gradient shadow, 'none'/'top'/'bottom'
        isTouchingSeek: false,
        // Whether to update currentTime at the same time as touchMove
        miniMoveStep: 5,
        // Minimum moving distance, used for move throttling
        miniYPer: 5,
        // Percentage of minimum displacement in y direction
        scopeL: 0.25,
        // Gesture range on the left
        scopeR: 0.25,
        // Gesture range on the right
        scopeM: 0.9,
        // Middle gesture range
        pressRate: 2,
        // playbackRate when long press
        darkness: true,
        // Whether to enable the dimming function on the right
        maxDarkness: 0.8,
        // Maximum darkness，maximum transparency of the mask
        disableActive: false,
        // Whether to disable the time prompt
        disableTimeProgress: false,
        // Whether to disable the time progress bar
        hideControlsActive: false,
        // Whether to hide the control bar when dragging by gesture
        hideControlsEnd: false,
        // Whether to hide the control bar when the gesture ended
        moveDuration: 60 * 6 * 1000,
        // The duration corresponding to the dragging width of the player
        closedbClick: false,
        // Whether to turn off the double tap gesture
        disablePress: true,
        // Whether to turn off the long press gesture
        disableSeekIcon: false // Disable seek prompt

      };
    }
  }]);

  return MobilePlugin;
}(Plugin);

export default MobilePlugin;