export type Player = import('./player').default;
export type IError = {
    [propName: string]: any;
    playerVersion: string;
    currentTime: number;
    duration: number;
    ended: boolean;
    readyState: number;
    networkState: number;
    src: any;
    errorType: string;
    errorCode: number;
    message: string;
    mediaError?: {
        code: number;
        message?: string;
    };
    originError?: any;
    url?: any;
};
/**
 * @typedef { {
 *   playerVersion: string,
 *   currentTime: number,
 *   duration: number,
 *   ended: boolean,
 *   readyState: number,
 *   networkState: number,
 *   src: any,
 *   errorType: string,
 *   errorCode: number,
 *   message: string,
 *   mediaError?: {
 *     code: number,
 *     message?: string
 *   },
 *   originError?: any,
 *   url?: any,
 *   [propName: string]: any
 * } } IError
 */
/**
 * @type { IError }
 */
declare class Errors {
    /**
     *
     * @param { Player } player
     * @param { {
     * errorType: string,
     * errorCode: number,
     * errorMessage: string,
     * originError: any,
     * ext: { [propName: string]: any; }
     * } } errorInfo
     * @returns
     */
    constructor(player: Player, errorInfo?: {
        errorType: string;
        errorCode: number;
        errorMessage: string;
        originError: any;
        ext: {
            [propName: string]: any;
        };
    }, ...args: any[]);
}
export namespace ErrorTypes {
    namespace network {
        const code: number;
        const msg: string;
        const remark: string;
    }
    namespace mse {
        const code_1: number;
        export { code_1 as code };
        const msg_1: string;
        export { msg_1 as msg };
        const remark_1: string;
        export { remark_1 as remark };
    }
    namespace parse {
        const code_2: number;
        export { code_2 as code };
        const msg_2: string;
        export { msg_2 as msg };
        const remark_2: string;
        export { remark_2 as remark };
    }
    namespace format {
        const code_3: number;
        export { code_3 as code };
        const msg_3: string;
        export { msg_3 as msg };
        const remark_3: string;
        export { remark_3 as remark };
    }
    namespace decoder {
        const code_4: number;
        export { code_4 as code };
        const msg_4: string;
        export { msg_4 as msg };
        const remark_4: string;
        export { remark_4 as remark };
    }
    namespace runtime {
        const code_5: number;
        export { code_5 as code };
        const msg_5: string;
        export { msg_5 as msg };
        const remark_5: string;
        export { remark_5 as remark };
    }
    namespace timeout {
        const code_6: number;
        export { code_6 as code };
        const msg_6: string;
        export { msg_6 as msg };
        const remark_6: string;
        export { remark_6 as remark };
    }
    namespace other {
        const code_7: number;
        export { code_7 as code };
        const msg_7: string;
        export { msg_7 as msg };
        const remark_7: string;
        export { remark_7 as remark };
    }
}
/**
 * @typedef { import ('./player').default } Player
 */
export const ERROR_TYPE_MAP: {
    1: string;
    2: string;
    3: string;
    4: string;
};
export { Errors as default };
