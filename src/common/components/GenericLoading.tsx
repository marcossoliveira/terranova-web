import React from 'react';
import { CircularProgress } from '@mui/material';

const GenericLoading: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
      }}
    >
      <CircularProgress size={64} />
      <span style={{ marginTop: '16px' }}>Carregando dados...</span>
    </div>
  );
};

export default GenericLoading;
