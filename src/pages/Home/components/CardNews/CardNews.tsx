import React, { CSSProperties } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Grid } from '@mui/material';

interface CardNewsProps {
  imageUrl: string;
  title: string;
  description: string;
}

const styles: CSSProperties = {
  margin: '16px 0',
};

const CardNews: React.FC<CardNewsProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <Card style={{ ...styles }}>
      <Grid container>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Ler mais...</Button>
          </CardActions>
        </Grid>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            alt="Imagem"
            height="100%"
            image={imageUrl} // URL da imagem
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default CardNews;
