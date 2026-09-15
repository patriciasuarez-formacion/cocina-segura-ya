import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Insignia } from "@/data/insignias";

export function TarjetaInsignia({
  insignia,
  ganada,
}: {
  insignia: Insignia;
  ganada: boolean;
}) {
  return (
    <div
      className={cn(
        "tarjeta flex items-center gap-3 p-4",
        ganada ? "border-success/40 bg-success-soft" : "opacity-80",
      )}
    >
      <span aria-hidden className={cn("text-3xl", !ganada && "grayscale")}>
        {insignia.emoji}
      </span>
      <div className="min-w-0">
        <p className="font-extrabold leading-tight">{insignia.nombre}</p>
        <p className="text-xs text-muted-foreground">
          {ganada ? "¡Conseguida!" : insignia.comoSeGana}
        </p>
      </div>
      {!ganada && <Lock aria-label="Aún no conseguida" className="ml-auto size-4 shrink-0" />}
    </div>
  );
}
