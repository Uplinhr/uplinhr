'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { TbLoader2 } from 'react-icons/tb';
import { FaEyeSlash, FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const { login, forgotPassword, user, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, contrasenia: password });
    } catch (err) {
      console.error(err);
    }
  };

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
            {error}
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

        <div className="text-center mt-6">
          <button
            onClick={() => setForgotModalOpen(true)}
            className="text-white cursor-pointer font-poppins font-normal hover:underline"
          >
            ¿Olvidaste tu contraseña?
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
