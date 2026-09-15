import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { ZonaAlmacen } from "@/components/ZonaAlmacen";
import { BarraProgreso } from "@/components/BarraProgreso";
import { Button } from "@/components/ui/button";
import { BALDAS_CAMARA, ITEMS_ALMACEN, ZONAS, type ItemAlmacen } from "@/data/zonas";
import { actualizarEstado, useEstado } from "@/lib/estado";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alumno/almacena")({
  head: () => ({
    meta: [
      { title: "Almacena: cada producto en su zona | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Coloca cada alimento en refrigeración, congelador, almacén seco, frutas y verduras o productos de limpieza.",
      },
      { property: "og:title", content: "Almacena: cada producto en su zona" },
      {
        property: "og:description",
        content: "Actividad de colocación por zonas y orden de la cámara.",
      },
    ],
  }),
  component: Almacena,
});

function Almacena() {
  const estado = useEstado();
  const items = useMemo(
    () => (estado.ajustes.modoApoyo ? ITEMS_ALMACEN.slice(0, 6) : ITEMS_ALMACEN),
    [estado.ajustes.modoApoyo],
  );

  const [indice, setIndice] = useState(0);
  const [colocados, setColocados] = useState<Record<string, boolean>>({});
  const [intentos, setIntentos] = useState(0);
  const [mensaje, setMensaje] = useState<{ ok: boolean; texto: string } | null>(null);
  const [arrastrando, setArrastrando] = useState<string | null>(null);

  const item: ItemAlmacen | undefined = items[indice];
  const terminado = indice >= items.length;
  const aciertos = Object.values(colocados).filter(Boolean).length;

  function intentar(zonaId: string) {
    if (!item) return;
    if (zonaId === item.zona) {
      setColocados((c) => ({ ...c, [item.id]: intentos === 0 }));
      setMensaje({ ok: true, texto: item.explicacion });
    } else {
      setIntentos((i) => i + 1);
      setMensaje({
        ok: false,
        texto:
          intentos === 0
            ? `Casi. Pista: ${item.pista} Prueba otra vez.`
            : `La zona correcta es: ${ZONAS.find((z) => z.id === item.zona)?.nombre}. ${item.explicacion}`,
      });
      if (intentos >= 1) {
        setColocados((c) => ({ ...c, [item.id]: false }));
      }
    }
  }

  function siguiente() {
    const nuevo = indice + 1;
    setIndice(nuevo);
    setIntentos(0);
    setMensaje(null);
    if (nuevo >= items.length) {
      actualizarEstado((e) => ({
        ...e,
        almacenaCompletado: true,
        almacenaAciertos: aciertos + (mensaje?.ok ? 1 : 0),
      }));
    }
  }

  const resuelto = mensaje !== null && (mensaje.ok || intentos >= 2);

  return (
    <div className="space-y-8">
      <EncabezadoSeccion
        paso="Paso 4 de 7"
        titulo="Almacena: cada producto en su zona"
        descripcion="Arrastra el producto a su zona o pulsa la zona correcta. Si fallas, tienes una pista y un segundo intento."
      />

      {!terminado && item ? (
        <>
          <BarraProgreso
            valor={Math.round((indice / items.length) * 100)}
            etiqueta="Productos colocados"
            detalle={`Producto ${indice + 1} de ${items.length}`}
          />

          <div
            draggable
            onDragStart={() => setArrastrando(item.id)}
            onDragEnd={() => setArrastrando(null)}
            className={cn(
              "tarjeta flex items-center gap-4 p-5",
              arrastrando === item.id && "opacity-60",
            )}
          >
            <span aria-hidden className="text-5xl">
              {item.emoji}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Producto a guardar
              </p>
              <h2 className="text-xl font-extrabold">{item.nombre}</h2>
              <p className="text-sm text-muted-foreground">
                Arrástralo a su zona o pulsa la zona correcta.
              </p>
            </div>
          </div>

          {mensaje && (
            <MensajeCorreccion
              acierto={mensaje.ok}
              titulo={mensaje.ok ? "¡Bien colocado!" : "Inténtalo de nuevo"}
            >
              <p>{mensaje.texto}</p>
            </MensajeCorreccion>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ZONAS.map((z) => (
              <ZonaAlmacen
                key={z.id}
                zona={z}
                seleccionable={!resuelto}
                onClick={resuelto ? undefined : () => intentar(z.id)}
                onSoltar={resuelto ? undefined : () => intentar(z.id)}
              />
            ))}
          </div>

          {resuelto && (
            <Button type="button" size="lg" className="gap-2" onClick={siguiente}>
              {indice + 1 >= items.length ? "Terminar actividad" : "Siguiente producto"}
              <ArrowRight aria-hidden className="size-5" />
            </Button>
          )}
        </>
      ) : (
        <div className="tarjeta space-y-4 p-6">
          <h2 className="text-xl font-extrabold">Actividad completada</h2>
          <p>
            Has colocado {items.length} productos. Aciertos al primer intento: {aciertos}.
          </p>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => {
              setIndice(0);
              setColocados({});
              setIntentos(0);
              setMensaje(null);
            }}
          >
            <RotateCcw aria-hidden className="size-4" />
            Repetir actividad
          </Button>
        </div>
      )}

      <OrdenCamara />

      <div className="flex justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link to="/alumno/peps">
            Continuar con PEPS/FIFO
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function OrdenCamara() {
  const [orden, setOrden] = useState(() => [...BALDAS_CAMARA].reverse());
  const [comprobado, setComprobado] = useState(false);
  const correcto = orden.every((b, i) => b.posicion === i + 1);

  function mover(indice: number, direccion: -1 | 1) {
    const destino = indice + direccion;
    if (destino < 0 || destino >= orden.length) return;
    const copia = [...orden];
    const a = copia[indice]!;
    const b = copia[destino]!;
    copia[indice] = b;
    copia[destino] = a;
    setOrden(copia);
    setComprobado(false);
  }

  function comprobar() {
    setComprobado(true);
    if (orden.every((b, i) => b.posicion === i + 1)) {
      actualizarEstado((e) => ({ ...e, camaraCompletada: true }));
    }
  }

  return (
    <section aria-labelledby="orden-camara" className="tarjeta p-6">
      <h2 id="orden-camara" className="text-xl font-extrabold">
        Ordena la cámara de refrigeración
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        De arriba abajo. Usa los botones para subir o bajar cada balda.
      </p>

      <ol className="mt-4 space-y-2">
        {orden.map((b, i) => (
          <li
            key={b.id}
            className={cn(
              "flex items-center gap-3 rounded-xl border-2 bg-card px-4 py-3",
              comprobado && b.posicion === i + 1 && "border-success bg-success-soft",
              comprobado && b.posicion !== i + 1 && "border-danger bg-danger-soft",
            )}
          >
            <span aria-hidden className="text-2xl">
              {b.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight">{b.nombre}</p>
              <p className="text-xs text-muted-foreground">{b.descripcion}</p>
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="min-h-11 min-w-11"
                aria-label={`Subir ${b.nombre}`}
                onClick={() => mover(i, -1)}
                disabled={i === 0}
              >
                <ArrowUp aria-hidden className="size-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="min-h-11 min-w-11"
                aria-label={`Bajar ${b.nombre}`}
                onClick={() => mover(i, 1)}
                disabled={i === orden.length - 1}
              >
                <ArrowDown aria-hidden className="size-4" />
              </Button>
            </div>
          </li>
        ))}
      </ol>

      <Button type="button" className="mt-4" onClick={comprobar}>
        Comprobar orden
      </Button>

      {comprobado && (
        <div className="mt-4">
          <MensajeCorreccion
            acierto={correcto}
            titulo={correcto ? "¡Cámara bien ordenada!" : "Todavía no es el orden correcto"}
          >
            <p>
              Arriba los alimentos cocinados y listos para consumir. Abajo los crudos. El pescado,
              en la zona más fría. Todo tapado y etiquetado.
            </p>
          </MensajeCorreccion>
        </div>
      )}
    </section>
  );
}
