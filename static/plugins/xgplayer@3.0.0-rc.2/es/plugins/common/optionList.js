function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Plugin, { Util, Sniffer } from '../../plugin';

var OptionList = /*#__PURE__*/function () {
  function OptionList(args) {
    _classCallCheck(this, OptionList);

    this.config = args.config;
    this.parent = args.root;
    this.root = Util.createDom('ul', '', {}, "xg-options-list ".concat(this.config.className));
    args.root.appendChild(this.root);
    this.onItemClick = this.onItemClick.bind(this);
    this.renderItemList();
    var eventName = Sniffer.device === 'mobile' ? 'touchend' : 'click';
    this._delegates = Plugin.delegate.call(this, this.root, 'li', eventName, this.onItemClick);
  }

  _createClass(OptionList, [{
    key: "renderItemList",
    value: function renderItemList(data) {
      var _this = this;

      var config = this.config,
          root = this.root;

      if (data) {
        config.data = data;
      } else {
        data = config.data;
      }

      if (config.style) {
        Object.keys(config.style).map(function (key) {
          root.style[key] = config[key];
        });
      }

      if (data.length > 0) {
        this.attrKeys = Object.keys(data[0]);
      }

      this.root.innerHTML = '';
      data.map(function (item, index) {
        var className = item.isCurrent ? 'option-item selected' : 'option-item';
        item['data-index'] = index;

        _this.root.appendChild(Util.createDom('li', "<span>".concat(item.showText, "</span>"), item, className));
      });
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(e) {
      if (!e.delegateTarget) {
        e.delegateTarget = e.target;
      }

      var target = e.delegateTarget;

      if (target && Util.hasClass(target, 'selected')) {
        return false;
      }

      var changeCallback = typeof this.config.onItemClick === 'function' ? this.config.onItemClick : null;
      var curlSelected = this.root.querySelector('.selected');
      Util.addClass(target, 'selected');
      curlSelected && Util.removeClass(curlSelected, 'selected');
      changeCallback(e, {
        from: curlSelected ? this.getAttrObj(curlSelected, this.attrKeys) : null,
        to: this.getAttrObj(target, this.attrKeys)
      });
    }
  }, {
    key: "getAttrObj",
    value: function getAttrObj(dom, keys) {
      if (!dom || !keys) {
        return {};
      }

      var obj = {};
      keys.map(function (key) {
        obj[key] = dom.getAttribute(key);
      });
      var index = dom.getAttribute('data-index');

      if (index) {
        obj.index = Number(index);
      }

      return obj;
    }
  }, {
    key: "show",
    value: function show() {
      Util.removeClass(this.root, 'hide');
      Util.addClass(this.root, 'active');
    }
  }, {
    key: "hide",
    value: function hide() {
      Util.removeClass(this.root, 'active');
      Util.addClass(this.root, 'hide');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this._delegates) {
        this._delegates.map(function (item) {
          item.destroy && item.destroy();
        });

        this._delegates = null;
      }

      this.root.innerHTML = null;
      this.parent.removeChild(this.root);
      this.root = null;
    }
  }]);

  return OptionList;
}();

export { OptionList as default };