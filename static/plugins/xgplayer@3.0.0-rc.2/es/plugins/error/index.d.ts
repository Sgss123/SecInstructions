export default class ErrorPlugin extends Plugin {
    clickHandler: any;
    onError: any;
    errorRetry(): void;
    handleCanPlay(): void;
    handleError(error?: {}): void;
}
import Plugin from "../../plugin";
