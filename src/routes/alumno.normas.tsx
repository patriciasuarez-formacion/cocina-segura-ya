import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { EncabezadoSeccion } from "@/components/EncabezadoSeccion";
import { BarraProgreso } from "@/components/BarraProgreso";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NORMAS_HIGIENE } from "@/data/normas";
import { actualizarEstado, useEstado } from "@/lib/estado";

export const Route = createFileRoute("/alumno/normas")({
  head: () => ({
    meta: [
      { title: "Normas de higiene y seguridad | La puerta de la cocina" },
      {
        name: "description",
        content:
          "Lista de comprobación de higiene y seguridad durante la recepción y el almacenaje de alimentos.",
      },
      { property: "og:title", content: "Normas de higiene y seguridad" },
      {
        property: "og:description",
        content: "Lista de comprobación para la recepción y el almacenaje.",
      },
    ],
  }),
  component: Normas,
});

function Normas() {
  const { normasMarcadas } = useEstado();
  const porcentaje = Math.round((normasMarcadas.length / NORMAS_HIGIENE.length) * 100);

  function alternar(id: string) {
    actualizarEstado((e) => ({
      ...e,
      normasMarcadas: e.normasMarcadas.includes(id)
        ? e.normasMarcadas.filter((n) => n !== id)
        : [...e.normasMarcadas, id],
    }));
  }

  return (
    <div className="space-y-6">
      <EncabezadoSeccion
        titulo="Normas de higiene y seguridad"
        descripcion="Marca cada norma cuando la hayas comprobado en tu puesto de recepción."
      />

      <BarraProgreso
        valor={porcentaje}
        etiqueta="Normas comprobadas"
        detalle={`${normasMarcadas.length} de ${NORMAS_HIGIENE.length}`}
      />

      <ul className="tarjeta divide-y">
        {NORMAS_HIGIENE.map((n) => {
          const marcada = normasMarcadas.includes(n.id);
          return (
            <li key={n.id} className="flex items-start gap-3 px-4 py-3">
              <Checkbox
                id={n.id}
                checked={marcada}
                onCheckedChange={() => alternar(n.id)}
                className="mt-1 size-5"
              />
              <label
                htmlFor={n.id}
                className={marcada ? "font-semibold text-success" : "font-medium"}
              >
                {n.texto}
              </label>
            </li>
          );
        })}
      </ul>

      <p className="flex items-start gap-2 rounded-2xl border-2 border-brand/30 bg-brand-soft p-4 font-bold">
        <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand" />
        Separar crudos de cocinados y los alimentos de los productos de limpieza evita la
        contaminación cruzada.
      </p>

      <div className="flex justify-end">
        <Button asChild size="lg" className="gap-2">
          <Link to="/alumno/semaforo">
            Ir al reto del semáforo
            <ArrowRight aria-hidden className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
