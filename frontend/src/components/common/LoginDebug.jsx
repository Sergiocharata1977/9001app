import React from 'react';
import useAuthStore from '../../store/authStore';

/**
 * Componente de debug para monitorear el estado de autenticación
 * Solo se muestra en desarrollo
 */
const LoginDebug = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isSuperAdmin = useAuthStore((state) => state.isSuperAdmin);

  // Solo mostrar en desarrollo
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-30 max-w-xs opacity-70 hover:opacity-100 transition-opacity">
      <h4 className="font-bold mb-1">🔍 Debug Auth</h4>
      <div className="space-y-0.5">
        <div>Loading: {isLoading ? '✅' : '❌'}</div>
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>Super Admin: {isSuperAdmin() ? '✅' : '❌'}</div>
        <div>User Role: {user?.role || 'N/A'}</div>
        <div>User ID: {user?.id || 'N/A'}</div>
        <div>Org ID: {user?.organization_id || 'N/A'}</div>
      </div>
    </div>
  );
};

export default LoginDebug;

