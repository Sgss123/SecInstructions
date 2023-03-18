export default class PlayNextIcon extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        url: any;
        urlList: any[];
    };
    constructor(options: any);
    idx: number;
    initEvents(): void;
    nextHandler: any;
    playNext: (e: any) => void;
    changeSrc(url: any): void;
}
import Plugin from "../../plugin";
