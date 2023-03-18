export default class ScreenShot extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        quality: number;
        type: string;
        format: string;
        width: number;
        height: number;
        fitVideo: boolean;
        disable: boolean;
        name: string;
    };
    initSize: (data: any) => void;
    onClickBtn(e: any): void;
    saveScreenShot(data: any, filename: any): void;
    createCanvans(width: any, height: any): void;
    canvasCtx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    shot(width: any, height: any, option?: {
        quality: number;
        type: string;
    }): Promise<any>;
}
import Plugin from "../../plugin";
