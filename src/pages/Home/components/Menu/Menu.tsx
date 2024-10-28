import React from 'react';
import { Container, Grid } from '@mui/material';
import './Menu.css';
import CustomButton from '../CustomButton/CustomButton.tsx';
import { Dashboard, Store, TrendingUp, WbTwilight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const buttons = [
  {
    icon: <WbTwilight />,
    text: 'Wiki',
    route: '/wiki',
  },
  {
    icon: <Dashboard />,
    text: 'Painel',
    route: '',
  },
  {
    icon: <Store />,
    text: 'Lojas (Em breve)',
    route: '',
  },
  {
    icon: <TrendingUp />,
    text: 'Rankings',
    route: '#rankings',
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
                fn={() => {
                  if (item.route.startsWith('#')) {
                    const element = document.querySelector(item.route);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    router(item.route);
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Menu;
