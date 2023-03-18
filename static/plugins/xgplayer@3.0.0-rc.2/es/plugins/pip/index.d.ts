export default PIP;
declare class PIP extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        showIcon: boolean;
    };
    static checkWebkitSetPresentationMode(video: any): boolean;
    pMode: any;
    initIcons(): void;
    initPipEvents(): void;
    leavePIPCallback: () => void;
    enterPIPCallback: (e: any) => void;
    pipWindow: any;
    onWebkitpresentationmodechanged: (e: any) => void;
    switchPIP: (e: any) => boolean;
    requestPIP(): boolean;
    /**
     * 退出画中画
     */
    exitPIP(): boolean;
    get isPip(): boolean;
    isPIPAvailable(): boolean;
}
import Plugin from "../../plugin";
