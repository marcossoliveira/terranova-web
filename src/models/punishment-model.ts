export enum PunishmentTypeEnum {
    WARNING = 'WARNING',
    TEMP_IP_BAN = 'TEMP_IP_BAN',
    IP_BAN = 'IP_BAN',
    TEMP_BAN = 'TEMP_BAN',
    BAN = 'BAN'
}

export interface PunishmentModel {
    id: number;
    name: string;
    uuid: string;
    reason: string;
    operator: string;
    punishmentType: PunishmentTypeEnum;
    start: string;
    end: string;
    calculation: string;
}