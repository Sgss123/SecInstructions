export default sniffer;
export type ISniffer = {
    device: 'pc' | 'mobile';
    browser: 'ie' | 'firefox' | 'chrome' | 'opera' | 'safari';
    os: {
        isTablet: boolean;
        isPhone: boolean;
        isIpad: boolean;
        isIos: boolean;
        isAndroid: boolean;
        isPc: boolean;
        isSymbian: boolean;
        isWindowsPhone: boolean;
        isFireFox: boolean;
    };
    isWeixin: boolean;
};
/**
 * @type ISniffer
 */
declare const sniffer: ISniffer;
