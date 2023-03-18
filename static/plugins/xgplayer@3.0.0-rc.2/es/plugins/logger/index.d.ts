export default class Xglogger extends BasePlugin {
    vt: number;
    pt: number;
    fvt: number;
    _onReset: () => void;
    _isSeeking: boolean;
    seekingStart: number;
    waitingStart: number;
    _isWaiting: boolean;
    _waitTimer: any;
    _waittTimer: any;
    stall: {
        costTime: number;
        currentTime: number;
    };
    seekData: {
        costTime: number;
        currentTime: number;
    };
    _onSeeking: () => void;
    _onSeeked: () => void;
    _onWaiting: () => void;
    _onError: () => void;
    _startWaitTimeout(): void;
    _onPlaying: () => void;
    suspendSeekingStatus(endType: any): void;
    suspendWaitingStatus(endType: any): void;
    emitLog(eventType: any, data: any): void;
}
import BasePlugin from "../../plugin";
