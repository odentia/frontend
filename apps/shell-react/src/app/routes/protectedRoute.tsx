import { ReactNode } from 'react';
import { useAuth } from '@config-runtime';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const api = useAuth();
  const auth = api.useSessionQuery();

  if (auth.isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Загрузка...</div>
      </div>
    );
  }
  
  return <>{children}</>;
};