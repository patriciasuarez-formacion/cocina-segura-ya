import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, Printer, Save, RotateCcw } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { MensajeCorreccion } from "@/components/MensajeCorreccion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { guardarFicha, type Ficha, type LineaFicha } from "@/lib/estado";

export const Route = createFileRoute("/alumno/ficha")({
  head: () => ({
    meta: [
      { title: "Ficha digital de recepción | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Registra la recepción: producto, cantidad, temperatura, estado del envase, decisión y motivo.",
      },
      { property: "og:title", content: "Ficha digital de recepción" },
      {
        property: "og:description",
        content: "Formulario para registrar la recepción de materias primas.",
      },
    ],
  }),
  component: FichaRecepcion,
});

const BORRADOR = "puerta-cocina-ficha-borrador";

let contadorLinea = 0;

function lineaNueva(): LineaFicha {
  contadorLinea += 1;
  return {
    id: `linea-${contadorLinea}`,
    producto: "",
    cantidad: "",
    fechaProducto: "",
    temperatura: "",
    envase: "",
    estadoFecha: "",
    decision: "",
    motivo: "",
  };
}

// La fecha y la hora se rellenan en el navegador para que el primer
// dibujado coincida exactamente con el que genera el servidor.
function fichaNueva(): Ficha {
  contadorLinea = 0;
  return {
    id: "ficha-actual",
    grupo: "",
    fecha: "",
    hora: "",
    responsable: "",
    receptor: "",
    proveedor: "",
    lineas: [lineaNueva()],
  };
}

function FichaRecepcion() {
  const [ficha, setFicha] = useState<Ficha>(fichaNueva);
  const [errores, setErrores] = useState<string[]>([]);
  const [guardada, setGuardada] = useState(false);
  const [cargado, setCargado] = useState(false);

  // Cargar borrador
  useEffect(() => {
    try {
      const crudo = window.localStorage.getItem(BORRADOR);
      if (crudo) {
        setFicha(JSON.parse(crudo) as Ficha);
      } else {
        const ahora = new Date();
        setFicha((f) => ({
          ...f,
          fecha: ahora.toISOString().slice(0, 10),
          hora: ahora.toTimeString().slice(0, 5),
        }));
      }
    } catch {
      /* sin borrador */
    }
    setCargado(true);
  }, []);


  // Guardado automático del borrador
  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(BORRADOR, JSON.stringify(ficha));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [ficha, cargado]);

  function cambiar<K extends keyof Ficha>(clave: K, valor: Ficha[K]) {
    setFicha((f) => ({ ...f, [clave]: valor }));
    setGuardada(false);
  }

  function cambiarLinea(id: string, clave: keyof LineaFicha, valor: string) {
    setFicha((f) => ({
      ...f,
      lineas: f.lineas.map((l) => (l.id === id ? { ...l, [clave]: valor } : l)),
    }));
    setGuardada(false);
  }

  function validar(): string[] {
    const fallos: string[] = [];
    if (!ficha.grupo.trim()) fallos.push("Escribe el nombre o número del grupo.");
    if (!ficha.fecha) fallos.push("Indica la fecha de la recepción.");
    if (!ficha.hora) fallos.push("Indica la hora de la recepción.");
    if (!ficha.responsable.trim()) fallos.push("Escribe quién es el responsable.");
    if (!ficha.receptor.trim()) fallos.push("Falta el nombre de quien recibe.");
    if (!ficha.proveedor.trim()) fallos.push("Falta el nombre del proveedor.");
    ficha.lineas.forEach((l, i) => {
      if (!l.producto.trim()) fallos.push(`Producto ${i + 1}: escribe el nombre del producto.`);
      if (!l.cantidad.trim()) fallos.push(`Producto ${i + 1}: indica la cantidad.`);
      if (!l.temperatura.trim()) fallos.push(`Producto ${i + 1}: anota la temperatura.`);
      if (!l.decision) fallos.push(`Producto ${i + 1}: elige una decisión.`);
      if (l.decision !== "aceptar" && !l.motivo.trim())
        fallos.push(`Producto ${i + 1}: escribe el motivo de la decisión.`);
    });
    return fallos;
  }

  function guardar() {
    const fallos = validar();
    setErrores(fallos);
    if (fallos.length > 0) {
      setGuardada(false);
      return;
    }
    guardarFicha({ ...ficha, id: crypto.randomUUID() });
    setGuardada(true);
  }

  function reiniciar() {
    const ahora = new Date();
    setFicha({
      ...fichaNueva(),
      fecha: ahora.toISOString().slice(0, 10),
      hora: ahora.toTimeString().slice(0, 5),
    });
    setErrores([]);
    setGuardada(false);
  }


  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Ficha digital de recepción"
        descripcion="Registra lo que has recibido. Se guarda un borrador automáticamente en este dispositivo."
      />

      <section className="tarjeta p-6" aria-labelledby="datos-generales">
        <h2 id="datos-generales" className="text-lg font-extrabold">
          Datos de la recepción
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Campo id="grupo" etiqueta="Grupo" valor={ficha.grupo} onChange={(v) => cambiar("grupo", v)} />
          <Campo id="fecha" etiqueta="Fecha" tipo="date" valor={ficha.fecha} onChange={(v) => cambiar("fecha", v)} />
          <Campo id="hora" etiqueta="Hora" tipo="time" valor={ficha.hora} onChange={(v) => cambiar("hora", v)} />
          <Campo id="responsable" etiqueta="Responsable" valor={ficha.responsable} onChange={(v) => cambiar("responsable", v)} />
          <Campo id="receptor" etiqueta="Nombre de quien recibe" valor={ficha.receptor} onChange={(v) => cambiar("receptor", v)} />
          <Campo id="proveedor" etiqueta="Nombre del proveedor" valor={ficha.proveedor} onChange={(v) => cambiar("proveedor", v)} />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="productos">
        <h2 id="productos" className="text-lg font-extrabold">
          Productos recibidos
        </h2>
        {ficha.lineas.map((l, i) => (
          <div key={l.id} className="tarjeta p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold">Producto {i + 1}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="no-imprimir gap-2"
                disabled={ficha.lineas.length === 1}
                onClick={() =>
                  setFicha((f) => ({ ...f, lineas: f.lineas.filter((x) => x.id !== l.id) }))
                }
              >
                <Trash2 aria-hidden className="size-4" />
                Eliminar
              </Button>
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Campo id={`p-${l.id}`} etiqueta="Producto" valor={l.producto} onChange={(v) => cambiarLinea(l.id, "producto", v)} />
              <Campo id={`c-${l.id}`} etiqueta="Cantidad" valor={l.cantidad} onChange={(v) => cambiarLinea(l.id, "cantidad", v)} />
              <Campo id={`fp-${l.id}`} etiqueta="Fecha del producto" tipo="date" valor={l.fechaProducto} onChange={(v) => cambiarLinea(l.id, "fechaProducto", v)} />
              <Campo id={`t-${l.id}`} etiqueta="Temperatura (°C)" valor={l.temperatura} onChange={(v) => cambiarLinea(l.id, "temperatura", v)} />
              <Campo id={`e-${l.id}`} etiqueta="Estado del envase" valor={l.envase} onChange={(v) => cambiarLinea(l.id, "envase", v)} />
              <Campo id={`ef-${l.id}`} etiqueta="Estado de la fecha" valor={l.estadoFecha} onChange={(v) => cambiarLinea(l.id, "estadoFecha", v)} />
              <div>
                <Label htmlFor={`d-${l.id}`}>Decisión</Label>
                <Select
                  value={l.decision}
                  onValueChange={(v) => cambiarLinea(l.id, "decision", v)}
                >
                  <SelectTrigger id={`d-${l.id}`} className="mt-1">
                    <SelectValue placeholder="Elige una decisión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aceptar">Aceptar</SelectItem>
                    <SelectItem value="observacion">Aceptar con observación</SelectItem>
                    <SelectItem value="rechazar">Rechazar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Campo id={`m-${l.id}`} etiqueta="Motivo" valor={l.motivo} onChange={(v) => cambiarLinea(l.id, "motivo", v)} />
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="no-imprimir gap-2"
          onClick={() => setFicha((f) => ({ ...f, lineas: [...f.lineas, lineaNueva()] }))}
        >
          <Plus aria-hidden className="size-4" />
          Añadir producto
        </Button>
      </section>

      {errores.length > 0 && (
        <MensajeCorreccion acierto={false} titulo="Faltan datos por completar">
          <ul className="list-disc space-y-1 pl-5">
            {errores.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </MensajeCorreccion>
      )}

      {guardada && (
        <MensajeCorreccion acierto titulo="Ficha guardada">
          <p>La ficha se ha guardado en este dispositivo y aparece en el panel del profesor.</p>
        </MensajeCorreccion>
      )}

      <div className="no-imprimir flex flex-wrap gap-3">
        <Button type="button" size="lg" className="gap-2" onClick={guardar}>
          <Save aria-hidden className="size-5" />
          Guardar ficha
        </Button>
        <Button type="button" variant="outline" className="gap-2" onClick={() => window.print()}>
          <Printer aria-hidden className="size-4" />
          Imprimir o guardar en PDF
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="button" variant="outline" className="gap-2">
              <RotateCcw aria-hidden className="size-4" />
              Reiniciar ficha
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Reiniciar la ficha?</AlertDialogTitle>
              <AlertDialogDescription>
                Se borrarán los datos que has escrito y empezarás una ficha vacía.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={reiniciar}>Sí, reiniciar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <p className="text-sm text-muted-foreground">
        Para guardar en PDF elige «Guardar como PDF» en el cuadro de impresión de tu navegador.
      </p>
    </div>
  );
}

function Campo({
  id,
  etiqueta,
  valor,
  onChange,
  tipo = "text",
}: {
  id: string;
  etiqueta: string;
  valor: string;
  onChange: (v: string) => void;
  tipo?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{etiqueta}</Label>
      <Input id={id} type={tipo} className="mt-1" value={valor} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
