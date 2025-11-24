import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextFile.jsx';

export const useAuth = () => {
  return useContext(AuthContext);
};
