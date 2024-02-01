import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, photo) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: formData
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({type: 'LOGIN', payload: json});
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
