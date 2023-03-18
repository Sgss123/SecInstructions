export default Enter;
export type IEnterConfig = {
    [propName: string]: any;
    innerHtml?: string;
};
/**
  * @typedef { {
  *   innerHtml?: string,
  *   [propName: string]: any
  * } } IEnterConfig
  */
declare class Enter extends Plugin {
    /**
     * @type IEnterConfig
     */
    static get defaultConfig(): IEnterConfig;
}
import Plugin from "../../plugin";
