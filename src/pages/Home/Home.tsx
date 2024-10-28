import React from 'react';
import Banner from './components/Banner/Banner.tsx';
import Menu from './components/Menu/Menu.tsx';
// import ContentBody from './components/ContentBody/ContentBody.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import ServersSection from './components/ServersSection/ServersSection.tsx';
import { containerStyle } from './styles.ts';
import RankingSection from './components/Rankings/Rankings.tsx';

const Home: React.FC = () => {
  return (
    <div style={{ ...containerStyle }}>
      <Banner />
      <Menu />
      <ServersSection />
      <div id="rankings">
        <RankingSection />
      </div>
      {/*<ContentBody />*/}
      <Footer />
    </div>
  );
};

export default Home;
