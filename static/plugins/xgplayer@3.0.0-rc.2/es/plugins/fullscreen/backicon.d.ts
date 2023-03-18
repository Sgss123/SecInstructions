export default class TopBackIcon extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
    };
    onClick: (e: any) => void;
    initIcons(): void;
}
import Plugin from "../../plugin";
