import { Check, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Decision } from "@/data/productos";

const OPCIONES: {
  valor: Decision;
  etiqueta: string;
  ayuda: string;
  clase: string;
  activa: string;
  Icono: typeof Check;
}[] = [
  {
    valor: "aceptar",
    etiqueta: "Aceptar",
    ayuda: "Cumple los controles",
    clase: "border-success/40 bg-success-soft text-success",
    activa: "ring-4 ring-success/40 border-success",
    Icono: Check,
  },
  {
    valor: "observacion",
    etiqueta: "Aceptar con observación",
    ayuda: "Entra, pero se registra incidencia",
    clase: "border-warning/50 bg-warning-soft text-warning-foreground",
    activa: "ring-4 ring-warning/40 border-warning",
    Icono: AlertTriangle,
  },
  {
    valor: "rechazar",
    etiqueta: "Rechazar",
    ayuda: "Hay riesgo o incumplimiento",
    clase: "border-danger/40 bg-danger-soft text-danger",
    activa: "ring-4 ring-danger/40 border-danger",
    Icono: XCircle,
  },
];

export function SelectorSemaforo({
  valor,
  onChange,
  disabled,
  compacto,
  etiquetaGrupo = "Elige tu decisión",
}: {
  valor: Decision | null;
  onChange: (v: Decision) => void;
  disabled?: boolean;
  compacto?: boolean;
  etiquetaGrupo?: string;
}) {
  return (
    <div role="group" aria-label={etiquetaGrupo} className="grid gap-3 sm:grid-cols-3">
      {OPCIONES.map((o) => (
        <button
          key={o.valor}
          type="button"
          disabled={disabled}
          aria-pressed={valor === o.valor}
          onClick={() => onChange(o.valor)}
          className={cn(
            "flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 px-3 py-4 text-center font-bold transition disabled:opacity-60",
            o.clase,
            valor === o.valor ? o.activa : "hover:shadow-lift",
            compacto && "min-h-20",
          )}
        >
          <o.Icono aria-hidden className="size-7" />
          <span className="text-sm leading-tight sm:text-base">{o.etiqueta}</span>
          {!compacto && <span className="text-xs font-medium opacity-80">{o.ayuda}</span>}
        </button>
      ))}
    </div>
  );
}
