import React, { useEffect } from 'react';
import './Rankings.css';

import { Container, Grid } from '@mui/material';
import title from '../../../../assets/rankings-logo.png';
import stIcon from '../../../../assets/icons/1st.png';
import ndIcon from '../../../../assets/icons/2nd.png';
import rdIcon from '../../../../assets/icons/3rd.png';
import { getRanking } from '../../../../services/api/rankings-service.ts';
import {
  RankEnum,
  RankGroup,
  RankingModel,
} from '../../../../models/ranking-model.ts';

const RankingSection: React.FC = () => {
  const [timePlayedRanking, setTimePlayedRanking] = React.useState<
    RankingModel[]
  >([]);
  const [cakeSlicesEatenRanking, setCakeSlicesEatenRanking] = React.useState<
    RankingModel[]
  >([]);
  const [damageTakenRanking, setDamageTakenRanking] = React.useState<
    RankingModel[]
  >([]);
  const [ecoBalanceRanking, setEcoBalanceRanking] = React.useState<
    RankingModel[]
  >([]);
  const [hoursSinceDeathRanking, setHoursSinceDeathRanking] = React.useState<
    RankingModel[]
  >([]);
  const [powerLevelRanking, setPowerLevelRanking] = React.useState<
    RankingModel[]
  >([]);

  const rankings: { [key in RankEnum]: RankGroup } = {
    time_played: {
      title: 'Tempo jogado',
      description: '(em horas)',
      rankings: timePlayedRanking,
    },
    cake_slices_eaten: {
      title: 'Fatias de bolo comidas',
      description: '(unidade)',
      rankings: cakeSlicesEatenRanking,
    },
    damage_taken: {
      title: 'Resistência',
      description: '(dano sofrido)',
      rankings: damageTakenRanking,
    },
    eco_balance: {
      title: 'Moedas',
      description: '(em Terracoins - TN$)',
      rankings: ecoBalanceRanking,
    },
    hours_since_death: {
      title: 'Sobrevivência',
      description: '(em horas)',
      rankings: hoursSinceDeathRanking,
    },
    power_level: {
      title: 'Nível de poder',
      description: '(mcMMO)',
      rankings: powerLevelRanking,
    },
  };

  useEffect(() => {
    const fetchAllRankings = async () => {
      try {
        const timePlayedRankingResult = await getRanking(RankEnum.TIME_PLAYED);
        const timePlayedRankingData = timePlayedRankingResult.map((item) => ({
          ...item,
          value: item.value.split('.')[0],
        }));
        setTimePlayedRanking(timePlayedRankingData);

        const cakeSlicesEatenRankingResult = await getRanking(
          RankEnum.CAKE_SLICES_EATEN,
        );
        const cakeSlicesEatenRankingData = cakeSlicesEatenRankingResult.map(
          (item) => ({
            ...item,
            value: item.value.split('.')[0],
          }),
        );
        setCakeSlicesEatenRanking(cakeSlicesEatenRankingData);

        const damageTakenRankingResult = await getRanking(
          RankEnum.DAMAGE_TAKEN,
        );

        const damageTakenRankingData = damageTakenRankingResult.map((item) => ({
          ...item,
          value: item.value.split('.')[0],
        }));

        setDamageTakenRanking(damageTakenRankingData);

        const ecoBalanceRankingResult = await getRanking(RankEnum.ECO_BALANCE);

        const ecoBalanceRankingData = ecoBalanceRankingResult.map((item) => ({
          ...item,
          value: item.value.replace('.', ','),
        }));

        setEcoBalanceRanking(ecoBalanceRankingData);

        const hoursSinceDeathRankingResult = await getRanking(
          RankEnum.HOURS_SINCE_DEATH,
        );

        const hoursSinceDeathRankingData = hoursSinceDeathRankingResult.map(
          (item) => ({
            ...item,
            value: item.value.split('.')[0],
          }),
        );

        setHoursSinceDeathRanking(hoursSinceDeathRankingData);

        const powerLevelRankingResult = await getRanking(RankEnum.POWER_LEVEL);

        const powerLevelRankingData = powerLevelRankingResult.map((item) => ({
          ...item,
          value: item.value.split('.')[0],
        }));

        setPowerLevelRanking(powerLevelRankingData);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchAllRankings();
  }, []);

  return (
    <div className="rankings-section-wrap">
      <Container maxWidth="xl">
        <div className="rankings-section-container">
          <div className="ranking-title-container">
            <img
              className="rankings-title-img"
              src={title}
              alt="Servers-Title"
            />
            <span>(Apenas Avalon)</span>
          </div>

          <Grid container spacing={0}>
            {Object.entries(rankings).map(([key, rankGroup]) => (
              <Grid item lg={4} md={6} xs={12} key={key}>
                <div className="rankings-card">
                  <span className="rank-title">{rankGroup.title}</span>
                  <span className="rank-description">
                    {rankGroup.description}
                  </span>
                  <div className="player-list-wrap">
                    {rankGroup.rankings.map((item: RankingModel, index) => (
                      <div
                        key={item.namecache}
                        className={
                          index < 3 ? `top-${index + 1} rank-line` : 'rank-line'
                        }
                      >
                        <Grid
                          container
                          spacing={2}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid
                            item
                            lg={2}
                            sm={2}
                            xs={2}
                            className="rank-line-position"
                          >
                            {index != 0 && index != 1 && index != 2 && (
                              <span>
                                {index + 1} <small>º</small>
                              </span>
                            )}
                            {index == 0 && (
                              <img
                                src={stIcon}
                                className="medal-icon"
                                alt="1st"
                              />
                            )}
                            {index == 1 && (
                              <img
                                src={ndIcon}
                                className="medal-icon"
                                alt="2nd"
                              />
                            )}
                            {index == 2 && (
                              <img
                                src={rdIcon}
                                className="medal-icon"
                                alt="3rd"
                              />
                            )}
                          </Grid>
                          <Grid item lg={2} sm={2} xs={2}>
                            <img
                              src={`https://cravatar.eu/helmhead/${item.namecache.replace('.', '')}/64.png`}
                              alt={item.namecache}
                              className="rank-player-head"
                            />
                          </Grid>
                          <Grid item lg={4} sm={4} xs={4}>
                            <span>{item.namecache}</span>
                          </Grid>
                          <Grid
                            item
                            lg={4}
                            sm={4}
                            xs={4}
                            className="rank-line-value"
                          >
                            <span>{item.value}</span>
                          </Grid>
                        </Grid>
                      </div>

                      // <li key={item.namecache} className={index < 3 ? `top-${index + 1}` : ''}>
                      //   <span>{index + 1}</span>
                      //   <span>{item.namecache}</span>
                      //   <span>{item.value}</span>
                      // </li>
                    ))}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default RankingSection;
