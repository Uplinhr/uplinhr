'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { auth0Me, auth0Sync, sendVerifyEmail } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { TbLoader2 } from 'react-icons/tb';
import { FaEyeSlash, FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { useAuth0 } from '@auth0/auth0-react';
import { Linkedin, LogIn } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const { login, forgotPassword, user, isLoading, error, clearError } = useAuthStore();
  const [resending, setResending] = useState(false);
  const [resendOk, setResendOk] = useState<string | null>(null);
  const router = useRouter();
  
  // Auth0 hook - será undefined si no están configuradas las variables Auth0
  const { loginWithRedirect, isLoading: auth0IsLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, contrasenia: password });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setSocialLoading(provider);
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Auth0] Iniciando login social con proveedor:', provider);
      }
      await loginWithRedirect({
        appState: { returnTo: '/login' },
        authorizationParams: {
          connection: provider === 'google' ? 'google-oauth2' : 'linkedin',
        },
      });
    } catch (error) {
      console.error('Error durante el login social:', error);
    } finally {
      setSocialLoading(null);
    }
  };

  // Efecto: tras autenticación con Auth0, sincroniza con backend y enruta
  useEffect(() => {
    const run = async () => {
      if (!isAuthenticated) return;
      try {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Auth0] Usuario autenticado por Auth0. Obteniendo accessToken...');
        }
        const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            ...(audience ? { audience } : {}),
            scope: 'openid profile email',
          },
        });

        // Persist token para futuras llamadas
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth0Token', accessToken);
        }

        // Sincronizar/crear usuario en backend
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Auth0] Token obtenido. Sincronizando con backend...');
        }
        const syncRes = await auth0Sync(accessToken);
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Auth0] /auth0/sync respuesta:', syncRes);
        }

        // Obtener perfil
        const me = await auth0Me(accessToken);
        if (process.env.NODE_ENV !== 'production') {
          console.log('[Auth0] /auth0/me respuesta:', me);
        }
        const profile = me?.data || me;

        // Actualizar store si corresponde
        if (profile?.user) {
          // Estructura mínima para compatibilidad con la lógica de ruteo
          useAuthStore.setState({ user: { ...profile.user, rol: profile.user.role === 'ADMINISTRADOR' ? 'admin' : 'cliente' } });
        }

        // Routing según perfil
        if (profile?.profileCompleted === false) {
          if (process.env.NODE_ENV !== 'production') console.log('[Auth0] Redirigiendo a onboarding');
          router.push('/onboarding');
        } else if (profile?.user?.role === 'ADMINISTRADOR') {
          if (process.env.NODE_ENV !== 'production') console.log('[Auth0] Redirigiendo a dashboard/admin');
          router.push('/dashboard/admin');
        } else {
          if (process.env.NODE_ENV !== 'production') console.log('[Auth0] Redirigiendo a dashboard/user');
          router.push('/dashboard/user');
        }
      } catch (error) {
        console.error('Error en flujo Auth0:', error);
        // Mensaje amigable si no existe en backend
        // Redirigir a registro si es necesario
        router.push('/register');
      }
    };

    run();
  }, [isAuthenticated, getAccessTokenSilently, router]);

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    try {
      await forgotPassword(forgotEmail);
      setForgotSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setForgotLoading(false);
    }
  };

  useEffect(() => {
    if (user?.rol) {
      if (user.rol === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#6D4098] to-[#502B7D]">
      <div className="w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-8 font-poppins">
          Inicia Sesión
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            <div className="flex flex-col gap-2">
              <span>{error}</span>
              {error.includes('Debes verificar tu correo') && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={resending}
                    onClick={async () => {
                      try {
                        setResendOk(null);
                        setResending(true);
                        await sendVerifyEmail();
                        setResendOk('Te enviamos un nuevo correo de verificación. Revisa tu bandeja y spam.');
                      } catch (e) {
                        console.error(e);
                        setResendOk('No se pudo enviar el correo de verificación.');
                      } finally {
                        setResending(false);
                      }
                    }}
                    className="bg-[#6C4099] text-white px-3 py-2 rounded-lg text-sm hover:bg-[#5a3685] disabled:opacity-60"
                  >
                    {resending ? 'Enviando…' : 'Reenviar verificación'}
                  </button>
                  {resendOk && <span className="text-sm text-[#2f855a]">{resendOk}</span>}
                </div>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white font-poppins font-normal mb-2">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d]"
              required
              placeholder="ejemplo@correo.com"
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.validity.valueMissing) {
                  target.setCustomValidity('Por favor, completa este campo');
                } else if (target.validity.typeMismatch) {
                  target.setCustomValidity('Por favor, introduce una dirección de correo válida');
                }
              }}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-white font-poppins font-normal mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#502b7d] pr-12"
              required
              placeholder="Ingresa tu contraseña"
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('Por favor, completa este campo')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <button
              type="button"
              className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-1/2 py-3 rounded-xl text-white font-poppins font-bold text-lg disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: '#72bf58' }}
            >
              {isLoading ? (
                <>
                  <TbLoader2 className="w-5 h-5 animate-spin" color="#fff" />
                  Iniciando
                </>
              ) : (
                'Entrar'
              )}
            </motion.button>
          </div>
        </form>
        
        {/* Separador */}
        <div className="relative flex items-center mt-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-white">O continúa con</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Botones de login social */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Google */}
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={auth0IsLoading || socialLoading === 'google'}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 transition-all duration-200 disabled:opacity-70"
          >
            {socialLoading === 'google' ? (
              <TbLoader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </>
            )}
          </button>
          
          {/* LinkedIn */}
          <button
            onClick={() => handleSocialLogin('linkedin')}
            disabled={auth0IsLoading || socialLoading === 'linkedin'}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0077B5] text-white hover:bg-[#006699] transition-all duration-200 disabled:opacity-70"
          >
            {socialLoading === 'linkedin' ? (
              <TbLoader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Linkedin size={20} />
                LinkedIn
              </>
            )}
          </button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setForgotModalOpen(true)}
            className="text-white cursor-pointer font-poppins font-normal hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={() => router.push('/register')}
            className="text-white cursor-pointer font-poppins font-normal hover:underline"
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>

        {forgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => { setForgotModalOpen(false); setForgotSuccess(false); setForgotEmail(''); }}
              >
                <IoMdClose size={24} />
              </button>

              {!forgotSuccess ? (
                <>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 font-poppins">Escribe tu correo</h3>
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      required
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#502b7d]"
                    />
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={forgotLoading}
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                      >
                        {forgotLoading ? <TbLoader2 className="animate-spin w-5 h-5" /> : 'Cambiar contraseña'}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-6">
                  <FaCheck className="text-green-500 w-12 h-12" />
                  <p className="text-gray-700 text-center">
                    Revisa tu casilla de mail donde te hemos enviado la información. <br />
                    Puede que llegue a la carpeta de “No deseado”.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
