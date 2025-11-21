"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmVerifyEmail } from "@/services/authService";
import { TbLoader2 } from "react-icons/tb";
import { useAuthStore } from "@/store/useAuthStore";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const { user } = useAuthStore();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token no provisto en la URL");
        return;
      }
      setStatus("loading");
      try {
        await confirmVerifyEmail(token);
        setStatus("success");
        setMessage("Tu correo fue verificado correctamente.");
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || "No se pudo verificar el correo");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const goToAccount = () => {
    const role = (user as any)?.role || (user as any)?.rol || "CLIENTE";
    if (String(role).toUpperCase() === "ADMIN") router.push("/dashboard/admin");
    else router.push("/dashboard/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#6D4098] to-[#502B7D]">
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-8 text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Verificación de correo</h1>

        {status === "loading" && (
          <div className="flex items-center justify-center gap-3">
            <TbLoader2 className="w-6 h-6 animate-spin" />
            <span>Verificando...</span>
          </div>
        )}

        {status !== "loading" && (
          <>
            <p className="mb-6">{message}</p>
            {status === "success" ? (
              <button
                onClick={goToAccount}
                className="w-full py-3 rounded-xl text-white font-poppins font-bold text-lg cursor-pointer"
                style={{ backgroundColor: "#72bf58" }}
              >
                Ir a mi cuenta
              </button>
            ) : (
              <button
                onClick={() => router.push("/")}
                className="w-full py-3 rounded-xl text-white font-poppins font-bold text-lg cursor-pointer"
                style={{ backgroundColor: "#72bf58" }}
              >
                Volver al inicio
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
