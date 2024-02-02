import React from 'react';
import './ContentSidebar.css';
import { Divider, Typography } from '@mui/material';

import topDonators from '../../../../assets/topdonators.png';
import RainbowDivider from '../../../../components/RainbowDivider/RainbowDivider.tsx';

const mockDonators = [
  'brightyly',
  'tatyangell59',
  'klothilus',
  'xyumizinhax',
  'clozeei',
  'cotriim',
  'demon_dragon',
];

const ContentSidebar: React.FC = () => {
  return (
    <div className="content-card-wrap">
      <img
        className="content-card-title-img"
        src={topDonators}
        alt="top-donators"
      />
      <small>OBS: Ordem alfabética, não por quantidade de doação.</small>

      <RainbowDivider />
      {mockDonators.sort().map((item) => (
        <div
          key={item}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          {' '}
          <span>•</span>{' '}
          <img
            src={`https://cravatar.eu/helmavatar/${item}/32.png`}
            alt=""
            style={{ margin: '0 8px' }}
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
};

export default ContentSidebar;
