import React, { createContext, useReducer } from 'react';

export const MathContext = createContext();

const mathReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return { ...state, history: action.payload };
    case 'ADD_ENTRY':
      return { ...state, history: [action.payload, ...state.history] };
    default:
      return state;
  }
};

export const MathContextProvider = ({ children }) => {
  const initialState = { history: [] };
  const [state, dispatch] = useReducer(mathReducer, initialState);

  return (
    <MathContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MathContext.Provider>
  );
};
