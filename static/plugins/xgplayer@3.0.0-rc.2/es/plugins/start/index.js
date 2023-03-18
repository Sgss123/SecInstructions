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

import Plugin, { Util, Events, STATES } from '../../plugin';
var PlaySvg = "<svg class=\"play\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"3 -4 28 40\"><path fill=\"#fff\" d=\"M18.468 11.639l7.503 4.777-7.503 4.777zM10.965 6.86l7.503 4.778v9.554l-7.503 4.778z\"/></svg>";
var PauseSvg = "<svg class=\"pause\" xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"3 -4 28 40\"><path fill=\"#fff\" d=\"M19.173 6.861h5.451v19.11h-5.45V6.86zM8.208 25.971V6.86h5.45v19.11h-5.45z\"/></svg>";
/**
 * @typedef {{
 *  isShowPause?: boolean, // 暂停是否常驻
 *  isShowEnd?: boolean, // 播放结束常驻
 *  disableAnimate?: boolean, // 禁用点击动画
 *  mode?: 'hide' | 'show' | 'auto' // 控制模式: hide 常驻: show 跟随：auto
 *  [propName: string]: any
 * }} IStartConfig
 */

var AnimateMap = {};

function addAnimate(key, seconds) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    start: null,
    end: null
  };

  if (AnimateMap[key]) {
    window.clearTimeout(AnimateMap[key].id);
  }

  AnimateMap[key] = {};
  callback.start && callback.start();
  AnimateMap[key].id = window.setTimeout(function () {
    callback.end && callback.end();
    window.clearTimeout(AnimateMap[key].id);
    delete AnimateMap[key];
  }, seconds);
}

function clearAnimation() {
  Object.keys(AnimateMap).map(function (key) {
    window.clearTimeout(AnimateMap[key].id);
    delete AnimateMap[key];
  });
}

var Start = /*#__PURE__*/function (_Plugin) {
  _inherits(Start, _Plugin);

  var _super = _createSuper(Start);

  function Start(args) {
    var _this;

    _classCallCheck(this, Start);

    _this = _super.call(this, args);
    _this.autoPlayStart = false;
    return _this;
  }

  _createClass(Start, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player,
          playerConfig = this.playerConfig;
      this.initIcons();
      this.once(Events.READY, function () {
        if (playerConfig) {
          if (playerConfig.lang && playerConfig.lang === 'en') {
            Util.addClass(player.root, 'lang-is-en');
          } else if (playerConfig.lang === 'jp') {
            Util.addClass(player.root, 'lang-is-jp');
          }
        }
      });
      this.on(Events.AUTOPLAY_STARTED, function () {
        var className = _this2.config.mode === 'auto' ? 'auto-hide' : 'hide';
        Util.addClass(_this2.root, className);
        _this2.autoPlayStart = true;

        _this2.onPlayPause('play');
      });

      if (!playerConfig.autoplay) {
        this.show();
      }

      this.on(Events.AUTOPLAY_PREVENTED, function () {
        var className = _this2.config.mode === 'auto' ? 'auto-hide' : 'hide';

        _this2.setAttr('data-state', 'play');

        Util.removeClass(_this2.root, className);

        _this2.show();
      });
      this.on(Events.PLAY, function () {
        _this2.onPlayPause('play');
      });
      this.on(Events.PAUSE, function () {
        _this2.onPlayPause('pause');
      });
      this.clickHandler = this.hook('startClick', this.switchPausePlay, {
        pre: function pre(e) {
          e.preventDefault();
          e.stopPropagation();
          var paused = _this2.player.paused;

          _this2.emitUserAction(e, 'switch_play_pause', {
            props: 'paused',
            from: paused,
            to: !paused
          });
        }
      });
      this.bind(['click', 'touchend'], this.clickHandler);
    }
  }, {
    key: "preventDefault",
    value: function preventDefault(e) {}
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        startPlay: {
          icon: PlaySvg,
          class: 'xg-icon-play'
        },
        startPause: {
          icon: PauseSvg,
          class: 'xg-icon-pause'
        }
      };
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild('xg-start-inner', icons.startPlay);
      this.appendChild('xg-start-inner', icons.startPause);
    }
  }, {
    key: "hide",
    value: function hide() {
      Util.addClass(this.root, 'hide');
    }
  }, {
    key: "show",
    value: function show() {
      Util.removeClass(this.root, 'hide');
    }
  }, {
    key: "focusHide",
    value: function focusHide() {
      Util.addClass(this.root, 'focus-hide');
    }
  }, {
    key: "recover",
    value: function recover() {
      Util.removeClass(this.root, 'focus-hide');
    }
  }, {
    key: "switchStatus",
    value: function switchStatus(isAnimate) {
      if (isAnimate) {
        this.setAttr('data-state', !this.player.paused ? 'play' : 'pause');
      } else {
        this.setAttr('data-state', this.player.paused ? 'play' : 'pause');
      }
    }
  }, {
    key: "animate",
    value: function animate(endShow) {
      var _this3 = this;

      addAnimate('pauseplay', 400, {
        start: function start() {
          Util.addClass(_this3.root, 'interact');

          _this3.show();

          _this3.switchStatus(true);
        },
        end: function end() {
          Util.removeClass(_this3.root, 'interact');
          !endShow && _this3.hide();
        }
      });
    }
  }, {
    key: "switchPausePlay",
    value: function switchPausePlay(e) {
      var player = this.player;
      e.preventDefault();
      e.stopPropagation();

      if (player.state < STATES.READY) {
        return;
      }

      var paused = this.player.paused;

      if (!paused && player.state === STATES.RUNNING) {
        player.pause();
      } else {
        player.play();
      }
    }
  }, {
    key: "onPlayPause",
    value: function onPlayPause(status) {
      var config = this.config,
          player = this.player;

      if (player.state < STATES.RUNNING || !this.autoPlayStart) {
        return;
      } // 一直显示


      if (config.mode === 'show') {
        this.switchStatus();
        this.show();
        return;
      } // 跟随播放器的focus状态显示和隐藏


      if (config.mode === 'auto') {
        this.switchStatus();
        return;
      } // 暂停/播放结束状态强制显示


      if (config.isShowPause && player.paused && !player.ended || config.isShowEnd && player.ended) {
        this.switchStatus();
        this.show();
        return;
      }

      if (config.disableAnimate) {
        this.switchStatus();
        this.hide();
        return;
      }

      if (status === 'play') {
        this.autoPlayStart ? this.animate() : this.hide();
      } else {
        if (!this.autoPlayStart) {
          return;
        }

        this.animate();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.clickHandler);
      clearAnimation();
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.playerConfig.autoplay ? this.config.mode === 'auto' ? 'auto-hide' : 'hide' : '';
      return "\n    <xg-start class=\"xgplayer-start ".concat(className, "\">\n    <xg-start-inner></xg-start-inner>\n    </xg-start>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'start';
    }
    /**
     * @type IStartConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        isShowPause: false,
        // 暂停是否常驻
        isShowEnd: false,
        // 播放结束常驻
        disableAnimate: false,
        // 禁用点击动画
        mode: 'hide' // 控制模式: hide 常驻: show 跟随：auto

      };
    }
  }]);

  return Start;
}(Plugin);

export default Start;