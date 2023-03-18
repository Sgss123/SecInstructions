function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

import BasePlugin, { Events, Util } from '../../plugin';

function now() {
  return new Date().getTime();
}

var Xglogger = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Xglogger, _BasePlugin);

  var _super = _createSuper(Xglogger);

  function Xglogger() {
    var _this;

    _classCallCheck(this, Xglogger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_onReset", function () {
      _this.vt = 0;
      _this.pt = 0;
      _this.fvt = 0;
      _this._isSeeking = false;
      _this.seekingStart = 0;
      _this.waitingStart = 0;
      _this._isWaiting = false;
      _this._waitTimer && Util.clearTimeout(_assertThisInitialized(_this), _this._waitTimer);
      _this._waittTimer && Util.clearTimeout(_assertThisInitialized(_this), _this._waittTimer);
      _this._waitTimer = null;
      _this._waittTimer = null;
      _this.stall = {
        costTime: 0,
        currentTime: 0
      };
      _this.seekData = {
        costTime: 0,
        currentTime: 0
      };
    });

    _defineProperty(_assertThisInitialized(_this), "_onSeeking", function () {
      if (_this.seekingStart) {
        return;
      }

      _this.seekingStart = now();

      _this.emitLog('seekStart', {
        start: now()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onSeeked", function () {
      _this.suspendSeekingStatus('seeked');
    });

    _defineProperty(_assertThisInitialized(_this), "_onWaiting", function () {
      if (_this._isWaiting || _this.seekingStart) {
        return;
      } // 卡顿标记开始


      _this._isWaiting = true;
      _this._waitTimer = Util.setTimeout(_assertThisInitialized(_this), function () {
        if (_this._isWaiting) {
          _this.waitingStart = now();
          Util.clearTimeout(_assertThisInitialized(_this), _this._waitTimer);
          _this._waitTimer = null;

          _this.emitLog('waitingStart', {
            start: _this.waitingStart
          });
        }
      }, 200);
    });

    _defineProperty(_assertThisInitialized(_this), "_onError", function () {
      _this.suspendSeekingStatus('error');

      _this.suspendWaitingStatus('error');
    });

    _defineProperty(_assertThisInitialized(_this), "_onPlaying", function () {
      _this.suspendWaitingStatus('playing');
    });

    return _this;
  }

  _createClass(Xglogger, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      this._onReset();

      this.on(Events.LOAD_START, function () {
        // console.log('Events.LOAD_START')
        _this2.vt = _this2.pt = now();
      });
      this.on(Events.LOADED_DATA, function () {
        _this2.vt = now();
        _this2.fvt = _this2.vt - _this2.pt; // console.log('Events.LOADED_DATA', this.fvt)

        _this2.emitLog('firstFrame', {
          fvt: _this2.fvt
        });
      });
      this.on(Events.WAITING, this._onWaiting);
      this.on(Events.SEEKING, this._onSeeking);
      this.on(Events.SEEKED, this._onSeeked);
      this.on(Events.PLAYING, this._onPlaying);
      this.on(Events.ERROR, this._onError);
      this.on(Events.EMPTIED, this._onReset);
    }
  }, {
    key: "_startWaitTimeout",
    value: function _startWaitTimeout() {
      var _this3 = this;

      this._waittTimer = Util.setTimeout(this, function () {
        _this3.suspendWaitingStatus('timeout');

        Util.clearTimeout(_this3, _this3._waittTimer);
        _this3._waittTimer = null;
      }, 20000);
    }
  }, {
    key: "suspendSeekingStatus",
    value: function suspendSeekingStatus(endType) {
      if (!this.seekingStart) {
        return;
      }

      var _now = now();

      var _cost = _now - this.seekingStart; // console.log('suspendSeekingStatus>>', `endType:${endType} costTime:${_cost}`)


      this.seekingStart = 0;
      this.emitLog('seekEnd', {
        end: _now,
        costTime: _cost
      });
    }
  }, {
    key: "suspendWaitingStatus",
    value: function suspendWaitingStatus(endType) {
      if (this._waitTimer) {
        Util.clearTimeout(this, this._waitTimer);
        this._waitTimer = null;
      }

      if (!this.waitingStart) {
        return;
      } // console.log('suspendWaitingStatus>>', endType)


      var _now = now();

      var _cost = _now - this.waitingStart;

      this._isWaiting = false;
      this.waitingStart = 0; // switch (endType) {
      //   case 'timeout':
      //     break
      //   case 'playing':
      //     this._isWaiting = false
      //     this.waitingStart = false
      //     break
      // }

      this.emitLog('waitingEnd', {
        endType: endType,
        costTime: _cost
      });
    }
  }, {
    key: "emitLog",
    value: function emitLog(eventType, data) {
      var player = this.player; // console.log('>>>emitLog', `eventType:${eventType}`, data)

      this.emit(Events.XGLOG, _objectSpread({
        eventType: eventType,
        currentTime: this.player.currentTime,
        readyState: player.video.readyState,
        networkState: player.video.networkState
      }, data));
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'xgLogger';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {};
    }
  }]);

  return Xglogger;
}(BasePlugin);

export { Xglogger as default };