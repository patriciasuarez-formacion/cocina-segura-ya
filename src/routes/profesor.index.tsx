import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { TemporizadorClase } from "@/components/TemporizadorClase";
import { FASES_SESION } from "@/data/profesor";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profesor/")({
  head: () => ({
    meta: [
      { title: "Guía de la sesión de 90 minutos | La puerta de la cocina" },
      {
        name: "description",
        content: "Línea temporal de la sesión con temporizador y fases marcables por el profesor.",
      },
      { property: "og:title", content: "Guía de la sesión de 90 minutos" },
      { property: "og:description", content: "Línea temporal, temporizador y fases de la clase." },
    ],
  }),
  component: GuiaSesion,
});

function GuiaSesion() {
  const [hechas, setHechas] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Guía de la sesión de 90 minutos"
        descripcion="Marca cada fase cuando la termines. El temporizador es opcional."
      />

      <TemporizadorClase minutos={90} />

      <ol className="space-y-3">
        {FASES_SESION.map((f) => {
          const hecha = hechas.includes(f.id);
          return (
            <li key={f.id}>
              <button
                type="button"
                aria-pressed={hecha}
                onClick={() =>
                  setHechas((h) => (h.includes(f.id) ? h.filter((x) => x !== f.id) : [...h, f.id]))
                }
                className={cn(
                  "tarjeta flex w-full items-start gap-4 p-5 text-left transition hover:shadow-lift",
                  hecha && "border-success/50 bg-success-soft",
                )}
              >
                {hecha ? (
                  <CheckCircle2 aria-hidden className="mt-0.5 size-6 shrink-0 text-success" />
                ) : (
                  <Circle aria-hidden className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
                )}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Minutos {f.rango}
                  </p>
                  <h2 className="text-lg font-extrabold">{f.titulo}</h2>
                  <p className="text-sm text-muted-foreground">{f.detalle}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
