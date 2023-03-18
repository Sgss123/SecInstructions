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

import Plugin, { POSITIONS, Util } from '../../plugin';
import { Events } from '../../plugin/basePlugin';
var RotateSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"-4 -6 40 40\" fill=\"none\"><g clip-path=\"url(#clip0)\" fill=\"#fff\"><path d=\"M17.5 13.75H6.25A3.75 3.75 0 002.5 17.5v6.25a3.75 3.75 0 003.75 3.75H17.5a3.75 3.75 0 003.75-3.75V17.5a3.75 3.75 0 00-3.75-3.75z\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.822 6.094a1.247 1.247 0 00.156 1.79l4.509 4.204a1.25 1.25 0 101.705-1.828L9.93 8.152l4.799-.018.039-.001a10 10 0 019.521 13.983 1.25 1.25 0 002.292.998 12.5 12.5 0 00-11.88-17.48l-5.05.019 2.293-2.46a1.25 1.25 0 10-1.829-1.705L5.854 6.06l-.032.036z\"/></g><defs><clipPath id=\"RotateSvg-clip0\"><path fill=\"#fff\" d=\"M0 0h40v40H0z\"/></clipPath></defs></svg>";

var Rotate = /*#__PURE__*/function (_Plugin) {
  _inherits(Rotate, _Plugin);

  var _super = _createSuper(Rotate);

  function Rotate(args) {
    var _this;

    _classCallCheck(this, Rotate);

    _this = _super.call(this, args);
    _this.rotateDeg = _this.config.rotateDeg || 0;
    return _this;
  }

  _createClass(Rotate, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;

      if (this.config.disable) {
        return;
      }

      this.appendChild('.xgplayer-icon', this.icons.rotate);
      this.onBtnClick = this.onBtnClick.bind(this);
      this.bind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick); // 全屏/css全屏/容器宽高发生变化 需要重新计算

      this.on(Events.VIDEO_RESIZE, function () {
        console.log('Events.VIDEO_RESIZE');

        if (_this2.rotateDeg) {
          Util.setTimeout(_this2, function () {
            _this2.updateRotateDeg(_this2.rotateDeg, _this2.config.innerRotate);
          }, 100);
        }
      });

      if (this.rotateDeg) {
        this.updateRotateDeg(this.rotateDeg, this.config.innerRotate);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick);
    }
  }, {
    key: "onBtnClick",
    value: function onBtnClick(e) {
      e.preventDefault();
      e.stopPropagation();
      this.emitUserAction(e, 'rotate');
      this.rotate(this.config.clockwise, this.config.innerRotate, 1);
    }
  }, {
    key: "updateRotateDeg",
    value: function updateRotateDeg(rotateDeg, innerRotate) {
      var player = this.player;

      if (!rotateDeg) {
        rotateDeg = 0;
      }

      var _this$player = this.player,
          root = _this$player.root,
          innerContainer = _this$player.innerContainer,
          video = _this$player.video;
      var width = root.offsetWidth;
      var height = innerContainer && innerRotate ? innerContainer.offsetHeight : root.offsetHeight;
      var rWidth = '100%';
      var rHeight = '100%';
      var x = 0;
      var y = 0;

      if (rotateDeg === 0.75 || rotateDeg === 0.25) {
        rWidth = "".concat(height, "px");
        rHeight = "".concat(width, "px");
        x = -(height - width) / 2;
        y = -(width - height) / 2;
      }

      var _transform = "translate(".concat(x, "px,").concat(y, "px) rotate(").concat(rotateDeg, "turn)");

      var _styles = {
        transformOrigin: 'center center',
        transform: _transform,
        webKitTransform: _transform,
        height: rHeight,
        width: rWidth
      };

      var _target = innerRotate ? video : root;

      var poster = innerRotate ? player.getPlugin('poster') : null;
      Object.keys(_styles).map(function (key) {
        _target.style[key] = _styles[key];
        poster && poster.root && (poster.root.style[key] = _styles[key]);
      });
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var innerRotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var player = this.player;

      if (!this.rotateDeg) {
        this.rotateDeg = 0;
      }

      var factor = clockwise ? 1 : -1;
      this.rotateDeg = (this.rotateDeg + 1 + factor * 0.25 * times) % 1;
      this.updateRotateDeg(this.rotateDeg, innerRotate);
      player.emit(Events.ROTATE, this.rotateDeg * 360);
    }
  }, {
    key: "registerIcons",
    value: function registerIcons() {
      return {
        rotate: RotateSvg
      };
    }
  }, {
    key: "render",
    value: function render() {
      if (this.config.disable) {
        return;
      }

      return "\n    <xg-icon class=\"xgplayer-rotate\">\n      <div class=\"xgplayer-icon\">\n      </div>\n      <div class=\"xg-tips\" lang-key=\"".concat(this.i18nKeys.ROTATE_TIPS, "\">\n      ").concat(this.i18n.ROTATE_TIPS, "\n      </div>\n    </xg-icon>");
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return 'rotate';
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGHT,
        index: 6,
        innerRotate: true,
        // true为只有画面旋转，false为整个播放器旋转
        clockwise: false,
        rotateDeg: 0,
        // 初始旋转角度
        disable: false
      };
    }
  }]);

  return Rotate;
}(Plugin);

export { Rotate as default };