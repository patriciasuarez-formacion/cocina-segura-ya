import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Repeat, Tag, Info } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AMPLIACION_FEFO, VENTAJAS_PEPS } from "@/data/normas";
import { actualizarEstado } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alumno/peps")({
  head: () => ({
    meta: [
      { title: "PEPS / FIFO | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Primero en entrar, primero en salir: etiqueta, coloca lo nuevo detrás y usa antes lo más antiguo.",
      },
      { property: "og:title", content: "PEPS / FIFO: primero en entrar, primero en salir" },
      {
        property: "og:description",
        content: "Etiquetar, colocar lo nuevo detrás y usar antes lo más antiguo.",
      },
    ],
  }),
  component: Peps,
});

type Producto = { id: string; nombre: string; emoji: string; entrada: string; caducidad: string; antiguo: boolean };

const ESTANTERIA: Producto[] = [
  { id: "p1", nombre: "Bote de tomate (antiguo)", emoji: "🥫", entrada: "02/09", caducidad: "10/12", antiguo: true },
  { id: "p2", nombre: "Bote de tomate (nuevo)", emoji: "🥫", entrada: "15/09", caducidad: "20/03", antiguo: false },
  { id: "p3", nombre: "Paquete de arroz (nuevo)", emoji: "🍚", entrada: "15/09", caducidad: "01/06", antiguo: false },
];

export function etiquetaCompleta(v: { nombre: string; entrada: string; limite: string }) {
  return v.nombre.trim() !== "" && v.entrada.trim() !== "" && v.limite.trim() !== "";
}

function Peps() {
  const [paso, setPaso] = useState(1);
  const [etiqueta, setEtiqueta] = useState({ nombre: "", entrada: "", limite: "" });
  const [errorEtiqueta, setErrorEtiqueta] = useState("");
  const [orden, setOrden] = useState<string[]>([]);
  const [elegido, setElegido] = useState<string | null>(null);
  const [comprobado, setComprobado] = useState(false);

  function validarEtiqueta() {
    if (!etiquetaCompleta(etiqueta)) {
      setErrorEtiqueta("Completa el nombre, la fecha de entrada y la fecha límite.");
      return;
    }
    setErrorEtiqueta("");
    setPaso(2);
  }

  function colocar(id: string) {
    setOrden((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  }

  const ordenCorrecto =
    orden.length === 3 && orden[0] === "p1" && orden.slice(1).every((id) => id !== "p1");

  return (
    <div className="space-y-8">
      <EncabezadoSeccion
        paso="Paso 5 de 7"
        titulo="Método PEPS / FIFO"
        descripcion="Primero En Entrar, Primero En Salir. Lo que llegó antes se utiliza antes."
      />

      <section className="tarjeta overflow-hidden">
        <div className="flex items-center gap-3 bg-brand-soft px-5 py-4">
          <Repeat aria-hidden className="size-6 text-brand" />
          <p className="font-bold">
            Lo nuevo va detrás o debajo. Lo antiguo va delante y se gasta primero.
          </p>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-3">
          {ESTANTERIA.map((p) => (
            <div
              key={p.id}
              className={cn(
                "rounded-xl border-2 p-4 text-center",
                p.antiguo ? "border-warning/50 bg-warning-soft" : "border-border bg-card",
              )}
            >
              <span aria-hidden className="text-3xl">
                {p.emoji}
              </span>
              <p className="mt-1 font-bold leading-tight">{p.nombre}</p>
              <p className="text-xs text-muted-foreground">
                Entrada {p.entrada} · Caduca {p.caducidad}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Acción 1: etiquetar */}
      <section className="tarjeta p-6" aria-labelledby="accion1">
        <h2 id="accion1" className="flex items-center gap-2 text-lg font-extrabold">
          <Tag aria-hidden className="size-5 text-brand" />
          Acción 1. Etiqueta el producto
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="et-nombre">Nombre del producto</Label>
            <Input
              id="et-nombre"
              className="mt-1"
              value={etiqueta.nombre}
              onChange={(e) => setEtiqueta((v) => ({ ...v, nombre: e.target.value }))}
              placeholder="Tomate triturado"
            />
          </div>
          <div>
            <Label htmlFor="et-entrada">Fecha de entrada</Label>
            <Input
              id="et-entrada"
              type="date"
              className="mt-1"
              value={etiqueta.entrada}
              onChange={(e) => setEtiqueta((v) => ({ ...v, entrada: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="et-limite">Fecha de caducidad</Label>
            <Input
              id="et-limite"
              type="date"
              className="mt-1"
              value={etiqueta.limite}
              onChange={(e) => setEtiqueta((v) => ({ ...v, limite: e.target.value }))}
            />
          </div>
        </div>
        {errorEtiqueta && (
          <p role="alert" className="mt-2 font-semibold text-danger">
            {errorEtiqueta}
          </p>
        )}
        <Button type="button" className="mt-4" onClick={validarEtiqueta}>
          Guardar etiqueta
        </Button>
        {paso >= 2 && (
          <div className="mt-4">
            <MensajeCorreccion acierto titulo="Etiqueta completa">
              <p>
                {etiqueta.nombre} · Entrada: {etiqueta.entrada} · Caducidad: {etiqueta.limite}
              </p>
            </MensajeCorreccion>
          </div>
        )}
      </section>

      {/* Acción 2: colocar */}
      <section className="tarjeta p-6" aria-labelledby="accion2">
        <h2 id="accion2" className="text-lg font-extrabold">
          Acción 2. Coloca la estantería en orden de uso
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pulsa los productos en el orden en que los usarías: primero el más antiguo.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {ESTANTERIA.map((p) => {
            const pos = orden.indexOf(p.id);
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={pos >= 0}
                onClick={() => colocar(p.id)}
                className={cn(
                  "rounded-xl border-2 p-4 text-center font-bold transition",
                  pos >= 0 ? "border-brand bg-brand-soft" : "border-border bg-card hover:bg-muted",
                )}
              >
                <span aria-hidden className="text-3xl">
                  {p.emoji}
                </span>
                <p className="mt-1 leading-tight">{p.nombre}</p>
                <p className="text-xs font-semibold text-muted-foreground">
                  {pos >= 0 ? `Posición ${pos + 1}` : "Sin colocar"}
                </p>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={orden.length < 3}
            onClick={() => {
              setComprobado(true);
              if (
                orden[0] === "p1" &&
                elegido === "p1" &&
                orden.length === 3
              ) {
                actualizarEstado((e) => ({ ...e, pepsCompletado: true }));
              }
            }}
          >
            Comprobar orden
          </Button>
          <Button type="button" variant="outline" onClick={() => { setOrden([]); setComprobado(false); }}>
            Empezar de nuevo
          </Button>
        </div>
        {comprobado && (
          <div className="mt-4">
            <MensajeCorreccion
              acierto={ordenCorrecto}
              titulo={ordenCorrecto ? "¡Orden correcto!" : "Revisa el orden"}
            >
              <p>
                El bote de tomate antiguo (entrada 02/09) va delante y se usa primero. Los productos
                nuevos se colocan detrás o debajo.
              </p>
            </MensajeCorreccion>
          </div>
        )}
      </section>

      {/* Acción 3: elegir */}
      <section className="tarjeta p-6" aria-labelledby="accion3">
        <h2 id="accion3" className="text-lg font-extrabold">
          Acción 3. Elige el producto que cogerías hoy
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {ESTANTERIA.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={elegido === p.id}
              onClick={() => {
                setElegido(p.id);
                if (p.id === "p1" && orden[0] === "p1") {
                  actualizarEstado((e) => ({ ...e, pepsCompletado: true }));
                }
              }}
              className={cn(
                "rounded-xl border-2 p-4 text-center font-bold transition",
                elegido === p.id
                  ? p.id === "p1"
                    ? "border-success bg-success-soft text-success"
                    : "border-danger bg-danger-soft text-danger"
                  : "border-border bg-card hover:bg-muted",
              )}
            >
              <span aria-hidden className="text-3xl">
                {p.emoji}
              </span>
              <p className="mt-1 leading-tight">{p.nombre}</p>
            </button>
          ))}
        </div>
        {elegido && (
          <div className="mt-4">
            <MensajeCorreccion
              acierto={elegido === "p1"}
              titulo={elegido === "p1" ? "¡Bien! Has cogido el más antiguo" : "Ese no es el primero"}
            >
              <p>Se coge siempre el producto que entró antes y está delante.</p>
            </MensajeCorreccion>
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="tarjeta p-5">
          <h2 className="font-extrabold">Ventajas del método PEPS</h2>
          <ul className="mt-3 space-y-2">
            {VENTAJAS_PEPS.map((v) => (
              <li key={v} className="rounded-lg bg-success-soft px-3 py-2 text-sm font-semibold text-success">
                {v}
              </li>
            ))}
          </ul>
        </div>
        <div className="tarjeta p-5">
          <h2 className="flex items-center gap-2 font-extrabold">
            <Info aria-hidden className="size-5 text-brand" />
            Ampliación: PCPS o FEFO
          </h2>
          <p className="mt-3 text-sm">{AMPLIACION_FEFO}</p>
        </div>
      </section>

      <div className="flex justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link to="/alumno/normas">
            Continuar con las normas
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
