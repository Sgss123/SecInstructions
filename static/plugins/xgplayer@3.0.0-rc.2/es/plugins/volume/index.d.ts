export default Volume;
export type IVolumeConfig = {
    [propName: string]: any;
    position?: string;
    index?: number;
    disable?: boolean;
    showValueLabel?: boolean;
    default?: number;
};
/**
 * @typedef {{
 *   position?: string, // [可选]插件挂载的dom
 *   index?: number // [可选]插件在播放器中挂载的位置
 *   disable?: boolean, // [可选]是否禁用插件交互行为
 *   showValueLabel?: boolean, // [可选]是否显示当前滑动的音量数值
 *   default?: number // [可选]默认
 *   [propName: string]: any
 * }} IVolumeConfig
 */
declare class Volume extends Plugin {
    /**
     * @type IVolumeConfig
     */
    static get defaultConfig(): IVolumeConfig;
    changeMutedHandler: any;
    onBarMousedown(e: any): boolean;
    onMouseenter(e: any): void;
    onMouseleave(e: any): void;
    isMoving: boolean;
    updateVolumePos(height: any, event: any): void;
    /**
     * 修改音量数值标签
     *
     * @memberof Volume
     */
    updateVolumeValue(): void;
    changeMuted(e: any): void;
    onVolumeChange(): void;
    animate(muted: any, volume: any): void;
    initIcons(): void;
}
import Plugin from "../../plugin";
