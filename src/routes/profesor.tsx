import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Presentation, Home } from "lucide-react";
import { AplicarAjustes, PanelAccesibilidad } from "@/components/AjustesAccesibilidad";

export const Route = createFileRoute("/profesor")({
  component: LayoutProfesor,
});

const SECCIONES: { to: string; etiqueta: string; exacto?: boolean }[] = [
  { to: "/profesor", etiqueta: "Guía de la sesión", exacto: true },
  { to: "/profesor/demostracion", etiqueta: "Modo demostración" },
  { to: "/profesor/resultados", etiqueta: "Resultados" },
  { to: "/profesor/fichas", etiqueta: "Fichas de recepción" },
  { to: "/profesor/cotejo", etiqueta: "Lista de cotejo" },
  { to: "/profesor/grupos", etiqueta: "Práctica en grupos" },
  { to: "/profesor/configuracion", etiqueta: "Configuración" },
];

function LayoutProfesor() {
  return (
    <div className="min-h-screen bg-background">
      <AplicarAjustes />
      <a
        href="#contenido-profesor"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <header className="no-imprimir sticky top-0 z-40 border-b bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Presentation aria-hidden className="size-6" />
            Modo profesor
          </Link>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <PanelAccesibilidad />
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-background/30 px-3 py-2 text-sm font-semibold hover:bg-background/10"
            >
              <Home aria-hidden className="size-4" />
              <span className="hidden sm:inline">Salir</span>
            </Link>
          </div>
        </div>
        <nav aria-label="Secciones del profesor" className="border-t border-background/15">
          <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-2">
            {SECCIONES.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  activeOptions={{ exact: s.exacto ?? false }}
                  activeProps={{ className: "bg-background text-foreground" }}
                  className="inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-background/15"
                >
                  {s.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="contenido-profesor" className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <Outlet />
      </main>
    </div>
  );
}
