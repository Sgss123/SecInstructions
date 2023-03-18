function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResizeObserver = /*#__PURE__*/function () {
  function ResizeObserver() {
    var _this = this;

    _classCallCheck(this, ResizeObserver);

    this.__handlers = [];
    this.timeStamp = 0;
    this.observer = null;

    if (!window.ResizeObserver) {
      return;
    }

    try {
      this.observer = new window.ResizeObserver(function (entries) {
        var t = new Date().getTime();

        if (t - _this.timeStamp < 100) {
          return;
        }

        _this.timeStamp = t;

        _this.__trigger(entries);
      });
      this.timeStamp = new Date().getTime();
    } catch (e) {
      console.error(e);
    }
  }

  _createClass(ResizeObserver, [{
    key: "addObserver",
    value: function addObserver(target, handler) {
      if (!this.observer) {
        return;
      }

      this.observer && this.observer.observe(target);
      var __handlers = this.__handlers;
      var index = -1;

      for (var i = 0; i < __handlers.length; i++) {
        if (__handlers[i] && target === __handlers[i].target) {
          index = i;
        }
      }

      if (index > -1) {
        this.__handlers[index].handler = handler;
      } else {
        this.__handlers.push({
          target: target,
          handler: handler
        });
      }
    }
  }, {
    key: "unObserver",
    value: function unObserver(target) {
      var i = -1;

      this.__handlers.map(function (item, index) {
        if (target === item.target) {
          i = index;
        }
      });

      try {
        this.observer && this.observer.unobserve(target);
      } catch (e) {}

      this.observer && this.observer.unobserve(target);
      i > -1 && this.__handlers.splice(i, 1);
    }
  }, {
    key: "destroyObserver",
    value: function destroyObserver() {
      this.observer && this.observer.disconnect();
      this.observer = null;
      this.__handlers = null;
    }
  }, {
    key: "__runHandler",
    value: function __runHandler(target) {
      var __handlers = this.__handlers;

      for (var i = 0; i < __handlers.length; i++) {
        if (__handlers[i] && target === __handlers[i].target) {
          try {
            __handlers[i].handler(target);
          } catch (error) {
            console.error(error);
          }

          return true;
        }
      }

      return false;
    }
  }, {
    key: "__trigger",
    value: function __trigger(entries) {
      for (var i = 0; i < entries.length; i++) {
        var ret = this.__runHandler(entries[i].target);

        if (ret) {
          break;
        }
      }
    }
  }]);

  return ResizeObserver;
}();

var resizeObserver = null;

function addObserver(target, handler) {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver();
  }

  resizeObserver.addObserver(target, handler);
  return resizeObserver;
}

function unObserver(target, handler) {
  resizeObserver.unObserver(target, handler);
}

function destroyObserver(target, handler) {
  resizeObserver.destroyObserver(target, handler);
}

export { addObserver, unObserver, destroyObserver };