import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { TarjetaControl } from "@/components/TarjetaControl";
import { Button } from "@/components/ui/button";
import { LECCIONES } from "@/data/lecciones";
import { useEstado } from "@/lib/estado";

export const Route = createFileRoute("/alumno/aprende/")({
  head: () => ({
    meta: [
      { title: "Aprende: los seis controles | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Seis lecciones breves: envase, fechas, temperatura, aspecto, transporte y correspondencia con el pedido.",
      },
      { property: "og:title", content: "Aprende: los seis controles de recepción" },
      {
        property: "og:description",
        content: "Envase, fechas, temperatura, aspecto, transporte y pedido.",
      },
    ],
  }),
  component: ListaLecciones,
});

function ListaLecciones() {
  const { leccionesCompletadas } = useEstado();
  const hechas = leccionesCompletadas.length;

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        paso="Paso 2 de 7"
        titulo="Aprende: los seis controles"
        descripcion="Cada lección es corta. Léela, responde la pregunta y continúa."
      />
      <p className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-bold">
        Lecciones completadas: {hechas} de {LECCIONES.length}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {LECCIONES.map((l) => (
          <TarjetaControl
            key={l.id}
            leccion={l}
            completada={leccionesCompletadas.includes(l.id)}
          />
        ))}
      </div>
      {hechas === LECCIONES.length && (
        <div className="flex justify-end">
          <Button asChild size="lg" className="gap-2">
            <Link to="/alumno/practica">
              Ir a la práctica
              <ArrowRight aria-hidden className="size-5" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
