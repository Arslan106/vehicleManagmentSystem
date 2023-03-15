import React, {useState} from 'react';

export const useData = () => {
  const [state, setState] = useState('something');
  return {
    state,
  };
};
