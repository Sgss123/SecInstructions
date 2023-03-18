export default DynamicBg;
export type IDynamicBgConfig = {
    [propName: string]: any;
    disable?: boolean;
    mode?: "realtime" | "firstframe" | "framerate";
    frameRate?: number;
    filter?: string;
    addMask?: boolean;
    maskBg?: string;
};
declare class DynamicBg extends Plugin {
    /**
     * @type IDynamicBgConfig
     */
    static get defaultConfig(): IDynamicBgConfig;
    /**
     * @type {boolean}
     * @description Does the current environment support Canvas
     */
    static get isSupport(): boolean;
    /**
     * @private
     */
    private _pos;
    /**
     * @readonly
     */
    readonly isStart: boolean;
    /**
     * @readonly
     */
    readonly videoPI: number;
    /**
     * @readonly
     */
    readonly preTime: number;
    /**
     * @readonly
     */
    readonly interval: number;
    /**
     * @readonly
     */
    readonly canvas: HTMLElement;
    /**
     * @readonly
     */
    readonly canvasCtx: any;
    onLoadedData: () => void;
    /**
     * @private
     */
    private init;
    mask: HTMLElement;
    start: () => void;
    frameId: any;
    stop: () => void;
    updateImg(url: any): void;
    update(video: any, videoWidth: any, videoHeight: any): void;
}
import Plugin from "../../plugin";
