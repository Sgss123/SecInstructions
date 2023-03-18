/**
 * @typedef { {
 *   position: string,
 *   index: number,
 *   disable: boolean,
 *   [propName: string]: any
 *  } } IDownloadConfig
 */
export default class Download extends Plugin {
    /**
     * @type IDownloadConfig
     */
    static get defaultConfig(): IDownloadConfig;
    constructor(args: any);
    timer: any;
    isLock: boolean;
    download: (e: any) => void;
    getAbsoluteURL(url: any): any;
}
export type IDownloadConfig = {
    [propName: string]: any;
    position: string;
    index: number;
    disable: boolean;
};
import Plugin from "../../plugin";
