export default MiniScreenIcon;
declare class MiniScreenIcon extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
    };
    getMini(): void;
    exitMini(): void;
}
import Plugin from "../../plugin";
