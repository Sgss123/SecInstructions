function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { Util } from '../../plugin';
var TPL = [{
  tag: 'xg-cache',
  className: 'xgplayer-progress-cache',
  styleKey: 'cachedColor'
}, {
  tag: 'xg-played',
  className: 'xgplayer-progress-played',
  styleKey: 'playedColor'
}];

var InnerList = /*#__PURE__*/function () {
  function InnerList(args) {
    _classCallCheck(this, InnerList);

    this.fragments = args.fragments || [];
    this.focusClass = 'inner-focus';
    this.style = args.style || {
      playedColor: '',
      cachedColor: '',
      progressColor: ''
    };
    this.duration = 0;
    this.cachedIndex = 0;
    this.playedIndex = 0;
  }

  _createClass(InnerList, [{
    key: "updateDuration",
    value: function updateDuration(duration) {
      var _this = this;

      this.duration = parseInt(duration * 1000);
      var start = 0;
      var fragments = this.fragments;
      this.fragments = fragments.map(function (item) {
        item.start = start;
        item.end = start + item.percent * _this.duration;
        item.duration = item.percent * _this.duration;
        start += item.percent * _this.duration;
        return item;
      });
    }
  }, {
    key: "updateProgress",
    value: function updateProgress() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'played';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        newIndex: 0,
        curIndex: 0,
        millisecond: 0
      };
      var progressList = this.progressList,
          fragments = this.fragments;
      var newIndex = data.newIndex,
          curIndex = data.curIndex,
          millisecond = data.millisecond;

      if (newIndex !== curIndex) {
        progressList.map(function (item, index) {
          if (index < newIndex) {
            item[type].style.width = '100%';
          } else if (index > newIndex) {
            item[type].style.width = 0;
          }
        });
      }

      var curPFrag = fragments[newIndex];
      var per = millisecond === 0 ? 0 : (millisecond - curPFrag.start) / curPFrag.duration;
      progressList[newIndex][type].style.width = per < 0 ? 0 : "".concat(per * 100, "%");
    }
  }, {
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        cached: 0,
        played: 0
      };
      var duration = arguments.length > 1 ? arguments[1] : undefined;

      if (!this.duration || parseInt(duration * 1000, 10) !== this.duration) {
        if (!duration && duration !== 0) {
          return;
        }

        this.updateDuration(duration);
      }

      var playedIndex = this.playedIndex,
          cachedIndex = this.cachedIndex;

      if (Util.typeOf(data.played) !== 'Undefined') {
        var newPIndex = this.findIndex(data.played * 1000, playedIndex);
        this.updateProgress('played', {
          newIndex: newPIndex,
          curIndex: playedIndex,
          millisecond: parseInt(data.played * 1000, 10)
        });
        this.playedIndex = newPIndex;
      }

      if (Util.typeOf(data.cached) !== 'Undefined') {
        var newCIndex = this.findIndex(data.cached * 1000, cachedIndex);
        this.updateProgress('cached', {
          newIndex: newCIndex,
          curIndex: cachedIndex,
          millisecond: parseInt(data.cached * 1000, 10)
        });
        this.cachedIndex = newCIndex;
      }
    }
  }, {
    key: "findIndex",
    value: function findIndex(time, curIndex) {
      var fragments = this.fragments;

      if (fragments.length === 1) {
        return 0;
      }

      if (time > fragments[curIndex].start && time < fragments[curIndex].end) {
        return curIndex;
      }

      this.fragments.map(function (item, index) {
        if (time > item.start && time <= item.end) {
          curIndex = index;
        }
      });
      return curIndex;
    }
  }, {
    key: "findHightLight",
    value: function findHightLight() {
      var children = this.root.children;

      for (var i = 0; i < children.length; i++) {
        if (Util.hasClass(children[i], this.focusClass)) {
          return {
            dom: children[i],
            pos: children[i].getBoundingClientRect()
          };
        }
      }
    } // 根据索引获取进度条片段

  }, {
    key: "findFragment",
    value: function findFragment(index) {
      var children = this.root.children;

      if (index < 0 || index >= children.length) {
        return null;
      }

      return {
        dom: children[index],
        pos: children[index].getBoundingClientRect()
      };
    }
  }, {
    key: "unHightLight",
    value: function unHightLight() {
      var children = this.root.children;

      for (var i = 0; i < children.length; i++) {
        Util.removeClass(children[i], this.focusClass);
      }
    }
  }, {
    key: "setHightLight",
    value: function setHightLight(index) {
      var children = this.root.children;

      if (index < children.length) {
        Util.addClass(children[index], this.focusClass);
        return {
          dom: children[index],
          pos: children[index].getBoundingClientRect()
        };
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.progressList = null;
      this.fragments = null;
      this.root.innerHTML = '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var progressColor = this.style.progressColor;
      this.root = Util.createDom('xg-inners', '', {}, 'progress-list');

      if (this.fragments) {
        this.progressList = this.fragments.map(function (item) {
          var inner = Util.createDom('xg-inner', '', {
            style: progressColor ? "background:".concat(progressColor, "; flex: ").concat(item.percent) : "flex: ".concat(item.percent)
          }, "".concat(item.isFocus ? 'inner-focus' : '', " xgplayer-progress-inner"));

          _this2.root.appendChild(inner);

          TPL.map(function (item) {
            inner.appendChild(Util.createDom(item.tag, '', {
              style: item.styleKey ? "background: ".concat(_this2.style[item.styleKey], "; width:0;") : 'width:0;'
            }, item.className));
          });
          return {
            cached: inner.children[0],
            played: inner.children[1]
          };
        });
      }

      return this.root;
    }
  }]);

  return InnerList;
}();

export { InnerList as default };