import { createFileRoute } from "@tanstack/react-router";
import { Printer, Trash2 } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { Button } from "@/components/ui/button";
import { ETIQUETAS_DECISION } from "@/data/productos";
import { borrarFicha, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/profesor/fichas")({
  head: () => ({
    meta: [
      { title: "Fichas de recepción | La puerta de la cocina" },
      {
        name: "description",
        content: "Consulta e imprime las fichas de recepción guardadas por el alumnado.",
      },
      { property: "og:title", content: "Fichas de recepción guardadas" },
      { property: "og:description", content: "Consulta e impresión de fichas del alumnado." },
    ],
  }),
  component: Fichas,
});

function Fichas() {
  const { fichas } = useEstado();

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Fichas de recepción"
        descripcion="Fichas guardadas en este dispositivo por el modo alumno."
      />

      {fichas.length === 0 ? (
        <div className="tarjeta p-8 text-center text-muted-foreground">
          <p className="font-semibold">Todavía no hay fichas guardadas.</p>
          <p className="mt-1 text-sm">
            El alumnado las crea en la sección «Ficha de recepción» del modo alumno.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="no-imprimir">
            <Button type="button" variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer aria-hidden className="size-4" />
              Imprimir todas
            </Button>
          </div>
          {fichas.map((f) => (
            <article key={f.id} className="tarjeta p-5">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold">Grupo: {f.grupo || "Sin nombre"}</h2>
                  <p className="text-sm text-muted-foreground">
                    {f.fecha} · {f.hora} · Responsable: {f.responsable}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Recibe: {f.receptor} · Proveedor: {f.proveedor}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="no-imprimir gap-2 text-danger"
                  onClick={() => borrarFicha(f.id)}
                >
                  <Trash2 aria-hidden className="size-4" />
                  Eliminar
                </Button>
              </header>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Productos de la ficha del grupo {f.grupo}</caption>
                  <thead className="bg-muted">
                    <tr>
                      {["Producto", "Cantidad", "Temperatura", "Envase", "Fecha", "Decisión", "Motivo"].map(
                        (c) => (
                          <th key={c} scope="col" className="px-3 py-2 font-bold">
                            {c}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {f.lineas.map((l) => (
                      <tr key={l.id} className="border-t">
                        <td className="px-3 py-2">{l.producto}</td>
                        <td className="px-3 py-2">{l.cantidad}</td>
                        <td className="px-3 py-2">{l.temperatura}</td>
                        <td className="px-3 py-2">{l.envase}</td>
                        <td className="px-3 py-2">{l.estadoFecha || l.fechaProducto}</td>
                        <td className="px-3 py-2 font-semibold">
                          {l.decision ? ETIQUETAS_DECISION[l.decision] : "-"}
                        </td>
                        <td className="px-3 py-2">{l.motivo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
