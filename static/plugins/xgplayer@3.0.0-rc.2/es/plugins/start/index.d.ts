export default Start;
export type IStartConfig = {
    [propName: string]: any;
    isShowPause?: boolean;
    isShowEnd?: boolean;
    disableAnimate?: boolean;
    mode?: 'hide' | 'show' | 'auto';
};
declare class Start extends Plugin {
    /**
     * @type IStartConfig
     */
    static get defaultConfig(): IStartConfig;
    constructor(args: any);
    autoPlayStart: boolean;
    clickHandler: any;
    preventDefault(e: any): void;
    initIcons(): void;
    focusHide(): void;
    recover(): void;
    switchStatus(isAnimate: any): void;
    animate(endShow: any): void;
    switchPausePlay(e: any): void;
    onPlayPause(status: any): void;
}
import Plugin from "../../plugin";
