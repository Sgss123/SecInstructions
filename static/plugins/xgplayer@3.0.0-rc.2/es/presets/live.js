function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import sniffer from '../utils/sniffer';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import PC from '../plugins/pc';
import Mobile from '../plugins/mobile';
import Keyboard from '../plugins/keyboard';
import Loading from '../plugins/loading';
import PlayIcon from '../plugins/play';
import FullScreen from '../plugins/fullscreen';
import TimeIcon from '../plugins/time';
import Volume from '../plugins/volume';
import RotateIcon from '../plugins/rotate';
import PIPIcon from '../plugins/pip';
import CssFullScreen from '../plugins/cssFullScreen';
import DefinitionIcon from '../plugins/definition';
import PlaybackRateIcon from '../plugins/playbackRate';
import Error from '../plugins/error'; // import DownLoadIcon from '../plugins/download'
// import ScreenShotIcon from '../plugins/screenShot'

import ZH from '../lang/zh-cn';

var DefaultPreset = function DefaultPreset() {
  var _this$plugins, _this$plugins2;

  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [PlayIcon, FullScreen, TimeIcon, Volume, RotateIcon, DefinitionIcon, PlaybackRateIcon, CssFullScreen, PIPIcon];
  this.plugins = [Poster, Start, Loading, Enter, Error].concat(contolsIcons);

  switch (sniffer.device) {
    case 'pc':
      (_this$plugins = this.plugins).push.apply(_this$plugins, [Keyboard, PC]);

      break;

    case 'mobile':
      this.plugins.push(Mobile);
      break;

    default:
      (_this$plugins2 = this.plugins).push.apply(_this$plugins2, [Keyboard, PC]);

  }

  this.ignores = [];
  this.i18n = [ZH];
};

export { DefaultPreset as default };