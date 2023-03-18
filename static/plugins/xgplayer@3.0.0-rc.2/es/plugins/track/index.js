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

import SubTitles from 'xgplayer-subtitles';
import { Util, POSITIONS } from '../../plugin';
import OptionsIcon from '../common/optionsIcon';
/**
 * @typedef {{
 *   position?: string,
 *   index?: string,
 *   list?: Array<{
 *      url:string,
 *      language?: string | number,
 *      id?: number | string,
 *      isDefault?: boolean,
 *      text?: any }>,
 *   isDefaultOpen?: boolean,
 *   style?: {
 *      follow:? boolean, // 是否跟随控制栏调整位置
 *      mode?: 'stroke' | 'bg', // 字体显示模式，默认是描边
 *      followBottom?: number, // 跟随底部控制栏的高度
 *      fitVideo?: boolean, // 是否跟随视频自动调整字号
 *      offsetBottom?: number, // 字幕距离画面底部百分比，默认2%
 *      baseSizeX?: number, // 横屏视频适配基准字号
 *      baseSizeY?: number, // 竖屏视频适配基准字号
 *      minSize?: number, // pc端最小字号
 *      minMobileSize?: number, // 移动端最小字号
 *      line?: 'double' | 'single' | 'three', // 最大显示行数 single/double/three
 *      fontColor?: string // 字体颜色
 *   },
 *   closeText?: { text: string, iconText: string },
 *   className?: string,
 *   hidePortrait?: boolean,
 *   [propName: string]: any
 * }} ITextTrackConfig
 */

var DEFAULT_CLOSE_TYPE = 'text-close';

function formartList(list) {
  var defaultIndex = -1;
  list.map(function (item, index) {
    if (!item.id && !item.language) {
      item.id = index;
    }

    !item.url && (item.url = item.src);
    !item.text && (item.text = item.label);
    !item.language && (item.language = item.srclang);
    item.isDefault === undefined && (item.isDefault = item.default);

    if (item.isDefault || item.default) {
      defaultIndex = index;
    }
  });
  return defaultIndex;
}

var TextTrack = /*#__PURE__*/function (_OptionsIcon) {
  _inherits(TextTrack, _OptionsIcon);

  var _super = _createSuper(TextTrack);

  function TextTrack(args) {
    var _this;

    _classCallCheck(this, TextTrack);

    _this = _super.call(this, args);
    _this.curRate = 1;
    return _this;
  }

  _createClass(TextTrack, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      var texttrack = args.player.config.texttrack || args.player.config.textTrack;

      if (Util.typeOf(texttrack) === 'Array') {
        args.config.list = texttrack;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this$config = this.config,
          list = _this$config.list,
          style = _this$config.style,
          isDefaultOpen = _this$config.isDefaultOpen;

      if (!list || list.length < 1) {
        return;
      }

      var defaultIndex = formartList(list); // 如果配置信息为默认开启，但是没有默认开启的语言，则默认第一个

      if (isDefaultOpen && defaultIndex < 0) {
        list[0].isDefault = true;
      }

      _get(_getPrototypeOf(TextTrack.prototype), "afterCreate", this).call(this);

      var config = {
        subTitles: list,
        defaultOpen: isDefaultOpen
      };
      Object.keys(style).map(function (key) {
        config[key] = style[key];
      });
      this.subTitles = new SubTitles(config);
      this.subTitles.attachPlayer(this.player);
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.config.list || this.config.list.length === 0) {
        return;
      }

      _get(_getPrototypeOf(TextTrack.prototype), "show", this).call(this);
    } // 更新字幕信息

  }, {
    key: "updateSubtitles",
    value: function updateSubtitles() {
      var _this2 = this;

      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var isDefaultOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var defaultIndex = formartList(list);
      var curLanguage = this.subTitles && this.subTitles.currentText ? this.subTitles.currentText.language : null;
      var cuIndex = null;
      list.map(function (item, index) {
        if (item.language === curLanguage) {
          item.isDefault = true;
          cuIndex = index;
        }
      });

      if (defaultIndex > -1 && defaultIndex !== cuIndex) {
        list[defaultIndex].isDefault = false;
      }

      this.subTitles.destroy();
      var config = {
        subTitles: list,
        defaultOpen: isDefaultOpen
      };
      Object.keys(this.config.style).map(function (key) {
        config[key] = _this2.config.style[key];
      });
      this.subTitles = new SubTitles(config);
      this.subTitles.attachPlayer(this.player);
      this.renderItemList();
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e, data) {
      _get(_getPrototypeOf(TextTrack.prototype), "onItemClick", this).apply(this, arguments);

      var target = e.delegateTarget;
      var language = target.getAttribute('language');
      var id = target.getAttribute('data-id');
      var type = target.getAttribute('data-type');

      if (this.subTitles) {
        if (type === DEFAULT_CLOSE_TYPE) {
          this.subTitles.switchOff();
        } else {
          this.subTitles.switch({
            language: language,
            id: id
          }).catch(function (error) {
            console.log('onItemClick', error);
          });
        }
      }
    }
  }, {
    key: "changeCurrentText",
    value: function changeCurrentText() {
      var _this$config2 = this.config,
          list = _this$config2.list,
          closeText = _this$config2.closeText;
      var index = this.curIndex;

      if (index - 1 < 0) {
        this.find('.icon-text').innerHTML = this.getTextByLang(closeText, 'iconText');
      } else if (index - 1 < list.length) {
        var curItem = list[index - 1];
        if (!curItem) return;
        this.find('.icon-text').innerHTML = this.getTextByLang(curItem, 'iconText');
      }
    }
  }, {
    key: "renderItemList",
    value: function renderItemList() {
      var _this3 = this;

      var _this$config3 = this.config,
          list = _this$config3.list,
          closeText = _this$config3.closeText;
      var curIndex = 0;
      var items = [];
      items.push({
        showText: this.getTextByLang(closeText),
        'data-type': DEFAULT_CLOSE_TYPE
      });
      list.map(function (item, index) {
        var itemInfo = {
          language: item.language || item.srclang,
          'data-id': item.id
        };

        if (item.default || item.isDefault) {
          itemInfo.isCurrent = true;
          curIndex = index + 1;
        }

        itemInfo.showText = _this3.getTextByLang(item);
        items.push(itemInfo);
      });

      _get(_getPrototypeOf(TextTrack.prototype), "renderItemList", this).call(this, items, curIndex);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.subTitles) {
        this.subTitles.destroy();
        this.subTitles = null;
      }

      _get(_getPrototypeOf(TextTrack.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'texttrack';
    }
    /**
     * @type ITextTrackConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 6,
        list: [],
        isDefaultOpen: true,
        style: {
          follow: true,
          // 是否跟随控制栏调整位置
          mode: 'stroke',
          // 字体显示模式，默认是描边
          followBottom: 50,
          // 跟随底部控制栏的高度
          fitVideo: true,
          // 是否跟随视频自动调整字号
          offsetBottom: 2,
          // 字幕距离画面底部百分比，默认2%
          baseSizeX: 49,
          // 横屏视频适配基准字号
          baseSizeY: 28,
          // 竖屏视频适配基准字号
          minSize: 16,
          // pc端最小字号
          minMobileSize: 13,
          // 移动端最小字号
          line: 'double',
          // 最大显示行数 single/double/three
          fontColor: '#fff' // 字体颜色

        },
        closeText: {
          text: '不开启',
          iconText: '字幕'
        },
        className: 'xgplayer-texttrack',
        hidePortrait: false
      };
    }
  }]);

  return TextTrack;
}(OptionsIcon);

export { TextTrack as default };