import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from './Auth.context';

export function RouteGuard({ children, adminOnly = false }) {
  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (adminOnly && user.isAdmin !== true)) {
      navigate('/auth/login', { state: { from: location.pathname } });
    }
  }, [user, location, navigate, adminOnly]);

  return <>{user && children}</>;
}
