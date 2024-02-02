import React from 'react';
import './ServersSection.css';

import title from '../../../../assets/servers-title.png';
import minigames from '../../../../assets/minigames.png';
import nebula from '../../../../assets/nebula.png';
import elysium from '../../../../assets/elysium.png';
import { Button, Container, Divider, Grid } from '@mui/material';

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
        <Button>Saiba mais</Button>
      </div>
    );
  };

  return (
    <div className="servers-section-wrap">
      <Container>
        <div className="servers-section-container">
          <img className="servers-title-img" src={title} alt="Servers-Title" />
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
              {serverCard({
                image: minigames,
                description: 'Servidor de jogos e plots criativos',
                attrs: [
                  'Plots',
                  'MurderMystery',
                  'BedWars',
                  'Parkour',
                  'Futebol',
                ],
                slug: 'minigames',
              })}
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              {serverCard({
                image: elysium,
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
            <Grid item lg={4} sm={6} xs={12}>
              {serverCard({
                image: nebula,
                description: 'Servidor RPG',
                attrs: ['Mundo RP', 'mcMMO', 'Terrenos', 'Missões'],
                slug: 'elysium',
              })}
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ServersSection;
