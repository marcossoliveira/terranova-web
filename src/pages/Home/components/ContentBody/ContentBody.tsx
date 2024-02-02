import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import './ContentBody.css';
import CardNews from '../CardNews/CardNews.tsx';

import example from '../../../../assets/bgs/bg1.jpeg';
import ContentSidebar from '../ContentSidebar/ContentSidebar.tsx';

const mock = [
  {
    title: 'Viagem Aventureira',
    description:
      'Embarque em uma emocionante jornada por paisagens exuberantes, onde a natureza se revela em sua forma mais pura. Desde montanhas majestosas até rios serpenteantes, esta viagem aventureira promete uma experiência única e inesquecível.',
    imageUrl: example,
  },
  {
    title: 'Exploração Subaquática',
    description:
      'Mergulhe nas profundezas oceânicas e descubra um mundo submarino repleto de cores vibrantes e criaturas fascinantes. Cada mergulho é uma oportunidade para desvendar os segredos do vasto reino subaquático que poucos têm a chance de testemunhar.',
    imageUrl: example,
  },
  {
    title: 'Caminhada pela História',
    description:
      'Pise nos mesmos caminhos que os antigos exploradores percorreram. De ruínas antigas a monumentos históricos, esta jornada leva você a uma viagem no tempo, proporcionando uma visão profunda das civilizações que moldaram o nosso mundo.',
    imageUrl: example,
  },
  {
    title: 'Retiro Sereno',
    description:
      'Escape do agito da vida cotidiana e refugie-se em locais serenos e tranquilos. De praias isoladas a retiros nas montanhas, este é o lugar perfeito para encontrar paz interior e se reconectar consigo mesmo.',
    imageUrl: example,
  },
];

const ContentBody: React.FC = () => {
  return (
    <div className="content-body-container">
      <Container>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <Typography
              variant="h4"
              fontWeight="bold"
              className="content-body-title"
            >
              Últimas atualizações
            </Typography>

            {mock.map((item) => (
              <CardNews
                key={item.title}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            ))}
          </Grid>
          <Grid item md={4}>
            <ContentSidebar />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContentBody;
