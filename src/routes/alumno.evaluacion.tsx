import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Printer, RotateCcw } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { BarraProgreso } from "@/components/BarraProgreso";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PREGUNTAS, PUNTOS_TOTALES, mensajeResultado, type Pregunta } from "@/data/evaluacion";
import { CONTROLES } from "@/data/lecciones";
import { guardarBillete, guardarEvaluacion, useEstado } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alumno/evaluacion")({
  head: () => ({
    meta: [
      { title: "Evaluación final | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Cinco preguntas sobre temperaturas, envases, fechas, PEPS/FIFO y contaminación cruzada.",
      },
      { property: "og:title", content: "Evaluación final" },
      {
        property: "og:description",
        content: "Cinco preguntas con puntuación sobre 10 y corrección explicada.",
      },
    ],
  }),
  component: Evaluacion,
});

type Respuestas = Record<string, unknown>;

function Evaluacion() {
  const estado = useEstado();
  const apoyo = estado.ajustes.modoApoyo;
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [corregido, setCorregido] = useState(false);
  const [nota, setNota] = useState(0);
  const [fallos, setFallos] = useState<string[]>([]);
  const [billete, setBillete] = useState({ aprendido: "", costo: "" });
  const [billeteGuardado, setBilleteGuardado] = useState(false);

  function puntosDe(p: Pregunta): number {
    const r = respuestas[p.id];
    switch (p.tipo) {
      case "opcion":
      case "caso":
        return r === p.correcta ? p.puntos : 0;
      case "vf": {
        const dadas = (r as (boolean | undefined)[]) ?? [];
        const bien = p.afirmaciones.filter((a, i) => dadas[i] === a.correcta).length;
        return (bien / p.afirmaciones.length) * p.puntos;
      }
      case "breve": {
        if (apoyo) return r === p.correctaApoyo ? p.puntos : 0;
        const texto = String(r ?? "").toLowerCase();
        const grupos = p.palabrasClave.filter((g) => g.some((k) => texto.includes(k))).length;
        return (grupos / p.palabrasClave.length) * p.puntos;
      }
      case "multi": {
        const sel = (r as number[]) ?? [];
        if (sel.length !== p.seleccionar) return 0;
        const validas = sel.filter((i) => p.validas.includes(i)).length;
        return (validas / p.seleccionar) * p.puntos;
      }
    }
  }

  function corregir() {
    let total = 0;
    const repasar: string[] = [];
    PREGUNTAS.forEach((p) => {
      const puntos = puntosDe(p);
      total += puntos;
      if (puntos < p.puntos) repasar.push(p.control);
    });
    const notaFinal = Math.round((total / PUNTOS_TOTALES) * 10 * 10) / 10;
    setNota(notaFinal);
    setFallos(repasar);
    setCorregido(true);
    guardarEvaluacion(notaFinal, repasar);
  }

  function repetir() {
    setRespuestas({});
    setCorregido(false);
    setNota(0);
    setFallos([]);
  }

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        paso="Paso 7 de 7"
        titulo="Evaluación final"
        descripcion="Cinco preguntas. La puntuación total es sobre 10. Puedes repetirla y se guarda tu mejor nota."
      />

      {estado.evaluacion && (
        <p className="rounded-xl bg-muted px-4 py-2 text-sm font-semibold">
          Mejor nota guardada: {estado.evaluacion.mejorNota} / 10 · Intentos:{" "}
          {estado.evaluacion.intentos}
        </p>
      )}

      {PREGUNTAS.map((p, i) => (
        <section key={p.id} className="tarjeta p-6" aria-labelledby={`enun-${p.id}`}>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Pregunta {i + 1} · {p.etiquetaTipo} · {p.puntos} puntos
          </p>
          <h2 id={`enun-${p.id}`} className="mt-1 text-lg font-extrabold">
            {p.enunciado}
          </h2>
          <div className="mt-4">
            <CuerpoPregunta
              pregunta={p}
              apoyo={apoyo}
              corregido={corregido}
              valor={respuestas[p.id]}
              onChange={(v) => setRespuestas((r) => ({ ...r, [p.id]: v }))}
            />
          </div>
          {corregido && (
            <div className="mt-4">
              <MensajeCorreccion
                acierto={puntosDe(p) === p.puntos}
                titulo={`Puntos: ${Math.round(puntosDe(p) * 10) / 10} de ${p.puntos}`}
              >
                <p>{p.solucion}</p>
              </MensajeCorreccion>
            </div>
          )}
        </section>
      ))}

      {!corregido ? (
        <Button type="button" size="lg" onClick={corregir}>
          Corregir evaluación
        </Button>
      ) : (
        <section className="tarjeta space-y-4 p-6" aria-label="Resultado de la evaluación">
          <p className="font-display text-4xl font-extrabold">{nota} / 10</p>
          <BarraProgreso valor={Math.round(nota * 10)} etiqueta="Resultado" />
          <p className="text-lg font-bold">{mensajeResultado(nota)}</p>
          {fallos.length > 0 && (
            <div>
              <p className="font-bold">Repasa estos controles:</p>
              <ul className="mt-2 space-y-1 text-sm">
                {[...new Set(fallos)].map((f) => (
                  <li key={f} className="rounded-lg bg-warning-soft px-3 py-2 font-semibold text-warning-foreground">
                    {CONTROLES[f] ?? "Método PEPS/FIFO"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="no-imprimir flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="gap-2" onClick={repetir}>
              <RotateCcw aria-hidden className="size-4" />
              Repetir evaluación
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer aria-hidden className="size-4" />
              Imprimir resultado
            </Button>
          </div>
        </section>
      )}

      <section className="tarjeta p-6" aria-labelledby="billete">
        <h2 id="billete" className="text-lg font-extrabold">
          Billete de salida
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Antes de terminar, completa estas dos frases.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="b1">Hoy he aprendido que…</Label>
            <Textarea
              id="b1"
              rows={2}
              className="mt-1"
              value={billete.aprendido}
              onChange={(e) => setBillete((b) => ({ ...b, aprendido: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="b2">Lo que más me costó decidir fue…</Label>
            <Textarea
              id="b2"
              rows={2}
              className="mt-1"
              value={billete.costo}
              onChange={(e) => setBillete((b) => ({ ...b, costo: e.target.value }))}
            />
          </div>
          <Button
            type="button"
            disabled={!billete.aprendido.trim() || !billete.costo.trim()}
            onClick={() => {
              guardarBillete(billete.aprendido, billete.costo);
              setBilleteGuardado(true);
            }}
          >
            Guardar billete de salida
          </Button>
          {billeteGuardado && (
            <MensajeCorreccion acierto titulo="Billete guardado">
              <p>Se guarda junto con el resultado de tu sesión.</p>
            </MensajeCorreccion>
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link to="/alumno/progreso">
            Ver mi progreso
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function CuerpoPregunta({
  pregunta,
  apoyo,
  corregido,
  valor,
  onChange,
}: {
  pregunta: Pregunta;
  apoyo: boolean;
  corregido: boolean;
  valor: unknown;
  onChange: (v: unknown) => void;
}) {
  if (pregunta.tipo === "opcion" || pregunta.tipo === "caso") {
    return (
      <div role="radiogroup" aria-label={pregunta.enunciado} className="space-y-2">
        {pregunta.opciones.map((o, i) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={valor === i}
            disabled={corregido}
            onClick={() => onChange(i)}
            className={cn(
              "w-full rounded-xl border-2 px-4 py-3 text-left font-semibold transition",
              valor === i ? "border-brand bg-brand-soft" : "border-border bg-card hover:bg-muted",
              corregido && i === pregunta.correcta && "border-success bg-success-soft text-success",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    );
  }

  if (pregunta.tipo === "vf") {
    const dadas = (valor as (boolean | undefined)[]) ?? [];
    return (
      <ul className="space-y-3">
        {pregunta.afirmaciones.map((a, i) => (
          <li key={a.texto} className="rounded-xl border-2 border-border p-3">
            <p className="font-semibold">{a.texto}</p>
            <div className="mt-2 flex gap-2">
              {[true, false].map((v) => (
                <Button
                  key={String(v)}
                  type="button"
                  variant={dadas[i] === v ? "default" : "outline"}
                  disabled={corregido}
                  onClick={() => {
                    const copia = [...dadas];
                    copia[i] = v;
                    onChange(copia);
                  }}
                >
                  {v ? "Verdadero" : "Falso"}
                </Button>
              ))}
              {corregido && (
                <span className="self-center text-sm font-bold">
                  Correcto: {a.correcta ? "Verdadero" : "Falso"}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (pregunta.tipo === "breve") {
    if (apoyo) {
      return (
        <div role="radiogroup" aria-label={pregunta.enunciado} className="space-y-2">
          {pregunta.opcionesApoyo.map((o, i) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={valor === i}
              disabled={corregido}
              onClick={() => onChange(i)}
              className={cn(
                "w-full rounded-xl border-2 px-4 py-3 text-left font-semibold transition",
                valor === i ? "border-brand bg-brand-soft" : "border-border bg-card hover:bg-muted",
                corregido && i === pregunta.correctaApoyo && "border-success bg-success-soft text-success",
              )}
            >
              {o}
            </button>
          ))}
        </div>
      );
    }
    return (
      <div>
        <Label htmlFor={`resp-${pregunta.id}`}>Tu respuesta</Label>
        <Textarea
          id={`resp-${pregunta.id}`}
          rows={3}
          className="mt-1"
          disabled={corregido}
          value={String(valor ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  const sel = (valor as number[]) ?? [];
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {pregunta.opciones.map((o, i) => {
        const marcada = sel.includes(i);
        return (
          <button
            key={o}
            type="button"
            aria-pressed={marcada}
            disabled={corregido}
            onClick={() =>
              onChange(marcada ? sel.filter((x) => x !== i) : [...sel, i].slice(-pregunta.seleccionar))
            }
            className={cn(
              "rounded-xl border-2 px-4 py-3 text-left font-semibold transition",
              marcada ? "border-brand bg-brand-soft" : "border-border bg-card hover:bg-muted",
              corregido && marcada && pregunta.validas.includes(i) && "border-success bg-success-soft text-success",
              corregido && marcada && !pregunta.validas.includes(i) && "border-danger bg-danger-soft text-danger",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
