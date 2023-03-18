export type IPlayerOptions = import('./defaultConfig').IPlayerOptions;
declare class Player extends VideoProxy {
    /**
     * @type {number}
     * @description set debugger level
     *  1 - only print error logs
     *  2 - print warn logs and error logs
     *  3 - print all debug logs and error stack logs
     */
    static set debugger(arg: number);
    static get debugger(): number;
    /***
     * @deprecated
     * 插件全部迁移完成再做删除
     */
    static install(name: any, descriptor: any): void;
    /***
     * @deprecated
     * 插件全部迁移完成再做删除
     */
    static use(name: any, descriptor: any): void;
    static defaultPreset: any;
    /**
     * @description 自定义media构造函数
     */
    static XgVideoProxy: any;
    /**
     * @param { IPlayerOptions } options
     */
    constructor(options: IPlayerOptions);
    /**
     * @type { IPlayerOptions }
     * @description 当前播放器的配置信息
     */
    config: IPlayerOptions;
    userTimer: number;
    /**
     * @private
     */
    private waitTimer;
    /**
     * @private
     */
    private _state;
    /**
     * @private
     */
    private _hasStart;
    /**
     * Whether the player is in the seeking state
     * @type { boolean }
     * @readonly
     */
    readonly isSeeking: boolean;
    /**
     * @type { boolean }
     * @readonly
     */
    readonly isCanplay: boolean;
    /**
     * @private
     * @readonly
     */
    private readonly _runPending;
    /**
     *  @type { number }
     */
    rotateDeg: number;
    /**
     * Whether the player is focus
     * @type { boolean }
     * @readonly
     */
    readonly isActive: boolean;
    /**
     * @type { boolean }
     * @readonly
     */
    readonly isCssfullScreen: boolean;
    /**
     * Whether player is currently in fullscreen
     * @type { boolean }
     * @readonly
     */
    readonly fullscreen: boolean;
    /**
     * fullscreenElement
     * @type { HTMLElement | null }
     * @readonly
     */
    readonly _fullscreenEl: HTMLElement | null;
    /**
     * cssFullscreen target Element
     * @type { HTMLElement | null }
     * @readonly
     */
    readonly _cssfullscreenEl: HTMLElement | null;
    /**
     * @private
     * @type { string }
     */
    private _orgCss;
    /**
     * @readonly
     * @type { number }
     */
    readonly _fullScreenOffset: number;
    /**
     * @private
     * @type { number }
     */
    private _videoHeight;
    /**
     * @private
     * @type { number }
     */
    private _videoWidth;
    /**
     * @private
     * @type { { begin: number, end:number, acc: number } }
     */
    private _played;
    /**
     * @type { null | HTMLElement }
     * @readonly
     * @description  控制栏和video不同布局的时候内部容器
     */
    readonly innerContainer: null | HTMLElement;
    /**
     * @type { null | Object }
     * @readonly
     * @description 控制栏插件
     */
    readonly controls: null | any;
    /**
     * @type { null | HTMLElement }
     * @readonly
     */
    readonly topBar: null | HTMLElement;
    /**
     * @type { null | HTMLElement }
     * @readonly
     * @description 当前播放器根节点
     */
    readonly root: null | HTMLElement;
    /**
     * @readonly
     * @type {any}
     */
    readonly database: any;
    /**
     * init control domElement
     * @private
     */
    private _initDOM;
    /**
     * @private
     */
    private _initBaseDoms;
    /**
     * @readonly
     * @type { HTMLElement }
     */
    readonly leftBar: HTMLElement;
    /**
     * @readonly
     * @type { HTMLElement }
     */
    readonly rightBar: HTMLElement;
    /**
     * @private
     */
    private _bindEvents;
    /**
     * @private
     */
    private onFullscreenChange;
    _fullActionFrom: string;
    /**
     * @private
     */
    private __webkitbeginfullscreen;
    /**
     * @private
     */
    private __webkitendfullscreen;
    playFunc: () => void;
    /**
     * @private
     */
    private _unbindEvents;
    /**
     *
     * @param { any } url
     * @returns
     */
    _startInit(url: any): void;
    canPlayFunc: any;
    set hasStart(arg: boolean);
    /**
     * @type { boolean }
     * @description 是否开始播放
     */
    get hasStart(): boolean;
    /**
     * 针对source列表播放方式添加错误监听
     * @doc https://stackoverflow.com/questions/47557135/html5-detect-the-type-of-error-when-trying-to-load-a-video-using-a-source-elem
     * @protected
     * @param { HTMLVideoElement | HTMLAudioElement } video
     */
    protected _attachSourceEvents(video: HTMLVideoElement | HTMLAudioElement): void;
    /**
     * @private
     */
    private _videoSourceCount;
    _sourceError: (e: any) => void;
    /**
     * 移除source列表错误事件监听
     * @protected
     * @param { HTMLVideoElement | HTMLAudioElement } video
     */
    protected _detachSourceEvents(video: HTMLVideoElement | HTMLAudioElement): void;
    /**
     * 注册组件 组件列表config.plugins
     * @private
     */
    private _registerPlugins;
    /**
     * @private
     */
    private _loadingPlugins;
    /**
     * @private
     */
    private _registerPresets;
    /**
     *
     * @param { {plugin: function, options:object} | function } plugin
     * @param { {[propName: string]: any;} } [config]
     * @returns { any } plugin
     */
    registerPlugin(plugin: Function | {
        plugin: Function;
        options: object;
    }, config?: {
        [propName: string]: any;
    }): any;
    /**
     *
     * @param { any } plugin
     */
    deregister(plugin: any): void;
    /**
     *
     * @param { any } plugin
     */
    unRegisterPlugin(plugin: any): void;
    /**
     * 当前播放器挂载的插件实例列表
     * @type { {[propName: string]: any | null } }
     */
    get plugins(): {
        [propName: string]: any;
    };
    /**
     * get a plugin instance
     * @param { string } pluginName
     * @return { null | any } plugin
     */
    getPlugin(pluginName: string): null | any;
    /**
     *
     * @param { string } className
     */
    addClass(className: string): void;
    /**
     *
     * @param { string } className
     * @returns
     */
    removeClass(className: string): void;
    /**
     *
     * @param { string } className
     * @returns { boolean } has
     */
    hasClass(className: string): boolean;
    /**
     *
     * @param { string } key
     * @param { any } value
     * @returns void
     */
    setAttribute(key: string, value: any): void;
    /**
     *
     * @param { string } key
     * @param { any } value
     * @returns void
     */
    removeAttribute(key: string, value: any): void;
    /**
     *
     * @param { any } url
     * @returns { Promise<void> | void }
     * @description 启动播放器，start一般都是播放器内部隐式调用，主要功能是将video添加到DOM
     */
    start(url: any): Promise<void> | void;
    load(): void;
    videoPlay(): Promise<void>;
    /**
     * @private
     */
    private _errorTimer;
    videoPause(): void;
    /**
     *
     * @param { number } time
     * @returns
     */
    seek(time: number): void;
    reload(): void;
    /**
     * @private
     */
    private reloadFunc;
    resetState(): void;
    replay(): void;
    retry(): void;
    /**
     *
     * @param { HTMLElement } [root]
     * @param { HTMLElement } [el]
     * @param { string } [rootClass]
     * @param { string } [pClassName]
     */
    changeFullStyle(root?: HTMLElement, el?: HTMLElement, rootClass?: string, pClassName?: string): void;
    /**
     * @private
     */
    private _orgPCss;
    /**
     *
     * @param { HTMLElement } [root]
     * @param { HTMLElement } [el]
     * @param { string } [rootClass]
     * @param { string } [pClassName]
     */
    recoverFullStyle(root?: HTMLElement, el?: HTMLElement, rootClass?: string, pClassName?: string): void;
    /**
     * @param { HTMLElement } [el]
     * @returns { Promise<void>; }
     */
    getFullscreen(el?: HTMLElement): Promise<void>;
    /**
     * @param { HTMLElement } [el]
     * @returns { Promise<void>; }
     */
    exitFullscreen(el?: HTMLElement): Promise<void>;
    /**
     * @param { HTMLElement } [el]
     * @returns
     */
    getCssFullscreen(el?: HTMLElement): void;
    /**
     * @param { HTMLElement } [el]
     * @returns
     */
    exitCssFullscreen(): void;
    /**
     * @description 播放器焦点状态，控制栏显示
     * @param { {
     *   autoHide?: boolean, // 是否可以自动隐藏
     *   delay?: number // 自动隐藏的延迟时间，ms, 不传默认使用3000ms
     * } } [data]
     */
    focus(data?: {
        autoHide?: boolean;
        delay?: number;
    }): void;
    /**
     * @description 取消播放器当前焦点状态
     * @param { { ignorePaused?: boolean } } [data]
     */
    blur(data?: {
        ignorePaused?: boolean;
    }): void;
    /**
     * @protected
     * @param { { autoHide?: boolean, delay?: number} } [data]
     * @returns
     */
    protected onFocus(data?: {
        autoHide?: boolean;
        delay?: number;
    }): void;
    /**
     * @protected
     * @param {{ ignorePaused?: boolean }} [data]
     * @returns
     */
    protected onBlur(data?: {
        ignorePaused?: boolean;
    }): void;
    /**
     * @protected
     */
    protected onCanplay(): void;
    /**
     * @protected
     */
    protected onPlay(): void;
    /**
     * @protected
     */
    protected onPause(): void;
    /**
     * @protected
     */
    protected onEnded(): void;
    /**
     * @protected
     */
    protected onError(): void;
    /**
     * @protected
     */
    protected onSeeking(): void;
    /**
     * @protected
     */
    protected onSeeked(): void;
    /**
     * @protected
     */
    protected onWaiting(): void;
    /**
     * @protected
     */
    protected onPlaying(): void;
    /**
     * @protected
     */
    protected onTimeupdate(): void;
    /**
     *
     * @param { number } time
     * @returns { boolean }
     */
    checkBuffer(time: number): boolean;
    /**
     * @description position video/audio according to height ratio and y coordinate
     * @param { { h: number, y?: number } } pos
     * @returns
     */
    position(pos?: {
        h: number;
        y?: number;
    }): void;
    resize(): void;
    /**
     *
     * @param { number } left
     * @param { number } top
     * @returns
     */
    updateObjectPosition(left?: number, top?: number): void;
    /**
     * @protected
     * @param { number } newState
     */
    protected setState(newState: number): void;
    /**
     * @readonly
     * @type { number }
     */
    readonly get state(): number;
    /**
     * @type { string }
     */
    set lang(arg: string);
    get lang(): string;
    get i18n(): {
        [propName: string]: string;
    };
    get i18nKeys(): {};
    /**
     * @type { string }
     */
    get version(): string;
    /**
     * @type { any }
     */
    set url(arg: any);
    get url(): any;
    /**
     * @private
     */
    private __url;
    /**
     * @type { string }
     */
    set poster(arg: any);
    get poster(): any;
    /**
     * @type { boolean }
     */
    get fullscreenChanging(): boolean;
    /**
     * 累计观看时长
     * @type number
     */
    get cumulateTime(): number;
    /**
     * @type { number }
     */
    set zoom(arg: number);
    /**
    * @type { number }
    */
    get zoom(): number;
    /**
     * @param { string } hookName
     * @param { Function } handler
     * @param { {pre: Function| null , next: Function | null} } preset
     * @returns
     */
    hook(hookName: string, handler: Function, preset?: {
        pre: Function | null;
        next: Function | null;
    }, ...args: any[]): any;
    /**
     * @param { string } hookName
     * @param { (player: any, ...args) => boolean | Promise<any> } handler
     * @param  {...any} args
     * @returns {boolean} isSuccess
     */
    useHooks(hookName: string, handler: (player: any, ...args: any[]) => boolean | Promise<any>, ...args: any[]): boolean;
    /**
     *
     * @param { string } pluginName
     * @param { string } hookName
     * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
     * @param  {...any} args
     * @returns { boolean } isSuccess
     */
    usePluginHooks(pluginName: string, hookName: string, handler: (plugin: any, ...args: any[]) => boolean | Promise<any>, ...args: any[]): boolean;
}
import Plugin from "./plugin/plugin";
import BasePlugin from "./plugin/basePlugin";
import * as Events from "./events";
import Errors from "./error";
import Sniffer from "./utils/sniffer";
import Util from "./utils/util";
import STATE_CLASS from "./stateClassMap";
import I18N from "./lang/i18n";
import VideoProxy from "./proxy";
export { Player as default, Plugin, BasePlugin, Events, Errors, Sniffer, Util, STATE_CLASS, I18N };
