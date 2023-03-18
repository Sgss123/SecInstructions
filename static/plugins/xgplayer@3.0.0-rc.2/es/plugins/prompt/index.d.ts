export default Prompt;
/**
 * 消息组件
 */
declare class Prompt extends Plugin {
    static get defaultConfig(): {
        interval: number;
        style: {};
        mode: string;
        autoHide: boolean;
        detail: {
            text: string;
            highlight: string;
        };
        onClick: () => void;
    };
    intervalId: number | NodeJS.Timeout;
    customConfig: any;
    customOnClick: () => void;
}
import Plugin from "../../plugin";
