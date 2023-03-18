export default Replay;
declare class Replay extends Plugin {
    static get defaultConfig(): {
        disable: boolean;
    };
    __handleReplay: any;
    handleReplay(e: any): void;
    enable(): void;
    disable(): void;
}
import Plugin from "../../plugin";
