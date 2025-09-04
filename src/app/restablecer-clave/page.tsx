import ResetPasswordForm from "@/components/resetPassword/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
