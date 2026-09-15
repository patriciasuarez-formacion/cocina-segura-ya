import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Target, Check, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { Button } from "@/components/ui/button";
import { actualizarEstado, useEstado } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alumno/")({
  head: () => ({
    meta: [
      { title: "Inicio del alumno | La puerta de la cocina" },
      {
        name: "description",
        content: "Objetivo de la sesión y las tres decisiones de la recepción de materias primas.",
      },
      { property: "og:title", content: "Inicio del alumno | La puerta de la cocina" },
      {
        property: "og:description",
        content: "Objetivo de la sesión y las tres decisiones de la recepción.",
      },
    ],
  }),
  component: InicioAlumno,
});

const OPCIONES = [
  "No pasa nada.",
  "Puede romperse la cadena de frío y causar un riesgo.",
  "Se guarda directamente en el congelador.",
];

function InicioAlumno() {
  const estado = useEstado();
  const [elegida, setElegida] = useState<number | null>(null);
  const [confirmada, setConfirmada] = useState(estado.inicioRespondido);

  function responder() {
    if (elegida === null) return;
    setConfirmada(true);
    if (elegida === 1) {
      actualizarEstado((e) => ({ ...e, inicioRespondido: true }));
    }
  }

  return (
    <div className="space-y-8">
      <EncabezadoSeccion
        paso="Paso 1 de 7"
        titulo="¡Hola! Hoy trabajas en la puerta de recepción"
        descripcion="Vas a aprender a recibir un pedido, revisarlo con seis controles y guardarlo en su zona."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="tarjeta flex items-start gap-3 p-5">
          <Target aria-hidden className="mt-1 size-6 shrink-0 text-brand" />
          <div>
            <h2 className="font-extrabold">Objetivo de la sesión</h2>
            <p className="text-sm text-muted-foreground">
              Recibir, controlar, decidir, registrar y almacenar materias primas con seguridad.
            </p>
          </div>
        </div>
        <div className="tarjeta flex items-start gap-3 p-5">
          <Clock aria-hidden className="mt-1 size-6 shrink-0 text-brand" />
          <div>
            <h2 className="font-extrabold">Duración estimada</h2>
            <p className="text-sm text-muted-foreground">90 minutos.</p>
          </div>
        </div>
      </div>

      <section aria-labelledby="pregunta" className="tarjeta p-6">
        <h2 id="pregunta" className="text-xl font-extrabold">
          ¿Qué pasa si entra en la cocina un pollo a 12 °C y nadie lo comprueba?
        </h2>
        <div role="radiogroup" aria-labelledby="pregunta" className="mt-4 space-y-3">
          {OPCIONES.map((o, i) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={elegida === i}
              disabled={confirmada}
              onClick={() => setElegida(i)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-semibold transition",
                elegida === i ? "border-brand bg-brand-soft" : "border-border bg-card hover:bg-muted",
                confirmada && i === 1 && "border-success bg-success-soft text-success",
                confirmada && elegida === i && i !== 1 && "border-danger bg-danger-soft text-danger",
              )}
            >
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
              >
                {String.fromCharCode(97 + i)}
              </span>
              {o}
            </button>
          ))}
        </div>

        {!confirmada ? (
          <Button type="button" className="mt-4" disabled={elegida === null} onClick={responder}>
            Responder
          </Button>
        ) : (
          <div className="mt-4 space-y-3">
            <MensajeCorreccion
              acierto={elegida === 1}
              titulo={elegida === 1 ? "¡Correcto!" : "No es la respuesta correcta"}
            >
              <p>
                La respuesta correcta es: «Puede romperse la cadena de frío y causar un riesgo».
              </p>
            </MensajeCorreccion>
            <p className="rounded-2xl border-2 border-brand/30 bg-brand-soft p-4 text-lg font-bold">
              «La seguridad alimentaria empieza en la puerta de recepción, no en el fuego».
            </p>
            {elegida !== 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setConfirmada(false);
                  setElegida(null);
                }}
              >
                Volver a intentarlo
              </Button>
            )}
          </div>
        )}
      </section>

      <section aria-labelledby="decisiones">
        <h2 id="decisiones" className="text-xl font-extrabold">
          Tus tres decisiones posibles
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-success/40 bg-success-soft p-5 text-success">
            <Check aria-hidden className="size-7" />
            <h3 className="mt-2 font-extrabold">ACEPTAR</h3>
            <p className="mt-1 text-sm font-medium">El producto cumple los controles.</p>
          </div>
          <div className="rounded-2xl border-2 border-warning/50 bg-warning-soft p-5 text-warning-foreground">
            <AlertTriangle aria-hidden className="size-7" />
            <h3 className="mt-2 font-extrabold">ACEPTAR CON OBSERVACIÓN</h3>
            <p className="mt-1 text-sm font-medium">
              Puede entrar, pero hay que registrar una incidencia y avisar al proveedor.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-danger/40 bg-danger-soft p-5 text-danger">
            <XCircle aria-hidden className="size-7" />
            <h3 className="mt-2 font-extrabold">RECHAZAR</h3>
            <p className="mt-1 text-sm font-medium">
              Existe un incumplimiento o riesgo que impide aceptar el producto.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link to="/alumno/aprende">
            Ir a las lecciones
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
