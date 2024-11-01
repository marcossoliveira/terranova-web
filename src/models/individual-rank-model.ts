export enum RankName {
  TimePlayed = "time_played",
  PowerLevel = "power_level",
  CakeSlicesEaten = "cake_slices_eaten",
  DamageTaken = "damage_taken",
  HoursSinceDeath = "hours_since_death",
  EcoBalance = "eco_balance",
  JobsPoints = "jobs_points"
}

export interface IndividualRank {
  name: RankName;
  value: string | number;
  rank: number;
}