function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import sniffer from '../utils/sniffer'; // import Danmu from '../plugins/danmu'

import Xglogger from '../plugins/logger';
import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Miniscreen from '../plugins/miniScreen';
import PC from '../plugins/pc';
import Mobile from '../plugins/mobile';
import Keyboard from '../plugins/keyboard';
import Loading from '../plugins/loading';
import Progress from '../plugins/progress';
import PlayIcon from '../plugins/play';
import FullScreen from '../plugins/fullscreen';
import TimeIcon from '../plugins/time';
import Volume from '../plugins/volume';
import RotateIcon from '../plugins/rotate';
import PIPIcon from '../plugins/pip';
import PlayNextIcon from '../plugins/playNext';
import DownLoadIcon from '../plugins/download';
import ScreenShotIcon from '../plugins/screenShot';
import DefinitionIcon from '../plugins/definition';
import PlaybackRateIcon from '../plugins/playbackRate';
import CssFullScreen from '../plugins/cssFullScreen';
import Error from '../plugins/error';
import Prompt from '../plugins/prompt';
import ProgressPreview from '../plugins/progressPreview';
import Thumbnail from '../plugins/common/thumbnail';
import MiniProgress from '../plugins/progress/miniProgress';
import DynamicBg from '../plugins/dynamicBg';

var DefaultPreset = function DefaultPreset(options, playerConfig) {
  var _this$plugins, _this$plugins2, _this$plugins3;

  _classCallCheck(this, DefaultPreset);

  var simulateMode = playerConfig && playerConfig.isMobileSimulateMode;
  var isLive = playerConfig.isLive;
  var vodPlugins = isLive ? [] : [Progress, MiniProgress, ProgressPreview, TimeIcon];
  var contolsIcons = [].concat(vodPlugins, [PlayIcon, FullScreen, RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, DownLoadIcon, ScreenShotIcon, Volume, PIPIcon]);
  var layers = [Replay, Poster, Start, Loading, Enter, Error, Prompt, Thumbnail, Miniscreen];
  this.plugins = [Xglogger].concat(_toConsumableArray(contolsIcons), layers);
  var mode = simulateMode ? 'mobile' : sniffer.device;

  switch (mode) {
    case 'pc':
      (_this$plugins = this.plugins).push.apply(_this$plugins, [Keyboard, PC, CssFullScreen]);

      break;

    case 'mobile':
      (_this$plugins2 = this.plugins).push.apply(_this$plugins2, [Mobile]);

      break;

    default:
      (_this$plugins3 = this.plugins).push.apply(_this$plugins3, [Keyboard, PC, CssFullScreen]);

  }

  if (sniffer.os.isIpad || mode === 'pc') {
    this.plugins.push(DynamicBg);
  }

  this.ignores = [];
  this.i18n = [];
};

export { DefaultPreset as default };