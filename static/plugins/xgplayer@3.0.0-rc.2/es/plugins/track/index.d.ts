export default class TextTrack extends OptionsIcon {
    /**
     * @type ITextTrackConfig
     */
    static get defaultConfig(): ITextTrackConfig;
    curRate: number;
    subTitles: any;
    updateSubtitles(list?: any[], isDefaultOpen?: boolean): void;
}
export type ITextTrackConfig = {
    [propName: string]: any;
    position?: string;
    index?: string;
    list?: Array<{
        url: string;
        language?: string | number;
        id?: number | string;
        isDefault?: boolean;
        text?: any;
    }>;
    isDefaultOpen?: boolean;
    style?: {
        follow: boolean | null;
        mode?: 'stroke' | 'bg';
        followBottom?: number;
        fitVideo?: boolean;
        offsetBottom?: number;
        baseSizeX?: number;
        baseSizeY?: number;
        minSize?: number;
        minMobileSize?: number;
        line?: 'double' | 'single' | 'three';
        fontColor?: string;
    };
    closeText?: {
        text: string;
        iconText: string;
    };
    className?: string;
    hidePortrait?: boolean;
};
import OptionsIcon from "../common/optionsIcon";
