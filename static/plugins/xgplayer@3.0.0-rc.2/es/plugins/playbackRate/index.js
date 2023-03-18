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

import { Events, POSITIONS } from '../../plugin';
import OptionsIcon from '../common/optionsIcon';
/**
 * @typedef {{
 *  position?: string,
 *  index?: number,
 *  list?: Array<number | { [propName: string]: any }>,
 *  className?: string,
 *  hidePortrait?: boolean,
 *  [propName: string]: any
 * }} IPlaybackRateConfig
 */

var PlaybackRate = /*#__PURE__*/function (_OptionsIcon) {
  _inherits(PlaybackRate, _OptionsIcon);

  var _super = _createSuper(PlaybackRate);

  function PlaybackRate(args) {
    var _this;

    _classCallCheck(this, PlaybackRate);

    _this = _super.call(this, args);
    _this.curRate = 1;
    return _this;
  }

  _createClass(PlaybackRate, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      var playbackRate = args.player.config.playbackRate;
      var list = !playbackRate ? [] : Array.isArray(playbackRate) ? playbackRate : args.config.list;

      if (Array.isArray(list)) {
        args.config.list = list.map(function (item) {
          if (typeof item === 'number') {
            item = {
              rate: item,
              text: "".concat(item, "x")
            };
          } else if (!item.text && item.rate) {
            item.text = "".concat(item.rate, "x");
          }

          return item;
        });
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      _get(_getPrototypeOf(PlaybackRate.prototype), "afterCreate", this).call(this);

      this.on(Events.RATE_CHANGE, function () {
        if (_this2.curValue === _this2.player.playbackRate) {
          return;
        }

        _this2.renderItemList();
      });
      this.renderItemList();
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.config.list || this.config.list.length === 0) {
        return;
      }

      _get(_getPrototypeOf(PlaybackRate.prototype), "show", this).call(this);
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e, data) {
      _get(_getPrototypeOf(PlaybackRate.prototype), "onItemClick", this).apply(this, arguments);

      var target = e.delegateTarget;
      var rate = Number(target.getAttribute('rate'));

      if (!rate || rate === this.curValue) {
        return false;
      }

      this.emitUserAction(e, 'change_rate', {
        props: 'playbackRate',
        from: this.player.playbackRate,
        to: rate
      });
      this.curValue = rate;
      this.player.playbackRate = rate;
    }
  }, {
    key: "renderItemList",
    value: function renderItemList() {
      var _this3 = this;

      var playbackRate = this.player.playbackRate || 1;
      this.curValue = playbackRate;
      var curIndex = 0;
      var items = this.config.list.map(function (item, index) {
        var itemInfo = {
          rate: item.rate
        };

        if (itemInfo.rate === playbackRate) {
          itemInfo.isCurrent = true;
          curIndex = index;
        }

        itemInfo.showText = _this3.getTextByLang(item);
        return itemInfo;
      });

      _get(_getPrototypeOf(PlaybackRate.prototype), "renderItemList", this).call(this, items, curIndex);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(PlaybackRate.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'playbackRate';
    }
    /**
     * @type IPlaybackRateConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 4,
        list: [2, 1.5, 1, 0.75, 0.5],
        className: 'xgplayer-playbackrate',
        hidePortrait: false
      };
    }
  }]);

  return PlaybackRate;
}(OptionsIcon);

export { PlaybackRate as default };