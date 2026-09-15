import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DoorOpen,
  GraduationCap,
  Presentation,
  Check,
  AlertTriangle,
  XCircle,
  Thermometer,
  Box,
  CalendarDays,
} from "lucide-react";
import { AplicarAjustes } from "@/components/AjustesAccesibilidad";
import { BarraProgreso } from "@/components/BarraProgreso";
import { porcentajeTotal, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La puerta de la cocina | Recepción y almacenaje de alimentos" },
      {
        name: "description",
        content:
          "Aplicación educativa para aprender a recibir, controlar y almacenar materias primas en una cocina profesional. Grado Básico de Cocina.",
      },
      { property: "og:title", content: "La puerta de la cocina" },
      {
        property: "og:description",
        content: "Aprende a recibir, revisar y guardar alimentos de forma segura.",
      },
    ],
  }),
  component: Portada,
});

function Portada() {
  const estado = useEstado();
  const progreso = porcentajeTotal(estado);

  return (
    <div className="min-h-screen bg-background">
      <AplicarAjustes />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="tarjeta entrada-suave overflow-hidden">
          <div className="bg-primary px-6 py-10 text-primary-foreground sm:px-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-sm font-semibold">
              <DoorOpen aria-hidden className="size-4" />
              Grado Básico de Cocina · 1.º curso
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              La puerta de la cocina
            </h1>
            <p className="mt-2 text-xl font-bold text-primary-foreground/90">
              Si no entra bien, no sale bien
            </p>
            <p className="mt-4 max-w-xl text-primary-foreground/85">
              Aprende a recibir, revisar y guardar alimentos de forma segura.
            </p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-10">
            <Link
              to="/alumno"
              className="flex min-h-32 flex-col justify-center gap-2 rounded-2xl border-2 border-success/40 bg-success-soft p-6 text-success transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <GraduationCap aria-hidden className="size-8" />
              <span className="text-xl font-extrabold">Entrar como alumno</span>
              <span className="text-sm font-semibold opacity-80">
                Lecciones, práctica, semáforo y evaluación
              </span>
            </Link>
            <Link
              to="/profesor"
              className="flex min-h-32 flex-col justify-center gap-2 rounded-2xl border-2 border-border bg-brand-soft p-6 text-brand transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <Presentation aria-hidden className="size-8" />
              <span className="text-xl font-extrabold">Entrar como profesor</span>
              <span className="text-sm font-semibold opacity-80">
                Guía de sesión, demostración y lista de cotejo
              </span>
            </Link>

            <div className="sm:col-span-2">
              <BarraProgreso
                valor={progreso}
                etiqueta="Progreso del modo alumno"
                detalle={
                  progreso === 0
                    ? "Todavía no has empezado. Pulsa «Entrar como alumno»."
                    : "Puedes continuar donde lo dejaste."
                }
              />
            </div>
          </div>
        </div>

        <section aria-labelledby="decisiones" className="mt-10">
          <h2 id="decisiones" className="text-xl font-extrabold">
            Las tres decisiones de la recepción
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <TarjetaDecision
              Icono={Check}
              titulo="ACEPTAR"
              texto="El producto cumple los controles."
              clase="border-success/40 bg-success-soft text-success"
            />
            <TarjetaDecision
              Icono={AlertTriangle}
              titulo="ACEPTAR CON OBSERVACIÓN"
              texto="Puede entrar, pero hay que registrar una incidencia y avisar al proveedor."
              clase="border-warning/50 bg-warning-soft text-warning-foreground"
            />
            <TarjetaDecision
              Icono={XCircle}
              titulo="RECHAZAR"
              texto="Hay un incumplimiento o riesgo que impide aceptar el producto."
              clase="border-danger/40 bg-danger-soft text-danger"
            />
          </div>
        </section>

        <section aria-labelledby="que-aprenderas" className="mt-10 tarjeta p-6">
          <h2 id="que-aprenderas" className="text-xl font-extrabold">
            ¿Qué vas a controlar en la puerta?
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { Icono: Thermometer, texto: "Temperatura de llegada" },
              { Icono: Box, texto: "Estado del envase" },
              { Icono: CalendarDays, texto: "Fechas del producto" },
            ].map(({ Icono, texto }) => (
              <li key={texto} className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
                <Icono aria-hidden className="size-5 text-brand" />
                <span className="font-semibold">{texto}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Los datos se guardan solo en este dispositivo. No se piden apellidos ni correo
            electrónico.
          </p>
        </section>
      </main>
    </div>
  );
}

function TarjetaDecision({
  Icono,
  titulo,
  texto,
  clase,
}: {
  Icono: typeof Check;
  titulo: string;
  texto: string;
  clase: string;
}) {
  return (
    <div className={`rounded-2xl border-2 p-5 ${clase}`}>
      <Icono aria-hidden className="size-7" />
      <h3 className="mt-2 font-extrabold">{titulo}</h3>
      <p className="mt-1 text-sm font-medium opacity-90">{texto}</p>
    </div>
  );
}
