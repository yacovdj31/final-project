import { useContext } from 'react';
import { ScrambleContext } from '../context/ScrambleContext';

export const useScrambleContext = () => {
  const context = useContext(ScrambleContext);

  if (!context) {
    throw new Error('useScrambleContext must be used within a ScrambleContextProvider');
  }

  return context;
};
