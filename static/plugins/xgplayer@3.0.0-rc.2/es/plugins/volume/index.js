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

import Plugin, { Util, Events, Sniffer, POSITIONS } from '../../plugin';
var volumeLargeSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"0 -10 28 40\"><path fill=\"#fff\" d=\"M7.907 7.907H3.39v6.778h4.518l5.648 5.648V2.259L7.907 7.907zM20.753 18.48l-1.593-1.592c1.437-1.429 2.326-3.407 2.326-5.592s-.89-4.163-2.326-5.591l1.593-1.593c1.845 1.835 2.987 4.376 2.987 7.184s-1.142 5.349-2.987 7.184zm-3.199-3.185L15.95 13.69c.612-.613.991-1.46.991-2.395s-.379-1.782-.991-2.395l1.604-1.604c1.03 1.02 1.669 2.435 1.669 3.999s-.638 2.979-1.669 3.998z\"/></svg>";
var volumeSmallSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"0 -10 28 40\"><path fill=\"#fff\" d=\"M7.907 7.907H3.39v6.778h4.518l5.648 5.648V2.259L7.907 7.907zM17.554 15.295L15.95 13.69c.612-.613.991-1.46.991-2.395s-.379-1.782-.991-2.395l1.604-1.604c1.03 1.02 1.669 2.435 1.669 3.999s-.638 2.979-1.669 3.998zm0 0L15.95 13.69c.612-.613.991-1.46.991-2.395s-.379-1.782-.991-2.395l1.604-1.604c1.03 1.02 1.669 2.435 1.669 3.999s-.638 2.979-1.669 3.998z\"/></svg>";
var volumeMutedSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"40\" viewBox=\"0 -10 28 40\"><path fill=\"#fff\" d=\"M7.907 7.907H3.39v6.778h4.518l5.648 5.648V2.259L7.907 7.907zM20.306 9.703l-2.394-2.406-1.604 1.604 2.417 2.395-2.406 2.395 1.604 1.604 2.383-2.418 2.395 2.406 1.604-1.604-2.417-2.383 2.406-2.395-1.604-1.604-2.384 2.418z\"/></svg>";
/**
 * @typedef {{
 *   position?: string, // [可选]插件挂载的dom
 *   index?: number // [可选]插件在播放器中挂载的位置
 *   disable?: boolean, // [可选]是否禁用插件交互行为
 *   showValueLabel?: boolean, // [可选]是否显示当前滑动的音量数值
 *   default?: number // [可选]默认
 *   [propName: string]: any
 * }} IVolumeConfig
 */

var Volume = /*#__PURE__*/function (_Plugin) {
  _inherits(Volume, _Plugin);

  var _super = _createSuper(Volume);

  function Volume() {
    _classCallCheck(this, Volume);

    return _super.apply(this, arguments);
  }

  _createClass(Volume, [{
    key: "registerIcons",
    value: function registerIcons() {
      return {
        volumeSmall: {
          icon: volumeSmallSvg,
          class: 'xg-volume-small'
        },
        volumeLarge: {
          icon: volumeLargeSvg,
          class: 'xg-volume'
        },
        volumeMuted: {
          icon: volumeMutedSvg,
          class: 'xg-volume-mute'
        }
      };
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;

      if (this.config.disable) {
        return;
      }

      this.initIcons();
      var _this$playerConfig = this.playerConfig,
          commonStyle = _this$playerConfig.commonStyle,
          volume = _this$playerConfig.volume;

      if (commonStyle.volumeColor) {
        this.find('.xgplayer-drag').style.backgroundColor = commonStyle.volumeColor;
      }

      this.changeMutedHandler = this.hook('mutedChange', function (e) {
        _this.changeMuted(e);
      }, {
        pre: function pre(e) {
          e.preventDefault();
          e.stopPropagation();

          _this.emitUserAction(e, 'change_muted', {
            prop: 'muted',
            from: _this.player.muted,
            to: !_this.player.muted
          });
        }
      });
      this.onBarMousedown = this.onBarMousedown.bind(this);
      this.onMouseenter = this.onMouseenter.bind(this);
      this.onMouseleave = this.onMouseleave.bind(this);

      if (!(Sniffer.device === 'mobile') && !this.playerConfig.isMobileSimulateMode) {
        this.bind('mouseenter', this.onMouseenter);
        this.bind(['blur', 'mouseleave'], this.onMouseleave);
        this.bind('.xgplayer-bar', 'mousedown', this.onBarMousedown);
      }

      this.bind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.changeMutedHandler);
      this.on(Events.VOLUME_CHANGE, this.onVolumeChange.bind(this));

      if (Util.typeOf(volume) !== 'Number') {
        this.player.volume = this.config.default;
      }

      this.onVolumeChange();
    }
  }, {
    key: "onBarMousedown",
    value: function onBarMousedown(e) {
      var _this2 = this;

      var player = this.player;
      var slider = this.find('.xgplayer-slider');
      var bar = this.find('.xgplayer-bar');
      slider.focus();
      Util.event(e);
      var barRect = bar.getBoundingClientRect();

      var _ePos = Util.getEventPos(e, player.zoom);

      var pos = {
        x: _ePos.clientX,
        y: _ePos.clientY
      };
      var height = barRect.height - (_ePos.clientY - barRect.top);
      this.updateVolumePos(height, e);
      this.isMoving = false;

      var onMove = function onMove(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);

        var _ePos = Util.getEventPos(e, player.zoom);

        _this2.isMoving = true;
        var w = height - _ePos.clientY + pos.y;

        if (w > barRect.height) {
          return;
        }

        _this2.updateVolumePos(w, e);
      };

      var onUp = function onUp(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);
        _this2.isMoving = false;
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
      return false;
    }
  }, {
    key: "updateVolumePos",
    value: function updateVolumePos(height, event) {
      var player = this.player;
      var drag = this.find('.xgplayer-drag');
      var bar = this.find('.xgplayer-bar');
      var now = height / bar.getBoundingClientRect().height;
      drag.style.height = "".concat(height, "px");

      var _volume = Math.max(Math.min(now, 1), 0);

      this.emitUserAction(event, 'change_volume', [{
        prop: 'muted',
        from: true,
        to: false
      }, {
        prop: 'volume',
        from: player.volume,
        to: _volume
      }]);
      player.volume = _volume;
      player.muted = false;

      if (this.config.showValueLabel) {
        this.updateVolumeValue();
      }
    }
    /**
     * 修改音量数值标签
     *
     * @memberof Volume
     */

  }, {
    key: "updateVolumeValue",
    value: function updateVolumeValue() {
      var volume = this.player.volume;
      var $labelValue = this.find('.xgplayer-value-label');
      var vol = Math.max(Math.min(volume, 1), 0);
      $labelValue.innerText = Math.ceil(vol * 100);
    }
  }, {
    key: "onMouseenter",
    value: function onMouseenter(e) {
      Util.addClass(this.root, 'slide-show');
    }
  }, {
    key: "onMouseleave",
    value: function onMouseleave(e) {
      Util.removeClass(this.root, 'slide-show');
    }
  }, {
    key: "changeMuted",
    value: function changeMuted(e) {
      // e.preventDefault()
      e && e.stopPropagation();
      var player = this.player;

      if (player.volume < 0.01) {
        player.volume = this.config.default;
      } else {
        player.muted = !player.muted;
      }
    }
  }, {
    key: "onVolumeChange",
    value: function onVolumeChange() {
      var _this$player = this.player,
          muted = _this$player.muted,
          volume = _this$player.volume;

      if (!this.isMoving) {
        this.find('.xgplayer-drag').style.height = muted || volume === 0 ? '0px' : "".concat(volume * 100, "%");
      }

      this.animate(muted, volume);
    }
  }, {
    key: "animate",
    value: function animate(muted, volume) {
      if (muted || volume === 0) {
        this.setAttr('data-state', 'mute');
      } else if (volume < 0.5 && this.icons.volumeSmall) {
        this.setAttr('data-state', 'small');
      } else {
        this.setAttr('data-state', 'normal');
      }
    }
  }, {
    key: "initIcons",
    value: function initIcons() {
      var icons = this.icons;
      this.appendChild('.xgplayer-icon', icons.volumeSmall);
      this.appendChild('.xgplayer-icon', icons.volumeLarge);
      this.appendChild('.xgplayer-icon', icons.volumeMuted);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind('mouseenter', this.onMouseenter);
      this.unbind(['blur', 'mouseleave'], this.onMouseleave);
      this.unbind('.xgplayer-bar', 'mousedown', this.onBarMousedown);
      this.unbind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.changeMutedHandler);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      var volume = this.config.default || this.player.volume;
      var isShowVolumeValue = this.config.showValueLabel;
      return "\n    <xg-icon class=\"xgplayer-volume\" data-state=\"normal\">\n      <div class=\"xgplayer-icon\">\n      </div>\n      <xg-slider class=\"xgplayer-slider\">\n        ".concat(isShowVolumeValue ? "<div class=\"xgplayer-value-label\">".concat(volume * 100, "</div>") : '', "\n        <div class=\"xgplayer-bar\">\n          <xg-drag class=\"xgplayer-drag\" style=\"height: ").concat(volume * 100, "%\"></xg-drag>\n        </div>\n      </xg-slider>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'volume';
    }
    /**
     * @type IVolumeConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        // [可选]插件挂载的dom
        index: 1,
        // [可选]插件在播放器中挂载的位置
        disable: false,
        // [可选]是否禁用插件交互行为
        showValueLabel: false,
        // [可选]是否显示当前滑动的音量数值
        default: 0.6 // [可选]默认音量

      };
    }
  }]);

  return Volume;
}(Plugin);

export default Volume;