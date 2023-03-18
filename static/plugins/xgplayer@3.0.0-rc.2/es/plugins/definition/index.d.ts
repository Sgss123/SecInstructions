/**
 * @typedef {{
 *   text?: string,
 *   text?: string,
 *   definition?: any
 * }} IDefinition
 */
/**
 * @typedef {{
 *   position?: string,
 *   index?: string,
 *   list?: Array<IDefinition>,
 *   disable?: any,
 *   hidePortrait?: boolean,
 *   className?: string
 * }} IDefinitionConfig
 */
export default class DefinitionIcon extends OptionsIcon {
    /**
     * @type IDefinitionConfig
     */
    static get defaultConfig(): IDefinitionConfig;
    curTime: number;
    isPaused: boolean;
    onCanplayChangeDefinition(): void;
    onTimeupdateChangeDefinition(): void;
    switchUrl(lastATag: any): void;
    changeDefinitionList(list: any): void;
    changeDefinition(to: any): void;
}
export type IDefinition = {
    text?: string;
    text?: string;
    definition?: any;
};
export type IDefinitionConfig = {
    position?: string;
    index?: string;
    list?: Array<IDefinition>;
    disable?: any;
    hidePortrait?: boolean;
    className?: string;
};
import OptionsIcon from "../common/optionsIcon";
