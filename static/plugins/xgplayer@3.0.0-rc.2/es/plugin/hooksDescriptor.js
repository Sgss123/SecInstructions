function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function callHandler(obj, handler, next) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  var ret = handler.call.apply(handler, [obj].concat(args));

  if (!next || typeof next !== 'function') {
    return;
  }

  if (ret && ret.then) {
    ret.then(function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      next.call.apply(next, [obj].concat(args));
    });
  } else {
    next.call.apply(next, [obj].concat(args));
  }
}
/**
 * 给某个处理函数添加hook能力
 * @param { string } hookName
 * @param { Function } handler
 * @param { { pre?: any, next?:any } } preset
 * {
 *   pre: () => { // run beafore hook},
 *   next: () => { // run after hook return}
 * }
 */


function hook(hookName, handler) {
  var preset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    pre: null,
    next: null
  };

  if (!this.__hooks) {
    this.__hooks = {};
  }

  !this.__hooks[hookName] && (this.__hooks[hookName] = null);
  return function () {
    var _arguments = arguments,
        _this = this;

    if (preset.pre) {
      try {
        var _preset$pre;

        (_preset$pre = preset.pre).call.apply(_preset$pre, [this].concat(Array.prototype.slice.call(arguments)));
      } catch (e) {
        e.message = "[pluginName: ".concat(this.pluginName, ":").concat(hookName, ":pre error] >> ").concat(e.message);
        throw e;
      }
    }

    if (this.__hooks && this.__hooks[hookName]) {
      try {
        var _this$__hooks$hookNam;

        var preRet = (_this$__hooks$hookNam = this.__hooks[hookName]).call.apply(_this$__hooks$hookNam, [this, this].concat(Array.prototype.slice.call(arguments)));

        if (preRet) {
          if (preRet.then) {
            preRet.then(function (isContinue) {
              if (isContinue !== false) {
                callHandler.apply(void 0, [_this, handler, preset.next].concat(_toConsumableArray(_arguments))); // handler.call(this, ...arguments)
              }
            }).catch(function (e) {
              throw e;
            });
          } else {
            callHandler.apply(void 0, [this, handler, preset.next].concat(Array.prototype.slice.call(arguments))); // handler.call(this, ...arguments)
          }
        } else if (preRet === undefined) {
          callHandler.apply(void 0, [this, handler, preset.next].concat(Array.prototype.slice.call(arguments)));
        }
      } catch (e) {
        e.message = "[pluginName: ".concat(this.pluginName, ":").concat(hookName, "] >> ").concat(e.message);
        throw e;
      }
    } else {
      callHandler.apply(void 0, [this, handler, preset.next].concat(Array.prototype.slice.call(arguments)));
    }
  }.bind(this);
}
/**
 * add hooks
 * @param { string } hookName
 * @param { Function } handler
 */


function useHooks(hookName, handler) {
  var __hooks = this.__hooks;

  if (!__hooks) {
    return;
  } // eslint-disable-next-line no-prototype-builtins


  if (!__hooks.hasOwnProperty(hookName)) {
    console.warn("has no supported hook which name [".concat(hookName, "]"));
    return false;
  }

  __hooks && (__hooks[hookName] = handler);
  return true;
}
/**
 * remove hook
 * @param { string } hookName
 * @param { (plugin: any, ..args) => {} } handler
 * @returns void
 */


function removeHooks(hookName, handler) {
  var __hooks = this.__hooks;

  if (!__hooks) {
    return;
  }

  __hooks[hookName] = null;
}
/**
 * Add hooks to a plugin
 * @param { string } pluginName
 * @param  {...any} args
 */


function usePluginHooks(pluginName) {
  if (!this.plugins || !this.plugins[pluginName.toLowerCase()]) {
    return;
  }

  var plugin = this.plugins[pluginName.toLowerCase()];

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return plugin.useHooks && plugin.useHooks.apply(plugin, args);
}
/**
 * hook decorator, add hooks props for for an instance
 * @param { any } instance
 * @param { Array<string> } [hookNames]
 */


function hooksDescriptor(instance) {
  var presetHooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  instance.__hooks = {};
  presetHooks && presetHooks.map(function (item) {
    instance.__hooks[item] = null;
  });
  Object.defineProperty(instance, 'hooks', {
    get: function get() {
      return instance.__hooks && Object.keys(instance.__hooks).map(function (key) {
        if (instance.__hooks[key]) {
          return key;
        }
      });
    }
  });
}

function delHooksDescriptor(instance) {
  instance.__hooks = null;
}

function runHooks(obj, hookName, handler) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  if (obj.__hooks && obj.__hooks[hookName]) {
    var _obj$__hooks$hookName;

    var ret = (_obj$__hooks$hookName = obj.__hooks[hookName]).call.apply(_obj$__hooks$hookName, [obj, obj].concat(args));

    if (ret && ret.then) {
      ret.then(function (data) {
        return data === false ? null : handler.call.apply(handler, [obj, obj].concat(args));
      }).catch(function (e) {
        console.warn("[runHooks]".concat(hookName, " reject"), e.message);
      });
    } else if (ret !== false) {
      return handler.call.apply(handler, [obj, obj].concat(args));
    }
  } else {
    return handler.call.apply(handler, [obj, obj].concat(args));
  }
}

export { hooksDescriptor as default, hook, useHooks, usePluginHooks, removeHooks, delHooksDescriptor, runHooks };