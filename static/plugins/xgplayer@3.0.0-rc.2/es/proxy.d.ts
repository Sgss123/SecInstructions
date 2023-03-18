export default VideoProxy;
export type IVideoProxy = {
    duration: number;
    currentTime: number;
    muted: boolean;
    defaultMuted: boolean;
    volume: number;
    playbackRate: number;
    defaultPlaybackRate: number;
    autoplay: boolean;
    readonly paused: boolean;
    readonly ended: boolean;
    readonly networkState: number;
    readonly readyState: number;
    readonly seeking: boolean;
    src: any;
    play: Function;
    pause: Function;
};
declare class VideoProxy {
    /**
     * @param {any} options
     */
    constructor(options: any);
    /**
     * @private
     */
    private _currentTime;
    /**
     * @private
     */
    private _duration;
    /**
     * @description 初始化时添加在video上的属性集合
     * @type { {[propName: string]: any; } }
     */
    videoConfig: {
        [propName: string]: any;
    };
    /**
     * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null }
     */
    video: HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null;
    /**
     * @private
     */
    private _interval;
    /**
     * @readonly
     */
    readonly videoEventMiddleware: {};
    /**
     * @description set middleware
     * @param { {[propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
     */
    setEventsMiddleware(middlewares: {
        [propName: string]: (e: {
            player: any;
            eventName: string;
        }, callback: () => void) => any;
    }): void;
    /**
     * @description remove middleware
     * @param { { [propName: string]: (e: {player: any, eventName: string}, callback: () => void) => any} } middlewares
     */
    removeEventsMiddleware(middlewares: {
        [propName: string]: (e: {
            player: any;
            eventName: string;
        }, callback: () => void) => any;
    }): void;
    /**
     * Add media eventListener to the video object
     * @param { any } [video]
     */
    attachVideoEvents(video?: any): void;
    /**
     * @private
     */
    private _evHandlers;
    /**
     * @description remove media eventListener from the video object
     * @param { any } [video]
     */
    detachVideoEvents(video?: any): void;
    /**
     * @description Media Error handler
     * @param { string } eventName
     */
    errorHandler(name: any, error?: any): void;
    destroy(): void;
    /**
     *
     * @returns {  Promise<void> | null }
     */
    play(): Promise<void> | null;
    pause(): void;
    /**
     *
     * @param { string } type
     * @returns { boolean }
     */
    canPlayType(type: string): boolean;
    /**
     *
     * @param { any } [buffered]
     * @returns { Array<number> }
     */
    getBufferedRange(buffered?: any): Array<number>;
    /**
     * @type { boolean }
     * @description 设置/返回 自动播放属性
     */
    set autoplay(arg: any);
    get autoplay(): any;
    /**
     * @type { TimeRanges }
     * @description  返回当前缓冲的TimeRange对象集合
     */
    get buffered(): TimeRanges;
    /**
     * @type { Array<{start: number, end: number}> }
     * @description  返回当前自定义的缓存列表
     */
    get buffered2(): {
        start: number;
        end: number;
    }[];
    /**
     * @type { {start: number, end: number} }
     */
    get bufferedPoint(): {
        start: number;
        end: number;
    };
    set crossOrigin(arg: string);
    /**
     * @type { string}
     * @description 设置/返回是否跨域
     * */
    get crossOrigin(): string;
    set currentSrc(arg: string);
    /**
     * @type { string }
     * @description 设置/返回视频播放地址
     * */
    get currentSrc(): string;
    set currentTime(arg: number);
    /**
     * @type { number }
     * @description 设置/返回视频当前播放时间
     * */
    get currentTime(): number;
    set defaultMuted(arg: boolean);
    /**
     * @type { boolean }
     * 设置/返回视频默认静音
     * */
    get defaultMuted(): boolean;
    /**
     * @type { number }
     * @description 返回视频时长，单位：s
     * */
    get duration(): number;
    /**
     * @type { boolean }
     * @description  回视频是否播放结束
     * */
    get ended(): boolean;
    /**
     * @type { MediaError }
     * @description the player current error
     */
    get error(): MediaError;
    /**
     * @type { string }
     * @description return error description text
     */
    get errorNote(): string;
    set loop(arg: boolean);
    /**
     * @type { boolean }
     * @description 否开启了循环播放
     */
    get loop(): boolean;
    set muted(arg: boolean);
    /**
     * @type { boolean }
     * @description 静音
     */
    get muted(): boolean;
    /**
     * @type { number }
     * @description  返回视频的当前网络状态
     */
    get networkState(): number;
    /**
     * @type { boolean }
     * @description  回当前视频是否是暂停状态
     */
    get paused(): boolean;
    set playbackRate(arg: number);
    /**
     * @type { number }
     * @description 返回/设置倍速
     */
    get playbackRate(): number;
    /**
     * @type { TimeRanges }
     */
    get played(): TimeRanges;
    set preload(arg: boolean);
    /**
     * @type { boolean }
     */
    get preload(): boolean;
    /**
     * @type { string }
     * @description 回视频的就绪状态
     */
    get readyState(): string;
    /**
     * @type { boolean }
     * @description 当前视频是否可以seek
     */
    get seekable(): boolean;
    /**
     * @type { boolean }
     * @description 当前视频是否处于seeking状态下
     */
    get seeking(): boolean;
    set src(arg: any);
    /**
     * @type { any }
     * @description 设置/返回当前视频的地址
     */
    get src(): any;
    set volume(arg: number);
    /**
     * @type { number }
     * @description 设置/返回视频的音量
     */
    get volume(): number;
    /** ******************* 以下api只有申明作用,具体实现依赖EventEmitter ******************/
    /**
     *
     * @param { string } event
     * @param { any } [data]
     * @returns
     */
    emit(event: string, data?: any, ...args: any[]): void;
    /**
     *
     * @param { string } event
     * @param { (data?: any) => any } callback
     * @returns
     */
    on(event: string, callback: (data?: any) => any, ...args: any[]): void;
    /**
     *
     * @param { string } event
     * @param { (data?: any) => any } callback
     * @returns
     */
    once(event: string, callback: (data?: any) => any, ...args: any[]): void;
    /**
     *
     * @param { string } event
     * @param { (data?: any) => any } callback
     * @returns
     */
    off(event: string, callback: (data?: any) => any, ...args: any[]): void;
    offAll(): void;
}
