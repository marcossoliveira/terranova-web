import React from 'react';
import './ServersSection.css';

import title from '../../../../assets/servers-title.png';
import miniGameLogo from '../../../../assets/minigames.png';
import plotLogo from '../../../../assets/criativo-logo.png';
import solarLogo from '../../../../assets/solar-logo.png';
import avalonLogo from '../../../../assets/avalon-logo.png';
import { Container, Divider, Grid } from '@mui/material';

interface ServerCardProps {
  image: string;
  description: string;
  attrs: string[];
  slug: string;
}

const ServersSection: React.FC = () => {
  const serverCard = (data: ServerCardProps) => {
    return (
      <div className="server-card">
        <img className="server-card-img" src={data.image} alt={data.slug} />
        <span className="server-card-description">{data.description}</span>
        <Divider color="#a1a1a1" variant="middle" />
        {data.attrs.map((item) => (
          <span className="server-card-attrs" key={item}>
            - {item}
          </span>
        ))}
        <Divider color="#a1a1a1" variant="middle" />
        {/*<Button>Saiba mais</Button>*/}
      </div>
    );
  };

  return (
    <div className="servers-section-wrap">
      <Container>
        <div className="servers-section-container">
          <img className="servers-title-img" src={title} alt="Servers-Title" />
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} xs={12}>
              {serverCard({
                image: avalonLogo,
                description: 'Servidor survival',
                attrs: [
                  'Economia',
                  'mcMMO',
                  'Terrenos',
                  'PvP',
                  'Clãs',
                  'Missões',
                ],
                slug: 'elysium',
              })}
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              {serverCard({
                image: solarLogo,
                description: 'Servidor RPG',
                attrs: ['Mundo RP', 'mcMMO', 'Terrenos', 'Missões', 'PvP', 'Crie sua história'],
                slug: 'elysium',
              })}
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              {serverCard({
                image: miniGameLogo,
                description: 'Servidor de jogos',
                attrs: [
                  'MurderMystery',
                  'BedWars',
                  'Parkour',
                  'Futebol',
                ],
                slug: 'minigames',
              })}
            </Grid>
            <Grid item lg={6} sm={6} xs={12}>
              {serverCard({
                image: plotLogo,
                description: 'Servidor de plots criativos',
                attrs: [
                  'WorldEdit',
                  'Terrenos',
                  'Eventos',
                  'Colaborativo',
                ],
                slug: 'minigames',
              })}
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ServersSection;
