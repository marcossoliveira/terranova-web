import React from 'react';
import { Container, Grid } from '@mui/material';
import './Menu.css';
import CustomButton from '../CustomButton/CustomButton.tsx';
import { Map, Store, TrendingUp, WbTwilight } from '@mui/icons-material';

const buttons = [
  {
    icon: <WbTwilight />,
    text: 'Wiki',
    fn: () => {
      console.log('aaa');
    },
  },
  {
    icon: <Map />,
    text: 'Mapa',
    fn: () => {
      console.log('aaa');
    },
  },
  {
    icon: <Store />,
    text: 'Lojas (Em breve)',
    fn: () => {
      console.log('aaa');
    },
  },
  {
    icon: <TrendingUp />,
    text: 'Rankings (Em breve)',
    fn: () => {
      console.log('aaa');
    },
  },
];
const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <Container>
        <Grid container>
          {buttons.map((item) => (
            <Grid item lg={3} xs={12} key={item.text}>
              <CustomButton icon={item.icon} text={item.text} fn={item.fn} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Menu;
