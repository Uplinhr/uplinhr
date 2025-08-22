'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { TbLoader2 } from 'react-icons/tb';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, user, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login({ email, contrasenia: password });
      if (user?.rol === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          <a href="#" className="text-white font-poppins font-normal hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
