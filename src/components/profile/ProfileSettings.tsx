"use client";
import React, { useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { uploadAvatar, deleteAvatar, changePassword } from "@/services/profileService";
import { toast } from "sonner";

const ProfileSettings: React.FC = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { user, token } = useAuthStore();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [changingPwd, setChangingPwd] = useState(false);

  const onPickFile = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoadingUpload(true);
      const res = await uploadAvatar(file);
      useAuthStore.setState({ user: { ...(user as any), pictureUrl: res?.data?.pictureUrl } });
      toast.success("Imagen de perfil actualizada");
    } catch (err: any) {
      toast.error(err?.message || "No se pudo subir el avatar");
    } finally {
      setLoadingUpload(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onDelete = async () => {
    try {
      setLoadingDelete(true);
      await deleteAvatar();
      useAuthStore.setState({ user: { ...(user as any), pictureUrl: null } });
      toast.success("Imagen de perfil eliminada");
    } catch (err: any) {
      toast.error(err?.message || "No se pudo eliminar el avatar");
    } finally {
      setLoadingDelete(false);
    }
  };

  const onChangePassword = async () => {
    try {
      if (!user?.id) {
        toast.error("No se encontró el ID de usuario en sesión");
        return;
      }
      if (!pwd || pwd.length < 6) {
        toast.error("La nueva contraseña debe tener al menos 6 caracteres");
        return;
      }
      if (pwd !== pwd2) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      setChangingPwd(true);
      await changePassword(String(user.id), pwd);
      setPwd("");
      setPwd2("");
      toast.success("Contraseña cambiada correctamente");
    } catch (err: any) {
      toast.error(err?.message || "No se pudo cambiar la contraseña");
    } finally {
      setChangingPwd(false);
    }
  };

  const hasLocalToken = typeof window !== "undefined" && !!localStorage.getItem("authToken");

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-[#6D4098] mb-4">Mi cuenta</h2>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h3 className="text-lg font-semibold text-[#6D4098] mb-3">Foto de perfil</h3>
        <div className="flex items-center gap-4">
          <img
            src={user?.pictureUrl || "/logoUplin.svg"}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={onPickFile}
              disabled={loadingUpload}
              className="bg-[#6D4098] text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60"
            >
              {loadingUpload ? "Subiendo…" : "Cambiar imagen"}
            </button>
            <button
              onClick={onDelete}
              disabled={loadingDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60"
            >
              {loadingDelete ? "Eliminando…" : "Eliminar"}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2">Formatos permitidos: JPG, PNG, WEBP. Máx 2MB.</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold text-[#6D4098] mb-3">Cambiar contraseña</h3>
        {!hasLocalToken && (
          <p className="text-sm text-gray-600 mb-3">Tu sesión actual es social (Auth0). Para cambiar contraseña usa el login clásico o solicita restablecimiento desde "Olvidaste tu contraseña".</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        <div className="mt-3">
          <button
            onClick={onChangePassword}
            disabled={changingPwd || !hasLocalToken}
            className="bg-[#72bf58] text-white px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60"
          >
            {changingPwd ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
