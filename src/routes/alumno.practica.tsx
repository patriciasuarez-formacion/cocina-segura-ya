import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { SelectorSemaforo } from "@/components/SelectorSemaforo";
import { TarjetaProducto } from "@/components/TarjetaProducto";
import { BarraProgreso } from "@/components/BarraProgreso";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CASOS,
  ETIQUETAS_DECISION,
  NIVELES,
  type Decision,
  type ProductoCaso,
} from "@/data/productos";
import { CONTROLES } from "@/data/lecciones";
import { guardarPractica, useEstado } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alumno/practica")({
  head: () => ({
    meta: [
      { title: "Practica: recibe tu pedido | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Simulación de recepción: revisa cada producto y decide aceptar, aceptar con observación o rechazar.",
      },
      { property: "og:title", content: "Practica: recibe tu pedido" },
      {
        property: "og:description",
        content: "Simulación interactiva de recepción de materias primas.",
      },
    ],
  }),
  component: Practica,
});

function Practica() {
  const estado = useEstado();
  const apoyo = estado.ajustes.modoApoyo;
  const [nivel, setNivel] = useState<number | null>(null);

  if (nivel === null) {
    return (
      <div className="space-y-6">
        <EncabezadoSeccion
          paso="Paso 3 de 7"
          titulo="Practica: recibe tu pedido"
          descripcion="Abre cada producto, revisa sus datos y decide. Después escribe el motivo."
        />
        {apoyo && (
          <p className="rounded-xl bg-success-soft px-4 py-3 font-semibold text-success">
            Modo de apoyo activado: practicarás con cinco productos, pistas visibles y motivos para
            elegir.
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          {NIVELES.map((n) => {
            const hecho = estado.practica[String(n.nivel)];
            const bloqueado = apoyo && n.nivel !== 1;
            return (
              <button
                key={n.nivel}
                type="button"
                disabled={bloqueado}
                onClick={() => setNivel(n.nivel)}
                className="tarjeta p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <h2 className="text-lg font-extrabold">{n.titulo}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{n.descripcion}</p>
                {hecho && (
                  <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-bold text-success">
                    <Trophy aria-hidden className="size-3.5" />
                    {hecho.aciertos} de {hecho.total} aciertos
                  </p>
                )}
                {bloqueado && (
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">
                    En modo de apoyo se practica solo el nivel 1.
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <RondaPractica nivel={nivel} onSalir={() => setNivel(null)} />;
}

function RondaPractica({ nivel, onSalir }: { nivel: number; onSalir: () => void }) {
  const estado = useEstado();
  const apoyo = estado.ajustes.modoApoyo;
  const config = NIVELES.find((n) => n.nivel === nivel)!;

  const productos = useMemo(
    () =>
      config.casos
        .map((id) => CASOS.find((c) => c.id === id))
        .filter((c): c is ProductoCaso => Boolean(c))
        .slice(0, apoyo ? 5 : undefined),
    [config, apoyo],
  );

  const [indice, setIndice] = useState(0);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [motivoTexto, setMotivoTexto] = useState("");
  const [motivoIndice, setMotivoIndice] = useState<number | null>(null);
  const [confirmado, setConfirmado] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [fallos, setFallos] = useState<string[]>([]);
  const [terminado, setTerminado] = useState(false);

  const producto = productos[indice]!;
  const mostrarPistas =
    apoyo || config.pistas === true || (config.pistas === "parcial" && indice % 2 === 0);
  const usarMotivosCerrados = apoyo || nivel === 1;

  const acierto = confirmado && decision === producto.decision;
  const motivoCorrecto =
    !usarMotivosCerrados || motivoIndice === producto.motivoCorrecto;

  function confirmar() {
    if (!decision) return;
    const bien = decision === producto.decision;
    const ganados = bien ? (motivoCorrecto ? 10 : 7) : 0;
    setPuntos((p) => p + ganados);
    if (bien) setAciertos((a) => a + 1);
    else setFallos((f) => (f.includes(producto.control) ? f : [...f, producto.control]));
    setConfirmado(true);
  }

  function siguiente() {
    if (indice + 1 >= productos.length) {
      guardarPractica({
        nivel,
        aciertos,
        total: productos.length,
        puntos,
        fallos,
      });
      setTerminado(true);
      return;
    }
    setIndice((i) => i + 1);
    setDecision(null);
    setMotivoTexto("");
    setMotivoIndice(null);
    setConfirmado(false);
  }

  if (terminado) {
    const porcentaje = Math.round((aciertos / productos.length) * 100);
    return (
      <div className="space-y-6">
        <EncabezadoSeccion
          titulo={`${config.titulo} completado`}
          descripcion="Este es tu resultado en esta ronda de práctica."
        />
        <div className="tarjeta space-y-4 p-6">
          <p className="font-display text-4xl font-extrabold">
            {aciertos} de {productos.length} aciertos
          </p>
          <BarraProgreso valor={porcentaje} etiqueta="Porcentaje de aciertos" />
          <p className="font-bold">Puntos obtenidos: {puntos}</p>
          {fallos.length > 0 ? (
            <div>
              <p className="font-bold">Controles que conviene repasar:</p>
              <ul className="mt-2 space-y-1 text-sm">
                {fallos.map((f) => (
                  <li key={f} className="rounded-lg bg-warning-soft px-3 py-2 font-semibold text-warning-foreground">
                    {CONTROLES[f] ?? f}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="rounded-lg bg-success-soft px-3 py-2 font-semibold text-success">
              ¡No has fallado ningún control!
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="gap-2" onClick={onSalir}>
              <RotateCcw aria-hidden className="size-4" />
              Elegir otro nivel
            </Button>
            <Button asChild className="gap-2">
              <Link to="/alumno/almacena">
                Ir a almacenar
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
        paso={`${config.titulo} · Producto ${indice + 1} de ${productos.length}`}
        titulo="Recibe tu pedido"
        descripcion="Revisa los datos del producto y decide qué haces con él."
      />
      <BarraProgreso
        valor={Math.round((indice / productos.length) * 100)}
        etiqueta="Productos revisados"
        detalle={`Puntos: ${puntos}`}
      />

      <TarjetaProducto producto={producto} mostrarPistas={mostrarPistas} />

      <section className="tarjeta space-y-4 p-6" aria-label="Tu decisión">
        <h2 className="text-lg font-extrabold">¿Qué haces con este producto?</h2>
        <SelectorSemaforo valor={decision} onChange={setDecision} disabled={confirmado} />

        {usarMotivosCerrados ? (
          <fieldset disabled={confirmado}>
            <legend className="mb-2 font-semibold">Elige el motivo</legend>
            <div className="space-y-2">
              {producto.motivos.map((m, i) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={motivoIndice === i}
                  onClick={() => setMotivoIndice(i)}
                  className={cn(
                    "w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition",
                    motivoIndice === i
                      ? "border-brand bg-brand-soft"
                      : "border-border bg-card hover:bg-muted",
                    confirmado && i === producto.motivoCorrecto && "border-success bg-success-soft text-success",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>
        ) : (
          <div>
            <Label htmlFor="motivo">Escribe el motivo de tu decisión</Label>
            <Textarea
              id="motivo"
              className="mt-1"
              rows={3}
              value={motivoTexto}
              disabled={confirmado}
              onChange={(e) => setMotivoTexto(e.target.value)}
              placeholder="Por ejemplo: la temperatura supera el límite de rechazo."
            />
          </div>
        )}

        {!confirmado ? (
          <Button
            type="button"
            size="lg"
            disabled={
              decision === null ||
              (usarMotivosCerrados ? motivoIndice === null : motivoTexto.trim().length < 5)
            }
            onClick={confirmar}
          >
            Confirmar decisión
          </Button>
        ) : (
          <div className="space-y-4">
            <MensajeCorreccion
              acierto={acierto}
              titulo={
                acierto
                  ? `¡Correcto! ${ETIQUETAS_DECISION[producto.decision]}`
                  : `La decisión correcta era: ${ETIQUETAS_DECISION[producto.decision]}`
              }
            >
              <p className="font-semibold">{producto.respuestaEsperada}.</p>
              <p>{producto.explicacion}</p>
              <p className="font-semibold">
                Control que debías aplicar: {CONTROLES[producto.control] ?? producto.control}
              </p>
              <p className="font-bold">
                Puntos obtenidos: {acierto ? (motivoCorrecto ? 10 : 7) : 0}
              </p>
            </MensajeCorreccion>
            <Button type="button" size="lg" className="gap-2" onClick={siguiente}>
              {indice + 1 >= productos.length ? "Ver resultado" : "Siguiente producto"}
              <ArrowRight aria-hidden className="size-5" />
            </Button>
          </div>
        )}
      </section>

      <Button type="button" variant="ghost" onClick={onSalir}>
        Salir de la ronda
      </Button>
    </div>
  );
}
