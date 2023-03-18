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

import DanmuJs from 'danmu.js';
import Plugin, { Events, Util } from '../../plugin';
import DanmuPanel from './danmuPanel';
import DanmuIcon from './danmuIcon';
var MIN_INTERVAL = 300;
/**
 * @typedef {{
 *   comments?: Array<any>,
 *   area?: {
 *      start: number,
 *      end: number
 *   },
 *   closeDefaultBtn?: boolean,
 *   panel?: boolean,
 *   panelConfig?: {[propName: string]: any},
 *   switchConfig?: {[propName: string]: any},
 *   defaultOpen?: boolean,
 *   isLive?: boolean,
 *   channelSize?: number,
 *   fontSize?: number,
 *   opacity?: number,
 *   mouseControl?: boolean,
 *   mouseControlPause?: boolean,
 *   ext: {[propName: string]: any},
 *   style: {[propName: string]: any}
 * }} IDanmuConfig
 */

var Danmu = /*#__PURE__*/function (_Plugin) {
  _inherits(Danmu, _Plugin);

  var _super = _createSuper(Danmu);

  function Danmu(args) {
    var _this;

    _classCallCheck(this, Danmu);

    _this = _super.call(this, args);
    _this.danmujs = null;
    _this.danmuPanel = null;
    _this.isOpen = false;
    _this.seekCost = 0;
    /**
     * @readonly
     */

    _this.intervalId = 0;
    /**
     * @readonly
     */

    _this.isUseClose = false;
    return _this;
  }
  /**
   * @type { string }
   */


  _createClass(Danmu, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      if (this.playerConfig.isLive) {
        this.config.isLive = true;
      }

      this.initDanmu();
      this.registerExtIcons();
      this.once(Events.TIME_UPDATE, function () {
        _this2.config.defaultOpen && !_this2.isUseClose && _this2.start();
      });
      this.on(Events.PAUSE, function () {
        _this2.isOpen && _this2.danmujs && _this2.danmujs.pause();
      });
      this.on(Events.PLAY, function () {
        _this2.isOpen && _this2.danmujs && _this2.danmujs.play();
      });
      this.on(Events.SEEKING, function () {
        _this2.seekCost = window.performance.now();
        !_this2.config.isLive && _this2.danmujs && _this2.danmujs.stop();
      });
      this.on(Events.VIDEO_RESIZE, function () {
        console.log('danmu.js resize');

        _this2.resize();
      });
      this.on(Events.SEEKED, function () {
        if (!_this2.danmujs || !_this2.isOpen) {
          return;
        }

        if (_this2.intervalId) {
          Util.clearTimeout(_this2, _this2.intervalId);
          _this2.intervalId = null;
        }

        var now = window.performance.now();

        if (now - _this2.seekCost > MIN_INTERVAL) {
          _this2.danmujs.start();
        } else {
          _this2.intervalId = Util.setTimeout(_this2, function () {
            _this2.danmujs.start(); // clearTimeout(this.intervalId)


            _this2.intervalId = null;
          }, MIN_INTERVAL);
        }
      });
    }
  }, {
    key: "onPluginsReady",
    value: function onPluginsReady() {
      // Add click trigger event trigger, rely on pc plug-in
      var pcPlugin = this.player.plugins.pc;

      if (pcPlugin) {
        pcPlugin.onVideoDblClick && this.bind('dblclick', pcPlugin.onVideoDblClick);
        pcPlugin.onVideoClick && this.bind('click', pcPlugin.onVideoClick);
      }
    }
  }, {
    key: "initDanmu",
    value: function initDanmu() {
      var player = this.player,
          config = this.config;
      var _this$config = this.config,
          channelSize = _this$config.channelSize,
          fontSize = _this$config.fontSize,
          opacity = _this$config.opacity,
          mouseControl = _this$config.mouseControl,
          mouseControlPause = _this$config.mouseControlPause,
          area = _this$config.area,
          defaultOff = _this$config.defaultOff;
      var danmuConfig = {
        container: this.root,
        player: player.video,
        comments: this.config.comments,
        live: config.isLive,
        defaultOff: defaultOff,
        area: area,
        mouseControl: mouseControl,
        mouseControlPause: mouseControlPause
      };

      if (config.ext) {
        Object.keys(config.ext).map(function (key) {
          danmuConfig[key] = config.ext[key];
        });
      }

      var danmu = new DanmuJs(danmuConfig);
      this.danmujs = danmu;
      player.danmu = danmu;
      this.setFontSize(fontSize, channelSize);
      this.setArea(area);
      this.resize();
      opacity !== 1 && this.setOpacity(opacity);
    }
  }, {
    key: "registerExtIcons",
    value: function registerExtIcons() {
      var _this3 = this;

      var player = this.player,
          config = this.config;

      if (config.panel) {
        var panelOptions = {
          config: {
            onChangeset: function onChangeset(set) {
              _this3.changeSet(set);
            }
          }
        };
        this.danmuPanel = player.controls.registerPlugin(DanmuPanel, panelOptions, DanmuPanel.pluginName);
      }

      var switchConfig = config.switchConfig;

      if (!config.closeDefaultBtn) {
        var buttonOptions = {
          config: {
            onSwitch: function onSwitch(event, isOpen) {
              _this3.onSwitch(event, isOpen);
            }
          }
        };
        Object.keys(switchConfig).map(function (key) {
          buttonOptions.config[key] = switchConfig[key];
        });
        this.danmuButton = player.controls.registerPlugin(DanmuIcon, buttonOptions, DanmuIcon.pluginName);
        this.config.defaultOpen && this.danmuButton.switchState(true);
      }
    }
  }, {
    key: "changeSet",
    value: function changeSet(set) {}
  }, {
    key: "onSwitch",
    value: function onSwitch(event, defaultOpen) {
      this.emitUserAction(event, 'switch_danmu', {
        prop: 'isOpen',
        from: !defaultOpen,
        to: defaultOpen
      });

      if (defaultOpen) {
        this.start();
      } else {
        this.stop();
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;

      if (this.isOpen || !this.danmujs) {
        return;
      }

      this.isUseClose = false;
      this.show();
      this.resize(); // 避免弹幕弹层还没展开 导致轨道计算异常

      Util.setTimeout(this, function () {
        _this4.danmujs.start();

        if (_this4.player.paused) {
          _this4.danmujs.pause();
        }

        _this4.isOpen = true;
      }, 0);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.isOpen || !this.danmujs) {
        return;
      } // 用户行为关闭弹幕


      this.isUseClose = true;
      this.danmujs.stop();
      this.config.isLive && this.clear();
      this.isOpen = false;
      this.hide();
    } // 清除当前弹幕池中的弹幕数据

  }, {
    key: "clear",
    value: function clear() {
      this.danmujs && this.danmujs.clear();
    }
  }, {
    key: "setCommentLike",
    value: function setCommentLike(id, data) {
      this.danmujs && this.danmujs.setCommentLike(id, data);
    } // 按照id改变某一个弹幕的持续显示时间

  }, {
    key: "setCommentDuration",
    value: function setCommentDuration(id, duration) {
      this.danmujs && this.danmujs.setCommentDuration(id, duration);
    } // 改变所有已加入队列弹幕的持续显示时间

  }, {
    key: "setAllDuration",
    value: function setAllDuration(mode, duration) {
      this.danmujs && this.danmujs.setAllDuration(mode, duration);
    } // 改变某一个弹幕的id

  }, {
    key: "setCommentID",
    value: function setCommentID(oldID, newID) {
      this.danmujs && this.danmujs.setCommentID(oldID, newID);
    } // 屏蔽某一类弹幕(参数可选值 scroll | top | bottom | color)

  }, {
    key: "hideMode",
    value: function hideMode(mode) {
      this.danmujs && this.danmujs.hide(mode);
    } // 显示某一类弹幕(参数可选值 scroll | top | bottom | color)

  }, {
    key: "showMode",
    value: function showMode(mode) {
      this.danmujs && this.danmujs.show(mode);
    } // 修改弹幕显示区域

  }, {
    key: "setArea",
    value: function setArea(area) {
      this.danmujs && this.danmujs.setArea(area);
    } // 设置透明度

  }, {
    key: "setOpacity",
    value: function setOpacity(opacity) {
      this.danmujs && this.danmujs.setOpacity(opacity);
    } // 设置字体

  }, {
    key: "setFontSize",
    value: function setFontSize(size, channelSize) {
      this.danmujs && this.danmujs.setFontSize(size, channelSize);
    }
  }, {
    key: "resize",
    value: function resize() {
      this.danmujs && this.danmujs.resize();
    }
  }, {
    key: "sendComment",
    value: function sendComment(comments) {
      this.danmujs && this.danmujs.sendComment(comments);
    }
  }, {
    key: "hideIcon",
    value: function hideIcon() {
      this.danmuButton && this.danmuButton.hide();
    }
  }, {
    key: "showIcon",
    value: function showIcon() {
      this.danmuButton && this.danmuButton.show();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.danmujs.stop();
      this.danmujs.destroy();
      this.danmujs = null;
      this.player.danmu = null;
      var danmuButton = this.danmuButton,
          danmuPanel = this.danmuPanel;
      this.danmuButton && this.danmuButton.root && danmuButton.__destroy && danmuButton.__destroy();
      this.danmuButton && this.danmuPanel.root && danmuPanel.__destroy && danmuPanel.__destroy();
      this.danmuButton = null;
      this.danmuPanel = null;
    }
  }, {
    key: "render",
    value: function render() {
      return "<xg-danmu class=\"xgplayer-danmu\">\n    </xg-danmu>";
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'danmu';
    }
    /**
     * @type IDanmuConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        comments: [],
        // initial barrage list组,
        area: {
          // Barrage display area
          start: 0,
          end: 1
        },
        closeDefaultBtn: false,
        // TODO: 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
        defaultOff: false,
        // TODO: 开启此项后弹幕不会初始化，默认初始化弹幕
        panel: false,
        // Whether to install the configuration panel
        panelConfig: {},
        // Initial configuration of the configuration panel
        switchConfig: {},
        // Switch button configuration information
        defaultOpen: true,
        // Whether to open the barrage by default
        isLive: false,
        // Is it live
        channelSize: 24,
        // default 24px
        fontSize: 14,
        // default 12
        opacity: 1,
        mouseControl: false,
        mouseControlPause: false,
        ext: {},
        style: {}
      };
    }
  }]);

  return Danmu;
}(Plugin);

export { Danmu as default, DanmuIcon, DanmuPanel };