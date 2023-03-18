export default DanmuIcon;
declare class DanmuIcon extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        onSwitch: (event: any, state: any) => void;
    };
    onStateChange(e: any): void;
    switchState(isOpen: any): void;
    initIcons(): void;
    switchTips(isOpen: any): void;
}
import Plugin from "../../plugin";
