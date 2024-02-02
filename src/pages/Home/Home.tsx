import React, { CSSProperties } from 'react';
import Banner from './components/Banner/Banner.tsx';
import Menu from './components/Menu/Menu.tsx';
import ContentBody from './components/ContentBody/ContentBody.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import ServersSection from './components/ServersSection/ServersSection.tsx';

const styles: CSSProperties = {
  backgroundColor: '#e6e6e6',
};
const Home: React.FC = () => {
  return (
    <div style={{ ...styles }}>
      <Banner />
      <Menu />
      <ServersSection />
      <ContentBody />
      <Footer />
      {/* Seu conteúdo adicional aqui */}
    </div>
  );
};

export default Home;
