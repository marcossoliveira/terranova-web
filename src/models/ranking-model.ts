export interface RankingModel {
  id: string;
  value: string;
  hourly_delta: string;
  hourly_lasttotal: string;
  hourly_timestamp: string;
  daily_delta: string;
  daily_lasttotal: string;
  daily_timestamp: string;
  weekly_delta: string;
  weekly_lasttotal: string;
  weekly_timestamp: string;
  monthly_delta: string;
  monthly_lasttotal: string;
  monthly_timestamp: string;
  yearly_delta: string;
  yearly_lasttotal: string;
  yearly_timestamp: string;
  namecache: string;
  prefixcache: string;
  suffixcache: string;
  displaynamecache: string;
}


export enum RankEnum {
  TIME_PLAYED = 'time_played',
  POWER_LEVEL = 'power_level',
  CAKE_SLICES_EATEN = 'cake_slices_eaten',
  DAMAGE_TAKEN = 'damage_taken',
  HOURS_SINCE_DEATH = 'hours_since_death',
  ECO_BALANCE = 'eco_balance',
}

export interface RankGroup {
  title: string;
  description: string;
  rankings: RankingModel[];
}
