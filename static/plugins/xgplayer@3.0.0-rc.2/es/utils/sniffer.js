/**
 * @typedef {{
 *  device: 'pc' | 'mobile',
 *  browser: 'ie' | 'firefox' | 'chrome' | 'opera' | 'safari',
 *  os: {
 *   isTablet: boolean,
 *   isPhone: boolean,
 *   isIpad: boolean,
 *   isIos: boolean,
 *   isAndroid: boolean,
 *   isPc: boolean,
 *   isSymbian: boolean,
 *   isWindowsPhone: boolean,
 *   isFireFox: boolean
 *  },
 *  isWeixin: boolean
 * }} ISniffer
 */
var VERSION_REG = {
  android: /(Android)\s([\d.]+)/,
  ios: /(Version)\/([\d.]+)/
};
/**
 * @type ISniffer
 */

var sniffer = {
  get device() {
    var r = sniffer.os;
    return r.isPc ? 'pc' : 'mobile'; // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  },

  get browser() {
    if (typeof navigator === 'undefined') {
      return '';
    }

    var ua = navigator.userAgent.toLowerCase();
    var reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firefox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    };
    return [].concat(Object.keys(reg).filter(function (key) {
      return reg[key].test(ua);
    }))[0];
  },

  get os() {
    if (typeof navigator === 'undefined') {
      return {};
    }

    var ua = navigator.userAgent;
    var isWindowsPhone = /(?:Windows Phone)/.test(ua);
    var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    var isAndroid = /(?:Android)/.test(ua);
    var isFireFox = /(?:Firefox)/.test(ua);
    var isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
    var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    var isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
    var isIpad = /(?:iPad|PlayBook)/.test(ua);
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isIpad: isIpad,
      isIos: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
      isSymbian: isSymbian,
      isWindowsPhone: isWindowsPhone,
      isFireFox: isFireFox
    };
  },

  get osVersion() {
    var ua = navigator.userAgent;
    var reg = ''; // ios

    if (/(?:iPhone)|(?:iPad|PlayBook)/.test(ua)) {
      reg = VERSION_REG.ios; // android
    } else {
      reg = VERSION_REG.android;
    }

    var _match = reg ? reg.exec(ua) : [];

    if (_match && _match.length >= 3) {
      var version = _match[2].split('.');

      return version.length > 0 ? parseInt(version[0]) : 0;
    }

    return 0;
  },

  get isWeixin() {
    if (typeof navigator === 'undefined') {
      return false;
    }

    var reg = /(micromessenger)\/([\d.]+)/;
    var match = reg.exec(navigator.userAgent.toLocaleLowerCase());

    if (match) {
      return true;
    }
  }

};
export default sniffer;