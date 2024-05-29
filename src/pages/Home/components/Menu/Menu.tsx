import React from 'react';
import { Container, Grid } from '@mui/material';
import './Menu.css';
import CustomButton from '../CustomButton/CustomButton.tsx';
import { Map, Store, TrendingUp, WbTwilight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const buttons = [
  {
    icon: <WbTwilight />,
    text: 'Wiki',
    route: '/wiki',
  },
  {
    icon: <Map />,
    text: 'Mapa',
    route: '',
  },
  {
    icon: <Store />,
    text: 'Lojas (Em breve)',
    route: '',
  },
  {
    icon: <TrendingUp />,
    text: 'Rankings (Em breve)',
    route: '',
  },
];
const Menu: React.FC = () => {
  const router = useNavigate();

  return (
    <div className="menu-container">
      <Container>
        <Grid container>
          {buttons.map((item) => (
            <Grid item lg={3} xs={12} key={item.text}>
              <CustomButton
                icon={item.icon}
                text={item.text}
                fn={() => router(item.route)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Menu;
