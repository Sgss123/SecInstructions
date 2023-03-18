function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import Plugin, { Util, Events, POSITIONS, STATES } from '../../plugin';

var Time = /*#__PURE__*/function (_Plugin) {
  _inherits(Time, _Plugin);

  var _super = _createSuper(Time);

  function Time(args) {
    var _this;

    _classCallCheck(this, Time);

    _this = _super.call(this, args);
    _this.isActiving = false;
    return _this;
  }

  _createClass(Time, [{
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
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      var constrolsMode = this.player.controls.config.mode;
      this.mode = constrolsMode === 'flex' ? 'flex' : 'normal';

      if (this.config.disable) {
        return;
      }

      if (this.mode === 'flex') {
        this.createCenterTime();
        this.hide();
      }

      this.durationDom = this.find('.time-duration');
      this.timeDom = this.find('.time-current');
      this.on(Events.DURATION_CHANGE, function () {
        _this2.onTimeUpdate();
      });
      this.on(Events.TIME_UPDATE, function () {
        _this2.onTimeUpdate();
      });
      this.on(Events.EMPTIED, function () {
        _this2.onReset();
      });
    }
  }, {
    key: "show",
    value: function show() {
      if (this.mode === 'flex') {
        return;
      }

      _get(_getPrototypeOf(Time.prototype), "show", this).call(this);
    }
  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate() {
      var player = this.player,
          config = this.config;

      if (config.disable || this.isActiving || player.state < STATES.RUNNING) {
        return;
      }

      var current = player.currentTime + this.timeOffset;

      if (this.mode === 'flex') {
        this.centerCurDom.innerHTML = Util.format(current);

        if (this.duration !== Infinity && this.duration > 0) {
          this.centerDurDom.innerHTML = Util.format(this.duration);
        }
      } else {
        this.timeDom.innerHTML = Util.format(current);

        if (this.duration !== Infinity && this.duration > 0) {
          this.durationDom.innerHTML = Util.format(this.duration);
        }
      }
    }
  }, {
    key: "onReset",
    value: function onReset() {
      if (this.mode === 'flex') {
        this.centerCurDom.innerHTML = Util.format(0);
        this.centerDurDom.innerHTML = Util.format(0);
      } else {
        this.timeDom.innerHTML = Util.format(0);
        this.durationDom.innerHTML = Util.format(0);
      }
    }
  }, {
    key: "createCenterTime",
    value: function createCenterTime() {
      var player = this.player;

      if (!player.controls || !player.controls.center) {
        return;
      }

      var center = player.controls.center;
      this.centerCurDom = Util.createDom('xg-icon', '00:00', {}, 'xgplayer-time left');
      this.centerDurDom = Util.createDom('xg-icon', '00:00', {}, 'xgplayer-time right');
      center.children.length > 0 ? center.insertBefore(this.centerCurDom, center.children[0]) : center.appendChild(this.centerCurDom);
      center.appendChild(this.centerDurDom);
    }
  }, {
    key: "afterPlayerInit",
    value: function afterPlayerInit() {
      var config = this.config;

      if (this.duration === Infinity || this.playerConfig.isLive) {
        Util.hide(this.durationDom);
        Util.hide(this.timeDom);
        Util.hide(this.find('.time-separator'));
        Util.show(this.find('.time-live-tag'));
      } else {
        Util.hide(this.find('.time-live-tag'));
      }

      if (config.hide) {
        this.hide();
        return;
      }

      this.show();
    }
  }, {
    key: "changeLiveState",
    value: function changeLiveState(isLive) {
      if (isLive) {
        Util.hide(this.durationDom);
        Util.hide(this.timeDom);
        Util.hide(this.find('.time-separator'));
        Util.show(this.find('.time-live-tag'));
      } else {
        Util.hide(this.find('.time-live-tag'));
        Util.show(this.find('.time-separator'));
        Util.show(this.durationDom);
        Util.show(this.timeDom);
      }
    }
  }, {
    key: "updateTime",
    value: function updateTime(time) {
      this.isActiving = true;

      if (!time && time !== 0 || time > this.duration) {
        return;
      }

      if (this.mode === 'flex') {
        this.centerCurDom.innerHTML = Util.format(time);
        return;
      }

      this.timeDom.innerHTML = Util.format(time);
    }
  }, {
    key: "resetActive",
    value: function resetActive() {
      var _this3 = this;

      var player = this.player;

      var updateState = function updateState() {
        _this3.isActiving = false;
      };

      this.off(Events.SEEKED, updateState);

      if (player.isSeeking) {
        this.once(Events.SEEKED, updateState);
      } else {
        this.isActiving = false;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var center = this.player.controls.center;
      this.centerCurDom && center.removeChild(this.centerCurDom);
      this.centerCurDom = null;
      this.centerDurDom && center.removeChild(this.centerDurDom);
      this.centerDurDom = null;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      return "<xg-icon class=\"xgplayer-time\">\n    <span class=\"time-current\">00:00</span>\n    <span class=\"time-separator\">/</span>\n    <span class=\"time-duration\">00:00</span>\n    <span class=\"time-live-tag\">\u76F4\u64AD</span>\n    </xg-icon>";
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'time';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_LEFT,
        index: 2,
        disable: false
      };
    }
  }]);

  return Time;
}(Plugin);

export default Time;