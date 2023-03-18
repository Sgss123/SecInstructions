function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

export var usePreset = function usePreset(player, Preset) {
  var _player$config$plugin, _player$config$ignore, _player$config$i18n;

  var presetInst;

  if (Preset.preset && Preset.options) {
    // eslint-disable-next-line new-cap
    presetInst = new Preset.preset(Preset.options, player.config);
  } else {
    presetInst = new Preset({}, player.config);
  }

  var _presetInst = presetInst,
      _presetInst$plugins = _presetInst.plugins,
      plugins = _presetInst$plugins === void 0 ? [] : _presetInst$plugins,
      _presetInst$ignores = _presetInst.ignores,
      ignores = _presetInst$ignores === void 0 ? [] : _presetInst$ignores,
      _presetInst$icons = _presetInst.icons,
      icons = _presetInst$icons === void 0 ? {} : _presetInst$icons,
      _presetInst$i18n = _presetInst.i18n,
      i18n = _presetInst$i18n === void 0 ? [] : _presetInst$i18n;

  if (!player.config.plugins) {
    player.config.plugins = [];
  }

  if (!player.config.ignores) {
    player.config.ignores = [];
  }

  (_player$config$plugin = player.config.plugins).push.apply(_player$config$plugin, _toConsumableArray(plugins));

  (_player$config$ignore = player.config.ignores).push.apply(_player$config$ignore, _toConsumableArray(ignores));

  Object.keys(icons).map(function (key) {
    if (!player.config.icons[key]) {
      player.config.icons[key] = icons[key];
    }
  });

  (_player$config$i18n = player.config.i18n).push.apply(_player$config$i18n, _toConsumableArray(i18n));
};