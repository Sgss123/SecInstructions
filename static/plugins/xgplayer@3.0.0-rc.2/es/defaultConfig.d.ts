/**
 * @typedef { {
 *   id?: string,
 *   el?: HTMLElement,
 *   url?: any,
 *   nullUrlStart?: boolean,
 *   width?: number | string,
 *   height?: number | string,
 *   fluid?: boolean,
 *   fitVideoSize?: 'fixWidth'|'fixHeight'|'fixed',
 *   videoFillMode?: 'auto'|'fillHeight'|'fillWidth'|'fill'|'cover',
 *   volume?: number | { [propName: string]: any },
 *   autoplay?: boolean,
 *   autoplayMuted?: boolean,
 *   loop?: boolean,
 *   isLive?: boolean,
 *   zoom?: number,
 *   videoInit?: boolean,
 *   poster?: string | { [propName: string]: any },
 *   isMobileSimulateMode?: 'mobile' | 'pc',
 *   defaultPlaybackRate?: number,
 *   execBeforePluginsCall?: () => any,
 *   allowSeekAfterEnded?: boolean,
 *   enableContextmenu?: boolean,
 *   closeVideoClick?: boolean,
 *   closeVideoDblclick?: boolean,
 *   closePlayerBlur?: boolean,
 *   closeDelayBlur?: boolean,
 *   leavePlayerTime?: number,
 *   closePlayVideoFocus?: boolean,
 *   closePauseVideoFocus?: boolean,
 *   closeFocusVideoFocus?: boolean,
 *   closeControlsBlur?: boolean,
 *   videoAttributes?: { [propName: string]: any },
 *   startTime?: number,
 *   seekedStatus?: 'play' | 'pause' | 'auto',
 *   miniprogress?: boolean,
 *   disableSwipeHandler?: () => any,
 *   enableSwipeHandler?: () => any,
 *   ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>,
 *   inactive?: number,
 *   lang?: string,
 *   controls?: boolean | { [propName: string]: any },
 *   marginControls?: boolean,
 *   screenShot?: boolean | { [propName: string]: any },
 *   rotate?: boolean | { [propName: string]: any },
 *   pip?: boolean | { [propName: string]: any },
 *   download?: boolean | { [propName: string]: any },
 *   mini?: boolean | { [propName: string]: any },
 *   cssFullscreen?: boolean | { [propName: string]: any },
 *   keyShortcut?: boolean,
 *   presets?: any[],
 *   plugins?: any[]
 *   playbackRate?: number | Array<number> | { [propName: string]: any },
 *   playsinline?: boolean,
 *   customDuration?: number,
 *   timeOffset?: number,
 *   icons?: { [propName: string]: string | HTMLElement | () => HTMLElement | string },
 *   i18n?: Array<any>,
 *   thumbnail?: {
 *     urls: Array<string>,
 *     pic_num: number,
 *     col: number,
 *     row: number,
 *     height?: number,
 *     width?: number,
 *   },
 *   videoConfig?: { [propName: string]: any },
 *   commonStyle?: {
 *     progressColor?: string,
 *     playedColor?: string,
 *     cachedColor?: string,
 *     sliderBtnStyle?: { [propName: string]: any },
 *     volumeColor?: string
 *   },
 *   [propName: string]: any;
 * } } IPlayerOptions
 */
/**
 *
 * @returns { IPlayerOptions }
 */
export default function getDefaultConfig(): IPlayerOptions;
export type IPlayerOptions = {
    [propName: string]: any;
    id?: string;
    el?: HTMLElement;
    url?: any;
    nullUrlStart?: boolean;
    width?: number | string;
    height?: number | string;
    fluid?: boolean;
    fitVideoSize?: 'fixWidth' | 'fixHeight' | 'fixed';
    videoFillMode?: 'auto' | 'fillHeight' | 'fillWidth' | 'fill' | 'cover';
    volume?: number | {
        [propName: string]: any;
    };
    autoplay?: boolean;
    autoplayMuted?: boolean;
    loop?: boolean;
    isLive?: boolean;
    zoom?: number;
    videoInit?: boolean;
    poster?: string | {
        [propName: string]: any;
    };
    isMobileSimulateMode?: 'mobile' | 'pc';
    defaultPlaybackRate?: number;
    execBeforePluginsCall?: () => any;
    allowSeekAfterEnded?: boolean;
    enableContextmenu?: boolean;
    closeVideoClick?: boolean;
    closeVideoDblclick?: boolean;
    closePlayerBlur?: boolean;
    closeDelayBlur?: boolean;
    leavePlayerTime?: number;
    closePlayVideoFocus?: boolean;
    closePauseVideoFocus?: boolean;
    closeFocusVideoFocus?: boolean;
    closeControlsBlur?: boolean;
    videoAttributes?: {
        [propName: string]: any;
    };
    startTime?: number;
    seekedStatus?: 'play' | 'pause' | 'auto';
    miniprogress?: boolean;
    disableSwipeHandler?: () => any;
    enableSwipeHandler?: () => any;
    ignores?: Array<'cssfullscreen' | 'screenshot' | 'pip' | 'miniscreen' | 'keyboard' | 'download' | 'playbackrate' | 'time' | 'definition' | 'error' | 'fullscreen' | 'loading' | 'mobile' | 'pc' | 'play' | 'poster' | 'progress' | 'replay' | 'start' | 'volume' | string>;
    inactive?: number;
    lang?: string;
    controls?: boolean | {
        [propName: string]: any;
    };
    marginControls?: boolean;
    screenShot?: boolean | {
        [propName: string]: any;
    };
    rotate?: boolean | {
        [propName: string]: any;
    };
    pip?: boolean | {
        [propName: string]: any;
    };
    download?: boolean | {
        [propName: string]: any;
    };
    mini?: boolean | {
        [propName: string]: any;
    };
    cssFullscreen?: boolean | {
        [propName: string]: any;
    };
    keyShortcut?: boolean;
    presets?: any[];
    plugins?: any[];
    playbackRate?: number | number[] | {
        [propName: string]: any;
    };
    playsinline?: boolean;
    customDuration?: number;
    timeOffset?: number;
    icons?: {
        [propName: string]: string | HTMLElement | (() => HTMLElement | string);
    };
    i18n?: Array<any>;
    thumbnail?: {
        urls: Array<string>;
        pic_num: number;
        col: number;
        row: number;
        height?: number;
        width?: number;
    };
    videoConfig?: {
        [propName: string]: any;
    };
    commonStyle?: {
        progressColor?: string;
        playedColor?: string;
        cachedColor?: string;
        sliderBtnStyle?: {
            [propName: string]: any;
        };
        volumeColor?: string;
    };
};
