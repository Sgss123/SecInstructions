export default class OptionsIcon extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        list: any[];
        listType: string;
        listStyle: {};
        hidePortrait: boolean;
    };
    constructor(args: any);
    isActive: boolean;
    curValue: any;
    curIndex: number;
    activeEvent: string;
    onEnter(e: any): void;
    onLeave(e: any): void;
    getTextByLang(item: any, key: any, lang: any): any;
    onToggle(isActive: any): void;
    onItemClick(e: any, data: any): void;
    curItem: any;
    changeCurrentText(): void;
    renderItemList(itemList: any, curIndex: any): void;
    optionsList: OptionList;
}
import Plugin from "../../plugin";
import OptionList from "./optionList";
