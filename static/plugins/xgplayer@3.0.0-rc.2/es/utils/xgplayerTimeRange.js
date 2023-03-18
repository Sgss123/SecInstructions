function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XgplayerTimeRange = /*#__PURE__*/function () {
  function XgplayerTimeRange(bufferedList) {
    _classCallCheck(this, XgplayerTimeRange);

    this.bufferedList = bufferedList;
  }

  _createClass(XgplayerTimeRange, [{
    key: "start",
    value: function start(index) {
      return this.bufferedList[index].start;
    }
  }, {
    key: "end",
    value: function end(index) {
      return this.bufferedList[index].end;
    }
  }, {
    key: "length",
    get: function get() {
      return this.bufferedList.length;
    }
  }]);

  return XgplayerTimeRange;
}();

export { XgplayerTimeRange as default };