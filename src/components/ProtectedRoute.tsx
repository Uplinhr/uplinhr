'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { TbLoader2 } from 'react-icons/tb';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      if (!isAuthenticated || !token || !user || !user.active) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkLogin`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!data.success) {
          toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
          logout(); // ✅ Ahora sí llama a la función logout
          router.push('/login');
          return;
        }

        // Si el token es válido, redirigir según el rol
        if (user.rol === 'admin') {
          router.push('/dashboard/admin');
        } else if (user.rol === 'user') {
          router.push('/dashboard/user');
        }
      } catch (error) {
        console.error('Error checking token:', error);
        toast.error('Error al verificar la sesión. Por favor inicia sesión nuevamente.');
        logout(); // ✅ También llama a logout en caso de error
        router.push('/login');
      } finally {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, [isAuthenticated, token, user, router, logout]);

  if (checkingToken || !isAuthenticated || !token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TbLoader2 className="w-12 h-12 animate-spin text-[#6C4099]" />
      </div>
    );
  }

  return <>{children}</>;
}