/**
  * @typedef { {
  *  position: string,
  *  index: number,
  *  disable: boolean,
  *  target: null | HTMLElement,
  *  [propName: string]: any
  * } } ICssConfig
  */
export default class CssFullScreen extends Plugin {
    /**
     * @type ICssConfig
     */
    static get defaultConfig(): ICssConfig;
    btnClick(e: any): void;
    initIcons(): void;
    animate(isFullScreen: any): void;
    switchTips(isFullScreen: any): void;
}
export type ICssConfig = {
    [propName: string]: any;
    position: string;
    index: number;
    disable: boolean;
    target: null | HTMLElement;
};
import Plugin from "../../plugin";
