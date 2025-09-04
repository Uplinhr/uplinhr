"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { resetPassword, validateToken } = useAuthStore();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    newPassword.length > 0 && confirmPassword.length > 0
      ? newPassword === confirmPassword
      : true;

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        toast.error("Token ausente");
        router.push("/login");
        return;
      }
      try {
        const response = await validateToken(token);
        toast.success(response.message || "Token válido");
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Token inválido";
        toast.error(message);
        router.push("/login");
      }
    };

    checkToken();
  }, [token, router, validateToken]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token inválido o ausente");
      router.push("/login");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(token, newPassword);
      toast.success(response.message || "Contraseña cambiada correctamente");
      setNewPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error(message);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-[Poppins] bg-gradient-to-r from-[#502B7D] to-[#6C4099]">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Restablecer Contraseña
        </h2>

        <form onSubmit={handleChangePassword} className="flex flex-col gap-6">
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-white font-normal mb-2"
            >
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-[10px] bg-white border border-[#502B7D] text-[#502B7D] placeholder-[#502B7D]/70 focus:outline-none focus:ring-2 focus:ring-[#502B7D] shadow-md transition-transform duration-200 focus:scale-[1.02] pr-12"
              placeholder="Ingresa tu nueva contraseña"
            />
            <button
              type="button"
              className="absolute right-3 bottom-3 text-[#502B7D]/80 hover:text-[#502B7D] cursor-pointer"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <IoEyeSharp size={20} /> : <FaEyeSlash size={20} />}
            </button>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-white  font-normal mb-2"
            >
              Repetir contraseña
            </label>
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-[10px] bg-white border ${
                passwordsMatch ? "border-[#502B7D]" : "border-red-500"
              } text-[#502B7D] placeholder-[#502B7D]/70 focus:outline-none focus:ring-2 focus:ring-[#502B7D] shadow-md transition-transform duration-200 focus:scale-[1.02] pr-12`}
              placeholder="Confirma tu nueva contraseña"
            />
            <button
              type="button"
              className="absolute right-3 bottom-3 text-[#502B7D]/80 hover:text-[#502B7D] cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <IoEyeSharp size={20} />
              ) : (
                <FaEyeSlash size={20} />
              )}
            </button>
          </div>

          {!passwordsMatch && (
            <p className="text-white text-sm -mt-2">
              Las contraseñas no coinciden
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-[10px] text-white font-semibold text-center cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <FaSpinner className="animate-spin" size={20} />
            ) : (
              "Cambiar Contraseña"
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
