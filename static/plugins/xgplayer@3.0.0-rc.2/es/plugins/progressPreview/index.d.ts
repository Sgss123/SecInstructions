/** */
export default class ProgressPreview extends Plugin {
    /**
     * @type IProgressPreviewConfig
     */
    static get defaultConfig(): IProgressPreviewConfig;
    constructor(args: any);
    _ispots: any[];
    videoPreview: HTMLElement;
    videothumbnail: any;
    thumbnail: any;
    _state: {
        now: number;
        f: boolean;
    };
    previewLine: HTMLElement;
    timePoint: HTMLElement;
    timeText: HTMLElement;
    tipText: HTMLElement;
    _hasThumnail: boolean;
    bindEvents(): void;
    handlerPreviewClick: (e: any) => void;
    onMousemove: (e: any) => void;
    onMousedown: (e: any) => void;
    onProgressMove(data: any): void;
    onProgressDragStart(data: any): void;
    isDrag: boolean;
    onProgressDragEnd(data: any): void;
    updateLinePos(offset: any, cwidth: any): void;
    updateTimeText(timeStr: any): void;
    updatePosition(offset: any, cwidth: any, time: any, e: any): void;
    updateThumbnails(time: any): void;
    registerThumbnail(thumbnailConfig?: {}): void;
    calcuPosition(time: any, duration: any): {
        left: number;
        width: number;
        isMini: boolean;
    };
    showDot(id: any): void;
    showTips(text: any, isDefault: any, timeStr?: string): void;
    hideTips(): void;
}
export type IProgressPreviewConfig = {
    [propName: string]: any;
    miniWidth?: number;
    ispots?: {
        time?: number;
        text?: string;
        id?: number | string;
        duration: number | null;
        color?: string;
        style?: {
            [propName: string]: any;
        };
        width?: number;
        height?: number;
    }[];
    defaultText?: '';
    isFocusDots?: true;
    isShowThumbnail?: true;
    isShowCoverPreview?: false;
    mode?: 'short' | 'production';
};
import Plugin from "../../plugin";
