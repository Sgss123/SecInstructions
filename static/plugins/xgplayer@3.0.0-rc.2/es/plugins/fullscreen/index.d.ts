/**
 * @typedef { {
 *   position?: string,
 *   index?: number,
 *   useCssFullscreen?: boolean,
 *   rotateFullscreen?: boolean,
 *   switchCallback?: () => any,
 *   target?: null | HTMLElement,
 *   disable?: boolean,
 *   needBackIcon?: boolean,
 *   [propName: string]: any
 * } } IFullscreenConfig
 */
export default class Fullscreen extends Plugin {
    /**
     * @type IFullscreenConfig
     */
    static get defaultConfig(): IFullscreenConfig;
    handleFullscreen: any;
    topBackIcon: any;
    /**
     * @private
     */
    private _onOrientationChange;
    initIcons(): void;
    setRotateDeg(deg: any): void;
    /**
     * 进入旋转全屏
     * @param { HTMLElement } [el]
     */
    getRotateFullscreen(el?: HTMLElement): void;
    /**
     * 退出旋转全屏
     * @param { HTMLElement } [el]
     */
    exitRotateFullscreen(el?: HTMLElement): void;
    /**
     * 进入旋转全屏
     * @param { Event } [e]
     */
    changeFullScreen(e?: Event): void;
    /**
     *
     * @param { boolean } isFullScreen
     */
    animate(isFullScreen: boolean): void;
}
export type IFullscreenConfig = {
    [propName: string]: any;
    position?: string;
    index?: number;
    useCssFullscreen?: boolean;
    rotateFullscreen?: boolean;
    switchCallback?: () => any;
    target?: null | HTMLElement;
    disable?: boolean;
    needBackIcon?: boolean;
};
import Plugin from "../../plugin";
