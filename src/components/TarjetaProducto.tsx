import { Thermometer, Box, CalendarDays, Eye, ClipboardList, Warehouse, Lightbulb } from "lucide-react";
import type { ProductoCaso } from "@/data/productos";

const FILAS = [
  { clave: "temperatura", etiqueta: "Temperatura", Icono: Thermometer },
  { clave: "envase", etiqueta: "Estado del envase", Icono: Box },
  { clave: "fecha", etiqueta: "Fecha", Icono: CalendarDays },
  { clave: "aspectoOlor", etiqueta: "Aspecto y olor", Icono: Eye },
  { clave: "albaran", etiqueta: "Albarán", Icono: ClipboardList },
  { clave: "zonaPropuesta", etiqueta: "Zona propuesta", Icono: Warehouse },
] as const;

export function TarjetaProducto({
  producto,
  mostrarPistas,
}: {
  producto: ProductoCaso;
  mostrarPistas?: boolean;
}) {
  return (
    <article className="tarjeta entrada-suave overflow-hidden">
      <div className="flex items-center gap-4 border-b bg-brand-soft px-4 py-4 sm:px-6">
        <span aria-hidden className="text-4xl sm:text-5xl">
          {producto.emoji}
        </span>
        <h2 className="text-xl font-extrabold sm:text-2xl">{producto.nombre}</h2>
      </div>
      <dl className="grid gap-px bg-border sm:grid-cols-2">
        {FILAS.map(({ clave, etiqueta, Icono }) => (
          <div key={clave} className="bg-card px-4 py-3 sm:px-6">
            <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Icono aria-hidden className="size-4" />
              {etiqueta}
            </dt>
            <dd className="mt-1 font-semibold">{producto[clave]}</dd>
          </div>
        ))}
      </dl>
      {mostrarPistas && producto.pistas.length > 0 && (
        <div className="flex items-start gap-2 border-t bg-warning-soft px-4 py-3 text-sm font-semibold text-warning-foreground sm:px-6">
          <Lightbulb aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>Pista: {producto.pistas.join(" · ")}</p>
        </div>
      )}
    </article>
  );
}
