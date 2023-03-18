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

import Plugin, { Events, Util, Sniffer, POSITIONS } from '../../plugin';
import OptionList from './optionList';
var IS_MOBILE = Sniffer.device === 'mobile';

var OptionsIcon = /*#__PURE__*/function (_Plugin) {
  _inherits(OptionsIcon, _Plugin);

  var _super = _createSuper(OptionsIcon);

  function OptionsIcon(args) {
    var _this;

    _classCallCheck(this, OptionsIcon);

    _this = _super.call(this, args);
    _this.isActive = false;
    _this.curValue = null; // 当前值

    _this.curIndex = 0;
    return _this;
  }

  _createClass(OptionsIcon, [{
    key: "updateLang",
    value: function updateLang(value) {
      this.renderItemList(this.config.list, this.curIndex);
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      var config = this.config;

      if (IS_MOBILE && config.listType !== 'middle') {
        config.listType = 'rightSide';
      }

      config.hidePortrait && Util.addClass(this.root, 'portrait');
      this.once(Events.CANPLAY, function () {
        if (config.list && config.list.length > 0) {
          _this2.renderItemList(config.list);

          _this2.show();
        }
      }); // 移动端控制栏和列表互斥

      IS_MOBILE && this.on(Events.PLAYER_FOCUS, function () {
        if (!_this2.isActive) {
          return;
        }

        _this2.optionsList && _this2.optionsList.hide();
        _this2.isActive = false;
      });
      this.activeEvent = IS_MOBILE ? 'touchend' : 'mouseenter';
      this.onEnter = this.onEnter.bind(this);
      this.onLeave = this.onLeave.bind(this);
      this.bind(this.activeEvent, this.onEnter);
      this.bind('mouseleave', this.onLeave);
    }
  }, {
    key: "show",
    value: function show() {
      if (!this.config.list || this.config.list.length === 0) {
        return;
      }

      Util.addClass(this.root, 'show');
    }
  }, {
    key: "getTextByLang",
    value: function getTextByLang(item, key, lang) {
      if (item === undefined) {
        return '';
      }

      var list = this.config.list;
      !lang && (lang = this.player.lang);
      key = !key || Util.isUndefined(item[key]) ? 'text' : key;
      typeof item === 'number' && (item = list[item]);

      try {
        if (_typeof(item[key]) === 'object') {
          return item[key][lang] || item[key].zh;
        } else {
          return item[key];
        }
      } catch (err) {
        console.warn(err);
        return '';
      }
    }
  }, {
    key: "onEnter",
    value: function onEnter(e) {
      e.preventDefault();
      e.stopPropagation();
      this.onToggle(true);
    }
  }, {
    key: "onLeave",
    value: function onLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isActive && this.onToggle(false);
    } // 状态切换

  }, {
    key: "onToggle",
    value: function onToggle(isActive) {
      if (isActive === this.isActive) return;
      var controls = this.player.controls;
      var listType = this.config.listType;

      if (isActive) {
        listType === 'rightSide' ? controls.blur() : controls.focus();
        this.optionsList && this.optionsList.show();
      } else {
        listType === 'rightSide' ? controls.focus() : controls.unFocus();
        this.optionsList && this.optionsList.hide();
      }

      this.isActive = isActive;
    } // 列表点击回调

  }, {
    key: "onItemClick",
    value: function onItemClick(e, data) {
      e.preventDefault();
      e.stopPropagation();
      var _this$config = this.config,
          listType = _this$config.listType,
          list = _this$config.list;
      (IS_MOBILE || listType === 'rightSide') && this.onToggle(false);
      this.curIndex = data.to.index;
      this.curItem = list[this.curIndex];
      this.changeCurrentText();
    }
  }, {
    key: "changeCurrentText",
    value: function changeCurrentText() {
      var list = this.config.list;
      var index = this.curIndex < list.length ? this.curIndex : 0;
      var curItem = list[index];
      if (!curItem) return;
      this.find('.icon-text').innerHTML = this.getTextByLang(curItem, 'iconText');
    }
  }, {
    key: "renderItemList",
    value: function renderItemList(itemList, curIndex) {
      var _this3 = this;

      var config = this.config,
          optionsList = this.optionsList,
          player = this.player;

      if (typeof curIndex === 'number') {
        this.curIndex = curIndex;
        this.curItem = config.list[curIndex];
      }

      if (optionsList) {
        optionsList.renderItemList(itemList);
        this.changeCurrentText();
        return;
      }

      var options = {
        config: {
          data: itemList || [],
          className: config.listType === 'rightSide' ? 'right-side' : '',
          onItemClick: function onItemClick(e, data) {
            _this3.onItemClick(e, data);
          }
        },
        root: config.listType === 'rightSide' ? player.root : this.root
      };
      this.optionsList = new OptionList(options);
      this.changeCurrentText();
      this.show();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind(this.activeEvent, this.onToggle);
      this.unbind('mouseleave', this.onToggle);

      if (this.optionsList) {
        this.optionsList.destroy();
        this.optionsList = null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return "<xg-icon class=\"xg-options-icon ".concat(this.config.className || '', "\">\n    <div class=\"xgplayer-icon btn-text\">\n    <span class=\"icon-text\"></span>\n    </div>\n   </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'optionsIcon';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 100,
        list: [],
        listType: 'middle',
        // 模式 rightSide-右侧边栏  middle-中间显示
        listStyle: {},
        hidePortrait: true
      };
    }
  }]);

  return OptionsIcon;
}(Plugin);

export { OptionsIcon as default };