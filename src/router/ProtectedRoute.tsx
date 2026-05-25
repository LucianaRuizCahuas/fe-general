import { Navigate } from 'react-router-dom';
import { isAdmin, isLoggedIn } from '../api/auth.api';

interface Props { children: React.ReactNode; role?: 'admin' | 'user' }

export default function ProtectedRoute({ children, role }: Props) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (role === 'admin' && !isAdmin()) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
