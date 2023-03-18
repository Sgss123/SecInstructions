export default I18N;
export type IXGI18nText = {
    LANG: string;
    TEXT: {
        [propName: string]: string;
    };
};
declare namespace I18N {
    export { extend };
    export { use };
}
/**
 * @param { Array<IXGI18nText> } XGI18nTexts
 */
declare function extend(XGI18nText: any): void;
/**
 * @param { IXGI18nText } langData
 */
declare function use(langData: IXGI18nText): void;
