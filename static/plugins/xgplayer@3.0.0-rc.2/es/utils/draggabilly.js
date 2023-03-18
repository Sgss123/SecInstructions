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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import EventEmitter from 'eventemitter3';

function getStyleSize(value) {
  var num = parseFloat(value); // not a percent like '100%', and a number

  var isValid = value.indexOf('%') === -1 && !isNaN(num);
  return isValid && num;
}

var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };

  for (var i = 0; i < measurementsLength; i++) {
    var measurement = measurements[i];
    size[measurement] = 0;
  }

  return size;
}

function getStyle(elem) {
  var style = window.getComputedStyle(elem); // if ( !style ) {
  //   logError( 'Style returned ' + style +
  //     '. Are you running this code in a hidden iframe on Firefox? ' +
  //     'See http://bit.ly/getsizebug1' );
  // }

  return style;
}

function getSize(elem) {
  // use querySeletor if elem is string
  if (typeof elem === 'string') {
    elem = document.querySelector(elem);
  } // do not proceed on non-objects


  if (!elem || _typeof(elem) !== 'object' || !elem.nodeType) {
    return;
  }

  var style = getStyle(elem); // if hidden, everything is 0

  if (style.display === 'none') {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;
  var isBorderBox = size.isBorderBox = style.boxSizing === 'border-box'; // get all measurements

  for (var i = 0; i < measurementsLength; i++) {
    var measurement = measurements[i];
    var value = style[measurement];
    var num = parseFloat(value); // any 'auto', 'medium' value will be 0

    size[measurement] = !isNaN(num) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;
  var isBorderBoxSizeOuter = isBorderBox; // isBorderBox && isBoxSizeOuter;
  // overwrite width and height if we can get it from style

  var styleWidth = getStyleSize(style.width);

  if (styleWidth !== false) {
    size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
  }

  var styleHeight = getStyleSize(style.height);

  if (styleHeight !== false) {
    size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
  }

  size.innerWidth = size.width - (paddingWidth + borderWidth);
  size.innerHeight = size.height - (paddingHeight + borderHeight);
  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;
  return size;
}

function getTouch(touches, dentifier) {
  for (var i = 0; i < touches.length; i++) {
    var touch = touches[i];

    if (touch.identifier === dentifier) {
      return touch;
    }
  }
}

;
var EVENTS = {
  START: 'dragStart',
  MOVE: 'dragMove',
  ENDED: 'dragEnded'
};
var POST_START_EVENTS = {
  mousedown: ['mousemove', 'mouseup'],
  touchstart: ['touchmove', 'touchend', 'touchcancel'],
  pointerdown: ['pointermove', 'pointerup', 'pointercancel']
};

var Draggabilly = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Draggabilly, _EventEmitter);

  var _super = _createSuper(Draggabilly);

  function Draggabilly(root) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Draggabilly);

    _this = _super.call(this);
    _this.isEnabled = true;
    _this.isDragging = false;
    _this.isDown = false;
    _this.position = {};
    _this.downPoint = {};
    _this.dragPoint = {
      x: 0,
      y: 0
    };
    _this.startPos = {
      x: 0,
      y: 0
    }; // eslint-disable-next-line no-undef

    _this._root = root instanceof Element ? root : document.querySelector(root); // eslint-disable-next-line no-undef

    _this._handlerDom = options.handle instanceof Element ? options.handle : document.querySelector(options.handle);

    if (!_this._root || !_this._handlerDom) {
      return _possibleConstructorReturn(_this);
    } // ['onDown', 'onUp', 'onMove', 'onCancel', 'onDocUp'].map(key => {
    //   this[key] = this[key].bind(this)
    // })
    // if ('ontouchstart' in window) {
    //   this._handlerKeys = TOUCH_HANDLERS
    //   this._startKey = 'touchstart'
    //   this._endKey = 'touchend'
    // } else {
    //   this._handlerKeys = HANDLERS
    //   this._startKey = 'mousedown'
    //   this._endKey = 'mouseup'
    // }
    // this._handlerDom.addEventListener(this._startKey, this.onDown)


    _this._bindStartEvent();

    return _this;
  }

  _createClass(Draggabilly, [{
    key: "_bindStartEvent",
    value: function _bindStartEvent() {
      var _this2 = this;

      if ('ontouchstart' in window) {
        this._startKey = 'touchstart';
      } else {
        this._startKey = 'mousedown';
      }

      this["on".concat(this._startKey)] = this["on".concat(this._startKey)].bind(this);

      this._handlerDom.addEventListener(this._startKey, this["on".concat(this._startKey)]);

      POST_START_EVENTS[this._startKey].map(function (key) {
        _this2["on".concat(key)] = _this2["on".concat(key)].bind(_this2);
      });
    }
  }, {
    key: "_unbindStartEvent",
    value: function _unbindStartEvent() {
      this._handlerDom.removeEventListener(this._startKey, this["on".concat(this._startKey)]);
    }
  }, {
    key: "_bindPostStartEvents",
    value: function _bindPostStartEvents(event) {
      var _this3 = this;

      if (!event) {
        return;
      }

      var events = POST_START_EVENTS[this._startKey]; // bind events to node

      events.map(function (eventName) {
        window.addEventListener(eventName, _this3["on".concat(eventName)]);
      }); // save these arguments

      this._boundPointerEvents = events;
    }
  }, {
    key: "_unbindPostStartEvents",
    value: function _unbindPostStartEvents() {
      var _this4 = this;

      if (!this._boundPointerEvents) {
        return;
      }

      this._boundPointerEvents.map(function (eventName) {
        // console.log('eventName', eventName, this[`on${eventName}`])
        window.removeEventListener(eventName, _this4["on".concat(eventName)]);
      });

      delete this._boundPointerEvents;
    }
  }, {
    key: "enable",
    value: function enable() {
      this.isEnabled = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.isEnabled = false;

      if (this.isDragging) {
        this.onUp();
      }
    }
  }, {
    key: "onDocUp",
    value: function onDocUp(e) {
      this.onUp();
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this5 = this;

      // only render and animate if dragging
      if (!this.isDragging) {
        return;
      }

      this.positionDrag();
      window.requestAnimationFrame(function () {
        _this5.animate();
      });
    }
  }, {
    key: "positionDrag",
    value: function positionDrag() {
      // this._root.style.transform = 'translate3d( ' + this.dragPoint.x +
      // 'px, ' + this.dragPoint.y + 'px, 0)';
      var transform = "translate3d(".concat(this.dragPoint.x, "px, ").concat(this.dragPoint.y, "px, 0)");
      this._root.style.transform = transform;
      this._root.style.webKitTransform = transform;
    }
  }, {
    key: "setLeftTop",
    value: function setLeftTop() {
      this._root.style.left = this.position.x + 'px';
      this._root.style.top = this.position.y + 'px';
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(e) {
      this.dragStart(e, e);
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(e) {
      this.dragMove(e, e);
    }
  }, {
    key: "onmouseup",
    value: function onmouseup(e) {
      this.dragEnd(e, e);
    }
  }, {
    key: "ontouchstart",
    value: function ontouchstart(e) {
      var touch = e.changedTouches[0];
      this.dragStart(e, touch);
      this.touchIdentifier = touch.pointerId !== undefined ? touch.pointerId : touch.identifier;
      e.preventDefault();
    }
  }, {
    key: "ontouchmove",
    value: function ontouchmove(e) {
      var touch = getTouch(e.changedTouches, this.touchIdentifier);

      if (touch) {
        this.dragMove(e, touch);
      }
    }
  }, {
    key: "ontouchend",
    value: function ontouchend(e) {
      var touch = getTouch(e.changedTouches, this.touchIdentifier);

      if (touch) {
        this.dragEnd(e, touch);
      }

      e.preventDefault();
    }
  }, {
    key: "ontouchcancel",
    value: function ontouchcancel(e) {
      var touch = getTouch(e.changedTouches, this.touchIdentifier);

      if (touch) {
        this.dragCancel(e, touch);
      }
    }
  }, {
    key: "dragStart",
    value: function dragStart(e, pointer) {
      if (!this._root || this.isDown || !this.isEnabled) {
        return;
      }

      this.downPoint = pointer;
      this.dragPoint.x = 0;
      this.dragPoint.y = 0;

      this._getPosition();

      var size = getSize(this._root);
      this.startPos.x = this.position.x;
      this.startPos.y = this.position.y;
      this.startPos.maxY = window.innerHeight - size.height;
      this.startPos.maxX = window.innerWidth - size.width;
      this.setLeftTop();
      this.isDown = true;

      this._bindPostStartEvents(e);
    }
  }, {
    key: "dragRealStart",
    value: function dragRealStart(e, pointer) {
      this.isDragging = true;
      this.animate();
      this.emit(EVENTS.START, this.startPos);
    }
  }, {
    key: "dragEnd",
    value: function dragEnd(e, pointer) {
      if (!this._root) {
        return;
      }

      this._unbindPostStartEvents();

      if (this.isDragging) {
        this._root.style.transform = '';
        this.setLeftTop();
        this.emit(EVENTS.ENDED);
      }

      this.presetInfo();
    }
  }, {
    key: "_dragPointerMove",
    value: function _dragPointerMove(e, pointer) {
      var moveVector = {
        x: pointer.pageX - this.downPoint.pageX,
        y: pointer.pageY - this.downPoint.pageY
      }; // 检测是否有移动

      if (!this.isDragging && this.hasDragStarted(moveVector)) {
        this.dragRealStart(e, pointer);
      }

      return moveVector;
    }
  }, {
    key: "dragMove",
    value: function dragMove(e, pointer) {
      e = e || window.event;

      if (!this.isDown) {
        return;
      }

      var _this$startPos = this.startPos,
          x = _this$startPos.x,
          y = _this$startPos.y;

      var moveVector = this._dragPointerMove(e, pointer);

      var dragX = moveVector.x;
      var dragY = moveVector.y;
      dragX = this.checkContain('x', dragX, x);
      dragY = this.checkContain('y', dragY, y);
      this.position.x = x + dragX;
      this.position.y = y + dragY;
      this.dragPoint.x = dragX;
      this.dragPoint.y = dragY;
      this.emit(EVENTS.MOVE, this.position);
    }
  }, {
    key: "dragCancel",
    value: function dragCancel(e, pointer) {
      this.dragEnd(e, pointer);
    }
  }, {
    key: "presetInfo",
    value: function presetInfo() {
      this.isDragging = false;
      this.startPos = {
        x: 0,
        y: 0
      };
      this.dragPoint = {
        x: 0,
        y: 0
      };
      this.isDown = false;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._unbindStartEvent();

      this._unbindPostStartEvents();

      if (this.isDragging) {
        this.dragEnd();
      }

      this.removeAllListeners();
      this._handlerDom = null;
    }
  }, {
    key: "hasDragStarted",
    value: function hasDragStarted(moveVector) {
      return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
    }
  }, {
    key: "checkContain",
    value: function checkContain(axis, drag, grid) {
      if (drag + grid < 0) {
        return 0 - grid;
      }

      if (axis === 'x' && drag + grid > this.startPos.maxX) {
        return this.startPos.maxX - grid;
      }

      if (axis === 'y' && drag + grid > this.startPos.maxY) {
        return this.startPos.maxY - grid;
      }

      return drag;
    }
  }, {
    key: "_getPosition",
    value: function _getPosition() {
      var style = window.getComputedStyle(this._root);

      var x = this._getPositionCoord(style.left, 'width');

      var y = this._getPositionCoord(style.top, 'height'); // clean up 'auto' or other non-integer values


      this.position.x = isNaN(x) ? 0 : x;
      this.position.y = isNaN(y) ? 0 : y;

      this._addTransformPosition(style);
    }
  }, {
    key: "_addTransformPosition",
    value: function _addTransformPosition(style) {
      var transform = style.transform; // bail out if value is 'none'

      if (transform.indexOf('matrix') !== 0) {
        return;
      } // split matrix(1, 0, 0, 1, x, y)


      var matrixValues = transform.split(','); // translate X value is in 12th or 4th position

      var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
      var translateX = parseInt(matrixValues[xIndex], 10); // translate Y value is in 13th or 5th position

      var translateY = parseInt(matrixValues[xIndex + 1], 10);
      this.position.x += translateX;
      this.position.y += translateY;
    }
  }, {
    key: "_getPositionCoord",
    value: function _getPositionCoord(styleSide, measure) {
      if (styleSide.indexOf('%') !== -1) {
        // convert percent into pixel for Safari, #75
        var parentSize = getSize(this._root.parentNode); // prevent not-in-DOM element throwing bug, #131

        return !parentSize ? 0 : parseFloat(styleSide) / 100 * parentSize[measure];
      }

      return parseInt(styleSide, 10);
    }
  }]);

  return Draggabilly;
}(EventEmitter);

export { Draggabilly as default };