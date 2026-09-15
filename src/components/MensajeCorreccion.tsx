import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function MensajeCorreccion({
  acierto,
  titulo,
  children,
  neutro,
}: {
  acierto?: boolean;
  titulo: string;
  children?: React.ReactNode;
  neutro?: boolean;
}) {
  const Icono = neutro ? Info : acierto ? CheckCircle2 : XCircle;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "entrada-suave rounded-2xl border-2 p-4",
        neutro
          ? "border-brand/30 bg-brand-soft"
          : acierto
            ? "border-success/40 bg-success-soft"
            : "border-danger/40 bg-danger-soft",
      )}
    >
      <p className="flex items-center gap-2 font-bold">
        <Icono
          aria-hidden
          className={cn(
            "size-5 shrink-0",
            neutro ? "text-brand" : acierto ? "text-success" : "text-danger",
          )}
        />
        {titulo}
      </p>
      {children && <div className="mt-2 space-y-1 text-sm">{children}</div>}
    </div>
  );
}
