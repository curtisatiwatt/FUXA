import { isNumber } from "util";

export class Alarm {
    name: string;
    property: AlarmProperty;
    highhigh: AlarmSubProperty;
    high: AlarmSubProperty;
    low: AlarmSubProperty;
    info: AlarmSubProperty;
    actions: AlarmSubActions;
    value: string;
}

export class AlarmProperty {
    variableId: string;
    permission: number;
}

export class AlarmStatus { 
    highhigh: number;
    high: number;
    low: number;
    info: number;
    actions: any[];
}

export class AlarmSubRange {
    checkdelay: number;
    min: number;
    max: number;
    timedelay: number;
    
    static isValid(asr: AlarmSubRange): boolean {
        if (asr && asr.checkdelay && asr.min && asr.max && asr.timedelay) {
            return true;
        }
        return false;
    }
}

export class AlarmSubProperty extends AlarmSubRange {
    enabled: boolean;
    text: string;
    group: string;
    ackmode: AlarmAckMode;
    bkcolor: string;
    color: string;
}

export class AlarmSubActions {
    enabled: boolean;
    values: AlarmAction[] = [];

    static isValid(act: AlarmSubActions): boolean {
        if (act.values.length) {
            for (let i = 0; i < act.values.length; i++) {
                if (AlarmSubRange.isValid(act.values[i])) {
                    return true;
                }
            }
        }
        return false;
    }
}

export class AlarmAction extends AlarmSubRange {
    type: AlarmActionsType;
    actparam: any;
    variableId: any;
}

export enum AlarmAckMode {
    float = 'alarm.ack-float',
    ackactive = 'alarm.ack-active',
    ackpassive = 'alarm.ack-passive',
}
export class AlarmEvent {
    ontime: string;
    offtime: string;
    acktime: string;
    name: string;
    type: string;
    text: string;
    group: string;
    status: string;
    toack: boolean;
}

export class AlarmQuery {
    from: string;
    to: string;
}

export enum AlarmActionsType {
    popup = 'alarm.action-popup',
    setValue = 'alarm.action-onsetvalue',
    // sendMsg = 'alarm.action-onsendmsg',
}