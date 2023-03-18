export default class InnerList {
    constructor(args: any);
    fragments: any;
    focusClass: string;
    style: any;
    duration: number;
    cachedIndex: number;
    playedIndex: number;
    updateDuration(duration: any): void;
    updateProgress(type?: string, data?: {
        newIndex: number;
        curIndex: number;
        millisecond: number;
    }): void;
    update(data: {
        cached: number;
        played: number;
    }, duration: any): void;
    findIndex(time: any, curIndex: any): any;
    findHightLight(): {
        dom: Element;
        pos: DOMRect;
    };
    findFragment(index: any): {
        dom: Element;
        pos: DOMRect;
    };
    unHightLight(): void;
    setHightLight(index: any): {
        dom: Element;
        pos: DOMRect;
    };
    destroy(): void;
    progressList: any;
    render(): HTMLElement;
    root: HTMLElement;
}
