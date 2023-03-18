export default class Rotate extends Plugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        innerRotate: boolean;
        clockwise: boolean;
        rotateDeg: number;
        disable: boolean;
    };
    constructor(args: any);
    rotateDeg: any;
    onBtnClick(e: any): void;
    updateRotateDeg(rotateDeg: any, innerRotate: any): void;
    rotate(clockwise?: boolean, innerRotate?: boolean, times?: number): void;
}
import Plugin from "../../plugin";
