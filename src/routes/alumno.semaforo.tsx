import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Timer } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { SelectorSemaforo } from "@/components/SelectorSemaforo";
import { BarraProgreso } from "@/components/BarraProgreso";
import { Button } from "@/components/ui/button";
import { CASOS_SEMAFORO } from "@/data/semaforo";
import { CONTROLES } from "@/data/lecciones";
import { ETIQUETAS_DECISION, type Decision } from "@/data/productos";
import { guardarSemaforo, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/alumno/semaforo")({
  head: () => ({
    meta: [
      { title: "Reto del semáforo | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Ocho situaciones rápidas: decide en 20 segundos si aceptas, aceptas con observación o rechazas.",
      },
      { property: "og:title", content: "Reto del semáforo" },
      {
        property: "og:description",
        content: "Ocho decisiones rápidas de recepción, con corrección inmediata.",
      },
    ],
  }),
  component: Semaforo,
});

function Semaforo() {
  const estado = useEstado();
  const segundosBase = estado.ajustes.modoApoyo
    ? estado.ajustes.segundosSemaforo * 2
    : estado.ajustes.segundosSemaforo;

  const [empezado, setEmpezado] = useState(false);
  const [indice, setIndice] = useState(0);
  const [segundos, setSegundos] = useState(segundosBase);
  const [respuesta, setRespuesta] = useState<Decision | null>(null);
  const [resuelto, setResuelto] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [repasar, setRepasar] = useState<string[]>([]);
  const [terminado, setTerminado] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const caso = CASOS_SEMAFORO[indice]!;

  useEffect(() => {
    if (!empezado || resuelto || terminado) return;
    timer.current = setInterval(() => setSegundos((s) => Math.max(0, s - 1)), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [empezado, resuelto, terminado, indice]);

  useEffect(() => {
    if (segundos === 0 && empezado && !resuelto && !terminado) {
      resolver(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segundos]);

  function resolver(valor: Decision | null) {
    setRespuesta(valor);
    setResuelto(true);
    if (valor === caso.respuesta) setAciertos((a) => a + 1);
    else setRepasar((r) => (r.includes(caso.control) ? r : [...r, caso.control]));
  }

  function siguiente() {
    if (indice + 1 >= CASOS_SEMAFORO.length) {
      const porcentaje = Math.round((aciertos / CASOS_SEMAFORO.length) * 100);
      guardarSemaforo({ aciertos, total: CASOS_SEMAFORO.length, porcentaje, repasar });
      setTerminado(true);
      return;
    }
    setIndice((i) => i + 1);
    setRespuesta(null);
    setResuelto(false);
    setSegundos(segundosBase);
  }

  function reiniciar() {
    setIndice(0);
    setAciertos(0);
    setRepasar([]);
    setRespuesta(null);
    setResuelto(false);
    setSegundos(segundosBase);
    setTerminado(false);
    setEmpezado(true);
  }

  if (!empezado) {
    return (
      <div className="space-y-6">
        <EncabezadoSeccion
          paso="Paso 6 de 7"
          titulo="Reto del semáforo"
          descripcion="Ocho situaciones. Cada una dura 20 segundos. Pulsa verde, amarillo o rojo."
        />
        <div className="tarjeta space-y-4 p-6">
          <p className="font-semibold">
            Tiempo por situación: {segundosBase} segundos.
            {estado.ajustes.modoApoyo && " En modo de apoyo tienes el doble de tiempo."}
          </p>
          <Button type="button" size="lg" onClick={() => setEmpezado(true)}>
            Empezar el reto
          </Button>
          {estado.semaforo && (
            <p className="text-sm text-muted-foreground">
              Tu mejor resultado: {estado.semaforo.aciertos} de {estado.semaforo.total} (
              {estado.semaforo.porcentaje} %).
            </p>
          )}
        </div>
      </div>
    );
  }

  if (terminado) {
    const porcentaje = Math.round((aciertos / CASOS_SEMAFORO.length) * 100);
    return (
      <div className="space-y-6">
        <EncabezadoSeccion titulo="Resultado del semáforo" descripcion="Así ha ido tu ronda." />
        <div className="tarjeta space-y-4 p-6">
          <p className="font-display text-4xl font-extrabold">
            {aciertos} de {CASOS_SEMAFORO.length} aciertos
          </p>
          <BarraProgreso valor={porcentaje} etiqueta="Porcentaje de aciertos" />
          {repasar.length > 0 ? (
            <div>
              <p className="font-bold">Controles que conviene repasar:</p>
              <ul className="mt-2 space-y-1 text-sm">
                {repasar.map((c) => (
                  <li key={c} className="rounded-lg bg-warning-soft px-3 py-2 font-semibold text-warning-foreground">
                    {CONTROLES[c] ?? c}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-lg bg-success-soft px-3 py-2 font-semibold text-success">
              ¡Has acertado todas las situaciones!
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="gap-2" onClick={reiniciar}>
              <RotateCcw aria-hidden className="size-4" />
              Repetir
            </Button>
            <Button asChild className="gap-2">
              <Link to="/alumno/evaluacion">
                Continuar a la evaluación
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        paso={`Situación ${indice + 1} de ${CASOS_SEMAFORO.length}`}
        titulo="Reto del semáforo"
        descripcion="Decide rápido: verde aceptar, amarillo aceptar con observación, rojo rechazar."
      />

      <div className="flex items-center gap-3">
        <Timer aria-hidden className="size-5 text-brand" />
        <p className="font-bold tabular-nums" role="timer" aria-live="off">
          {segundos} s
        </p>
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${(segundos / segundosBase) * 100}%` }}
          />
        </div>
        <p className="font-bold">Aciertos: {aciertos}</p>
      </div>

      <div className="tarjeta entrada-suave flex items-center gap-4 p-6">
        <span aria-hidden className="text-5xl">
          {caso.emoji}
        </span>
        <h2 className="text-xl font-extrabold sm:text-2xl">{caso.situacion}</h2>
      </div>

      <SelectorSemaforo
        valor={respuesta}
        onChange={(v) => !resuelto && resolver(v)}
        disabled={resuelto}
      />

      {resuelto && (
        <div className="space-y-4">
          <MensajeCorreccion
            acierto={respuesta === caso.respuesta}
            titulo={
              respuesta === null
                ? "Se acabó el tiempo"
                : respuesta === caso.respuesta
                  ? "¡Correcto!"
                  : "No es la respuesta correcta"
            }
          >
            <p className="font-semibold">
              Respuesta correcta: {ETIQUETAS_DECISION[caso.respuesta]}.
            </p>
            <p>{caso.justificacion}</p>
            <p className="font-semibold">Control: {CONTROLES[caso.control] ?? caso.control}</p>
          </MensajeCorreccion>
          <Button type="button" size="lg" className="gap-2" onClick={siguiente}>
            {indice + 1 >= CASOS_SEMAFORO.length ? "Ver resultado" : "Siguiente situación"}
            <ArrowRight aria-hidden className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
