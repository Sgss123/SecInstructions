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

import Plugin, { Events, Util, POSITIONS, Sniffer, STATES } from '../../plugin';
import InnerList from './innerList';
/**
 * @typedef {{
 *   position?:string,
 *   disable?: boolean,
 *   isDragingSeek?: boolean, // 是否在拖拽的过程中更新currentTime
 *   closeMoveSeek?: boolean, // 是否关闭滑块seek能力
 *   isPauseMoving?: boolean, // 是否在move的时候暂停视频内容
 *   isCloseClickSeek?: boolean, // 是否关闭点击进度条的时候seek
 *   fragments?: Array<{percent: number}>,
 *   miniMoveStep?: number,
 *   miniStartStep?: number,
 *   onMoveStart?: () => any, // 手势开始移动回调,
 *   onMoveEnd?: () => any, // 手势移动结束回调
 *   [propName: string]: any
 * }} IProgressConfig
 */

/**
 * 进度条组件
 */

var Progress = /*#__PURE__*/function (_Plugin) {
  _inherits(Progress, _Plugin);

  var _super = _createSuper(Progress);

  function Progress(args) {
    var _this;

    _classCallCheck(this, Progress);

    _this = _super.call(this, args);
    /**
     * @readonly
     */

    _defineProperty(_assertThisInitialized(_this), "onMoveOnly", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          pos = _assertThisInitialize.pos,
          config = _assertThisInitialize.config,
          player = _assertThisInitialize.player;

      Util.event(e);

      var _ePos = Util.getEventPos(e, player.zoom);

      var x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX;

      if (pos.moving && Math.abs(pos.x - x) < config.miniMoveStep) {
        return;
      }

      pos.moving = true;
      pos.x = x;

      var ret = _this.computeTime(e);

      _this.triggerCallbacks('dragmove', ret);
    });

    _defineProperty(_assertThisInitialized(_this), "onBodyClick", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseDown", function (e) {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          player = _assertThisInitialize2.player,
          pos = _assertThisInitialize2.pos,
          config = _assertThisInitialize2.config,
          playerConfig = _assertThisInitialize2.playerConfig;

      var _ePos = Util.getEventPos(e, player.zoom);

      var x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX;

      if (player.isMini || config.closeMoveSeek || !playerConfig.allowSeekAfterEnded && player.ended) {
        return;
      }

      e.stopPropagation();
      e.preventDefault();

      _this.focus();

      Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler();
      Util.checkIsFunction(config.onMoveStart) && config.onMoveStart();
      Util.event(e);
      pos.x = x;
      pos.isDown = true;
      pos.moving = false; // 交互开始 禁止控制栏的自动隐藏功能

      player.focus({
        autoHide: false
      });
      _this.isProgressMoving = true;
      Util.addClass(_this.progressBtn, 'active');

      var ret = _this.computeTime(e);

      _this._state.time = ret.currentTime;

      _this.updateWidth(ret.currentTime, ret.percent, 0);

      if (_this.isMobile) {
        _this.bind('touchmove', _this.onMouseMove);

        _this.bind('touchend', _this.onMouseUp);
      } else {
        _this.unbind('mousemove', _this.onMoveOnly);

        document.addEventListener('mousemove', _this.onMouseMove, false);
        document.addEventListener('mouseup', _this.onMouseUp, false); // 避免触发videoClick 暂停/播放切换

        player.root.addEventListener('click', _this.onBodyClick, false); // this.bind('mouseup', this.onMouseUp, false)
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (e) {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          player = _assertThisInitialize3.player,
          config = _assertThisInitialize3.config,
          pos = _assertThisInitialize3.pos,
          playerConfig = _assertThisInitialize3.playerConfig,
          _state = _assertThisInitialize3._state;

      e.stopPropagation();
      e.preventDefault();
      Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler();
      Util.checkIsFunction(config.onMoveEnd) && config.onMoveEnd();
      Util.event(e);
      Util.removeClass(_this.progressBtn, 'active');

      var ret = _this.computeTime(e);

      if (pos.moving) {
        _this.updateWidth(ret.currentTime, ret.percent, 2);

        _this.triggerCallbacks('dragend', ret);
      } else {
        // this.updateWidth(ret.currentTime, ret.percent, 2)
        _this.triggerCallbacks('click', ret);
      }

      pos.moving = false;
      pos.isDown = false;
      pos.x = 0;
      pos.y = 0;
      _state.time = 0;

      if (_this.isMobile) {
        _this.unbind('touchmove', _this.onMouseMove);

        _this.unbind('touchend', _this.onMouseUp); // 交互结束 恢复控制栏的隐藏流程


        _this.blur();
      } else {
        document.removeEventListener('mousemove', _this.onMouseMove, false);
        document.removeEventListener('mouseup', _this.onMouseUp, false);
        player.root.removeEventListener('click', _this.onBodyClick, false);

        if (!pos.isEnter) {
          _this.onMouseLeave(e);
        } else {
          !playerConfig.isMobileSimulateMode && _this.bind('mousemove', _this.onMoveOnly);
        }
      } // 延迟复位，状态复位要在dom相关时间回调执行之后


      Util.setTimeout(_assertThisInitialized(_this), function () {
        _this.resetSeekState();
      }, 10); // 交互结束 恢复控制栏的隐藏流程

      player.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (e) {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          pos = _assertThisInitialize4.pos,
          player = _assertThisInitialize4.player,
          config = _assertThisInitialize4.config,
          _state = _assertThisInitialize4._state;

      if (_this.isMobile) {
        e.stopPropagation();
        e.preventDefault();
      }

      Util.event(e);

      var _ePos = Util.getEventPos(e, player.zoom);

      var x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX;
      var diff = Math.abs(pos.x - x);

      if (pos.moving && diff < config.miniMoveStep || !pos.moving && diff < config.miniStartStep) {
        return;
      }

      pos.x = x;

      var ret = _this.computeTime(e);

      if (_state.time < ret.currentTime) {
        ret.forward = true;
      } else {
        ret.forward = false;
      }

      _state.time = ret.currentTime;

      if (pos.isDown && !pos.moving) {
        pos.moving = true;
        config.isPauseMoving && player.pause();

        _this.triggerCallbacks('dragstart', ret);
      }

      _this.updateWidth(ret.currentTime, ret.percent, 1);

      _this.triggerCallbacks('dragmove', ret);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var _assertThisInitialize5 = _assertThisInitialized(_this),
          player = _assertThisInitialize5.player,
          pos = _assertThisInitialize5.pos;

      if (pos.isDown || pos.isEnter || player.isMini || !player.config.allowSeekAfterEnded && player.ended) {
        return;
      }

      pos.isEnter = true;

      _this.bind('mousemove', _this.onMoveOnly);

      _this.bind('mouseleave', _this.onMouseLeave);

      _this.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      var _assertThisInitialize6 = _assertThisInitialized(_this),
          player = _assertThisInitialize6.player,
          pos = _assertThisInitialize6.pos;

      pos.isEnter = false;

      if (player.isMini) {
        return;
      }

      _this.unbind('mousemove', _this.onMoveOnly);

      if (pos.isDown) {
        _this.unbind('mouseleave', _this.onMouseLeave);

        return;
      }

      _this.blur();
    });

    _this.useable = false;
    /**
     * @readonly
     */

    _this.isProgressMoving = false;
    /**
     * @private
     */

    _this.__dragCallBacks = [];
    /**
     * @private
     */

    _this._state = {
      now: -1,
      direc: 0,
      time: 0
    };
    return _this;
  }

  _createClass(Progress, [{
    key: "duration",
    get: function get() {
      return this.playerConfig.customDuration || this.player.duration;
    }
  }, {
    key: "timeOffset",
    get: function get() {
      return this.playerConfig.timeOffset || 0;
    }
  }, {
    key: "changeState",
    value: function changeState() {
      var useable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.useable = useable;
    }
    /**
     * @description 创建内部进度条，并挂载到xg-outer上,
     *              并把一些对外API绑定在progress上供外部调用
     *
     */

  }, {
    key: "createInner",
    value: function createInner() {
      var _this2 = this;

      this.innerList = new InnerList({
        fragments: this.config.fragments,
        style: this.playerConfig.commonStyle || {}
      });
      this.outer.insertBefore(this.innerList.render(), this.outer.children[0]);
      ['findHightLight', 'unHightLight', 'setHightLight', 'findFragment'].map(function (item) {
        _this2[item] = _this2.innerList[item].bind(_this2.innerList);
      });
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this3 = this;

      if (this.config.disable || this.playerConfig.isLive) {
        return;
      }

      this.pos = {
        x: 0,
        // 水平方向位移
        y: 0,
        // 垂直方向位移
        moving: false,
        // 是否正在移动
        isDown: false,
        // 是否mouseDown
        isEnter: false // 是否触发了mouseEnter

      };
      this.outer = this.find('xg-outer');
      this.createInner();

      if (Sniffer.device === 'mobile') {
        this.config.isDragingSeek = false;
        this.isMobile = true;
      }

      this.progressBtn = this.find('.xgplayer-progress-btn');
      this.on(Events.TIME_UPDATE, function () {
        _this3.onTimeupdate();
      });
      this.on(Events.SEEKED, function () {
        _this3.onTimeupdate();

        _this3.onCacheUpdate();
      });
      this.on(Events.PROGRESS, function () {
        _this3.onCacheUpdate();
      });
      this.on(Events.ENDED, function () {
        _this3.onCacheUpdate();

        _this3._state.now = 0;
      });
      this.on(Events.EMPTIED, function () {
        _this3.onReset();
      });
      this.bindDomEvents();
      this.initCustomStyle();
    }
  }, {
    key: "initCustomStyle",
    value: function initCustomStyle() {
      var _ref = this.playerConfig || {},
          commonStyle = _ref.commonStyle;

      var sliderBtnStyle = commonStyle.sliderBtnStyle;
      var progressBtn = this.progressBtn;

      if (sliderBtnStyle) {
        if (typeof sliderBtnStyle === 'string') {
          progressBtn.style.boxShadow = sliderBtnStyle;
        } else if (_typeof(sliderBtnStyle) === 'object') {
          Object.keys(sliderBtnStyle).map(function (key) {
            progressBtn.style[key] = sliderBtnStyle[key];
          });
        }
      }
    }
    /**
     * 触发某一类回调监听
     * @param { string } type 类型 drag/dragend
     * @param { any} data 具体数据
     */

  }, {
    key: "triggerCallbacks",
    value: function triggerCallbacks(type, data) {
      if (this.__dragCallBacks.length > 0) {
        this.__dragCallBacks.map(function (item) {
          if (item && item.handler && item.type === type) {
            try {
              item.handler(data);
            } catch (error) {
              console.error("[XGPLAYER][triggerCallbacks] ".concat(item, " error"), error);
            }
          }
        });
      }
    }
    /**
     * 供外部插件添加回调
     * @param {string} type 类型 drag/dragend
     * @param {function} handle 回调函数句柄
     */

  }, {
    key: "addCallBack",
    value: function addCallBack(type, handle) {
      if (handle && typeof handle === 'function') {
        this.__dragCallBacks.push({
          type: type,
          handler: handle
        });
      }
    }
    /**
     * 供外部插件移除回调
     * @param {string} type 类型 drag/dragend
     * @param {Function} event 回调函数句柄
     */

  }, {
    key: "removeCallBack",
    value: function removeCallBack(type, event) {
      var __dragCallBacks = this.__dragCallBacks;

      var _index = -1;

      __dragCallBacks.map(function (item, index) {
        if (item && item.type === type && item.handler === event) {
          _index = index;
        }
      });

      if (_index > -1) {
        __dragCallBacks.splice(_index, 1);
      }
    }
  }, {
    key: "bindDomEvents",
    value: function bindDomEvents() {
      var _this$player = this.player,
          controls = _this$player.controls,
          config = _this$player.config;

      if (this.isMobile) {
        this.bind('touchstart', this.onMouseDown);

        if (controls) {
          controls.root && controls.root.addEventListener('touchmove', Util.stopPropagation);
          controls.center && controls.center.addEventListener('touchend', Util.stopPropagation);
        }
      } else {
        this.bind('mousedown', this.onMouseDown);
        !config.isMobileSimulateMode && this.bind('mouseenter', this.onMouseEnter);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.player.controls.pauseAutoHide();
      Util.addClass(this.root, 'active');
    }
  }, {
    key: "blur",
    value: function blur() {
      this.player.controls.recoverAutoHide();
      Util.removeClass(this.root, 'active');
    }
  }, {
    key: "updateWidth",
    value:
    /**
     * @description 根据currenTime和占用百分比更新进度条
     * @param {Number} currentTime 需要更新到的时间
     * @param {Number} percent 更新时间占比
     * @param {Int} type 触发类型 0-down 1-move 2-up
     */
    function updateWidth(currentTime, percent, type) {
      var config = this.config,
          player = this.player;

      if (config.isCloseClickSeek && type === 0) {
        return;
      }

      var realTime = currentTime > player.duration ? player.duration - 0.2 : Number(currentTime).toFixed(1); // currentTime = currentTime > player.duration ? player.duration - 0.2 : Number(currentTime).toFixed(1)

      this.updatePercent(percent);
      this.updateTime(currentTime);

      if (type === 1 && (!config.isDragingSeek || player.videoConfig.mediaType === 'audio')) {
        return;
      }

      this._state.now = realTime;
      this._state.direc = realTime > player.currentTime ? 0 : 1;
      player.seek(realTime);
    }
  }, {
    key: "computeTime",
    value: function computeTime(e) {
      var player = this.player;

      var _this$root$getBoundin = this.root.getBoundingClientRect(),
          width = _this$root$getBoundin.width,
          height = _this$root$getBoundin.height,
          top = _this$root$getBoundin.top,
          left = _this$root$getBoundin.left;

      var _ePos = Util.getEventPos(e, player.zoom);

      var rWidth, rLeft, clientX;

      if (player.rotateDeg === 90) {
        rWidth = height;
        rLeft = top;
        clientX = _ePos.clientY;
      } else {
        rWidth = width;
        rLeft = left;
        clientX = _ePos.clientX;
      }

      var offset = clientX - rLeft;
      offset = offset > rWidth ? rWidth : offset < 0 ? 0 : offset;
      var percent = offset / rWidth;
      percent = percent < 0 ? 0 : percent > 1 ? 1 : percent;
      var currentTime = parseInt(percent * this.duration * 1000, 10) / 1000;
      return {
        percent: percent,
        currentTime: currentTime,
        offset: offset,
        width: rWidth,
        left: rLeft,
        e: e
      };
    }
    /**
     * @description 更新时间插件，在拖拽状态下要接管时间插件的更新状态
     *             本位置会和time插件交互
     * @param {number} time 根据拖拽距离计算出的时间
     */

  }, {
    key: "updateTime",
    value: function updateTime(time) {
      var player = this.player,
          duration = this.duration;

      if (time > duration) {
        time = duration;
      } else if (time < 0) {
        time = 0;
      }

      var timeIcon = player.plugins.time;

      if (timeIcon) {
        timeIcon.updateTime(time);
      }
    }
    /**
     * @description 复位正在拖拽状态 ，拖拽的时候要避免timeupdate更新
     */

  }, {
    key: "resetSeekState",
    value: function resetSeekState() {
      this.isProgressMoving = false;
      var timeIcon = this.player.plugins.time;
      timeIcon && timeIcon.resetActive();
    }
    /**
     * @description 拖拽过程中更新UI
     * @param {number} percent 小于0的小数
     *
     */

  }, {
    key: "updatePercent",
    value: function updatePercent(percent, notSeek) {
      this.isProgressMoving = true;

      if (this.config.disable) {
        return;
      }

      percent = percent > 1 ? 1 : percent < 0 ? 0 : percent;
      this.progressBtn.style.left = "".concat(percent * 100, "%");
      this.innerList.update({
        played: percent * this.duration
      }, this.duration);
      var miniprogress = this.player.plugins.miniprogress;
      miniprogress && miniprogress.update({
        played: percent * this.duration
      }, this.duration);
    }
    /**
     * @description 播放进度更新
     */

  }, {
    key: "onTimeupdate",
    value: function onTimeupdate() {
      var player = this.player,
          _state = this._state,
          duration = this.duration;

      if (player.isSeeking || this.isProgressMoving || player.state < STATES.RUNNING) {
        return;
      }

      if (_state.now > -1) {
        var abs = parseInt(_state.now * 1000, 10) - parseInt(player.currentTime * 1000, 10);

        if (_state.direc === 0 && abs > 300 || _state.direc === 1 && abs > -300) {
          return;
        } else {
          _state.now = -1;
        }
      }

      var time = this.timeOffset + player.currentTime;
      this.innerList.update({
        played: time
      }, duration);
      this.progressBtn.style.left = "".concat(time / duration * 100, "%");
      var miniprogress = this.player.plugins.miniprogress;
      miniprogress && miniprogress.update({
        played: time
      }, duration);
    }
    /**
     * @description 缓存进度更新
     */

  }, {
    key: "onCacheUpdate",
    value: function onCacheUpdate() {
      var player = this.player,
          duration = this.duration;
      var point = player.bufferedPoint;
      this.innerList.update({
        cached: point.end
      }, duration);
      var miniprogress = this.player.plugins.miniprogress;
      miniprogress && miniprogress.update({
        cached: point.end
      }, duration);
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.innerList.update({
        played: 0,
        cached: 0
      }, 0);
      var miniprogress = this.player.plugins.miniprogress;
      miniprogress && miniprogress.update({
        cached: 0,
        played: 0
      }, 0);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var player = this.player;
      var controls = player.controls;
      this.thumbnailPlugin = null;
      this.innerList.destroy();
      this.innerList = null;

      if (this.isMobile) {
        this.unbind('touchstart', this.onMouseDown);
        this.unbind('touchmove', this.onMouseMove);
        this.unbind('touchend', this.onMouseUp);

        if (controls) {
          controls.root && controls.root.removeEventListener('touchmove', Util.stopPropagation);
          controls.center && controls.center.removeEventListener('touchend', Util.stopPropagation);
        }
      } else {
        this.unbind('mousedown', this.onMouseDown);
        this.unbind('mouseenter', this.onMouseEnter);
        this.unbind('mousemove', this.onMoveOnly);
        document.removeEventListener('mousemove', this.onMouseMove, false);
        document.removeEventListener('mouseup', this.onMouseUp, false);
        player.root.removeEventListener('click', this.onBodyClick, false);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable || this.playerConfig.isLive) {
        return;
      }

      var controlsMode = this.player.controls ? this.player.controls.config.mode : '';
      var className = controlsMode === 'bottom' ? 'xgplayer-progress-bottom' : '';
      return "\n    <xg-progress class=\"xgplayer-progress ".concat(className, "\">\n      <xg-outer class=\"xgplayer-progress-outer\">\n        <xg-progress-btn class=\"xgplayer-progress-btn\"></xg-progress-btn>\n      </xg-outer>\n    </xg-progress>\n    ");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'progress';
    }
    /**
     * @type IProgressConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_CENTER,
        index: 0,
        disable: false,
        isDragingSeek: true,
        // 是否在拖拽的过程中更新currentTime
        closeMoveSeek: false,
        // 是否关闭滑块seek能力
        isPauseMoving: false,
        // 是否在move的时候暂停视频内容
        isCloseClickSeek: false,
        // 是否关闭点击进度条的时候seek
        fragments: [{
          percent: 1
        }],
        miniMoveStep: 5,
        miniStartStep: 2,
        onMoveStart: function onMoveStart() {},
        // 手势开始移动回调
        onMoveEnd: function onMoveEnd() {} // 手势移动结束回调

      };
    }
  }]);

  return Progress;
}(Plugin);

export default Progress;