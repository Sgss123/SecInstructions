import { Util, Events } from '../../plugin';
var ISPOT = {
  time: 0,
  // 进度条在此时间戳打点 单位为s
  text: '',
  // 打点处的自定义文案
  id: 1,
  // 标记唯一标识，用于删除的时候索引
  duration: 1,
  // 进度条标识点的时长 默认1s【可选】单位为s
  color: '#fff',
  // 进度条标识点的显示颜色【可选】
  style: {},
  // 指定样式
  width: 6,
  height: 6
};

function mergeISPOT(iSpot) {
  Object.keys(ISPOT).map(function (key) {
    if (iSpot[key] === undefined) {
      iSpot[key] = ISPOT[key];
    }
  });
}

var APIS = {
  initDots: function initDots() {
    var _this = this;

    this._ispots.map(function (item) {
      _this.createDot(item, false);
    });

    this._ispotsInit = true;
  },

  /**
   * 创建一个故事点
   * @param { object } iSpot
   * @param { boolean } isNew
   */
  createDot: function createDot(iSpot) {
    var isNew = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var progress = this.player.plugins.progress;

    if (!progress) {
      return;
    }

    if (isNew) {
      mergeISPOT(iSpot);

      this._ispots.push(iSpot);
    }

    if (!this._ispotsInit && isNew) {
      return;
    }

    var ret = this.calcuPosition(iSpot.time, iSpot.duration);
    var style = iSpot.style || {};
    style.left = "".concat(ret.left, "%");
    style.width = "".concat(ret.width, "%");
    var className = "xgspot_".concat(iSpot.id, " xgplayer-spot");
    ret.isMini && (className += ' mini');
    var dotDom = Util.createDom('xg-spot', '', {
      'data-text': iSpot.text,
      'data-time': iSpot.time,
      'data-id': iSpot.id
    }, className);
    Object.keys(style).map(function (key) {
      dotDom.style[key] = style[key];
    });
    progress.outer && progress.outer.appendChild(dotDom);
  },

  /**
   * 根据id查找节点
   * @param {string} id
   */
  findDot: function findDot(id) {
    if (!this.player.plugins.progress) {
      return;
    }

    var ret = this._ispots.filter(function (cur, index) {
      return cur.id === id;
    });

    return ret.length > 0 ? ret[0] : null;
  },

  /**
   * 更新故事点
   * @param {any} iSpot
   * @param {boolean} needShow
   */
  updateDot: function updateDot(iSpot) {
    var needShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var progress = this.player.plugins.progress;

    if (!progress) {
      return;
    }

    var dot = this.findDot(iSpot.id);

    if (dot) {
      Object.keys(iSpot).map(function (key) {
        dot[key] = iSpot[key];
      });
    }

    if (!this._ispotsInit) {
      return;
    }

    var dotDom = progress.find("xg-spot[data-id=\"".concat(iSpot.id, "\"]"));

    if (!dotDom) {
      return;
    }

    var ret = this.calcuPosition(iSpot.time, iSpot.duration);
    var style = iSpot.style || {};
    style.left = "".concat(ret.left, "%");
    style.width = "".concat(ret.width, "%");
    dotDom.setAttribute('data-text', iSpot.text);
    dotDom.setAttribute('data-time', iSpot.time);

    if (ret.isMini) {
      Util.addClass(dotDom, 'mini');
    } else {
      Util.removeClass(dotDom, 'mini');
    }

    Object.keys(style).map(function (key) {
      dotDom.style[key] = style[key];
    });

    if (needShow) {
      this.showDot(iSpot.id);
    }
  },

  /**
   * 删除某个故事点
   * @param {string | number } id
   */
  deleteDot: function deleteDot(id) {
    var _ispots = this._ispots;
    var progress = this.player.plugins.progress;

    if (!progress) {
      return;
    }

    var del = [];

    for (var i = 0; i < _ispots.length; i++) {
      if (_ispots[i].id === id) {
        del.push(i);
      }
    }

    var len = del.length;

    for (var _i = len - 1; _i >= 0; _i--) {
      _ispots.splice(del[_i], 1);

      if (this._ispotsInit) {
        var dotDom = progress.find("xg-spot[data-id=\"".concat(id, "\"]"));
        dotDom && dotDom.parentElement.removeChild(dotDom);
      }
    }
  },

  /**
   * 移除所有的故事点
   */
  deleteAllDots: function deleteAllDots() {
    var progress = this.player.plugins.progress;

    if (!progress) {
      return;
    }

    if (!this._ispotsInit) {
      this._ispots = [];
      return;
    }

    var dotDoms = progress.root.getElementsByTagName('xg-spot');

    for (var i = dotDoms.length - 1; i >= 0; i--) {
      progress.outer.removeChild(dotDoms[i]);
    }

    this._ispots = [];
  },

  /**
   * 批量全部更新当前故事点
   * @param {Array} iSpots
   */
  updateAllDots: function updateAllDots() {
    var _this2 = this;

    var iSpots = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var progress = this.player.plugins.progress;

    if (!progress) {
      return;
    }

    if (!this._ispotsInit) {
      this._ispots = iSpots;
      return;
    }

    this._ispots = [];
    var dotDoms = progress.root.getElementsByTagName('xg-spot');
    var len = dotDoms.length;

    if (len > iSpots.length) {
      for (var i = len - 1; i > iSpots.length - 1; i--) {
        progress.outer.removeChild(dotDoms[i]);
      }
    }

    iSpots.map(function (ispot, index) {
      if (index < len) {
        dotDoms[index].setAttribute('data-id', "".concat(ispot.id));

        _this2._ispots.push(ispot);

        _this2.updateDot(ispot);
      } else {
        _this2.createDot(ispot);
      }
    });
  }
};
export default function initDotsAPI(plugin) {
  var config = plugin.config,
      player = plugin.player;
  Object.keys(APIS).map(function (item) {
    plugin[item] = APIS[item].bind(plugin);
  });
  var ispots = player.config.progressDot || config.ispots || [];
  plugin._ispots = ispots.map(function (item) {
    mergeISPOT(item);
    return item;
  });
  plugin._ispotsInit = false;
  player.once(Events.DURATION_CHANGE, function () {
    plugin.initDots();
  });
}