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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Plugin, { Events, Util, POSITIONS, Sniffer, STATE_CLASS } from '../../plugin';
/**
  * @typedef {{
  *   disable?: boolean,
  *   autoHide?: boolean,
  *   mode?: "flex"|"normal"|"bottom",
  *   initShow?: boolean,
  *   [propName: string]: any
  * }} IControlsConfig
  */

var Controls = /*#__PURE__*/function (_Plugin) {
  _inherits(Controls, _Plugin);

  var _super = _createSuper(Controls);

  function Controls() {
    var _this;

    _classCallCheck(this, Controls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          player = _assertThisInitialize.player;

      if (player.userTimer) {
        Util.clearTimeout(player, player.userTimer);
        clearTimeout(player.userTimer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      var _assertThisInitialize2 = _assertThisInitialized(_this),
          player = _assertThisInitialize2.player,
          playerConfig = _assertThisInitialize2.playerConfig;

      var hideDelay = !playerConfig.closeControlsBlur ? playerConfig.inactive : 200;
      player.focus({
        hideDelay: hideDelay
      });
    });

    return _this;
  }

  _createClass(Controls, [{
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (!args.config.mode && Sniffer.device === 'mobile') {
        args.config.mode = 'flex';
      }

      if (args.player.config.marginControls) {
        args.config.autoHide = false;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      var _this$config = this.config,
          disable = _this$config.disable,
          height = _this$config.height,
          mode = _this$config.mode,
          autoHide = _this$config.autoHide;

      if (disable) {
        return;
      }

      mode === 'flex' && this.player.addClass(STATE_CLASS.FLEX_CONTROLS);
      autoHide && this.player.addClass(STATE_CLASS.AUTOHIDE);
      var style = {
        height: "".concat(height, "px")
      };
      Object.keys(style).map(function (key) {
        _this2.root.style[key] = style[key];
      });
      /**
       * @type { HTMLElement}
       * @readonly
       */

      this.left = this.find('xg-left-grid');
      /**
       * @type { HTMLElement}
       * @readonly
       */

      this.center = this.find('xg-center-grid');
      /**
       * @type { HTMLElement}
       * @readonly
       */

      this.right = this.find('xg-right-grid');
      /**
       * @type { HTMLElement}
       * @readonly
       */

      this.innerRoot = this.find('xg-inner-controls'); // The progress bar is switched synchronously when switching to the small window state

      this.on(Events.MINI_STATE_CHANGE, function (isMini) {
        isMini ? Util.addClass(_this2.root, 'mini-controls') : Util.removeClass(_this2.root, 'mini-controls');
      });

      if (Sniffer.device !== 'mobile') {
        this.bind('mouseenter', this.onMouseEnter);
        this.bind('mouseleave', this.onMouseLeave);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.player.focus({
        autoHide: false
      });
    }
  }, {
    key: "unFocus",
    value: function unFocus() {
      this.player.focus({
        autoHide: true
      });
    }
  }, {
    key: "blur",
    value: function blur() {
      this.player.blur({
        ignorePaused: true
      });
    }
  }, {
    key: "recoverAutoHide",
    value: function recoverAutoHide() {
      this.config.autoHide && Util.addClass(this.root, 'control_autohide');
    }
  }, {
    key: "pauseAutoHide",
    value: function pauseAutoHide() {
      Util.removeClass(this.root, 'control_autohide');
    }
  }, {
    key: "show",
    value: function show() {
      Util.addClass(this.root, 'show');
    }
  }, {
    key: "hide",
    value: function hide() {
      Util.removeClass(this.root, 'show');
    }
    /**
     * @type {string}
     */

  }, {
    key: "mode",
    get: function get() {
      return this.config.mode;
    }
    /**
     *
     * @param {} plugin
     * @param { {config?: {[propName: string]: any}, position?:string, root?: HTMLElement, pluginName?: string}} options
     * @param { string } name
     * @returns { any }
     */

  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var name = arguments.length > 2 ? arguments[2] : undefined;

      if (!this.root) {
        return;
      }

      var defaultConfig = plugin.defaultConfig || {};

      if (!options.root) {
        var position = options.position ? options.position : options.config && options.config.position ? options.config.position : defaultConfig.position;

        switch (position) {
          case POSITIONS.CONTROLS_LEFT:
            options.root = this.left;
            break;

          case POSITIONS.CONTROLS_RIGHT:
            options.root = this.right;
            break;

          case POSITIONS.CONTROLS_CENTER:
            options.root = this.center;
            break;

          case POSITIONS.CONTROLS:
            options.root = this.root;
            break;

          default:
            options.root = this.left;
        }

        return _get(_getPrototypeOf(Controls.prototype), "registerPlugin", this).call(this, plugin, options, name);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (Sniffer.device === 'mobile') {
        this.unbind('mouseenter', this.onMouseEnter);
        this.unbind('mouseleave', this.onMouseLeave);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$config2 = this.config,
          mode = _this$config2.mode,
          autoHide = _this$config2.autoHide,
          initShow = _this$config2.initShow,
          disable = _this$config2.disable;

      if (disable) {
        return;
      }

      var className = Util.classNames({
        'xgplayer-controls': true
      }, {
        'flex-controls': mode === 'flex'
      }, {
        'bottom-controls': mode === 'bottom'
      }, {
        control_autohide: autoHide
      }, {
        controls_permanent: !autoHide
      }, {
        'xgplayer-controls-initshow': initShow || !autoHide
      });
      return "<xg-controls class=\"".concat(className, "\" unselectable=\"on\" onselectstart=\"return false\">\n    <xg-inner-controls class=\"xg-inner-controls xg-pos\">\n      <xg-left-grid class=\"xg-left-grid\">\n      </xg-left-grid>\n      <xg-center-grid class=\"xg-center-grid\"></xg-center-grid>\n      <xg-right-grid class=\"xg-right-grid\">\n      </xg-right-grid>\n    </xg-inner-controls>\n    </xg-controls>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'controls';
    }
    /**
     * @type IControlsConfig
     */

  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        disable: false,
        autoHide: true,
        // Whether to hide automatically
        mode: '',
        // Display mode， flex/normal/bottom
        initShow: false // Display when player is initialized

      };
    }
  }]);

  return Controls;
}(Plugin);

export default Controls;