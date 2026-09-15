import { Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";

export function IndicadorTemperatura({
  valor,
  estado,
  texto,
}: {
  valor: string;
  estado: "correcta" | "limite" | "rechazo" | "neutra";
  texto?: string;
}) {
  const estilos = {
    correcta: "border-success/40 bg-success-soft text-success",
    limite: "border-warning/50 bg-warning-soft text-warning-foreground",
    rechazo: "border-danger/40 bg-danger-soft text-danger",
    neutra: "border-border bg-muted text-foreground",
  }[estado];

  const etiqueta = {
    correcta: "Temperatura correcta",
    limite: "Temperatura en el límite",
    rechazo: "Temperatura de rechazo",
    neutra: "Temperatura medida",
  }[estado];

  return (
    <div
      className={cn("flex items-center gap-3 rounded-xl border-2 px-3 py-2", estilos)}
      role="status"
    >
      <Thermometer aria-hidden className="size-6 shrink-0" />
      <div className="min-w-0">
        <p className="text-lg font-bold leading-tight">{valor}</p>
        <p className="text-xs font-semibold">{texto ?? etiqueta}</p>
      </div>
    </div>
  );
}
