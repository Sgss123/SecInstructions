function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Xglogger from '../plugins/logger';
import Replay from '../plugins/replay';
import Poster from '../plugins/poster';
import Start from '../plugins/start';
import Enter from '../plugins/enter';
import Mobile from '../plugins/mobile';
import Loading from '../plugins/loading';
import Progress from '../plugins/progress';
import PlayIcon from '../plugins/play';
import FullScreen from '../plugins/fullscreen';
import TimeIcon from '../plugins/time';
import RotateIcon from '../plugins/rotate';
import PlayNextIcon from '../plugins/playNext';
import DownLoadIcon from '../plugins/download';
import ScreenShotIcon from '../plugins/screenShot';
import DefinitionIcon from '../plugins/definition';
import PlaybackRateIcon from '../plugins/playbackRate';
import Volume from '../plugins/volume';
import Error from '../plugins/error';
import Prompt from '../plugins/prompt';
import Thumbnail from '../plugins/common/thumbnail';
import PIPIcon from '../plugins/pip';
import MiniProgress from '../plugins/progress/miniProgress';
import ZH from '../lang/zh-cn';

var DefaultPreset = function DefaultPreset() {
  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [Mobile, Progress, PlayIcon, FullScreen, TimeIcon, RotateIcon, PlayNextIcon, DefinitionIcon, PlaybackRateIcon, DownLoadIcon, ScreenShotIcon, Volume, PIPIcon];
  var layers = [Replay, Poster, Start, Loading, Enter, Error, Prompt, Thumbnail, MiniProgress];
  this.plugins = [Xglogger].concat(contolsIcons, layers);
  this.ignores = [];
  this.i18n = [ZH]; // this.icons = {
  //   play: Play,
  //   pause: Pause
  // }
};

export { DefaultPreset as default };