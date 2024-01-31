import React, { createContext, useReducer } from 'react';

export const ScrambleContext = createContext();

const scrambleReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    case 'ADD_ENTRY':
      return { ...state, history: [action.payload, ...state.history] };
    default:
      return state;
  }
};

export const ScrambleContextProvider = ({ children }) => {
  const initialState = { history: [] };
  const [state, dispatch] = useReducer(scrambleReducer, initialState);

  return (
    <ScrambleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ScrambleContext.Provider>
  );
};
