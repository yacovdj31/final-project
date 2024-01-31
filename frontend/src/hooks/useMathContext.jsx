import { useContext } from 'react';
import { MathContext } from '../context/MathContext';

export const useMathContext = () => {
  const context = useContext(MathContext);

  if (!context) {
    throw new Error('useMathContext must be used within a MathContextProvider');
  }

  return context;
};
