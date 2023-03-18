export default Progress;
export type IProgressConfig = {
    [propName: string]: any;
    position?: string;
    disable?: boolean;
    isDragingSeek?: boolean;
    closeMoveSeek?: boolean;
    isPauseMoving?: boolean;
    isCloseClickSeek?: boolean;
    fragments?: Array<{
        percent: number;
    }>;
    miniMoveStep?: number;
    miniStartStep?: number;
    onMoveStart?: () => any;
    onMoveEnd?: () => any;
};
/**
 * @typedef {{
 *   position?:string,
 *   disable?: boolean,
 *   isDragingSeek?: boolean, // 是否在拖拽的过程中更新currentTime
 *   closeMoveSeek?: boolean, // 是否关闭滑块seek能力
 *   isPauseMoving?: boolean, // 是否在move的时候暂停视频内容
 *   isCloseClickSeek?: boolean, // 是否关闭点击进度条的时候seek
 *   fragments?: Array<{percent: number}>,
 *   miniMoveStep?: number,
 *   miniStartStep?: number,
 *   onMoveStart?: () => any, // 手势开始移动回调,
 *   onMoveEnd?: () => any, // 手势移动结束回调
 *   [propName: string]: any
 * }} IProgressConfig
 */
/**
 * 进度条组件
 */
declare class Progress extends Plugin {
    /**
     * @type IProgressConfig
     */
    static get defaultConfig(): IProgressConfig;
    constructor(args: any);
    /**
     * @readonly
     */
    readonly useable: boolean;
    /**
     * @readonly
     */
    readonly isProgressMoving: boolean;
    /**
     * @private
     */
    private __dragCallBacks;
    /**
     * @private
     */
    private _state;
    get duration(): number;
    get timeOffset(): number;
    changeState(useable?: boolean): void;
    /**
     * @description 创建内部进度条，并挂载到xg-outer上,
     *              并把一些对外API绑定在progress上供外部调用
     *
     */
    createInner(): void;
    innerList: InnerList;
    pos: {
        x: number;
        y: number;
        moving: boolean;
        isDown: boolean;
        isEnter: boolean;
    };
    outer: HTMLElement;
    isMobile: boolean;
    progressBtn: HTMLElement;
    initCustomStyle(): void;
    /**
     * 触发某一类回调监听
     * @param { string } type 类型 drag/dragend
     * @param { any} data 具体数据
     */
    triggerCallbacks(type: string, data: any): void;
    /**
     * 供外部插件添加回调
     * @param {string} type 类型 drag/dragend
     * @param {function} handle 回调函数句柄
     */
    addCallBack(type: string, handle: Function): void;
    /**
     * 供外部插件移除回调
     * @param {string} type 类型 drag/dragend
     * @param {Function} event 回调函数句柄
     */
    removeCallBack(type: string, event: Function): void;
    bindDomEvents(): void;
    focus(): void;
    blur(): void;
    onMoveOnly: (e: any) => void;
    onBodyClick: (e: any) => void;
    onMouseDown: (e: any) => boolean;
    onMouseUp: (e: any) => void;
    onMouseMove: (e: any) => void;
    onMouseEnter: (e: any) => void;
    onMouseLeave: (e: any) => void;
    /**
     * @description 根据currenTime和占用百分比更新进度条
     * @param {Number} currentTime 需要更新到的时间
     * @param {Number} percent 更新时间占比
     * @param {Int} type 触发类型 0-down 1-move 2-up
     */
    updateWidth(currentTime: number, percent: number, type: any): void;
    computeTime(e: any): {
        percent: number;
        currentTime: number;
        offset: number;
        width: number;
        left: number;
        e: any;
    };
    /**
     * @description 更新时间插件，在拖拽状态下要接管时间插件的更新状态
     *             本位置会和time插件交互
     * @param {number} time 根据拖拽距离计算出的时间
     */
    updateTime(time: number): void;
    /**
     * @description 复位正在拖拽状态 ，拖拽的时候要避免timeupdate更新
     */
    resetSeekState(): void;
    /**
     * @description 拖拽过程中更新UI
     * @param {number} percent 小于0的小数
     *
     */
    updatePercent(percent: number, notSeek: any): void;
    /**
     * @description 播放进度更新
     */
    onTimeupdate(): void;
    /**
     * @description 缓存进度更新
     */
    onCacheUpdate(): void;
    onReset(): void;
    thumbnailPlugin: any;
}
import Plugin from "../../plugin";
import InnerList from "./innerList";
