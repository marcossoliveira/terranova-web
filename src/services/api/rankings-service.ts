import { RankEnum, RankingModel } from '../../models/ranking-model.ts';
import { getData } from './api-service.ts';

export const getRanking = async (rank: RankEnum): Promise<RankingModel[]> => {
  return await getData(`/stats/ranking`, { rank, page: 0, limit: 10 });
};