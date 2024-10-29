import React from 'react';
import { Container, Grid, Button } from '@mui/material';
import './Banner.css';

import bg1 from '../../../../assets/bgs/bg1.jpeg';
import bg2 from '../../../../assets/bgs/bg2.jpeg';
import bg3 from '../../../../assets/bgs/bg3.jpeg';
import bg4 from '../../../../assets/bgs/bg4.jpeg';
import bg5 from '../../../../assets/bgs/bg5.jpeg';
import bg6 from '../../../../assets/bgs/bg6.jpeg';
import logo from '../../../../assets/logo.png';
import mine from '../../../../assets/mine-white-icon.png';
import discord from '../../../../assets/discord-white-icon.png';
import { useCopyToClipboard } from '../../../../hooks/useCopyToClipboard.ts';
import { Bounce, toast } from 'react-toastify';

const bgs = [bg1, bg2, bg3, bg4, bg5, bg6];

const Banner: React.FC = () => {
  const sortIndex = (): number => Math.floor(Math.random() * bgs.length);
  const index = sortIndex();
  const [copiedText, copy] = useCopyToClipboard();

  copiedText;

  const toastEmmiter = () =>
    toast('🦄 IP Copiado com sucesso!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  const handleCopy = (text: string) => () => {
    copy(text).then(() => {
      toastEmmiter();
    });
  };

  const openDiscordLink = () => {
    window.open('https://discord.gg/terranova', '_blank');
  };

  const mineSmallBanner = (
    <div
      className="small-banner"
      onClick={handleCopy('play.redetn.com')}
      role="presentation"
    >
      <img className="small-banner-img-left" src={mine} alt="MineIP" />
      <div className="small-banner-description-left">
        <span className="small-banner-img-title">IP do servidor</span>
        <span>play.redetn.com</span>
        <span>Porta bedrock: 25710</span>
      </div>
      {/*<IconButton color="info">*/}
      {/*  <ContentCopy />*/}
      {/*</IconButton>*/}
    </div>
  );

  const discordSmallBanner = (
    <div className="small-banner">
      <img className="small-banner-img-left" src={discord} alt="MineIP" />
      <div className="small-banner-description-left">
        <span className="small-banner-img-title">Servidor discord</span>
        <Button onClick={() => openDiscordLink()} variant="contained">
          Clique aqui
        </Button>
      </div>
    </div>
  );

  return (
    <div className="banner">
      <img className="image" src={bgs[index]} alt={'Banner Image ' + index} />
      <Container className="content">
        <img src={logo} alt="Logo TN" className="logo" />
        <Grid container xl paddingBottom={8}>
          <Grid item lg={6} xs={12}>
            {mineSmallBanner}
          </Grid>
          <Grid item lg={6} xs={12}>
            {discordSmallBanner}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;
