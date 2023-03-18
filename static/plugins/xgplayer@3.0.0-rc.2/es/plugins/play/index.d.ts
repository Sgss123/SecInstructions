export default Play;
declare class Play extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        disable: boolean;
    };
    btnClick(e: any): boolean;
    initIcons(): void;
    animate(paused: any): void;
}
import Plugin from "../../plugin";
