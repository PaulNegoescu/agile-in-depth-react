import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from './Auth.context';

export const RouteGuard: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { state: { from: location.pathname } });
    }
  }, [user, location, navigate]);

  return <>{user && children}</>;
};
