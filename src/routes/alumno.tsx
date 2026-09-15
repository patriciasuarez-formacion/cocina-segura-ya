import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { DoorOpen, Home } from "lucide-react";
import {
  AplicarAjustes,
  BotonModoApoyo,
  PanelAccesibilidad,
} from "@/components/AjustesAccesibilidad";
import { BarraProgreso } from "@/components/BarraProgreso";
import { porcentajeTotal, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/alumno")({
  component: LayoutAlumno,
});

const SECCIONES: { to: string; etiqueta: string; exacto?: boolean }[] = [
  { to: "/alumno", etiqueta: "Inicio", exacto: true },
  { to: "/alumno/aprende", etiqueta: "Aprende" },
  { to: "/alumno/practica", etiqueta: "Practica" },
  { to: "/alumno/almacena", etiqueta: "Almacena" },
  { to: "/alumno/peps", etiqueta: "PEPS/FIFO" },
  { to: "/alumno/normas", etiqueta: "Normas" },
  { to: "/alumno/semaforo", etiqueta: "Reto del semáforo" },
  { to: "/alumno/ficha", etiqueta: "Ficha de recepción" },
  { to: "/alumno/evaluacion", etiqueta: "Evaluación" },
  { to: "/alumno/progreso", etiqueta: "Mi progreso" },
];

function LayoutAlumno() {
  const estado = useEstado();
  const progreso = porcentajeTotal(estado);

  return (
    <div className="min-h-screen bg-background">
      <AplicarAjustes />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <header className="no-imprimir sticky top-0 z-40 border-b bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
            <DoorOpen aria-hidden className="size-6" />
            La puerta de la cocina
          </Link>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <BotonModoApoyo />
            <PanelAccesibilidad />
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-3 py-2 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              <Home aria-hidden className="size-4" />
              <span className="hidden sm:inline">Salir</span>
            </Link>
          </div>
        </div>
        <nav aria-label="Secciones del alumno" className="border-t border-primary-foreground/15">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-2">
            {SECCIONES.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  activeOptions={{ exact: s.exacto ?? false }}
                  activeProps={{
                    className: "bg-primary-foreground text-primary",
                  }}
                  className="inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-primary-foreground/15"
                >
                  {s.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <div className="no-imprimir mb-6 tarjeta p-4">
          <BarraProgreso
            valor={progreso}
            etiqueta="Tu progreso en la sesión"
            detalle="Se guarda en este dispositivo y no se pierde al recargar."
          />
        </div>
        <main id="contenido">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
