export default Controls;
export type IControlsConfig = {
    [propName: string]: any;
    disable?: boolean;
    autoHide?: boolean;
    mode?: "flex" | "normal" | "bottom";
    initShow?: boolean;
};
/**
  * @typedef {{
  *   disable?: boolean,
  *   autoHide?: boolean,
  *   mode?: "flex"|"normal"|"bottom",
  *   initShow?: boolean,
  *   [propName: string]: any
  * }} IControlsConfig
  */
declare class Controls extends Plugin {
    /**
     * @type IControlsConfig
     */
    static get defaultConfig(): IControlsConfig;
    /**
     * @type { HTMLElement}
     * @readonly
     */
    readonly left: HTMLElement;
    /**
     * @type { HTMLElement}
     * @readonly
     */
    readonly center: HTMLElement;
    /**
     * @type { HTMLElement}
     * @readonly
     */
    readonly right: HTMLElement;
    /**
     * @type { HTMLElement}
     * @readonly
     */
    readonly innerRoot: HTMLElement;
    onMouseEnter: (e: any) => void;
    onMouseLeave: () => void;
    focus(): void;
    unFocus(): void;
    blur(): void;
    recoverAutoHide(): void;
    pauseAutoHide(): void;
    /**
     * @type {string}
     */
    get mode(): string;
}
import Plugin from "../../plugin";
