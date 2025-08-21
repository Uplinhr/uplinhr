'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { TbLoader2 } from 'react-icons/tb';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, token, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token || !user || user.estado === 'inactivo') {
      router.push('/login');
    } else {
      if (user.rol === 'admin') {
        router.push('/dashboard/admin');
      } else if (user.rol === 'user') {
        router.push('/dashboard/user');
      }
    }
  }, [isAuthenticated, token, user, router]);

  if (!isAuthenticated || !token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <TbLoader2 className="w-12 h-12 animate-spin text-[#6C4099]" />
      </div>
    );
  }

  return <>{children}</>;
}
