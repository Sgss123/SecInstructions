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

import { Events, POSITIONS, Util } from '../../plugin';
import OptionsIcon from '../common/optionsIcon';
/**
 * @typedef {{
 *   text?: string,
 *   text?: string,
 *   definition?: any
 * }} IDefinition
 */

/**
 * @typedef {{
 *   position?: string,
 *   index?: string,
 *   list?: Array<IDefinition>,
 *   disable?: any,
 *   hidePortrait?: boolean,
 *   className?: string
 * }} IDefinitionConfig
 */

var DefinitionIcon = /*#__PURE__*/function (_OptionsIcon) {
  _inherits(DefinitionIcon, _OptionsIcon);

  var _super = _createSuper(DefinitionIcon);

  function DefinitionIcon(args) {
    var _this;

    _classCallCheck(this, DefinitionIcon);

    _this = _super.call(this, args); // 记录切换的时候的播放器状态

    _this.curTime = 0;
    _this.isPaused = true;
    return _this;
  }

  _createClass(DefinitionIcon, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      var list = args.config.list;

      if (Array.isArray(list) && list.length > 0) {
        args.config.list = list.map(function (item) {
          if (!item.text && item.name) {
            item.text = item.name;
          }

          return item;
        });
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      _get(_getPrototypeOf(DefinitionIcon.prototype), "afterCreate", this).call(this);

      this.on('resourceReady', function (list) {
        _this2.changeDefinitionList(list);
      });
    }
  }, {
    key: "renderItemList",
    value: function renderItemList() {
      var _this3 = this;

      var player = this.player;
      var list = this.config.list;
      var currentSrc = player.currentSrc || player.src;

      if (player.switchURL) {
        var curRUL = document.createElement('a');
        ['hlsjs'].every(function (item) {
          if (player[item]) {
            if (player[item].url) {
              curRUL.href = player[item].url;
            }

            if (item === 'hlsjs') {
              curRUL.href = player[item].originUrl || player[item].url;
            }

            currentSrc = curRUL.href;
            return false;
          } else {
            return true;
          }
        });
        curRUL = null;
      }

      var curIndex = 0;
      var items = list.map(function (item, index) {
        var showItem = {
          url: item.url,
          definition: item.definition || '',
          showText: _this3.getTextByLang(item)
        };

        if (item.url === currentSrc || !Util.isUndefined(item.definition) && item.definition === _this3.config.defaultDefinition) {
          showItem.isCurrent = true;
          curIndex = index;
        }

        return showItem;
      });

      _get(_getPrototypeOf(DefinitionIcon.prototype), "renderItemList", this).call(this, items, curIndex);
    }
  }, {
    key: "onCanplayChangeDefinition",
    value: function onCanplayChangeDefinition() {
      var player = this.player;
      player.currentTime = this.curTime;

      if (!this.isPaused) {
        var playPromise = player.play();

        if (playPromise !== undefined && playPromise) {
          // eslint-disable-next-line handle-callback-err
          playPromise.catch(function (_err) {});
        }
      } else {
        player.pause();
      }

      player.emit(Events.AFTER_DEFINITION_CHANGE);
    }
  }, {
    key: "onTimeupdateChangeDefinition",
    value: function onTimeupdateChangeDefinition() {
      var _this4 = this;

      this.once('timeupdate', function () {
        _this4.onCanplayChangeDefinition();
      });
    }
  }, {
    key: "switchUrl",
    value: function switchUrl(lastATag) {
      var player = this.player;
      var curRUL = document.createElement('a');
      ['mp4', 'hls', '__flv__', 'dash', 'hlsjs'].every(function (item) {
        if (player[item]) {
          if (player[item].url) {
            curRUL.href = player[item].url;
          }

          if (item === '__flv__') {
            if (player[item]._options) {
              curRUL.href = player[item]._options.url;
            } else {
              curRUL.href = player[item]._mediaDataSource.url;
            }
          }

          if (item === 'hlsjs') {
            curRUL.href = player[item].originUrl || player[item].url;
          }

          return false;
        } else {
          return true;
        }
      });

      if (lastATag && curRUL.href !== lastATag.url && !player.ended) {
        player.switchURL(lastATag.url);
      }

      curRUL = null;
    } // 对外暴露 切换清晰度

  }, {
    key: "changeDefinitionList",
    value: function changeDefinitionList(list) {
      if (!Array.isArray(list)) {
        return;
      }

      this.config.list = list.map(function (item) {
        if (!item.text && item.name) {
          item.text = item.name;
        }

        return item;
      });
      this.renderItemList();
      this.show();
    }
  }, {
    key: "changeDefinition",
    value: function changeDefinition(to) {
      var _this5 = this;

      var player = this.player;

      if (player.switchURL) {
        this.switchUrl(to);
      } else {
        // TODO: 兼容hls和flv
        if (to.url !== player.currentSrc) {
          this.curTime = player.currentTime;
          this.isPaused = player.paused;

          if (!player.ended) {
            player.src = to.url;
            player.play();

            if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
              this.once('timeupdate', function () {
                _this5.onTimeupdateChangeDefinition();
              });
            } else {
              this.once('canplay', function () {
                _this5.onCanplayChangeDefinition();
              });
            }
          }
        }
      }
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e, data) {
      _get(_getPrototypeOf(DefinitionIcon.prototype), "onItemClick", this).apply(this, arguments);

      var player = this.player;
      var target = e.delegateTarget;
      var url = target.getAttribute('url');
      this.emitUserAction(e, 'change_definition', {
        prop: 'definition',
        from: data.from,
        to: data.to
      });
      player.emit(Events.BEFORE_DEFINITION_CHANGE, url);
      this.changeDefinition(data.to);
      player.emit(Events.DEFINITION_CHANGE, {
        from: data.from,
        to: data.to
      });
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'definition';
    }
    /**
     * @type IDefinitionConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 3,
        list: [],
        disable: false,
        hidePortrait: false,
        // Whether to hide in the vertical screen state of the mobile terminal
        className: 'xgplayer-definition'
      };
    }
  }]);

  return DefinitionIcon;
}(OptionsIcon);

export { DefinitionIcon as default };