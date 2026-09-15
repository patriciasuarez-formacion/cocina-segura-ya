import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { iconoLeccion } from "@/components/iconos";
import type { Leccion } from "@/data/lecciones";

export function TarjetaControl({
  leccion,
  completada,
}: {
  leccion: Leccion;
  completada: boolean;
}) {
  const Icono = iconoLeccion(leccion.icono);
  return (
    <Link
      to="/alumno/aprende/$leccionId"
      params={{ leccionId: leccion.id }}
      className="tarjeta flex gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icono aria-hidden className="size-6" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Control {leccion.numero}
        </p>
        <h3 className="text-lg font-extrabold">{leccion.titulo}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{leccion.resumen}</p>
        {completada && (
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-bold text-success">
            <CheckCircle2 aria-hidden className="size-3.5" />
            Completada
          </p>
        )}
      </div>
    </Link>
  );
}
