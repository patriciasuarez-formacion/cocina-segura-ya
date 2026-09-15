import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Star } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { DemoTermometro } from "@/components/DemoTermometro";
import { TablaTemperaturas } from "@/components/TablaTemperaturas";
import { Button } from "@/components/ui/button";
import { LECCIONES } from "@/data/lecciones";
import { completarLeccion, useEstado } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alumno/aprende/$leccionId")({
  head: ({ params }) => {
    const l = LECCIONES.find((x) => x.id === params.leccionId);
    const titulo = l ? `${l.titulo} | La puerta de la cocina` : "Lección | La puerta de la cocina";
    const desc = l?.resumen ?? "Lección de recepción de materias primas.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: DetalleLeccion,
});

function DetalleLeccion() {
  const { leccionId } = Route.useParams();
  const navigate = useNavigate();
  const estado = useEstado();
  const indice = LECCIONES.findIndex((l) => l.id === leccionId);
  const leccion = LECCIONES[indice];
  const [elegida, setElegida] = useState<number | null>(null);
  const [comprobada, setComprobada] = useState(false);

  if (!leccion) {
    return (
      <div className="tarjeta p-6">
        <p className="font-bold">Esta lección no existe.</p>
        <Button asChild className="mt-4">
          <Link to="/alumno/aprende">Volver a las lecciones</Link>
        </Button>
      </div>
    );
  }

  const siguiente = LECCIONES[indice + 1];

  function continuar() {
    completarLeccion(leccionId);
    if (siguiente) {
      navigate({ to: "/alumno/aprende/$leccionId", params: { leccionId: siguiente.id } });
    } else {
      navigate({ to: "/alumno/practica" });
    }
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="gap-2 px-2">
        <Link to="/alumno/aprende">
          <ArrowLeft aria-hidden className="size-4" />
          Todas las lecciones
        </Link>
      </Button>

      <EncabezadoSeccion
        paso={`Control ${leccion.numero} de 6`}
        titulo={leccion.titulo}
        descripcion={leccion.explicacion}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <section className="tarjeta p-5" aria-labelledby="correcto">
          <h2 id="correcto" className="flex items-center gap-2 font-extrabold text-success">
            <CheckCircle2 aria-hidden className="size-5" />
            Ejemplo correcto
          </h2>
          <ul className="mt-3 space-y-2">
            {leccion.ejemploCorrecto.map((t) => (
              <li key={t} className="flex gap-2 rounded-lg bg-success-soft px-3 py-2 text-sm font-semibold text-success">
                <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="tarjeta p-5" aria-labelledby="alarma">
          <h2 id="alarma" className="flex items-center gap-2 font-extrabold text-danger">
            <AlertTriangle aria-hidden className="size-5" />
            Señales de alarma
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {leccion.senalesAlarma.map((t) => (
              <li key={t} className="rounded-lg bg-danger-soft px-3 py-2 text-sm font-semibold text-danger">
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="flex items-start gap-3 rounded-2xl border-2 border-warning/50 bg-warning-soft p-4 text-warning-foreground">
        <Star aria-hidden className="mt-0.5 size-5 shrink-0" />
        <span className="font-bold">{leccion.ideaDestacada}</span>
      </p>

      {leccion.id === "temperatura" && (
        <div className="space-y-6">
          <TablaTemperaturas />
          <DemoTermometro />
        </div>
      )}

      <section className="tarjeta p-6" aria-labelledby="pregunta-rapida">
        <h2 id="pregunta-rapida" className="text-lg font-extrabold">
          Pregunta rápida
        </h2>
        <p className="mt-1 font-semibold">{leccion.pregunta.texto}</p>
        <div role="radiogroup" aria-label={leccion.pregunta.texto} className="mt-4 space-y-2">
          {leccion.pregunta.opciones.map((o, i) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={elegida === i}
              disabled={comprobada}
              onClick={() => setElegida(i)}
              className={cn(
                "w-full rounded-xl border-2 px-4 py-3 text-left font-semibold transition",
                elegida === i ? "border-brand bg-brand-soft" : "border-border bg-card hover:bg-muted",
                comprobada &&
                  i === leccion.pregunta.correcta &&
                  "border-success bg-success-soft text-success",
                comprobada &&
                  elegida === i &&
                  i !== leccion.pregunta.correcta &&
                  "border-danger bg-danger-soft text-danger",
              )}
            >
              {o}
            </button>
          ))}
        </div>
        {!comprobada ? (
          <Button
            type="button"
            className="mt-4"
            disabled={elegida === null}
            onClick={() => setComprobada(true)}
          >
            Comprobar
          </Button>
        ) : (
          <div className="mt-4">
            <MensajeCorreccion
              acierto={elegida === leccion.pregunta.correcta}
              titulo={elegida === leccion.pregunta.correcta ? "¡Muy bien!" : "Casi. Fíjate en esto:"}
            >
              <p>{leccion.pregunta.explicacion}</p>
            </MensajeCorreccion>
            {elegida !== leccion.pregunta.correcta && (
              <Button
                type="button"
                variant="outline"
                className="mt-3"
                onClick={() => {
                  setComprobada(false);
                  setElegida(null);
                }}
              >
                Intentarlo otra vez
              </Button>
            )}
          </div>
        )}
      </section>

      <div className="flex flex-wrap justify-between gap-3">
        {indice > 0 ? (
          <Button asChild variant="outline" className="gap-2">
            <Link
              to="/alumno/aprende/$leccionId"
              params={{ leccionId: LECCIONES[indice - 1]!.id }}
            >
              <ArrowLeft aria-hidden className="size-4" />
              Lección anterior
            </Link>
          </Button>
        ) : (
          <span />
        )}
        <Button type="button" size="lg" className="gap-2" onClick={continuar}>
          Entendido, continuar
          <ArrowRight aria-hidden className="size-5" />
        </Button>
      </div>

      {estado.leccionesCompletadas.includes(leccion.id) && (
        <p className="text-sm font-semibold text-success">Ya has completado esta lección.</p>
      )}
    </div>
  );
}
