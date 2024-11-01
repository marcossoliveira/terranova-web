import { IndividualRank, RankName } from "../../../models/individual-rank-model";
import { PunishmentModel, PunishmentTypeEnum } from "../../../models/punishment-model";

const rankNames: Record<RankName, string> = {
    [RankName.TimePlayed]: 'Tempo jogado',
    [RankName.PowerLevel]: 'Nível de poder',
    [RankName.CakeSlicesEaten]: 'Fatias de bolo comidas',
    [RankName.DamageTaken]: 'Dano recebido',
    [RankName.HoursSinceDeath]: 'Sobrevivêcia',
    [RankName.EcoBalance]: 'Terracoins',
    [RankName.JobsPoints]: 'Pontuação Jobs',
  };

  export const getRankDetails = (rank: IndividualRank) => {
    const name = rankNames[rank.name] || '';
    const value = +rank.value;
    const position = +rank.rank;
    let formattedValue = '';

    switch (rank.name) {
      case RankName.TimePlayed:
      case RankName.HoursSinceDeath:
        formattedValue = `${value.toFixed(0)} horas`;
        break;
      case RankName.EcoBalance:
        formattedValue = `TN$ ${rank.value.toString().replace('.', ',')}`;
        break;
      case RankName.PowerLevel:
      case RankName.CakeSlicesEaten:
      case RankName.DamageTaken:
        formattedValue = value.toFixed(0);
        break;
      case RankName.JobsPoints:
        formattedValue = value.toFixed(2).replace('.', ',');
        break;
      default:
        formattedValue = '';
    }

    return { name, formattedValue, position };
  };


  const punishmentTypes: Record<PunishmentTypeEnum, string> = {
    [PunishmentTypeEnum.WARNING]: 'Advertência',
    [PunishmentTypeEnum.TEMP_IP_BAN]: 'Banimento temporário de IP',
    [PunishmentTypeEnum.IP_BAN]: 'Banimento de IP',
    [PunishmentTypeEnum.TEMP_BAN]: 'Banimento temporário',
    [PunishmentTypeEnum.BAN]: 'Banimento',
  }


export const getPunishmentDetails = (punishment: PunishmentModel) => {
    const { id, name, uuid, reason, operator, punishmentType, start, end, calculation } = punishment;
    const typeDescription = punishmentTypes[punishmentType] || '';

    return {
        id,
        name,
        uuid,
        reason,
        operator,
        punishmentType: typeDescription,
        start: new Date(+start),
        end: new Date(+end),
        calculation
    };
};