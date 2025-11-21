'use client';

import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const router = useRouter();
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '';
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '';
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState: any) => {
    try {
      if (process.env.NODE_ENV !== 'production') {
        // Log básico para diagnosticar retorno de Auth0
        console.log('[Auth0] onRedirectCallback appState:', appState);
      }
      router.push(appState?.returnTo || '/login');
    } catch (e) {
      console.error('[Auth0] onRedirectCallback error:', e);
      router.push('/login');
    }
  };

  if (!(domain && clientId)) {
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        ...(audience ? { audience } : {}),
        scope: 'openid profile email',
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : undefined,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
