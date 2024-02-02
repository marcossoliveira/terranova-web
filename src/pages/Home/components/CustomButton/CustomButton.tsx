import React, { ReactNode } from 'react';
import './CustomButton.css';

interface CustomButtonProps {
  icon: ReactNode;
  text: string;
  fn: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ icon, text, fn }) => {
  return (
    <div className="custom-button" role="presentation" onClick={fn}>
      <div className="custom-button-icon">{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default CustomButton;
