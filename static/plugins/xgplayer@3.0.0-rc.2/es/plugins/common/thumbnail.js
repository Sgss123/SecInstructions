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

/* eslint-disable camelcase */
import BasePlugin, { Util } from '../../plugin';
/**
 * @typedef {{
 *   isShow?: boolean,
 *   urls?: Array<string>, // 有多张大图就多个url
 *   pic_num?: number, // 每张图含有几个雪碧图
 *   col?: number, // 截图列数
 *   row?: number, // 截图行数
 *   height?: number, // 缩略图高度
 *   width?: number, // 缩略图宽度
 *   scale?: number, // 缩放
 *   className?: string, // 额外添加在dom上的class
 *   hidePortrait?: boolean, // 是否在竖屏的时候隐藏
 *   [propName: string]: any
 * }} IThumbnailConfig
 */

var Thumbnail = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Thumbnail, _BasePlugin);

  var _super = _createSuper(Thumbnail);

  function Thumbnail(args) {
    var _this;

    _classCallCheck(this, Thumbnail);

    _this = _super.call(this, args);
    _this.ratio = 1;
    _this.interval = null;
    _this.preloadMark = {};
    return _this;
  }

  _createClass(Thumbnail, [{
    key: "afterCreate",
    value: function afterCreate() {
      if (this.usable) {
        this.initThumbnail();
      }
    }
  }, {
    key: "usable",
    get: function get() {
      var _this$config = this.config,
          urls = _this$config.urls,
          pic_num = _this$config.pic_num;
      return urls && urls.length > 0 && pic_num > 0;
    }
  }, {
    key: "initThumbnail",
    value: function initThumbnail() {
      var _this$config2 = this.config,
          width = _this$config2.width,
          height = _this$config2.height,
          pic_num = _this$config2.pic_num,
          interval = _this$config2.interval;
      this.ratio = width / height * 100;
      this.interval = interval || Math.round(this.player.duration / pic_num);
      this.preload(0); // this.preIndex = new Array(urls.length)
      // this.interval = interval || Math.round(this.player.duration / pic_num)
      // this.ratio = width / height * 100
      // className && Util.addClass(this.root, className)
      // hidePortrait && Util.addClass(this.root, 'portrait')
      // width && (this.root.style.width = `${width}px`)
      // height && (this.root.style.height = `${height}px`)
      // this.root.style.backgroundSize = `${width * col}px auto`
    }
  }, {
    key: "getUrlByIndex",
    value: function getUrlByIndex(index) {
      return index >= 0 && index < this.config.urls.length ? this.config.urls[index] : '';
    }
  }, {
    key: "preload",
    value: function preload(index) {
      var _this2 = this;

      var urls = this.config.urls;
      var len = urls.length;
      var arr = [index - 1, index, index + 1, index + 2];
      arr.map(function (item) {
        if (!_this2.preloadMark[item] && item >= 0 && item < len) {
          Util.preloadImg(urls[item]);
          _this2.preloadMark[item] = true;
        }
      });
    }
  }, {
    key: "getPosition",
    value: function getPosition(now) {
      var containerWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var containerHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _this$config3 = this.config,
          pic_num = _this$config3.pic_num,
          row = _this$config3.row,
          col = _this$config3.col,
          width = _this$config3.width,
          height = _this$config3.height;
      this.interval = Math.round(this.player.duration / pic_num);
      var index = Math.ceil(now / this.interval); // 当前时间对应的图像索引

      index = index > pic_num ? pic_num : index;
      var urlIndex = index < row * col ? 0 : Math.ceil(index / (row * col)) - 1; // 当前图像所在的url索引

      var indexInPage = index - urlIndex * (col * row); // 当前图像在当前url中的索引

      var rowIndex = indexInPage > 0 ? Math.ceil(indexInPage / col) - 1 : 0; // 当前图像在当前url中的行索引

      var colIndex = indexInPage > 0 ? indexInPage - rowIndex * col - 1 : 0; // 当前图像在当前url中的列索引

      var swidth = 0; // containerWidth || width

      var sHeight = 0; // swidth * height / width
      // 根据入参的宽高适配样式

      if (containerWidth && containerHeight) {
        var per = containerWidth / containerHeight;

        if (per < width / height) {
          swidth = containerWidth;
          sHeight = swidth / (width / height);
        } else {
          sHeight = containerHeight;
          swidth = sHeight * (width / height);
        }
      } else {
        swidth = containerWidth || width;
        sHeight = swidth / (width / height);
      }

      var url = this.getUrlByIndex(urlIndex);
      return {
        urlIndex: urlIndex,
        rowIndex: rowIndex,
        colIndex: colIndex,
        url: url,
        height: sHeight,
        width: swidth,
        style: {
          backgroundImage: "url(".concat(url, ")"),
          backgroundSize: "".concat(swidth * col, "px auto"),
          backgroundPosition: "-".concat(colIndex * swidth, "px -").concat(rowIndex * sHeight, "px"),
          width: "".concat(swidth, "px"),
          height: "".concat(sHeight, "px")
        }
      };
    }
  }, {
    key: "update",
    value: function update(dom, now) {
      var containerWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var containerHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var customStyle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      var _this$config4 = this.config,
          pic_num = _this$config4.pic_num,
          urls = _this$config4.urls;

      if (pic_num <= 0 || !urls || urls.length === 0) {
        return;
      }

      var pos = this.getPosition(now, containerWidth, containerHeight);
      this.preload(pos.urlIndex);
      Object.keys(pos.style).map(function (key) {
        dom.style[key] = pos.style[key];
      });
      Object.keys(customStyle).map(function (key) {
        dom.style[key] = customStyle[key];
      });
    }
  }, {
    key: "createThumbnail",
    value: function createThumbnail(root, className) {
      var dom = Util.createDom('xg-thumbnail', '', {}, "thumbnail ".concat(className));
      root && root.appendChild(dom);
      return dom;
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'thumbnail';
    }
    /**
     * @type IThumbnailConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        isShow: false,
        urls: [],
        // 有多张大图就多个url就好
        pic_num: 0,
        // 每张图含有几个雪碧图
        col: 0,
        // 截图列数
        row: 0,
        // 截图行数
        height: 90,
        // 缩略图高度
        width: 160,
        // 缩略图宽度
        scale: 1,
        // 缩放
        className: '',
        // 额外添加在dom上的class
        hidePortrait: false // 是否在竖屏的时候隐藏

      };
    }
  }]);

  return Thumbnail;
}(BasePlugin);

export { Thumbnail as default };